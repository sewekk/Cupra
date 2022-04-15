"use strict";

//variables
const hamburger = document.querySelectorAll(".hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");
const carouselArticles = document.querySelectorAll(".carousel-section__car");
const carouselPrevBtn = document.querySelector(".prev-btn");
const carouselNextBtn = document.querySelector(".next-btn");
let CarouselLeftStartedValue = -100;
let counter = 3;
const nextSlideButtons = document.querySelectorAll(".next-slide");
const prevSlideButtons = document.querySelectorAll(".prev-slide");

const desktopViewport = window.matchMedia("screen and (min-width:990px)");

//Event Listners
hamburger.forEach((item) => {
  item.addEventListener("click", showMenu);
});

carouselPrevBtn.addEventListener("click", () => {
  counter--;
  if (counter === 0) {
    counter = 1;
    return;
  }

  carousel("+");
  if (window.innerWidth < 990) showOrHideInformation(false);
});

carouselNextBtn.addEventListener("click", () => {
  counter++;
  if (counter === 7) {
    counter = 6;
    return;
  }

  carousel("-");
  if (window.innerWidth < 990) {
    showOrHideInformation(false);
  }
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

//setting carousel start values
carouselArticles.forEach((item) => {
  if (CarouselLeftStartedValue === 10) {
    item.style.opacity = `100%`;
  } else {
    hideInformation(item);
  }
  item.style.left = `${CarouselLeftStartedValue}%`;
  CarouselLeftStartedValue += 55;
});

//carousel mechanism
function carousel(operator) {
  carouselArticles.forEach((item) => {
    let leftValue = parseInt(item.style.left);

    if (leftValue === 10) {
      item.style.opacity = "50%";
      hideInformation(item);
    }

    if (operator === "+") {
      leftValue += 55;
    } else {
      leftValue -= 55;
    }

    item.style.left = `${leftValue}%`;

    if (leftValue === 10) {
      item.style.opacity = "100%";
      showCarInformation(item);
    }
  });
}

function hideInformation(item) {
  if (item.style.left === "10%") return;
  item.children[2].style.display = "none";
  item.children[3].style.display = "none";
  item.children[4].style.display = "none";
}

function showCarInformation(item) {
  item.children[2].style.display = "block";
  item.children[3].style.display = "flex";
  item.children[4].style.display = "block";
}

function showOrHideInformation(isDesktop) {
  console.log(isDesktop);
  if (isDesktop) {
    carouselArticles.forEach((item) => {
      showCarInformation(item);
    });
  } else {
    carouselArticles.forEach((item) => {
      hideInformation(item);
    });
  }
}

//hamburger menu mechanism
function showMenu() {
  mobileMenu.classList.toggle("mobile-menu--hidden");

  hamburger.forEach((item) => {
    item.classList.toggle("fa-show");
  });
}

//Viewport for carousel
showOrHideInformation(desktopViewport.matches);

desktopViewport.addListener((isDesktop) => {
  showOrHideInformation(isDesktop.matches);
});

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
