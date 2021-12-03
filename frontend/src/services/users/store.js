import Vue from 'vue'
import Vuex from 'vuex'
import router from '../../routes/index'
import axios from "axios"
Vue.use(Vuex)

export default new Vuex.Store({
    state:{ //저장된 유저 정보
        // allUsers:[
        //     {userId: 'hoza123', password: '123', name: 'dahye', address: 'Seoul'}
        // ]
        userInfo: null,
        isLogin: false,
        isLoginError: false
    },
    getters: { //유저 정보 불러오기 -마이페이지
        // allUsersCount: function (state){
        //  return state.allUsers.length
        // },
        // countOfSeoul: state =>{
        //     let count = 0
        //     state.allUsers.forEach(user =>{
        //          if(user.address === 'seoul') count++
        //     })
        //  return count
        // },
        // percentOfSeoul: (state, getters) =>{
        //  return Math.round(getters.countOfSeoul / getters.allUsersCount * 100)
        // }
    },
    mutations:{
        // 로그인이 성공했을 때,
        loginSuccess(state, payload){
            state.isLogin = true
            state.isLoginError = false
            state.userInfo = payload
        },
        // 로그인이 실패했을 때,
        loginError(state){
            state.isLogin = false
            state.isLoginError = true
        }
    },
    actions:{ //로그인 시도
        login({commit}, loginObj){
            console.log(loginObj)
            axios
                .post('http://localhost:3000/api/SignIn', loginObj)
                .then(res => {
                    console.log(res)
                    // 성공 시 token: user의 _id 값을 받아온다
                    // 토큰을 헤더에 포함시켜서 유저 정보를 요청

                    let token = res.data.token
                    console.log('token:' + token)
                    let config = {
                        headers: {
                            "access-token": token
                        }
                    }
                    const url = "http://localhost:3000/api/users/" + token
                    console.log(url)
                    axios
                        .get(url, config)
                        .then(response =>{
                            let userInfo = {
                                id: response.data[0].id,
                                password: response.data[0].password,
                                name: response.data[0].name,
                                // age: req.body.data.age,
                                // state: req.body.data.data.state,
                                // sex: req.body.sex,
                                // profile_image: req.body.data.profile_image,
                                // birth: req.body.data.birth,
                                // phone: req.body.phone,
                                // mail: req.body.data.mail,
                                // interest: req.body.data.interest,
                                // name: response.data.name
                            }
                            commit('loginSuccess', userInfo)
                            console.log(response)
                            console.log('로그인성공!!!!!!!!')
                            console.log(userInfo)
                            alert(userInfo.name + '님 환영합니다.')
                        })
                        .catch(()=> {
                            alert('이메일과 비밀번호를 확인하세요.')
                        })
                    console.log(res)
                })
                .catch(() =>{
                    alert('이메일과 비밀번호를 확인하세요.')
                })
        },
        logout({commit}){
            commit("logout")
            router.push({name: "home"})
        }

    }
})