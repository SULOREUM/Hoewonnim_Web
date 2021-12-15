<template>
  <div class="container">
    <div class="content">
      <div class="container_inside">
        <div class="title">
          사용자 정보 수정
        </div>
        <div class="sub_title">
          도전을 수정하실 수 있습니다.
        </div>
        <div class="challenge_revise">
          <div class="challenge_revise_content">
            <div class="challenge_area">
              <select class="challenge">
                <option>도전</option>
                <option value="Diet">다이어트</option>
                <option value="Home_training">홈트레이닝</option>
                <option value="Health">건강</option>
              </select>
              <select class="challenge">
                <option>기간</option>
                <option value="1">1개월</option>
                <option value="2">2개월</option>
                <option value="3">3개월</option>
              </select>
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
  name: "Name",
  computed:{
    ...mapState(["userInfo"])
  },
  data() {
    return {
      User: [],
      new_challenge: '',
      new_Challenge_date: ''
    }
  },
  async created() {
    this.User = this.$store.state.userInfo

  },
  methods: {
    ok: function() {
      this.updateUser()
    },
    cancle: function() {
      this.$router.go(-1)
    },
    updateUser: function() {
      // this.$store.commit('changeName', this.newName)
      // this.User.name = this.newName
      //
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
  width: 35%;
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

.challenge_revise {
  position: relative;
  width:500px;
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid lightgray;
}

.challenge_revise:before {
  content: "";
  display: block;
  padding-top: 50%;
}

.challenge_revise_content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.challenge_area {
  width: 100%;
  height: 65%;
}

.btn_area {
  width: 75%;
  height: 30%;
  margin-top: 5%;
}

/* input */
.challenge {
  width: 70%;
  height: 30%;
  margin-top: 20px;
  margin-right: 25%;
  float: right;
  border-radius: 2px;
  border: 1px solid lightgray;
}

.cancle_btn {
  width: 25%;
  height: 60%;
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
  height: 60%;
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
    margin-left: 3%;
  }

  .challenge_revise {
    width: 400px;
  }

}
</style>