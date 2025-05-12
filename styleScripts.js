window.addEventListener('resize', setPaddingTop);
window.addEventListener('load', setPaddingTop);

function setPaddingTop() {
  const headerHeight = document.querySelector('.header').offsetHeight;

  const content = document.querySelector('.top_content');

  if (content) {
    content.style.marginTop = `${headerHeight}px`; // 68px можно оставить как есть, или тоже подставить динамически
  }
}