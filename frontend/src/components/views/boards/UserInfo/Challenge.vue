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
              <select class="challenge" id="challenge_name" @change="change_challenge_name">
                <option selected disabled>도전</option>
                <option value="Health">건강</option>
                <option value="Pilates">필라테스</option>
                <option value="Diet">다이어트</option>
                <option value="Home_Training">홈트레이닝</option>
              </select>
              <select class="challenge" id="challenge_date" @change="change_challenge_date">
                <option selected disabled>기간</option>
                <option value="1">1개월</option>
                <option value="2">2개월</option>
                <option value="3">3개월</option>
                <option value="4">4개월</option>
                <option value="5">5개월</option>
                <option value="6">6개월</option>
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
      new_challenge_date: 0,
      new_challenge_dict: {},
      chk_name: false,
      chk_date: false
    }
  },
  async created() {
    this.User = this.$store.state.userInfo

  },
  methods: {
    ok: function() {
      if (this.chk_date === false && this.chk_name === false) {
        alert("도전과 기간을 선택해주세요!")
      }
      else if (this.chk_date === false && this.chk_name === true) {
        alert("기간을 선택해주세요!")
      }
      else if (this.chk_date === true && this.chk_name === false) {
        alert("도전을 선택해주세요!")
      }
      else if (this.chk_date === true && this.chk_name === true) {
        const target = document.getElementById("challenge_name");
        const target2 = document.getElementById("challenge_date");

        this.new_challenge = target.options[target.selectedIndex].value
        this.new_challenge_date = Number(target2.options[target2.selectedIndex].value)

        let now = new Date()
        let endDay = this.getFormatDate(new Date(now.setMonth(now.getMonth() + this.new_challenge_date)))

        this.new_challenge_dict[this.new_challenge] = endDay
        console.log(this.new_challenge_dict)
        this.updateUser()
      }
    },
    cancle: function() {
      this.$router.go(-1)
    },
    updateUser: function() {
      this.$store.commit('updateChallenge', this.new_challenge_dict)
      this.User.challenge = this.new_challenge_dict

      updateUser.UpdateUser(this.User, this.User.object_id)
    },
    getFormatDate: function (date) {
      var year = date.getFullYear();
      var month = (1 + date.getMonth());
      month = month >= 10 ? month : '0' + month;
      var day = date.getDate();
      day = day >= 10 ? day : '0' + day;
      return  year + '-' + month + '-' + day;
    },
    change_challenge_name: function() {
      this.chk_name = true
    },
    change_challenge_date: function() {
      this.chk_date = true
    },
  }
}
</script>

<style scoped>

.container {
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