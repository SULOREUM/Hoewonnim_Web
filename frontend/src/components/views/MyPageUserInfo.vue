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
                <th class="line" @click="passwordChange()"> 비밀번호</th>
                <td class="line2" @click="passwordChange()">  비밀번호 변경</td>
                <td class="line" @click="passwordChange()"><img class="table_img" src="@/assets/right.png"/></td>
              </tr>
              <tr>
                <th class="line" @click="nameChange()"> 닉네임</th>
                <td class="line" @click="nameChange()"> {{User.name}}</td>
                <td class="line" @click="passwordChange()"><img class="table_img" src="@/assets/right.png"/></td>
              </tr>
              <tr>
                <th class="line" @click="birthChange()"> 생년월일</th>
                <td class="line" @click="birthChange()">  {{User.birth}}</td>
                <td class="line" @click="passwordChange()"><img class="table_img" src="@/assets/right.png"/></td>
              </tr>
              <tr>
                <th class="line" @click="sexChange()"> 성별</th>
                <td class="line" @click="sexChange()">  {{User.sex}}</td>
                <td class="line" @click="passwordChange()"><img class="table_img" src="@/assets/right.png"/></td>
              </tr>
              <tr>
                <th> 챌린지</th>
                <td> {{this.challenge}}</td>
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
                  <th class="line" @click="mailChange()"> 이메일</th>
                  <td class="line" @click="mailChange()">  {{User.mail}}</td>
                  <td class="line" ><img class="table_img" src="@/assets/right.png"/></td>
                </tr>
                <tr>
                  <th @click="phoneChange()"> 전화번호</th>
                  <td @click="phoneChange()"> {{User.phone}} </td>
                  <td class="line" @click="passwordChange()"><img class="table_img" src="@/assets/right.png"/></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from "jquery";
import {mapState} from 'vuex'


export default {
  name: "userInfo",
  computed:{
    ...mapState(["userInfo"])
  },
  data() {
    return {
      User: [],
      challenge: ''
    }
  },
  async created() {
    this.User = this.$store.state.userInfo
    this.challenge = Object.keys(this.User.challenge).toString()
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
    },
    birthChange: function() {
      this.$router.push({name: 'Birth'})
    },
    sexChange: function() {
      this.$router.push({name: 'Sex'})
    },
    mailChange: function() {
      this.$router.push({name: 'Email'})
    },
    phoneChange: function() {
      this.$router.push({name: 'Phone'})
    },
    passwordChange: function () {
      this.$router.push({name: 'Password'})
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

.table_img {
  max-width: 15%;
  color: #aaaaaa;
}

.line {
  border-bottom: 1px solid lightgray;
}

.line2 {
  font-size: 0.8em;
  color: dimgray;
  border-bottom: 1px solid lightgray;
}

.contact_info {
  position: relative;
  margin-top: 10px;
  width: 100%;
  padding-top: 25%;
  border-radius: 16px;
  border: 1px solid #d3d3d3;
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

/*.etc_info_left {*/
/*  position: relative;*/
/*  margin-top: 10px;*/
/*  width: 49%;*/
/*  padding-top: 30%;*/
/*  border-radius: 16px;*/
/*  border: 1px solid lightgray;*/
/*  float: left;*/
/*}*/

/*.etc_info_right {*/
/*  position: relative;*/
/*  margin-top: 10px;*/
/*  width: 49%;*/
/*  padding-top: 30%;*/
/*  border-radius: 16px;*/
/*  border: 1px solid lightgray;*/
/*  float: right;*/
/*}*/

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
    margin-left: 4%;
  }
}

</style>