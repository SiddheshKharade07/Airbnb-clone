const filterIcons = document.querySelectorAll(".filter");

filterIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    filterIcons.forEach((i) => i.classList.remove("active"));
    icon.classList.add("filter-active");
  });
});
