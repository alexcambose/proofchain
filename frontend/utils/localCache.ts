export default class LocalCache {
  static set(id, data) {
    localStorage.setItem(
      'cache',
      JSON.stringify({ ...this.getAll(), [id]: data })
    );
  }
  static clear() {
    localStorage.removeItem('cache');
  }
  static get(id) {
    return this.getAll()[id];
  }
  static getAll() {
    return JSON.parse(localStorage.getItem('cache') || '{}');
  }
  static async cached(id, promiseFunc) {
    if (this.get(id)) {
      console.log('served from cache', id);
      return this.get(id);
    }
    const result = await promiseFunc;
    this.set(id, result);
    return result;
  }
}
