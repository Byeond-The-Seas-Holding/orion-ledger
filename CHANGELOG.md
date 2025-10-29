# Changelog - Orion Universal Ledger

## [1.2.0] - 2025-10-29

### 🔧 Bug Fixes

#### Frontend
- **URLs Hardcoded**: Substituídas 17 URLs hardcoded por configuração centralizada em `config/api.ts`
- **Console.log**: Removidos 25 console.log de arquivos de produção
- **Arquivos Duplicados**: Movidos 4 arquivos duplicados para `_archive/`
- **Imports**: Corrigidos imports de componentes Dashboard e Documents no App.tsx
- **API Configuration**: Implementada detecção correta de ambiente (DEV vs PROD)

#### Backend
- **Django Settings**: Corrigida ordem de definição de DEBUG e SECRET_KEY
- **Environment Variables**: Criados arquivos .env e .env.example
- **CORS**: Configurado CORS_ALLOWED_ORIGINS via variável de ambiente
- **ALLOWED_HOSTS**: Configurado via variável de ambiente

### ✨ Improvements

- Created centralized API configuration (`frontend/src/config/api.ts`)
- Added `.env.example` files for frontend and backend
- Improved environment detection (DEV vs PROD)
- Enhanced error messages for missing configurations

### 🧪 Testing

- ✅ All 4 IRS forms generating PDFs successfully
- ✅ API responding correctly with JSON
- ✅ Frontend loading data from backend
- ✅ Dropdowns and modals working properly

## [1.1.0] - 2025-10-24

### Initial Release
- Complete accounting system with IRS forms generation
- React frontend with TypeScript
- Django backend with REST API
- PostgreSQL database
- Celery for async tasks
