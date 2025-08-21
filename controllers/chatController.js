import Chat from '../models/chatModel.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: 'Failed to fetch messages', details: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, sender } = req.body;

    if (!text || !sender) {
      return res.status(400).json({ error: 'Text and sender are required' });
    }

    const newMessage = await Chat.create({ text, sender });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(400).json({ error: 'Failed to send message', details: err.message });
  }
};
