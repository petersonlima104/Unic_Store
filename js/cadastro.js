document
  .getElementById("cadastro-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmar-senha").value;

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    // Salvar as informações do usuário em localStorage
    localStorage.setItem("login", login);
    localStorage.setItem("senha", senha);

    alert("Cadastro realizado com sucesso. Agora você pode fazer o login.");
    window.location.href = "/index.html";
  });

document.getElementById("cadastro-btnC").addEventListener("click", function () {
  window.location.href = "/index.html";
});
