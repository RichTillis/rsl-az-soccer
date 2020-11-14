import { Roles } from "./roles";

export interface User {
  uid: string;
  email: string;
  createDate?: string;
  lastLogin: string;
  roles?: Roles;
  favorites?: any;
  profilePic?: string;
  facebookId?: string;
  facebookUserName?: string;
  facebookUserProfilePicUrl?: string;
  devices?:any;
}
