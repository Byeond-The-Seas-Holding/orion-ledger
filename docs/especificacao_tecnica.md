# Especificação Técnica: Orion Universal Ledger

**Sistema de Contabilidade Offshore e Cross-Border Tax**  
**Versão:** 1.0.0  
**Data:** 22 de Outubro de 2025  
**Autor:** Manus AI

---

## 1. Visão Geral do Sistema

O **Orion Universal Ledger** é um sistema de contabilidade de classe empresarial projetado para atender às necessidades complexas de empresas que operam em múltiplas jurisdições, com foco especial em estruturas offshore e tributação cross-border entre Brasil, jurisdições caribenhas e Estados Unidos.

O sistema é construído sobre uma arquitetura modular que permite a extensão para novas jurisdições sem modificar o núcleo contábil, garantindo escalabilidade e manutenibilidade a longo prazo.

---

## 2. Requisitos Funcionais

### 2.1. Gestão de Entidades Multi-Jurisdição

O sistema deve permitir o cadastro e gestão de empresas operando em diferentes jurisdições, com suporte para:

- **Cadastro de Empresas:** Nome, identificação fiscal (EIN, CNPJ, etc.), tipo de entidade (LLC, S-Corp, C-Corp, LTDA, etc.), jurisdição de incorporação, endereço, ano fiscal.
- **Gestão de Usuários:** Perfis de usuário com permissões granulares, suporte a múltiplos usuários por empresa, autenticação via OAuth 2.0 (Google, Microsoft).
- **Plano de Contas Customizável:** Criação de planos de contas específicos por jurisdição, com suporte a hierarquia de contas (até 5 níveis), códigos de conta flexíveis e mapeamento para relatórios fiscais.

### 2.2. Contabilidade de Dupla Entrada

O núcleo contábil deve implementar rigorosamente os princípios da contabilidade de dupla entrada:

- **Lançamentos Contábeis (Journal Entries):** Criação manual e automática de lançamentos, validação de balanceamento (débito = crédito), histórico completo de lançamentos.
- **Transações:** Registro de transações financeiras com categorização automática (via IA), validação manual, status (pendente, aprovada, rejeitada).
- **Livros Contábeis:** Livro Diário, Livro Razão, Balancetes (diário, mensal, anual).

### 2.3. Processamento de Documentos

O sistema deve automatizar a extração de dados de documentos financeiros:

- **Upload de Documentos:** Suporte para PDF, CSV, PNG, JPG (máximo 10MB por arquivo), upload simultâneo de múltiplos arquivos, interface drag-and-drop.
- **Extração de Dados:** OCR com Tesseract para imagens, parsing de PDFs com pdfplumber, parsing de CSVs, extração inteligente com OpenAI API (opcional).
- **Processamento Assíncrono:** Uso de Celery para processamento em background, status tracking (uploaded, processing, completed, failed), notificações de conclusão.

### 2.4. Multi-Moeda e Conversão Cambial

O sistema deve suportar operações em múltiplas moedas:

- **Suporte a Moedas:** Todas as moedas principais (USD, BRL, EUR, GBP, etc.), taxas de câmbio históricas e em tempo real (integração com API externa).
- **Conversão Automática:** Conversão de valores entre moedas para relatórios consolidados, tracking de ganhos/perdas cambiais.

### 2.5. Relatórios Financeiros

O sistema deve gerar relatórios financeiros padrão:

- **Balance Sheet (Balanço Patrimonial):** Assets (Current + Fixed), Liabilities (Current + Long-term), Equity (Capital + Retained Earnings).
- **Income Statement (DRE):** Revenues por categoria, Expenses por categoria, Net Income (Lucro Líquido).
- **Cash Flow Statement:** Operating Activities, Investing Activities, Financing Activities, Net Change in Cash.
- **Exportação:** Excel (XLSX) com formatação, PDF profissional.

### 2.6. Compliance Fiscal por Jurisdição

#### 2.6.1. Estados Unidos
- **Formulários IRS:** Form 5472, Form 1099-NEC, Form 1120, Form 1040, Form 8938, FBAR (FinCEN Form 114), Form 5471.
- **Geração Automática:** Mapeamento automático de contas para campos dos formulários, validação de dados, download de PDFs preenchidos.

#### 2.6.2. Brasil
- **SPED Contábil (ECD):** Geração de arquivo XML conforme layout da Receita Federal, Livro Diário, Razão e Balancetes, assinatura digital, transmissão via PVA.
- **SPED Fiscal (ECF):** Apuração de IRPJ e CSLL (Lucro Real, Presumido, Arbitrado), adições, exclusões e compensações fiscais, geração de arquivo XML.
- **e-Financeira:** Identificação de contas reportáveis (FATCA/CRS), geração de arquivo XML, submissão semestral.
- **DARFs:** Geração de guias de pagamento de tributos federais.

#### 2.6.3. Jurisdições Caribenhas (Offshore)
- **Annual Return:** Geração de resumo financeiro simplificado (BVI, Seychelles, etc.), balanço patrimonial e demonstração de lucros e perdas.
- **Economic Substance Reporting:** Ferramenta para documentar substância econômica (funcionários, despesas, ativos), geração de relatórios para autoridades locais.
- **Tracking de Taxas:** Alertas para prazos de pagamento de taxas anuais, histórico de pagamentos.

### 2.7. Compliance Internacional (FATCA/CRS)

- **Identificação de Contas Reportáveis:** Motor de regras para identificar contas de US Persons (FATCA) e residentes fiscais de países participantes do CRS.
- **Geração de Relatórios:** Form 8938, FBAR, e-Financeira (Brasil), relatórios CRS para outras jurisdições.
- **Due Diligence:** Ferramentas para coleta de self-certification de clientes, validação de TINs (Tax Identification Numbers).

### 2.8. Transfer Pricing (Preços de Transferência)

- **Documentação de Transações Intercompany:** Interface para registrar transações entre partes relacionadas, classificação por tipo (bens, serviços, intangíveis, financiamento).
- **Métodos de TP:** Suporte para CUP, RPM, CPM, TNMM, PSM (métodos da OCDE), cálculo de arm's length range.
- **Análise de Comparáveis:** Base de dados de comparáveis, análise de comparabilidade, ajustes de comparabilidade.
- **Documentação Automática:** Geração de Master File, Local File, Country-by-Country Report (CbCR).

### 2.9. Relatórios Consolidados

- **Consolidação de Demonstrações Financeiras:** Conversão de balanços de diferentes moedas para uma moeda base, eliminação de transações intercompany, balanço consolidado do grupo.
- **Dashboards de BI:** Visão global das entidades, análise de carga tributária efetiva por jurisdição, relatórios de exposição cambial.

---

## 3. Requisitos Não-Funcionais

### 3.1. Performance
- **Tempo de Resposta:** APIs devem responder em menos de 500ms para 95% das requisições.
- **Processamento de Documentos:** OCR e extração de dados devem ser concluídos em menos de 2 minutos para documentos de até 50 páginas.
- **Escalabilidade:** O sistema deve suportar pelo menos 10.000 empresas e 100.000 transações por mês sem degradação de performance.

### 3.2. Segurança
- **Autenticação:** OAuth 2.0 (Google, Microsoft), autenticação de dois fatores (2FA).
- **Autorização:** Controle de acesso baseado em papéis (RBAC), isolamento de dados por empresa.
- **Criptografia:** Dados sensíveis em repouso devem ser criptografados (AES-256), comunicação via HTTPS (TLS 1.3).
- **Auditoria:** Trilha completa de ações (quem, o quê, quando), logs imutáveis.

### 3.3. Disponibilidade
- **Uptime:** 99.9% de disponibilidade (SLA).
- **Backup:** Backups diários automáticos, retenção por 30 dias, testes de restauração mensais.

### 3.4. Usabilidade
- **Interface Intuitiva:** Design moderno e limpo, componentes reutilizáveis (shadcn/ui), feedback visual (toasts, loading spinners, empty states).
- **Responsividade:** Interface otimizada para desktop (foco principal), suporte básico para tablets.
- **Internacionalização (i18n):** Suporte para Português (Brasil), Inglês (EUA), Espanhol (futuro).

### 3.5. Manutenibilidade
- **Código Limpo:** Seguir PEP8 (Python), padrões de código TypeScript, comentários e documentação inline.
- **Testes Automatizados:** Cobertura de testes de pelo menos 80%, testes unitários, testes de integração, testes end-to-end.
- **Documentação:** README completo, guia do desenvolvedor, guia do usuário, documentação de API (Swagger/OpenAPI).

---

## 4. Arquitetura do Sistema

### 4.1. Arquitetura Geral

O sistema segue uma arquitetura de três camadas (Three-Tier Architecture):

1. **Camada de Apresentação (Frontend):** React 18+, TypeScript, Vite, Tailwind CSS.
2. **Camada de Lógica de Negócio (Backend):** Django 5.2+, Django REST Framework, Python 3.11+.
3. **Camada de Dados (Database):** PostgreSQL 14+.

Adicionalmente, o sistema utiliza:
- **Message Broker:** Redis 7+ para Celery.
- **Task Queue:** Celery 5.5+ para processamento assíncrono.
- **File Storage:** Sistema de arquivos local (desenvolvimento) ou S3 (produção).

### 4.2. Arquitetura de Módulos (Backend)

O backend é organizado em apps Django modulares:

#### Core Apps:
- **`core`:** Autenticação, usuários, auditoria, configurações globais.
- **`companies`:** Gestão de empresas, plano de contas, usuários associados.
- **`transactions`:** Transações, lançamentos contábeis (journal entries), balanceamento.
- **`documents`:** Upload, armazenamento e processamento de documentos.
- **`reports`:** Geração de relatórios financeiros (Balance Sheet, Income Statement, Cash Flow).

#### Jurisdiction Apps (Plugáveis):
- **`jurisdiction_us`:** Lógica específica dos EUA (IRS, US GAAP, formulários).
- **`jurisdiction_br`:** Lógica específica do Brasil (SPED, Receita Federal, apuração de IRPJ/CSLL).
- **`jurisdiction_caribbean`:** Lógica específica de jurisdições caribenhas (BVI, Cayman, etc.).

#### Cross-Border Apps:
- **`cross_border`:** Conversão de moedas, consolidação de relatórios, gestão de taxas de câmbio.
- **`transfer_pricing`:** Documentação de TP, análise de comparáveis, geração de Master File/Local File/CbCR.
- **`compliance_intl`:** FATCA, CRS, e-Financeira, identificação de contas reportáveis.

### 4.3. Modelo de Dados

#### Tabelas Core:

**`User`** (Django built-in)
- `id`, `username`, `email`, `password`, `is_active`, `date_joined`

**`UserProfile`** (extensão de User)
- `user` (FK), `active_company` (FK), `phone`, `timezone`, `language`

**`Company`**
- `id`, `name`, `tax_id`, `entity_type`, `jurisdiction`, `fiscal_year_end`, `address`, `created_at`, `updated_at`

**`ChartOfAccounts`**
- `id`, `company` (FK), `code`, `name`, `account_type` (Asset, Liability, Equity, Revenue, Expense), `parent` (FK, self), `is_active`, `currency`

**`Transaction`**
- `id`, `company` (FK), `date`, `description`, `amount`, `currency`, `category` (FK), `status` (Pending, Approved, Rejected), `document` (FK), `created_by` (FK), `created_at`

**`JournalEntry`**
- `id`, `company` (FK), `date`, `description`, `transaction` (FK, nullable), `created_by` (FK), `created_at`

**`JournalEntryLine`**
- `id`, `journal_entry` (FK), `account` (FK), `debit`, `credit`, `currency`

**`Document`**
- `id`, `company` (FK), `file_path`, `file_type`, `status` (Uploaded, Processing, Completed, Failed), `uploaded_by` (FK), `uploaded_at`, `processed_at`

**`AuditLog`**
- `id`, `user` (FK), `action`, `model`, `object_id`, `changes` (JSON), `timestamp`

#### Tabelas Específicas de Jurisdição (Exemplos):

**`IRSForm`** (jurisdiction_us)
- `id`, `company` (FK), `form_type` (5472, 1099-NEC, 1120, 1040, 8938, FBAR, 5471), `tax_year`, `status` (Draft, Ready, Filed), `data` (JSON), `pdf_path`, `created_at`

**`SPEDRecord`** (jurisdiction_br)
- `id`, `company` (FK), `record_type` (ECD, ECF, e-Financeira), `year`, `status` (Draft, Ready, Submitted), `xml_path`, `receipt`, `created_at`

**`AnnualReturn`** (jurisdiction_caribbean)
- `id`, `company` (FK), `jurisdiction`, `year`, `status` (Draft, Ready, Submitted), `data` (JSON), `pdf_path`, `created_at`

#### Tabelas Cross-Border:

**`ExchangeRate`**
- `id`, `from_currency`, `to_currency`, `rate`, `date`

**`TransferPricingTransaction`**
- `id`, `from_entity` (FK), `to_entity` (FK), `date`, `description`, `amount`, `currency`, `tp_method` (CUP, RPM, CPM, TNMM, PSM), `arm_length_range_min`, `arm_length_range_max`, `documentation` (JSON)

**`ReportableAccount`** (compliance_intl)
- `id`, `company` (FK), `account_holder_name`, `account_number`, `balance`, `currency`, `reportable_jurisdiction`, `report_type` (FATCA, CRS), `year`, `status` (Identified, Reported)

### 4.4. APIs (RESTful)

Todas as APIs seguem o padrão REST, com autenticação via token (JWT ou Django Session).

#### Endpoints Core:

**Companies:**
- `GET /api/companies/` - Listar empresas
- `POST /api/companies/` - Criar empresa
- `GET /api/companies/{id}/` - Detalhes da empresa
- `PUT /api/companies/{id}/` - Atualizar empresa
- `DELETE /api/companies/{id}/` - Deletar empresa

**Chart of Accounts:**
- `GET /api/accounts/?company={id}` - Listar contas
- `POST /api/accounts/` - Criar conta
- `GET /api/accounts/{id}/` - Detalhes da conta
- `PUT /api/accounts/{id}/` - Atualizar conta
- `DELETE /api/accounts/{id}/` - Deletar conta

**Transactions:**
- `GET /api/transactions/?company={id}` - Listar transações
- `POST /api/transactions/` - Criar transação
- `GET /api/transactions/{id}/` - Detalhes da transação
- `PUT /api/transactions/{id}/` - Atualizar transação
- `DELETE /api/transactions/{id}/` - Deletar transação
- `POST /api/transactions/{id}/approve/` - Aprovar transação

**Journal Entries:**
- `GET /api/journal-entries/?company={id}` - Listar lançamentos
- `POST /api/journal-entries/` - Criar lançamento
- `GET /api/journal-entries/{id}/` - Detalhes do lançamento

**Documents:**
- `GET /api/documents/?company={id}` - Listar documentos
- `POST /api/documents/upload/` - Upload de documento
- `GET /api/documents/{id}/` - Detalhes do documento
- `GET /api/documents/{id}/status/` - Verificar status de processamento

**Reports:**
- `GET /api/reports/balance-sheet/?company={id}&start_date={date}&end_date={date}` - Balance Sheet
- `GET /api/reports/income-statement/?company={id}&start_date={date}&end_date={date}` - Income Statement
- `GET /api/reports/cash-flow/?company={id}&start_date={date}&end_date={date}` - Cash Flow
- `GET /api/reports/consolidated/?companies={id1,id2}&start_date={date}&end_date={date}` - Relatório Consolidado

#### Endpoints de Jurisdição:

**US (IRS Forms):**
- `GET /api/us/irs-forms/?company={id}` - Listar formulários
- `POST /api/us/irs-forms/` - Criar formulário
- `GET /api/us/irs-forms/{id}/` - Detalhes do formulário
- `POST /api/us/irs-forms/{id}/generate-pdf/` - Gerar PDF

**Brazil (SPED):**
- `GET /api/br/sped-records/?company={id}` - Listar registros SPED
- `POST /api/br/sped-records/generate-ecd/` - Gerar ECD
- `POST /api/br/sped-records/generate-ecf/` - Gerar ECF
- `POST /api/br/sped-records/generate-efinanceira/` - Gerar e-Financeira
- `GET /api/br/sped-records/{id}/download/` - Download do arquivo XML

**Caribbean (Offshore):**
- `GET /api/caribbean/annual-returns/?company={id}` - Listar Annual Returns
- `POST /api/caribbean/annual-returns/` - Criar Annual Return
- `GET /api/caribbean/annual-returns/{id}/` - Detalhes do Annual Return
- `POST /api/caribbean/annual-returns/{id}/generate-pdf/` - Gerar PDF

#### Endpoints Cross-Border:

**Transfer Pricing:**
- `GET /api/transfer-pricing/transactions/?company={id}` - Listar transações TP
- `POST /api/transfer-pricing/transactions/` - Criar transação TP
- `GET /api/transfer-pricing/transactions/{id}/` - Detalhes da transação TP
- `POST /api/transfer-pricing/generate-master-file/?company={id}` - Gerar Master File
- `POST /api/transfer-pricing/generate-local-file/?company={id}` - Gerar Local File
- `POST /api/transfer-pricing/generate-cbcr/?company={id}` - Gerar CbCR

**Compliance International:**
- `GET /api/compliance-intl/reportable-accounts/?company={id}` - Listar contas reportáveis
- `POST /api/compliance-intl/identify-reportable-accounts/` - Identificar contas reportáveis
- `POST /api/compliance-intl/generate-fatca-report/` - Gerar relatório FATCA
- `POST /api/compliance-intl/generate-crs-report/` - Gerar relatório CRS

---

## 5. Tecnologias e Bibliotecas

### 5.1. Backend (Python/Django)

**Core:**
- Python 3.11+
- Django 5.2+
- Django REST Framework 3.16+
- PostgreSQL 14+ (psycopg2-binary)
- Celery 5.5+
- Redis 7+

**Autenticação:**
- django-allauth 65.12+
- PyJWT 2.10+

**Processamento de Documentos:**
- pdfplumber 0.11+
- pytesseract 0.3+
- pdf2image 1.17+
- Pillow 11.2+

**IA (Opcional):**
- openai 2.5+

**Geração de Relatórios:**
- openpyxl 3.1+ (Excel)
- WeasyPrint 63.1+ (PDF)
- reportlab (alternativa para PDF)

**Formulários IRS:**
- PyPDFForm 3.5+

**SPED (Brasil):**
- py-sped (a avaliar)
- lxml (para XML)

**Conversão de Moeda:**
- forex-python (a avaliar)
- requests (para integração com APIs de câmbio)

**Outros:**
- python-dotenv 1.1+ (variáveis de ambiente)
- gunicorn 23.0+ (servidor WSGI para produção)

### 5.2. Frontend (React/TypeScript)

**Core:**
- React 18.3+
- TypeScript 5.6+
- Vite 7.1+

**Roteamento:**
- wouter 3.3+

**Estilização:**
- Tailwind CSS 4.1+
- shadcn/ui (componentes)
- Radix UI (primitivos)

**HTTP Client:**
- axios 1.12+

**State Management:**
- React Context API (built-in)
- @tanstack/react-query 4.41+ (cache e sincronização de dados)

**Formulários:**
- react-hook-form 7.64+
- zod 4.1+ (validação)

**Ícones:**
- lucide-react 0.453+

**Gráficos:**
- recharts 2.15+

**Outros:**
- framer-motion 12.23+ (animações)
- sonner 2.0+ (toasts)

### 5.3. Infraestrutura

**Desenvolvimento:**
- Docker (containerização)
- Docker Compose (orquestração local)

**Produção:**
- Kubernetes (orquestração)
- AWS / GCP / Azure (cloud provider)
- S3 / Cloud Storage (armazenamento de arquivos)
- CloudFront / CDN (distribuição de conteúdo)

**CI/CD:**
- GitHub Actions
- GitLab CI

**Monitoramento:**
- Sentry (error tracking)
- Prometheus + Grafana (métricas)
- ELK Stack (logs)

---

## 6. Fluxos de Trabalho Principais

### 6.1. Fluxo de Upload e Processamento de Documentos

1. Usuário faz upload de documento via interface web.
2. Frontend envia arquivo para `POST /api/documents/upload/`.
3. Backend salva arquivo no storage e cria registro no banco com status `Uploaded`.
4. Backend enfileira task Celery para processamento.
5. Worker Celery:
   - Atualiza status para `Processing`.
   - Executa OCR (se imagem) ou parsing (se PDF/CSV).
   - Extrai dados relevantes (data, descrição, valor, etc.).
   - Cria transações pendentes baseadas nos dados extraídos.
   - Atualiza status para `Completed` (ou `Failed` em caso de erro).
6. Frontend exibe notificação de conclusão.
7. Usuário revisa transações pendentes e aprova/rejeita.

### 6.2. Fluxo de Geração de Relatório Financeiro

1. Usuário acessa página de relatórios e seleciona tipo (Balance Sheet, Income Statement, Cash Flow).
2. Usuário seleciona empresa, período (data inicial e final) e moeda base.
3. Frontend envia requisição para `GET /api/reports/{tipo}/?company={id}&start_date={date}&end_date={date}&currency={code}`.
4. Backend:
   - Busca todas as transações e lançamentos contábeis no período.
   - Calcula saldos de contas.
   - Converte valores para moeda base (se necessário).
   - Estrutura dados conforme formato do relatório.
   - Retorna JSON com dados do relatório.
5. Frontend renderiza relatório na tela.
6. Usuário pode exportar para Excel ou PDF via botões de ação.
7. Backend gera arquivo e retorna URL para download.

### 6.3. Fluxo de Geração de SPED (Brasil)

1. Usuário acessa módulo Brasil e seleciona "Gerar ECD" ou "Gerar ECF".
2. Usuário seleciona empresa e ano-calendário.
3. Frontend envia requisição para `POST /api/br/sped-records/generate-ecd/` (ou `generate-ecf`).
4. Backend:
   - Valida se empresa tem todos os dados necessários.
   - Busca lançamentos contábeis do ano.
   - Estrutura dados conforme layout SPED.
   - Gera arquivo XML.
   - Salva arquivo e cria registro no banco com status `Ready`.
   - Retorna ID do registro.
5. Frontend exibe mensagem de sucesso e botão para download.
6. Usuário faz download do arquivo XML.
7. Usuário transmite arquivo via PVA (Programa Validador e Assinador) da Receita Federal.

### 6.4. Fluxo de Consolidação de Relatórios

1. Usuário acessa página de relatórios consolidados.
2. Usuário seleciona múltiplas empresas (de diferentes jurisdições), período e moeda base.
3. Frontend envia requisição para `GET /api/reports/consolidated/?companies={id1,id2,id3}&start_date={date}&end_date={date}&currency={code}`.
4. Backend:
   - Busca transações e lançamentos de todas as empresas selecionadas.
   - Converte valores para moeda base usando taxas de câmbio históricas.
   - Identifica e elimina transações intercompany.
   - Consolida saldos de contas.
   - Estrutura dados do relatório consolidado.
   - Retorna JSON.
5. Frontend renderiza relatório consolidado.
6. Usuário pode exportar para Excel ou PDF.

---

## 7. Considerações de Segurança

### 7.1. Autenticação e Autorização
- Implementar autenticação de dois fatores (2FA) para todos os usuários.
- Usar OAuth 2.0 para login social (Google, Microsoft).
- Implementar controle de acesso baseado em papéis (RBAC) com permissões granulares.
- Sessões devem expirar após 30 minutos de inatividade.

### 7.2. Proteção de Dados
- Criptografar dados sensíveis em repouso (AES-256).
- Usar HTTPS (TLS 1.3) para todas as comunicações.
- Implementar rate limiting para prevenir ataques de força bruta.
- Sanitizar todos os inputs para prevenir SQL Injection e XSS.

### 7.3. Auditoria
- Registrar todas as ações de usuários em `AuditLog`.
- Logs devem ser imutáveis e armazenados de forma segura.
- Implementar alertas para ações suspeitas (ex: tentativas de acesso não autorizado).

### 7.4. Compliance
- Garantir conformidade com LGPD (Brasil) e GDPR (UE) para proteção de dados pessoais.
- Implementar mecanismos de consentimento para coleta de dados.
- Permitir que usuários solicitem exportação ou exclusão de seus dados.

---

## 8. Testes

### 8.1. Testes Unitários
- Testar todas as funções e métodos isoladamente.
- Cobertura mínima de 80%.
- Usar `pytest` (Python) e `vitest` (TypeScript).

### 8.2. Testes de Integração
- Testar interações entre módulos (ex: upload de documento → processamento → criação de transação).
- Testar APIs end-to-end.

### 8.3. Testes End-to-End (E2E)
- Testar fluxos completos de usuário (ex: login → upload de documento → revisão de transação → geração de relatório).
- Usar Playwright ou Cypress.

### 8.4. Testes de Performance
- Testar tempo de resposta de APIs sob carga.
- Testar processamento de documentos com arquivos grandes.
- Usar ferramentas como Locust ou JMeter.

---

## 9. Deployment

### 9.1. Ambiente de Desenvolvimento
- Docker Compose para orquestração local.
- PostgreSQL, Redis e Celery rodando em containers.
- Frontend e backend rodando localmente.

### 9.2. Ambiente de Produção
- Kubernetes para orquestração.
- PostgreSQL gerenciado (RDS, Cloud SQL, etc.).
- Redis gerenciado (ElastiCache, Memorystore, etc.).
- Celery workers escaláveis (Horizontal Pod Autoscaler).
- S3 ou Cloud Storage para armazenamento de arquivos.
- CloudFront ou CDN para distribuição de conteúdo estático.
- Load balancer (ALB, GCP Load Balancer, etc.).

### 9.3. CI/CD
- GitHub Actions ou GitLab CI para automação.
- Pipeline:
  1. Lint (flake8, eslint)
  2. Testes (pytest, vitest)
  3. Build (Docker images)
  4. Deploy (Kubernetes)

---

## 10. Conclusão

Esta especificação técnica detalha os requisitos funcionais e não-funcionais, a arquitetura, as tecnologias e os fluxos de trabalho do **Orion Universal Ledger**. O sistema é projetado para ser escalável, seguro e capaz de atender às complexas necessidades de contabilidade offshore e cross-border tax.

O próximo passo é a aprovação desta especificação para que possamos iniciar o desenvolvimento da **Fase 1: Fundação Multi-Jurisdição**.

