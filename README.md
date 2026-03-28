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
git commit -m "adiciona IA consultora"
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
| `ANTHROPIC_API_KEY` | `sk-ant-...` (sua chave) |

Marque: Production + Preview + Development

Depois: **Deployments → Redeploy**

> Sua chave: https://console.anthropic.com/settings/keys

### 4. Instalar como PWA
- Android: banner automático
- iOS: Compartilhar → "Adicionar à Tela de Início"
