//-------------------------------------
// SALVAR MOTORISTA
//-------------------------------------
function salvarMotorista(event) {
    event.preventDefault();

    const motorista = {
        nome: document.getElementById("nomeMotorista").value.trim(),
        placa: document.getElementById("placa").value.trim().toUpperCase(),
        tipo: document.getElementById("tipoVeiculo").value
    };

    let lista = JSON.parse(localStorage.getItem("motoristas")) || [];

    // EVITAR PLACA DUPLICADA
    if (lista.some(m => m.placa === motorista.placa)) {
        alert("Essa placa já está cadastrada!");
        return;
    }

    lista.push(motorista);
    localStorage.setItem("motoristas", JSON.stringify(lista));

    alert("Motorista cadastrado com sucesso!");
    document.getElementById("formMotorista").reset();
    carregarMotoristas();
}

//-------------------------------------
// LISTAR MOTORISTAS
//-------------------------------------
function carregarMotoristas() {
    const lista = JSON.parse(localStorage.getItem("motoristas")) || [];
    const tbody = document.querySelector("#tabelaMotoristas tbody");
    tbody.innerHTML = "";

    lista.forEach((m, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${m.nome}</td>
            <td>${m.placa}</td>
            <td>${m.tipo}</td>
            <td>
                <button class="btn excluir" onclick="excluirMotorista(${i})">X</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

//-------------------------------------
function excluirMotorista(index) {
    let lista = JSON.parse(localStorage.getItem("motoristas")) || [];
    lista.splice(index, 1);
    localStorage.setItem("motoristas", JSON.stringify(lista));
    carregarMotoristas();
}

//-------------------------------------
function limparMotorista() {
    document.getElementById("formMotorista").reset();
}

//-------------------------------------
carregarMotoristas();
