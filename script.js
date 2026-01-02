const menuButton = document.querySelector(".menu");
const targetElements = document.querySelectorAll('.target');

function toggleMenu() {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !isExpanded);
  targetElements.forEach(ele => {
    ele.classList.toggle('change');
  });
}

// Click event handler
menuButton.addEventListener("click", toggleMenu);

// Keyboard event handler
menuButton.addEventListener("keydown", (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});