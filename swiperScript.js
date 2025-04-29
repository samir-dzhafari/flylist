var authorToursSwiper = new Swiper(".author_tours_swiper", {
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

var packageToursSwiper = new Swiper(".package_tours_swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".package_tours-swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  breakpoints: {
    430: { slidesPerView: 2 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true
});

// Фильтр пакетных туров

document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.package_tours-filter button');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Обновляем активную кнопку
      filterButtons.forEach(btn => {
        btn.classList.remove('primary');
        btn.classList.add('unactive');
      });
      this.classList.remove('unactive');
      this.classList.add('primary');

      const filterValue = this.getAttribute('data-filter');
      const slides = document.querySelectorAll('.package_tours-card');

      // Сначала скрываем все слайды
      slides.forEach(slide => {
        slide.style.display = 'none';
        slide.classList.remove('swiper-slide-visible');
      });

      // Показываем нужные слайды
      if (filterValue === 'all') {
        slides.forEach(slide => {
          slide.style.display = 'block';
        });
      } else {
        document.querySelectorAll(`.package_tours-card[data-country="${filterValue}"]`).forEach(slide => {
          slide.style.display = 'block';
        });
      }

      // Обновляем Swiper с задержкой для корректного расчета
      setTimeout(() => {
        packageToursSwiper.update();
        packageToursSwiper.slideTo(0);
      }, 50);
    });
  });
});