import { withRouter } from "../../hocs/WithRouter";
import "./loginPage.scss";
import { LoginPageProps, LoginPage as UnwrappedLoginPage } from "./LoginPage";

export const LoginPage = withRouter<LoginPageProps>(UnwrappedLoginPage);
export default LoginPage;
