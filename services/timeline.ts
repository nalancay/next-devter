import { makeRequest } from "./services.utils";

const URL_IN_PRODUCTION = "https://nalancay-next-devter.netlify.app";
const URL_IN_LOCAL = "http://localhost:3000";

const URL_ENDPOINT = `${
  process.env.NODE_ENV === "production" ? URL_IN_PRODUCTION : URL_IN_LOCAL
}/api/devits`;

export default class TimeLine {
  static async getAllTimeLine() {
    try {
      const { data, isSuccessful } = await makeRequest({ URL_ENDPOINT });
      if (!isSuccessful) {
        throw new NetworkError();
      }
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async getTimeLine(id: string) {
    try {
      const { data, isSuccessful } = await makeRequest({
        URL_ENDPOINT: `${URL_ENDPOINT}/${id}`,
      });
      if (!isSuccessful) {
        throw new NetworkError();
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
}

class NetworkError extends Error {
  constructor() {
    super("Network error");
  }
}
