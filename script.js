"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

///////////Handle Scrolling

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", function (e) {
  //   const section1Cords = section1.getBoundingClientRect();
  //   //   console.log(section1.clientHeight);
  //   window.scrollTo({
  //     left: section1Cords.left + window.pageXOffset,
  //     top: section1Cords.top + window.pageYOffset,
  //   });
  section1.scrollIntoView({ behavior: "smooth" });
});
///////Handle Nav bar usnig Event Deledation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    console.log("omar");
    document
      .querySelector(e.target.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
});
///////////Handling Tabs using Event Delegate Method
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  clicked.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/////////Handlie Opacity of NAV bar
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    const logo = document.querySelector(".nav__logo");

    const slibings = link.closest("nav").querySelectorAll(".nav__link");
    slibings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector(".nav");

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
const navHeight = nav.getBoundingClientRect().height;

///////Handle Sticky Navbar

const header = document.querySelector(".header");
const navCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const navObserever = new IntersectionObserver(navCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
navObserever.observe(header);

/////////////Handle Releving elements On Scroll
const allSections = document.querySelectorAll(".section");
const sectioncallbak = function (entries, observe) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observe.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectioncallbak, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add("section--hidden");
});
//////////////// Handling Lazy Loading Images
const allImages = document.querySelectorAll("img[data-src]");
console.log(allImages);
const imageCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
  // console.log(entry.target);
};
const imageObserver = new IntersectionObserver(imageCallback, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
allImages.forEach((ima) => imageObserver.observe(ima));
///////////////Handlie Slider

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let currentslide = 0;
let maxSlideNumber = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach((e, i) => {
    e.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
goToSlide(0);
const nextSlide = function () {
  if (currentslide === maxSlideNumber) {
    currentslide = 0;
  } else {
    currentslide++;
  }
  goToSlide(currentslide);
  dotHandling(currentslide);
};
const previousSlide = function () {
  if (currentslide === 0) {
    currentslide = maxSlideNumber;
  } else {
    currentslide--;
  }

  goToSlide(currentslide);
  dotHandling(currentslide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
});
//////////////Handle Slider DOts
const dotsContainer = document.querySelector(".dots");
slides.forEach((_, i) => {
  dotsContainer.insertAdjacentHTML(
    "beforeend",
    `<button class="dots__dot" data-slide= ${i} ></button>`
  );
});
const dots = document.querySelectorAll(".dots__dot");

const dotHandling = function (slide) {
  dots.forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
dotHandling(0);
dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    dotHandling(slide);
    goToSlide(slide);
  }
});
