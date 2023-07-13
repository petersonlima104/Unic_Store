// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
  var cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";

  cartItems.forEach(function (item) {
    var cartItem = document.createElement("li");
    cartItem.classList.add("list-group-item");

    var itemName = document.createElement("span");
    itemName.textContent = item.product.name;

    var itemPrice = document.createElement("span");
    itemPrice.classList.add("float-right");
    itemPrice.textContent =
      "R$ " + (item.product.price * item.quantity).toFixed(2);

    var quantityLabel = document.createElement("label");
    quantityLabel.setAttribute("for", "quantity-input-cart-" + item.product.id);
    quantityLabel.textContent = "Quantidade: ";

    var quantityInput = document.createElement("input");
    quantityInput.setAttribute("type", "number");
    quantityInput.setAttribute("id", "quantity-input-cart-" + item.product.id);
    quantityInput.classList.add("quantity-input");
    quantityInput.value = item.quantity;
    quantityInput.addEventListener("change", function () {
      updateCartItemQuantity(item.product.id, parseInt(quantityInput.value));
      saveCartItems(); // Salva os itens do carrinho no localStorage
      updateCartDisplay(); // Atualiza a exibição do carrinho
    });

    var removeButton = document.createElement("button");
    removeButton.classList.add(
      "btn",
      "btn-danger",
      "btn-sm",
      "float-right",
      "mr-2"
    );
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", function () {
      removeFromCart(item.product.id);
      saveCartItems(); // Salva os itens do carrinho no localStorage
      updateCartDisplay(); // Atualiza a exibição do carrinho
    });

    cartItem.appendChild(itemName);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(removeButton);
    cartItem.appendChild(document.createElement("br"));
    cartItem.appendChild(quantityLabel);
    cartItem.appendChild(quantityInput);

    cartItemsElement.appendChild(cartItem);
  });

  updateTotalPrice();
}

// Função para atualizar a quantidade de um item do carrinho
function updateCartItemQuantity(productId, quantity) {
  var item = cartItems.find(function (item) {
    return item.product.id === productId;
  });

  if (item) {
    item.quantity = quantity;
  }
}

// Função para remover um item do carrinho
function removeFromCart(productId) {
  cartItems = cartItems.filter(function (item) {
    return item.product.id !== productId;
  });
}

// Função para atualizar o total da compra
function updateTotalPrice() {
  var totalPrice = 0;
  cartItems.forEach(function (item) {
    totalPrice += item.product.price * item.quantity;
  });

  var totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = "Total: R$ " + totalPrice.toFixed(2);
}

// Função para salvar os itens do carrinho no localStorage
function saveCartItems() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Função para carregar os itens do carrinho do localStorage
function loadCartItems() {
  var storedItems = localStorage.getItem("cartItems");
  if (storedItems) {
    cartItems = JSON.parse(storedItems);
    renderCartItems();
  }
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
  updateCartDisplay();
}

loadCartItems(); // Carrega os itens do carrinho do localStorage
