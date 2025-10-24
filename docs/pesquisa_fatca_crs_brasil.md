# Pesquisa: FATCA, CRS e Brasil

**Fonte:** Levy & Salomão Advogados - FATCA, CRS and Brazil: where are we and where are we going?  
**URL:** https://www.levysalomao.com.br/publications/lsbraziloutlook/fatca-crs-and-brazil-where-are-we-and-where-are-we-going  
**Data:** 30 de Agosto de 2017  
**Autores:** Felipe Rufalco Medaglia e Pedro Araújo Chimelli

---

## Resumo Executivo

A troca automática de informações financeiras é uma realidade mundial. O Brasil implementou tanto o **FATCA** (com os EUA) quanto o **CRS** (com múltiplos países via OCDE), criando um "Global Revenue Service".

---

## Histórico

### Antes de 2010
- Troca de informações fiscais prevista em convenções de dupla tributação e acordos específicos
- Restrita à **troca por solicitação** (não automática)
- Mesmo quando prevista troca automática, faltavam regras e padrões procedimentais

### FATCA (Foreign Account Tax Compliance Act)

**Origem:**
- Assinado em 18 de março de 2010 pelo Presidente Barack Obama
- Parte do Hiring Incentives to Restore Employment Act (HIRE)

**Objetivo:**
- Impor a instituições financeiras estrangeiras (FFI) o dever de fornecer informações ao IRS sobre ativos e contas financeiras de cidadãos e residentes americanos

**Penalidade:**
- Fontes pagadoras americanas devem reter imposto de renda à taxa de **30%** sobre pagamentos a FFIs não conformes

**Implementação:**
- EUA assinaram vários Acordos Intergovernamentais (IGAs) para viabilizar FATCA
- **Brasil-EUA:** IGA assinado em 23 de setembro de 2014, aprovado pelo Decreto nº 8.506 de 24 de agosto de 2015
- Brasil já tinha TIEA (Tax Information Exchange Agreement) de 2007 com EUA

---

### CRS (Common Reporting Standard)

**Origem:**
- Criado pela OCDE (Organization for Economic Cooperation and Development)
- Similar ao FATCA, mas para troca multilateral entre múltiplos países

**Brasil e CRS:**
- 2011: Brasil assinou a Convenção sobre Assistência Administrativa Mútua em Matéria Fiscal da OCDE (aprovada internamente em 29 de agosto de 2016 - Decreto nº 8.842)
- 21 de outubro de 2016: Brasil assinou o MCAA (Multilateral Competent Authority Agreement on Automatic Exchange of Financial Account Information)
- 20 de março de 2017: Brasil notificou OCDE confirmando que tem todas as leis necessárias para implementar trocas automáticas sob CRS
- **Primeira transmissão de dados:** Setembro de 2018, com informações do ano-calendário 2017

**Flexibilidade:**
- MCAA permite países trocarem informações de períodos diferentes
- **Brasil-Argentina:** Troca automática retroativa a 2012
- **Brasil-Suíça:** Primeira troca apenas em 2019, com informações de 2018
- Brasil pode solicitar informações de anos anteriores via troca por solicitação

---

## Implementação no Brasil

### e-Financeira

**Normativa:** IN nº 1.571 de 2 de julho de 2015

**Obrigação:**
- Instituições financeiras e entidades similares devem cumprir até o último dia útil de agosto e fevereiro
- Contém informações do primeiro e segundo semestres do ano-calendário anterior

**CRS Específico:**
- IN nº 1.680 de 28 de dezembro de 2016
- Postergou fornecimento de informações do 1º semestre de 2017 para último dia útil de fevereiro de 2018

**Fluxo de Dados:**
- RFB (Receita Federal do Brasil) coleta via e-Financeira
- RFB transmite para IRS (FATCA) e autoridades competentes de cada país/jurisdição (CRS)
- Autoridades estrangeiras transmitem informações de interesse da RFB diretamente

---

## Consequências

### Descoberta de Contas Não Declaradas
- Descoberta de contas e ativos não divulgados de contribuintes brasileiros
- Uso de informações para cobrança de impostos no Brasil
- Efeitos mais frequentes após:
  - Análise de informações dos dois rounds do programa de divulgação voluntária brasileiro (2º round terminou em 31 de julho de 2017)
  - Processamento do primeiro lote de informações recebidas sob CRS (setembro de 2018)

---

## Questões Jurídicas Futuras

### 1. Conflito: Troca Automática vs. Proteção de Dados Pessoais

**Problemas:**
- Possível uso de informações para persecução criminal
- Ausência de autorização expressa na Lei Complementar nº 105/2001 (Lei do Sigilo Bancário) para troca com autoridades estrangeiras
- STF não abordou diretamente em fevereiro de 2016 (apenas considerou constitucional transferência de informações de instituições financeiras para autoridades fiscais brasileiras)

**Questões:**
- Que garantias o governo brasileiro pode oferecer de que o sigilo será protegido no exterior nos mesmos padrões brasileiros?
- Essa incerteza pode impedir o fornecimento de informações?
- Os acordos internacionais são competentes para autorizar o fornecimento de informações confidenciais?

---

### 2. Status Legal dos Acordos Internacionais

**Lei Brasileira:**
- Trata acordos internacionais aprovados internamente como **atos supralegais**
- Formalmente capazes de autorizar troca de informações

**Problema:**
- Convenção e TIEA excluem obrigação de trocar informações protegidas por **segredo profissional** (do qual o sigilo bancário é espécie)
- Portanto, qualquer fornecimento ou recepção de informações confidenciais por autoridades brasileiras é considerado ilegal, **a menos que a Lei do Sigilo Bancário seja alterada**

---

### 3. Soluções Propostas

**Opção 1: Alterar Lei do Sigilo Bancário**
- Incluir exceção para troca automática de informações

**Opção 2: Submeter MCAA e CRS à aprovação do Congresso Nacional**
- Validaria a troca automática
- Exceção ao sigilo bancário se tornaria parte da Lei Brasileira
- **Problema:** Apenas o IGA passou por aprovação congressual; CRS ainda não foi submetido
- Ausência de aprovação impede fornecimento de informações mais complexas exigidas pelo padrão da OCDE

---

## Implicações para Software de Contabilidade Offshore

### Funcionalidades Necessárias:

#### 1. Compliance FATCA
- Identificação de US Persons (cidadãos e residentes americanos)
- Geração de Form 8938 (Statement of Specified Foreign Financial Assets)
- Geração de FBAR (FinCEN Form 114)
- Tracking de thresholds para reporting
- Cálculo de withholding tax de 30%

#### 2. Compliance CRS
- Identificação de residência fiscal de account holders
- Determinação de reportable accounts
- Due diligence procedures (self-certification)
- Geração de relatórios CRS para autoridades competentes
- Tracking de múltiplas jurisdições

#### 3. e-Financeira (Brasil)
- Integração com sistema e-Financeira da RFB
- Submissão semestral (agosto e fevereiro)
- Formato XML conforme IN nº 1.571/2015 e IN nº 1.680/2016
- Informações de contas e ativos de não-residentes

#### 4. Multi-jurisdição
- Suporte para diferentes prazos de reporting por país
- Acordos bilaterais específicos (ex: Brasil-Argentina retroativo a 2012)
- Tracking de deadlines por jurisdição

#### 5. Proteção de Dados
- Criptografia de informações sensíveis
- Controle de acesso granular
- Audit trail completo
- Compliance com LGPD (Lei Geral de Proteção de Dados)

#### 6. Alertas e Notificações
- Deadlines de reporting
- Mudanças em regulamentações
- Novos acordos bilaterais/multilaterais
- Thresholds atingidos

---

## Timeline Importante

| Data | Evento |
|------|--------|
| 18/03/2010 | FATCA assinado (EUA) |
| 2011 | Brasil assina Convenção OCDE sobre Assistência Administrativa Mútua |
| 23/09/2014 | Brasil-EUA assinam IGA (FATCA) |
| 02/07/2015 | IN nº 1.571 cria e-Financeira |
| 24/08/2015 | Decreto nº 8.506 aprova IGA internamente |
| 29/08/2016 | Decreto nº 8.842 aprova Convenção OCDE |
| 21/10/2016 | Brasil assina MCAA (CRS) |
| 28/12/2016 | IN nº 1.680 especifica CRS |
| 20/03/2017 | Brasil notifica OCDE sobre prontidão para CRS |
| 31/07/2017 | Fim do 2º round de divulgação voluntária |
| Set/2018 | Primeira transmissão de dados CRS (ano 2017) |

---

## Conclusão

O Brasil percorreu um longo caminho para implementar a troca automática mundial de informações fiscais. As medidas mais onerosas já foram tomadas. No entanto, outras seriam bem-vindas:

1. **Alteração da Lei do Sigilo Bancário**, ou
2. **Aprovação congressual do MCAA e CRS**

Essas medidas estão entre as necessárias para completar a implementação.

