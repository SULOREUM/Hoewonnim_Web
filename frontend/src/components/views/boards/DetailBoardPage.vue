<template>

  <div class="container">
    <div class="ListWrap">
      <div class="title">{{list.title}}</div>
      <div class="info">
        <div class="user">{{list.createdUser}}</div>
        <div class="date">{{list.createdAt.substring(0,10)+' '+list.createdAt.substring(11,19)}}</div>
      </div>
      <div class="cont">
        {{list.content}}
      </div>

      <div class="bottomWrap">
        <div class="tagWrap">
          <font-awesome-icon icon="fa-solid fa-tags" />
          <div class="tag" v-if="list.tag !== ''&& list.tag !=='all'">#{{list.tag}}</div>
        </div>

          <div class="btnWrap">
            <input type="button" value="삭제" class="btn" @click =Del>
            <router-link :to="{ name: 'Write', params: { id: this.$route.params.id}}"><input type="button" value="수정" class="btn" ></router-link>
            <input type="button" value="돌아가기" class="btn" @click =fnList>
          </div>
      </div>

      <div class="LikeBtn">
        <button @click="Like">
          <font-awesome-icon icon="fa-solid fa-heart" style="font-size: 1.5em"/>
          <p>{{list.likedCount}}</p>
        </button>
      </div>

      <div class="CommentWrap">
        <div v-for="item in this.comments" :key="item.id">
          <p>{{item}}</p>
        </div>
        <div v-if="this.comments.length == 0">
          <p colspan="4">댓글이 없습니다.</p>
        </div>

        <div class = CommentRegister>
          <input type="text" placeholder="댓글을 입력하세요" v-model="comment">
          <input type="button" value="댓글등록" class="btn" @click=RegisterComment>
        </div>
      </div>
    </div>

  </div>

</template>

<script> /* eslint-disable */
import updatePosts from "@/services/updatePosts";
export default {
  created: async function() {
    const id = this.$route.params.id;
    const arr = await updatePosts.getDetailPost(id);
    this.list = arr[0]
    this.comments = arr[0].comments;
    this.Board = arr[0].Board;

    console.log(this.Board)
  },
  data: function() {
    return {
      list: {}
      ,updatedData: {}
      ,comments:[]
      ,Board :''
    };
  },
  methods: {
    fnList(){
      this.$router.push({name:this.Board})
    },
    Del: function () {
      alert("삭제완료");
      updatePosts.deletePost(this.$route.params.id);
      this.fnList()
    },
    Like:function (){
      if(this.list.likedUsers.includes('suloreum')){
        alert("이미 좋아요한 글")
        return ;
      }
      else{
        let likedUser = this.list.likedUsers

        likedUser.push('suloreum')
        this.updatedData = {
          title: this.list.title,
          content: this.list.content,
          tag: this.list.tag,
          detailTag: this.list.detailTag,
          postNum: this.list.postNum,
          likedCount : this.list.likedCount += 1,
          likedUsers: likedUser,
          createdUser: this.list.createdUser,
          comments: this.list.comments,
        }
        updatePosts.UpdatePost(this.updatedData,this.$route.params.id);
      }

    }
    ,RegisterComment:function(){
      if (this.comment == null){
        alert("댓글을 입력하세요!")
        return ;
      }
      else{

        let comment = this.list.comments
        comment.push(this.comment)

        this.updatedData = {
          title: this.list.title,
          content: this.list.content,
          tag: this.list.tag,
          detailTag: this.list.detailTag,
          postNum: this.list.postNum,
          likedCount : this.list.likedCount,
          likedUsers: this.list.likedUsers,
          createdUser: this.list.createdUser,
          comments: comment,
        }
        updatePosts.UpdatePost(this.updatedData,this.$route.params.id);
        this.comment = null;
      }
    }
  }
};
</script>
<style scoped>
.container{
  padding: 0px 50px;
}
.ListWrap{
  width: 100%;
  margin-bottom: 20px;
}
.title{
  text-align: left;
  padding: 10px 20px;
  font-size: 1.2em;
}

.info{
  padding: 10px 20px;
  display: flex;
  text-align: left;
  font-size: 0.5em;
}
.user{
  margin-right: 10px;

}
.date{

}
.cont{
  min-height: 400px;
  border: 1px solid  rgba(96, 117, 235, 0.28);
  padding: 20px;
  margin: 10px;
  text-align: left;
}

.bottomWrap{
  display: flex;
  justify-content: space-between;
}
.tagWrap{
  display: flex;
  align-items: center;
  font-size: 0.8em;
  padding: 0px 20px;
  width: 20%;
}
.tag{
  width: 50px;
  padding: 3px;
  border-radius: .5em;
  background-color: #7994DB;
  color: white;
  margin-left: 10px;
}
.btnWrap{
}
/*}*/
.btn{
  width: 80px;
  margin: 0px 10px;
  padding: 3px;
  border: 1px solid #aaa;
  background: white;
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  cursor: pointer;
}
.LikeBtn{
  margin-top: 50px;
}
.LikeBtn button{
  width: 50px;
  height: 50px;
  background-color: white;
  color: #7994DB;
  border: 1px solid #aaa;
  border-radius: 50%;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  cursor: pointer;
}
.LikeBtn button:hover{
  background-color: #7994DB;
  color: white;
}

.LikeBtn button p{
  margin: 0;
}

.CommentWrap{
  margin: 30px;
  font-size: 0.8em;
  text-align: left;

}
.CommentWrap p{
  border-bottom: rgba(121, 148, 219, 0.45) solid 1px;
  margin: 30px;
}
.CommentRegister{
  margin-top: 30px;
  text-align: center;
}
.CommentRegister input[type=text]{
  min-height: 30px;
  min-width: 300px;
}


@media(max-width:767px) {


  .btnWrap {
    text-align: center;
    text-align-last: center;
  }
  .btn{
    width: 60px;
  }

  .CommentRegister input[type=text]{
    min-height: 30px;
    min-width: 100px;
  }

}

</style>