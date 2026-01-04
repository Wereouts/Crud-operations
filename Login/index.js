
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const email = emailInput.value;
const senha = senhaInput.value;
const cadastrado = "Seu email e senha estão cadastrados";
const naoCadastrado = "Seu email e senha não estão cadastrados"



function verificarCadastro () {
    const email = emailInput.value;
    const senha = senhaInput.value;

    if (email === "guc193577@gmail.com" && senha === "123")
        window.open("../Home/index.html", '_blank');
        else alert(naoCadastrado)

}

function clicouNoEsqueciSenha () {
    window.open("../Cadastrar/index.html", '_blank');
    }

