"use strict";

const productList = document.getElementById("product-list");
const totalQuantities = document.getElementById("totaQuantity");
const productQuantity = document.querySelectorAll("#count-quantity");
const cartList = document.getElementById("cartList");

const cart = {};
let totalCount = 1;
for (const count of productQuantity) {
  count.textContent = totalCount;
}

productList.addEventListener("click", handleClicks);

/*
1. add the card2 class to the action button when it is clicked
2. remove the card2 class from the action button when mouse it remove
3. give a quantity of 1 to the product cart
4. craete a cart list that when the add to cart button is click it will grab the closest image, product       quantities and price to do some calculation 
5. store it in an object and display it on the cart log
*/

// handle general click on the product action button
function handleClicks(event) {
  const target = event.target;
  const productItem = target.closest("figure"),
    addToCartBtn = target.closest("#addToCartBtn"),
    addQuantityBtn = productItem.querySelector("#quantityBtn");

  if (addToCartBtn) {
    addQuantityBtn.classList.add("card2");
    addToCart(productItem);
  }

  addQuantityBtn.addEventListener("mouseleave", handleQuantityClicks);
  addQuantityBtn.addEventListener("click", handleQuantityClicks);
}

// get the product index as the id
function getProductId(productItem) {
  return Array.from(productItem.parentNode.children).indexOf(productItem);
}

function productUniqueId() {
  return `product-${Date.now()}`;
}

// handle click on add to cart button
function addToCart(productItem) {
  const itemId = productUniqueId();
  const productId = getProductId(productItem);
  const productImage = productItem.querySelector(".cart-img").currentSrc;
  const productName = productItem.querySelector("#product-name").textContent;
  const productPrice = parseFloat(
    productItem.querySelector("#product-price").textContent,
  );
  const productQuantity = parseFloat(
    productItem.querySelector("#count-quantity").textContent,
  );

  if (!cart[productId]) {
    cart[productId] = {
      id: itemId, // Assign unique ID here
      productImage,
      productName,
      productPrice,
      productQuantity,
      productCartTotalPrice: productQuantity * productPrice,
    };
    totalProductQuantity();
    addproductItemToCart(productItem);
    cartList.classList.remove("empty");
  }
}

// handle click on add on quantity button
function handleQuantityClicks(event) {
  event.stopPropagation();

  const productItem = event.target.closest("figure");
  if (!productItem) return;
  const productQuantities = productItem.querySelector("#count-quantity");

  const addQuantityBtn = event.currentTarget;
  const productId = getProductId(productItem);

  if (!productQuantities) return;

  if (event.type === "mouseleave") {
    addQuantityBtn.classList.remove("card2");
  }

  if (event.type === "click") {
    const currentButton = event.target.closest("button");

    if (!currentButton) return;

    if (currentButton.name === "increment") {
      incrementQuantity(productId, productItem);
    } else if (currentButton.name === "decrement") {
      decrementQuantity(productId, productItem);
    }
  }
}

function incrementQuantity(productId, productItem) {
  const productQuantities = productItem.querySelector("#count-quantity");
  const cartItem = cart[productId];
  if (cartItem) {
    cartItem.productQuantity += 1;
    productQuantities.textContent = cartItem.productQuantity;
    cartItem.productCartTotalPrice =
      cartItem.productQuantity * cartItem.productPrice;
    totalProductQuantity();
    addproductItemToCart(productItem);
  }
}

function decrementQuantity(productId, productItem) {
  const productQuantities = productItem.querySelector("#count-quantity");
  const cartItem = cart[productId];
  if (cartItem && cartItem.productQuantity > 1) {
    cartItem.productQuantity -= 1;
    productQuantities.textContent = cartItem.productQuantity;
    cartItem.productCartTotalPrice =
      cartItem.productQuantity * cartItem.productPrice;
    totalProductQuantity();
    addproductItemToCart(productItem);
  }
}

/*
1.calculate the total productQuantity added and diplay them in the notification.
2.loop through the cart object and display each added productitem on the page.
3.calculate the total price of each productItem added my multiplying the quantity my it price.
4.calculate the total price on the cart by adding all the price together
 */

// function to update the cart total productQuantities Notification

function totalProductQuantity() {
  const totalQuantity = Object.values(cart).reduce((total, productItem) => {
    return total + productItem.productQuantity;
  }, 0);
  return (totalQuantities.textContent = totalQuantity);
}

// function to add product to productCartList

function addproductItemToCart(productItem) {
  const productCartList = document.getElementById("productCartList");

  productCartList.innerHTML = "";

  for (const cartItem of Object.values(cart)) {
    const productCartItem = `
    <div data-id="${cartItem.id}"
            class="inline-flex w-full items-center justify-between border-b border-b-customrose-100 py-3"
          >
            <div>
              <h1 class="pb-1 font-medium text-black">${cartItem.productName}</h1>
              <p>
                <span class="mr-1 font-semibold text-red">${cartItem.productQuantity}x</span>
                <span class="mr-2 text-customrose-400">@ $${cartItem.productPrice.toFixed(2)}</span>
                <span class="text-customrose-500">$${cartItem.productCartTotalPrice.toFixed(2)}</span>
              </p>
            </div>
            <div id="cartItemBtn" class="rounded-full border border-customrose-400 p-1">
              <svg
                class="w-3 stroke-customrose-400 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 10 10"
              >
                <path
                  fill="#CAAFA7"
                  d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
                />
              </svg>
            </div>
          </div>
    `;

    productCartList.insertAdjacentHTML("beforeend", productCartItem);
    calTotalprice();
    const eachItem = productCartList.children;

    for (const item of eachItem) {
      removeProductCartItem(item, productItem);
    }
  }
}

// function to remove the cartitem delete the the cart object prodect and update the totalproduct quantities

function removeProductCartItem(item, productItem) {
  const cartItemBtn = item.querySelector("#cartItemBtn");
  const productQuantities = productItem.querySelector("#count-quantity");

  const productItemId = item.dataset.id;

  const cartId = Object.keys(cart).find(
    (keyId) => cart[keyId].id === productItemId,
  );

  if (!cartItemBtn) return;

  cartItemBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    if (cartId) {
      item.remove();
      delete cart[cartId];
      totalProductQuantity();
      calTotalprice();
      productQuantities.textContent = 1;
    }

    if (Object.keys(cart).length === 0) {
      cartList.classList.add("empty");
    }
  });
}

//calculate the total price and insert it in the html
function calTotalprice() {
  const productTotalPrice = document.getElementById("productTotalPrice");
  const totalprice = Object.keys(cart).reduce((totalprice, eachItem) => {
    const eachItemprice = cart[eachItem].productCartTotalPrice;
    return totalprice + eachItemprice;
  }, 0);
  const productsPrice = totalprice.toFixed(2);
  productTotalPrice.textContent = `$${productsPrice}`;
}
