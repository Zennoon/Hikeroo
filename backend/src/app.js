import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth_routes';
import hikeRouter from './routes/hike_routes';
import hikerRouter from './routes/hiker_routes';
import userRouter from './routes/user_routes'
import Hike from './models/hike';
import Hiker from './models/hiker';

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.static('/public'));

app.use(authRouter);
app.use(hikeRouter);
app.use(hikerRouter);
app.use(userRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  }
});

io.on('connection', (socket) => {
  socket.on('join room', async (room) => {
    const hike = await Hike.findById(room);
    if (hike) {
      socket.join(room);
    }
  });

  socket.on('chat message', async ({ room, message, senderId }) => {
    const hiker = await Hiker.findById(senderId);

    if (hiker) {
      const hike = await Hike.findByIdAndUpdate(room, {
        $push: {
          messages: { senderId, text: message },
        }
      });

      if (hike) {
        io.to(room).emit('chat message', {
	  room,
          sender: hiker.toJson(),
          text: message,
        });
      }
    }
  });
});

const APP_PORT = process.env.APP_PORT || 5000;
server.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`);
});
