# Plano Completo: Correção Upload de Documentos

## 🎯 Objetivo:
Deixar **100% funcional** o fluxo completo de upload, extração, review e importação de transações.

---

## 📋 Problemas Identificados:

### 1. Dropdown de contas não persiste seleção ❌
**Causa Raiz:** Backend retorna transações sem campo `account`. Frontend carrega com `account: undefined`. Quando usuário seleciona, o estado do React não atualiza corretamente.

**Solução:**
- Inicializar transações com `account: ''` no frontend
- Garantir que `handleUpdateTransaction` atualiza o estado corretamente
- Adicionar logs para debugar

### 2. Botão Import não funciona ❌
**Causa Raiz:** Event handler não dispara OU validação impede envio.

**Solução:**
- Verificar se botão está realmente habilitado
- Adicionar logs detalhados
- Testar com e sem validação

### 3. Endpoint de import pode não existir ❓
**Verificar:**
- `/api/transactions/` aceita POST?
- Qual formato de dados espera?
- Precisa de company_id?

---

## 🔧 Plano de Ação:

### Fase 1: Investigação (15min)
1. ✅ Verificar estrutura de dados do backend
2. ⏳ Verificar endpoint de import (`POST /api/transactions/`)
3. ⏳ Verificar estado do React no TransactionReviewModal
4. ⏳ Verificar validação do botão Import

### Fase 2: Correção do Estado (30min)
1. Inicializar transações com `account: ''`
2. Garantir que `handleUpdateTransaction` funciona
3. Adicionar logs detalhados
4. Testar seleção de conta

### Fase 3: Correção do Import (30min)
1. Verificar/criar endpoint de import
2. Corrigir botão Import
3. Testar envio de transações
4. Validar salvamento no banco

### Fase 4: Testes End-to-End (30min)
1. Upload de documento real
2. Extração com OpenAI
3. Review e seleção de contas
4. Import e validação
5. Verificar transações no sistema

### Fase 5: Melhorias UX (30min)
1. Corrigir "Invalid Date"
2. Adicionar feedback visual
3. Melhorar mensagens de erro
4. Adicionar loading states

---

## 📊 Checklist Final:

### Upload
- [ ] Drag & drop funcionando
- [ ] Upload assíncrono
- [ ] Status tracking

### Processamento
- [ ] Celery processando
- [ ] OpenAI extraindo
- [ ] Transações salvas

### Review
- [ ] Modal abrindo
- [ ] Transações carregadas
- [ ] Edição inline funcionando
- [ ] **Dropdown de contas persistindo seleção**
- [ ] Validação visual

### Import
- [ ] **Botão Import funcionando**
- [ ] **Transações enviadas ao backend**
- [ ] **Transações salvas no banco**
- [ ] **Lançamentos contábeis criados**

### UX
- [ ] Datas formatadas corretamente
- [ ] Loading states
- [ ] Mensagens de sucesso/erro
- [ ] Feedback visual

---

## 🚀 Tempo Estimado Total: 2-2.5 horas

---

## 📝 Próximos Passos Imediatos:

1. Verificar endpoint POST /api/transactions/
2. Verificar estado do React
3. Corrigir inicialização de transações
4. Corrigir botão Import
5. Testar end-to-end

