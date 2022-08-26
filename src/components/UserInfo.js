export class UserInfo {
  constructor({nameSelector, statusSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      status: this._status.textContent
    }
  }

  setUserInfo(newName, newStatus) {
    this._name.textContent = newName;
    this._status.textContent = newStatus;
  }

  setUserAvatar(newAvatar) {
    this._avatar.src = newAvatar;
  }
}