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
                <th class="line"> 닉네임</th>
                <td class="line"> 술오름</td>
              </tr>
              <tr>
                <th class="line"> 생년월일</th>
                <td class="line"> 2018-01-01 </td>
              </tr>
              <tr>
                <th class="line"> 성별</th>
                <td class="line">  여</td>
              </tr>
              <tr>
                <th class="line"> 챌린지</th>
                <td class="line"> 다이어트</td>
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
                  <td class="line">  suloreum@naver.com</td>
                </tr>
                <tr>
                  <th class="line"> 전화번호</th>
                  <td class="line"> 010-1234-5678 </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="etc_info">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "userInfo",
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
        // var text = $(this).text();
        // alert(text);
      });
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

.etc_info {
  position: relative;
  margin-top: 10px;
  width: 100%;
  padding-top: 30%;
  border-radius: 16px;
  border: 1px solid lightgray;
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
}

</style>