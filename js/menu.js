const openMenu = document.querySelector("#open__menu");
const closeMenu = document.querySelector("#close__menu");
const aside = document.querySelector(".aside");

openMenu.addEventListener("click", () => {
  aside.classList.add("aside--active");
})

closeMenu.addEventListener("click", () => {
  aside.classList.remove("aside--active");
})

buttonsCategory.forEach(button => {
  button.addEventListener("click", () => {
    aside.classList.remove("aside--active");
  })
})