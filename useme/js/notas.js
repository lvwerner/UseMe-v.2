/**
 * notas.js
 * Módulo de gerenciamento de notas/anotações do caderno.
 * 
 * Fábrica de Software - Univille 2026
 */

const GerenciadorNotas = (() => {

    /**
     * Salva uma nova nota.
     * Valida que o título não esteja vazio.
     * 
     * @param {string} titulo
     * @param {string} texto
     * @returns {{ ok: boolean, erro?: string }}
     */
    function adicionar(titulo, texto) {
        const t = titulo.trim();
        if (!t) {
            return { ok: false, erro: 'O título da nota é obrigatório.' };
        }

        const notas = Storage.getNotas();

        const novaNota = {
            id:       Date.now(),
            titulo:   t,
            texto:    texto.trim(),
            criadaEm: new Date().toISOString()
        };

        // Mais recente primeiro
        notas.unshift(novaNota);
        Storage.salvarNotas(notas);
        return { ok: true };
    }

    /**
     * Remove uma nota pelo ID.
     * @param {number} id
     * @returns {boolean}
     */
    function remover(id) {
        const notas = Storage.getNotas();
        const filtradas = notas.filter(n => n.id !== id);

        if (filtradas.length === notas.length) return false;

        Storage.salvarNotas(filtradas);
        return true;
    }

    /**
     * Retorna todas as notas salvas.
     * @returns {Array}
     */
    function listar() {
        return Storage.getNotas();
    }

    return { adicionar, remover, listar };
})();
