# 💰 Controle Financeiro — PWA

App de controle financeiro pessoal, Progressive Web App, pronto para deploy no Vercel.

## Funcionalidades

- Registrar receitas e despesas por categoria
- Navegar por mês
- Gráfico comparativo dos últimos 6 meses
- Distribuição de despesas por categoria
- Extrato filtrável
- Dados salvos no localStorage (sem backend necessário)
- Instalável como app (PWA) no celular e desktop
- Funciona offline após primeiro acesso

## Estrutura

```
financeiro/
├── public/
│   ├── index.html        ← app completo
│   ├── manifest.json     ← configuração PWA
│   ├── sw.js             ← service worker (cache offline)
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── vercel.json           ← configuração do Vercel
└── README.md
```

## Deploy no Vercel

### Opção 1 — Via GitHub (recomendado)

1. Crie um repositório no GitHub e envie este projeto:
   ```bash
   git init
   git add .
   git commit -m "primeiro commit"
   git remote add origin https://github.com/SEU_USUARIO/controle-financeiro.git
   git push -u origin main
   ```

2. Acesse [vercel.com](https://vercel.com) → **Add New Project**

3. Importe o repositório do GitHub

4. Nas configurações do projeto, defina:
   - **Framework Preset:** Other
   - **Root Directory:** `./`
   - **Output Directory:** `public`
   - **Build Command:** *(deixe em branco)*

5. Clique em **Deploy** ✅

### Opção 2 — Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```
Quando perguntar o diretório de saída, informe: `public`

---

## Instalar como PWA

Após o deploy, acesse o link no celular (Chrome/Safari) e:
- **Android:** aparece o banner "Adicionar à tela inicial" automaticamente
- **iOS:** toque em Compartilhar → "Adicionar à Tela de Início"
- **Desktop Chrome:** clique no ícone de instalação na barra de endereço
