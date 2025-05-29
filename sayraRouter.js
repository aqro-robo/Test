const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/search', async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query required' });

  try {
    const prompt = `You are Sayra, a helpful search assistant. Answer the user's query in a concise, informative way.
If applicable, summarize key facts and provide any relevant background. Query: "${query}"`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 500,
      temperature: 0.6,
    });

    const answer = completion.data.choices[0].text.trim();
    res.json({ result: answer });
  } catch (err) {
    console.error('Sayra error:', err.message);
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;
