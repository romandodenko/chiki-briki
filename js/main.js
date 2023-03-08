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

    if (elementInteractive.closest(".wrapper-button__button")) { // Открытие и закрытие бургера
      document.querySelector(".wrapper-form").classList.add("active");
      document.body.style.overflow = "hidden";
    }
    if (elementInteractive.closest(".wrapper-form__close")) { // Открытие и закрытие бургера
      document.querySelector(".wrapper-form").classList.remove("active");
      document.querySelector(".wrapper-form").classList.remove("change-el");
      document.body.style.overflow = "";
    }
    if (elementInteractive.closest(".wrapper-form__exit")) { // Открытие и закрытие бургера
      document.querySelector(".wrapper-form").classList.remove("active");
      document.querySelector(".wrapper-form").classList.remove("change-el");
      document.body.style.overflow = "";
    }
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

  // Скрипт для того чтобы дать дисплей блок видео

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

  // Валидация

  const validator = new JustValidate('.form', { // можно использовать классы вместо ид

    errorLabelStyle: { // Стили для ошибки
      color: '#F13F58',
    }

  });

  validator
    .addField('#name', [{ // можно использовать классы вместо ид
        rule: 'required',
        errorMessage: 'Введите ваше имя!',
      },
      {
        rule: 'minLength',
        value: 1,
        errorMessage: 'Минимальное количество букв - 1!',
      },
    ])
    .addField('#email', [{ // можно использовать классы вместо ид
        rule: 'required',
        errorMessage: 'Введите вашу почту!',
      },

      {
        rule: 'email',
        errorMessage: 'Почта введена не правильно!',
      },
    ])
    .onSuccess((event) => { // Если форма проходит валидацию то происходит код ниже
      const form = document.querySelector(".form"); // форма
      // const requestUrl = "https://jsonplaceholder.typicode.com/users"; Когда будешь делать и если вдруг что-то не так пойдет, то вставишь эту ссылку, чтобы проверить работает всё или нет
      const requestUrl = "../send.php"; // Для проверки работает всё или нет, выступает в качестве сервера

      function sendRequest(method, url, body = null) {
        const headers = {
          'Content-Type': 'application/json',
        };

        return fetch(url, {
          method: method,
          body: JSON.stringify(body),
          headers: headers,
        }).then(response => {
          if (response.ok) {
            return response.json()
          } else {
            console.log("Ошибка")
          }
        })

      }

      const body = { // то что передается
        userName: form.querySelector(".name-input").value,
        userEmail: form.querySelector(".email-input").value,
        userCommentary: form.querySelector(".commentary").value,
      }

      sendRequest("POST", requestUrl, body)
        .then(data => console.log(data))
        .catch(err => console.log(err))

      document.body.style.overflow = "";

      document.querySelector(".wrapper-form").classList.add("change-el");

      form.querySelectorAll(".form__input").forEach(function (e) {
        e.value = "";
      });

      form.querySelector(".form__textarea").value = "";

    })

}