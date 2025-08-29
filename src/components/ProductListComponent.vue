<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <v-form>
                    <v-row>
                        <v-col cols="auto">
                            <v-select v-model="this.specCategory" :items="this.specCategorys" item-title="text"
                                item-value="value" label="카테고리" />
                        </v-col>
                        <v-col>
                            <v-text-field v-model="this.specProductName" label="제품명" @keyup.enter="searchProducts" />
                        </v-col>
                        <v-col cols="auto">
                            <v-btn prepend-icon="mdi-magnify" @click="searchProducts">검색</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col cols="auto">
                <v-btn prepend-icon="mdi-basket-plus" v-if="!isAdmin" @click="addCart()" color="primary">장바구니 추가</v-btn>
                <v-btn prepend-icon="mdi-plus-box" v-if="isAdmin" :to="'/product/create'" color="primary">상품 등록</v-btn>
            </v-col>
            <v-col cols="auto">
                <v-btn prepend-icon="mdi-credit-card-outline" v-if="!isAdmin" @click="createOrder()"
                    color="secondary">주문하기</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        {{ isAdmin ? '상품 목록 수정' : '상품 목록 조회' }}
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>제품사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고수량</th>
                                    <th v-if="!isAdmin">주문수량</th>
                                    <th v-if="!isAdmin">주문선택</th>
                                    <th v-if="isAdmin">삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in productList" :key="product.id">
                                    <td>
                                        <v-img :src="product.imageUrl"></v-img>
                                    </td>
                                    <td>{{ product.name }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>{{ product.stockQuantity }}</td>
                                    <td v-if="!isAdmin">
                                        <v-text-field v-model.number="product.productCount" type="number"
                                            sytle="width:65px" />
                                    </td>
                                    <td v-if="!isAdmin">
                                        <input type="checkbox" v-model="selected[product.id]">
                                    </td>
                                    <td v-if="isAdmin">
                                        <v-btn prepend-icon="mdi-delete" color="secondary"
                                            @click="deleteProduct(product.id)">삭제</v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { getResultData } from '@/utils/commonDataHandler';
    import axios from 'axios';

    export default {
        props: ['isAdmin']
        ,
        data() {
            return {
                productList: [],
                selected: {},
                currentPage: 0,
                isLoading: false,
                isLoadedLastPage: false,
                specCategory: null,
                specProductName: null,
                specCategorys: [
                    { text: '전체', value: null },
                    { text: '가전제품', value: 'ELECTRONICS' },
                    { text: '의류', value: 'CLOTHING' },
                    { text: '식품', value: 'FOOD' },
                    { text: '도서', value: 'BOOKS' },
                    { text: '소프트웨어', value: '스프트웨어' }
                ]
            }
        },
        methods: {
            async loadData() {
                this.isLoading = true; // 로딩 시작
                const params = {
                    size: 7,
                    page: this.currentPage,
                    category: this.specCategory,
                    productName: this.specProductName
                }

                // 문자열로 직접 ?size=10&page=0과 같이 조립할 수도 있지만, params 객체를 사용하면 파라미터형식으로 url 조립
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, { params });

                const additionalData = getResultData(response).content.map(p => { return { ...p, productCount: 0 } });

                if (additionalData.length < params.size) this.isLoadedLastPage = true;

                this.productList.push(...additionalData);

                this.currentPage++;
                this.isLoading = false; // 로딩 종료
            },
            async createOrder() {
                // console.log(this.productList);
                // console.log(this.selected);
                const newOrder = [];

                for (const selectedId in this.selected) {
                    const product = this.productList.find(p => p.id == selectedId);
                    if (product && product.productCount > 0) {
                        newOrder.push({ productId: product.id, productCount: product.productCount });
                    }
                }

                console.log(newOrder)
                if (newOrder.length == 0) return;
                // await axios.post(`${process.env.VUE_APP_API_BASE_URL}/orders`, JSON.stringify(newOrder));
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/orders`, newOrder)
                    .then(response => {
                        alert("주문이 완료되었습니다.", response);
                        // this.$router.push('/order/list'); // 주문 목록 페이지로 이동
                    })
                    .catch(error => {
                        console.error("주문 생성 실패: ", error);
                        alert("주문 생성에 실패했습니다. 다시 시도해주세요.");
                    });
            },
            scrollPaging() {
                // 전체 화면 높이 + 스크롤로 이동한 거리 > 전체 화면 높이 - n(내가 원하는 임계값, 여기서는 100px)
                const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
                if (isBottom && !this.isLoading && !this.isLoadedLastPage) {
                    // 스크롤이 바닥에 닿았을 때 추가 데이터를 로드하는 로직
                    this.loadData();
                    console.log(this.currentPage);
                }
            },
            searchProducts() {
                this.productList = [];
                this.isLoadedLastPage = false;
                this.isLoading = false;
                this.currentPage = 0;
                this.loadData();
            },
            deleteProduct(id) {
                // console.log("상품 삭제 요청: ", productId);
                // 상품 삭제 로직
                id;

                // 지금은 외래키 걸려있어서 안 됨
                // axios.delete(`${process.env.VUE_APP_API_BASE_URL}/product/${id}`) 
                // .then(response => {
                //     // this.productList = this.productList.filter(p => p.id !== productId);
                //     alert("상품이 삭제되었습니다.", response);
                // })
                // .catch(error => {
                //     console.error("상품 삭제 실패: ", error);
                //     alert("상품 삭제에 실패했습니다. 다시 시도해주세요.");
                // });
            },
            addCart() {
                const orderProducts = this.productList
                    .filter(p => this.selected[p.id] && p.productCount > 0)
                    .map(p => ({ productId: p.id, name: p.name, productCount: p.productCount }));


                orderProducts.forEach(p => this.$store.dispatch('addCart', p));
            }
        },
        created() {
            this.loadData(); // 컴포넌트 생성 시 상품 목록 데이터 로드

            window.addEventListener('scroll', this.scrollPaging);
        }
    }
</script>

<style lang="scss" scoped></style>