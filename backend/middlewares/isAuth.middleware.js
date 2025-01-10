import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
       

        if (!token) return res.status(401).json({ message: 'Please Login' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded) return res.status(401).json({ message: 'token expired , Please login again' });


        req.user = await User.findById(decoded.user);

        if (!req.user) return res.status(401).json({ message: 'User not found' });

        next();

    }
    catch(err){
        return res.status(500).json({
            message: 'Please Login'
        })
    }
}