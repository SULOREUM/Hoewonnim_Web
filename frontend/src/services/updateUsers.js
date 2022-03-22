import axios from "axios";

const url = "/api/users/";
class updateUsers {
  // Get Posts
  static getUsers() {
    const promise = new Promise((resolve) => {
      const res = axios.get(url);
      resolve(res);
    });
    return promise.then((res) => res.data);
  }

  // Create User
  static insertUser(data) {
    return axios.post(url, {
      data,
    });
  }

  //update User
  static UpdateUser(data, id) {
    console.log(data);
    return axios.post(`${url}${id}`, data);
  }
}
export default updateUsers;
