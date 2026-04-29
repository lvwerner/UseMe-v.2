/**
 * tarefas.js
 * Módulo de gerenciamento de tarefas/compromissos.
 * 
 * Regras de Negócio implementadas:
 *   RN01 - A tarefa deve possuir uma descrição (não pode ser vazia).
 *   RN02 - Cada tarefa pode estar apenas como pendente ou concluída.
 *   RN03 - O usuário pode marcar e desmarcar uma tarefa como concluída.
 *   RN04 - O sistema deve atualizar a lista após qualquer ação do usuário.
 * 
 * Requisitos Funcionais implementados:
 *   RF01 - Cadastrar tarefas.
 *   RF02 - Exibir a lista de tarefas.
 *   RF03 - Marcar tarefas como concluídas.
 *   RF04 - Remover tarefas.
 * 
 * Fábrica de Software - Univille 2026
 */

const GerenciadorTarefas = (() => {

    /** @type {string} Filtro ativo: 'todos' | 'pendente' | 'concluida' */
    let filtroAtivo = 'todos';

    // ----------------------------------------------------------------
    //  RF01 - Cadastrar tarefa
    // ----------------------------------------------------------------

    /**
     * Cria e persiste uma nova tarefa.
     * RN01: rejeita se descrição estiver vazia.
     * 
     * @param {string} descricao
     * @param {string} data - formato YYYY-MM-DD
     * @param {string} prioridade - 'Baixa' | 'Média' | 'Alta'
     * @returns {{ ok: boolean, erro?: string }}
     */
    function adicionar(descricao, data, prioridade) {
        // RN01
        const desc = descricao.trim();
        if (!desc) {
            return { ok: false, erro: 'A descrição do compromisso é obrigatória.' };
        }

        const tarefas = Storage.getTarefas();

        const novaTarefa = {
            id:        Date.now(),
            descricao: desc,
            data:      data || null,
            prioridade: prioridade || 'Média',
            concluida: false,          // RN02: começa sempre como pendente
            criadaEm:  new Date().toISOString()
        };

        tarefas.push(novaTarefa);
        Storage.salvarTarefas(tarefas);
        return { ok: true };
    }

    // ----------------------------------------------------------------
    //  RF03 - Alternar status concluída / pendente
    // ----------------------------------------------------------------

    /**
     * Inverte o status de conclusão da tarefa (RN03).
     * @param {number} id
     */
    function alternarConclusao(id) {
        const tarefas = Storage.getTarefas().map(t => {
            if (t.id === id) {
                // RN02 + RN03: só alterna entre pendente e concluída
                t.concluida = !t.concluida;
            }
            return t;
        });
        Storage.salvarTarefas(tarefas);
    }

    // ----------------------------------------------------------------
    //  RF04 - Remover tarefa
    // ----------------------------------------------------------------

    /**
     * Remove permanentemente uma tarefa pelo ID.
     * @param {number} id
     * @returns {boolean} true se removida
     */
    function remover(id) {
        const tarefas = Storage.getTarefas();
        const filtradas = tarefas.filter(t => t.id !== id);

        if (filtradas.length === tarefas.length) {
            return false; // ID não encontrado
        }

        Storage.salvarTarefas(filtradas);
        return true;
    }

    // ----------------------------------------------------------------
    //  RF02 - Listar (com filtro e ordenação por data)
    // ----------------------------------------------------------------

    /**
     * Retorna tarefas aplicando o filtro ativo e ordenadas por data.
     * @returns {Array}
     */
    function listar() {
        const tarefas = Storage.getTarefas();

        // Ordenação: sem data vai para o final; com data, crescente
        const ordenadas = tarefas.sort((a, b) => {
            if (!a.data && !b.data) return 0;
            if (!a.data) return 1;
            if (!b.data) return -1;
            return new Date(a.data) - new Date(b.data);
        });

        if (filtroAtivo === 'todos') return ordenadas;
        return ordenadas.filter(t =>
            filtroAtivo === 'concluida' ? t.concluida : !t.concluida
        );
    }

    /**
     * Define o filtro de exibição ativo.
     * @param {string} valor - 'todos' | 'pendente' | 'concluida'
     */
    function setFiltro(valor) {
        filtroAtivo = valor;
    }

    return { adicionar, alternarConclusao, remover, listar, setFiltro };
})();
