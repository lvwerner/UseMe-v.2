/**
 * storage.js
 * Módulo de persistência local (localStorage).
 * Isola toda a lógica de leitura/escrita dos outros módulos.
 * 
 * Fábrica de Software - Univille 2026
 */

const Storage = (() => {
    const CHAVE_TAREFAS = 'useme_tarefas';
    const CHAVE_NOTAS   = 'useme_notas';

    /**
     * Lê e retorna o array de tarefas salvas.
     * @returns {Array}
     */
    function getTarefas() {
        try {
            return JSON.parse(localStorage.getItem(CHAVE_TAREFAS)) || [];
        } catch {
            return [];
        }
    }

    /**
     * Persiste o array de tarefas no localStorage.
     * @param {Array} tarefas 
     */
    function salvarTarefas(tarefas) {
        localStorage.setItem(CHAVE_TAREFAS, JSON.stringify(tarefas));
    }

    /**
     * Lê e retorna o array de notas salvas.
     * @returns {Array}
     */
    function getNotas() {
        try {
            return JSON.parse(localStorage.getItem(CHAVE_NOTAS)) || [];
        } catch {
            return [];
        }
    }

    /**
     * Persiste o array de notas no localStorage.
     * @param {Array} notas 
     */
    function salvarNotas(notas) {
        localStorage.setItem(CHAVE_NOTAS, JSON.stringify(notas));
    }

    return { getTarefas, salvarTarefas, getNotas, salvarNotas };
})();
