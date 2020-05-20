import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDatabase from '../../utils/connectDb';
import User from '../../models/User';

connectDatabase();

export default async (req, res) => {
    const {name, email, password} = req.body;

    try {
        // 1) check if the user already exists
        const user = await User.findOne({email});
        if(user){
            return res.status(422).send(`User with email ${email} already exists`);
        }
        // 2) if not, hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        // 3) create user
        const newUser = await new User({name, email, password: hash}).save();
        console.log({newUser});
        // 4) create token for new user
        const token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        // 5) send back token
        res.status(201).json(token);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error siging up. Please try again later')
    }
}