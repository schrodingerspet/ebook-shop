import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (await User.findOne({ email })) {
        res.status(400).json({ message: "user already exist" });
    }
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        token: generateToken(user._id)
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && bcrypt.compare(password, user.password)) {
        res.json({
            _id: user._id,
            name: user.name,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(401).json({ message: "invalid email or password" });
    }
};