# Orion Universal Ledger - Deploy em Produção ✅

**Data de Deploy:** 22 de Outubro de 2025  
**Status:** ✅ RODANDO EM PRODUÇÃO

---

## 🌐 URLs Públicas (ATIVAS)

### 🎨 Frontend (Interface do Usuário)
```
https://3001-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer
```
**Status:** ✅ Online e funcionando

### ⚙️ Backend (API e Admin)
```
API: https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer/api/
Admin: https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer/admin/
```
**Status:** ✅ Online e funcionando

---

## 🔐 Credenciais de Acesso

### Django Admin
- **URL:** https://8000-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer/admin/
- **Username:** `admin`
- **Password:** `admin123`

### Banco de Dados (PostgreSQL)
- **Database:** `accounting_db`
- **User:** `accounting_user`
- **Password:** `accounting_pass123`
- **Host:** `localhost`
- **Port:** `5432`

---

## 🚀 Serviços Ativos

| Serviço | Status | Porta | Workers/Processes |
|---------|--------|-------|-------------------|
| **Frontend (Vite)** | ✅ Running | 3001 | 1 |
| **Backend (Gunicorn)** | ✅ Running | 8000 | 3 workers |
| **Celery Worker** | ✅ Running | - | 7 processes |
| **PostgreSQL** | ✅ Running | 5432 | - |
| **Redis** | ✅ Running | 6379 | - |

---

## 📦 Funcionalidades Disponíveis

### ✅ Implementadas e Funcionando

**Core Contábil:**
- ✅ Gestão de empresas (multi-company)
- ✅ Plano de contas customizável
- ✅ Contabilidade de dupla entrada
- ✅ Lançamentos contábeis (Journal Entries)
- ✅ Validação automática de balanceamento

**Documentos:**
- ✅ Upload de PDF, CSV, imagens
- ✅ OCR com Tesseract
- ✅ Extração inteligente com OpenAI API
- ✅ Processamento assíncrono (Celery)
- ✅ Tracking de status de processamento

**Transações:**
- ✅ Criação manual de transações
- ✅ Categorização automática (IA)
- ✅ Score de confiança
- ✅ Validação de transações
- ✅ Histórico completo

**Relatórios Financeiros:**
- ✅ Balance Sheet (Balanço Patrimonial)
- ✅ Income Statement (DRE)
- ✅ Cash Flow Statement (Fluxo de Caixa)
- ✅ Export para Excel (.xlsx)
- ✅ Export para PDF

**Formulários IRS:**
- ✅ Form 5472 (Foreign-Owned US Companies)
- ✅ Form 1099-NEC (Nonemployee Compensation)
- ✅ Form 1120 (Corporate Income Tax)
- ✅ Form 1040 (Individual Income Tax)
- ✅ Geração de PDF preenchido

**Autenticação:**
- ✅ OAuth com Google
- ✅ OAuth com Microsoft
- ✅ Login tradicional (username/password)
- ✅ Gestão de perfis de usuário

---

## 🎯 Como Usar o Sistema

### 1. Acessar o Frontend
Abra no navegador:
```
https://3001-iawczpd16uqen9op7vv32-370d3fde.manusvm.computer
```

### 2. Fazer Login
- Clique em "Login with Google" ou "Login with Microsoft"
- Ou use credenciais do Django Admin (admin/admin123)

### 3. Configurar Empresa
1. Clique em "🏢 Manage Companies"
2. Adicione uma nova empresa com:
   - Nome
   - EIN (Tax ID)
   - Endereço
   - Início do ano fiscal

### 4. Upload de Documentos
1. Clique em "📄 Upload Document"
2. Selecione PDF, CSV ou imagem
3. Aguarde processamento (Celery + OpenAI)
4. Revise transações extraídas

### 5. Validar Transações
1. Vá em "💰 View Transactions"
2. Revise transações sugeridas pela IA
3. Aprove ou edite conforme necessário

### 6. Gerar Relatórios
1. Clique em "📊 Generate Reports"
2. Escolha tipo de relatório
3. Selecione período
4. Export para Excel ou PDF

### 7. Formulários IRS
1. Clique em "📝 IRS Forms"
2. Escolha formulário
3. Preencha informações
4. Gere PDF

---

## 🔄 Gerenciamento de Serviços

### Script de Inicialização Automática
```bash
/home/ubuntu/start_production.sh
```

### Comandos Individuais

**Iniciar tudo:**
```bash
/home/ubuntu/start_production.sh
```

**Parar Gunicorn:**
```bash
pkill gunicorn
```

**Iniciar Gunicorn:**
```bash
cd /home/ubuntu/contabilidade-backend
gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3 --daemon \
  --access-logfile /tmp/gunicorn-access.log \
  --error-logfile /tmp/gunicorn-error.log
```

**Parar Celery:**
```bash
pkill -f "celery -A backend worker"
```

**Iniciar Celery:**
```bash
cd /home/ubuntu/contabilidade-backend
celery -A backend worker -l info --detach --logfile=/tmp/celery.log
```

**Reiniciar Frontend:**
```bash
# Parar
pkill -f "pnpm run dev"

# Iniciar
cd /home/ubuntu/contabilidade-repo1
pnpm run dev > /tmp/frontend.log 2>&1 &
```

---

## 📊 Monitoramento e Logs

### Verificar Status

**Todos os serviços:**
```bash
echo "=== Gunicorn ===" && ps aux | grep gunicorn | grep -v grep
echo "=== Celery ===" && ps aux | grep celery | grep worker | grep -v grep | head -3
echo "=== Frontend ===" && ps aux | grep "pnpm run dev" | grep -v grep | head -2
echo "=== PostgreSQL ===" && sudo service postgresql status | grep Active
echo "=== Redis ===" && redis-cli ping
```

**Testar APIs:**
```bash
# Backend API
curl http://localhost:8000/api/

# Frontend
curl -I http://localhost:3001/
```

### Logs em Tempo Real

**Gunicorn (Backend):**
```bash
tail -f /tmp/gunicorn-access.log
tail -f /tmp/gunicorn-error.log
```

**Celery (Processamento):**
```bash
tail -f /tmp/celery.log
```

**Frontend:**
```bash
tail -f /tmp/frontend.log
```

### Verificar Últimos Erros

```bash
# Gunicorn
tail -50 /tmp/gunicorn-error.log | grep ERROR

# Celery
tail -100 /tmp/celery.log | grep -E "(ERROR|Exception)"

# Frontend
tail -50 /tmp/frontend.log | grep -E "(error|Error)"
```

---

## 🛠️ Manutenção

### Aplicar Migrations
```bash
cd /home/ubuntu/contabilidade-backend
python3 manage.py makemigrations
python3 manage.py migrate
```

### Criar Novo Superusuário
```bash
cd /home/ubuntu/contabilidade-backend
python3 manage.py createsuperuser
```

### Limpar Cache do Redis
```bash
redis-cli FLUSHALL
```

### Backup do Banco de Dados
```bash
# Criar backup
sudo -u postgres pg_dump accounting_db > /home/ubuntu/backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar backup
sudo -u postgres psql accounting_db < /home/ubuntu/backup_YYYYMMDD_HHMMSS.sql
```

### Atualizar Código
```bash
# Backend
cd /home/ubuntu/contabilidade-backend
git pull origin main
python3 manage.py migrate
pkill gunicorn
gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3 --daemon

# Frontend
cd /home/ubuntu/contabilidade-repo1
git pull origin main
pnpm install
pkill -f "pnpm run dev"
pnpm run dev > /tmp/frontend.log 2>&1 &
```

---

## 🔧 Troubleshooting

### Problema: Frontend não carrega

**Sintomas:** Página em branco ou timeout

**Solução:**
```bash
# 1. Verificar se está rodando
ps aux | grep "pnpm run dev" | grep -v grep

# 2. Ver logs
tail -50 /tmp/frontend.log

# 3. Reiniciar
pkill -f "pnpm run dev"
cd /home/ubuntu/contabilidade-repo1
pnpm run dev > /tmp/frontend.log 2>&1 &

# 4. Aguardar 5 segundos e testar
sleep 5 && curl -I http://localhost:3001/
```

### Problema: Backend retorna 500

**Sintomas:** Erro 500 na API

**Solução:**
```bash
# 1. Ver logs de erro
tail -50 /tmp/gunicorn-error.log

# 2. Verificar banco de dados
sudo service postgresql status
psql -U accounting_user -d accounting_db -c "SELECT 1;"

# 3. Reiniciar Gunicorn
pkill gunicorn
cd /home/ubuntu/contabilidade-backend
gunicorn backend.wsgi:application --bind 0.0.0.0:8000 --workers 3 --daemon
```

### Problema: Documentos não são processados

**Sintomas:** Upload funciona mas status fica em "processing"

**Solução:**
```bash
# 1. Verificar Celery
ps aux | grep celery | grep worker | grep -v grep

# 2. Ver logs do Celery
tail -100 /tmp/celery.log

# 3. Verificar Redis
redis-cli ping

# 4. Reiniciar Celery
pkill -f "celery -A backend worker"
cd /home/ubuntu/contabilidade-backend
celery -A backend worker -l info --detach --logfile=/tmp/celery.log
```

### Problema: Erro de conexão com banco de dados

**Sintomas:** "connection refused" ou "authentication failed"

**Solução:**
```bash
# 1. Verificar se PostgreSQL está rodando
sudo service postgresql status

# 2. Iniciar se necessário
sudo service postgresql start

# 3. Testar conexão
psql -U accounting_user -d accounting_db -c "SELECT version();"

# 4. Se senha estiver errada, resetar
sudo -u postgres psql -c "ALTER USER accounting_user WITH PASSWORD 'accounting_pass123';"
```

---

## 📈 Performance e Otimização

### Configurações Atuais

**Gunicorn:**
- Workers: 3 (1 master + 3 workers)
- Worker class: sync
- Timeout: 30 segundos
- Keepalive: 2 segundos

**Celery:**
- Concurrency: Auto (baseado em CPU cores)
- Task time limit: 300 segundos
- Result backend: Redis
- Broker: Redis

**PostgreSQL:**
- Max connections: 100
- Shared buffers: 128MB
- Effective cache size: 4GB

**Redis:**
- Max memory: Default (sem limite)
- Eviction policy: noeviction

### Recomendações para Produção Real

1. **Aumentar workers do Gunicorn** para `(2 x CPU cores) + 1`
2. **Implementar Nginx** como reverse proxy
3. **Configurar SSL/TLS** com Let's Encrypt
4. **Adicionar monitoring** (Sentry, Prometheus, Grafana)
5. **Implementar rate limiting** na API
6. **Configurar backups automáticos** diários
7. **Usar CDN** para assets estáticos
8. **Implementar caching** agressivo com Redis

---

## 🔒 Segurança

### Checklist de Segurança

- [x] PostgreSQL com senha configurada
- [x] Redis rodando localmente (não exposto)
- [x] CORS configurado no Django
- [x] ALLOWED_HOSTS configurado
- [ ] DEBUG = False (verificar em produção)
- [ ] SECRET_KEY forte e única
- [ ] HTTPS habilitado
- [ ] Firewall configurado
- [ ] Backups automáticos
- [ ] 2FA para admin

### Ações Recomendadas

**Imediatas:**
1. Mudar senha do admin
2. Mudar senha do banco de dados
3. Gerar novo SECRET_KEY
4. Configurar DEBUG=False

**Curto Prazo:**
1. Implementar rate limiting
2. Adicionar 2FA
3. Configurar backups automáticos
4. Implementar monitoring

**Longo Prazo:**
1. Migrar para servidor dedicado
2. Configurar SSL/TLS
3. Implementar WAF
4. SOC 2 compliance

---

## 📝 Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────┐
│                 USUÁRIO (Browser)                        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ HTTPS
                       │
┌──────────────────────▼──────────────────────────────────┐
│              FRONTEND (React + Vite)                     │
│      https://3001-...manusvm.computer                    │
│                                                          │
│  ┌────────────┐  ┌──────────┐  ┌──────────────┐       │
│  │ Dashboard  │  │Documents │  │  Reports     │       │
│  │ Components │  │  Upload  │  │  Generation  │       │
│  └────────────┘  └──────────┘  └──────────────┘       │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ REST API (JSON)
                       │
┌──────────────────────▼──────────────────────────────────┐
│            BACKEND (Django + DRF)                        │
│      https://8000-...manusvm.computer                    │
│                                                          │
│  ┌────────────┐  ┌──────────┐  ┌──────────────┐       │
│  │ Gunicorn   │  │  Celery  │  │   Django     │       │
│  │ (3 workers)│  │  Worker  │  │   Admin      │       │
│  └────────────┘  └──────────┘  └──────────────┘       │
│                                                          │
│  Apps: companies, documents, transactions,               │
│        reports, irs_forms                                │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐
│ PostgreSQL   │ │  Redis   │ │   Files    │
│  (Database)  │ │ (Cache/  │ │  (Media/   │
│              │ │  Broker) │ │   Uploads) │
└──────────────┘ └──────────┘ └────────────┘
```

---

## 🎓 Próximos Passos de Desenvolvimento

### Fase 1: Polish & Performance (em andamento)
- [ ] Melhorar UX/UI
- [ ] Adicionar tooltips
- [ ] Implementar onboarding
- [ ] Otimizar queries
- [ ] Aumentar testes

### Fase 2: Funcionalidades Essenciais
- [ ] Customers (clientes)
- [ ] Vendors (fornecedores)
- [ ] Invoicing (faturamento)
- [ ] Bill management
- [ ] Bank reconciliation
- [ ] Payroll básico

### Fase 3: Formulários IRS Avançados
- [ ] Form 941, W-2, W-3
- [ ] Form 1099-MISC, 1099-INT, 1099-DIV
- [ ] Schedule C, Schedule E
- [ ] Form 1065, Schedule K-1

### Fase 4: Inteligência e Automação
- [ ] Dashboard com KPIs
- [ ] Análise de tendências
- [ ] Chatbot assistente
- [ ] Previsão de fluxo de caixa

### Fase 5: Integrações
- [ ] Plaid (bancos)
- [ ] Stripe (pagamentos)
- [ ] Shopify (e-commerce)

---

## 📞 Informações de Suporte

**Repositórios:**
- Backend: `/home/ubuntu/contabilidade-backend`
- Frontend: `/home/ubuntu/contabilidade-repo1`

**Documentação:**
- Django: https://docs.djangoproject.com/
- DRF: https://www.django-rest-framework.org/
- Celery: https://docs.celeryproject.org/
- React: https://react.dev/

**Logs:**
- Gunicorn: `/tmp/gunicorn-*.log`
- Celery: `/tmp/celery.log`
- Frontend: `/tmp/frontend.log`

---

**Última atualização:** 22 de Outubro de 2025, 08:20 EDT  
**Versão:** v1.0.0-alpha  
**Status:** ✅ PRODUÇÃO ATIVA

