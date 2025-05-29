const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

router.post('/checkLink', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  try {
    const prompt = `You are Zentrox, a security expert AI. Check if the following link might be suspicious, unsafe, or phishing-related.
Respond with "safe" or "dangerous" and a one-line reason.

Link: ${url}`;

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 40,
      temperature: 0.4,
    });

    const response = completion.data.choices[0].text.trim();
    const [status, ...reason] = response.split(':');
    return res.json({ status: status.toLowerCase(), reason: reason.join(':').trim() });
  } catch (err) {
    console.error('Zentrox check error:', err.message);
    return res.status(500).json({ error: 'Link check failed' });
  }
});

router.get('/vpnSuggestion', (req, res) => {
  res.json({
    vpn: {
      provider: 'Aqro Secure VPN',
      link: 'https://vpn.aqro.io/setup',
      description: 'Encrypted, anonymous browsing with Aqro Secure VPN.',
    }
  });
});

module.exports = router;
