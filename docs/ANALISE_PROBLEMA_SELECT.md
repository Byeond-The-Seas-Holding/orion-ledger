# Análise Completa: Problema do Select de Contas

## 🐛 Problema Identificado

O dropdown de contas no modal de review **não persiste a seleção** quando o usuário clica manualmente.

---

## 🔍 Investigação

### Testes Realizados:

1. ✅ **Backend retorna dados corretamente**
   - API `/api/accounts/` funciona
   - 16 contas disponíveis
   - Estrutura: `{id, account_code, account_name, account_type}`

2. ✅ **Frontend carrega contas corretamente**
   - `accounts` state populado
   - Dropdown renderiza 16 opções

3. ✅ **Estado do React funciona**
   - `handleUpdateTransaction` atualiza estado
   - Testado via JavaScript: funciona perfeitamente

4. ❌ **onChange não dispara ao clicar manualmente**
   - Evento `change` nativo não é capturado pelo React
   - Logs não aparecem no console
   - Select volta para "Select account..."

---

## 💡 Causa Raiz

**React Controlled Components + Event Bubbling**

O problema é que o React usa **SyntheticEvents** e pode não capturar corretamente eventos nativos de `<select>` em alguns casos, especialmente quando:
- O componente está dentro de um modal
- Há event handlers em elementos pais
- O select é um controlled component (`value={trans.account || ''}`)

---

## ✅ Prova de Conceito

Testei via JavaScript:
```javascript
const select = document.querySelectorAll('select')[0];
select.value = '1'; // Cash
const event = new Event('change', { bubbles: true });
select.dispatchEvent(event);
```

**Resultado:** ✅ Funcionou! O primeiro dropdown agora mostra "1000 - Cash"

Isso prova que:
- Backend ✅
- Estado do React ✅
- Lógica de atualização ✅
- **Apenas o evento onChange manual ❌**

---

## 🔧 Soluções Possíveis

### Solução 1: Usar `onInput` ao invés de `onChange` ⭐
```typescript
<select
  value={trans.account || ''}
  onInput={(e) => {
    const value = (e.target as HTMLSelectElement).value;
    handleUpdateTransaction(idx, 'account', value);
  }}
>
```

### Solução 2: Uncontrolled Component + useRef
```typescript
const selectRef = useRef<HTMLSelectElement>(null);

<select
  ref={selectRef}
  defaultValue={trans.account || ''}
  onChange={(e) => {
    handleUpdateTransaction(idx, 'account', e.target.value);
  }}
>
```

### Solução 3: Biblioteca de UI (shadcn/ui Select)
```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

<Select
  value={trans.account || ''}
  onValueChange={(value) => handleUpdateTransaction(idx, 'account', value)}
>
  <SelectTrigger>
    <SelectValue placeholder="Select account..." />
  </SelectTrigger>
  <SelectContent>
    {accounts.map(acc => (
      <SelectItem key={acc.id} value={acc.id}>
        {acc.account_code} - {acc.account_name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

### Solução 4: Forçar Re-render com Key
```typescript
<select
  key={`select-${idx}-${trans.account}`}
  value={trans.account || ''}
  onChange={(e) => {
    handleUpdateTransaction(idx, 'account', e.target.value);
  }}
>
```

---

## 📊 Recomendação

**Solução 3 (shadcn/ui Select)** é a melhor porque:
- ✅ Componente profissional e testado
- ✅ Melhor UX (busca, teclado, acessibilidade)
- ✅ Consistente com o resto da UI
- ✅ Resolve o problema definitivamente

**Tempo estimado:** 30-45 minutos

---

## 🎯 Próximos Passos

1. Implementar Solução 3 (shadcn/ui Select)
2. Testar com 7 transações do Interactive Brokers
3. Testar botão Import
4. Validar fluxo end-to-end

---

## 📝 Notas

- O problema NÃO é do backend
- O problema NÃO é do estado do React
- O problema É do evento onChange do select nativo
- Solução via JavaScript funciona (prova de conceito)

