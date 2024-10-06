import express from 'express';
import UserController from '../controllers/UserController';

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get('/me', UserController.getMe)

export default userRouter;
