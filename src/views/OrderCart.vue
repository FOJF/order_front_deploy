<template>
    <v-container>
        <v-row justify="center">
            <v-col class="text-center text-h5">
                장바구니 목록
            </v-col>
        </v-row>
        <v-row justify="space-between">
            <v-col cols="auto">
                <v-btn color="secondary" @click="clearCart">장바구니 비우기</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn color="primary" @click="orderCreate">주문하기</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-table>
                    <thead>
                        <tr>
                            <th>제품 ID</th>
                            <th>제품명</th>
                            <th>주문 수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in getProductsInCart" :key="product.productId">
                            <td>{{ product.productId }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.productCount }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
            }
        },
        methods: {
            clearCart() {
                this.$store.dispatch('clearCart');
            },
            async orderCreate() {
                const cart = this.getProductsInCart.map(p => { return { productId: p.productId, productCount: p.productCount } });
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/orders`, cart)
                    .then(response => {
                        this.clearCart();
                        alert("주문이 완료되었습니다.", response);
                        // this.$router.push('/order/list'); // 주문 목록 페이지로 이동
                    })
                    .catch(error => {
                        console.error("주문 생성 실패: ", error);
                        alert("주문 생성에 실패했습니다. 다시 시도해주세요.");
                    });
            }
        },
        computed: {
            getProductsInCart() {
                return this.$store.getters.getProductsInCart;
            }
        }
    }
</script>

<style lang="scss" scoped></style>