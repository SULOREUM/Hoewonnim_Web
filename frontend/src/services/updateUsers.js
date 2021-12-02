import axios from "axios";

const url = 'http://localhost:3000/api/users/';

class updateUsers {
    // Get Posts
    static getUsers() {
        const promise = new Promise(resolve => {
            const res = axios.get(url)
            resolve(res)
        })
        return promise.then(res=>res.data)
    }

    // Create User
    static insertUser(data) {
        return axios.post(url, {
            data
        });
    }
}
export default updateUsers;
