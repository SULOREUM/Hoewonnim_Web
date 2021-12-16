<template>
  <div class="container">
    <div class="content">
      <div class="container_inside">
        <div class="title">
          사용자 정보 수정
        </div>
        <div class="sub_title">
          닉네임을 수정하실 수 있습니다.
        </div>
        <div class="name_revise">
          <div class="name_revise_content">
            <div class="name_area">
              <input class="username" type="text" placeholder="성"/>
              <input class="username2" type="text" v-on:input="typing" v-bind:value="name" placeholder="이름">
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
      name : '',
      newName : ''
    }
  },
  async created() {
    this.User = this.$store.state.userInfo
    this.name = this.$store.state.userInfo.name
    this.newName = this.$store.state.userInfo.name
  },
  methods: {
    typing(e) {
      this.newName = e.target.value
    },
    ok: function() {
      if (this.name === this.newname) {
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
      this.$store.commit('changeName', this.newName)
      this.User.name = this.newName

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

.name_revise {
  position: relative;
  width:500px;
  margin-top: 20px;
  border-radius: 16px;
  border: 1px solid lightgray;
}

.name_revise:before {
  content: "";
  display: block;
  padding-top: 50%;
}

.name_revise_content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.name_area {
  width: 100%;
  height: 65%;
}

.btn_area {
  width: 75%;
  height: 30%;
  margin-top: 5%;
}

/* input */
.username {
  width: 70%;
  height: 30%;
  margin-top: 20px;
  margin-right: 25%;
  float: right;
  border-radius: 2px;
  border: 1px solid lightgray;
}

.username2 {
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

  .name_revise {
    width: 400px;
  }

}
</style>