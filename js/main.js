"use strict"

window.onload = function () {

  // Открытие и закрытие бургера

  const menu = document.querySelector(".header__menu");

  document.addEventListener("click", function (e) {

    const elementInteractive = e.target;

    if (elementInteractive.closest(".burger")) { // Открытие и закрытие бургера
      menu.classList.add("menu-active")
      document.body.style.overflow = "hidden";
    }
    if (elementInteractive.closest(".header__exit-menu")) { // Открытие и закрытие бургера 
      menu.classList.remove("menu-active")
      document.body.style.overflow = "";
    }
    if (elementInteractive.closest(".nav__link")) { // Открытие и закрытие бургера
      menu.classList.remove("menu-active")
      document.body.style.overflow = "";
    }
    if (elementInteractive.closest(".lessons__button")) {

      if (!elementInteractive.closest(".lessons__button").classList.contains("button-interactive")) {

        elementInteractive.closest(".lessons__button").classList.add("button-interactive");

        elementInteractive.closest(".lessons__item").classList.add("lessons-visible");

        elementInteractive.closest(".lessons__item").querySelector(".lessons__content").style.height = elementInteractive.closest(".lessons__item").querySelector(".lessons__content").scrollHeight + "px";

      } else {

        elementInteractive.closest(".lessons__button").classList.remove("button-interactive");

        elementInteractive.closest(".lessons__item").classList.remove("lessons-visible");

        elementInteractive.closest(".lessons__item").querySelector(".lessons__content").removeAttribute('style');

      }

    }

  })

  // Проверка на поддержку webp

  function testWebP(callback) {
    var webP = new Image();

    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };

    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });

}