<template>
  <div class="container">
    <div class="content">
      <div class="container_inside">
        <div class="title">
          사용자 정보 수정
        </div>
        <div class="sub_title">
          비밀번호를 수정하실 수 있습니다.
        </div>
        <div class="password_revise">
          <div class="password_revise_content">
            <div class="password_area">
              <input type="password" maxlength="100" class="mail" v-on:input="checking" v-model="checkPassword" placeholder="원래 비밀번호를 입력해주세요.">
              <input type="password" maxlength="100" class="mail" v-on:input="typing" v-model="newPassword" placeholder="새로운 비밀번호를 입력해주세요.">
              <input type="password" maxlength="100" class="mail" v-on:input="typing2" v-model="newPassword2" placeholder="새로운 비밀번호를 다시 한번 입력해주세요.">
            </div>
            <div class="btn_area">
              <button class="ok_btn" @click="ok">확인</button>
              <button class="cancle_btn">취소</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import updateUser from "@/services/updateUsers";
import {mapState} from "vuex";

export default {
  name: "Password",
  computed:{
    ...mapState(["userInfo"])
  },
  data() {
    return {
      User: [],
      password: '',
      newPassword: '',
      newPassword2: '',
      checkPassword: ''
    }
  },
  async created() {
    this.User = this.$store.state.userInfo
    this.password = this.$store.state.userInfo.password
  },
  methods: {
    typing(e) {
      this.newPassword = e.target.value
    },
    typing2(e) {
      this.newPassword2 = e.target.value
    },
    checking(e) {
      this.checkPassword = e.target.value
    },
    ok: function() {
      if (this.password === this.checkPassword) {
        if (this.newPassword !== '') {
          if (this.newPassword === this.newPassword2) {
            alert("비밀번호가 변경되었습니다!")
            this.updateUser()
          }
          else {
            alert("새 비밀번호가 일치하지 않습니다.")
          }
        }
        else {
          alert("새 비밀번호를 입력해주세요!")
        }
      }
      else {
        alert("기존 비밀번호를 확인해주세요!")
      }
    },
    updateUser: function() {
      this.$store.commit('changePassword', this.newPassword)
      this.User.password = this.newPassword

      updateUser.UpdateUser(this.User, this.User.object_id)
    }
  }
}
</script>

<style scoped>
.container {
  /*background: rgb(230, 232, 233);*/
  font-size: 1em;
}

.content {
  position: relative;
  background-color: white;
  width: 40%;
  margin-left: 25%;
}

.container_inside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.title {
  margin-top: 10px;
  text-align: left;
  font-size: 1em;
  font-family: 'Gothic A1', sans-serif;
}

.sub_title {
  margin-top: 10px;
  text-align: left;
  font-size: 0.6em;
  font-family: 'Gothic A1', sans-serif;
}

.password_revise {
  position: relative;
  width:500px;
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid lightgray;
}

.password_revise:before {
  content: "";
  display: block;
  padding-top: 60%;
}

.password_revise_content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.password_area {
  width: 100%;
  height: 65%;
}

.btn_area {
  width: 75%;
  height: 30%;
  margin-top: 10%;
}

/* input */
.mail {
  width: 70%;
  height: 50px;
  margin-top: 20px;
  margin-right: 25%;
  float: right;
  border-radius: 2px;
  border: 1px solid lightgray;
}
.cancle_btn {
  width: 25%;
  height: 40px;
  float: right;
  margin-right: 20px;
  color: #fff;
  background-color: #7994DB;
  border: 0;
  cursor: pointer;
  border-radius: 2px;
}

.ok_btn {
  width: 25%;
  height: 40px;
  float: right;
  color: #fff;
  background-color: #7994DB;
  border: 0;
  cursor: pointer;
  border-radius: 2px;
}

@media all and (min-width: 768px) and (max-width: 1023px) {
  .container {
    font-size: 0.8em;
  }

  .content {
    width: 80%;
    margin-left: 10%;
  }
}

@media (max-width: 767px) {
  .container {
    font-size: 0.7em;
  }

  .content {
    width: 80%;
    margin-left: 5%;
  }

  .password_revise {
    width: 500px
  }
}
</style>
