<template>

  <div class="container">
    <div class="ListWrap">
      <div class="title">{{list.title}}</div>
      <div class="info">
        <div class="user">{{list.createdUser}}</div>
        <div class="date">{{list.createdAt.substring(0,10)+' '+list.createdAt.substring(11,19)}}</div>
      </div>
      <div>
        <img v-bind:src="'data:image/jpeg;base64,'+`${list.img}`">
      </div>
      <div class="cont">
        {{list.content}}
      </div>

      <div class="bottomWrap">
          <div class="btnWrap">
            <input v-if="User.id == list.createdUser" type="button" value="삭제" class="btn" @click =Del>
<!--            <router-link :to="{ name: 'Write', params: { id: this.$route.params.id}}"><input type="button" value="수정" class="btn" ></router-link>-->
            <input type="button" value="돌아가기" class="btn" @click =fnList>
          </div>
      </div>


      <div class="LikeBtn">
        <button @click="Like">
          <font-awesome-icon icon="fa-solid fa-heart" style="font-size: 1.5em"/>
          <p>{{list.likedCount}}</p>
        </button>
      </div>

    </div>

  </div>

</template>

<script> /* eslint-disable */
import {mapState} from 'vuex'
import Photo from "./Photo";
import updatePhotos from "../../../services/updatePhotos";
export default {
  created: async function() {
    this.User = this.$store.state.userInfo
    const id = this.$route.params.id;
    let list = this.$store.state.photos;
    this.list = list.filter(photo => photo._id === id)
    this.list = this.list[0]
  },
  data: function() {
    return {
      list: {},
      User :[]
    };
  },
  computed:{
    ...mapState(['photos'])
  },
  methods: {
    fnList(){
      this.$router.push({name:"Photo"})
    },
    Del: function () {
      alert("삭제완료");
      updatePhotos.deletePost(this.$route.params.id);
      this.fnList()
    },
    Like:function (){
      console.log(this.list)
      if(this.list.likedUsers.includes(this.User.id)){
        alert("이미 좋아요한 글")
        return ;
      }
      else{
        let likedUser = this.list.likedUsers
        likedUser.push(this.User.id)
        console.log(likedUser)
        this.updatedData = {
          likedCount : this.list.likedCount += 1,
          likedUsers: likedUser,
        }
        updatePhotos.UpdatePost(this.updatedData,this.$route.params.id);
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
.cont{
  display: block;
  width: 80%;
  border: 1px solid  rgba(96, 117, 235, 0.28);
  padding: 20px;
  margin: 10px auto;
  text-align: left;
}

.bottomWrap{
  display: flex;
  justify-content: center;
}

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



@media(max-width:767px) {

  .btnWrap {
    text-align: center;
    text-align-last: center;
  }
  .btn{
    width: 60px;
  }


}

</style>