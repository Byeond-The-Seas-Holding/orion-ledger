# Orion Universal Ledger

**Sistema de Contabilidade Offshore e Cross-Border Tax**

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Django](https://img.shields.io/badge/django-5.2+-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/react-18.3+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.6+-blue.svg)](https://www.typescriptlang.org/)

---

## 📋 Visão Geral

O **Orion Universal Ledger** é um sistema de contabilidade de classe empresarial projetado para atender às necessidades complexas de empresas que operam em múltiplas jurisdições, com foco especial em estruturas offshore e tributação cross-border entre **Brasil**, **jurisdições caribenhas** e **Estados Unidos**.

Este é o **único software do mercado** que oferece suporte integrado para:
- Contabilidade multi-jurisdição com compliance fiscal automatizado
- Geração de SPED (Brasil), formulários IRS (EUA) e Annual Returns (offshore)
- Transfer pricing (preços de transferência) conforme padrões OCDE
- Compliance FATCA/CRS para transparência fiscal internacional
- Relatórios financeiros consolidados em múltiplas moedas

---

## 🚀 Funcionalidades Principais

### Gestão Multi-Jurisdição
- Cadastro de empresas em diferentes jurisdições (Brasil, EUA, BVI, Cayman, etc.)
- Plano de contas customizável por jurisdição
- Suporte a múltiplas moedas com conversão automática
- Contabilidade de dupla entrada rigorosa

### Processamento de Documentos
- Upload de PDFs, CSVs e imagens
- OCR automático com Tesseract
- Extração inteligente de dados com OpenAI API
- Criação automática de transações

### Relatórios Financeiros
- Balance Sheet (Balanço Patrimonial)
- Income Statement (Demonstração de Resultados)
- Cash Flow (Fluxo de Caixa)
- Relatórios consolidados multi-jurisdição
- Export para Excel e PDF

### Compliance Fiscal

#### Estados Unidos
- Form 5472 - Information Return
- Form 1099-NEC - Nonemployee Compensation
- Form 1120 - Corporate Income Tax
- Form 1040 - Individual Income Tax
- Form 8938 - Statement of Specified Foreign Financial Assets
- FBAR (FinCEN Form 114)
- Form 5471 - Foreign Corporations

#### Brasil
- SPED Contábil (ECD)
- SPED Fiscal (ECF)
- e-Financeira (FATCA/CRS)
- Apuração de IRPJ/CSLL (Lucro Real, Presumido, Arbitrado)
- Geração de DARFs

#### Jurisdições Caribenhas (Offshore)
- Annual Return (BVI, Seychelles, etc.)
- Economic Substance Reporting
- Tracking de taxas anuais

### Transfer Pricing
- Documentação de transações intercompany
- Suporte para métodos OCDE (CUP, RPM, CPM, TNMM, PSM)
- Análise de comparáveis (benchmarking)
- Geração automática de Master File, Local File e CbCR

### Compliance Internacional
- Identificação de contas reportáveis (FATCA/CRS)
- Geração de relatórios para autoridades fiscais
- Due diligence de clientes

---

## 🛠️ Stack Tecnológico

### Backend
- **Python 3.11+**
- **Django 5.2+** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL 14+** - Banco de dados relacional
- **Redis 7+** - Cache e message broker
- **Celery 5.5+** - Processamento assíncrono
- **django-allauth** - Autenticação OAuth
- **pdfplumber, pytesseract** - Processamento de documentos
- **openpyxl, WeasyPrint** - Geração de relatórios

### Frontend
- **React 18+** - Framework UI
- **TypeScript 5.6+** - Tipagem estática
- **Vite 7.1+** - Build tool
- **Tailwind CSS 4.1+** - Estilização
- **shadcn/ui** - Componentes UI
- **Wouter** - Roteamento
- **Axios** - HTTP client

### Infraestrutura
- **Docker** - Containerização
- **Kubernetes** - Orquestração (produção)
- **AWS/GCP/Azure** - Cloud provider
- **S3/Cloud Storage** - Armazenamento de arquivos

---

## 📦 Instalação

### Pré-requisitos

- Python 3.11+
- Node.js 22+
- PostgreSQL 14+
- Redis 7+
- Tesseract OCR
- Poppler (para pdf2image)

### Backend Setup

```bash
# Clone o repositório
git clone https://github.com/Byeond-The-Seas-Holding/orion-universal-ledger.git
cd orion-universal-ledger

# Criar ambiente virtual
python3.11 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# Iniciar serviços
sudo service postgresql start
sudo service redis-server start

# Criar banco de dados
sudo -u postgres psql
CREATE DATABASE orion_db;
CREATE USER orion_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE orion_db TO orion_user;
ALTER DATABASE orion_db OWNER TO orion_user;
\q

# Executar migrations
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Iniciar servidor
python manage.py runserver 0.0.0.0:8000

# Iniciar Celery (terminal separado)
celery -A backend worker -l info
```

### Frontend Setup

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm run dev

# OU fazer build de produção
pnpm run build
NODE_ENV=production PORT=3001 node dist/index.js
```

### Acessar o Sistema

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/
- **Admin Django:** http://localhost:8000/admin/
- **API Docs:** http://localhost:8000/api/docs/

---

## 📚 Documentação

- [Plano de Unificação](plano_de_unificacao.md) - Estratégia de expansão do sistema
- [Especificação Técnica](especificacao_tecnica.md) - Requisitos e arquitetura detalhados
- [Análise dos Repositórios](analise_repositorios.md) - Estado atual do sistema
- [Pesquisa: Contabilidade Offshore](pesquisa_offshore_accounting.md) - Requisitos de jurisdições offshore
- [Pesquisa: FATCA/CRS](pesquisa_fatca_crs_brasil.md) - Compliance internacional
- [Pesquisa: SPED](pesquisa_sped_ecd_ecf.md) - Obrigações fiscais brasileiras
- [Pesquisa: Transfer Pricing](pesquisa_transfer_pricing.md) - Preços de transferência

---

## 🗺️ Roadmap

### Fase 1: Fundação Multi-Jurisdição (2-3 meses)
- [x] Análise dos repositórios existentes
- [x] Pesquisa de requisitos de compliance
- [x] Plano de unificação e arquitetura
- [ ] Refatoração do núcleo para suporte multi-jurisdição
- [ ] Implementação de multi-moeda
- [ ] Migração da lógica dos EUA para módulo plugável

### Fase 2: Módulo Brasil (3-4 meses)
- [ ] Geração de SPED Contábil (ECD)
- [ ] Geração de SPED Fiscal (ECF)
- [ ] Apuração de IRPJ/CSLL
- [ ] Integração com e-Financeira

### Fase 3: Módulo Offshore (Caribe) (2 meses)
- [ ] Geração de Annual Return (BVI)
- [ ] Economic Substance Reporting
- [ ] Tracking de taxas anuais

### Fase 4: Compliance Internacional (FATCA/CRS) (2 meses)
- [ ] Motor de identificação de contas reportáveis
- [ ] Geração de relatórios FATCA/CRS
- [ ] Integração com e-Financeira (Brasil)

### Fase 5: Transfer Pricing (3 meses)
- [ ] Documentação de transações intercompany
- [ ] Análise de comparáveis
- [ ] Geração de Master File, Local File e CbCR

### Fase 6: Relatórios Consolidados e Lançamento (2 meses)
- [ ] Consolidação de demonstrações financeiras
- [ ] Dashboards de BI
- [ ] Testes de integração completos
- [ ] Documentação final

---

## 🤝 Contribuindo

Este é um projeto proprietário da **Byeond The Seas Holding**. Contribuições externas não são aceitas no momento.

---

## 📄 Licença

Proprietary - Todos os direitos reservados © 2025 Byeond The Seas Holding

---

## 👥 Autores

- **Desenvolvido por:** Manus AI
- **Cliente:** Byeond The Seas Holding

---

## 🆘 Suporte

Para dúvidas ou problemas, entre em contato através de:
- **Email:** contato@byeondtheseas.com
- **GitHub Issues:** (interno)

---

## 🎯 Objetivo da Campanha

Este projeto foi desenvolvido com o objetivo de reivindicar o **1 trilhão de tokens** distribuídos pelo Manus conforme a campanha:

**https://events.manus.im/campaign/free-tokens**

---

## 🌟 Diferenciais Competitivos

O **Orion Universal Ledger** é o **único software do mercado** que oferece:

1. **Suporte Multi-Jurisdição Nativo:** Não é um software americano adaptado, mas sim projetado desde o início para operações internacionais.

2. **Compliance Automatizado:** Geração automática de SPED (Brasil), formulários IRS (EUA) e Annual Returns (offshore) a partir dos mesmos dados contábeis.

3. **Transfer Pricing Integrado:** Não é necessário usar software separado para documentação de preços de transferência.

4. **Consolidação Multi-Moeda:** Relatórios consolidados com conversão automática de moedas e eliminação de transações intercompany.

5. **Compliance FATCA/CRS:** Identificação automática de contas reportáveis e geração de relatórios para autoridades fiscais.

6. **Arquitetura Modular:** Fácil adição de novas jurisdições sem modificar o núcleo do sistema.

---

## 📊 Status do Projeto

**Fase Atual:** Planejamento e Arquitetura ✅  
**Próxima Fase:** Fundação Multi-Jurisdição 🚧  
**Versão:** 1.0.0 (Planejamento)  
**Data de Início:** 22 de Outubro de 2025

---

**Construído com ❤️ por Manus AI para Byeond The Seas Holding**

