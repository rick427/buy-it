import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import Cart from '../../models/Cart';
import User from '../../models/User';
import connectDatabase from '../../utils/connectDb';

connectDatabase();

export default async (req, res) => {
    const {name, email, password} = req.body;

    try {
        // 1a.) validate name / email / password
        if(!isLength(name, {min: 3, max: 10})){
            return res.status(422).send('Name must be between 3 - 10 characters');
        }
        else if(!isLength(password, {min: 6})){
            return res.status(422).send('Password must be at least 6 characters');
        }
        else if(!isEmail(email)){
            return res.status(422).send('Email must be a valid')
        }
        // 1b.) check if the user already exists
        const user = await User.findOne({email});
        if(user){
            return res.status(422).send(`User with email ${email} already exists`);
        }
        // 2a.) if not, generate salt
        const salt = await bcrypt.genSalt(10);
        // 2b.) hash the password with the salt
        const hash = await bcrypt.hash(password, salt);
        // 3) create user
        const newUser = await new User({name, email, password: hash}).save();
        // 3a. ) create a cart for the user
        await new Cart({user: newUser._id}).save()
        // 4) create token for new user
        const token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        // 5) send back token
        res.status(201).json(token);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error siging up. Please try again later')
    }
}