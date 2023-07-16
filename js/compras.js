// Função para carregar os itens do carrinho do localStorage
function loadCartItems() {
  var storedItems = localStorage.getItem("cartItems");
  var cartItemCountElement = document.getElementById("cart-item-count");
  var itemCount = 0;

  if (storedItems) {
    cartItems = JSON.parse(storedItems);

    cartItems.forEach(function (item) {
      itemCount += item.quantity;
    });
  }

  cartItemCountElement.textContent = itemCount;
}

loadCartItems();

// Função para carregar as compras salvas
function loadSavedCompras() {
  var savedCompras = localStorage.getItem("compras");
  if (savedCompras) {
    var compras = JSON.parse(savedCompras);
    renderCompras(compras);
  } else {
    renderEmptyMessage();
  }
}

// Função para renderizar as compras salvas
function renderCompras(compras) {
  var comprasElement = document.getElementById("compras");
  comprasElement.innerHTML = ""; // Limpar o conteúdo anterior

  if (compras.length === 0) {
    renderEmptyMessage();
  } else {
    compras.forEach(function (compra) {
      var compraElement = document.createElement("div");
      compraElement.classList.add("compra");

      var idElement = document.createElement("p");
      idElement.classList.add("compra-id");
      idElement.innerHTML = "ID da Compra: " + compra.id;

      var produtosElement = document.createElement("p");
      produtosElement.textContent = "Produtos: " + compra.produtos;

      var totalElement = document.createElement("p");
      totalElement.classList.add("compra-total");
      totalElement.textContent = "Total: R$ " + compra.total;

      compraElement.appendChild(idElement);
      compraElement.appendChild(produtosElement);
      compraElement.appendChild(totalElement);

      comprasElement.appendChild(compraElement);
    });
  }
}

// Função para renderizar a mensagem de compras vazias
function renderEmptyMessage() {
  var comprasElement = document.getElementById("compras");
  comprasElement.innerHTML = ""; // Limpar o conteúdo anterior

  var emptyMessage = document.createElement("p");
  emptyMessage.textContent = "Não há compras realizadas.";

  comprasElement.appendChild(emptyMessage);
}

loadSavedCompras(); // Carrega as compras salvas do localStorage
