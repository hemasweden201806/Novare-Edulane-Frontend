import AuthApi from '../api/AuthApi';
import UserApi from '../api/UserApi';

const tokenKey = '_token';
const userKey = 'user';
const emailKey = 'email';
const roleKey = 'role';

// Disclaimer: This simple auth implementation is for development purposes only.

class Auth {
  setLoggedIn = () => {};

  isLoggedIn() {
    return this._getToken() != null;
  }

  async login(loginData) {
    return await this._loginOrRegister(AuthApi.authenticate, loginData);
  }

  async register(registrationData) {
    return await this._loginOrRegister(AuthApi.register, registrationData);
  }

  async getUser() {
    try {
      const response = await UserApi.getLoggedInUser();
      this._setLoggedInUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.setLoggedIn(false);
    this._clearToken();
    this._clearLoggedInUser();
  }

  bindLoggedInStateSetter(loggedInStateSetter) {
    this.setLoggedIn = loggedInStateSetter;
  }

  getAuthorizationHeader() {
    return 'Bearer ' + this._getToken();
  }

  async _loginOrRegister(action, data) {
    try {
      const response = await action(data);
      this._setToken(response.data.token);
      this.setLoggedIn(true);
      this.getUser();
      return true;
    } catch (e) {
      console.error(e);

      this.setLoggedIn(false);
      return false;
    }
  }

  _getToken() {
    return window.sessionStorage.getItem(tokenKey);
  }

  _setToken(token) {
    window.sessionStorage.setItem(tokenKey, token);
  }

  _clearToken() {
    window.sessionStorage.removeItem(tokenKey);
  }

  _setLoggedInUser(user) {
    window.sessionStorage.setItem(userKey, user.name);
    window.sessionStorage.setItem(emailKey, user.email);
    window.sessionStorage.setItem(roleKey, user.role);
  }

  _clearLoggedInUser() {
    window.sessionStorage.removeItem(userKey);
    window.sessionStorage.removeItem(emailKey);
    window.sessionStorage.removeItem(roleKey);
  }
}

export default new Auth();
