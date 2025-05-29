const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/analyze', async (req, res) => {
  const { message, userId } = req.body;
  if (!message) return res.status(400).json({ error: 'Missing message' });

  try {
    const prompt = `
Analyze the following message from user ${userId} for possible deception.
Respond with a JSON object containing:
- truthScore (0 to 1),
- verdict (short label),
- and a short analysis.

Message:
"${message}"

Return JSON only.`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = completion.data.choices[0].message.content.trim();
    const cleanReply = reply.startsWith('{') ? reply : reply.slice(reply.indexOf('{'));
    const result = JSON.parse(cleanReply);

    res.json(result);
  } catch (err) {
    console.error('Zilat error:', err.message);
    res.status(500).json({ error: 'Failed to analyze message' });
  }
});

module.exports = router;
