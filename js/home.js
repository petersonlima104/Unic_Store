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
