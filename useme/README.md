# USE.me — Sistema de Agenda Estudantil

Trabalho MVP da disciplina de **Fábrica de Software**  
Universidade da Região de Joinville — Univille — 2026  
**Autor:** Vinicius Henrique Werner Hardt

---

## Sobre o Projeto

O **Use Me** centraliza a organização de tarefas e anotações acadêmicas em um único lugar, substituindo o uso fragmentado de cadernos, fotos, mensagens e lembretes.

---

## Funcionalidades

| Código | Descrição |
|--------|-----------|
| RF01   | Cadastrar compromissos com descrição, data e prioridade |
| RF02   | Listar compromissos ordenados por data, com filtro por status |
| RF03   | Marcar e desmarcar compromissos como concluídos |
| RF04   | Remover compromissos |
| —      | Caderno de notas com título e texto livre |

### Regras de Negócio

- **RN01** — A descrição do compromisso é obrigatória.
- **RN02** — Cada tarefa possui apenas dois estados: *pendente* ou *concluída*.
- **RN03** — O usuário pode alternar o estado a qualquer momento.
- **RN04** — A lista é atualizada imediatamente após qualquer ação.

---

## Tecnologias

- **HTML5** — estrutura semântica
- **CSS3** — estilização e responsividade
- **JavaScript (Vanilla)** — lógica de negócio, manipulação do DOM
- **localStorage** — persistência local no navegador

Nenhuma biblioteca ou framework externo foi utilizado.

---

## Estrutura de Arquivos

```
useme/
├── index.html          # Estrutura da interface
├── css/
│   └── style.css       # Estilização
└── js/
    ├── storage.js      # Módulo de persistência (localStorage)
    ├── tarefas.js      # Módulo de negócio: tarefas (RN01–RN04, RF01–RF04)
    ├── notas.js        # Módulo de negócio: notas
    └── app.js          # Controlador: ligação entre módulos e DOM
```

---

## Como Executar

Basta abrir o arquivo `index.html` em qualquer navegador moderno.  
Não requer instalação, servidor ou conexão com a internet.

---

## Escopo

### IN (o que o sistema faz)
- Criar, listar, concluir e remover compromissos
- Filtrar por status (todos / pendentes / concluídos)
- Ordenar por data
- Caderno de anotações

### OUT (o que não faz nesta versão)
- Sistema de login
- Notificações automáticas
- Integração com apps externos
- Sincronização em nuvem

---

## Licença

Projeto acadêmico — uso educacional.
