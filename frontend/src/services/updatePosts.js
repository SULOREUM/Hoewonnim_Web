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
    static insertPost(post) {
        return axios.post(url, {
            post
        });
    }
    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
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