// server/controllers/profileController.js
import User from '../models/User.js';
import Mood from '../models/Mood.js';
import Badge from '../models/Badge.js';

export const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const moods = await Mood.find({ user: userId }).sort({ timestamp: -1 }).limit(4);
    const badges = await Badge.find({ user: userId });

    res.status(200).json({ user, moods, badges });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Profile fetch failed' });
  }
};

export const updateProfilePhoto = async (req, res) => {
  const { userId } = req.params;
  const { photoURL } = req.body;

  if (!photoURL) {
    return res.status(400).json({ error: 'Photo URL is required' });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { photoURL }, { new: true });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error updating profile photo:', err);
    res.status(500).json({ error: 'Photo update failed' });
  }
};
