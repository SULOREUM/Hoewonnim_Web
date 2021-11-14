<template>
  <div class="container">
    <div class="side_container">
      <div class="side_container_inside">
        <div class="user_image">
          <div class="user_image_inside"><img src="../../assets/user.png"/></div>
        </div>
        <div class="user_name"><span><strong>{{ name }}</strong><router-link
            to="/views/MyPageUserInfo">  내 정보</router-link><br/></span>
          <span>{{ state }} / {{ sex }} / {{ age }}</span></div>
        <div class="user_like">
          <table class="userInfoTable">
            <colgroup>
              <col style="width:50%">
              <col style="width:50%">
            </colgroup>
            <tr v-for="data in userinfo" :key="data">
              <td class="txt_middle">{{ data }}</td>
              <td class="txt_middle">{{ data }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="content_container">
      <div class="content_container_inside">
        <div class="myChallenge">
          <div class="title">
            <div class="title_inside">
              <p>🔥 도전</p>
            </div>
          </div>
          <div class="square_left"></div>
          <div class="square_right"></div>
        </div>
        <div class="myInfo">
          <div class="title2">
            <div class="title_inside">
              <p>🔥 기록</p>
            </div>
          </div>
          <div class="square_left2"></div>
          <div class="square_right2"></div>
        </div>
        <div class="myActivity">
          <div class="title2">
            <div class="title_inside">
              <p>🔥 활동</p>
            </div>
          </div>
          <div class="post_left">
            <table class="tableList">
              <colgroup>
                <col style="width:10%">
                <col style="width:90%">
              </colgroup>
              <tr>
                <th>no.</th>
                <th>제목</th>
              </tr>
              <tr v-for="(post, idx) in posts" :key="idx">
                <td class="txt_middle">{{ posts.length - idx }}</td>
                <td class="txt_left"><a href="javascript:;">{{ post.title }}</a></td>
              </tr>
              <tr v-if="list.length == 0">
                <td colspan="2">작성한 글이 없습니다.</td>
              </tr>
            </table>
          </div>
          <div class="post_right">
            <table class="tableList">
              <colgroup>
                <col style="width:10%">
                <col style="width:90%">
              </colgroup>
              <tr>
                <th>no.</th>
                <th>제목</th>
              </tr>

              <tr v-for="(row, idx) in likedList" :key="idx">
                <td class="txt_middle">{{ row.idx }}</td>
                <td class="txt_left"><a href="javascript:;">{{ row.subject }}</a></td>
              </tr>
              <tr v-if="likedList.length == 0">
                <td colspan="2">좋아요 한 글이 없습니다.</td>
              </tr>
            </table>
          </div>
          <!--          <div class="square_left2"></div>-->
          <!--          <div class="square_right2"></div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from "jquery";
import updatePosts from "@/services/updatePosts";

const testData = [
  {
    "idx": 3,
    "subject": "안녕하세요"
  },
  {
    "idx": 1,
    "subject": "반가워요"
  }
]

const testData_userinfo = [
  "운동", "헬스", "필테"
]

export default {
  name: "MyPage",
  mounted() {
    $(document).ready(function () {
      var currentPosition = parseInt($(".side_container").css("top"));
      $(window).scroll(function () {
        var position = $(window).scrollTop();
        if (position < currentPosition) {
          if (window.matchMedia('(max-width: 767px)').matches) {
            $(".side_container").stop().animate({"top": 0 + "px"}, 1000);
          } else {
            $(".side_container").stop().animate({"top": currentPosition + "px"}, 1000);
          }
        } else {
          if (window.matchMedia('(max-width: 767px)').matches) {
            $(".side_container").stop().animate({"top": 0 + "px"}, 1000);
          } else {
            $(".side_container").stop().animate({"top": position + 1 / 2 * currentPosition + "px"}, 1000);
          }
        }
      });
    });
  },
  data() {
    return {
      name: '조시연',
      age: '23',
      state: '관리자',
      sex: '여',
      list: '', // 글 데이터 가져오기
      likedList: '',
      userinfo: '',
      ///
      posts: [],
      error: '',
      text: '',
      userName: ''
    }
  },
  async created() {
    this.list = testData
    this.userinfo = testData_userinfo
    this.userName = 'chosiyeon'
    try {
      this.posts = await updatePosts.getPosts();
      this.posts = Object.values(this.posts).filter(posts => posts.createdUser === this.userName)
    } catch (err) {
      this.error = err.message;
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');

.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 3%;
  font-size: 1em;
}

/* side info bar */

.side_container {
  max-height: 500px;
  /*overflow: hidden;*/
  position: relative;
  /*min-height: 500px;*/
  margin-right: 10px;
  width: 100%;
  height: 0;
  padding-top: 200%;
  font-size: 1em;
  background: rgba(202, 223, 224, 1);
  border-radius: 30px;
  font-family: 'Noto Sans KR', sans-serif;
}

.side_container_inside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.user_image {
  height: 50%;
  position: relative;
}

.user_image_inside {
  width: 60%;
  height: 60%;
  position: absolute;
  top: 10%;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border: 1px solid black;
}

.user_name {
  height: 10%;
  /*rgb(196, 221, 222);*/
}

.user_like {
  height: 40%;
}

.userInfoTable {
  width: 90%;
  height: 80%;
  margin-left: 5%;
  margin-right: 5%;
  padding-top: 10%;
}

.userInfoTable tr {
  background-color: darkslategrey;
}

.userInfoTable td {
  border-radius: 10px;
}

.userInfoTable th, .userInfoTable td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
  font-size: 0.8em;
  color: white;
}

.userInfoTable td.txt_middle {
  text-align: center;
  font-size: 0.7em;
}

/* content */

.content_container {
  max-height: 1200px;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 130%;
  margin-left: 2%;
}

.content_container_inside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.myChallenge {
  width: 100%;
  height: 15%;
  margin-top: 1%;
  margin-bottom: 3%;
}

.myInfo {
  width: 100%;
  height: 25%;
  margin-top: 1%;
  margin-bottom: 3%;
}

.myActivity {
  width: 100%;
  height: 25%;
  margin-top: 1%;
}

.inside {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.title {
  position: relative;
  width: 15%;
  height: 25%;
  text-align: center;
  vertical-align: center;
  font-size: 0.8em;
  font-family: 'Gothic A1', sans-serif;
  background: rgba(202, 223, 224, 1);
  border: 3px solid rgb(204, 223, 224);
  color: black;
  border-radius: 10px;
}

.title_inside {
  display: table;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;
}

.title2 {
  position: relative;
  width: 15%;
  height: 15%;
  text-align: center;
  vertical-align: center;
  font-size: 0.8em;
  font-family: 'Gothic A1', sans-serif;
  background: rgba(202, 223, 224, 1);
  border: 3px solid rgb(204, 223, 224);
  color: black;
  margin-top: 2%;
  border-radius: 10px;
}


/* my challenge */

.square_left {
  width:48%;
  height: 73%;
  float: left;
  margin-top: 2%;
  background-color: #2c3e50;
}

.square_right {
  width:48%;
  height: 73%;
  float: right;
  margin-top: 2%;
  background-color: #2c3e50;
}

/* my record */

.square_left2 {
  width:48%;
  height: 83%;
  float: left;
  margin-top: 2%;
  background-color: #2c3e50;
}

.square_right2 {
  width:48%;
  height: 83%;
  float: right;
  margin-top: 2%;
  background-color: #2c3e50;
}

/* my activity */

.post_left {
  width:48%;
  height: 83%;
  float: left;
  margin-top: 2%;
}

.post_right {
  width:48%;
  height: 83%;
  float: right;
  margin-top: 2%;
}

.tableList {
  width: 100%;
  margin: 0px auto;
}

.tableList th {
  border-top: 1px solid #888;
}

.tableList th, .tableList td {
  border-bottom: 1px solid #eee;
  padding: 0.2em 0;
  font-size: 0.8em;
}

.tableList td.txt_left {
  text-align: left;
  font-size: 0.8em;
}

.tableList td.txt_middle {
  text-align: center;
  font-size: 0.8em;
}

/*  */

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

p {
  display: table-cell;
  vertical-align: middle;
}
@media all and (min-width: 768px) and (max-width: 1023px) {
  .container {
    font-size: 0.8em;
  }
}

@media (max-width: 767px) {
  .container {
    display: block;
    font-size: 0.6em;
  }

  .side_container {
    min-height: 0;
    margin-bottom: 10px;
    margin-right: 0px;
    width: 100%;
    height: 0;
    padding-top: 30%;
  }

  .user_image {
    float: left;
    width: 30%;
    height: 100%;
    margin-left: 5%;
  }

  .user_name {
    float: right;
    width: 60%;
    height: 100%;
    text-align: left;
    padding-top: 6%;
  }

  .user_image_inside {
    top: 0;
  }

  .user_like {
    display: none;
  }

  .content_container {
    margin-left: 0;
    height: 50px;
  }
}

</style>