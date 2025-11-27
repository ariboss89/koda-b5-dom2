const myForm = document.querySelector("form");

const username = document.querySelector("input[name='username']");
const password = document.querySelector("input[name='password']");
const eyeClicked = document.querySelector("#eyeClick");

eyeClicked.addEventListener("click", function () {
  const checkAtr = password.getAttribute("type");

  if (checkAtr == "password") {
    password.setAttribute("type", "text");
    eyeClicked.setAttribute("src", "/icons/eye-slash.png");
  } else {
    password.setAttribute("type", "password");
    eyeClicked.setAttribute("src", "/icons/eye.png");
  }
});

myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const pwdSpan = document.getElementById("pwdvalid");
  const userSpan = document.getElementById("uservalid");

  if (username.value === "" || password.value === "") {
    pwdSpan.style.display = "block";
    userSpan.style.display = "block";
    userSpan.innerHTML = "Username tidak boleh kosong !!";
    pwdSpan.innerHTML = "Password tidak boleh kosong !!";
  } else if (username.value == "admin" && password.value == "123456") {
    localStorage.setItem("user", username.value);
    localStorage.setItem("pasw", password.value);
    location.href = "/views/pokemon.html";
  } else if (password.value.length < 5) {
    pwdSpan.style.display = "block";
    userSpan.style.display = "none";
    pwdSpan.innerHTML = "Password tidak boleh kurang dari 5 !!";
  } else {
    pwdSpan.style.display = "block";
    userSpan.style.display = "block";
    pwdSpan.innerHTML = "Password tidak boleh kurang dari 5 !!";
  }
});

function check() {
  const user = localStorage.getItem("user");
  const psw = localStorage.getItem("pasw");

  if (user != null && psw != null) {
    location.replace("/views/pokemon.html");
  }
}

check();
