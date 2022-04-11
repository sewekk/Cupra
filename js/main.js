"use strict";

const hamburger = document.querySelectorAll(".fa-solid");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.forEach((item) => {
  item.addEventListener("click", showMenu);
});

function showMenu() {
  mobileMenu.classList.toggle("mobile-menu--hidden");

  hamburger.forEach((item) => {
    item.classList.toggle("fa-show");
  });
}
