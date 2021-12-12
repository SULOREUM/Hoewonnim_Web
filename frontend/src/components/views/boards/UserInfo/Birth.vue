<template>
  <div class="container">
    <div class="content">
      <div class="container_inside">
        <div class="title">
          사용자 정보 수정
        </div>
        <div class="sub_title">
          생년월일을 수정하실 수 있습니다.
        </div>
        <div class="birth_revise">
          <div class="birth_revise_content">
            <div class="birth_area">
              <input class="birth" v-model="year" type="text" maxlength="4" placeholder="년(4자)"/>
              <input class="birth" v-model="month" type="text"  maxlength="2" placeholder="월"/>
              <input class="birth" v-model="day"  type="text"  maxlength="2" placeholder="일"/>
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
// import getUserInfo from "@/services/users/getUserInfo";
import updateUser from "@/services/updateUsers";
import {mapState} from 'vuex';

export default {
  name: "Birth",
  computed:{
    ...mapState(["userInfo"])
  },
  data() {
    return {
      year: '',
      month: '',
      day: '',
      birthArr: [],
      monthCheck: false,
      dayCheck: true,
      newBirth: '',
      User: []
    }
  },async created() {

    this.User = this.$store.state.userInfo
    this.object_id = this.$store.state.userInfo.object_id

    this.birthArr = this.$store.state.userInfo.birth.split('-')
    this.year = this.birthArr[0]
    this.month = this.birthArr[1]
    this.day = this.birthArr[2]
  },
  methods: {
    ok: function () {
      // month check
      if (this.month >= 1 && this.month <= 12) {
        this.monthCheck = true
      } else {
        alert("올바른 값을 입력하세요! ( 01 ~ 12 )")
      }

      // day check
      if (this.day >= 1 && this.day <= 31) {
        this.dayCheck = true
      } else {
        alert("올바른 값을 입력하세요! ( 01 ~ 31 )")
      }

      if (this.monthCheck && this.dayCheck) {
        this.newBirth = this.year + '-' + this.month + '-' + this.day
        this.updateUser()
      }
    },
    cancle: function() {
      this.$router.go(-1)
    },
    updateUser: function () {
      this.$store.commit('changeBirth', this.newBirth)
      this.User.birth = this.newBirth

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

.birth_revise {
  position: relative;
  width: 500px;
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid lightgray;
}

.birth_revise:before {
  content: "";
  display: block;
  padding-top: 60%;
}

.birth_revise_content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.birth_area {
  width: 100%;
  height: 75%;
}

.btn_area {
  width: 75%;
  height: 25%;
}

/* input */
.birth {
  width: 70%;
  height: 20%;
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
  margin-top: 3%;
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
  margin-top: 3%;
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

  .birth_revise {
    width: 400px
  }

}
</style>