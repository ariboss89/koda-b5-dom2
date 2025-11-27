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
  const hamburger = document.querySelector(".ham-btn");
  const nav = document.querySelector(".nav-hero");

  const getAtr = window.getComputedStyle(nav);
  console.log(window.innerWidth, "aaaaaadda");

  hamburger.addEventListener("click", function () {
    getAtr.display == "none"
      ? nav.setAttribute("style", "display:flex")
      : nav.setAttribute("style", "display:none");

    //console.log(getAtr.display);

    // window.innerWidth < 768
    //   ? nav.setAttribute("style", "display:none")
    //   : nav.setAttribute("style", "display:flex");
  });
}

onClick();
//document.addEventListener("DOMContentLoaded", onclick);
