<template>
  <div>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide><img src="../assets/1.jpg"/></swiper-slide>
      <swiper-slide><img src="../assets/2.jpg"/></swiper-slide>
      <swiper-slide><img src="../assets/3.jpeg"/></swiper-slide>
      <swiper-slide><img src="../assets/3.jpg"/></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>

    <div class="titleList">
      <span><router-link to="/views/boards/List"><font-awesome-icon icon="chevron-right"/>   자유게시판</router-link></span>
      <span><router-link to="/views/boards/QnA"><font-awesome-icon icon="chevron-right"/>   질문게시판</router-link></span>
      <span><router-link to="/views/boards/Promotion"><font-awesome-icon icon="chevron-right"/>   홍보게시판</router-link></span>
    </div>
    <div class="rankingList">
      <table class="tableList">
        <colgroup>
          <col style="width:10%">
          <col style="width:90%">
        </colgroup>
        <tr>
          <th>no.</th>
          <th>제목</th>
        </tr>
        <tr v-for="(post, idx) in lists" :key="idx">
          <td class="txt_middle">{{lists.length - idx }}</td>
          <td class="txt_left"><router-link :to="{ name: 'DetailBoardPage', params: { prev:post.Board, id: post._id }}">{{ post.title }}</router-link></td>
        </tr>
      </table>

      <table class="tableList">
        <colgroup>
          <col style="width:10%">
          <col style="width:90%">
        </colgroup>
        <tr>
          <th>no.</th>
          <th>제목</th>
        </tr>
        <tr v-for="(post, idx) in qna" :key="idx">
          <td class="txt_middle">{{qna.length - idx }}</td>
          <td class="txt_left"><router-link :to="{ name: 'DetailBoardPage', params: { prev:post.Board, id: post._id }}">{{ post.title }}</router-link></td>
        </tr>
      </table>

      <table class="tableList">
        <colgroup>
          <col style="width:10%">
          <col style="width:90%">
        </colgroup>
        <tr>
          <th>no.</th>
          <th>제목</th>
        </tr>
        <tr v-for="(post, idx) in promo" :key="idx">
          <td class="txt_middle">{{promo.length - idx }}</td>
          <td class="txt_left"><router-link :to="{ name: 'DetailBoardPage', params: { prev:post.Board, id: post._id }}">{{ post.title }}</router-link></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import {mapState} from 'vuex'

export default {
  name: 'MainPage',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      lists:'',
      qna:'',
      promo:'',
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 1000
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'progressbar'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  async created(){
    this.lists = this.$store.getters.ListPosts
    this.lists = this.lists.sort((a,b)=>{
      return b.likedCount - a.likedCount
    })
    console.log(this.lists)

    this.lists = Object.values(this.lists).slice(undefined,5)

    console.log(this.lists)
    this.qna = this.$store.getters.QnAPosts
    this.qna = this.qna.sort((a,b)=>{
      return b.likedCount - a.likedCount
    })
    this.qna = Object.values(this.qna).slice(undefined,5)

    this.promo = this.$store.getters.PromoPosts
    this.promo = this.promo.sort((a,b)=>{
      return b.likedCount - a.likedCount
    })
    this.promo = Object.values(this.promo).slice(undefined,5)
  },
  computed:{
    ...mapState(["posts"])
  }
}
</script>

<style>

.swiper {
  height: 500px;
  width: 100%;
}

.swiper swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.titleList{
  display: flex;
  margin: 2% 50px 1% 50px;
}
.titleList span{
  width: 30%;
  text-align: left;
  margin: 0px auto;
  padding: 10px;
}
.titleList span a{
  color: #2c3e50;
}
.rankingList{
  display: flex;
  margin: auto 50px;
}
.tableList {
  width: 30%;
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
</style>