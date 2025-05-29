const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/analyzeMessage', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  try {
    const prompt = `Analyze the following user message and determine if it's likely truthful or deceptive. 
Respond ONLY with true or false.

Message: "${message}"

Answer:`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 5,
      temperature: 0.3,
    });

    const result = completion.data.choices[0].text.trim().toLowerCase();
    const trust = result.includes('true');
    return res.json({ trust });
  } catch (err) {
    console.error('AI error:', err.message);
    return res.status(500).json({ error: 'AI analysis failed' });
  }
});

module.exports = router;
