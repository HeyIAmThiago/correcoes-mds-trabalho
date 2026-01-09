# 🏋️ Workout Day Gym - Sistema de Gerenciamento

Sistema completo de gerenciamento de academia com interface moderna, 100% em português, desenvolvido com React, Node.js, Express e MongoDB.

## 🚀 Quick Start

```bash
# 1. Clone o repositório
git clone https://github.com/HeyIAmThiago/correcoes-mds-trabalho.git
cd correcoes-mds-trabalho

# 2. Inicie o Docker
docker-compose up -d

# 3. Execute o setup (aguarde 60s para o backend inicializar)
.\SETUP.ps1

# 4. Acesse
http://localhost:3000
```

**Pronto! Sistema funcionando! 🎉**

---

## 🔑 Credenciais

### 👔 Gerente (Branch Manager)
```
URL:   http://localhost:3000/branch
Email: gerente@filial.com
Senha: gerente@filial.com
```
**Funcionalidades:**
- Gerenciar produtos (com imagens)
- Gerenciar equipe (coaches)
- Gerenciar clientes
- Gerenciar pedidos
- Gerenciar agendamentos

### 👤 Cliente
```
URL:   http://localhost:3000/register
```
**Cadastre-se** e depois faça login em `/login`

**Funcionalidades:**
- Comprar produtos
- Escolher método de pagamento (Cartão, PIX, Dinheiro)
- Ver histórico de pedidos
- Atualizar perfil fitness (peso, altura, IMC)
- Agendar com coaches

### 🏢 Executive Manager
```
URL:   http://localhost:3000/executive
Email: executive@gmail.com
Senha: senha_exec_123
```
**Funcionalidades:**
- Criar branch managers
- Gerenciar filiais

---

## ✨ Features

### 🎨 Interface Moderna
- ✅ Design limpo e profissional
- ✅ Tema branco responsivo
- ✅ Cards visuais para produtos
- ✅ Animações e hover effects
- ✅ Toast notifications com ícones

### 🇧🇷 100% em Português
- ✅ Todas as interfaces traduzidas
- ✅ Mensagens de erro e sucesso
- ✅ Validações de formulários
- ✅ Labels, botões e modais

### 🛒 E-commerce Completo
- ✅ Catálogo de produtos com imagens
- ✅ Carrinho de compras
- ✅ Busca de produtos
- ✅ Seleção de método de pagamento
- ✅ Histórico de pedidos
- ✅ Confirmação antes de remover itens

### 👥 Gestão de Equipe
- ✅ Cadastro de funcionários
- ✅ CPF (não SSN)
- ✅ Identificação de coaches
- ✅ Controle de salários

### 📅 Agendamentos
- ✅ Calendário em português
- ✅ Agendamento com coaches
- ✅ Gestão de horários
- ✅ Cancelamento de agendamentos

### 💪 Perfil Fitness
- ✅ Peso, altura, IMC
- ✅ Percentual de gordura
- ✅ Histórico de atualizações

---

## 🛠️ Tecnologias

### Frontend
- React.js
- React Bootstrap
- React Router
- React Toastify
- FontAwesome Icons
- Formik + Yup (validações)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticação)
- bcrypt (senhas)

### DevOps
- Docker
- Docker Compose

---

## 📁 Estrutura

```
correcoes-mds-trabalho/
├── back-end/           # API Node.js + Express
│   ├── models/        # Modelos MongoDB
│   ├── routes/        # Rotas da API
│   ├── middleware/    # Autenticação
│   └── startup/       # Configurações
├── front-end/         # React App
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas
│   │   └── services/    # API calls
│   └── public/          # Assets (imagens)
├── docker-compose.yml   # Orquestração
├── .env                 # Variáveis de ambiente
├── SETUP.ps1            # Script de setup
└── README.md            # Este arquivo
```

---

## 🐛 Troubleshooting

### Problema: "Produtos antigos aparecem"
**Solução:** Pressione `Ctrl + Shift + R` no navegador

### Problema: "Cannot connect to backend"
**Solução:** Aguarde 60 segundos após `docker-compose up`

### Problema: "Erro ao fazer login"
**Solução:** Execute `.\SETUP.ps1` novamente

### Problema: "Porta já em uso"
**Solução:**
```bash
docker-compose down
docker-compose up -d
```

---

## 📊 Banco de Dados

**MongoDB:**
- Host: localhost:27017
- User: user_mds
- Password: secret_password
- Database: gym

**Collections:**
- `product` - Produtos
- `customers` - Clientes
- `orders` - Pedidos
- `appointments` - Agendamentos
- `branchstaffs` - Equipe/Coaches
- `branchmanagers` - Gerentes
- `executivemanagers` - Executivos

---

## 🔧 Comandos Úteis

```bash
# Ver logs do backend
docker logs backend_app

# Ver logs do frontend
docker logs frontend_app

# Reiniciar containers
docker-compose restart

# Parar tudo
docker-compose down

# Rebuild completo
docker-compose down
docker-compose up --build -d
```

---

## 📝 Produtos Pré-Cadastrados

Após executar `SETUP.ps1`, os seguintes produtos estarão disponíveis:

1. Energy Drink Turbo - R$ 12,90
2. Garrafa Térmica Pro - R$ 45,90
3. Mochila Fitness Premium - R$ 89,90
4. Whey Protein Premium - R$ 149,90
5. Marmita Fitness Completa - R$ 25,90 (Refeição)
6. Personal Training - R$ 89,90 (Curso)
7. Aula de Yoga - R$ 69,90 (Curso)
8. Camiseta DryFit Pro - R$ 49,90

---

## 🎯 Fluxo de Uso

### Como Gerente:
1. Acesse `/branch`
2. Login com `gerente@filial.com`
3. Gerencie produtos, equipe, pedidos

### Como Cliente:
1. Cadastre-se em `/register`
2. Faça login em `/login`
3. Compre produtos, agende com coaches

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

## 👥 Contribuidores

- Yihang Wang
- Junyi Li
- Sipeng He

---

**💪 Bom treino e boas vendas!**
