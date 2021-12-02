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
<!--              <input :disabled ="this.newname === this.name" class="ok_btn" type="submit" value="확인" @click="Save"/>-->
<!--              <input class="cancle_btn" type="submit" value="취소"/>-->
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
import getUserInfo from "@/services/users/getUserInfo";
import updateUser from "@/services/updateUsers";

export default {
name: "Name",
  data() {
    return {
      check: 0,
      newname: '',
      user_id: 'suloreum',

      User: [],
      user: '',
      object_id: '',
      id: '',
      name: '',
      password: '',
      age: '',
      state: '',
      sex: '',
      profile_image: '',
      birth: '',
      phone: '',
      mail: '',
      interest: [],
      challenge: {},
      weight: '',
      liked_post: [],

      update_user_data: {}
    }
  },
  async created() {
    try{
      this.Users = await getUserInfo.getUsers()
      this.user = Object.values(this.Users).filter(users => users.id === this.user_id)
      this.id = this.user[0].id
      this.object_id = this.user[0]._id
      this.name = this.user[0].name
      this.newname = this.user[0].name
      this.password = this.user[0].password
      this.age = this.user[0].age
      this.state = this.user[0].state
      this.sex = this.user[0].sex
      this.profile_image = this.user[0].profile_image
      this.birth = this.user[0].birth
      this.phone = this.user[0].phone
      this.mail = this.user[0].mail
      this.interest = this.user[0].interest
      this.challenge = this.user[0].challenge
      this.weight = this.user[0].weight
      this.liked_post = this.user[0].liked_post
    }catch (err){
      this.error = console.log(err);
    }
  },
  methods: {
    typing(e) {
      this.newname = e.target.value
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
    updateUser: function() {
      this.update_user_data = {
        id: this.id,
        name: this.newname,
        password: this.password,
        age: this.age,
        state: this.state,
        sex: this.sex,
        profile_image: this.profile_image,
        birth: this.birth,
        phone: this.phone,
        mail: this.mail,
        interest: this.interest,
        challenge: this.challenge,
        weight: this.weight,
        liked_post: this.liked_post
      }

      updateUser.UpdateUser(this.update_user_data, this.object_id)
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
  padding-top: 60%;
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
  height: 50px;
  margin-top: 20px;
  margin-right: 25%;
  float: right;
  border-radius: 2px;
  border: 1px solid lightgray;
}

.username2 {
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

  .name_revise {
    width: 400px
  }
}
</style>