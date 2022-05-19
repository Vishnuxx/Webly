export class Utils {
  static convertObjectToString(json) {
    return JSON.stringify(json).trim().replace(0, -1);
  }
}
