let carts = document.querySelectorAll(".btn-add-big, .btn-add-lil");

var hatt22 = document.getElementById("hatt22");
hatt22.addEventListener("click", function () {
  console.log("asdasoid");
  window.open("shop2.html", "_blank");
});

let products = [
  {
    name: "Apple BYZ S852I ",
    img: "hp1.png",
    tag: " Apple BYZ S852I",
    price: 2927,
    inCart: 0,
    id: 0,
  },
  {
    name: "Apple EarPods ",
    tag: "Apple EarPods1",
    price: 2327,
    inCart: 0,
    img: "hp2.png",
    id: 1,
  },
  {
    name: "Apple EarPods ",
    tag: " Apple EarPods2",
    price: 2327,
    inCart: 0,
    img: "hp3.png",
    id: 2,
  },
  {
    name: "Apple BYZ S852I ",
    tag: "Apple BYZ S852I ",
    price: 2927,
    inCart: 0,
    img: "hp4.png",
    id: 3,
  },
  {
    name: "Apple EarPods ",
    tag: " Apple EarPods3",
    price: 2327,
    inCart: 0,
    img: "hp5.png",
    id: 4,
  },
  {
    name: "Apple EarPods",
    tag: "Apple EarPods4",
    price: 2327,
    inCart: 0,
    img: "hp6.png",
    id: 5,
  },
  {
    name: "Apple AirPods",
    tag: " Apple AirPods",
    price: 9527,
    inCart: 0,
    img: "hp7.png",
    id: 6,
  },
  {
    name: " GERLAX GH-04",
    tag: " GERLAX GH-04",
    price: 6527,
    inCart: 0,
    img: "hp8.png",
    id: 7,
  },
  {
    name: "BOROFONE BO4 ",
    tag: " BOROFONE BO4",
    price: 7527,
    inCart: 0,
    img: "hp9.png",
    id: 8,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart-num").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart-num").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart-num").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    let currentProduct = product.tag;
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
      cartItems[currentProduct].inCart = 1;
    } else {
      cartItems[currentProduct].inCart += 1;
    }
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  cartCost = parseFloat(cartCost);
  if (isNaN(cartCost) || cartCost == null) {
    cartCost = 0;
  }
  console.log("is", cartCost);
  console.log(typeof cartCost);
  if (cartCost == 0) {
    cartCost = product.price;
  } else {
    cartCost += product.price;
  }
  localStorage.setItem("totalCost", cartCost);
}

function displayCart() {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart") || "{}");

  let productContainer = document.querySelector(".product-container");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    (productContainer.innerHTML = ""),
      (productContainer.innerHTML += `
    <h4 class="cart-it">
        Корзина
        </h4>`);
    Object.values(cartItems).map((item, index) => {
      productContainer.innerHTML += `
        <div class='cart-product' data-id="${item.id}">
        
          <button name="close-circle" class='cart-product__deleteb' type="button">
            <img src='del.png' class='deleteb-img'>
          </button>
          <img src="${item.img}" class="cart-product__photo" />
          <span class="cart-product__name"> ${item.name}</span>
          <div class='cart-product__price' >
            ${item.price}₽
          </div>
          <div class='quantity'>
            <button class="cart-product__decrease" name="arrow-dropleft-circle" type="button">-</button>
            <span class="number">${item.inCart} </span>
            <button class="cart-product__increase" name="arrow-dropright-circle" type="button">+</button>
          </div>
          <div class="cart-product__total">
            ${item.inCart * item.price} ₽
            </div>
        </div>
      `;
    });
    productContainer.innerHTML += `
        <div class="basketTotalContainer">
        
         <h4 class='basketTotalTitle'>
                Итог
          </h4>
         <h4 class='basketTotal'>
         ₽ ${cartCost}
          </h4>
        </div>
        <div class="end">
        <button class="end-btn">
        Перейти к оформлению
        </button>
        </div>
`;
    let productCards = document.querySelectorAll(".cart-product");
    productCards.forEach((el) => {
      const id = el.dataset.id;
      const increaseButton = el.querySelector(".cart-product__increase");
      const decreaseButton = el.querySelector(".cart-product__decrease");
      increaseButton.addEventListener("click", (e) => {
        e.preventDefault();
        increaseProductQuantity(id);
      });
      decreaseButton.addEventListener("click", (e) => {
        e.preventDefault();
        decreaseProductQuantity(id);
      });
    });
    productCards.forEach((el) => {
      const id = el.dataset.id;
      const delButton = el.querySelector(".cart-product__deleteb");

      delButton.addEventListener("click", (e) => {
        e.preventDefault();
        deleteButtons(id);
      });
    });
    let cartProductsList = document.querySelectorAll(".cart-product");
    cartProductsList.forEach((cartProduct) => {
      cartProduct.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart-product__deleteb")) {
          let cartProduct = e.target.closest(".cart-product");
          deleteProducts(cartProduct);
        }
      });
    });
  }
  if (!localStorage.getItem("cartItemsNumber")) {
    localStorage.setItem("cartItemsNumber", 0);
  }

  let cartItemsNumber = parseInt(localStorage.getItem("cartItemsNumber"));
  let cartItemElements = document.getElementsByClassName("cart-num");
  for (let i = 0; i < cartItemElements.length; i++) {
    cartItemElements[i].innerText = cartItemsNumber;
  }
}
function priceWithoutSpaces(str) {
  return str.replace(/\s+/g, "");
}
displayCart();

function increaseProductQuantity(productid) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  let keys = Object.keys(cartItems);

  for (let i = 0; i < keys.length; i++) {
    let id = keys[i];

    if (cartItems[id].id == productid) {
      cartItems[id].inCart += 1;

      let cartCost = parseInt(localStorage.getItem("totalCost"));
      localStorage.setItem("totalCost", cartCost + cartItems[id].price);

      let cartItemsNumber = parseInt(localStorage.getItem("cartItemsNumber"));
      localStorage.setItem("cartItemsNumber", cartItemsNumber + 1);

      let cartItemElements = document.getElementsByClassName("cart-num");
      for (let i = 0; i < cartItemElements.length; i++) {
        cartItemElements[i].innerText = cartItemsNumber;
      }

      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      displayCart();
    }
  }
}

function decreaseProductQuantity(productid) {
  debugger;
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let keys = Object.keys(cartItems);

  for (let i = 0; i < keys.length; i++) {
    let id = keys[i];

    if (cartItems[id].id == productid) {
      if (cartItems[id].inCart > 1) {
        cartItems[id].inCart -= 1;

        let cartCost = parseInt(localStorage.getItem("totalCost"));
        localStorage.setItem("totalCost", cartCost - cartItems[id].price);

        let cartItemsNumber = parseInt(localStorage.getItem("cartItemsNumber"));
        localStorage.setItem("cartItemsNumber", cartItemsNumber - 1);

        let cartItemElements = document.getElementsByClassName("cart-num");
        for (let i = 0; i < cartItemElements.length; i++) {
          cartItemElements[i].innerText = cartItemsNumber;
        }

        localStorage.setItem("productsInCart", JSON.stringify(cartItems));
        displayCart();
      }
    }
  }
}

function deleteButtons(productid) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  let removedQty = 0;
  Object.keys(cartItems).forEach(function (key) {
    let item = cartItems[key];
    if (item.id == productid) {
      removedQty += item.inCart;
    }
  });

  Object.keys(cartItems).forEach(function (key) {
    let item = cartItems[key];
    if (item.id == productid) {
      let qtyToRemove = item.inCart;

      if (removedQty == qtyToRemove) {
        localStorage.setItem(
          "totalCost",
          parseInt(localStorage.getItem("totalCost")) - item.price * qtyToRemove
        );
        delete cartItems[key];
      } else {
        let cartItemsNumber = Math.min(qtyToRemove, removedQty);
        item.inCart -= cartItemsNumber;
        localStorage.setItem(
          "totalCost",
          parseInt(localStorage.getItem("totalCost")) -
            item.price * cartItemsNumber
        );
      }

      removedQty -= qtyToRemove;
    }
  });

  let cartItemsNumber = 0;
  Object.keys(cartItems).forEach(function (key) {
    let item = cartItems[key];
    cartItemsNumber += item.inCart;
  });
  localStorage.setItem("cartItemsNumber", cartItemsNumber);
  let cartItemElements = document.getElementsByClassName("cart-num");
  for (let i = 0; i < cartItemElements.length; i++) {
    cartItemElements[i].innerText = cartItemsNumber;
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  displayCart();
}

document.addEventListener("DOMContentLoaded", function () {
  deleteButtons();
});

onLoadCartNumbers();
