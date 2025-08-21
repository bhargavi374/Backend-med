import PeerCircle from '../models/PeerCircle.js';

// GET all peer circles (public)
export const getAllCircles = async (req, res) => {
  try {
    const circles = await PeerCircle.find()
      .populate('members.user', 'name email') // Optional: exposes minimal user info
      .sort({ createdAt: -1 }); // Optional: latest first
    res.status(200).json(circles);
  } catch (err) {
    console.error('Error fetching circles:', err);
    res.status(500).json({ msg: 'Failed to fetch circles' });
  }
};

// POST join a peer circle (requires auth)
export const joinCircle = async (req, res) => {
  try {
    const { circleId } = req.params;
    const userId = req.user?._id;

    if (!userId) return res.status(401).json({ msg: 'Unauthorized user' });

    const circle = await PeerCircle.findById(circleId);
    if (!circle) return res.status(404).json({ msg: 'Circle not found' });

    const alreadyJoined = circle.members.some(
      (member) => member.user.toString() === userId.toString()
    );
    if (alreadyJoined) {
      return res.status(400).json({ msg: 'You have already joined this circle' });
    }

    circle.members.push({ user: userId });
    await circle.save();

    res.status(200).json({ msg: 'Joined the circle successfully', circle });
  } catch (err) {
    console.error('Error joining circle:', err);
    res.status(500).json({ msg: 'Failed to join circle' });
  }
};

// POST leave a peer circle (requires auth)
export const leaveCircle = async (req, res) => {
  try {
    const { circleId } = req.params;
    const userId = req.user._id;

    const circle = await PeerCircle.findById(circleId);
    if (!circle) return res.status(404).json({ msg: 'Circle not found' });

    const memberIndex = circle.members.findIndex(
      (member) => member.user.toString() === userId.toString()
    );

    if (memberIndex === -1) {
      return res.status(400).json({ msg: 'You are not part of this circle' });
    }

    circle.members.splice(memberIndex, 1);
    await circle.save();

    res.status(200).json({ msg: 'You have left the circle', circle });
  } catch (err) {
    console.error('Error leaving circle:', err);
    res.status(500).json({ msg: 'Failed to leave circle' });
  }
};

// POST create a new peer circle (requires auth)
export const createCircle = async (req, res) => {
  try {
    const { topic, reactions } = req.body;

    if (!topic) return res.status(400).json({ msg: 'Topic is required' });

    const newCircle = new PeerCircle({
      topic,
      reactions: reactions || [],
      members: [{ user: req.user._id }]
    });

    await newCircle.save();

    res.status(201).json({ msg: 'Peer circle created successfully', circle: newCircle });
  } catch (err) {
    console.error('Error creating peer circle:', err);
    res.status(500).json({ msg: 'Failed to create peer circle' });
  }
};
