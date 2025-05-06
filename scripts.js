window.addEventListener('resize', setPaddingTop); // Обновляем при изменении размера окна
window.addEventListener('load', setPaddingTop); // Устанавливаем значение при загрузке страницы

function setPaddingTop() {
  const headerHeight = document.querySelector('.header').offsetHeight;

  const content = document.querySelector('.top_content');

  if (content) {
    content.style.marginTop = `${headerHeight}px`; // 68px можно оставить как есть, или тоже подставить динамически
  }
}

// Подсветка меню

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".header-menu-link");

  function activateMenu() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", activateMenu);
  activateMenu(); // активируем при загрузке
});

// Раскрытие мобильного меню

const burgerButton = document.getElementById('menu-button');
const header = document.querySelector('.header');

burgerButton.addEventListener('click', () => {
  header.classList.toggle('open');
});

// Фильтр пакетных туров

document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.package_tours-filter button');
  const grid = document.querySelector('.grid'); // Получаем контейнер с карточками

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
      const cards = grid.querySelectorAll('.package_tours-card'); // Ищем карточки внутри grid

      // Фильтрация
      cards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-country') === filterValue) {
          card.style.display = 'block'; // или 'flex' в зависимости от вашей структуры
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

const slider = document.querySelector('.package_tours-filter');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // Скорость прокрутки
  slider.scrollLeft = scrollLeft - walk;
});