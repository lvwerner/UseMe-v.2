/**
 * app.js
 * Controlador principal da aplicação.
 * Responsável por conectar os módulos de negócio com a interface (DOM).
 * 
 * RN04: a lista é sempre re-renderizada após qualquer ação.
 * 
 * Fábrica de Software - Univille 2026
 */

// ----------------------------------------------------------------
//  Inicialização
// ----------------------------------------------------------------

window.addEventListener('DOMContentLoaded', () => {
    renderizarTarefas();
    renderizarNotas();
});

// ----------------------------------------------------------------
//  Navegação
// ----------------------------------------------------------------

/**
 * Alterna entre a seção Agenda e Caderno.
 * @param {string} destino - 'agenda' | 'caderno'
 */
function navegarPara(destino) {
    document.getElementById('secao-agenda').style.display  = destino === 'agenda'  ? 'block' : 'none';
    document.getElementById('secao-caderno').style.display = destino === 'caderno' ? 'block' : 'none';

    document.getElementById('nav-agenda').classList.toggle('ativo',  destino === 'agenda');
    document.getElementById('nav-caderno').classList.toggle('ativo', destino === 'caderno');
}

// ----------------------------------------------------------------
//  Modal
// ----------------------------------------------------------------

function abrirModal() {
    document.getElementById('ev-desc').value = '';
    document.getElementById('ev-data').value = '';
    document.getElementById('ev-prioridade').value = 'Média';
    document.getElementById('modal').style.display = 'flex';
    document.getElementById('ev-desc').focus();
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fecha modal ao clicar fora do box
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('modal').addEventListener('click', function (e) {
        if (e.target === this) fecharModal();
    });
});

// ----------------------------------------------------------------
//  TAREFAS - ações
// ----------------------------------------------------------------

/**
 * Lê o formulário do modal e chama o módulo de negócio.
 * RF01 + RN01
 */
function adicionarTarefa() {
    const desc  = document.getElementById('ev-desc').value;
    const data  = document.getElementById('ev-data').value;
    const prio  = document.getElementById('ev-prioridade').value;

    const resultado = GerenciadorTarefas.adicionar(desc, data, prio);

    if (!resultado.ok) {
        alert(resultado.erro);
        return;
    }

    fecharModal();
    renderizarTarefas(); // RN04
}

/**
 * Alterna conclusão de uma tarefa (RF03 + RN03).
 * @param {number} id
 */
function alternarTarefa(id) {
    GerenciadorTarefas.alternarConclusao(id);
    renderizarTarefas(); // RN04
}

/**
 * Remove uma tarefa após confirmação (RF04).
 * @param {number} id
 */
function removerTarefa(id) {
    if (!confirm('Deseja apagar este compromisso?')) return;
    GerenciadorTarefas.remover(id);
    renderizarTarefas(); // RN04
}

/**
 * Atualiza o filtro ativo e re-renderiza (Escopo Creep: filtro por status).
 * @param {string} valor
 */
function filtrar(valor) {
    GerenciadorTarefas.setFiltro(valor);
    renderizarTarefas(); // RN04
}

// ----------------------------------------------------------------
//  TAREFAS - renderização (RF02)
// ----------------------------------------------------------------

function renderizarTarefas() {
    const lista  = document.getElementById('lista-tarefas');
    const vazio  = document.getElementById('lista-vazia');
    const tarefas = GerenciadorTarefas.listar();

    lista.innerHTML = '';

    if (tarefas.length === 0) {
        vazio.style.display = 'block';
        return;
    }

    vazio.style.display = 'none';

    tarefas.forEach(t => {
        const li = document.createElement('li');
        li.className = `item-tarefa ${t.concluida ? 'concluida' : ''}`;

        const dataBR = t.data
            ? t.data.split('-').reverse().join('/')
            : '—';

        const badgeClasse = {
            'Baixa': 'badge-baixa',
            'Média': 'badge-media',
            'Alta':  'badge-alta'
        }[t.prioridade] || 'badge-media';

        li.innerHTML = `
            <div class="item-esq">
                <div>
                    <div class="item-desc">${escaparHTML(t.descricao)}</div>
                    <div class="item-meta">${dataBR} &nbsp;|&nbsp;
                        <span class="badge ${badgeClasse}">${t.prioridade}</span>
                    </div>
                </div>
            </div>
            <div class="item-acoes">
                <button onclick="alternarTarefa(${t.id})">
                    ${t.concluida ? 'Reabrir' : 'Concluir'}
                </button>
                <button class="btn-del" onclick="removerTarefa(${t.id})">Apagar</button>
            </div>
        `;

        lista.appendChild(li);
    });
}

// ----------------------------------------------------------------
//  NOTAS - ações
// ----------------------------------------------------------------

function salvarNota() {
    const titulo = document.getElementById('nota-titulo').value;
    const texto  = document.getElementById('nota-texto').value;

    const resultado = GerenciadorNotas.adicionar(titulo, texto);

    if (!resultado.ok) {
        alert(resultado.erro);
        return;
    }

    document.getElementById('nota-titulo').value = '';
    document.getElementById('nota-texto').value  = '';
    renderizarNotas();
}

function removerNota(id) {
    GerenciadorNotas.remover(id);
    renderizarNotas();
}

// ----------------------------------------------------------------
//  NOTAS - renderização
// ----------------------------------------------------------------

function renderizarNotas() {
    const container = document.getElementById('lista-notas');
    const vazio     = document.getElementById('notas-vazias');
    const notas     = GerenciadorNotas.listar();

    container.innerHTML = '';

    if (notas.length === 0) {
        vazio.style.display = 'block';
        return;
    }

    vazio.style.display = 'none';

    notas.forEach(n => {
        const div = document.createElement('div');
        div.className = 'nota-card';
        div.innerHTML = `
            <div class="nota-card-header">
                <strong>${escaparHTML(n.titulo)}</strong>
                <span onclick="removerNota(${n.id})" title="Remover nota">&times;</span>
            </div>
            <p>${escaparHTML(n.texto)}</p>
        `;
        container.appendChild(div);
    });
}

// ----------------------------------------------------------------
//  Utilitários
// ----------------------------------------------------------------

/**
 * Escapa caracteres HTML para evitar XSS ao inserir dados no DOM.
 * @param {string} str
 * @returns {string}
 */
function escaparHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
