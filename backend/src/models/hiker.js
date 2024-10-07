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
    friendId: {
      type: mongoose.ObjectId,
      required: true,
    }
  }],
  friendRequests: [{
    hikerId: {
      type: mongoose.ObjectId,
      required: true,
    }
  }],
  invites: [{
    hikeId: mongoose.ObjectId,
    senderId: mongoose.ObjectId,
  }],},
  {
    methods: {
      toJson() {
        return {
          id: this.id,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          friends: this.friends,
          friendRequests: this.friendRequests,
          invites: this.invites,
        }
      }
    }
  }
);

const Hiker = dbClient.db.model('Hiker', hikerSchema);
export default Hiker;
