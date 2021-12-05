import axios from "axios";

const url = 'http://localhost:3000/api/photos/';

class updatePhotos {
    static getPhotos() {
        const promise = new Promise(resolve => {
            const res = axios.get(url)
            resolve(res)
        })
        return promise.then(res=>res.data)
    }
    // Create Post
    static insertPost(data) {
        return axios.post(url, data).then(
            res=>{
                console.log(res)
            }
        );
    }
}

export default updatePhotos;