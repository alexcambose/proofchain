import Cookies from 'js-cookie';

export default class AuthManager {
  static setInfo(info) {
    console.log('set info', info);
    Cookies.set('auth', JSON.stringify(info));
  }
  static getInfo() {
    const data = Cookies.get('auth');
    if (!data) return false;
    return JSON.parse(data);
  }
  static isLoggedIn() {
    return !!this.getInfo();
  }
  static clearInfo() {
    Cookies.remove('auth');
  }
}
