import mongoose from 'mongoose';
import dbClient from './dbClient';

const hikerSchema = new mongoose.Schema({
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    friendId: mongoose.ObjectId,
  }],
  friendRequests: [{
    senderId: mongoose.ObjectId,
  }],
});

const Hiker = dbClient.db.model('Hiker', hikerSchema);
export default Hiker;
