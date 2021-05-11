document.querySelector(".menu").addEventListener("click", () => {
  document.querySelectorAll('.target').forEach(ele => {
    ele.classList.toggle('change')
  })
});