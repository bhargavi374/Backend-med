// models/chatModel.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    enum: ['user', 'peer'],
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});

export default mongoose.model('Chat', chatSchema);
