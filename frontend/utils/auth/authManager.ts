import Cookies from 'js-cookie';

class AuthManagerClass {
  cookiesLib;
  constructor(lib) {
    this.cookiesLib = lib;
  }
  _get(key) {
    return this.cookiesLib.get(key);
  }
  _set(key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    this.cookiesLib.set(key, value);
  }
  setInfo(info) {
    console.log('set info', info);
    this._set('auth', JSON.stringify(info));
  }
  getInfo() {
    const data = this._get('auth');
    if (!data || data === 'undefined') return false;
    try {
      return JSON.parse(data);
    } catch (e) {
      return JSON.parse(decodeURIComponent(data));
    }
  }
  isLoggedIn() {
    return !!this.getInfo();
  }
  clearInfo() {
    this._set('auth', undefined);
  }
}
export default new AuthManagerClass(Cookies);
export const AuthManager = AuthManagerClass;
