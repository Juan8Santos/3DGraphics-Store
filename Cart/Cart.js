let logoutButton = document.getElementById("logoutButton");
let navItemAccount = document.querySelector(".nav-item-account");
let register = document.querySelector(".nav-item-register");
let login = document.querySelector(".nav-item-login");
let manege = document.querySelector(".nav-item-manege");
let registerAssets = document.getElementById("registerAssets");
let tBody = document.querySelector("tbody");
let cartTotalValue = document.querySelector(".cartTotalValue");
let cartTotalPurchase = document.querySelector(".cartTotalPurchase");
let sectionEmptyCart = document.querySelector(".sectionEmptyCart");
let main = document.querySelector("main");
let amount = 1;

if (localStorage.getItem("cart") == null) {
  main.setAttribute("style", "display: none");
  sectionEmptyCart.setAttribute("style", "display: flex");
} else {
  main.setAttribute("style", "display: block");
  sectionEmptyCart.setAttribute("style", "display: none");
}

if (localStorage.getItem("token") == null) {
  logoutButton.setAttribute("style", "display: none");
  navItemAccount.setAttribute("style", "display: none");
} else {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  let account = document.querySelector(".account");
  account.innerHTML = `Hello ${loggedUser.userName} <i class="fa-solid fa-user"></i>`;
  register.setAttribute("style", "display: none");
  login.setAttribute("style", "display: none");
  if (loggedUser.userName == "admin") {
    manege.setAttribute("style", "display: block");
  }
}

registerAssets.addEventListener("click", () => {
  window.location.href =
    "https://p4gzfq.csb.app/registerAssets/registerAssets.html";
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("cart");
  window.location.href = "https://p4gzfq.csb.app";
}

function Buy() {
  alert("Congratulations on your purchase!!!");
  localStorage.removeItem("cart");
  window.location.href = "https://p4gzfq.csb.app";
}

function updateCart() {
  tBody.innerHTML = "";
  let totalPurchase = 0;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.forEach((item, i) => {
    let amount = item.amount || 1;
    let ProductValueCart = Number(item.ProductValueCart);
    let FinalValue = ProductValueCart * amount;
    totalPurchase += FinalValue;

    cartTotalValue.innerHTML = "$" + totalPurchase.toFixed(2);
    cartTotalPurchase.innerHTML = "$" + totalPurchase.toFixed(2);

    tBody.innerHTML += `
      <tr iProduct="${i}">
        <td class="cartProduct">
          <img src="${item.ProductImgCart}">
          <div class="cartProductContent">
            <p class="pProductName">${item.ProductNameCart}</p>
            <p class="pDescription">Description: ${
              item.ProductDescriptionCart
            }</p>
            <p class="pArtStyle">Art Style: ${item.ProductArtStyleCart}</p>
          </div>
        </td>
        <td class="cartAmount">
          <i class="fa-solid fa-minus"></i>
          <span>${amount}</span>
          <i class="fa-solid fa-plus"></i>
        </td>
        <td class="cartUnitvalue">$${ProductValueCart.toFixed(2)}</td>
        <td class="cartfinalValue"><strong>$${FinalValue.toFixed(
          2
        )}</strong></td>
        <td class="cartTrash"><i class="fa-solid fa-trash"></i></td>
      </tr>`;
  });

  const removeProductButtons = document.querySelectorAll(".cartTrash");
  removeProductButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const tr = event.target.closest("tr");
      const i = tr.getAttribute("iProduct");
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });
  });

  const reduceQuantityButtons = document.querySelectorAll(".fa-minus");
  reduceQuantityButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const tr = event.target.closest("tr");
      const i = tr.getAttribute("iProduct");
      if (cart[i].amount > 1) {
        cart[i].amount--;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
      }
    });
  });

  const increaseQuantityButtons = document.querySelectorAll(".fa-plus");
  increaseQuantityButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const tr = event.target.closest("tr");
      const i = tr.getAttribute("iProduct");
      cart[i].amount = (cart[i].amount || 1) + 1;
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    });
  });

  if (cart.length === 0) {
    localStorage.removeItem("cart");
    main.setAttribute("style", "display: none");
    sectionEmptyCart.setAttribute("style", "display: flex");
  } else {
    main.setAttribute("style", "display: block");
    sectionEmptyCart.setAttribute("style", "display: none");
  }
}

updateCart();
