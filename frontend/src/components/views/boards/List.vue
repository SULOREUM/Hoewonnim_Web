<template>
  <div class="container">

    <div class="sub-menu">
      <div class="sub-item active" id="all" v-on:click="showTag($event)"><span>전체글</span></div>
      <div class="sub-item" id="how" v-on:click="showTag($event)"><span>#운동법</span></div>
      <div class="sub-item" id="tool" v-on:click="showTag($event)"><span>#운동기구</span></div>
      <div class="sub-item" id="diet" v-on:click="showTag($event)"><span>#식단</span></div>
    </div>

    <div class="list">
      <table class="tbList">
        <colgroup>
          <col style="width:10%">
          <col style="width:60%">
          <col style="width:10%">
          <col style="width:20%">
        </colgroup>

        <tr>
          <th>no.</th>
          <th>제목</th>
          <th>아이디</th>
          <th>날짜</th>
        </tr>

        <tr v-for="(item,idx) in paginatedData" :key="item.id">
          <td>{{paginatedData.length - idx}}</td>
          <td class="txt_center"><router-link :to="{ name: 'DetailBoardPage', params: { prev: item.Board,id: item._id }}">{{item.title}}</router-link></td>
          <td>{{item.createdUser}}</td>
          <td>{{item.createdAt.substring(0,10)}}</td>
        </tr>
        <tr v-if="items.length == 0">
          <td colspan="4">데이터가 없습니다.</td>
        </tr>
        <tr v-for="n in pageSize-paginatedData.length" :key="n">
          <td colspan="4" style="height: 18px; border-bottom:none;"></td>
        </tr>

      </table>
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

    <div class="top-menu">
      <div class="wt-button">
        <router-link :to="{name:'Write', params:{prev:'List'}}"><input type="button" value="글쓰기"></router-link>
      </div>

      <div class="search">
        <form>
          <input type="text" name="key">
          <span class="search-button" v-on:click="searchKey"><font-awesome-icon icon="search" /></span>
        </form>
      </div>
    </div>

  </div>

</template>

<script>

import {mapState} from 'vuex'

export default {

  data() { //변수생성
    return{
      body:'' //리스트 페이지 데이터전송
      ,board_code:'news' //게시판코드
      ,items:''
      ,pageNum : 0
      ,pageSize : 16
      ,tag:'all'
    }
  }
  ,async created(){
      this.items = this.$store.getters.ListPosts
  }
  , methods:{
    searchKey:function(){
      alert('검색 결과가 없어용!');
    },
    showTag:function(event){
      let click = document.getElementById(event.currentTarget.id);
      let tags = document.getElementsByClassName("sub-item");

      Array.from(tags).forEach((tag)=>{
        tag.classList.remove("active");
      })

      click.classList.add("active");
      this.tag = event.currentTarget.id;
    }
    ,nextPage () {
      this.pageNum += 1;
    }
    ,prevPage () {
      this.pageNum -= 1;
    }
  }
  ,computed:{
    pageCount () {
      let listLeng = this.items.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      return page;
    },
    paginatedData () {
      let arr;
      if(this.tag === 'all' | ''){
        arr = this.items;
      }else{
        arr = this.items.filter(item => item.tag === this.tag)
      }
      const start = this.pageNum * this.pageSize,
          end = start + this.pageSize;
      return arr.slice(start, end);
    },
    ...mapState(["posts"])
  }
}
</script>

<style scoped>
.container{
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  font-size: 0.8em;
}
.sub-menu{
  display: flex;
  margin: 10px auto;
}

.sub-menu .sub-item{
  padding: 8px 10px;
  margin: auto 10px;
  width: 80px;
  flex: 1;
  cursor: pointer;
  color: black;
  font-size: 0.8em;
}

.sub-menu .sub-item.active,.sub-menu .sub-item:hover{
  /*background-color: rgb(18, 66, 110);*/
  border-bottom: 1px solid rgb(18, 66, 110);
  border-top: 1px solid rgb(18, 66, 110);

  /*color: white;*/
}

select{
  width: 10%;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  padding: .6em .8em .5em .8em;
  margin-right: 10px;

  border: 1px solid #aaa;
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);

  text-align-last: center;
  text-align: center;
  font-size: 0.6em;
}

select:hover{
  border-color: #888;
}

select:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 1px #6075eb;
  box-shadow: 0 0 0 1px -moz-mac-focusring;
  color: #222;
  outline: none;
}
input[type="text"]{
  border:none;
  padding: .6em .8em .5em .8em;
  border-bottom: 2px solid  #aaa;
  outline: none;
  background-color: rgba(0,0,0,0);
}
input:focus{
  border-bottom: 2px solid rgba(96, 117, 235, 0.5);
}
.search-button{
  width: 10%;
  color: #aaa;
  padding: 5px;
  margin-left: 10px;
}
.search-button:hover{
  cursor:pointer;
  color:#6075eb;
}

.list{
  flex-grow: 5;
  font-size: 0.9em;
  margin-top: 20px;
}
.tbList{
  width: 90%;
  margin: 20px auto;
}

.tbList th{border-top:1px solid #888;}
.tbList th, .tbList td{border-bottom:1px solid rgba(82, 155, 155, 0.31); padding:5px 0; }
.tbList td.txt_center{
  text-align:center;
}
.tbList td.txt_center a{
  text-decoration: none;
  color: black;
}
.tbList td.txt_center a:hover{
  color:#6075eb;
}
.btn-cover{
  width: 50%;
  margin-left: 25%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
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
  margin: 0px 10%;
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



@media(max-width:767px) {

  .container {
    font-size: .7em;
  }
  .sub-menu .sub-item{
    width: 15%;
    white-space: nowrap;
  }

  select {
    width: 10%;

  }

}
</style>