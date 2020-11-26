export interface User {
  uid: string;
  key?: string;//firebase.User uid
  email: string;
  createDate?: string;
  lastLogin?: string;
  role?: string;
  favorites?: any;
  profilePic?: string;
  facebookId?: string;
  facebookUserName?: string;
  facebookUserProfilePicUrl?: string;
  devices?: any;
}