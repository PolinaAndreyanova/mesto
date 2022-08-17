export class UserInfo {
  constructor({nameSelector, statusSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
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
}