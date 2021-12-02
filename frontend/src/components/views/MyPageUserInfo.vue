<template>
  <div class="container">
    <div class="content">
      <div class="container_inside">
        <div class="title">
          사용자 정보
        </div>
        <div class="sub_title">
          프로필 및 정보를 수정하실 수 있습니다.
        </div>
        <div class="user_info">
          <div class="user_info_inside">
            <table id="table" class="table">
              <colgroup>
                <col style="width:20%">
                <col style="width:70%">
                <col style="width:10%">
              </colgroup>
              <tr>
                <th class="line"> 사진</th>
                <td class="line">  </td>
              </tr>
              <tr>
                <th class="line" @click="nameChange()"> 닉네임</th>
                <td class="line" @click="nameChange()"> {{name}}</td>
              </tr>
              <tr>
                <th class="line"> 생년월일</th>
                <td class="line">  {{birth}}</td>
              </tr>
              <tr>
                <th class="line"> 성별</th>
                <td class="line">  {{sex}}</td>
              </tr>
              <tr>
                <th> 챌린지</th>
                <td> {{challenge}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="contact_info">
          <div class="container_inside">
            <div class="user_info_inside">
              <table id="contact_table" class="table">
                <colgroup>
                  <col style="width:20%">
                  <col style="width:70%">
                  <col style="width:10%">
                </colgroup>
                <tr>
                  <th class="line"> 이메일</th>
                  <td class="line">  {{email}}</td>
                </tr>
                <tr>
                  <th> 전화번호</th>
                  <td> {{phone}} </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div>
          <div class="etc_info_left"></div>
          <div class="etc_info_right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from "jquery";
import getUserInfo from "@/services/users/getUserInfo";

export default {
  name: "userInfo",
  data() {
    return {
      User: [],
      name: '',
      birth: '',
      sex: '',
      challenge: '',
      email: '',
      phone: '',
      id: 'suloreum',
      tr: '',
      td: '',
      idx: '',
      cont: ''
    }
  },
  async created() {
    try{
      this.Users = await getUserInfo.getUsers()
      this.user = Object.values(this.Users).filter(users => users.id === this.id)
      this.name = this.user[0].name
      this.birth = this.user[0].birth
      this.sex = this.user[0].sex
      this.challenge = Object.keys(this.user[0].challenge).toString()
      this.email = this.user[0].mail
      this.phone = this.user[0].phone
    }catch (err){
      this.error = console.log(err);
    }
  },
  mounted() {
    $(document).ready(function(){
      changeColor();
      clickTd();
      clickTr();
    })
    function changeColor(){
      $('#table tr').mouseover(function(){
        $(this).addClass('changeColor');
      }).mouseout(function() {
        $(this).removeClass('changeColor');
      });
      $('#contact_table tr').mouseover(function(){
        $(this).addClass('changeColor');
      }).mouseout(function() {
        $(this).removeClass('changeColor');
      });
    }
    function clickTd(){
      $("#table tr td").click(function(){
        // var text = $(this).text();
        // alert(text);
      });
    }
    function clickTr(){
      $("#table tr").click(function(){
        this.tr = $(this);
        this.td = this.tr.children();
        this.idx = this.td.eq(0).text()
        this.cont = this.td.eq(1).text()
      });
    }
  },
  methods: {
    nameChange: function() {
      this.$router.push({name: 'Name'})
    }
  }
}


</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@700&display=swap');

.changeColor {
  background-color: #eeeeee;
}

.container {
  /*background: rgb(230, 232, 233);*/
  font-size: 1em;
}

.content {
  position: relative;
  background-color: white;
  width: 50%;
  height: 1200px;
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

.user_info {
  position: relative;
  margin-top: 20px;
  width: 100%;
  /*height: 35%;*/
  border-radius: 16px;
  border: 1px solid lightgray;
  padding-top: 40%;
}

.user_info_inside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.table {
  width: 100%;
  height: 100%;
}

.table th {
  color: black;
  font-size: 0.7em;
}

.table tr {

}

.line {
  border-bottom: 1px solid lightgray;
}

.contact_info {
  position: relative;
  margin-top: 10px;
  width: 100%;
  padding-top: 25%;
  border-radius: 16px;
  border: 1px solid lightgray;
}

/*.etc_info {*/
/*  position: relative;*/
/*  margin-top: 10px;*/
/*  width: 50%;*/
/*  padding-top: 30%;*/
/*  border-radius: 16px;*/
/*  border: 1px solid lightgray;*/
/*  float: top;*/
/*  float: left;*/
/*}*/

.etc_info_left {
  position: relative;
  margin-top: 10px;
  width: 49%;
  padding-top: 30%;
  border-radius: 16px;
  border: 1px solid lightgray;
  float: left;
}

.etc_info_right {
  position: relative;
  margin-top: 10px;
  width: 49%;
  padding-top: 30%;
  border-radius: 16px;
  border: 1px solid lightgray;
  float: right;
}

/*.info_revise {*/
/*  position: relative;*/
/*  margin-top: 10px;*/
/*  width: 100%;*/
/*  padding-top: 5%;*/
/*  border-radius: 16px;*/
/*  border: 1px solid lightgray;*/
/*}*/

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
}

</style>