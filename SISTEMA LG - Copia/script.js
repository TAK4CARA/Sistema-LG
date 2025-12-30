//-------------------------------------
// SALVAR NOTA NO LOCALSTORAGE
//-------------------------------------
function salvarNota() {
    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const nota = {
        chave: document.getElementById("chave").value,
        nf: document.getElementById("nf").value,
        volumes: document.getElementById("volumes").value,
        produto: document.getElementById("produto").value,
        cnpj: document.getElementById("cnpj").value,
        destinatario: document.getElementById("destinatario").value,
        cidade: document.getElementById("cidade").value
    };

    notas.push(nota);
    localStorage.setItem("notas", JSON.stringify(notas));

    alert("Nota salva com sucesso!");
}



//-------------------------------------


//-------------------------------------
// CARREGAR TABELA DE NOTAS
//-------------------------------------
function carregarTabela() {
    let lista = JSON.parse(localStorage.getItem("notas")) || [];
    let tbody = document.querySelector("#tabelaNotas tbody");
    tbody.innerHTML = "";

    lista.forEach((n, i) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${n.nf}</td>
            <td>${n.destinatario}</td>
            <td>${n.cidade}</td>
            <td>${n.volumes}</td>
            <td>${n.produto}</td>           
            <td><button class="btn excluir" onclick="excluirNota(${i})">X</button></td>
        `;
        tbody.appendChild(tr);
    });
}

//-------------------------------------
function excluirNota(index) {
    let lista = JSON.parse(localStorage.getItem("notas")) || [];
    lista.splice(index, 1);
    localStorage.setItem("notas", JSON.stringify(lista));
    carregarTabela();
}

//-------------------------------------
// ROMANEIO: ADICIONAR LINHAS
//-------------------------------------
let ordem = 1;

function addLinhaRomaneio() {
    const tabela = document.querySelector("#tabelaRomaneio tbody");
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${String(ordem).padStart(3,"0")}</td>
        <td><input onblur="preencherDadosNF(this)"></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td><input></td>
        <td class="delcol">
            <button class="btn excluir" onclick="this.parentElement.parentElement.remove()">X</button>
        </td>
    `;

    tabela.appendChild(tr);
    ordem++;
}


//-------------------------------------
// SALVAR NOTA (FORMULÁRIO MANUAL)
//-------------------------------------
function salvarNota(event) {
    event.preventDefault();

    let nota = {
        chave: document.getElementById("chave").value.trim(),
        nf: document.getElementById("nf").value.trim(),
        volumes: document.getElementById("volumes").value.trim(),
        produto: document.getElementById("produto").value.trim(),
        cnpj: document.getElementById("cnpj").value.trim(),
        destinatario: document.getElementById("destinatario").value.trim(),
        cidade: document.getElementById("cidade").value.trim()
    };

    // VALIDAÇÃO SIMPLES
    if (nota.chave.length !== 44) {
        alert("Chave de acesso deve conter 44 dígitos.");
        return;
    }

if (!produto) {
    alert("Informe o produto da nota!");
    return;
}


    let lista = JSON.parse(localStorage.getItem("notas")) || [];

    // EVITAR DUPLICIDADE
    if (lista.some(n => n.chave === nota.chave)) {
        alert("Essa NF já está cadastrada!");
        return;
    }

    lista.push(nota);
    localStorage.setItem("notas", JSON.stringify(lista));

    alert("Nota cadastrada com sucesso!");
    document.getElementById("formNota").reset();
}

//-------------------------------------
function limparFormulario() {
    document.getElementById("formNota").reset();
}

//-------------------------------------
// AUTOPREENCHER DADOS NO ROMANEIO
//-------------------------------------
function preencherDadosNF(inputNF) {

    const nfDigitada = inputNF.value.trim();
    if (!nfDigitada) return;

    const notas = JSON.parse(localStorage.getItem("notas")) || [];

    const nota = notas.find(n => n.nf === nfDigitada);

    if (!nota) return; // NF não encontrada

    const linha = inputNF.closest("tr");

    // Colunas do romaneio
    linha.cells[2].querySelector("input").value = nota.destinatario;
    linha.cells[3].querySelector("input").value = nota.cidade;
    linha.cells[4].querySelector("input").value = nota.volumes;
    linha.cells[6].querySelector("input").value = nota.produto;
}


