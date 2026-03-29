// api/ia.js — Vercel Serverless Function

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const apiKey = process.env.ANTHROPIC_API_KEY;

  // Debug: retorna info sem expor a chave
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY não encontrada',
      dica: 'Adicione a variável no Vercel > Settings > Environment Variables e faça Redeploy'
    });
  }

  const { system, messages } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Campo "messages" ausente ou inválido' });
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

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Erro da API Anthropic',
        status: response.status,
        detalhe: text
      });
    }

    const data = JSON.parse(text);
    const result = data.content.map(b => b.text || '').join('');
    return res.status(200).json({ text: result });

  } catch (err) {
    return res.status(500).json({
      error: 'Erro interno',
      mensagem: err.message,
      stack: err.stack
    });
  }
};
