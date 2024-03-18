export function profilePageFunc() {
  const avatarSettingBtn = document.querySelector("profile-page__main__avatar");
  const avatarSettingModal = document.querySelector("profile-page__modal");

  if (avatarSettingBtn) {
    avatarSettingBtn.addEventListener("click", (e) => {
      if (avatarSettingModal) {
        avatarSettingModal.classList.add("active");
      }
    });
  }
}
