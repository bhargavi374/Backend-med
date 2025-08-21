import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Badge name is required"],
    trim: true,
  },
  icon: {
    type: String,
    required: [true, "Badge icon is required"],
  },
}, {
  timestamps: true,
});

const Badge = mongoose.model("Badge", badgeSchema);
export default Badge;
