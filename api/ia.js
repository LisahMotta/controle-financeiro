// api/ia.js — Vercel Serverless Function

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada' });

  try {
    // Garante que o body está parseado
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const system   = (body && typeof body.system === 'string') ? body.system : '';
    const messages = (body && Array.isArray(body.messages) && body.messages.length > 0)
      ? body.messages
      : [{ role: 'user', content: 'Olá' }]; // fallback seguro

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system,
        messages,
      }),
    });

    const rawText = await response.text();

    if (!response.ok) {
      let detail = rawText;
      try { detail = JSON.parse(rawText).error?.message || rawText; } catch(e) {}
      return res.status(response.status).json({ error: detail });
    }

    const data = JSON.parse(rawText);
    const text = data.content.map(b => b.text || '').join('');
    return res.status(200).json({ text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
