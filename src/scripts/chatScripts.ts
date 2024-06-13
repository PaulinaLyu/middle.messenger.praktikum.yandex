export function chatPageFunc() {
  document.addEventListener('click', event => {
    const target = event.target as HTMLElement ;
    const dropbtn = target.closest('.dropbtn') as HTMLElement;

    if (dropbtn) {
      const dropdown = dropbtn.nextElementSibling as HTMLElement;
      if (dropdown) {
        document.querySelectorAll('.dropdown-content').forEach(content => {
          if (content !== dropdown) {
            debugger;
            content.classList.remove('dropdown-content--show');
          }
        });

        dropdown.classList.toggle('dropdown-content--show');
      }
    } else {
      document.querySelectorAll('.dropdown-content').forEach(content => {
        content.classList.remove('dropdown-content--show');
      });
    }
  });
}