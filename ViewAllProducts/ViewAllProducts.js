let logoutButton = document.getElementById("logoutButton");
let navItemAccount = document.querySelector(".nav-item-account");
let register = document.querySelector(".nav-item-register");
let login = document.querySelector(".nav-item-login");
let manege = document.querySelector(".nav-item-manege");
let registerAssets = document.getElementById("registerAssets");
let containerProducts = document.querySelector(".products");
let freeProducts = document.querySelector(".freeProducts");
let realisticProducts = document.querySelector(".realisticProducts");
let cartoonProducts = document.querySelector(".cartoonProducts");
let cart = document.querySelector(".nav-item-cart");

if (localStorage.getItem("token") == null) {
  logoutButton.setAttribute("style", "display: none");
  navItemAccount.setAttribute("style", "display: none");
  cart.setAttribute("style", "display: none");
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

function initiateStore() {
  let products = JSON.parse(localStorage.getItem("productStorage")) || [];

  containerProducts.innerHTML = products
    .map(
      (item) => `
      <div class="exProduct1 current-item">
        <img src="${item[4]}" />
        <div class="contentProduct1">
          <div class="descriptionProduct1">
            <h3>${item[0]}</h3>
            <p class="description">${item[2]}</p>
            <p class="artStyle">${item[3]}</p>
          </div>
          <div class="productValor1">
            <h3><span>${item[1]}</span>$</h3>
          </div>
        </div>
        <li>
          <button class="buttonAddToCart">Add to Cart</button>
        </li>
      </div>`
    )
    .join("");

  freeProducts.innerHTML = products
    .filter((item) => item[1] == "0")
    .map(
      (item) => `
      <div class="exProduct1Free current-item-free">
        <img src="${item[4]}" />
        <div class="contentProduct1">
          <div class="descriptionProduct1">
            <h3>${item[0]}</h3>
            <p class="description">${item[2]}</p>
            <p class="artStyle">${item[3]}</p>
          </div>
          <div class="productValor1">
            <h3><span>${item[1]}</span>$</h3>
          </div>
        </div>
        <li>
          <button class="buttonAddToCart">Add to Cart</button>
        </li>
      </div>`
    )
    .join("");

  realisticProducts.innerHTML = products
    .filter((item) => item[3] == "Realistic")
    .map(
      (item) => `
      <div class="exProduct1Realistic current-item-realistic">
        <img src="${item[4]}" />
        <div class="contentProduct1">
          <div class="descriptionProduct1">
            <h3>${item[0]}</h3>
            <p class="description">${item[2]}</p>
            <p class="artStyle">${item[3]}</p>
          </div>
          <div class="productValor1">
            <h3><span>${item[1]}</span>$</h3>
          </div>
        </div>
        <li>
          <button class="buttonAddToCart">Add to Cart</button>
        </li>
      </div>`
    )
    .join("");

  cartoonProducts.innerHTML = products
    .filter((item) => item[3] == "Cartoon")
    .map(
      (item) => `
      <div class="exProduct1Cartoon">
        <img src="${item[4]}" />
        <div class="contentProduct1">
          <div class="descriptionProduct1">
            <h3>${item[0]}</h3>
            <p class="description">${item[2]}</p>
            <p class="artStyle">${item[3]}</p>
          </div>
          <div class="productValor1">
            <h3><span>${item[1]}</span>$</h3>
          </div>
        </div>
        <li>
          <button class="buttonAddToCart">Add to Cart</button>
        </li>
      </div>`
    )
    .join("");

  const buttonsAddToCart = document.querySelectorAll(".buttonAddToCart");
  buttonsAddToCart.forEach((button) => {
    button.addEventListener("click", addProductToCart);
  });
}

function addProductToCart(event) {
  const button = event.target;
  const productsInfos = button.parentElement.parentElement;
  const ProductImg = productsInfos.querySelector("img").src;
  const ProductName = productsInfos.querySelector("h3").innerHTML;
  const ProductDescription =
    productsInfos.querySelector(".description").innerHTML;
  const ProductArtStyle = productsInfos.querySelector(".artStyle").innerHTML;
  const ProductValue = productsInfos.querySelector("span").innerHTML;

  let ProductToCart = {
    ProductImgCart: ProductImg,
    ProductNameCart: ProductName,
    ProductDescriptionCart: ProductDescription,
    ProductArtStyleCart: ProductArtStyle,
    ProductValueCart: ProductValue,
  };

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const verificationCart = cart.some(
    (item) =>
      item.ProductImgCart === ProductToCart.ProductImgCart &&
      item.ProductNameCart === ProductToCart.ProductNameCart &&
      item.ProductDescriptionCart === ProductToCart.ProductDescriptionCart &&
      item.ProductArtStyleCart === ProductToCart.ProductArtStyleCart &&
      item.ProductValueCart === ProductToCart.ProductValueCart
  );

  if (verificationCart) {
    alert("This product is already in the cart!");
  } else {
    cart.push(ProductToCart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

initiateStore();

function setupCarousel(controlSelector, itemSelector, itemsPerView) {
  const controls = document.querySelectorAll(controlSelector);
  const items = document.querySelectorAll(itemSelector);
  const maxItems = items.length;
  let currentItem = 0;

  controls.forEach((control) => {
    control.addEventListener("click", (e) => {
      e.preventDefault();
      const isLeft = e.target.classList.contains("fa-arrow-left");

      currentItem = isLeft ? currentItem - 1 : currentItem + 1;

      if (currentItem > maxItems - itemsPerView) {
        currentItem = maxItems - itemsPerView;
      }
      if (currentItem < 0) {
        currentItem = 0;
      }

      items.forEach((item) => item.classList.remove("current-item"));

      items[currentItem].scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });

      items[currentItem].classList.add("current-item");
      console.log(`Current item index: ${currentItem}`);
    });
  });
}

setupCarousel(".control", ".exProduct1", 14);
setupCarousel(".controlFree", ".exProduct1Free", 9);
setupCarousel(".controlrealistic", ".exProduct1Realistic", 6);
setupCarousel(".controlCartoon", ".exProduct1Cartoon", 9);

console.log("teste");
