# USE.me

> Sistema de agenda e caderno para estudantes — sem distrações, sem excesso.

**Fábrica de Software · Univille Joinville · 2026**  
Autor: Vinicius Henrique Werner Hardt

---

## O problema

Estudantes organizam a vida acadêmica em cinco lugares ao mesmo tempo: caderno, galeria de fotos, grupo do WhatsApp, notas do celular e lembretes. O resultado é previsível — esquecimento de prazos, conteúdo perdido, estresse acumulado.

O Use Me resolve isso colocando tudo em um único lugar, no navegador, sem cadastro, sem instalação, sem fricção.

---

## Funcionalidades

| # | Funcionalidade | Status |
|---|----------------|--------|
| RF01 | Cadastrar compromisso com descrição, data e prioridade | ✅ |
| RF02 | Listar compromissos ordenados por data | ✅ |
| RF02 | Filtrar por status (todos / pendentes / concluídos) | ✅ |
| RF03 | Marcar e desmarcar como concluído | ✅ |
| RF04 | Remover compromisso | ✅ |
| — | Caderno de notas livre | ✅ |
| — | Persistência local (localStorage) | ✅ |

---

## Regras de Negócio

```
RN01  A descrição do compromisso é obrigatória.
RN02  Cada tarefa tem exatamente dois estados: pendente ou concluída.
RN03  O usuário pode alternar o estado a qualquer momento.
RN04  A interface é atualizada imediatamente após qualquer ação.
```

---

## Tecnologias

```
HTML5        estrutura semântica
CSS3         estilização e responsividade
JavaScript   lógica de negócio, manipulação de DOM (sem frameworks)
localStorage persistência local no navegador
```

Nenhuma dependência externa. Nenhum framework. Nenhum backend.

---

## Estrutura do projeto

```
useme/
├── index.html          # Estrutura e marcação HTML
├── README.md
├── .gitignore
│
├── css/
│   └── style.css       # Toda a estilização
│
└── js/
    ├── storage.js      # Camada de persistência — leitura e escrita no localStorage
    ├── tarefas.js      # Lógica de negócio das tarefas (RN01–04, RF01–04)
    ├── notas.js        # Lógica de negócio das notas
    └── app.js          # Controlador: conecta os módulos ao DOM
```

A separação em módulos foi uma escolha intencional. Cada arquivo tem uma única responsabilidade:

- **storage.js** não sabe nada sobre tarefas ou notas — só lê e escreve no localStorage.
- **tarefas.js** não toca no DOM — só manipula dados e aplica regras de negócio.
- **app.js** não tem regra de negócio — só escuta eventos e chama os módulos certos.

---

## Como rodar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/useme.git
```

Depois abra o arquivo `index.html` diretamente no navegador.

Não precisa de servidor, `npm install`, Docker, nada. Só o arquivo.

---

## Escopo

### O que o sistema faz
- Criar, listar, concluir e remover compromissos
- Filtrar por status (todos / pendentes / concluídos)
- Ordenar cronologicamente por data
- Caderno de anotações livres com título e texto

### O que o sistema não faz (fora do escopo desta versão)
- Sistema de login ou múltiplos usuários
- Notificações e lembretes automáticos
- Integração com Google Agenda, WhatsApp ou qualquer API externa
- Sincronização em nuvem

---

## Decisões técnicas

**JavaScript puro, sem frameworks**  
Reduz complexidade e deixa a lógica de negócio explícita. Qualquer pessoa que leia o código entende o que está acontecendo sem precisar conhecer um framework.

**Separação de módulos mesmo sem backend**  
A divisão `storage / lógica / controller` imita o padrão MVC no front-end. Foi uma escolha deliberada para demonstrar organização de código, não só funcionamento.

**Proteção contra XSS**  
Todos os dados inseridos pelo usuário são escapados antes de entrar no DOM via função `escaparHTML()` em `app.js`.

**localStorage como banco de dados**  
Suficiente para o escopo definido. Os dados persistem entre sessões sem nenhuma infraestrutura adicional.

---

*Projeto acadêmico — uso educacional.*
