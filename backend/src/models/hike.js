import mongoose from 'mongoose';
import dbClient from './dbClient';

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
  image: String,
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
  hikers: [{
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
  }],}, {
    methods: {
      toJson() {
        return {
          id: this.id,
          title: this.title,
          description: this.description,
          country: this.country,
          city: this.city,
          startDate: this.startDate,
          duration: this.duration,
          hikers: this.hikers,
	  messages: this.messages,
	  image: this.image,
        }
      }
    }
  }
);

const Hike = dbClient.db.model('Hike', hikeSchema);
export default Hike;
