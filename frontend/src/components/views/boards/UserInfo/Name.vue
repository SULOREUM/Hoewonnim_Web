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
              <input v-model="username" id="username" type="text" placeholder="성"/>
              <input v-model="username2" id="username2" type="text" placeholder="이름"/>
            </div>
            <div class="btn_area">
              <input id="ok_btn" type="submit" value="확인"/>
              <input id="cancle_btn" type="submit" value="취소"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
name: "Name",
  data() {
    return {

    }
  },
  async created() {

  },
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
#username {
  width: 70%;
  height: 50px;
  margin-top: 20px;
  margin-right: 25%;
  float: right;
  border-radius: 2px;
  border: 1px solid lightgray;
}

#username2 {
  width: 70%;
  height: 50px;
  margin-top: 20px;
  margin-right: 25%;
  float: right;
  border-radius: 2px;
  border: 1px solid lightgray;
}

#cancle_btn {
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

#ok_btn {
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