window.addEventListener('resize', setPaddingTop); // Обновляем при изменении размера окна
window.addEventListener('load', setPaddingTop); // Устанавливаем значение при загрузке страницы

function setPaddingTop() {
  const headerHeight = document.querySelector('.header').offsetHeight;
  document.querySelector('.top_content').style.marginTop = `${headerHeight}px`; // 68px можно оставить как есть, или тоже подставить динамически
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