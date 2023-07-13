// Array de produtos
var products = [
  {
    id: 1,
    name: "Liquidificador - Mondial",
    price: 70,
    image: "/img/product1.jpg",
  },
  {
    id: 2,
    name: "AirFrier - Fritadeira Elétrica",
    price: 350,
    image: "/img/product2.jpg",
  },
  {
    id: 3,
    name: "Panela de Pressão 4.5L",
    price: 79,
    image: "/img/product3.jpg",
  },
  {
    id: 4,
    name: "Garrafa Térmica",
    price: 30,
    image: "/img/product4.jpg",
  },
  {
    id: 5,
    name: "Aparador/Tosador de Pelos",
    price: 135,
    image: "/img/product5.jpg",
  },
  {
    id: 6,
    name: "Micro-ondas Electrolux 31 Litros",
    price: 764,
    image: "/img/product6.jpg",
  },
  {
    id: 7,
    name: "Cooktop 5 Bocas a Gás Tripla Chama",
    price: 439,
    image: "/img/product7.jpg",
  },
  {
    id: 8,
    name: "Lavadora de Roupas 12Kg",
    price: 1899,
    image: "/img/product8.jpg",
  },
  {
    id: 9,
    name: "Forno Elétrico de Bancada Mondial com Timer - 52L",
    price: 503,
    image: "/img/product9.jpg",
  },
  {
    id: 10,
    name: "Smart TV 43” UHD 4K LED Samsung",
    price: 2199,
    image: "/img/product10.jpg",
  },
  {
    id: 11,
    name: "Google Chromecast 3 - Streaming em Full HD",
    price: 319,
    image: "/img/product11.jpg",
  },
  {
    id: 12,
    name: "Notebook 500 SDD - 4gb Ram Sansung",
    price: 4799,
    image: "/img/product12.jpg",
  },
  {
    id: 13,
    name: "Impressora Multifuncional HP Deskjet Ink Advantage",
    price: 325,
    image: "/img/product13.jpg",
  },
  {
    id: 14,
    name: "Cartucho HP 664XL preto Original",
    price: 139,
    image: "/img/product14.jpg",
  },
  {
    id: 15,
    name: "Repetidor e Amplificador De Sinal Wi-fi",
    price: 53,
    image: "/img/product15.jpg",
  },
  {
    id: 16,
    name: "Teclado e Mouse sem fio com Conexão USB e Layout ABNT2",
    price: 124,
    image: "/img/product16.jpg",
  },
];

var cartItems = [];

// Função para renderizar os produtos
function renderProducts() {
  var searchInput = document.getElementById("search-input");
  var searchQuery = searchInput.value.toLowerCase().trim();

  var productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";

  products.forEach(function (product) {
    if (product.name.toLowerCase().includes(searchQuery)) {
      var productCard = document.createElement("div");
      productCard.classList.add("col-md-3", "product-card");

      var card = document.createElement("div");
      card.classList.add("card");

      var cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      var productImage = document.createElement("img");
      productImage.classList.add("card-img-top", "product-image");
      productImage.setAttribute("src", product.image);
      productImage.setAttribute("alt", product.name);

      var productName = document.createElement("h5");
      productName.classList.add("card-title");
      productName.textContent = product.name;

      var productPrice = document.createElement("p");
      productPrice.classList.add("card-text");
      productPrice.textContent = "Preço: R$ " + product.price.toFixed(2);

      var addToCartButton = document.createElement("button");
      addToCartButton.classList.add("btn", "btn-primary");
      addToCartButton.textContent = "Adicionar ao Carrinho";
      addToCartButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita o comportamento padrão do botão
        var quantity = 1;
        addToCart(product, quantity);
        showConfirmationMessage("Adicionado ao carrinho!", event.target);
        updateCartItemCount(); // Atualiza o número de itens no carrinho
      });

      cardBody.appendChild(productImage);
      cardBody.appendChild(productName);
      cardBody.appendChild(productPrice);
      cardBody.appendChild(addToCartButton);

      card.appendChild(cardBody);
      productCard.appendChild(card);

      productContainer.appendChild(productCard);
    }
  });
}

// Função para adicionar um produto ao carrinho
function addToCart(product, quantity) {
  var existingItem = cartItems.find(function (item) {
    return item.product.id === product.id;
  });

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ product: product, quantity: quantity });
  }

  updateCartDisplay();
  saveCartItems();
}

// Função para exibir uma mensagem de confirmação na tela
function showConfirmationMessage(message, targetElement) {
  var confirmationMessage = document.createElement("div");
  confirmationMessage.classList.add("alert", "alert-success");
  confirmationMessage.textContent = message;

  var parentElement = targetElement.parentElement;
  parentElement.insertBefore(confirmationMessage, targetElement.nextSibling);

  setTimeout(function () {
    parentElement.removeChild(confirmationMessage);
  }, 2000);
}

// Função para atualizar a exibição do carrinho
function updateCartDisplay() {
  // Resto do código para atualizar a exibição do carrinho
}

// Função para atualizar o número de itens no carrinho
function updateCartItemCount() {
  var cartItemCountElement = document.getElementById("cart-item-count");
  var itemCount = 0;

  cartItems.forEach(function (item) {
    itemCount += item.quantity;
  });

  cartItemCountElement.textContent = itemCount;
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
    updateCartDisplay();
    updateCartItemCount();
  }
}

// Renderiza os produtos inicialmente
renderProducts();
loadCartItems();

// Evento de digitação no campo de pesquisa
var searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {
  renderProducts();
});
