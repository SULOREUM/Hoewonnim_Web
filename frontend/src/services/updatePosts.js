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
    //Get Lists
    static getLists() {
        const promise = new Promise(resolve => {
            const res = axios.get('http://localhost:3000/api/boards/')
            resolve(res)
        })
        return promise.then(res=>res.data)
    }
    //Show Details
    static showList(id) {
        const promise = new Promise(resolve => {
            const res = axios.get(`http://localhost:3000/api/boards/${id}`)
            resolve(res)
        })
        return promise.then(res=>res.data)
    }
    static insertList(data) {
        return axios.post('http://localhost:3000/api/boards/', {
            data
        });
    }
}

export default updatePosts;