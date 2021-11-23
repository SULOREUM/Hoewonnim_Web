import axios from "axios";

const url = 'https://localhost:3000/api/users';

class join {

    // Check whether the user is a member
    static getUsers(){
        const promise = new Promise(resolve => {
            const res = axios.get(url)
            resolve(res)
        })
        return promise.then(res=>res.data)
    }

    // static idCheck(){
    //
    // }
    //
    // static passwordCheck(){
    //
    // }

    static login({ commit }, loginObj) {
        axios
            .post(url, loginObj) // 두번째 인자로 body에 넣어줄 파라미터가 들어감
            // 성공 시 token: 발급(실제로는 토큰과 함께 user_id 값을 받아온다)
            // 토큰을 헤더정보에 넣어서 유저 정보를 요청


            .then(res => {
                // config에서 header 값을 설정해 줄 수 있고, 헤더 부분에 토큰을 포함 시키기 위해 config를 사용
                let config = {
                    headers: {
                        "access-token": res.data.token
                    }
                }
                axios
                    .get(url, config) // 두번째 인자로 config가 들어감(보안과 관련된 옵션들)
                    .then(response => {
                        let userInfo = {
                            id: response.data.data.id,
                            email: response.data.data.email
                            //이후 마저 작성
                        }
                        commit("loginSuccess", userInfo)
                    })
                    .catch(error => {
                        console.log(error);
                        alert('입력하신 정보를 확인해주세요.')
                    })
            })
            .catch(err => {
                console.log(err);
                alert('입력하신 정보를 확인해주세요.')
            })
    }

    updateLogin = async () => {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'include',
        }).then((res) => {
            if (res.status >= 200 && res.status <= 204) {
                return res;
            }
        });
        await this.changeLoginState();
    };

}

export default join;
