<template>
  <header>
    <div class="header">

      <Slide :closeOnNavigation="true">
        <router-link id="logo" to="/" v-on:click="clickburger()"><span>Hoewonnim</span></router-link>
        <router-link id="list" to="/views/boards/List" v-on:click="clickburger()"> <span>자유게시판</span> </router-link>
        <router-link id="qna" to="/views/boards/QnA" v-on:click="clickburger()"> <span>질문게시판</span> </router-link>
        <router-link id="promo" to="/views/boards/Promotion" v-on:click="clickburger()"> <span>홍보게시판</span> </router-link>
        <router-link id="photo" to="/views/boards/Photo" v-on:click="clickburger()"> <span>자랑게시판</span> </router-link>
        <router-link id="join" to="/views/SignIn" v-on:click="clickburger()" v-if="userInfo==null"> <span>Sign In</span> </router-link>
        <router-link id="logout" to="/views/SignIn" @click.native="logout" v-if="userInfo != null"> <span>LogOut</span> </router-link>
        <router-link id="sign_up" to="/views/SignUp" v-on:click="clickburger()" v-if="userInfo==null"> <span>Sign Up</span> </router-link>
        <router-link id="info" to="/views/MyPage" v-on:click="clickburger()" v-if="userInfo != null"> <span>MyPage</span> </router-link>
      </Slide>

      <div class="logo">
        <router-link to="/"><span v-on:click="clickburger()">Hoewonnim</span></router-link>
      </div>

      <div class="items">
        <div class="item" id="sub-list" v-on:click="clickMenu($event)">
          <router-link to="/views/boards/List"><span>자유</span></router-link>
        </div>
        <div class="item" id="sub-qna" v-on:click="clickMenu($event)">
          <router-link to="/views/boards/QnA"><span>질문</span></router-link>
        </div>
        <div class="item" id="sub-promo" v-on:click="clickMenu($event)">
          <router-link to="/views/boards/Promotion"><span>홍보</span></router-link>
        </div>
        <div class="item" id="sub-photo" v-on:click="clickMenu($event)">
          <router-link to="/views/boards/Photo"><span>자랑</span></router-link>
        </div>
      </div>
      <div class="signup">
        <router-link v-if="userInfo == null" to="/views/SignIn"><span>{{message1}}</span></router-link>
        <router-link v-else-if="userInfo != null" to="/views/SignIn" @click.native="logout"><span>{{message2}}</span></router-link>
        <router-link v-if="userInfo == null" to="/views/SignUp"><span>Sign Up</span></router-link>
        <router-link v-if="userInfo != null" to="/views/MyPage"><span>My Page</span></router-link>
      </div>
    </div>
  </header>
</template>

<script scopped>
import {Slide} from 'vue-burger-menu'  ;
import {mapState, mapActions} from 'vuex'

export default {
  components: {
    Slide // Register your component
  },
  computed:{
    ...mapState(["isLogin", "isLoginError", "userInfo"])
  },
  data() {
    return {
      message1: "SignIn",
      message2: "LogOut"
    }
  },
  methods: {
    ...mapActions(["logout"]),
    clickMenu: function (event) {
      let clicked = document.getElementById(event.currentTarget.id);
      let menu = document.getElementsByClassName("item");

      Array.from(menu).forEach((m) => {
        m.classList.remove("active")
      })
      clicked.classList.add("active");
    }
    , clickburger: function () {
      let menu = document.getElementsByClassName("item");

      Array.from(menu).forEach((m) => {
        m.classList.remove("active")
      })
    },
  }
}


</script>

<style scopped>

@font-face {
  font-family: 'SBAggroB';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SBAggroB.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

Header {
  background-color: white;

}

.header {
  display: flex;
  font-size: 0.7em;
  height: 50px;
  line-height: 58px;
  margin: 0px 20px 20px 60px;
}

.logo {
  width: 10%;
}

.logo span {
  font-family: 'SBAggroB';
  color: black;
}

.items {
  display: flex;
  width: 70%;
  flex-direction: row;
  margin-left: 50px;
}

.items .item {
  margin-right: 10px;
}

.items .item a {
  color: black;
  vertical-align: middle;
  padding: 5px 10px;
  border-radius: 5px;
}

.items .item.active a {
  background-color: #7994db;
  color: white;
}


.items .item:hover a {
  background-color: #7994db;
  color: white;
}


.signup {
  width: 30%;
  text-align: right;
}

.signup span {
  padding: 5px;
  color: #7994db;
  border-radius: 5px;
  margin-left: 5px;
  font-size: 0.8em;
}

a {
  text-decoration: none;
}

.bm-burger-button {
  position: fixed;
  width: 20px;
  height: 17px;
  left: 20px;
  top: 20px;
  cursor: pointer;
}

.bm-burger-bars {
  background-color: black;
}

.bm-cross {
  background: black;
}

.bm-cross-button.cross-style {
  left: 20px;
  top: 50px;
}

.bm-cross-button {
  height: 50px;
  width: 50px;
}

.bm-menu {
  height: 100%; /* 100% Full-height */
  width: 0; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 999; /* Stay on top */
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px; /* Place content 60px from the top */
  transition: 0.5s; /*0.5 second transition effect to slide in the sidenav*/
}

.bm-item-list {
  margin-top: 50px;
}

.bm-item-list a span {
  font-size: 0.9em;
  color: black;
  margin-left: 30px;
}

.bm-item-list a#logo span {
  font-size: 1.2em;
  font-family: 'SBAggroB';
}

.bm-item-list a#logo img {
  width: 150px;
  margin-left: 20px;
}

@media (max-width: 767px) {

  .header {
    margin: 0px;
  }

  .logo {
    width: 100%;
  }

  .items {
    display: none;
  }

  .signup {
    display: none;
  }

  .bm-burger-button {
    position: fixed;
    width: 20px;
    height: 18px;
    left: 10px;
    top: 18px;
    cursor: pointer;
  }

}


</style>