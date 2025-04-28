var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1, // базовое значение (для мобильных)
  spaceBetween: 30, // базовый отступ
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  breakpoints: {
    430: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
});