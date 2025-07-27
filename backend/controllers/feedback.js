import Feedback from '../models/Feedback.js';

export const submitFeedback = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { question, answer, isHelpful } = req.body;

    if (!question || !answer || typeof isHelpful !== 'boolean') {
      return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    // Check for existing feedback
    const existing = await Feedback.findOne({ userId, question, answer });

    if (existing) {
      existing.ishelpful = isHelpful;
      await existing.save();
      return res.status(200).json({ message: 'Feedback updated' });
    }

    // Create new feedback
    const newFeedback = new Feedback({
      userId,
      question,
      answer,
      ishelpful: isHelpful,
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    console.error('Feedback submission error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
