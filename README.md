# Meta Pixel Admin Platform

Uma plataforma completa para gerenciamento de Meta Pixels com backend Node.js/PostgreSQL e frontend React/TypeScript.

## 🚀 Funcionalidades

### Frontend (React + TypeScript)
- ✅ Dashboard com métricas em tempo real
- ✅ Gerenciamento de pixels
- ✅ Monitoramento de eventos
- ✅ Configuração de conversões
- ✅ Diagnósticos automáticos
- ✅ Integrações com terceiros
- ✅ Gerenciamento de workspaces
- ✅ Sistema de autenticação
- ✅ Tema claro/escuro
- ✅ Design responsivo

### Backend (Node.js + PostgreSQL)
- ✅ API REST completa
- ✅ Autenticação JWT
- ✅ Sistema de roles (admin, manager, viewer)
- ✅ Gerenciamento de workspaces
- ✅ CRUD completo de pixels
- ✅ Processamento de eventos
- ✅ Sistema de diagnósticos
- ✅ Integrações (GTM, WordPress, Shopify, Webhooks)
- ✅ Analytics e relatórios
- ✅ Logs de auditoria
- ✅ Rate limiting
- ✅ Validação de dados

## 🛠️ Tecnologias

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Framework CSS
- **React Router** - Roteamento
- **Recharts** - Gráficos
- **Framer Motion** - Animações
- **React Hook Form** - Formulários
- **React Hot Toast** - Notificações

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Tipagem estática
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Joi** - Validação de dados
- **Winston** - Sistema de logs
- **Bcrypt** - Criptografia de senhas
- **Node-cron** - Jobs agendados

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### 1. Clone o repositório
```bash
git clone <repository-url>
cd meta-pixel-admin
```

### 2. Instale as dependências

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd server
npm install
```

### 3. Configure o banco de dados

#### Railway PostgreSQL
1. Crie uma conta no [Railway](https://railway.app)
2. Crie um novo projeto
3. Adicione um serviço PostgreSQL
4. Copie a URL de conexão

#### Configuração local (alternativa)
```bash
# Instale PostgreSQL
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Crie o banco de dados
createdb metapixel
```

### 4. Configure as variáveis de ambiente

#### Backend (.env)
```bash
cd server
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database (Railway)
DATABASE_URL=postgresql://postgres:password@host:port/database

# Ou configuração local
DB_HOST=localhost
DB_PORT=5432
DB_NAME=metapixel
DB_USER=postgres
DB_PASSWORD=your_password
DB_SSL=false

# Server
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
```bash
# Na raiz do projeto
cp .env.example .env
```

Edite o arquivo `.env`:
```env
VITE_API_URL=http://localhost:3001/api/v1
```

### 5. Execute as migrações
```bash
cd server
npm run migrate
```

### 6. (Opcional) Execute o seed para dados de exemplo
```bash
cd server
npm run seed
```

## 🚀 Execução

### Desenvolvimento

#### Executar tudo junto
```bash
npm run dev:full
```

#### Executar separadamente

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
npm run dev
```

### Produção

#### Build
```bash
npm run build:full
```

#### Executar
```bash
# Backend
cd server
npm start

# Frontend (servir arquivos estáticos)
npm run preview
```

## 📚 Estrutura da API

### Autenticação
- `POST /api/v1/auth/register` - Registro de usuário
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Perfil do usuário
- `PUT /api/v1/auth/me` - Atualizar perfil
- `PUT /api/v1/auth/change-password` - Alterar senha

### Pixels
- `GET /api/v1/pixels` - Listar pixels
- `POST /api/v1/pixels` - Criar pixel
- `GET /api/v1/pixels/:id` - Obter pixel
- `PUT /api/v1/pixels/:id` - Atualizar pixel
- `DELETE /api/v1/pixels/:id` - Deletar pixel
- `GET /api/v1/pixels/:id/analytics` - Analytics do pixel
- `POST /api/v1/pixels/:id/test` - Testar conexão

### Eventos
- `GET /api/v1/events` - Listar eventos
- `POST /api/v1/events` - Criar evento
- `POST /api/v1/events/bulk` - Criar eventos em lote
- `GET /api/v1/events/analytics/summary` - Analytics de eventos

### Analytics
- `GET /api/v1/analytics/dashboard` - Dashboard analytics
- `GET /api/v1/analytics/overview` - Visão geral do workspace
- `GET /api/v1/analytics/realtime` - Analytics em tempo real

### Workspaces
- `GET /api/v1/workspaces` - Listar workspaces
- `POST /api/v1/workspaces` - Criar workspace
- `GET /api/v1/workspaces/:id/members` - Membros do workspace
- `POST /api/v1/workspaces/:id/invite` - Convidar membro

## 🔒 Autenticação

Todas as rotas protegidas requerem o header:
```
Authorization: Bearer <jwt_token>
```

## 🗄️ Banco de Dados

### Schema Principal
- `workspaces` - Organizações/empresas
- `users` - Contas de usuário
- `workspace_members` - Relacionamento usuários-workspaces
- `pixels` - Configurações de pixels
- `events` - Eventos dos pixels
- `conversions` - Definições de conversões
- `diagnostics` - Informações de diagnóstico
- `integrations` - Integrações com terceiros
- `api_keys` - Chaves de API
- `audit_logs` - Logs de auditoria

## 🔧 Deploy

### Railway (Recomendado)

#### Backend
1. Conecte seu repositório ao Railway
2. Configure as variáveis de ambiente
3. Deploy automático

#### Frontend
1. Build: `npm run build`
2. Deploy para Netlify/Vercel/Railway

### Docker
```bash
# Backend
cd server
docker build -t meta-pixel-backend .
docker run -p 3001:3001 meta-pixel-backend

# Frontend
docker build -t meta-pixel-frontend .
docker run -p 80:80 meta-pixel-frontend
```

## 📊 Monitoramento

O sistema inclui:
- Health check em `/health`
- Logs estruturados com Winston
- Métricas de performance
- Sistema de diagnósticos automáticos
- Logs de auditoria

## 🧪 Testes

```bash
# Backend
cd server
npm test

# Frontend
npm test
```

## 📝 Logs

Os logs são salvos em:
- `server/logs/error.log` - Apenas erros
- `server/logs/combined.log` - Todos os logs

## 🔧 Jobs Automáticos

- **Diagnósticos**: A cada 15 minutos
- **Limpeza de eventos**: Diariamente às 2h
- **Estatísticas**: A cada hora
- **Reprocessamento**: A cada 30 minutos

## 🛡️ Segurança

- Validação rigorosa de inputs
- Rate limiting por IP
- Logs de auditoria
- Criptografia de senhas
- Tokens JWT seguros
- CORS configurado
- Headers de segurança

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique os logs da aplicação
- Consulte a documentação da API
- Use o health check endpoint: `/health`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.