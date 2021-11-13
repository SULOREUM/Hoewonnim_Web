import axios from "axios";

const url = 'http://localhost:3000/api/posts/';

class updatePosts {
    // Get Posts
    static getPosts() {
        const promise = new Promise(resolve => {
            const res = axios.get(url)
            resolve(res)
        })
        return promise.then(res=>res.data)
    }
    // Create Post
    static insertPost(data) {
        return axios.post(url, {
            data
        });
    }
    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
    static UpdatePost(data,id){
        return axios.post(`${url}${id}`,{
            data
        });
    }

    //Show Details
    static getDetailPost(id) {
        const promise = new Promise(resolve => {
            console.log(id)
            const res = axios.get(`${url}${id}`)
            resolve(res)
        })
        return promise.then(res=>res.data)
    }
}

export default updatePosts;