// Wait for DOM to be ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMenu);
} else {
  initMenu();
}

function initMenu() {
  const menuButton = document.querySelector(".menu");
  const targetElements = document.querySelectorAll(".target");

  if (!menuButton) {
    return; // Menu button not found, exit early
  }

  function toggleMenu() {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
    targetElements.forEach((ele) => {
      ele.classList.toggle("change");
    });
  }

  // Click event handler
  menuButton.addEventListener("click", toggleMenu);

  // Keyboard event handler
  menuButton.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu();
    }
  });
}
