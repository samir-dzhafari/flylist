var swiper = new Swiper(".author_tours_swiper", {
  slidesPerView: 1, // базовое значение (для мобильных)
  spaceBetween: 30, // базовый отступ
  freeMode: true,
  pagination: {
    el: ".author_tours-swiper-pagination",
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

var swiper = new Swiper(".package_tours_swiper", {
  slidesPerView: 1, // базовое значение (для мобильных)
  spaceBetween: 30, // базовый отступ
  freeMode: true,
  pagination: {
    el: ".package_tours-swiper-pagination",
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