<template>
    <v-container>
        <v-btn href="/practice/route2">일반 라우팅</v-btn>
        <v-btn @click="hrefRouting">일반 라우팅 (함수)</v-btn>
    </v-container>
    <v-container>
        <v-btn :to="'/practice/route2'">SPA 경로기반 라우팅</v-btn>
        <v-btn @click="spaRouting1">SPA 경로기반 라우팅 (함수)</v-btn>
    </v-container>
    <v-container>
        <v-btn :to="{ name: 'RouteComponent2' }">SPA 이름기반 라우팅</v-btn>
        <v-btn @click="spaRouting2">SPA 이름 라우팅 (함수)</v-btn>
    </v-container>
    <v-container>
        <v-btn :to="'/practice/route3/6'">게시글 1번 보기</v-btn>
        <v-btn @click="goToPostDetail(6)">게시글 1번 보기(함수)</v-btn>
    </v-container>
</template>

<script>

    export default {
        methods: {
            hrefRouting() {
                // 화면 전체 새로고침이 발생하여 사용자 경험이 저하될 수 있습니다.
                // 이 방법은 SPA의 장점을 살리지 못합니다.
                // 일반적으로는 Vue Router를 사용하여 라우팅을 처리하는 것이 좋습니다
                // 전체 새로고침을 하기 때문에 헤더와 같은 컴포넌트의 created()가 다시 실행
                window.location.href = '/practice/route2';
            },
            spaRouting1() {
                // spa : single page application
                // Vue Router를 사용하여 SPA 라우팅을 처리
                // 새롭게 라우트되는 컴포넌트만 created()가 실행, 헤더같은 경우는 실행 되지 않음
                // 화면 전체 새로고침이 발생하지 X
                this.$router.push('/practice/route2');
            },
            spaRouting2() {
                this.$router.push({ name: 'RouteComponent2' });
            },
            goToPostDetail(productId) {
                // 게시글 1번 보기로 이동
                // 게시글 상세 페이지로 이동하는 라우팅
                this.$router.push(`/practice/route3/${productId}`);
            },
        },
    }
</script>

<style lang="scss" scoped></style>