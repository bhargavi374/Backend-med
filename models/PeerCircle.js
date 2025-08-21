import mongoose from 'mongoose';

const peerCircleSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  reactions: [String],
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      joinedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true }); // <-- Add this to track createdAt and updatedAt

export default mongoose.model('PeerCircle', peerCircleSchema);
