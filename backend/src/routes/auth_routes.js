import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import formidable from 'express-formidable';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();

authRouter.use(cookieParser());
authRouter.use(express.json());

authRouter.post('/signup', formidable(), AuthController.signUp);

authRouter.post('/login', AuthController.login);

authRouter.get('/logout', AuthController.logout);

export default authRouter;
