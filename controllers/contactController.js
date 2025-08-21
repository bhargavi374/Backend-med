// controllers/contactController.js
export const contactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    console.log('📩 New Contact Submission:', { name, email, message });

    // TODO: Integrate with EmailJS, Nodemailer, Formspree, etc.

    res.status(200).json({ msg: 'Message received successfully!' });
  } catch (err) {
    console.error('❌ Error sending contact message:', err);
    res.status(500).json({ msg: 'Failed to send message' });
  }
};
