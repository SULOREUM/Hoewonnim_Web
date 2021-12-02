import axios from 'axios'



const url = 'https://localhost:3000/api/users';
const getUserInfo = (id, password) => {
    return axios.get(url, {
        params: {
            'id': id,
            'password': password
        }
    })
}

const isFinished = id => {
    return axios.get(url, {
        params: {
            'id': id
        }
    })
}

export default {
    async login (id, password) {
        try {
            const getUserInfoPromise = await getUserInfo(id, password)
            const isFinishedPromise = await isFinished(id) // Promise.all의 예시를 위해 집어넣음
            const [userInfoResponse, isFinishedResponse] = await Promise.all([getUserInfoPromise, isFinishedPromise])
            if (userInfoResponse.data.length === 0) return 'noAuth' // 로그인 결과에 따른 분기 처리를 해준다
            if (isFinishedResponse.data[0].count > 0) return 'done'
            console.log("userInfoResponse: " + userInfoResponse);
            return userInfoResponse

        } catch (err) {
            console.error(err)
        }
    }
}

