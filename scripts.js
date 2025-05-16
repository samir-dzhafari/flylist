window.addEventListener('resize', setPaddingTop); // Обновляем при изменении размера окна
window.addEventListener('load', setPaddingTop); // Устанавливаем значение при загрузке страницы

function setPaddingTop() {
  const headerHeight = document.querySelector('.header').offsetHeight;

  const content = document.querySelector('.top_content');

  if (content) {
    content.style.paddingTop = `${headerHeight}px`; // 68px можно оставить как есть, или тоже подставить динамически
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
          link.addEventListener("click", () => {
            header.classList.remove('open');
          })
          link.classList.remove("active");
          if (link.getAttribute("data-value") === `${sectionId}`) {
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

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.package_tours-filter button');
  const grid = document.querySelector('.grid'); // Получаем контейнер с карточками

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
      const cards = grid.querySelectorAll('.package_tours-card'); // Ищем карточки внутри grid

      // Фильтрация
      cards.forEach(card => {
        if (card.getAttribute('data-country') === "all") {
          return card.style.display = 'flex';
        }
        if (filterValue === 'all' || card.getAttribute('data-country') === filterValue) {
          card.style.display = 'flex'; // или 'flex' в зависимости от вашей структуры
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

slider?.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider?.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider?.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider?.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5; // Скорость прокрутки
  slider.scrollLeft = scrollLeft - walk;
});

// Форматтер номера телефона

const phoneInput = document.getElementById('phone');

document.getElementById('phone').addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
  e.target.value = !x[1] ? ''
    : x[1] == '7' || x[1] == '8' ? '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')
      : '+7' + (x[1] ? ' (' + x[1] : '') + (x[2] ? x[2] + ')' : '') + (x[3] ? ' ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
});

document.querySelectorAll('.select-box').forEach((box) => {
  const selected = box.querySelector('.selected');
  const options = box.querySelector('.options');
  const popupWindow = box.closest('.popup-window');
  const hiddenSelect = box.querySelector('.hidden-select select');

  // Функция для вычисления максимальной высоты для меню
  function setMaxHeight() {
    const popupRect = popupWindow.getBoundingClientRect(); // Получаем размеры попапа
    const availableHeight = popupRect.height - box.getBoundingClientRect().top - 30; // 20px для отступов
    options.style.maxHeight = `${Math.min(availableHeight, 220)}px`; // Устанавливаем максимум 220px
  }

  setMaxHeight();
  window.addEventListener('resize', setMaxHeight);

  box.addEventListener('click', () => {
    box.classList.toggle('open');
  });

  options.querySelectorAll('li').forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const value = e.target.getAttribute('data-value');
      selected.textContent = e.target.textContent;
      box.classList.add('filled');
      box.classList.remove('open');
      box.dataset.value = value;
      hiddenSelect.value = value;
    });
  });

  // Закрыть при клике вне
  document.addEventListener('click', (e) => {
    if (!box.contains(e.target)) {
      box.classList.remove('open');
    }
  });
});

let typingTimer; // Таймер для отслеживания окончания ввода
const typingDelay = 400; // Задержка в 1000 мс (1 секунда)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.req');
  const submitButton = document.querySelector('.popup-submit .button');

  submitButton.addEventListener('click', function (event) {
    inputs.forEach(input => {
      validateField(input)
    })
  })

  if (form == null) {
    return
  }

  const inputs = form.querySelectorAll('.textfield-standard input, .select-box');

  // Функция для проверки, все ли поля заполнены
  function checkFormCompletion() {
    let allFilled = true;

    inputs.forEach(input => {
      if (!isValidFields(input)) {
        allFilled = false
      }
    });

    // Включаем или отключаем кнопку в зависимости от заполненности формы
    if (allFilled) {
      submitButton.classList.remove('unactive');
      submitButton.classList.add('primary');
    } else {
      submitButton.classList.add('unactive');
      submitButton.classList.remove('primary');
    }
  }

  // Функция для обработки ввода с задержкой
  function handleInput(event) {
    const input = event.target;

    // Очистка предыдущего таймера
    clearTimeout(typingTimer);

    // Установка нового таймера
    typingTimer = setTimeout(() => {
      validateField(input);
      checkFormCompletion();
    }, typingDelay);
  }

  // Проверяем форму при изменении значений
  inputs.forEach(input => {
    if (input.tagName.toLowerCase() === 'input') {
      input.addEventListener('input', handleInput);
    } else if (input.classList.contains('select-box')) {
      const options = input.querySelectorAll('.options li');
      options.forEach(option => {
        option.addEventListener('click', handleInput);
      });
    }
  })
});

// Функция для проверки полей

function validateField(input) {
  if (input.tagName.toLowerCase() === 'input') {
    // Проверка инпутов
    if (input.id === 'name') {
      const nameError = document.getElementById('name-error');
      if (input.value.trim().length < 2) {
        input.classList.add('error');
        nameError.style.display = 'block';
      } else {
        input.classList.remove('error');
        nameError.style.display = 'none';
      }
    } else if (input.id === 'phone') {
      const phoneError = document.getElementById('phone-error');
      if (!isValidPhone(input.value)) {
        input.classList.add('error');
        phoneError.style.display = 'block';
      } else {
        input.classList.remove('error');
        phoneError.style.display = 'none';
      }
    } else if (input.id === 'email') {
      const emailError = document.getElementById('email-error');
      if (!isValidEmail(input.value)) {
        input.classList.add('error');
        emailError.style.display = 'block';
      } else {
        input.classList.remove('error');
        emailError.style.display = 'none';
      }
    }
  } else if (input.classList.contains('select-box')) {
    // Проверка селектора
    const selectBox = input;
    const selectError = document.getElementById('select-error');
    if (selectBox.querySelector('.selected').textContent === 'Выберете направление') {
      selectBox.classList.add('error');
      selectError.style.display = 'block';
    } else {
      selectBox.classList.remove('error');
      selectError.style.display = 'none';
    }
  }
}

function isValidFields(input) {
  if (input.tagName.toLowerCase() === 'input') {
    // Проверка инпутов
    if (input.id === 'name') {
      return input.value.trim().length > 1
    } else if (input.id === 'phone') {
      return isValidPhone(input.value)
    } else if (input.id === 'email') {
      return isValidEmail(input.value)
    }
  } else if (input.classList.contains('select-box')) {
    // Проверка селектора
    const selectBox = input;
    const selectError = document.getElementById('select-error');
    return selectBox.querySelector('.selected').textContent !== 'Выберете направление'
  }
}

// Функция для проверки телефона
function isValidPhone(phone) {
  const regex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
  return regex.test(phone);
}

// Функция для проверки email
function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}


document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('request-popup');
  if (popup == null) {
    return
  }

  const openButtons = document.querySelectorAll('.open-request-popup');
  const closeButtons = document.querySelectorAll('.close-request-popup');

  // Закрытие при клике вне окна
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('request-popup');
  const openButtons = document.querySelectorAll('.open-request-popup');
  const closeButtons = document.querySelectorAll('.close-request-popup');
  const submitButton = document.querySelector('.popup-submit .button');
  const firstStep = document.querySelector('.first_step');
  const secondStep = document.querySelector('.second_step');
  const form = document.querySelector(".req");

  if (form == null) {
    return
  }

  // Открытие popup по клику на любую кнопку
  openButtons.forEach(button => {
    button.addEventListener('click', () => {
      popup.classList.remove('hidden');
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      const value = button.getAttribute('data-value');

      if (!value) {
        // Найти селект в форме
        const select = popup.querySelector('select[name="your-direction"]');

        // Найти кастомный селект в попапе
        const selectBox = popup.querySelector('.select-box');
        if (!selectBox) return;

        // Обновить текст выбранного
        const selected = selectBox.querySelector('.selected');
        selected.textContent = "Выберете направление";

        selectBox.classList.remove('filled');
        selectBox.classList.remove('open');
        selectBox.dataset.value = null;
        select.value = "";
        return;
      }

      // Найти селект в форме
      const select = popup.querySelector('select[name="your-direction"]');

      // Найти кастомный селект в попапе
      const selectBox = popup.querySelector('.select-box');
      if (!selectBox) return;

      // Обновить текст выбранного
      const selected = selectBox.querySelector('.selected');
      selected.textContent = value;

      selectBox.classList.add('filled');
      selectBox.classList.remove('open');
      selectBox.dataset.value = value;
      select.value = value;
    });
  });

  // Закрытие по кнопке закрытия
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      popup.classList.add('hidden');
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';
    });
  });

  // Закрытие при клике вне окна
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.add('hidden');
      document.body.style.overflowY = 'auto';
      document.documentElement.style.overflowY = 'auto';
      resetPopupForm()
    }
  });

  document.addEventListener('wpcf7mailsent', function (event) {
    if (form.checkValidity()) {
      firstStep.classList.add('hidden');
      secondStep.classList.remove('hidden');
    }
  }, false);

  // Проверка кнопки "Отправить" (активация при валидности формы)
  form.addEventListener('input', checkFormCompletion);

  checkFormCompletion()

  // Проверка, все ли поля заполнены
  function checkFormCompletion() {
    let allFilled = true;

    const inputs = form.querySelectorAll('.textfield-standard input, .select-box');

    inputs.forEach(input => {
      if (!isValidFields(input)) {
        allFilled = false
      }
    });

    // Включаем или отключаем кнопку в зависимости от заполненности формы
    if (allFilled) {
      submitButton.classList.remove('unactive');
      submitButton.classList.add('primary');
    } else {
      submitButton.classList.add('unactive');
      submitButton.classList.remove('primary');
    }
  }
});

function resetPopupForm() {
  const popup = document.getElementById('request-popup');
  const form = popup.querySelector('.req');
  const inputs = form.querySelectorAll('.textfield-standard input');
  const errorMessages = form.querySelectorAll('.textfield-error-message');
  const selectBox = form.querySelector('.select-box');
  const select = form.querySelector('select[name="your-direction"]');
  const selected = selectBox.querySelector('.selected');
  const submitButton = form.querySelector('.popup-submit .button');

  // Очистка инпутов
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('error');
  });

  // Скрытие сообщений об ошибках
  errorMessages.forEach(msg => {
    msg.style.display = 'none';
  });

  // Сброс кастомного селекта
  selected.textContent = 'Выберете направление';
  selectBox.classList.remove('filled', 'error', 'open');
  selectBox.dataset.value = null;

  // Сброс нативного селекта
  select.value = '';

  // Сброс стилей кнопки
  submitButton.classList.add('unactive');
  submitButton.classList.remove('primary');
}