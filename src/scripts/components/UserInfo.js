export default class UserInfo {
  constructor(profileName, profileDescription, profileAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profileAvatar = document.querySelector(profileAvatar);
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
  setUserAvatar(userAvatar) {
    this._profileAvatar.src = userAvatar;
  }
}

