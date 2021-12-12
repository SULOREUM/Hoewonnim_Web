<template>
  <div class="container">
    <div class="content">
      <div class="container_inside">
        <div class="title">
          사용자 정보 수정
        </div>
        <div class="sub_title">
          전화번호를 수정하실 수 있습니다.
        </div>
        <div class="phone_revise">
          <div class="phone_revise_content">
            <div class="phone_area">
              <input type="text" maxlength="100" class="phone" v-on:input="typing" v-model="newPhone">
            </div>
            <div class="btn_area">
              <button class="ok_btn" @click="ok">확인</button>
              <button class="cancle_btn" @click="cancle">취소</button>
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
  name: "Phone",
  computed:{
    ...mapState(["userInfo"])
  },
  data() {
    return {
      User: [],
      phone: '',
      newPhone: ''
    }
  },
  async created() {
    this.User = this.$store.state.userInfo
    this.phone = this.$store.state.userInfo.phone
    this.newPhone = this.$store.state.userInfo.phone
  },
  methods: {
    typing(e) {
      this.newPhone = e.target.value
    },
    ok: function() {
      if (this.phone === this.newPhone) {
        alert("바뀐게 없어용")
      }
      else {
        alert("바뀜")
        this.updateUser()
      }
    },
    cancle: function() {
      this.$router.go(-1)
    },
    updateUser: function() {
      this.$store.commit('changePhone', this.newPhone)
      this.User.phone = this.newPhone

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

.phone_revise {
  position: relative;
  width:500px;
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid lightgray;
}

.phone_revise:before {
  content: "";
  display: block;
  padding-top: 40%;
}

.phone_revise_content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.phone_area {
  width: 100%;
  height: 55%;
}

.btn_area {
  width: 75%;
  height: 30%;
  margin-top: 5%;
}

/* input */
.phone {
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
    margin-left: 10%;
  }

  .phone_revise {
    width: 400px
  }
}
</style>
