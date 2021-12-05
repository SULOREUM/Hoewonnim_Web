<template>
  <div class="container">
    <form>
      <table class="tbAdd">
        <colgroup>
          <col style="width: 15%" />
          <col style="width: 75%" />
        </colgroup>
<!--        <tr>-->
<!--          <th>제목</th>-->
<!--          <td><input type="text" v-model="title" /></td>-->
<!--        </tr>-->
<!--        <tr>-->
<!--          <th>내용</th>-->
<!--          <td><textarea v-model="content" ref="content"></textarea></td>-->
<!--        </tr>-->
        <tr>
          <th>사진 첨부</th>
          <td><input type="file" @change="onFileSelected"></td>
        </tr>
      </table>
    </form>

    <div class="btnWrap">
      <input type="button" value="목록" class="btn" @click=fnList>
      <input v-if="this.id === undefined" type="button" value="등록" class="btnAdd btn" @click="onUpload" >
      <input v-if="this.id !== undefined" type="button" value="수정" class="btnAdd btn" @click = Update >
    </div>
  </div>

</template>

<script>
import updatePhotos from "../../../services/updatePhotos";
export default {
  data(){
    return{
      selectedFile:null
    }
  },
  methods:{
    onFileSelected(event){
      this.selectedFile = event.target.files[0]
    },
    onUpload(){
      const fd = new FormData()
      fd.append('image',this.selectedFile, this.selectedFile.name)
      updatePhotos.insertPost(fd)
      this.fnList()
    },
    fnList(){
      this.$router.push({name:'Photo'})
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