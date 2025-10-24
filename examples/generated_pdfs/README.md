# Exemplos de PDFs Gerados - IRS Forms

Esta pasta contém exemplos de formulários IRS gerados automaticamente pelo **Orion Universal Ledger**.

## Formulários Disponíveis

### 1. Form 5472 - Information Return of a 25% Foreign-Owned U.S. Corporation
- **Arquivo:** `Form_5472_2025-10-24.pdf`
- **Tamanho:** 286 KB
- **Uso:** Reportar transações entre corporações americanas com 25%+ de propriedade estrangeira
- **Deadline:** Junto com Form 1120 (15 de abril ou 15 de outubro se prorrogado)

### 2. Form 1099-NEC - Nonemployee Compensation
- **Arquivo:** `Form_1099-nec_2025-10-24.pdf`
- **Tamanho:** 595 KB
- **Uso:** Reportar pagamentos de $600+ para contratados independentes
- **Deadline:** 31 de janeiro do ano seguinte

### 3. Form 1120 - U.S. Corporation Income Tax Return
- **Arquivo:** `Form_1120_2025-10-24.pdf`
- **Tamanho:** 875 KB
- **Uso:** Declaração de imposto de renda corporativo
- **Deadline:** 15 de abril (ou 15º dia do 4º mês após o fim do ano fiscal)

### 4. Form 1040 - U.S. Individual Income Tax Return
- **Arquivo:** `Form_1040_2025-10-24.pdf`
- **Tamanho:** 347 KB
- **Uso:** Declaração de imposto de renda individual
- **Deadline:** 15 de abril do ano seguinte

## Como Foram Gerados

Todos os PDFs foram gerados automaticamente através do sistema **Orion Universal Ledger** usando:

1. **Templates Oficiais do IRS** - Formulários em branco baixados do irs.gov
2. **pdftk** - Preenchimento automático de campos usando FDF
3. **AI Mapping** - Mapeamento inteligente de dados contábeis para campos do formulário
4. **Validação** - Verificação de campos obrigatórios e cálculos

## Tecnologias Utilizadas

- **Backend:** Django + Celery
- **PDF Processing:** pdftk, PyPDF2, reportlab
- **AI Integration:** Manus API (OpenAI-compatible)
- **Database:** PostgreSQL

## Estrutura de Dados

Os formulários são preenchidos com dados reais do sistema:

- **Informações da Empresa:** Nome, EIN, endereço, ano fiscal
- **Transações:** Receitas, despesas, pagamentos
- **Contas:** Chart of Accounts com categorização automática
- **Documentos:** Extraídos de bank statements e invoices via OCR

## Observações Importantes

⚠️ **Estes são exemplos para demonstração.** Não devem ser usados para filing real sem revisão de um contador certificado (CPA).

⚠️ **Dados fictícios:** Todos os dados nestes PDFs são fictícios e foram gerados para teste do sistema.

⚠️ **Validação necessária:** Sempre revise os formulários gerados com um profissional antes de enviar ao IRS.

## Próximos Formulários

Em desenvolvimento para versões futuras:

- Form 941 - Employer's Quarterly Federal Tax Return
- Form W-2 - Wage and Tax Statement
- Schedule C - Profit or Loss from Business
- Form 8938 - Statement of Specified Foreign Financial Assets
- Form 8621 - PFIC Annual Information Return

---

**Sistema:** Orion Universal Ledger  
**Data de Geração:** 24 de Outubro de 2025  
**Versão:** 1.0.0

