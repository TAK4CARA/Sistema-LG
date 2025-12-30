function exigirLogin() {
    if (!localStorage.getItem("usuarioLogado")) {
        window.location.href = "login.html";
    }
}


