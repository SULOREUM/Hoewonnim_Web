import axios from "axios";

const url = "/api/photos/";

class updatePhotos {
  static getPhotos() {
    const promise = new Promise((resolve) => {
      const res = axios.get(url);
      resolve(res);
    });
    return promise.then((res) => res.data);
  }
  // Create Post
  static insertPost(data) {
    return axios.post(url, data).then((res) => {
      console.log(res);
    });
  }
  //Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }

  //Show Details
  static getDetailPost(id) {
    const promise = new Promise((resolve) => {
      console.log(id);
      const res = axios.get(`${url}${id}`);
      resolve(res);
    });
    return promise.then((res) => res.data);
  }
  static UpdatePost(data, id) {
    return axios.post(`${url}${id}`, data);
  }
}

export default updatePhotos;
