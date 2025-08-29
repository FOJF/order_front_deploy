<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        {{ isMyPage ? '내 주문 목록' : '모든 주문 목록' }}
                    </v-card-title>
                    <v-card-text>
                        <v-data-table :headers="tableHeaders" :items="orderList" show-expand>
                            <!-- template은 v-data-table에서 슬롯(slot)을 커스터마이징하는 문법 -->
                            <template v-slot:expanded-row="{ item, columns }">
                                <tr>
                                    <!-- colspan은 컬럼을 하나로 합한것 -->
                                    <td :colspan="columns.length">
                                        <v-icon size="small">mdi-package</v-icon>
                                        <strong>상세내역 : </strong>
                                        <span v-for="detail in item.orderDetails" :key="detail.detailId">
                                            {{ detail.productName }} ({{ detail.productCount }}개),
                                        </span>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
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
        props: ['isMyPage'],
        data() {
            return {
                tableHeaders: [{ title: "ID", key: "id" }, { title: "회원 이메일", key: "memberEmail" }, { title: "주문 상태", key: "orderStatus" }],
                orderList: [],
            }
        },
        methods: {
            // 여기에 필요한 메소드를 추가할 수 있습니다.
        },
        async created() {
            const requestUrl = `${process.env.VUE_APP_API_BASE_URL}/orders${this.isMyPage ? '/my-list' : ''}`;
            await axios.get(requestUrl)
                .then(response => {
                    this.orderList = getResultData(response); // API 응답에서 주문 목록을 가져옴
                })
                .catch(error => {
                    console.error("주문 목록 조회 실패: ", error);
                    alert("주문 목록을 불러오는 데 실패했습니다.");
                });
        }
    }
</script>

<style lang="scss" scoped></style>