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

function iniciateStore() {
  let products = [];
  products = JSON.parse(localStorage.getItem("productStorage"));

  products.map((item) => {
    containerProducts.innerHTML +=
      `
    
    <div class="exProduct1 current-item">
    <img src="` +
      item[4] +
      `"/>
    <div class="contentProduct1">
      <div class="descriptionProduct1">
        <h3>` +
      item[0] +
      `</h3>
        <p class="description">` +
      item[2] +
      `</p>
      <p class="artStyle">` +
      item[3] +
      `</p>
      </div>
      <div class="productValor1">
        <h3><span>` +
      item[1] +
      `</span>$</h3>
      </div>
    </div>
    <li>
      <button class="buttonAddToCart" onclick="addToCartButton()">Add to Cart</button>
    </li>
  </div>
    
    `;

    if (item[1] === "0") {
      freeProducts.innerHTML +=
        `
      
      <div class="exProduct1Free current-item-free">
      <img src="` +
        item[4] +
        `"/>
      <div class="contentProduct1">
        <div class="descriptionProduct1">
          <h3>` +
        item[0] +
        `</h3>
          <p class="description">` +
        item[2] +
        `</p>
        <p class="artStyle">` +
        item[3] +
        `</p>
        </div>
        <div class="productValor1">
          <h3><span>` +
        item[1] +
        `</span>$</h3>
        </div>
      </div>
      <li>
        <button class="buttonAddToCart" onclick="addToCartButton()">Add to Cart</button>
      </li>
    </div>
      
      `;
    }

    if (item[3] === "Realistic") {
      realisticProducts.innerHTML +=
        `
        
        <div class="exProduct1Realistic current-item-realistic">
        <img src="` +
        item[4] +
        `"/>
        <div class="contentProduct1">
          <div class="descriptionProduct1">
            <h3>` +
        item[0] +
        `</h3>
            <p class="description">` +
        item[2] +
        `</p>
          <p class="artStyle">` +
        item[3] +
        `</p>
          </div>
          <div class="productValor1">
            <h3><span>` +
        item[1] +
        `</span>$</h3>
          </div>
        </div>
        <li>
          <button class="buttonAddToCart" onclick="addToCartButton()">Add to Cart</button>
        </li>
      </div>
        
        `;
    }

    if (item[3] === "Cartoon") {
      cartoonProducts.innerHTML +=
        `
          
          <div class="exProduct1">
          <img src="` +
        item[4] +
        `"/>
          <div class="contentProduct1">
            <div class="descriptionProduct1">
              <h3>` +
        item[0] +
        `</h3>
              <p class="description">` +
        item[2] +
        `</p>
            <p class="artStyle">` +
        item[3] +
        `</p>
            </div>
            <div class="productValor1">
              <h3><span>` +
        item[1] +
        `</span>$</h3>
            </div>
          </div>
          <li>
            <button class="buttonAddToCart" onclick="addToCartButton()">Add to Cart</button>
          </li>
        </div>
          
          `;
    }
  });

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

iniciateStore();

const controls = document.querySelectorAll(".control");
let currentItem = 0;
const exProduct1 = document.querySelectorAll(".exProduct1");
const maxexProduct1 = exProduct1.length;

controls.forEach((control) => {
  control.addEventListener("click", (e) => {
    e.preventDefault();
    isLeft = e.target.classList.contains("fa-arrow-left");

    if (isLeft) {
      currentItem -= 1;
    } else {
      currentItem += 1;
    }

    if (currentItem >= maxexProduct1 - 7) {
      currentItem = 0;
    }

    if (currentItem < 0) {
      currentItem = maxexProduct1 - 6;
    }

    exProduct1.forEach((item) => item.classList.remove("current-item"));

    exProduct1[currentItem].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });

    exProduct1[currentItem].classList.add("current-item");
  });
});

const controlFree = document.querySelectorAll(".controlFree");
let currentItemFree = 0;
const exProduct1Free = document.querySelectorAll(".exProduct1Free");
const maxexProduct1Free = exProduct1Free.length;

controlFree.forEach((controlFree) => {
  controlFree.addEventListener("click", (e) => {
    isLeft = e.target.classList.contains("fa-arrow-left");

    if (isLeft) {
      currentItemFree -= 1;
    } else {
      currentItemFree += 1;
    }

    if (currentItemFree >= maxexProduct1Free - 7) {
      currentItemFree = 0;
    }

    if (currentItemFree < 0) {
      currentItemFree = maxexProduct1Free - 6;
    }

    exProduct1Free.forEach((item) =>
      item.classList.remove("current-item-free")
    );

    exProduct1Free[currentItemFree].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });

    exProduct1Free[currentItemFree].classList.add("current-item-free");
  });
});

const controlRealistic = document.querySelectorAll(".controlrealistic");
let currentItemRealistic = 0;
const exProduct1Realistic = document.querySelectorAll(".exProduct1Realistic");
const maxexProduct1Realistic = exProduct1Realistic.length;

controlRealistic.forEach((controlRealistic) => {
  controlRealistic.addEventListener("click", (e) => {
    e.preventDefault();
    isLeft = e.target.classList.contains("fa-arrow-left");

    if (isLeft) {
      currentItemRealistic -= 1;
    } else {
      currentItemRealistic += 1;
    }

    if (currentItemRealistic >= maxexProduct1Realistic - 7) {
      currentItemRealistic = 0;
    }

    if (currentItemRealistic < 0) {
      currentItemRealistic = maxexProduct1Realistic - 6;
    }

    exProduct1Realistic.forEach((item) =>
      item.classList.remove("current-item-realistic")
    );

    exProduct1Realistic[currentItemRealistic].scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });

    exProduct1Realistic[currentItemRealistic].classList.add(
      "current-item-realistic"
    );
  });
});
