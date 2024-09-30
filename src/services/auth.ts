import AuthApi from "../api/auth";

const authApi = new AuthApi();

export const login = async model => {
  debugger;
  window.store.set({ isLoadingUser: true });
  debugger;
  try {
    await authApi.login(model);
    debugger;
    // window.router.go("/cats");
  } catch (error) {
    debugger;
    window.store.set({ loginError: "some error" });
  } finally {
    debugger;
    window.store.set({ isLoading: false });
  }
};
