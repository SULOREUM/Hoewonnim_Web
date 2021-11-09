<template>
  <!--  <div>-->
  <!--    <div class="content">-->
  <!--      <h3><strong>사용자 정보</strong></h3>-->
  <!--      <h5>개인 정보를 수정할 수 있습니다.</h5>-->
  <!--      <table class="userSettingTable">-->
  <!--        <colgroup>-->
  <!--          <col style="width:30%">-->
  <!--          <col style="width:70%">-->
  <!--        </colgroup>-->
  <!--        <tr>-->
  <!--          <td class="txt_left">프로필 사진</td>-->
  <!--          <td>-->
  <!--            <div class="userImage"></div>-->
  <!--          </td>-->
  <!--        </tr>-->
  <!--      </table>-->
  <!--    </div>-->
  <!--  </div>-->
  <div class="container">
    <div class="content">
      <div class="container_inside">
        <div class="title">
          사용자 정보
        </div>
        <div class="sub_title">
          프로필 및 정보를 수정하실 수 있습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userInfo"
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@700&display=swap');

.container {
  background: rgb(230, 232, 233);
}

.content {
  position: relative;
  background-color: white;
  width: 60%;
  height: 1200px;
  margin-left: 20%;

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

@media (max-width: 767px) {
  .container {
    font-size: 0.7em;
  }
}

/*.content {*/
/*  width: 60%;*/
/*  height: 1200px;*/
/*  margin-left: 20%;*/
/*  background-color: silver;*/
/*  text-align: left;*/
/*}*/
/*.userSettingTable {*/
/*  width: 100%;*/
/*}*/
/*.userSettingTable tr {background-color: #22a8d8;height: 240px}*/
/*.userSettingTable th, .userSettingTable td{*/
/*  border-bottom:1px solid #eee;*/
/*  padding:10px;*/
/*  font-size: 18px;*/
/*}*/
/*.userSettingTable td.txt_left{*/
/*  margin-left: 10px;*/
/*  text-align: left;*/
/*  font-size: 15px;*/
/*  font-weight: bold;*/
/*}*/
/*.userImage {*/
/*  background-color: red;*/
/*  height: 120px;*/
/*  width: 120px;*/
/*  margin-left: 3%;*/
/*  margin-top: 1%;*/
/*}*/
</style>