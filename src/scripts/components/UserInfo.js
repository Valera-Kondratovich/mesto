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

  setUserInfo(userName, userDescr) {
    this._profileName.textContent = userName;
    this._profileDescription.textContent = userDescr;
  }
}
