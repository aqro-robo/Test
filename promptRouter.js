const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/tune', async (req, res) => {
  const { rawPrompt, role = 'assistant' } = req.body;
  if (!rawPrompt) return res.status(400).json({ error: 'Prompt is required' });

  const prompt = `You are a prompt engineering assistant AI. Improve the following prompt for optimal use in GPT-based ${role}.

Original Prompt:
${rawPrompt}

Improved Prompt:`;

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 200,
      temperature: 0.6,
    });

    const tuned = completion.data.choices[0].text.trim();
    res.json({ tunedPrompt: tuned });
  } catch (err) {
    console.error('Prompt tuning error:', err.message);
    res.status(500).json({ error: 'Prompt tuning failed' });
  }
});

module.exports = router;
