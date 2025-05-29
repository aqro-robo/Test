const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/analyze', async (req, res) => {
  const { inputText } = req.body;
  if (!inputText) return res.status(400).json({ error: 'Input text required' });

  try {
    const prompt = `You are an expert personality analyst AI.
Analyze the following input and return a personality profile including MBTI type, Big Five traits (OCEAN), and a short psychological interpretation.

Input:
"${inputText}"`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 300,
      temperature: 0.7,
    });

    const analysis = completion.data.choices[0].text.trim();
    res.json({ analysis });
  } catch (err) {
    console.error('Personality AI error:', err.message);
    res.status(500).json({ error: 'Failed to analyze personality' });
  }
});

module.exports = router;
