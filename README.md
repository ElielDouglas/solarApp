This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Documentação 
Projeto criado em NextJs para consumo e exibição de dados baseados em mapa do google maps.
API rest consumida via fetch, listando dados em tela.
Integrado com a biblioteca @react-google-maps/api, envolvendo busca global, podendo fazer a busca de qualquer endereço existente, que ele irá apontar no mapa interativo e , listagem dinamica com os resultados da API teste disponibilizada no desafio.

Integrado com a API de potencial solar, contendo validações de erros, quando a longitude e latitude não forem encontradas.

