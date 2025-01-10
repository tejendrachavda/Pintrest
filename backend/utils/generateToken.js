import jwt from 'jsonwebtoken';

const generateToken = (user, res) => {
    try {
        const token = jwt.sign( { user }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15d'
        });

        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error generating token' });
    }
};

export default generateToken;