import { withRouter } from "../../tools/WithRouter";
import "./loginPage.scss";
import { LoginPageProps, LoginPage as UnwrappedLoginPage } from "./LoginPage";

export const LoginPage = withRouter<LoginPageProps>(UnwrappedLoginPage);
export default LoginPage;
