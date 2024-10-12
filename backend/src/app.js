import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth_routes';
import hikeRouter from './routes/hike_routes';
import hikerRouter from './routes/hiker_routes';
import userRouter from './routes/user_routes'

const app = express();

app.use(cors());

app.use(authRouter);
app.use(hikeRouter);
app.use(hikerRouter);
app.use(userRouter);

const APP_PORT = process.env.APP_PORT || 5000;
app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);
});
