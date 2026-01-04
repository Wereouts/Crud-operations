const caracteresEspeciais = /[!@#$%^&*()_]/;




function mostrarValores() {
    const selectDia = document.getElementById('dia');
    const selectMes = document.getElementById('mes');
    const selectAno = document.getElementById('ano');

    const dia = selectDia.value;
    const mes = selectMes.value;    
    const ano = selectAno.value;

    alert(`Sua data de nascimento é dia ${dia} do mês ${mes} do ano ${ano}`);
}



function validorDeSenha () {
    const inputSenha = document.getElementById('senha');
    const validarSenha = inputSenha.value;

    const temCaracterEspeciail = caracteresEspeciais.test(senha);

    if (temCaracterEspeciail) {
        console.log ('A senha contem um ou mais caracteres permitidos')
        return true;
    }
    else {
        console.log ('A senha que informou não contem caracteres especiais')
        return false;
    }

}