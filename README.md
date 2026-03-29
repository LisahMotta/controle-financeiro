# 💰 Controle Financeiro — PWA com IA

## Estrutura
```
financeiro/
├── api/
│   └── ia.js          ← proxy seguro para Anthropic (Vercel Function)
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js
│   └── icons/
├── vercel.json
└── package.json
```

## Deploy

### 1. Suba para o GitHub
```bash
git add .
git commit -m "adiciona IA consultora com Groq"
git push
```

### 2. Importe no Vercel
- Framework: **Other**
- Output Directory: *(em branco)*
- Build Command: *(em branco)*

### 3. ⚠️ Configure a variável de ambiente (IA não funciona sem isso)

No painel do Vercel → **Settings → Environment Variables → Add New**:

| Name | Value |
|------|-------|
| `GROQ_API_KEY` | `gsk_...` (sua chave gratuita) |

Marque: Production + Preview + Development

Depois: **Deployments → Redeploy**

#### 📋 Como obter a chave Groq (100% gratuito):
1. Acesse: https://console.groq.com/keys
2. Clique em **"Create API Key"**
3. Copie a chave (começa com `gsk_`)
4. Cole no Vercel

> ✅ Groq é gratuito com limite generoso: **5.000 requisições/dia**

### 4. Instalar como PWA
- Android: banner automático
- iOS: Compartilhar → "Adicionar à Tela de Início"
