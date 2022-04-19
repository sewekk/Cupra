"use strict";

//variables
const hamburger = document.querySelectorAll(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const nextSlideButtons = document.querySelectorAll(".next-slide");
const prevSlideButtons = document.querySelectorAll(".prev-slide");
const selectedItem = document.getElementById("selected");
const selectedImg = document.querySelector(".item__img--selected");
const selectedName = document.querySelector(".item__name--selected");
const dropDownItems = document.querySelectorAll(".dropdown__item");
const DropDownArrow = document.querySelector(".fa-angle-down");
let dropDownOpen = false;
let counter = 3;
const desktopViewport = window.matchMedia("screen and (min-width:990px)");

//Event Listners
hamburger.forEach((item) => {
  item.addEventListener("click", showMenu);
});

nextSlideButtons.forEach((item) => {
  item.addEventListener("click", (e) => {
    nextSlide(e);
  });
});

prevSlideButtons.forEach((item) => {
  item.addEventListener("click", (item) => {
    prevSlide(item);
  });
});

selectedItem.addEventListener("click", (e) => {
  const dropDownContainer = e.currentTarget.parentNode.parentNode;
  dropDown(dropDownContainer);
});

dropDownItems.forEach((item, index) => {
  if (index > 0) {
    item.addEventListener("click", (event) => {
      changeDropDownValue(event);
    });
  }
});

//hamburger menu mechanism
function showMenu() {
  mobileMenu.classList.toggle("mobile-menu--hidden");

  hamburger.forEach((item) => {
    item.classList.toggle("fa-show");
  });
}

//slider by slidedjs and jquery
$(document).ready(function () {
  $(".slider__container").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    prevArrow: "",
    nextArrow: ".slider-next-btn",
    dotsClass: "dots-container",
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  });
});

//slider for images section
function nextSlide({ currentTarget }) {
  const ParentElement = currentTarget.parentNode;
  const images = [...ParentElement.querySelectorAll(".img-slider__img")];

  for (let [index, element] of images.entries()) {
    if (element.classList.contains("active")) {
      if (index === images.length - 1) {
        element.classList.remove("active");
        images[0].classList.add("active");
        break;
      }
      element.classList.remove("active");
      images[index + 1].classList.add("active");
      break;
    }
  }
}

function prevSlide({ currentTarget }) {
  const ParentElement = currentTarget.parentNode;
  const images = [...ParentElement.querySelectorAll(".img-slider__img")];

  for (let [index, element] of images.entries()) {
    if (element.classList.contains("active")) {
      if (index === 0) {
        element.classList.remove("active");
        images[images.length - 1].classList.add("active");
        break;
      }
      element.classList.remove("active");
      images[index - 1].classList.add("active");
      break;
    }
  }
}

//dropDown mechanism
function dropDown(dropDownContainer) {
  if (!dropDownOpen) {
    dropDownContainer.style.marginBottom = `${
      (dropDownItems.length - 1) * 145 + 20
    }px`;

    dropDownOpen = true;
  } else {
    dropDownContainer.style.marginBottom = "20px";
    dropDownOpen = false;
  }

  DropDownArrow.classList.toggle("fa-angle-down--active");

  dropDownItems.forEach((item) => {
    item.classList.toggle("item--active");
  });
}

function changeDropDownValue({ currentTarget }) {
  const dropDownContainer = currentTarget.parentNode.parentNode;
  const newImg = currentTarget.querySelector("img").src;
  const newName = currentTarget.querySelector("p").textContent;

  selectedImg.src = `${newImg}`;
  selectedName.textContent = newName;

  dropDown(dropDownContainer);
}

//carousel mechanism

$(".carousel-section__slider").slick({
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: true,
  prevArrow: ".carousel-section__prevBtn",
  nextArrow: ".carousel-section__nextBtn",
});
