export function chatPageFunc() {
  const dropbtn = document.querySelector(".dropbtn") as HTMLElement;
  const dropdownContent = document.querySelector(
    ".dropdown-content"
  ) as HTMLElement;

  dropbtn.addEventListener("click", () => {
    dropdownContent.classList.toggle("dropdown-content--show");
  });

  window.addEventListener("click", (event) => {
    if (!(event.target as HTMLElement).matches(".dropbtn")) {
      if (dropdownContent.classList.contains("dropdown-content--show")) {
        dropdownContent.classList.remove("dropdown-content--show");
      }
    }
  });
}
