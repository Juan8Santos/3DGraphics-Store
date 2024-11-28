let logoutButton = document.getElementById("logoutButton");
let navItemAccount = document.querySelector(".nav-item-account");
let register = document.querySelector(".nav-item-register");
let login = document.querySelector(".nav-item-login");
let tBody = document.querySelector("tbody");
let registerAssets = document.getElementById("registerAssets");
let main = document.querySelector("main");
let sectionEmptyCart = document.querySelector(".sectionEmptyCart");

if (localStorage.getItem("token") == null) {
  logoutButton.setAttribute("style", "display: none");
  navItemAccount.setAttribute("style", "display: none");
} else {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  let account = document.querySelector(".account");
  account.innerHTML = `Hello ${loggedUser.userName} <i class="fa-solid fa-user"></i>`;
  register.setAttribute("style", "display: none");
  login.setAttribute("style", "display: none");
}

registerAssets.addEventListener("click", () => {
  if (localStorage.getItem("token") == null) {
    window.location.href = "https://p4gzfq.csb.app/Login/Login.html";
  } else {
    window.location.href =
      "https://p4gzfq.csb.app/registerAssets/registerAssets.html";
  }
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  window.location.href = "https://p4gzfq.csb.app";
}

function returnToTop() {
  window.location.href = "#logo";
}

function updateProducts() {
  tBody.innerHTML = "";

  let productStorage = JSON.parse(localStorage.getItem("productStorage")) || [];

  productStorage.forEach((item, i) => {
    tBody.innerHTML += `
    <tr iProduct="${i}">
    <td class="cartProduct">
      <img src="${item[4]}">
      <div class="cartProductContent">
        <p class="pProductName">${item[0]}</p>
        <p class="pDescription">Description: ${item[2]}</p>
        <p class="pArtStyle">Art Style: ${item[3]}</p>
      </div>
    </td>
    <td class="cartUnitvalue">$${item[1]}</td>
    <td class="cartTrash"><i class="fa-solid fa-trash"></i></td>
  </tr>
  
  `;
  });

  const removeProductButtons = document.querySelectorAll(".cartTrash");
  removeProductButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const tr = event.target.closest("tr");
      const i = tr.getAttribute("iProduct");
      productStorage.splice(i, 1);
      localStorage.setItem("productStorage", JSON.stringify(productStorage));
      updateProducts();
    });
  });

  if (productStorage.length == 0) {
    main.setAttribute("style", "display: none");
    sectionEmptyCart.setAttribute("style", "display: flex");
  } else {
    main.setAttribute("style", "display: block");
    sectionEmptyCart.setAttribute("style", "display: none");
  }
}

function clearAll() {
  localStorage.setItem("productStorage", JSON.stringify([]));
  updateProducts();
}

updateProducts();
