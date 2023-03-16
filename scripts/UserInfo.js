
export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  }
  getUserInfo() {
    const infoUser = {
      profileName: this._profileName.textContent,
      profileDescription: this._profileDescription.textContent
    };
    return infoUser
  }

  setUserInfo(UserName, UserDescr) {
    const infoUser = {
      profileName: UserName,
      profileDescription: UserDescr
    };
    this._profileName.textContent = infoUser.profileName;
    this._profileDescription.textContent = infoUser.profileDescription;
    return infoUser
  }
}
