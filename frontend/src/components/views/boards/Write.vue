<template>
  <div class="container">
    <h3>글쓰기</h3>
    <div class="AddWrap">
      <form>
        <table class="tbAdd">
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 75%" />
          </colgroup>
          <tr>
            <th>태그</th>
            <td>
              <input type="button" class="button" id="how" v-on:click="select_tag($event)" value="#운동법" />
              <input type="button" class ="button" id="tool" v-on:click="select_tag($event)" value="#운동기구"/>
              <input type="button" class ="button" id="diet" v-on:click="select_tag($event)" value="#식단"/>
            </td>
          </tr>
          <tr>
            <th>제목</th>
            <td><input type="text" v-model="title" /></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea v-model="content" ref="content"></textarea></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="btnWrap">
      <router-link to="/views/boards/List"><input type="button" value="목록" class="btn"></router-link>
      <input v-if="this.id === undefined" type="button" value="등록" class="btnAdd btn" @click = Add >
      <input v-if="this.id !== undefined" type="button" value="수정" class="btnAdd btn" @click = Update >
    </div>
  </div>

</template>

<script>
import updatePosts from "@/services/updatePosts";

export default {
  data(){
    return{
      title: '',
      content: '',
      tag: '',
      detailTag: '',
      postNum: 3,
      likedCount : 0,
      likedUsers: [],
      createdUser: 'suloreum',
      comments: [],
      data : {},
      list: {},
      id : undefined,
      Board : undefined
    }
  },
  async created() {
    this.id = this.$route.params.id;
    this. Board = this.$route.params.prev;

    console.log(this.id)
    console.log(this.Board)
    if(this.id!==undefined) {
      const arr = await updatePosts.getDetailPost(this.id);
      this.list = arr[0]
      this.title = this.list.title;
      this.content = this.list.content;

      let sel_tag = document.getElementById(this.list.tag);
      sel_tag.classList.add("active");
    }
  },
  methods:{
    select_tag:function(event){
      let click = document.getElementById(event.currentTarget.id);

      let buttons=document.getElementsByClassName("button");

      Array.from(buttons).forEach((tag)=>{
        tag.classList.remove("active")
      })

      click.classList.add("active");
      this.tag = event.currentTarget.id;
    }
    ,fnList(){
      this.$router.push({name:this.Board})
    }
    ,Add:function (){
      if(!this.title){
        alert("제목을 입력해 주세요")
        return;
      }

      this.data = {
        title: this.title,
        content: this.content,
        tag: this.tag,
        Board: this.Board,
        postNum: this.postNum,
        likedCount : this.likedCount,
        likedUsers: this.likedUsers,
        createdUser: this.createdUser,
        comments: this.comments,
      }

      updatePosts.insertPost(this.data)
      this.fnList();
    },
    Update:function (){
      this.data = {
        title: this.title,
        content: this.content,
        tag: this.tag,
        Board: this.list.Board,
        postNum: this.list.postNum,
        likedCount : this.list.likedCount,
        likedUsers: this.list.likedUsers,
        createdUser: this.list.createdUser,
        comments: this.list.comments,
      }
      updatePosts.UpdatePost(this.data,this.id)
      this.fnList();
    }

  }

}
</script>
<style scoped>

.container{
  width: 100%;
  height: 100%;
  margin-top: 0px;
}
.tbAdd {
  width: 90%;
}

.tbAdd td {
  padding: 10px 10px;
  box-sizing: border-box;
  text-align: left;
}

.tbAdd td input {
  width: 100%;
  min-height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tbAdd td input[type=button]{
  width: auto;
  margin: auto 10px;
  font-size: .6em;

  border: 1px solid #7994db;
  background-color: white;
  color: #7994db;
  border-radius: 40px;
}

.tbAdd td .button:hover{
  background-color: #7994db;
  color: white;
}

.tbAdd td .button.active{
  background-color: #7994db;
  color: white;
}


.tbAdd td textarea {
  width: 100%;
  min-height: 300px;
  padding: 10px;
  box-sizing: border-box;
}

.btnWrap {
  text-align: center;
  margin: 20px auto;
  display: flex;
  justify-content: center;

}

.btnWrap a {
  margin: 0 10px;
}

.btn{
  width: 100px;
  padding: 3px;
  border: 1px solid #aaa;
  background: white;
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  cursor: pointer;
}

.btnAdd {
  background:#7994db;
  color: white;
}


@media(max-width:767px) {

  .tbAdd {
    font-size: .8em;
  }

  .btnWrap {
    text-align: center;
    text-align-last: center;
  }
  .btn{
    width: 80px;
  }
}

</style>