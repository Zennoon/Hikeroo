import express from 'express';
import HikerController from '../controllers/HikerController';
import Hiker from '../models/hiker';

const hikerRouter = express.Router();
hikerRouter.use(express.json());

hikerRouter.get('/friends', HikerController.showFriends);

hikerRouter.post('/friends', HikerController.acceptFriendRequest);

hikerRouter.delete('/friends', HikerController.unfriend);

hikerRouter.get('/friend_requests', HikerController.showFriendRequests);

hikerRouter.post('/friend_requests', HikerController.sendFriendRequest);

hikerRouter.delete('/friend_requests', HikerController.rejectFriendRequest);

export default hikerRouter;
