import ProfileAPI from '@/api/profile-api.ts';
import store from '@/core/Store.ts';
import { Router } from '@/core/Router.ts';
import { AuthController } from './auth.ts';
import { ChangePasswordRequest, profileRequest, profileResponse } from '@/types/Profile/Profile.dto.ts';

export class UserController {
  static async changeProfile(data: profileRequest) {
    try {
      const newProfileData: profileResponse = await ProfileAPI.changeProfile(data);
      store.set('user', newProfileData);
      Router.getInstance().go('/profile');
    } catch (error) {
      console.log(error, 'change profile error');
    }
  }

  static async changeAvatar(data: FormData) {
    try {
      await ProfileAPI.changeAvatar(data);
      await AuthController.fetchUser();
    } catch (error) {
      console.log(error, 'change avatar error');
    }
  }

  static async changePassword(data: ChangePasswordRequest) {
    try {
      await ProfileAPI.changePassword(data);
      Router.getInstance().go('/profile');
    } catch (error) {
      console.log(error, 'change password error');
    }
  }
}