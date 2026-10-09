const formulario = document.getElementById('formProduto');
const tabela = document.getElementById('listaProdutos');
const pesquisa = document.getElementById('pesquisa');
const mensagem = document.getElementById('mensagem');
const botaoSalvar = document.getElementById('botaoSalvar');

let produtos = [];
let codigoEditando = null;

try {
    const salvos = JSON.parse(localStorage.getItem('produtosManutencao'));
    if (Array.isArray(salvos)) produtos = salvos;
} catch (erro) {
    console.warn('Não foi possível carregar os produtos.', erro);
}

function guardarProdutos() {
    try {
        localStorage.setItem('produtosManutencao', JSON.stringify(produtos));
        return true;
    } catch (erro) {
        mostrarMensagem('Não foi possível salvar no navegador.', true);
        return false;
    }
}

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle('erro', erro);
}

function limparFormulario() {
    formulario.reset();
    codigoEditando = null;
    document.getElementById('codigo').readOnly = false;
    botaoSalvar.textContent = 'Cadastrar produto';
}

function criarCelula(linha, texto) {
    const celula = linha.insertCell();
    celula.textContent = texto;
    return celula;
}

function listarProdutos() {
    const termo = pesquisa.value.trim().toLocaleLowerCase('pt-BR');
    tabela.replaceChildren();
    const encontrados = produtos.filter(produto =>
        produto.nome.toLocaleLowerCase('pt-BR').includes(termo) ||
        String(produto.codigo).includes(termo)
    );

    if (encontrados.length === 0) {
        const linha = tabela.insertRow();
        const celula = linha.insertCell();
        celula.colSpan = 7;
        celula.textContent = 'Nenhum produto encontrado.';
        return;
    }

    encontrados.forEach(produto => {
        const linha = tabela.insertRow();
        criarCelula(linha, produto.codigo);
        criarCelula(linha, produto.nome);
        criarCelula(linha, produto.categoria);
        criarCelula(linha, Number(produto.preco).toLocaleString('pt-BR', {
            style: 'currency', currency: 'BRL'
        }));
        criarCelula(linha, produto.quantidade);

        const estado = linha.insertCell();
        const etiqueta = document.createElement('span');
        etiqueta.className = 'status ' + (produto.status === 'Ativo' ? 'ativo' : 'inativo');
        etiqueta.textContent = produto.status;
        estado.appendChild(etiqueta);

        const acoes = linha.insertCell();
        acoes.className = 'acoes-tabela';
        const editar = document.createElement('button');
        editar.type = 'button';
        editar.className = 'botao editar';
        editar.textContent = 'Editar';
        editar.addEventListener('click', () => editarProduto(produto.codigo));
        const excluir = document.createElement('button');
        excluir.type = 'button';
        excluir.className = 'botao excluir';
        excluir.textContent = 'Excluir';
        excluir.addEventListener('click', () => excluirProduto(produto.codigo));
        acoes.append(editar, excluir);
    });
}

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const produto = {
        codigo: Number(document.getElementById('codigo').value),
        nome: document.getElementById('nome').value.trim(),
        categoria: document.getElementById('categoria').value,
        preco: Number(document.getElementById('preco').value),
        quantidade: Number(document.getElementById('quantidade').value),
        status: document.getElementById('status').value
    };
    if (!Number.isSafeInteger(produto.codigo) || produto.codigo <= 0 ||
        !produto.nome || !produto.categoria ||
        !Number.isFinite(produto.preco) || produto.preco < 0 ||
        !Number.isSafeInteger(produto.quantidade) || produto.quantidade < 0) {
        mostrarMensagem('Preencha os dados corretamente.', true);
        return;
    }

    if (codigoEditando === null) {
        if (produtos.some(p => p.codigo === produto.codigo)) {
            mostrarMensagem('Já existe um produto com esse código.', true);
            return;
        }
        produtos.push(produto);
    } else {
        const indice = produtos.findIndex(p => p.codigo === codigoEditando);
        if (indice === -1) {
            mostrarMensagem('Produto não encontrado.', true);
            return;
        }
        produtos[indice] = produto;
    }
    const edicao = codigoEditando !== null;
    if (!guardarProdutos()) return;
    limparFormulario();
    listarProdutos();
    mostrarMensagem(edicao ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
});

function editarProduto(codigo) {
    const produto = produtos.find(p => p.codigo === codigo);
    if (!produto) return;
    for (const campo of ['codigo', 'nome', 'categoria', 'preco', 'quantidade', 'status']) {
        document.getElementById(campo).value = produto[campo];
    }
    codigoEditando = codigo;
    document.getElementById('codigo').readOnly = true;
    botaoSalvar.textContent = 'Salvar alterações';
    mostrarMensagem('Altere os campos e clique em Salvar alterações.');
    formulario.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function excluirProduto(codigo) {
    if (!confirm('Deseja excluir este produto?')) return;
    produtos = produtos.filter(p => p.codigo !== codigo);
    if (!guardarProdutos()) return;
    if (codigoEditando === codigo) limparFormulario();
    listarProdutos();
    mostrarMensagem('Produto excluído com sucesso!');
}

formulario.addEventListener('reset', () => {
    codigoEditando = null;
    document.getElementById('codigo').readOnly = false;
    botaoSalvar.textContent = 'Cadastrar produto';
    mostrarMensagem('');
});
pesquisa.addEventListener('input', listarProdutos);
listarProdutos();
