const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/recommend', async (req, res) => {
  const { moodOrText } = req.body;
  if (!moodOrText) return res.status(400).json({ error: 'Mood or text required' });

  try {
    const prompt = `You are Nava, an AI music recommender. The user input is: "${moodOrText}".
Based on this, suggest 3 music styles or tracks that match the mood or context. Include a short description of why each was selected.`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 200,
      temperature: 0.7,
    });

    const answer = completion.data.choices[0].text.trim();
    res.json({ suggestions: answer });
  } catch (err) {
    console.error('Nava error:', err.message);
    res.status(500).json({ error: 'Failed to recommend music' });
  }
});

module.exports = router;
