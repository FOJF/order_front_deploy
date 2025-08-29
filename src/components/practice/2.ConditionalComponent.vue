<template>
    <div>
        조건문, 반복문
    </div>
    <div v-if="!isLoggedIn">로그인 해주세요.</div>
    <div v-else>환영합니다.</div>
    <button v-if="!isLoggedIn" @click="logIn">로그인</button>
    <button v-else @click="logOut">로그아웃</button>

    <h1>상품 목록 조회</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>상품명</th>
                <th>상품 가격</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in productList" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                isLoggedIn: false,
                productList: []
            }
        }, methods: {
            logIn() {
                this.isLoggedIn = true;
            },
            logOut() {
                this.isLoggedIn = false;
            }
        },
        async created() {
            await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`).then((res) => {
                this.productList = res.data.data.content;
            });
        }
    }
</script>

<style lang="scss" scoped></style>