<template>
  <div id="app">
    <div class="wrapper">
      <Header/>
      <router-view class="main-content"/>
      <footer>
        <Footer/>
      </footer>
    </div>
  </div>
</template>

<script>
import Header from './components/common/TheHeader.vue';
import Footer from './components/common/TheFooter.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  async created() {
    await this.$store.dispatch("FETCH_POSTS")
    await this.$store.dispatch("FETCH_PHOTOS")
  }
}
</script>

<style>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}

html, body {
  font-family: 'Pretendard-Regular';
  font-size: 20px;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%

}

.wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

#app {
  font-family: 'Pretendard-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* padding: 30px; */
  display: flex;
  flex-direction: column;
}
</style>
