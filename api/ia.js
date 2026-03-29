// api/ia.js — Vercel Serverless Function

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada' });
  }

  // Vercel parseia o body automaticamente se Content-Type for application/json
  // mas vamos garantir que funciona mesmo se vier como string
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch(e) {
      return res.status(400).json({ error: 'Body inválido: não é JSON' });
    }
  }

  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Body ausente ou inválido' });
  }

  const { system, messages } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Campo "messages" ausente, vazio ou não é array' });
  }

  try {
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
        system: system || '',
        messages,
      }),
    });

    const rawText = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro da API Anthropic',
        status: response.status,
        detalhe: rawText
      });
    }

    const data = JSON.parse(rawText);
    const result = data.content.map(b => b.text || '').join('');
    return res.status(200).json({ text: result });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
