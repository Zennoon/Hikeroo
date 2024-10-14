import express from 'express';
import HikeController from '../controllers/HikeController';
import formidable from 'express-formidable';

const hikeRouter = express.Router();
hikeRouter.use(express.json())

hikeRouter.get('/hikes', HikeController.showAllHikes);

hikeRouter.get('/hikes/:id', HikeController.getHike);

hikeRouter.post('/hikes', formidable(), HikeController.createHike);

hikeRouter.get('/my_hikes', HikeController.showMyHikes);

hikeRouter.post('/my_hikes', HikeController.joinHike);

hikeRouter.delete('/my_hikes', HikeController.leaveHike);

hikeRouter.get('/invites', HikeController.showHikeInvites);

hikeRouter.post('/invites', HikeController.sendHikeInvite);

hikeRouter.delete('/invites', HikeController.rejectHikeInvite);

hikeRouter.post('/accept_invite', HikeController.acceptHikeInvite);


export default hikeRouter;
