"use strict"

window.onload = function () {

  // Даём id всем урокам ( lessons__item )

  document.querySelectorAll(".lessons__item").forEach(function (e, i) {

    let index = i + 1;

    e.setAttribute("id", `lesson-item-${index}`);

  })

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
    if (elementInteractive.closest(".lessons__button")) { // открытие и закрытие элементов

      if (!elementInteractive.closest(".lessons__button").classList.contains("button-interactive")) {

        document.querySelectorAll(".lessons__button").forEach(function (e) {
          e.removeAttribute("href")
        })

        elementInteractive.closest(".lessons__button").classList.add("button-interactive");

        elementInteractive.closest(".lessons__item").classList.add("lessons-visible");

        elementInteractive.closest(".lessons__item").querySelector(".lessons__content").style.height = elementInteractive.closest(".lessons__item").querySelector(".lessons__content").scrollHeight + "px";

      } else {

        let nextElement = elementInteractive.closest(".lessons__item").nextElementSibling;

        if (nextElement) {

          let nextElementId = nextElement.getAttribute("id");

          elementInteractive.closest(".lessons__button").setAttribute("href", `#${nextElementId}`);

        } else {

          let nextElementIds = elementInteractive.closest(".lessons__item").getAttribute("id");

          elementInteractive.closest(".lessons__button").setAttribute("href", `#${nextElementIds}`);
        }

        elementInteractive.closest(".lessons__button").classList.remove("button-interactive");

        elementInteractive.closest(".lessons__item").classList.remove("lessons-visible");

        elementInteractive.closest(".lessons__item").querySelector(".lessons__content").removeAttribute('style');

      }

    }
    if (elementInteractive.closest(".lessons__video")) { // взаимодействие с видео

      elementInteractive.closest(".lessons__video").classList.add("video-play");

      let lessonsVideo = elementInteractive.closest(".lessons__video").querySelector(".lessons__video video");

      lessonsVideo.setAttribute("controls", "controls");

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

  // Плавный скролл к якорям

  const links = document.querySelectorAll('.link-anchor[href^="#"]');
  // добавляем обработчик события на каждую ссылку
  links.forEach(link => {
    link.addEventListener('click', function (event) {
      // отменяем стандартное поведение ссылки
      event.preventDefault();

      // получаем id элемента, на который ссылается якорь
      const id = this.getAttribute('href').substring(1);

      // находим элемент на странице по id
      const element = document.getElementById(id);

      // вычисляем координаты элемента на странице
      const top = element.getBoundingClientRect().top + window.pageYOffset;

      // запускаем анимацию скролла к элементу
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });

  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        if (entry.target.querySelector(".lessons__video video")) {
          entry.target.querySelector(".lessons__video video").style.display = "block";
        }
      }
    })
  }, {
    threshold: 0,
  })

  document.querySelectorAll(".lessons__item").forEach(function (e) {
    observer.observe(e)
  })

}