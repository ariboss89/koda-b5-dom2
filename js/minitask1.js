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

function onClick() {
  const hamburger = document.querySelector(".hamb-btn");
  const heroFlat = document.querySelector(".hero-ul");

  const getAtr = window.getComputedStyle(heroFlat);

  hamburger.addEventListener("click", function () {
    getAtr.display == "none"
      ? heroFlat.setAttribute("style", "display:flex")
      : heroFlat.setAttribute("style", "display:none");
  });
}

onClick();
