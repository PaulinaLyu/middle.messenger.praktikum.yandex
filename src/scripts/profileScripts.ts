export function profilePageFunc() {
  const avatarSettingBtn = document.querySelector(
    ".profile-page__main__avatar"
  );
  const avatarSettingModal = document.querySelector(".profile-page__modal");

  const handleBtnClick = () => {
    if (avatarSettingModal) {
      avatarSettingModal.classList.add("active");
    }
  };
  // const handleModalCloseClick = (e: Event) => {
  //   if (e.currentTarget !== avatarSettingModal && avatarSettingModal) {
  //     avatarSettingModal.classList.remove("active");
  //   }
  // };

  if (avatarSettingBtn) {
    avatarSettingBtn.addEventListener("click", handleBtnClick);
  }

  // if (avatarSettingModal) {
  //   avatarSettingModal.addEventListener("click", handleModalCloseClick);
  // }
}
