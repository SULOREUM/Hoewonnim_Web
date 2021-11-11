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
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }
    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default updatePosts;