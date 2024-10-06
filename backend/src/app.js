import express from 'express';
import authRouter from './routes/auth_routes';

const app = express();

app.use(authRouter)

const APP_PORT = process.env.APP_PORT || 5000;
app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);
});