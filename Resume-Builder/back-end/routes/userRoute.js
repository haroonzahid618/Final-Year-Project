import express from 'express';
import { getUserById, getUserResume, loginUser, registerUser } from '../controller/userController.js';
import protect from '../middleware/authMiddle.js';


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResume);

export default userRouter;