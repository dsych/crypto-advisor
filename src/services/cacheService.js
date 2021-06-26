import debounce from "debounce-promise";

export default class CacheService {
  _debouncedKeys = {};

  updateWithDelay(key, value) {
    if (!this._debouncedKeys[key]) {
      this._debouncedKeys[key] = debounce(this.update.bind(this), 3000);
    }
    return this._debouncedKeys[key](key, value);
  }

  update(key, value) {
    document.cookie = `${key}=${value}; SameSite=Strict`;
  }

  get(key, defaultValue) {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${key}=`));

    if (!cookie) {
      return defaultValue;
    }
    return cookie.split("=")[1] || defaultValue;
  }
}
