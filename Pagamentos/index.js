const btnAdd = document.querySelector(".btnAdd");
const btnFechar = document.querySelector("#btnFechar");
const modal = document.querySelector("#modalCadastro");
const form = document.querySelector("#formCadastro");
const listaUsuarios = document.querySelector("#listaUsuarios");

// Abrir modal
btnAdd.onclick = () => modal.showModal();

// Fechar modal
btnFechar.onclick = () => modal.close();

// Salvar Cadastro
form.onsubmit = (e) => {
    e.preventDefault(); // Impede a página de recarregar

    const fotoInput = document.querySelector("#foto");
    const file = fotoInput.files[0];
    const fotoSrc = file ? URL.createObjectURL(file) : '';

    // Criar o elemento container
    const novoUsuario = document.createElement("div");
    novoUsuario.classList.add("item-usuario");

    novoUsuario.innerHTML = `
        <div class="dadosUsuario">
            <img src="${fotoSrc}" alt="Foto" class="fotoUsuario">
            <p>${document.querySelector("#nome").value}</p>
            <p>${document.querySelector("#PaymentSchedule").value}</p>
            <p>${document.querySelector("#Billnumber").value}</p>
            <p>${document.querySelector("#AmountPaid").value}</p>
            <p>${document.querySelector("#Balanceamount").value}</p>
            <p>${document.querySelector("#data").value}</p>
        </div>
        <div class="acoes">
            <span class="btn-edit">✎</span>
            <span class="btn-delete" onclick="this.parentElement.parentElement.remove()">🗑</span>
        </div>
    `;

    // Adicionar na tela
    listaUsuarios.appendChild(novoUsuario);

    // Limpar form e fechar
    form.reset();
    modal.close();
};