export default class CacheService {
  update(key, value) {
    document.cookie = `${key}=${value}`;
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
