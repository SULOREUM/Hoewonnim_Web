import axios from "axios";

const url = 'http://localhost:3000/api/SignUp';

class join {

    // Check whether the user is a member
    // https://ssungkang.tistory.com/entry/javascript-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EC%8B%9C-%EC%95%84%EC%9D%B4%EB%94%94-%EC%A4%91%EB%B3%B5-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0-ajax

    // If a user sign-up, register as a member
    static createUser(data) {
        return axios.post(url, {
            data
        });
    }
}

export default join;
