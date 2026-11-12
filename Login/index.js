document.querySelector('#form-login').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const senha = document.querySelector('#senha').value;
  const error = document.querySelector('#loginError');
  const profile = CrudApp.storage.getObject('profile', { email:'guc193577@gmail.com' });
  if (email.toLowerCase() === profile.email.toLowerCase() && senha === '123') { error.textContent=''; location.href='../Home/index.html'; return; }
  error.textContent='E-mail ou senha inválidos. Verifique os dados e tente novamente.';
});
