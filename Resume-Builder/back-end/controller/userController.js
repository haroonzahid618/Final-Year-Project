import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Resume from '../models/Resume.js';

const generateToken = (userId) => {
    const token = jwt.sign({ userId },process.env.SECRET,{expiresIn: "7d"});
        return token
};
// User Register
// post: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }

        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(newUser._id);
        newUser.password = undefined;
        return res.status(201).json({
            message: 'User created successfully',
            token,
            user : newUser
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

// User Login
//post: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;


        // Check if user already exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'Invaild email or password'
            });
        }

        // check password
        if (!user.comparePassword(password)) {
            return res.status(400).json({
                message: 'Invaild email or password'
            });
        }

        // Generate token
        const token = generateToken(user._id);
        user.password = undefined;

        // Send response
        return res.status(200).json({
            message: 'Login successfully',
            token,
            user
        });

    } catch (error) {
        return res.status(400).send({
            message: error.message
        });
    }
};

// User get by id
//get: /api/users/get
export const getUserById = async (req, res) => {
    try {
       const userId = req.userId;


        // Check if user already exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message:'User not found'})
        }

        user.password = undefined;
        return res.status(200).send({user});

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
//Resume
//get: /api/users/resumes
export const getUserResume = async (req,res) => {
     try {
        
        const userId = req.userId;

        const resumes = await Resume.find({userId});
        return res.status(200).json({resumes})
     } catch (error) {
        return res.status(400).json({message:error.message})
        
     }
    
}