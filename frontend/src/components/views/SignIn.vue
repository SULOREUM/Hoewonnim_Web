<template>
  <div class="all">
    <div class="loginForm">
      <a class="logo">
        <router-link style="color: black" to="/">Hoewonnim</router-link>
      </a>
      <div class="idForm">
        <input v-model="id" type="text" class="id" placeholder="ID">
      </div>
      <div class="passForm">
        <input v-model="password" type="password" class="pw" placeholder="PW">
      </div>
      <button type="submit" class="btn" @click="submit">LOG IN</button>
      <div class="bottomText">
        회원이 아니신가요? <router-link style="color: #6075eb" to="/views/Signup">sign up</router-link>
      </div>
      <button @click="postTest">테스트</button>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"
import axios from "axios"

export default {
  name: "Signin",
  data(){
    return{
      id:'',
      password:''
    }
  },
  computed:{
    ...mapState(["isLogin", "isLoginError"])
  },
  methods: {
    ...mapActions(["login"]),
    submit(){
      console.log(this.id);
      console.log(this.password);
      axios
        .get('http://localhost:3000/api/users')
        .then(res => {
        console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
        .then(function (){
        })
    },
    postTest(){
      // axios
      //   .post('http://localhost:3000/api/users', {id:"suloreum"})
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err =>{
      //     console.log(err)
      //   })
    }
  }
};
</script>

<style scoped>
.all{
  background-image: url("../../assets/background.jpg");
  background-size: 100% 100%;
}
.loginForm {
  position:absolute;
  width:300px;
  height:400px;
  padding: 30px;
  background-color: white;
  text-align:center;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  border-radius: 15px;
}

.loginForm a{
  text-align: center;
  margin: 30px;
}

.idForm{
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
}

.passForm{
  border-bottom: 2px solid #adadad;
  margin: 30px;
  padding: 10px 10px;
}

.id {
  width: 100%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}

.pw {
  width: 100%;
  border:none;
  outline:none;
  color: #636e72;
  font-size:16px;
  height:25px;
  background: none;
}

.btn {
  position:relative;
  left:40%;
  transform: translateX(-50%);
  margin-bottom: 40px;
  width:80%;
  height:40px;
  background: linear-gradient(125deg, #81ecec, #6c5ce7, #81ecec) left;
  background-size: 200%;
  color:white;
  font-weight: bold;
  border:none;
  cursor:pointer;
  transition: 0.4s;
  display:inline;
}

.btn:hover {
  background-position: right;
}

.bottomText {
  text-align: center;
  font-size: 0.9em;
}
.bottomText a{
  margin: 10px;
}
.logo{
  width: 10%;
  position: center;
  text-align: center;
  font-family: 'SBAggroB',serif;
  color: black;
  margin: 20px;
}

</style>