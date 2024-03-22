import { API_URL } from "./constants";
export default async (urlParams) => {
  try {
    const response = await fetch(`${API_URL}${urlParams ? urlParams : ""}`);
    const data = await response.json();

    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
