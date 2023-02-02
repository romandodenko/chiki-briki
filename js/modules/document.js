
document.addEventListener("click", function(e) {
  const elementInteractive = e.target;

  if(elementInteractive.closest(".popup__btn")) {
    document.querySelector(".popup").classList.remove("popup-active")
  }
  if(!elementInteractive.closest(".popup__body")) {
    document.querySelector(".popup").classList.remove("popup-active")
  }
})

const popup = document.querySelector(".popup");

if (popup) {
  let popupTimer, timeOut = 6000;

  function displayPopup() {
    popup.classList.add("popup-active")
  }

  popupTimer = setTimeout(displayPopup, timeOut);

  window.addEventListener("scroll", function (e) {
    clearTimeout(popupTimer);
    popupTimer = setTimeout(displayPopup, timeOut);
  })
  window.addEventListener("click", function (e) {
    clearTimeout(popupTimer);
    popupTimer = setTimeout(displayPopup, timeOut);
  })
  window.addEventListener("mouseover", function (e) {
    clearTimeout(popupTimer);
    popupTimer = setTimeout(displayPopup, timeOut);
  })
};