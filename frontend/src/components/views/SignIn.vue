<template>
  <div class="wrapper">
    <div class="logo">
      <router-link style="color: black" to="/">Hoewonnim</router-link>
    </div>
    <input type="text" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button class="login_button">로그인</button>
    <div class="g-signin2" data-onsuccess="onSignIn"> </div> <!--구글 로그인-->


    <button @click="googleLoginBtn" class="login_button"> 구글 로그인
    </button>
    <div id="my-signin2" style="display: none"></div>

    <img
        class="social"
        alt="kakao logo"
        src="@/assets/kakao_login_large_wide.png"
        @click="kakaoLoginLink"/><br>
    <span>새로 오셨나요? <span><router-link to="/join" class="join">회원가입하기</router-link></span></span>
    <button class="login_button" @click="signout">로그아웃</button>
  </div>
</template>

<script>
export default {
  name: "sign_up",
  data(){
    return{
      googleSignInParams:{
        clientId: '516796777908-c0iquqolepstq9ft7ucu23rprqs5qf2e.apps.googleusercontent.com'
      }

    }
  },
  methods: {
    kakaoLoginLink(){
      const params = {
        redirectUri: 'http://localhost:8080/auth',
      };
      window.Kakao.Auth.authorize(params);
      console.log('카카오 인증 코드');
    },
    signout(){
      const authInst = window.gapi.auth2.getAuthInstance();
      authInst.signOut().then(() => {
        console.log('User Signed Out')
      });
    },

    //구글 custom 버튼
    googleLoginBtn(){
      window.gapi.signin2.render('my-signin2',{
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'dark',
        onsuccess: this.onSuccess,
        onfailure: this.onFailure,
      });
      setTimeout(function (){
        document.querySelector('.abcRioButton').click();
      }, 1500)
    },
    async onsuccess(googleUser){
      const user_join_type = "g"
      const googleEmail = googleUser.getBasicProfile().pu
      console.log(googleEmail)

      const profile = googleUser.getBasicProfile();
      console.log('email: ' + profile.getEmail());
      const res = await fetch('https://localhost:8080/sign_up', {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
          email: `${googleEmail}`,
          user_join_type: user_join_type
        }),
      })
      const data = await res.json();
      this.checkSnSLogin(data, googleEmail,user_join_type);
    },
    onFailure(error) {
      console.log(error);
    },
  },

  // onSignedIn(googleUser) {
  //   const signoutElement = document.getElementById('signout');
  //   signoutElement.innerHTML =
  //       'Sign out ' + googleUser.getBasicProfile().getEmail();
  // }
  // },
};
</script>

<style scoped>
.wrapper{
  margin-top: 5%;
  width: 30%;
  position: relative;
  margin-left: 35%;
  margin-right: 35%;
}

.logo{
  width: 10%;
  position: center;

  font-family: 'SBAggroB',serif;
  color: black;
  margin: 20px;
}


.login_button{
  width: 100%;
  margin-top: 10px;
  background:#7994DB;
  color:#fff;
  border:none;
  position:relative;
  height:50px;
  font-size:15px;
  padding:0 15px;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
}
.login_button:hover{
  background:#fff;
  color:#7994DB;
}
.login_button:before,.login_button:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: #7994DB;
  transition:400ms ease all;
}
.login_button:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
.login_button:hover:before,.login_button:hover:after{
  width:100%;
  transition:800ms ease all;
}
.social{
  width: 100%;
  border:none;
  position:relative;
  font-size:13px;
  padding: 0 15px;
  cursor:pointer;
  transition:800ms ease all;
  outline:none;
  margin-bottom: 20px;
}
.join{
  color: #7994DB;
  font-weight: bolder;
}
input{
  width: 100%;
  padding: 15px;
  font-size: 0.8em;
}

p{
  margin-top: 40px;
  font-size: 13px;
}
p a{
  text-decoration: underline;
  cursor: pointer;
}
button{
  margin: 10px;
  border-radius: 5px;
}
span{
  font-size: 15px;
  margin-top: 30px;
}
img{
  object-fit: cover;
}
input{
  outline-color: #7994DB;
}
</style>