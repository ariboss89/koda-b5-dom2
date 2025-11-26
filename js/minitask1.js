const pwd = document.querySelector("#pwd");
console.log(pwd, "apaa");
pwd.addEventListener("click", function () {
  const test = pwd.getAttribute("type");
  if (test == "password") {
    pwd.setAttribute("type", "text");
    pwd.setAttribute("class", "pasw eye-slash");
  } else {
    pwd.setAttribute("type", "password");
    pwd.setAttribute("class", "pasw eye");
  }
});
