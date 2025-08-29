<template>
    <v-contianer>
        <v-row justify="center">
            <v-col cols="6">
                <v-card-title class="text-h5 text-center">
                    상품등록
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="상품명" v-model="name" />
                        <v-text-field label="카테고리" v-model="category" />
                        <v-text-field label="가격" v-model.number="price" />
                        <v-text-field label="재고 수량" v-model.number="stockQuantity" />
                        <!-- @change 태그의 변경이 감지되면 -->
                        <v-file-input label="상품 이미지" multiple accept="image/**" @change="fileUpload" />
                        <v-row>
                            <v-col>
                                <!-- block : 속한 row에서 너비를 꽉 채우는 옵션 -->
                                <v-btn color="primary" block @click="productCreate">상품 등록</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-col>
        </v-row>
    </v-contianer>
</template>

<script>
import axios from 'axios';

    export default {
        data() {
            return {
                name: '',
                category: '',
                price: null,
                stockQuantity: null,
                productImage: null
            }
        },
        methods: {
            fileUpload(event) {
                // 여러 개의 이미지일 경우 for문을 사용하여 productImage에 값 할당해줘야한다. 여기선 하나의 이미지만 업로드하게만 구현
                this.productImage = event.target.files[0];
            },
            async productCreate() {
                // multipart/form-data 형식으로 데이터를 전송하기 위해 FormData 객체를 사용
                const formData = new FormData();
                formData.append('name', this.name);
                formData.append('category', this.category);
                formData.append('price', this.price);
                formData.append('stockQuantity', this.stockQuantity);
                formData.append('productImg', this.productImage);

                // 상품 등록 API 호출
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/product/create`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {
                    alert("상품이 등록되었습니다.");
                    this.$router.push('/product/manage'); // 상품 목록 페이지로 이동
                }).catch(error => {
                    console.error("상품 등록 실패:", error);
                    alert("상품 등록에 실패했습니다. 다시 시도해주세요.");
                });
            }
        }
    }
</script>

<style lang="scss" scoped></style>