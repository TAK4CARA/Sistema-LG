// USUÁRIO ADMIN PADRÃO (SIMULAÇÃO)
const usuarioPadrao = {
    nome: "Administrador",
    email: "admin@admin.com",
    senha: "Admin@123",
    nivel: "admin"
};


// SALVA USUÁRIO SE NÃO EXISTIR
if (!localStorage.getItem("usuarios")) {
    localStorage.setItem("usuarios", JSON.stringify([usuarioPadrao]));
}

// FUNÇÃO DE LOGIN
function login() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const msg = document.getElementById("msg");

    if (!email || !senha) {
        msg.innerText = "Preencha todos os campos.";
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
        msg.innerText = "Usuário ou senha inválidos.";
        return;
    }

    // CRIA SESSÃO
localStorage.setItem("usuarioLogado", JSON.stringify({
    nome: usuario.nome,
    email: usuario.email,
    nivel: usuario.nivel
}));



    // REDIRECIONA PARA MENU
    window.location.href = "index.html";
}

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

