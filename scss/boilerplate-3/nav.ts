// Code snippet required for navbar toggle to function
const $ = document.querySelector.bind(document) // Optional, change $ below to document.querySelector if you remove it
const navToggle = $("[data-nav-toggle]")
const navLinks = $("[data-nav-links]")

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("is-visible")
})
