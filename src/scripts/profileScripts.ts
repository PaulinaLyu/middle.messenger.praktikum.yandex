export function profilePageFunc() {
  const avatarSettingBtn = document.querySelector(".profile-page__main__avatar") as HTMLElement;
  const avatarSettingModal = document.querySelector("#profileAvatarSettingModal") as HTMLElement;
  const inputFile = document.querySelector(".inputFile__input") as HTMLElement;
  const modalSubmitBtn = document.querySelector(".modal__footer__btn") as HTMLElement;

  const handleBtnClick = () => {
    avatarSettingModal.classList.add("active");
  };

  const handleCloseModal = () => {
    avatarSettingModal.classList.remove("active");
  };

  const handleInputFileChange = function (this: HTMLInputElement) {
    if (this.files && this.files.length > 0) {
      const file = this.files[0];
      this.nextElementSibling!.innerHTML = file.name;
    }
  };

  // const handleModalCloseClick = (e: Event) => {
  //   if (e.currentTarget !== avatarSettingModal) {
  //     avatarSettingModal.classList.remove("active");
  //   }
  // };

  avatarSettingBtn.addEventListener("click", handleBtnClick);
  inputFile.addEventListener("change", handleInputFileChange);
  modalSubmitBtn.addEventListener("click", handleCloseModal);

  document.addEventListener("click", event => {
    const target = event.target as HTMLElement;

    if (!target.closest("#profileAvatarSettingModal, .profile-page__main__avatar")) {
      avatarSettingModal.classList.remove("active");
    }
  });
}
