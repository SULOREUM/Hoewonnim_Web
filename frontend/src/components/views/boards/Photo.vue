<template>
  <div class="container">

    <div class="list">

      <div v-for="(row, idx) in list" :key="idx">
        <div class="block">
          <img v-bind:src= row.img >
          <a href="javascript:;">{{row.subject}}</a>
        </div>
      </div>

    </div>

    <div class="top-menu">
      <div class="wt-button">
        <router-link to="/views/boards/Write"><input type="button" value="글쓰기"></router-link>
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

const testData = [
  {
    idx:1,
    img:'data:image/jpeg;base64,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',
    subject:"누나 저 어때요"
  },
  {
    idx:2,
    img:'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile28.uf.tistory.com%2Fimage%2F9991AD3F5C9001A50BEDB0',
    subject:"근육이 잘 안붙네요"
  },
  {
    idx:3,
    img:'https://pbs.twimg.com/profile_images/918057070372429824/yUd15EBH_400x400.jpg',
    subject:"오늘도 운동!"
  },
  {
    idx:4,
    img:'http://ojsfile.ohmynews.com/PHT_IMG_FILE/2016/0803/IE001999768_PHT.jpg',
    subject:"더 예쁜 근육을 만들고 싶네요"
  },
  {
    idx:4,
    img:'https://static.smalljoys.me/2021/04/5314352_f8c50f80f0e6d6af3bbaab550a2570b5_1617893208.jpg',
    subject:"찍지말라니까~"
  },
  {
    idx:4,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuHKzaYM-2wPP_YPy_JHBqkdVj2ILX2Oy-JQ&usqp=CAU',
    subject:"자꾸 자랑하고 싶네요"
  },
  {
    idx:4,
    img:'http://ojsfile.ohmynews.com/PHT_IMG_FILE/2016/0803/IE001999768_PHT.jpg',
    subject:"더 예쁜 근육을 만들고 싶네요"
  },
  {
    idx:4,
    img:'https://static.smalljoys.me/2021/04/5314352_f8c50f80f0e6d6af3bbaab550a2570b5_1617893208.jpg',
    subject:"찍지말라니까~"
  },
  {
    idx:4,
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuHKzaYM-2wPP_YPy_JHBqkdVj2ILX2Oy-JQ&usqp=CAU',
    subject:"자꾸 자랑하고 싶네요"
  }
]

export default {

  data() { //변수생성
    return{
      body:'' //리스트 페이지 데이터전송
      ,board_code:'news' //게시판코드
      ,list:'' //리스트 데이터
    }
  },created(){
    this.list = testData
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
    }
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

.top-menu{
  margin: 0px 5%;
  display: flex;
  justify-content: space-between;
}
.wt-button input{
  display: flex;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0);
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