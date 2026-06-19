# 🔮 Jardim Cigano da Meg

![React](https://img.shields.io/badge/React-Frontend-blue)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-purple)
![Supabase](https://img.shields.io/badge/Supabase-Backend-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black)

Sistema de agendamento online desenvolvido para gerenciamento de consultas espirituais, permitindo que clientes realizem agendamentos de forma simples e intuitiva, enquanto a administradora acompanha e gerencia os atendimentos através de um painel administrativo.

---

## 🌐 Demonstração

🔗 Projeto Online: https://jardim-cigano-meg.vercel.app/

---

## 📖 Sobre o Projeto

O Jardim Cigano da Meg foi criado para automatizar o processo de agendamento de consultas espirituais.

A plataforma permite que os clientes visualizem os serviços disponíveis, escolham uma data e horário de atendimento e recebam as informações para pagamento após a confirmação do agendamento.

Além disso, o sistema possui uma área administrativa para gerenciamento dos atendimentos realizados.

---

## 🚀 Tecnologias Utilizadas

### Frontend

- React
- React Router DOM
- JavaScript (ES6+)
- CSS3
- Vite

### Backend

- Supabase

### Banco de Dados

- PostgreSQL (Supabase)

### Deploy

- Vercel

---

## ✨ Funcionalidades

### Área do Cliente

✅ Visualização dos serviços disponíveis

✅ Escolha de data e horário

✅ Calendário com dias úteis (segunda a sexta)

✅ Bloqueio de datas passadas

✅ Controle de horários disponíveis

✅ Confirmação de agendamento

✅ Exibição das informações de pagamento

✅ Interface responsiva

### Área Administrativa

✅ Login administrativo

✅ Visualização dos agendamentos

✅ Atualização de status dos atendimentos

✅ Gerenciamento dos registros salvos no banco de dados

---

## 📋 Regras de Atendimento

- Atendimento de segunda a sexta-feira
- Horários disponíveis:
  - 10h às 12h
  - 13h às 19h
- Atendimento realizado por mensagem após confirmação do pagamento
- Envio de fotos das tiragens e áudios explicativos

---

## 🏗️ Arquitetura do Projeto

```txt
src/
├── pages/
│   ├── Home.jsx
│   ├── Servicos.jsx
│   ├── Agendamento.jsx
│   ├── Confirmacao.jsx
│   ├── Contato.jsx
│   ├── Admin.jsx
│   └── AdminLogin.jsx
│
├── services/
│   └── supabase.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🗄️ Banco de Dados

O sistema utiliza PostgreSQL através do Supabase.

Principais informações armazenadas:

- Nome do cliente
- Serviço contratado
- Data do atendimento
- Horário de início
- Horário de término
- Status do agendamento
- Data de criação do registro

---

## 🎯 Desafios do Projeto

Durante o desenvolvimento foram implementadas regras de negócio para controle dos horários disponíveis, bloqueio de datas passadas, validação de conflitos entre agendamentos e integração entre React e Supabase para persistência dos dados.

---

## ⚙️ Variáveis de Ambiente

O projeto utiliza variáveis de ambiente para conexão com o Supabase.

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

⚠️ Nunca compartilhe suas chaves reais no GitHub.

Também é recomendado criar um arquivo `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## 📦 Instalação e Execução

Clone o repositório:

```bash
git clone https://github.com/Giullyfiorin/jardim-cigano-meg.git
```

Acesse a pasta do projeto:

```bash
cd jardim-cigano-meg
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

---

## 📸 Screenshots

### Página Inicial

![Home](./screenshots/home.png)

### Serviços

![Serviços](./screenshots/servicos.png)

### Agendamento

![Agendamento](./screenshots/agendamento.png)

### Painel Administrativo

![Admin](./screenshots/admin.png)

> Ajuste os nomes das imagens caso estejam diferentes na pasta `screenshots`.

---

## 📚 Aprendizados

Durante o desenvolvimento deste projeto foram aplicados conceitos de:

- Componentização em React
- Gerenciamento de rotas
- CRUD completo
- Integração com banco de dados PostgreSQL
- Consumo de APIs
- Manipulação de estados
- Responsividade
- Deploy em produção
- Organização de código
- Boas práticas de desenvolvimento web

---

## 🔮 Melhorias Futuras

- Recuperação de senha
- Dashboard com métricas
- Relatórios financeiros
- Integração com WhatsApp
- Notificações automáticas
- Histórico de atendimentos

---

## 👩‍💻 Desenvolvido por

**Giully Fiorin**

Estudante de Análise e Desenvolvimento de Sistemas pela Uninter, com foco em desenvolvimento Full Stack utilizando React, JavaScript, Supabase e PostgreSQL.

📌 Projeto desenvolvido para prática de desenvolvimento Full Stack, integração com banco de dados e construção de aplicações web responsivas.