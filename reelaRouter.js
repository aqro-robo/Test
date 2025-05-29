const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/analyzeConversation', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array required' });
  }

  try {
    const convoText = messages.map((msg, i) => `(${msg.sender}): ${msg.text}`).join('\n');
    const prompt = `
You are Reela, an AI that analyzes romantic or emotional conversations.
Label the tone of this dialogue with one of the following:
"interested", "detached", "playful", "serious", "manipulative", "friendly"

Only reply with the label. Here's the conversation:
${convoText}

Answer:`.trim();

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 10,
      temperature: 0.5,
    });

    const label = completion.data.choices[0].text.trim().toLowerCase();
    return res.json({ mood: label });
  } catch (err) {
    console.error('Reela error:', err.message);
    return res.status(500).json({ error: 'Reela AI failed' });
  }
});

module.exports = router;
