<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide><img src="../assets/1.jpg"/></swiper-slide>
    <swiper-slide><img src="../assets/2.jpg"/></swiper-slide>
    <swiper-slide><img src="../assets/3.jpeg"/></swiper-slide>
    <swiper-slide><img src="../assets/3.jpg"/></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'MainPage',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
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
  }
}
</script>

<style>

.swiper {
  height: 300px;
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
  height: 80%;
  object-fit: cover;
}

</style>