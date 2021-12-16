<template>
  <div class="container">
    <div class="content">
      <div class="container_inside">
        <div class="title">
          사용자 정보 수정
        </div>
        <div class="sub_title">
          성별을 수정하실 수 있습니다.
        </div>
        <div class="sex_revise">
          <div class="sex_revise_content">
            <div class="sex_area">
              <select class = "sex" id="sex">
                <option>성별</option>
                <option value="Male"  v-if="sex === 'Female'">남자</option>
                <option value="Female" v-if="sex === 'Male'">여자</option>
                <option value="Male"  v-if="check">남자</option>
                <option value="Female" v-if="check">여자</option>
                <option value="Male" v-if="sex === 'Male'" selected >남자</option>
                <option value="Female" v-if="sex === 'Female'" selected>여자</option>
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
  name: "Sex",
  computed:{
    ...mapState(["userInfo"])
  },
  data() {
    return {
      User: [],
      sex: '',
      newSex: '',
      check: false
    }
  },
  async created() {
    this.User = this.$store.state.userInfo
    this.sex = this.$store.state.userInfo.sex
    this.newSex = this.$store.state.userInfo.sex

    this.sexCheck()
  },
  methods: {
    ok: function() {
      var target = document.getElementById("sex");
      this.newSex = target.options[target.selectedIndex].value

      if (this.sex === this.newSex) {
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
    sexCheck: function() {
      if (this.User.sex !== 'Female' & this.User.sex !== 'Male') {
        this.check = true
      }
    },
    updateUser: function() {
      this.$store.commit('changeSex', this.newSex)
      this.User.sex = this.newSex

      updateUser.UpdateUser(this.User, this.User.object_id)
    }
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

.sex_revise {
  position: relative;
  width:500px;
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid lightgray;
}

.sex_revise:before {
  content: "";
  display: block;
  padding-top: 40%;
}

.sex_revise_content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.sex_area {
  width: 100%;
  height: 55%;
}

.btn_area {
  width: 75%;
  height: 30%;
  margin-top: 5%;
}

/* input */
.sex {
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
    margin-left: 3%;
  }

  .sex_revise {
    width: 400px
  }
}
</style>
