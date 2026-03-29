// api/ia.js — Vercel Serverless Function

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GROQ_API_KEY não configurada' });

  try {
    // Garante que o body está parseado
    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body);

    const system   = (body && typeof body.system === 'string') ? body.system : '';
    let messages = (body && Array.isArray(body.messages) && body.messages.length > 0)
      ? body.messages
      : [{ role: 'user', content: 'Olá' }]; // fallback seguro

    // Adiciona system prompt como primeira mensagem se houver
    if (system) {
      messages = [{ role: 'system', content: system }, ...messages];
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        max_tokens: 1024,
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
    const text = data.choices[0].message.content || '';
    return res.status(200).json({ text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
