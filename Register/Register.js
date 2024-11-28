let labelName = document.getElementById("labelName");
let nameInput = document.getElementById("name");
let validName = false;

let labelLastName = document.getElementById("labelLastName");
let lastNameInput = document.getElementById("lastName");
let validLastName = false;

let labelEmail = document.getElementById("labelEmail");
let emailInput = document.getElementById("email");
let validEmail = false;

let labelPassword = document.getElementById("labelPassword");
let passwordInput = document.getElementById("password");
let validPassword = false;

let labelConfirmPassword = document.getElementById("labelConfirmPassword");
let confirmPasswordInput = document.getElementById("confirmPassword");
let validConfirmPassword = false;

let msgError = document.getElementById("msgError");

function shakeElement() {
  const logContainer = document.getElementById("logContainer");

  logContainer.classList.add("shake");

  setTimeout(() => {
    logContainer.classList.remove("shake");
  }, 300);
}

nameInput.addEventListener("keyup", () => {
  if (nameInput.value.length <= 2) {
    labelName.setAttribute("style", "color: red");
    labelName.innerHTML = "Name *put 3 characters";
    nameInput.setAttribute("style", "border: 1px solid red");
    validName = false;
  } else {
    labelName.setAttribute("style", "color: black");
    labelName.innerHTML = "Name";
    nameInput.setAttribute("style", "border: 1px solid black");
    validName = true;
  }
});

lastNameInput.addEventListener("keyup", () => {
  if (lastNameInput.value.length <= 2) {
    labelLastName.setAttribute("style", "color: red");
    labelLastName.innerHTML = "Last Name *put 3 characters";
    lastNameInput.setAttribute("style", "border: 1px solid red");
    validLastName = false;
  } else {
    labelLastName.setAttribute("style", "color: black");
    labelLastName.innerHTML = "Last Name";
    lastNameInput.setAttribute("style", "border: 1px solid black");
    validLastName = true;
  }
});

emailInput.addEventListener("keyup", () => {
  if (!emailInput.value.includes("@")) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = "Email *must contain @";
    emailInput.setAttribute("style", "border: 1px solid red");
    validEmail = false;
  } else {
    labelEmail.setAttribute("style", "color: black");
    labelEmail.innerHTML = "Email";
    emailInput.setAttribute("style", "border: 1px solid black");
    validEmail = true;
  }
});

passwordInput.addEventListener("keyup", () => {
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  if (
    !passwordRegex.test(passwordInput.value) ||
    passwordInput.value.length < 6
  ) {
    labelPassword.setAttribute("style", "color: red");
    labelPassword.innerHTML =
      "Password *at least 6 characters, no special characters";
    passwordInput.setAttribute("style", "border: 1px solid red");
    validPassword = false;
  } else {
    labelPassword.setAttribute("style", "color: black");
    labelPassword.innerHTML = "Password";
    passwordInput.setAttribute("style", "border: 1px solid black");
    validPassword = true;
  }
});

confirmPasswordInput.addEventListener("keyup", () => {
  if (confirmPasswordInput.value !== passwordInput.value) {
    labelConfirmPassword.setAttribute("style", "color: red");
    labelConfirmPassword.innerHTML =
      "Confirm Password *The password does not match";
    confirmPasswordInput.setAttribute("style", "border: 1px solid red");
    validConfirmPassword = false;
  } else {
    labelConfirmPassword.setAttribute("style", "color: black");
    labelConfirmPassword.innerHTML = "Confirm Password";
    confirmPasswordInput.setAttribute("style", "border: 1px solid black");
    validConfirmPassword = true;
  }
});

function Register() {
  if (
    validName &&
    validLastName &&
    validEmail &&
    validPassword &&
    validConfirmPassword
  ) {
    let userList = JSON.parse(localStorage.getItem("userList") || "[]");

    userList.push({
      regName: nameInput.value,
      regLastName: lastNameInput.value,
      regEmail: emailInput.value,
      regPassword: passwordInput.value,
    });

    localStorage.setItem("userList", JSON.stringify(userList));

    msgError.setAttribute("style", "display: none");

    window.location.href = "https://p4gzfq.csb.app/Login/Login.html";
  } else {
    msgError.innerHTML = "Fill in all fields with valid information!";
    msgError.setAttribute("style", "display: block");
    shakeElement();
  }
}
