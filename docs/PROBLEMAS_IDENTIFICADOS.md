# Problemas Identificados - Chart of Accounts e Menu

## Data: 24 de Outubro de 2025

---

## 🔴 PROBLEMAS CRÍTICOS - Chart of Accounts

### 1. **Balance mostrando $NaN** ❌
- **Problema:** Todos os balances estão mostrando "$NaN" ao invés dos valores reais
- **Causa provável:** Cálculo de balance não está funcionando ou dados não estão sendo carregados
- **Impacto:** CRÍTICO - Usuário não consegue ver saldos das contas

### 2. **Account Number vazio** ❌
- **Problema:** Coluna "Number" está vazia para todas as contas
- **Causa provável:** Campo `account_number` não está sendo exibido
- **Impacto:** ALTO - Dificulta identificação e organização das contas

### 3. **Company não está sendo exibida** ❌
- **Problema:** Coluna "Company" está vazia
- **Causa provável:** Relacionamento com Company não está sendo carregado
- **Impacto:** MÉDIO - Importante para multi-company

### 4. **Botões de ação podem não estar funcionando** ⚠️
- **Problema:** Botões Deactivate, Edit, Delete precisam ser testados
- **Causa provável:** Handlers podem não estar implementados
- **Impacto:** ALTO - Funcionalidades básicas de CRUD

### 5. **Filtros podem não estar funcionando** ⚠️
- **Problema:** Filtros "Filter by Type" e "Filter by Company" precisam ser testados
- **Impacto:** MÉDIO - Usabilidade

### 6. **Botão "+ New Account" pode não funcionar** ⚠️
- **Problema:** Modal de criação pode não abrir ou não salvar
- **Impacto:** CRÍTICO - Usuário não consegue adicionar novas contas

---

## 🔴 PROBLEMAS - Menu de Navegação

### 1. **Menu não está visível** ❌
- **Problema:** Não há menu de navegação lateral ou superior visível
- **Causa provável:** Componente de navegação não existe ou não está sendo renderizado
- **Impacto:** CRÍTICO - Usuário não consegue navegar facilmente entre páginas

### 2. **Navegação atual é via URL manual** ❌
- **Problema:** Usuário precisa digitar URLs manualmente
- **Impacto:** CRÍTICO - Péssima experiência de usuário

---

## ✅ SOLUÇÕES PROPOSTAS

### Chart of Accounts

1. **Corrigir cálculo de Balance**
   - Verificar query no backend
   - Garantir que transactions estão sendo somadas corretamente
   - Implementar aggregation por account

2. **Exibir Account Number**
   - Adicionar campo `account_number` na query
   - Exibir na tabela

3. **Exibir Company**
   - Fazer join com Company na query
   - Exibir nome da empresa

4. **Testar e corrigir botões de ação**
   - Implementar handlers para Deactivate, Edit, Delete
   - Adicionar confirmação antes de deletar
   - Implementar modal de edição

5. **Testar e corrigir filtros**
   - Implementar filtro por tipo
   - Implementar filtro por empresa

6. **Corrigir criação de nova conta**
   - Implementar modal de criação
   - Validar campos obrigatórios
   - Salvar no backend

### Menu de Navegação

1. **Criar componente de Sidebar**
   - Design moderno com ícones
   - Links para todas as páginas principais
   - Indicador de página ativa
   - Collapsible (pode ser recolhido)

2. **Estrutura do menu:**
   - 📊 Dashboard
   - 🏢 Companies
   - 📋 Chart of Accounts
   - 💰 Transactions
   - 📄 Documents
   - 📊 Reports
   - 📝 IRS Forms
   - ⚙️ Settings

3. **Header com:**
   - Logo/Nome do app
   - Seletor de empresa (se multi-company)
   - Notificações
   - User menu

---

## 📋 PRIORIDADES

### Prioridade 1 (CRÍTICO)
1. Criar menu de navegação
2. Corrigir Balance ($NaN)
3. Corrigir botão "+ New Account"

### Prioridade 2 (ALTO)
4. Exibir Account Number
5. Testar botões Edit/Delete
6. Exibir Company

### Prioridade 3 (MÉDIO)
7. Testar filtros
8. Melhorar UX geral

