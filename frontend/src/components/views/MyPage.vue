<template>
  <div class="container">
    <div class="side_container">
      <div class="side_container_inside">
        <div class="user_image">
          <div class="user_image_inside"><img v-bind:src=this.profile @click="photo_edit" id="profile_image"/></div>
        </div>
        <div class="user_name"><span><strong>{{ User.name }}</strong><router-link
            to="/views/MyPageUserInfo">  내 정보</router-link><br/></span>
          <span>{{ User.state }} / {{ User.sex }} / {{ User.age }}</span></div>
        <div class="user_like">
          <table class="userInfoTable">
            <colgroup>
              <col style="width:100%">
            </colgroup>
            <tr v-for="data in User.interest" :key="data">
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
          <div class="square_left">
            <div class="square_left_title">
              <p class="challenge">{{challengeList[0]}}</p>
              <p class="date">{{challengeList[1]}}</p>
            </div>
            <div class="bar-wrapper">
              <div class="progress-bar">
                <div id="bar"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="myInfo">
          <div class="title2">
            <div class="add_button">
              <input class="add_button" type="button" @click="handle_toggle" value="+">
            </div>
            <div class="title_inside">
              <p>🔥 기록</p>
            </div>
          </div>
          <div class="square_left2">
            <canvas  id="chart1"></canvas>
          </div>
        </div>
        <div class="myActivity">
          <div class="title3">
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
              <tr v-for="(post, idx) in paginatedPostData" :key="idx">
                <td class="txt_middle">{{ (posts.length - (pageNum * pageSize)) - idx }}</td>
                <td class="txt_left"><router-link :to="{ name: 'DetailBoardPage', params: { prev: post.Board , id: post._id }}">{{ post.title }}</router-link></td>
              </tr>
              <tr v-if="paginatedPostData.length == 0">
                <td colspan="2">작성한 글이 없습니다.</td>
              </tr>
            </table>
            <div class="btn-cover">
              <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
                ◀
              </button>
              <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
                ▶
              </button>
            </div>
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
              <tr v-for="(post, idx) in paginatedLikedData" :key="idx">
                <td class="txt_middle">{{ likedList.length - (LikedPageNum * pageSize) - idx }}</td>
                <td class="txt_left"><router-link :to="{ name: 'DetailBoardPage', params: { prev:post.Board, id: post._id }}">{{ post.title }}</router-link></td>
              </tr>
              <tr v-if="likedList.length == 0">
                <td colspan="2">좋아요 한 글이 없습니다.</td>
              </tr>
            </table>
            <div class="btn-cover">
              <button :disabled="LikedPageNum === 0" @click="prevLikedPage" class="page-btn">
                ◀
              </button>
              <button :disabled="LikedPageNum >= pageLikedCount - 1" @click="nextLikedPage" class="page-btn">
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal" v-show="is_show">
        <h3>기록 추가</h3>
        <div class="record">
          <div><input type="text" v-model="insert_weight"></div>
          <div class="btnWrap" style="margin-top: 10px">
            <input type="button" @click="insert" value="추가">
            <input type="button" @click="handle_toggle" value="취소">
          </div>
        </div>
      </div>

      <div class="modal" v-show="profile_edit">
        <h3>프로필 사진 변경</h3>
        <div class="filebox">
          <input class="upload-name" value="첨부파일" placeholder="첨부파일">
          <label for="file">파일찾기</label>
          <input type="file" id="file" @change="onFileSelected">
          <img class="preview" width="200px" ref="uploadItemImage" v-bind:src=this.profile>
        </div>
        <div class="btnWrap" style="margin-top: 10px">
          <input type="button" @click="onUpload" value="변경">
          <input type="button" @click="photo_edit" value="취소">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import $ from "jquery";
import updateUser from "@/services/updateUsers";
import Chart from 'chart.js'
import {mapState} from 'vuex'

export default {
  name: "MyPage",
  mounted() {
    this.createChart('chart1')

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

    $("#file").on('change',function(){
      var fileName = $("#file").val();
      $(".upload-name").val(fileName);
    });

    this.challenge_progress()
  },
  data() {
    return {
      user_id: 'suloreum',

      name: '',
      age: '',
      state: '',
      sex: '',
      list: '', // 글 데이터 가져오기
      likedList: [],
      user_interest: [],
      challenge: {},
      challengeList: [],
      weight: '',
      profile_image:'',
      ///
      Post: [],
      error: '',
      text: '',
      userName: '',
      //
      Users: [],
      user: {},
      //
      pageSize: 5,
      pageNum: 0,
      LikedPageNum: 0,

      is_show : false,
      insert_weight : null,
      profile_edit:false,
      selectedFile:null,
      profile:'',

      //
      User: []
    }
  },
  async created() {
    this.User = this.$store.state.userInfo
    this.profile = 'data:image/jpeg;base64,' + `${this.User.profile_image}`

    for (let variable in this.User.challenge) {
      this.challengeList.push(variable)
      this.challengeList.push(this.User.challenge[variable])
    }

    try {
      this.posts = this.$store.state.posts.filter(posts => posts.createdUser === this.User.id)
      this.likedList = this.$store.state.posts.filter(posts => posts.likedUsers.length > 0 && posts.likedUsers.includes(this.User.id))
    } catch (err) {
      this.error = err.message;
    }
    this.createChart('chart1')
  },
  computed:{
    pageCount () {
      let listLeng = this.posts.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    }
    ,paginatedPostData () {
      const start = this.pageNum * this.pageSize,
          end = start + this.pageSize;
      return this.posts.slice(start, end);
    }
    ,
    pageLikedCount () {
      let listLeng = this.likedList.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    }
    ,paginatedLikedData () {
      const start = this.LikedPageNum * this.pageSize,
          end = start + this.pageSize;
      return this.likedList.slice(start, end);
    },
    ...mapState(["userInfo"])
  },
  methods:{
    nextPage () {
      this.pageNum += 1;
    }
    ,prevPage () {
      this.pageNum -= 1;
    }
    ,nextLikedPage () {
      this.LikedPageNum += 1;
    }
    ,prevLikedPage () {
      this.LikedPageNum -= 1;
    },
    handle_toggle(){
      this.is_show = !this.is_show;
    },
    photo_edit(){
      this.profile_edit =!this.profile_edit;
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      let itemImage = this.$refs.uploadItemImage;
      itemImage.src = window.URL.createObjectURL(event.target.files[0]);
      this.itemImageInfo.uploadImages = itemImage.src;
      itemImage.onload = () => {
        window.URL.revokeObjectURL(this.src)
      }
    },
    onUpload(){
      const fd = new FormData()
      fd.append('image',this.selectedFile, this.selectedFile.name)

      const changeProfileImage = (inputFile) => {
        const profileFileReader = new FileReader();

        return new Promise((resolve, reject) => {
          profileFileReader.onerror = () => {
            profileFileReader.abort();
            reject();
          };

          profileFileReader.onload = () => {
            let profileArr = profileFileReader.result.split(',')
            resolve(profileArr[1]);
          };
          profileFileReader.readAsDataURL(inputFile);
        });
      };

      changeProfileImage(this.selectedFile).then(result => {
        this.profile_image = result
        this.profile = 'data:image/jpeg;base64,'+`${this.profile_image}`
        $('#profile_image').attr('src', this.profile);
        this.$store.commit('updateProfile', this.profile_image)
        updateUser.UpdateUser(fd,this.User.object_id)

      });

      this.photo_edit()
    },
    challenge_progress(){
      let date = this.challengeList[1].split("-");
      let today = new Date()
      let year = today.getFullYear()
      let month = today.getMonth() +1
      let day = today.getDate()

      let stDate = new Date(date[0],date[1],date[2])
      let endDate = new Date(year,month,day)
      let btMs = stDate.getTime() - endDate.getTime()
      let btDay = btMs/(1000*60*60*24)

      let bar = document.getElementById('bar')
      if(btDay <= 0){
        bar.style.width = 100+"%"
      }else{
        bar.style.width = (100-btDay) + "%"
      }
    },
    insert(){

      if(this.insert_weight == null){
        this.is_show = !this.is_show
      }
      else {
        let weightList = this.User.weight
        weightList.push(this.insert_weight)

        this.$store.commit('updateWeight', weightList)
        this.User.weight = weightList

        updateUser.UpdateUser(this.User, this.User.object_id)

        this.is_show = !this.is_show
        this.createChart('chart1');
      }
    },
    createChart(charId){
      const ctx = document.getElementById(charId)
      new Chart(ctx,{
        type:"line",
        data:{
          labels: ["1", "2","3","4","5","6","7","8","9","10"],
          datasets: [
            {
              label: "wight",
              data: Object.values(this.User.weight).slice(-10),
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3,
              tension: 0.2
            }
          ]
        },
        options:{
          responsive: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  stepSize:5,
                  min:30
                }
              }
            ]
          }
        },
      });
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
  position: relative;
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
  color: black;
}

.user_name a {
  color: dimgray;
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
  margin-top: 5%;
  border-radius: 10px;
}
.title3 {
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
  margin-top: 10%;
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
.add_button{
  /*position: fixed;*/
  /*right: 10%;*/
  display: table;
  width: 58%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 400%;
  margin: auto;
}
.add_button input{
  background-color: white;
  color:#2c3e50;
  font-size: 2em;
  text-align: center;
  border: none;
  cursor: pointer;
}

/* my challenge */

.square_left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:48%;
  height: 73%;
  float: left;
  margin-top: 1%;
  background-color: #2c3e50;
}
.square_left_title{
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin: 0px 5%;
}
.square_right {
  display: flex;
  justify-content: space-between;
  width:48%;
  height: 73%;
  float: right;
  margin-top: 1%;
  background-color: #2c3e50;
}
.challenge{
  color: white;
  margin-left: 10px;
}
.date{
  color: white;
  margin-right: 10px;
}
.bar-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
}
.progress-bar{
  background-color: white;
  width: 90%;
  height: 40%;
}
#bar{
  background-color: rgba(173, 255, 47, 0.7);
  height: 100%;
}

/* my record */

.square_left2 {
  display: flex;
  justify-content: center;
  align-items: center;

  width:100%;
  height: 100%;
  float: left;
  margin-top: 1%;
  background-color: #2c3e50;
}

.square_left2 canvas{
  background-color: white;
  width: 100%;
  height: 100%;
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
}

.tableList td.txt_left a{
  font-size: 1em;
  color: black;
}

.tableList td.txt_middle {
  text-align: center;
  font-size: 0.8em;
}
.btn-cover{
  display: flex;
  justify-content: center;
}
.btn-cover button{
  border: 1px solid rgba(96, 117, 235, 0.28);
  background-color: rgba(202, 223, 224, 0.3);
  color: #222222;
  padding: 3px 5px;
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  margin-left: 10px;
  margin-top: 10px;

  text-align-last: center;
  text-align: center;
  font-size: 0.5em;

  cursor: pointer;
}

.btn-cover button:disabled{
  color: white;
  border: white;
}
/* modal */

.modal{
  background-color: #ffffff;
  border: rgba(202, 223, 224, 1) 5px solid;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width:400px;
  height:400px;
}

.filebox input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}

.filebox .upload-name {
  display: inline-block;
  height: 30px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 60%;
  color: #999999;
}

.filebox label {
  display: inline-block;
  padding: 5px 10px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  margin-left: 10px;
}

.btnWrap{
  display: flex;
  justify-content: center;
}
.btnWrap input{
  margin-right: 10px;
  width: 50px;
  padding: 3px;
  border: 1px solid #aaa;
  background: white;
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  cursor: pointer;
}
.preview{
  display: block;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  margin: 20px auto;
}

.record{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 100%;
}

.record input[type="text"]{
  margin-bottom: 20px;
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
  color: black;
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