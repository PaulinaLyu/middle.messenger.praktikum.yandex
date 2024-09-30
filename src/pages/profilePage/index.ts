import { withRouter } from "../../tools/WithRouter";
import { ProfilePage as UnwrappedProfilePage } from "./ProfilePage";
import type { ProfilePageProps } from "./ProfilePage";

import "./profilePage.scss";

export const ProfilePage = withRouter<ProfilePageProps>(UnwrappedProfilePage);
export default ProfilePage;
