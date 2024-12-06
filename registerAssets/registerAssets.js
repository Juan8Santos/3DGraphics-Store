let logoutButton = document.getElementById("logoutButton");
let navItemAccount = document.querySelector(".nav-item-account");
let register = document.querySelector(".nav-item-register");
let login = document.querySelector(".nav-item-login");
let manege = document.querySelector(".nav-item-manege");

let errorMsg = document.getElementById("errorMsg");
let labelPicture = document.getElementById("labelPicture");

let labelProductName = document.getElementById("labelProductName");
let inputProductName = document.getElementById("inputProductName");
let validProductName = false;

let labelValue = document.getElementById("labelValue");
let inputValue = document.getElementById("inputValue");
let validValue = false;

let labelDescription = document.getElementById("labelDescription");
let inputDescription = document.getElementById("inputDescription");
let validDescription = false;

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

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("loggedUser");
  window.location.href = "https://p4gzfq.csb.app";
}

const inputPicture = document.querySelector("#inputPicture");
const pictureImg = document.querySelector(".spanInput");
let img;

function compressImage(file, callback) {
  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const MAX_WIDTH = 600;
      const MAX_HEIGHT = 600;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
      callback(compressedDataUrl);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

inputPicture.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    compressImage(file, (compressedDataUrl) => {
      img = document.createElement("img");
      img.src = compressedDataUrl;
      img.classList.add("pictureImg");

      pictureImg.innerHTML = "";
      pictureImg.appendChild(img);
    });
  }
});

inputProductName.addEventListener("keyup", () => {
  if (inputProductName.value.length <= 2) {
    labelProductName.setAttribute("style", "color: red");
    labelProductName.innerHTML =
      "<strong>Product Name</strong> *put 3 characters!";
    inputProductName.setAttribute("style", "border: 1px solid red");
    validProductName = false;
  } else {
    labelProductName.setAttribute("style", "color: black");
    labelProductName.innerHTML = "<strong>Product Name</strong>";
    inputProductName.setAttribute("style", "border: 1px solid black");
    validProductName = true;
  }
});

inputValue.addEventListener("keyup", () => {
  if (inputValue.value < 0) {
    labelValue.setAttribute("style", "color: red");
    labelValue.innerHTML =
      "<strong>Value</strong> *The value cannot be negative!";
    inputValue.setAttribute("style", "border: 1px solid red");
    validValue = false;
  } else {
    labelValue.setAttribute("style", "color: black");
    labelValue.innerHTML = "<strong>Value</strong>";
    inputValue.setAttribute("style", "border: 1px solid black");
    validValue = true;
  }
});

inputDescription.addEventListener("keyup", () => {
  if (inputDescription.value.length >= 30) {
    labelDescription.setAttribute("style", "color: red");
    labelDescription.innerHTML =
      "<strong>Description</strong> *Description too long!";
    inputDescription.setAttribute("style", "border: 1px solid red");
    validDescription = false;
  } else if (inputDescription.value == "") {
    labelDescription.setAttribute("style", "color: red");
    labelDescription.innerHTML =
      "<strong>Description</strong> *Fill in this field!";
    inputDescription.setAttribute("style", "border: 1px solid red");
    validDescription = false;
  } else {
    labelDescription.setAttribute("style", "color: black");
    labelDescription.innerHTML = "<strong>Description</strong>";
    inputDescription.setAttribute("style", "1px solid black");
    validDescription = true;
  }
});

function registerAssets() {
  const inputRadio = document.querySelector('input[name="Art Style"]:checked');

  if (!validProductName || !validValue || !validDescription) {
    errorMsg.innerHTML = "*Some of the fields are not filled in correctly!";
    errorMsg.setAttribute("style", "color: red");

    if (inputProductName.value == "") {
      labelProductName.setAttribute("style", "color: red");
      labelProductName.innerHTML =
        "<strong>Product Name</strong> *fill in this field!";
      inputProductName.setAttribute("style", "border: 1px solid red");
    }

    if (inputValue.value == "") {
      labelValue.setAttribute("style", "color: red");
      labelValue.innerHTML = "<strong>Value</strong> *fill in this field!";
      inputValue.setAttribute("style", "border: 1px solid red");
    }

    if (inputDescription.value == "") {
      labelDescription.setAttribute("style", "color: red");
      labelDescription.innerHTML =
        "<strong>Description</strong> *Fill in this field!";
      inputDescription.setAttribute("style", "border: 1px solid red");
    }
  } else if (validProductName && validValue && validDescription && img) {
    errorMsg.innerHTML = "";

    class productConstructor {
      constructor(
        productName,
        productValue,
        productDescription,
        productArtStyle,
        productImage
      ) {
        this.productName = productName;
        this.productValue = productValue;
        this.productDescription = productDescription;
        this.productArtStyle = productArtStyle;
        this.productImage = productImage;
      }
    }

    const product = new productConstructor(
      inputProductName.value,
      inputValue.value,
      inputDescription.value,
      inputRadio.value,
      img.src
    );

    let arrayProduct = Object.values(product);

    let productStorage = JSON.parse(
      localStorage.getItem("productStorage") || "[]"
    );

    productStorage.push(arrayProduct);

    localStorage.setItem("productStorage", JSON.stringify(productStorage));
    window.location.href = "https://p4gzfq.csb.app";
  } else {
    errorMsg.innerHTML = "*Image missing!";
    errorMsg.setAttribute("style", "color: red");
    labelPicture.setAttribute("style", "border: red dashed 2px");
  }
}
