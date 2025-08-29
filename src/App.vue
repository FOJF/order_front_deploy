<template>
  <!-- 화면의 요소는 template 안에 작성 -->

  <!-- vue(vuetify)에서 모든 태그의 최상단에 v-app으로 감싸져 있어야 정상적으로 동작 -->
  <v-app>
    <!-- header, footer를 제외한 실질적인 화면의 내용은 v-main안에 들어감 -->
    <HeaderComponent />

    <v-main>
      <router-view />
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<script>
  import HeaderComponent from './components/HeaderComponent.vue';
  import FooterComponent from './components/FooterComponent.vue';
  // script에는 js 코드를 코딩

  // vue는 export를 통하여 해당 요소를 다른 화면에서도 import할 수 있도록 설정
  // 즉 아래 문법은 App.vue라는 화면을 다른 파일에서도 import할 수 있도록 컴포넌트(모듈)화 시킨 것
  export default {
    name: 'App', // 컴포넌트화 시킨 것의 이름
    // 다른 화면을 inport한 이후에 template에서 사용하려고 할 때는 components라는 변수에 나열
    components: {
      HeaderComponent,
      FooterComponent
    }
  }
</script>

<style>
  /* 디자인 요소는 style 태그 안에 작성 */

  /* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
