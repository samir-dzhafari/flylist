var authorToursSwiper = new Swiper(".author_tours_swiper", {
  slidesPerView: 1.5,
  spaceBetween: 8,
  freeMode: true,
  pagination: {
    el: ".author_tours-swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  breakpoints: {
    450: {
      slidesPerView: 1.7,
      spaceBetween: 12
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 12
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16
    }
  }
});

var packageToursSwiper = new Swiper(".package_tours_swiper", {
  slidesPerView: 1,
  spaceBetween: 8,
  freeMode: true,
  pagination: {
    el: ".package_tours-swiper-pagination",
    clickable: true,
    type: "bullets",
  },
  breakpoints: {
    450: {
      slidesPerView: 1.5,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 16,
    }
  },
  observer: true,
  observeParents: true,
  observeSlideChildren: true
});

var feedbackSwiper = new Swiper(".feedback_swiper", {
  slidesPerView: "auto",      // автоопределение количества
  spaceBetween: 16,           // отступы между слайдами
  freeMode: true,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
});

// Фильтр пакетных туров

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.package_tours-filter button');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
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
        document
          .querySelectorAll(`.package_tours-card[data-country="all"]`)
          .forEach(slide => {
            slide.style.display = 'block';
          });
        document
          .querySelectorAll(`.package_tours-card[data-country="${filterValue}"]`)
          .forEach(slide => {
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