document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Verificar as credenciais
    var savedUsername = localStorage.getItem("login");
    var savedPassword = localStorage.getItem("senha");

    if (username === savedUsername && password === savedPassword) {
      sessionStorage.setItem("autor", username);

      // Armazenar o nome de usuário na sessão
      window.location.href = "/html/home.html";
    } else {
      alert("Usuário ou senha incorretos. Tente novamente.");
    }
  });

document.getElementById("cadastro-btn").addEventListener("click", function () {
  window.location.href = "/html/cadastro.html";
});
