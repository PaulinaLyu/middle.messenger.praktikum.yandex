import { withRouter } from "../../hocs/withRouter";
import "./loginPage.scss";
import { LoginPageProps, LoginPage as UnwrappedLoginPage } from "./LoginPage";

export const LoginPage = withRouter<LoginPageProps>(UnwrappedLoginPage);
export default LoginPage;
