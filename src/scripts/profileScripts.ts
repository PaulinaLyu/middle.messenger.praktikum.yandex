export function profilePageFunc() {
  const avatarSettingBtn = document.querySelector(
    ".profile-page__main__avatar"
  );
  const avatarSettingModal = document.querySelector(".profile-page__modal");
  const inputFile = document.querySelector(".inputFile__input");
  const modalSubmitBtn = document.querySelector(".modal__footer__btn");

  const handleBtnClick = () => {
    if (avatarSettingModal) {
      avatarSettingModal.classList.add("active");
    }
  };

  const handleCloseModal = () => {
    if (avatarSettingModal) {
      avatarSettingModal.classList.remove("active");
    }
  };

  const handleInputFileChange = function (this: HTMLInputElement) {
    if (this.files && this.files.length > 0) {
      let file = this.files[0];
      this.nextElementSibling!.innerHTML = file.name;
    }
  };

  // const handleModalCloseClick = (e: Event) => {
  //   if (e.currentTarget !== avatarSettingModal) {
  //     avatarSettingModal.classList.remove("active");
  //   }
  // };

  if (avatarSettingBtn) {
    avatarSettingBtn.addEventListener("click", handleBtnClick);
  }

  if (inputFile) {
    inputFile.addEventListener("change", handleInputFileChange);
  }

  if (modalSubmitBtn) {
    modalSubmitBtn.addEventListener("click", handleCloseModal);
  }

  // if (avatarSettingModal) {
  //   avatarSettingModal.addEventListener("click", handleModalCloseClick);
  // }
}
