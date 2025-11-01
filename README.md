# 📊 Nola Analytics -- Frontend

Aplicação React responsável pela interface do dashboard analítico do
projeto **Nola Analytics**, integrando-se com o backend hospedado no
Render.

---

## 🚀 Tecnologias Utilizadas

- **React 19**
- **Vite**
- **Styled Components**
- **Axios**
- **Recharts**
- **Testing Library (Jest + Vitest)**
- **ESLint**

---

## 📁 Estrutura de Pastas

    nola_frontend/
    ├── src/
    │   ├── components/              # Componentes reutilizáveis (Header, Filters, KpiCard, etc)
    │   ├── pages/
    │   │   └── Dashboard.jsx        # Página principal do dashboard
    │   ├── services/
    │   │   └── api.js               # Configuração base do Axios
    │   ├── config/
    │   │   └── dashboardLayout.json # Layout padrão dos blocos do dashboard
    │   ├── styles/
    │   │   └── DashboardStyles.js   # Estilos base com styled-components
    │   └── main.jsx                 # Ponto de entrada do app
    ├── .env                         # Variáveis de ambiente locais
    ├── package.json
    ├── vite.config.js
    └── README.md

---

## ⚙️ Configuração do Ambiente

### 🧩 Variáveis de ambiente

#### Em desenvolvimento (`.env.local`)

```env
VITE_API_URL=http://localhost:3001/api
VITE_DEFAULT_START=2025-05-01
VITE_DEFAULT_END=2025-10-01
```

#### Em produção (Vercel)

```env
VITE_API_URL=https://nola-challenge.onrender.com/api
VITE_DEFAULT_START=2025-05-01
VITE_DEFAULT_END=2025-10-01
```

---

## 🧱 Instalação e Execução

1️⃣ **Instalar dependências**

```bash
npm install
```

2️⃣ **Executar o projeto em ambiente de desenvolvimento**

```bash
npm run dev
```

3️⃣ **Rodar os testes unitários com cobertura**

```bash
npm run test:coverage
```

4️⃣ **Build de produção**

```bash
npm run build
```

---

## 🧪 Testes

Foram implementados testes unitários para todos os principais
componentes da aplicação (Cards, Charts, Filtros e Layout).\
O ambiente de testes utiliza **Vitest + Testing Library**.

---

## 🌐 Deploy

O deploy do frontend foi realizado na **Vercel**.

**URL de Produção:** <https://nola-frontend-gc1houej7-codergaias-projects.vercel.app/>

As variáveis de ambiente foram configuradas diretamente no painel da
Vercel, conforme descrito acima.

PS: O carregamento de todos elementos pode levar de 1 à 2 minutos devido ao alto volume de dados.

---

## 🧭 Observações

- O frontend consome os endpoints expostos pelo backend no Render.
- O layout é totalmente dinâmico e pode ser editado através do
  componente `LayoutEditor`.
- Todos os gráficos e KPIs são renderizados dinamicamente conforme os
  filtros aplicados.
- O frontend, backend e banco de dados foram configurados para operar sobre um volume realista de dados — aproximadamente 500 mil registros, representando 6 meses de operação comercial

  Por conta disso, a primeira renderização e as trocas de filtros podem levar de 1 a 2 minutos, dependendo do desempenho do servidor e da latência entre as instâncias da aplicação (Render e Vercel).

  Esse comportamento é esperado em ambientes de demonstração com carga completa, refletindo o custo computacional de consultas agregadas e cálculos analíticos sobre grandes volumes de dados.

---

## 👨‍💻 Autor

Desenvolvido por **Alexandre Gaia da Silva**\
Desafio **God Level Coder -- Nola Challenge**
