// Array de produtos
var products = [
  {
    id: 1,
    name: "Liquidificador - Mondial",
    price: 70,
    images: ["/img/product1.jpg", "/img/product1_2.jpg", "/img/product1_3.jpg"],
    videos: ["/video/product1.mp4", "/video/product1_2.mp4"],
  },
  {
    id: 2,
    name: "AirFrier - Fritadeira Elétrica",
    price: 350,
    images: ["/img/product2.jpg", "/img/product2_2.jpg", "/img/product2_3.jpg"],
    videos: ["/video/product2.mp4", "/video/product2_2.mp4"],
  },
  {
    id: 3,
    name: "Panela de Pressão 4.5L",
    price: 79,
    images: ["/img/product3.jpg", "/img/product3_2.jpg", "/img/product3_3.jpg"],
    videos: [],
  },
  {
    id: 4,
    name: "Garrafa Térmica",
    price: 30,
    images: ["/img/product4.jpg", "/img/product4_2.jpg", "/img/product4_3.jpg"],
    videos: [],
  },
  {
    id: 5,
    name: "Aparador/Tosador de Pelos",
    price: 135,
    images: ["/img/product5.jpg", "/img/product4_2.jpg", "/img/product4_3.jpg"],
    videos: [],
  },
  {
    id: 6,
    name: "Micro-ondas Electrolux 31 Litros",
    price: 764,
    images: ["/img/product6.jpg", "/img/product4_2.jpg", "/img/product4_3.jpg"],
    videos: [],
  },
  {
    id: 7,
    name: "Cooktop 5 Bocas a Gás Tripla Chama",
    price: 439,
    images: ["/img/product7.jpg", "/img/product4_2.jpg", "/img/product4_3.jpg"],
    videos: [],
  },
  {
    id: 8,
    name: "Lavadora de Roupas 12Kg",
    price: 1899,
    images: ["/img/product8.jpg", "/img/product4_2.jpg", "/img/product4_3.jpg"],
    videos: [],
  },
  {
    id: 9,
    name: "Forno Elétrico de Bancada Mondial com Timer - 52L",
    price: 503,
    images: ["/img/product9.jpg", "/img/product4_2.jpg", "/img/product4_3.jpg"],
    videos: [],
  },
  {
    id: 10,
    name: "Smart TV 43” UHD 4K LED Samsung",
    price: 2199,
    images: [
      "/img/product10.jpg",
      "/img/product4_2.jpg",
      "/img/product4_3.jpg",
    ],
    videos: [],
  },
  {
    id: 11,
    name: "Google Chromecast 3 - Streaming em Full HD",
    price: 319,
    images: [
      "/img/product11.jpg",
      "/img/product4_2.jpg",
      "/img/product4_3.jpg",
    ],
    videos: [],
  },
  {
    id: 12,
    name: "Notebook 500 SDD - 4gb Ram Sansung",
    price: 4799,
    images: [
      "/img/product12.jpg",
      "/img/product4_2.jpg",
      "/img/product4_3.jpg",
    ],
    videos: [],
  },
  {
    id: 13,
    name: "Impressora Multifuncional HP Deskjet Ink Advantage",
    price: 325,
    images: [
      "/img/product13.jpg",
      "/img/product4_2.jpg",
      "/img/product4_3.jpg",
    ],
    videos: [],
  },
  {
    id: 14,
    name: "Cartucho HP 664XL preto Original",
    price: 139,
    images: [
      "/img/product14.jpg",
      "/img/product4_2.jpg",
      "/img/product4_3.jpg",
    ],
    videos: [],
  },
  {
    id: 15,
    name: "Repetidor e Amplificador De Sinal Wi-fi",
    price: 53,
    images: [
      "/img/product15.jpg",
      "/img/product4_2.jpg",
      "/img/product4_3.jpg",
    ],
    videos: [],
  },
  {
    id: 16,
    name: "Teclado e Mouse sem fio com Conexão USB e Layout ABNT2",
    price: 124,
    images: [
      "/img/product16.jpg",
      "/img/product4_2.jpg",
      "/img/product4_3.jpg",
    ],
    videos: [],
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
      productImage.setAttribute("src", product.images[0]);
      productImage.setAttribute("alt", product.name);

      // Adicione um atributo 'data-target' com o ID do produto para identificá-lo no modal
      productImage.setAttribute("data-toggle", "modal");
      productImage.setAttribute("data-target", "#mediaModal");
      productImage.setAttribute("data-product-id", product.id); // Novo atributo

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

// Função para renderizar a mídia do produto no modal
function renderProductMedia(productId) {
  var product = products.find(function (item) {
    return item.id === productId;
  });

  var mediaIndicators = document.getElementById("mediaIndicators");
  var mediaItems = document.getElementById("mediaItems");

  mediaIndicators.innerHTML = "";
  mediaItems.innerHTML = "";

  // Renderizar imagens
  product.images.forEach(function (image, index) {
    var indicator = document.createElement("li");
    indicator.setAttribute("data-target", "#mediaCarousel");
    indicator.setAttribute("data-slide-to", index.toString());
    if (index === 0) {
      indicator.classList.add("active");
    }
    mediaIndicators.appendChild(indicator);

    var item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) {
      item.classList.add("active");
    }

    var imageElement = document.createElement("img");
    imageElement.classList.add("d-block", "w-100");
    imageElement.setAttribute("src", image);
    imageElement.setAttribute("alt", product.name);

    item.appendChild(imageElement);
    mediaItems.appendChild(item);
  });

  // Renderizar vídeos locais
  product.videos.forEach(function (video) {
    var item = document.createElement("div");
    item.classList.add("carousel-item");

    var videoElement = document.createElement("video");
    videoElement.classList.add("d-block", "w-100");
    videoElement.setAttribute("controls", "");

    var sourceElement = document.createElement("source");
    sourceElement.setAttribute("src", video);
    sourceElement.setAttribute("type", "video/mp4");

    videoElement.appendChild(sourceElement);
    item.appendChild(videoElement);
    mediaItems.appendChild(item);
  });
}

// Evento de clique na imagem do produto
document.addEventListener("click", function (event) {
  if (event.target.matches(".product-image")) {
    var productId = event.target.getAttribute("data-product-id");
    renderProductMedia(parseInt(productId));
  }
});

// Evento de digitação no campo de pesquisa
var searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {
  renderProducts();
});
