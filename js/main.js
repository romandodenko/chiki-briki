"use strict"

window.onload = function () {


  document.addEventListener("click", function (e) {
    const elementInteractive = e.target;

    if (elementInteractive.closest(".popup__btn")) {
      document.querySelector(".popup").classList.remove("popup-active")
    }
    if (!elementInteractive.closest(".popup__body")) {
      document.querySelector(".popup").classList.remove("popup-active")
    }
  })

  const popup = document.querySelector(".popup");

  if (popup) {
    let popupTimer, timeOut = 4000;

    function displayPopup() {
      popup.classList.add("popup-active")
    }

    popupTimer = setTimeout(displayPopup, timeOut);

    window.addEventListener("scroll", function (e) {
      clearTimeout(popupTimer);
      popupTimer = setTimeout(displayPopup, timeOut);
    })
  };

  const headerSliderInit = document.querySelector(".header-slider");

  if (headerSliderInit) {
    const headerSlider = new Swiper('.header-slider', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: "auto",
      spaceBetween: 0,
      direction: 'horizontal',
      grid: {
        rows: 2,
      },
      breakpoints: {
        320: {
          grid: {
            rows: 1,
          },
        },
        601: {
          grid: {
            rows: 2,
          },
        }
      },
    });
  }

  if (document.body.clientWidth <= 600) {
    const accordionItems = document.querySelectorAll('.cas-item__payment-bottom')
    const accordionCasInit = document.querySelector(".cas-item__payment-bottom");
    if (accordionCasInit) {
      if (accordionItems.length > 0) {
        accordionItems.forEach((item) => {
          const accordionHeader = item.querySelector('.cas-item__payment-btn')

          accordionHeader.addEventListener('click', () => {

            const openItem = document.querySelector('.accordion-open')

            toggleItem(item)

            if (openItem && openItem !== item) {
              toggleItem(openItem)
            }
          })
        })
      }
      const toggleItem = (item) => {
        const accordionContent = item.querySelector('.cas-item__payment-list')

        if (item.classList.contains('accordion-open')) {
          accordionContent.removeAttribute('style')
          item.classList.remove('accordion-open')
        } else {
          accordionContent.style.height = accordionContent.scrollHeight + 'px'
          item.classList.add('accordion-open')
        }
      }
    }

  };

  function DynamicAdapt(type) {
    this.type = type;
  }

  DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");

    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      const data = node.dataset.da.trim();
      const dataArray = data.split(",");
      const оbject = {};
      оbject.element = node;
      оbject.parent = node.parentNode;
      оbject.destination = document.querySelector(dataArray[0].trim());
      оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
      оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.оbjects.push(оbject);
    }

    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
      return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
      const media = this.mediaQueries[i];
      const mediaSplit = String.prototype.split.call(media, ',');
      const matchMedia = window.matchMedia(mediaSplit[0]);
      const mediaBreakpoint = mediaSplit[1];

      // массив объектов с подходящим брейкпоинтом
      const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
        return item.breakpoint === mediaBreakpoint;
      });
      matchMedia.addListener(function () {
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
      this.mediaHandler(matchMedia, оbjectsFilter);
    }
  };

  DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.moveTo(оbject.place, оbject.element, оbject.destination);
      }
    } else {
      for (let i = 0; i < оbjects.length; i++) {
        const оbject = оbjects[i];
        if (оbject.element.classList.contains(this.daClassname)) {
          this.moveBack(оbject.parent, оbject.element, оbject.index);
        }
      }
    }
  };

  // Функция перемещения
  DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
      destination.insertAdjacentElement('beforeend', element);
      return;
    }
    if (place === 'first') {
      destination.insertAdjacentElement('afterbegin', element);
      return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
  }

  // Функция возврата
  DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
      parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
      parent.insertAdjacentElement('beforeend', element);
    }
  }

  // Функция получения индекса внутри родителя
  DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
  };

  // Функция сортировки массива по breakpoint и place 
  // по возрастанию для this.type = min
  // по убыванию для this.type = max
  DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return -1;
          }

          if (a.place === "last" || b.place === "first") {
            return 1;
          }

          return a.place - b.place;
        }

        return a.breakpoint - b.breakpoint;
      });
    } else {
      Array.prototype.sort.call(arr, function (a, b) {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0;
          }

          if (a.place === "first" || b.place === "last") {
            return 1;
          }

          if (a.place === "last" || b.place === "first") {
            return -1;
          }

          return b.place - a.place;
        }

        return b.breakpoint - a.breakpoint;
      });
      return;
    }
  };

  const da = new DynamicAdapt("max");
  da.init();

};