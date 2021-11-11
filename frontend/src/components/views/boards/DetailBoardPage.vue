<template>

  <div class="container">
    <h3>Details</h3>
    <div class="AddWrap">
      <form>
        <table class="tbAdd">
          <colgroup>
            <col style="width: 15%" />
            <col style="width: 75%" />
          </colgroup>
          <tr>
            <th>제목</th>
            <td>{{list.subject}}</td>
          </tr>
          <tr>
            <th>id</th>
            <td>{{list.user}}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td>{{list.cont}}</td>
          </tr>
        </table>
      </form>
    </div>

    <div class="btnWrap">
      <router-link :to="{ name: 'List' }"><input type="button" value="돌아가기" class="btn"></router-link>
    </div>
  </div>


</template>

<script> /* eslint-disable */
import updatePosts from "@/services/updatePosts";
export default {
  created: async function() {
    var id = this.$route.params.id;
    var arr = await updatePosts.showList(id);
    this.list = arr[0]
  },
  data: function() {
    return { list: {} };
  }
};
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
