# Orion Universal Ledger

**Modern accounting system for US companies with AI-powered document processing and IRS form generation.**

## 🚀 Features

### Core Functionality
- **Multi-company management** with double-entry bookkeeping
- **Chart of Accounts** with balance calculation and AI analysis
- **Transaction management** with journal entries
- **Document processing** with OCR and AI extraction
- **Financial reports** (Balance Sheet, Income Statement, Cash Flow)
- **IRS Forms generation** (1120, 5472, 1099-NEC, 1040)

### AI-Powered Features
- **Intelligent document extraction** - Upload receipts, invoices, bank statements and automatically extract transactions
- **Chart of Accounts analysis** - AI analyzes your accounts and suggests improvements
- **IRS Forms assistance** - AI reads official IRS instructions and helps fill forms correctly
- **Smart categorization** - Automatic transaction categorization based on your chart of accounts

### Dashboard & Analytics
- **KPI Cards** - Revenue, Expenses, Profit, Cash Runway
- **Interactive charts** - Revenue & Expenses trends (12 months)
- **Expense breakdown** - Pie chart with top 5 categories
- **Cash runway indicator** - Visual alerts (green/yellow/red)

## 📁 Project Structure

```
orion-ledger/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and helpers
│   │   └── contexts/      # React contexts
│   └── package.json
│
├── backend/           # Django + PostgreSQL + Celery
│   ├── backend/           # Django settings
│   ├── companies/         # Company and Chart of Accounts
│   ├── transactions/      # Transactions and Journal Entries
│   ├── documents/         # Document upload and processing
│   ├── irs_forms/         # IRS Forms generation
│   └── requirements.txt
│
└── docs/              # Documentation
    ├── FASE1_IMPLEMENTACOES_COMPLETAS.md
    ├── IMPLEMENTACOES_IA_COMPLETAS_FINAL.md
    ├── DOCUMENTS_FINAL_IMPLEMENTACOES.md
    └── roadmap_v1.1_updated.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Recharts** for data visualization
- **Wouter** for routing

### Backend
- **Django 4.2** with Django REST Framework
- **PostgreSQL** for database
- **Redis** for caching and Celery
- **Celery** for background tasks
- **OpenAI API** (via Manus) for AI features
- **PyPDF2** for PDF processing

## 🚀 Quick Start

### Prerequisites
- Node.js 22+
- Python 3.11+
- PostgreSQL 14+
- Redis 7+

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:3001`

### Backend Setup

```bash
cd backend
pip install -r requirements.txt

# Setup database
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver 8000

# Run Celery worker (in another terminal)
celery -A backend worker -l info
```

Backend API will be available at `http://localhost:8000`

## 📊 Database Schema

### Core Models
- **Company** - Multi-company support
- **ChartOfAccounts** - Account structure (Assets, Liabilities, Equity, Revenue, Expenses)
- **Transaction** - Financial transactions
- **JournalEntry** - Double-entry bookkeeping
- **JournalEntryLine** - Debit/Credit lines
- **Document** - Uploaded documents with AI processing

## 🤖 AI Features

All AI features use **Manus LLM API** with free tokens:

### 1. Document Extraction
- Upload bank statements, receipts, invoices
- AI extracts transactions automatically
- Categorizes based on your Chart of Accounts
- Creates double-entry journal entries

### 2. Chart of Accounts Analysis
- Analyzes account structure
- Detects inconsistencies
- Suggests improvements
- Recommends missing accounts
- Provides health score (0-100)

### 3. IRS Forms Generation
- Downloads official IRS forms
- Reads and understands instructions
- Extracts financial data from system
- Validates calculations
- Generates professional PDF

## 📈 Performance

- **Dashboard load:** < 2s
- **API KPIs (cached):** < 100ms
- **Document processing:** 2-5s per document
- **AI analysis:** 30-60s

## 🔐 Security

- CSRF protection enabled
- CORS configured for production
- Environment variables for secrets
- SQL injection protection (Django ORM)
- XSS protection (React)

## 📝 API Documentation

API documentation available at:
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
```

### Backend
```bash
cd backend
python manage.py test
```

## 📦 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku/AWS)
```bash
cd backend
# Set environment variables
# Run migrations
# Collect static files
python manage.py collectstatic --noinput
```

## 🌟 Recent Updates

### Version 1.1 (October 2025)

**Phase 1: Polish & Performance** ✅
- Dashboard with KPIs and interactive charts
- Tooltips and help text throughout the app
- Improved loading states and empty states
- Optimized queries with caching

**AI Features** ✅
- Document extraction with AI classification
- Chart of Accounts analysis
- IRS Forms generation with PDF output

**Documents Page Overhaul** ✅
- Fixed "View Document" 404 error
- Fixed "Invalid Date" display
- Added delete confirmation dialog
- Removed duplicate documents
- Added filters (search, status, type)
- Added pagination (10 per page)
- Improved design with icons and colors
- Better UX with empty states and toasts

**Chart of Accounts** ✅
- Fixed balance calculation
- Added company name display
- Optimized queries (< 200ms)

## 📚 Documentation

See `/docs` folder for detailed documentation:
- Implementation guides
- Roadmap
- Feature specifications
- API documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with ❤️ for US companies
- AI powered by Manus LLM API
- UI components by shadcn/ui
- Icons by Lucide

## 📞 Support

For issues and questions:
- GitHub Issues: [Create an issue](https://github.com/Byeond-The-Seas-Holding/orion-ledger/issues)
- Email: support@orionledger.com

---

**Status:** ✅ Production Ready  
**Version:** 1.1.0  
**Last Updated:** October 24, 2025

