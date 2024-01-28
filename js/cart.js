let productsCartLocalStorage = localStorage.getItem("Products-in-Cart");
productsCartLocalStorage = JSON.parse(productsCartLocalStorage);
const cartEmpty = document.querySelector("#cart__empty");
const cartProducts = document.querySelector("#cart__products");
const cartActions = document.querySelector("#cart__actions");
const cartBought = document.querySelector("#cart__bought");
let buttonDelete = document.querySelectorAll(".cart__product__delete");
const cartActionsEmpty = document.querySelector("#cart__actions__empty");
const cartTotal = document.querySelector("#total");
const cartBuy = document.querySelector("#cart__actions__buy");

function loadProductsCart(){
  if (productsCartLocalStorage && productsCartLocalStorage.length > 0){
    cartEmpty.classList.add("disabled");
    cartProducts.classList.remove("disabled");
    cartActions.classList.remove("disabled");
    cartBought.classList.add("disabled");
  
    cartProducts.innerHTML = "";
  
    productsCartLocalStorage.forEach(product => {
      const div = document.createElement("div");
      div.classList.add("cart__product");
      div.innerHTML = `
        <figure class="cart__figure">
          <img src="${product.img}" alt="${product.title}" class="card__img">
        </figure>
        <div class="cart__product__title">
          <small>Name</small>
          <h3>${product.title}</h3>
        </div>
        <div class="cart__product__amount">
          <small>Amount</small>
          <p>${product.amount}</p>
        </div>
        <div class="cart__product__price">
          <small>Price</small>
          <p>$${product.price}</p>
        </div>
        <div class="cart__product__subtotal">
          <small>Subtotal</small>
          <p>${product.price * product.amount}</p>
        </div>
        <button class="cart__product__delete" id="${product.id}"><i class="bi bi-trash-fill"></i></button>
      `
      cartProducts.append(div);
    });
  } else{
    cartEmpty.classList.remove("disabled");
    cartProducts.classList.add("disabled");
    cartActions.classList.add("disabled");
    cartBought.classList.add("disabled");
  }
  updateButtonsDelete();
  calcTotal();
}

loadProductsCart();

function updateButtonsDelete(){
  buttonDelete = document.querySelectorAll(".cart__product__delete");
  buttonDelete.forEach(button => {
    button.addEventListener("click", deleteFromCart);
  });
}

function deleteFromCart(e){
  const idButton = e.currentTarget.id;
  const indexProductDelete = productsCartLocalStorage.findIndex(product => product.id === idButton);

  productsCartLocalStorage.splice(indexProductDelete, 1);
  loadProductsCart();

  localStorage.setItem("Products-in-Cart", JSON.stringify(productsCartLocalStorage));
}

cartActionsEmpty.addEventListener("click", emptyCart);

function emptyCart(){
  productsCartLocalStorage.length = 0;
  localStorage.setItem("Products-in-Cart", JSON.stringify(productsCartLocalStorage));
  loadProductsCart();
}

function calcTotal(){
  total.innerHTML = "$ " + productsCartLocalStorage.reduce((acc, product) => acc + (product.price * product.amount), 0);
}

cartBuy.addEventListener("click", buyCart);
function buyCart(){
  productsCartLocalStorage.length = 0;
  localStorage.setItem("Products-in-Cart", JSON.stringify(productsCartLocalStorage));
  cartEmpty.classList.add("disabled");
  cartProducts.classList.add("disabled");
  cartActions.classList.add("disabled");
  cartBought.classList.remove("disabled");
}