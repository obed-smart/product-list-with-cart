"use strict";

/*
1. add the card2 class to the action button when it is clicked
2. remove the card2 class from the action button when mouse it remove
*/

const addToCartBtn = document.querySelectorAll("#Btn-child1");
const productQuantitiesBtn = document.querySelectorAll("#Btn-child2");

console.log(addToCartBtn);
console.log(productQuantitiesBtn);

function addCartQuantityBtn() {
  cartBtnContainer.forEach((container) => {
    container.addEventListener("click", (event) => {
      const cartBtn = event.currentTarget.querySelector("#Btn-child");
      if (cartBtn) cartBtn.classList.add("card2");
    });
  });

  cartBtnContainer.forEach((container) => {
    container.addEventListener("mouseleave", (event) => {
      const cartBtn = event.currentTarget.querySelector("#Btn-child");
      if (cartBtn) cartBtn.classList.remove("card2");
    });
  });
}

/**
 1. give a quantity of 1 to the product cart
 2. craete a cart list that when the add to cart button is click it will grab the closest image, product    quantities and price to do some calculation 
 3. store it in an object and display it on the cart log
 */
const count = 1;

function showQuantities() {
  const productQuantities = document.querySelectorAll("#count-quantity");
  productQuantities.forEach((quantity) => {
    quantity.textContent = count;
  });
}

showQuantities();

// cartBtnContainer.forEach((button) => {
//   button.addEventListener("click", (event) => {
//     const currentButton = event.currentTarget,
//       prodictImage = currentButton.parentNode.querySelector(".cart-img"),
//       productQuantities =
//         currentButton.parentNode.querySelector("#count-quantity");
//     const productName = document.getElementById("product-name");
//     const productPrice = document.getElementById("product-price");

//     console.log(prodictImage ? prodictImage.src : "image not found");
//     console.log(
//       productQuantities ? productQuantities.textContent : "Quantity not found",
//     );
//     console.log(productName ? productName : "Name not found");
//     console.log(productPrice ? productPrice : "Price not found");
//   });
// });
