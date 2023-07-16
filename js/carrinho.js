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
      var newQuantity = parseInt(quantityInput.value);

      // Restrição de quantidade mínima e máxima
      if (newQuantity < 1) {
        newQuantity = 1;
      } else if (newQuantity > 10) {
        newQuantity = 10;
      }

      quantityInput.value = newQuantity;

      updateCartItemQuantity(item.product.id, newQuantity);
      saveCartItems();
      updateCartDisplay();
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
    // Restrição de quantidade mínima e máxima
    if (quantity < 1) {
      quantity = 1;
    } else if (quantity > 10) {
      quantity = 10;
    }

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

// Função para obter o valor total do carrinho
function getTotalPrice() {
  var totalPrice = 0;
  cartItems.forEach(function (item) {
    totalPrice += item.product.price * item.quantity;
  });
  return totalPrice;
}

// Função para atualizar o total da compra
function updateTotalPrice() {
  var totalPrice = getTotalPrice();

  var totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = "Total: R$ " + totalPrice.toFixed(2);
}

// Função para compartilhar o carrinho via WhatsApp
function shareCartViaWhatsApp() {
  var message =
    "*Olá, tudo bem?*\n" + "*Segue o pedido abaixo com os itens que desejo:*\n";

  cartItems.forEach(function (item) {
    message +=
      item.product.name +
      " - R$ " +
      (item.product.price * item.quantity).toFixed(2) +
      "\n";
  });

  message += "*Total: R$ " + getTotalPrice().toFixed(2) + "*";

  var phoneNumber = "5551980533399"; // Telefone direcionado para envio da mensagem

  var whatsappLink =
    "https://api.whatsapp.com/send?phone=" +
    phoneNumber +
    "&text=" +
    encodeURIComponent(message);

  window.open(whatsappLink, "_blank");
}

// Função para renderizar os itens do carrinho
function renderCartItems() {
  updateCartDisplay();
}

loadCartItems(); // Carrega os itens do carrinho do localStorage
