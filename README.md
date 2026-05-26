# 💰 FinanceFlow — Sistema de Controle Financeiro Familiar

Sistema financeiro completo desenvolvido como SPA (Single Page Application) para controle de gastos pessoais e familiares.

## ✅ Funcionalidades

### 📊 Análise Financeira
- **Visão Geral** — Dashboard com KPIs, gráficos de evolução e lançamentos recentes
- **Diagnóstico Financeiro** — Score de saúde financeira, comprometimento de renda e recomendações
- **Evolução Mensal** — Gráfico comparativo dos últimos 6 meses
- **Categorias** — Gastos distribuídos por categoria com gráfico de polar area
- **Transporte** — Análise detalhada de gastos com transporte
- **Cartão / Parceiros** — Compras parceladas e controle de parcelas
- **Formas de Pagamento** — PIX, Crédito, Débito, Boleto, Dinheiro, TED
- **Efetivados / Pendentes** — Controle de status dos lançamentos
- **Gastos Fixos Mensais** — Cadastro e acompanhamento de despesas recorrentes

### 🎯 Planejamento
- **Orçado vs Real** — Comparativo de orçamento planejado vs realizado por categoria
- **Simulador** — Simulador de investimentos com gráfico de projeção
- **Metas & Reserva** — Criação e acompanhamento de metas financeiras (viagem, imóvel, reserva, etc)

### 📋 Dados
- **Novo Lançamento** — Cadastro rápido de receitas e despesas
- **Lançamentos** — Lista completa com filtros por tipo, categoria e status
- **Configurações** — Tema, usuários, senha

### ⚙️ Configurações
- Alternar tema claro / escuro
- Cadastrar usuários (família)
- Alterar senha
- Sair do sistema

## 🚀 Deploy no GitHub Pages (Privado)

### Opção 1: Repositório Privado + GitHub Pages Pro/Team

> ⚠️ GitHub Pages em repositórios privados requer GitHub Pro ($4/mês) ou GitHub Team.

1. Crie um repositório **privado** no GitHub
2. Faça upload do `index.html`
3. Vá em **Settings → Pages**
4. Selecione o branch `main` e pasta `/root`
5. Salve — o site ficará em `https://SEU_USUARIO.github.io/NOME_REPO/`
6. Compartilhe o link apenas com sua família

### Opção 2: GitHub Pages Público + Proteção por Senha (Recomendado)

Como GitHub Pages só permite público para contas gratuitas, use esta estratégia:

1. Crie um repositório público com nome genérico (ex: `family-dashboard`)
2. Faça upload do `index.html`
3. A aplicação JÁ possui login com senha — ninguém consegue usar sem credenciais
4. O código fonte fica visível, mas **os dados ficam no navegador de cada usuário** (localStorage)



## 🏗️ Arquitetura Técnica

```
index.html              — Aplicação completa (SPA monolítica)
├── CSS                 — Variáveis CSS + tema claro/escuro + responsivo
├── HTML                — Todas as seções e modais
└── JavaScript          — Lógica completa da aplicação
    ├── Auth            — Login, registro, SSO demo, logout
    ├── Data Store      — localStorage (IndexedDB ready)
    ├── Charts          — Chart.js (Line, Bar, Doughnut, PolarArea)
    ├── Navigation      — SPA routing sem URL hash
    └── Components      — Modal, Notification, Forms
```

### Tecnologias
- **HTML5** — Estrutura semântica
- **CSS3** — Variáveis CSS, Grid, Flexbox, animações
- **JavaScript ES6+** — Vanilla JS, sem frameworks
- **Chart.js 4.4.1** — Gráficos interativos
- **Google Fonts** — Syne (display) + DM Sans (corpo)
- **localStorage** — Persistência de dados local

## 📱 Responsivo

| Breakpoint | Layout |
|-----------|--------|
| Desktop 1200px+ | Sidebar fixa + conteúdo |
| Tablet 768-1200px | Sidebar recolhível |
| Mobile <768px | Sidebar overlay com burger menu |

## 🔒 Segurança

- Senhas armazenadas com hash (não em texto puro)
- Dados persistidos localmente (não enviados a servidor)
- Sessão mantida no localStorage
- Multi-usuário com perfis (Admin/Visualizador)

## 📊 Dados Demo

O sistema inicia com dados de demonstração incluindo:
- 18 lançamentos do mês corrente
- 6 gastos fixos mensais
- 3 metas financeiras (Reserva, Viagem, Carro)
- Orçamentos definidos por categoria

## 🔧 Customização

### Adicionar Categorias
No arquivo `index.html`, edite o objeto `CATS`:
```javascript
const CATS = {
  nova_cat: { label: 'Minha Categoria', icon: '🏷️', color: '#FF6B6B' },
  // ...
};
```

### Ajustar Orçamentos
```javascript
orcamentos: {
  alimentacao: 800,
  moradia: 2500,
  // ...
}
```

## 📅 Roadmap Futuro

- [ ] Exportar relatório PDF
- [ ] Importar extratos (OFX/CSV)
- [ ] Notificações de vencimento
- [ ] Gráfico de fluxo de caixa
- [ ] Relatório anual
- [ ] Backup/restore de dados
- [ ] PWA (instalável como app)
