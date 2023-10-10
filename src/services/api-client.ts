import axios, { AxiosRequestConfig } from "axios";
import { Article } from "../entities/Article";

const axiosInstant = axios.create({
  baseURL: "https://51.81.20.148:7373",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  getAll = (params?: AxiosRequestConfig) => {
    return axiosInstant.get<T>(this.endpoint, params).then((res) => res.data);
  };
  post = (data: T) => {
    return axiosInstant
      .post<T>(this.endpoint, {
        params: data,
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  };
  postActive = (data: { id: number; activeState: boolean }) => {
    return axiosInstant
      .post<T>(`${this.endpoint}?id=${data.id}&isAcitve=${!data.activeState}`)
      .then((res) => res.data);
  };

  delete = (id: number) =>
    axiosInstant
      .delete(this.endpoint, { params: { id: id } })
      .then((res) => res.data)
      .catch((e) => e);

  putArticle = (path: string, editArticle: Article) => {
    return axiosInstant
      .put(this.endpoint + path, editArticle)
      .then((res) => res)
      .catch((error) => error);
  };
}

export default APIClient;
