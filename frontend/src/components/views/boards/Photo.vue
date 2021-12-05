<template>
  <div class="container">
    <div class="top-menu">
      <div class="wt-button">
        <router-link :to="{ name: 'UploadPhoto' ,params:{prev:'Photo'}}"><input type="button" value="글쓰기"></router-link>
      </div>

      <div class="search">
        <form>
          <input type="text" name="key">
          <span class="search-button" v-on:click="searchKey"><font-awesome-icon icon="search" /></span>
        </form>
      </div>
    </div>

    <div class="list">

      <div v-for="(row, idx) in photos" :key="idx">
        <div class="block">
          <img v-bind:src= row.img >
          <a href="javascript:;">{{row.subject}}</a>
        </div>
      </div>

    </div>

    <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>



  </div>

</template>

<script>
import updatePhotos from "../../../services/updatePhotos";

export default {
  data() { //변수생성
    return{
      body:'' //리스트 페이지 데이터전송
      ,board_code:'news' //게시판코드
      ,list:'' //리스트 데이터
      ,pageNum : 0
      ,pageSize : 15
      ,Photo:[]
      ,imageURL:[]
      ,photos:[]
    }
  },async created(){
    this.Photo = await updatePhotos.getPhotos();
    this.list = Object.values(this.Photo);

    for(let i in this.list){
      this.photos.push({
        img : 'data:image/jpeg;base64,'+`${this.list[i].img}`,
        subject : this.list[i].subject
      })

    }
  }
  , methods:{
    searchKey:function(){
      alert('검색 결과가 없어용!');
    },
    showTag:function(event){
      let click = document.getElementById(event.currentTarget.id);
      let tags = document.getElementsByClassName("sub-item");
      tags.forEach((tag)=>{
        tag.classList.remove("active");
      })
      click.classList.add("active");
    } ,nextPage () {
      this.pageNum += 1;
    }
    ,prevPage () {
      this.pageNum -= 1;
    },
    convertSrc(s){
      function hexToBase64(str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
      }
      return 'data:image/jpeg;base64,' + hexToBase64(`${s}`);
    }
  }  ,computed:{
    pageCount () {
      let listLeng = this.list.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData () {
      const start = this.pageNum * this.pageSize,
          end = start + this.pageSize;
      return this.list.slice(start, end);
    },
    // convertSrc(s){
    //   function hexToBase64(str) {
    //     return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
    //   }
    //   return 'data:image/jpeg;base64' + hexToBase64(s);
    // }
  }
}
</script>

<style scoped>
.container{
  margin: 30px;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
}
input[type="text"]{
  border:none;
  padding: .6em .8em .5em .8em;
  border-bottom: 2px solid  #aaa;
  outline: none;
  background-color: rgba(0,0,0,0);
}
input:focus{
  border-bottom: 2px solid  #22a8d8;
}
.search{
  padding: 10px 30px;
}
.search-button{
  width: 10%;
  color: #aaa;
  padding: 5px;
  margin-left: 10px;
}
.search-button:hover{
  cursor:pointer;
  color:#22a8d8;
}
.list{
  display: grid;
  grid-template-columns: repeat(3,1fr);
}
.list .block {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 30px;
}
.list .block a{
  color: black;
}
.list .block:hover{
  background-color: rgba(96, 117, 235, 0.12);
}
.list .block img{
  width: 200px;
  height: 237px;
  object-fit: cover;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.btn-cover{
  width: 50%;
  margin-left: 25%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  margin-bottom: 30px;
}
.btn-cover button{
  border: 1px solid rgba(96, 117, 235, 0.28);
  background-color: rgba(0,0,0,0);
  color: #222222;
  padding: 5px 20px;
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  text-align-last: center;
  text-align: center;
  font-size: 0.7em;
}
.btn-cover button:hover{
  cursor: pointer;
  background-color: rgba(96, 117, 235, 0.28);
}
.top-menu{
  margin: 0px 5%;
  display: flex;
  justify-content: space-between;
}
.wt-button input{
  display: flex;
  justify-content: center;
  border: 1px solid rgba(96, 117, 235, 0.28);
  background-color: rgba(0,0,0,0);
  padding: 5px 20px;
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  text-align-last: center;
  text-align: center;
  font-size: 0.7em;
  margin-top: 20px;
}
.wt-button input:hover {
  cursor: pointer;
  background-color: rgba(96, 117, 235, 0.28);
}
.wt-button input:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 1px #22a8d8;
  box-shadow: 0 0 0 1px -moz-mac-focusring;
  color: #222;
  outline: none;
}
@media(min-width:1000px){
  .list{
    display: grid;
    grid-template-columns: repeat(4,1fr);
  }
}
@media(max-width:767px) {
  .container {
    font-size: .6em;
  }
  .sub-menu .sub-item{
    width: 15%;
    white-space: nowrap;
  }
  select {
    width: 10%;
  }
  .list{
    display: grid;
    grid-template-columns: repeat(2,1fr);
  }
  .tbList td div.block img{
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  .top-menu{
    margin: 0px 10% 0px 20%;
    display: flex;
    justify-content: space-between;
  }
}
</style>