import mongoose from "mongoose";
import dbClient from "./dbClient";

const hikeSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  images: [{
    filePath: String,
  }],
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  members: [{
    hikerId: {
      type: mongoose.ObjectId,
      required: true,
    }
  }],
  messages: [{
    senderId: {
      type: mongoose.ObjectId,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    image: String,
  }],
});

const Hike = dbClient.db.model('Hike', hikeSchema);
export default Hike;
