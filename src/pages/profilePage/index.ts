import { State } from "@/core/Store";
import { ProfilePage as BaseProfile, ProfilePageProps } from "./ProfilePage";

import "./profilePage.scss";
import { withStore } from "@/hocs/withStore";

const mapStateToProps = (state: State) : ProfilePageProps => ({ user: state.user });

export const ProfilePage = withStore<ProfilePageProps>(mapStateToProps)(BaseProfile);
