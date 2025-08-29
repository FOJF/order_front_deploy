<template>
    <!-- 단방향바인딩 -->
    <!-- 화면 내에서는 this를 붙일 필요 없음 -->
    <h1>Hello World {{ language }}</h1>
    <!-- v-model을 사용하면 양방향 바인딩 됨 -->
    <input type="text" v-model="newLanguage">
    <button @click="changeLanguage(newLanguage)">변수 변경</button>
    <button @click="showLanguage">변수 확인</button>
</template>
<script>
    export default {
        // data 함수는 화면에서 사용할 변수들을 정의.
        data() {
            return {
                language: "java",
                newLanguage: ""
            }
        },
        // 개발자가 정의하는 함수는 methods 안에 정의
        methods: {
            changeLanguage(newLanguage) {
                // this의 의미는 현재 컴포넌트 객체 자신을 의미
                // this는 주로 컴포넌트 내부에 선언된 변수(data 함수 안의)에 접근할 때 주로 사용
                this.language = newLanguage;
            },
            showLanguage() {
                alert(`현재 input 박스의 값은 "${this.newLanguage}" 입니다.`);
            }
        }
    }
</script>
