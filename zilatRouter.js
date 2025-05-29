const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/checkBelief', async (req, res) => {
  const { belief } = req.body;
  if (!belief) return res.status(400).json({ error: 'Belief text required' });

  try {
    const prompt = `You are Zilat, an AI that evaluates beliefs based on science, logic, and facts.
Determine whether the following belief is scientifically accurate, a cultural myth, or a superstition.
Explain your reasoning clearly.

Belief: "${belief}"`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 250,
      temperature: 0.6,
    });

    const explanation = completion.data.choices[0].text.trim();
    res.json({ explanation });
  } catch (err) {
    console.error('Zilat error:', err.message);
    res.status(500).json({ error: 'Failed to analyze belief' });
  }
});

module.exports = router;
