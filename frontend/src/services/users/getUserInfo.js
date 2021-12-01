import axios from "axios";

const url = 'http://localhost:3000/api/users/';

class getUserInfo {
    // Get User Information
    static getUser(id) {
        const promise = new Promise(resolve => {
            console.log(id)
            const res = axios.get(url)
            resolve(res)
        })
        return promise.then(res=>res.data)
    }
}

export default getUserInfo;
