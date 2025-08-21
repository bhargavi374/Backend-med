import Mood from "../models/Mood.js";

export const trackMood = async (req, res) => {
  const { mood } = req.body;
  const userId = req.user?._id;

  if (!mood) {
    return res.status(400).json({ message: "Mood is required." });
  }
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const newMood = await Mood.create({
      userId,
      mood: mood.trim(),
      timestamp: new Date(),
    });

    res.status(201).json({
      message: "Mood saved successfully.",
      mood: newMood,
    });
  } catch (err) {
    console.error("Error saving mood:", err);
    res.status(500).json({ message: "Server error while saving mood." });
  }
};

