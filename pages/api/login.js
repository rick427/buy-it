import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import connectDatabase from '../../utils/connectDb';

connectDatabase();

export default async (req, res) => {
    const {email, password} = req.body;

    try {
        // 1) check if the user exists
        const user = await User.findOne({email}).select('+password')
        if(!user){
            return res.status(404).send('No user exists with that email');
        }
        // 2) check users password (compare)
        const passwordsMatch = await bcrypt.compare(password, user.password);
        // 3) generate token
        if(passwordsMatch){
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
            // 4) send token to the client
            res.status(200).json(token);
        }
        else{
            res.status(401).send('Invalid password')
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in user');
    }
}