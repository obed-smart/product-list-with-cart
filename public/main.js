"use strict";

/*
1. add the card2 class to the action button when it is clicked
2. remove the card2 class from the action button when mouse it remove
*/

const productList = document.getElementById("product-list");

productList.addEventListener("click", handleClicks);

// handle general click on the product action button
function handleClicks(event) {
  const target = event.target;
  const productItem = target.closest("figure"),
    addToCartBtn = target.closest("#addToCartBtn"),
    addQuantityBtn = productItem.querySelector("#quantityBtn");

  handleAddToCartClicks(event);

  addQuantityBtn.addEventListener("mouseleave", handleQuantityClicks);
  addQuantityBtn.addEventListener("click", handleQuantityClicks);
}

// handle click on add to cart button
function handleAddToCartClicks(event) {
  const productItem = event.target.closest("figure"),
    addToCartBtn = event.target.closest("#addToCartBtn"),
    addQuantityBtn = productItem.querySelector("#quantityBtn");

  if (!productItem) return;

  const productImage = productItem.querySelector(".cart-img");
  const productName = productItem.querySelector("#product-name");
  const productPrice = productItem.querySelector("#product-price");

  if (addToCartBtn) {
    addQuantityBtn.classList.add("card2");
    
  }
}

// handle click on add on quantity button
function handleQuantityClicks(event) {
  event.stopPropagation();
  const addQuantityBtn = event.currentTarget;

  if (event.type === "mouseleave") {
    addQuantityBtn.classList.remove("card2");
  }

  if (event.type === "click") {
    const currentButton = event.target.closest("button");
    if (currentButton) {
      console.log(currentButton.name);
    }
  }
}

/**
 1. give a quantity of 1 to the product cart
 2. craete a cart list that when the add to cart button is click it will grab the closest image, product    quantities and price to do some calculation 
 3. store it in an object and display it on the cart log
 */
