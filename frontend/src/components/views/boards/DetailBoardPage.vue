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
      <div class="tagWrap">
        <font-awesome-icon icon="fa-solid fa-tags" />
        <div class="tag" v-if="list.tag !== ''&& list.tag !=='all'">#{{list.tag}}</div>
      </div>

    </div>

    <div class="btnWrap">
      <input type="button" value="삭제" class="btn" @click =Del>
      <router-link :to="{ name: 'Write', params: { id: this.$route.params.id}}"><input type="button" value="수정" class="btn" ></router-link>
      <input type="button" value="돌아가기" class="btn" @click =fnList>
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
  },
  data: function() {
    return { list: {} };
  },
  methods: {
    fnList(){
      this.$router.push({path:'/views/boards/List'})
    },
    Del: function () {
      alert("삭제완료");
      updatePosts.deletePost(this.$route.params.id);
      this.fnList()
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
  min-height: 500px;
  border: 1px solid  rgba(96, 117, 235, 0.28);
  padding: 20px;
  margin: 10px;
  text-align: left;
}
.tagWrap{
  display: flex;
  align-items: center;
  font-size: 0.8em;
  padding: 0px 20px;
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
  width: 100px;
  margin: 0px 10px;
  padding: 3px;
  border: 1px solid #aaa;
  background: white;
  border-radius: .5em;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, .04);
  cursor: pointer;
}


@media(max-width:767px) {


  .btnWrap {
    text-align: center;
    text-align-last: center;
  }
  .btn{
    width: 80px;
  }
}

</style>