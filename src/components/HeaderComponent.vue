<template>
    <v-app-bar app>
        <v-container>
            <v-row>
                <!-- justify-start : 왼쪽 기준 정렬 -->
                <v-col class="d-flex justify-start">
                    <div v-if="userRole === 'ADMIN'">
                        <v-btn :to="'/member/list'">회원 관리</v-btn>
                        <v-btn :to="'/product/manage'">상품 관리</v-btn>
                        <v-btn :to="'/order/list'" @click="liveOrderCount=0">실시간 주문 건 수 {{ liveOrderCount > 0 ? '('+liveOrderCount+')' : '' }}</v-btn>
                        <!-- <v-btn :to="'/practice/store'">Store Test</v-btn> -->
                    </div>
                </v-col>
                <v-col class="text-center">
                    <v-btn :to="'/'">SPRING_AUTO_BUILD SHOP</v-btn>
                </v-col>
                <v-col class="d-flex justify-end">
                    <v-btn v-if="accessToken" :to="'/order/cart'">장바구니 {{ cartProductCount > 0 ? '('+cartProductCount+')' : ''
                        }}</v-btn>
                    <v-btn :to="'/product/list'">상품 목록</v-btn>
                    <v-btn v-if="accessToken" :to="'/member/mypage'">마이 페이지</v-btn>
                    <v-btn v-if="accessToken" @click="doLogout">로그아웃</v-btn>

                    <v-btn v-if="!accessToken" :to="'/member/create'">회원가입</v-btn>
                    <v-btn v-if="!accessToken" :to="'/member/login'">로그인</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app-bar>
</template>

<script>
    import { EventSourcePolyfill } from 'event-source-polyfill';
import { jwtDecode } from 'jwt-decode';

    export default {
        data() {
            return {
                userRole: null, // 예시로 ADMIN 역할을 사용
                accessToken: '', // 로그인 시 발급받은 토큰
                sse: null,
                liveOrderCount: 0
            }
        },
        created() {
            this.accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기
            if (this.accessToken) {
                // 토큰이 있다면 사용자 역할을 확인하는 로직 추가 가능
                // 예: this.userRole = 'ADMIN'; // 실제로는 API 호출로 역할을 가져와야 함
                const payload = jwtDecode(this.accessToken);
                this.userRole = payload.role;
            }

            // sse 연결 및 수신
            if (this.userRole === 'ADMIN' && !this.sse) {
                // sse연결요청을 위한 event-source-polyfill 라이브러리 사용
                this.sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse`, {
                    headers : {
                        Authorization: `Bearer ${this.accessToken}`
                    }
                });

                this.sse.addEventListener('connected', (event) => {
                    console.log(event);
                });
                
                this.sse.addEventListener('ordering', (event) => {
                    const data = JSON.parse(event.data);
                    if (data.orderStatus == 'ORDERED')
                        this.liveOrderCount++;
                    console.log(data);
                    console.log(this.liveOrderCount);
                });
            }
        },
        methods: {
            doLogout() {
                // 로그아웃 처리 로직
                this.accessToken = null; // 토큰 초기화
                this.userRole = null; // 사용자 역할 초기화
                localStorage.removeItem('accessToken'); // 로컬 스토리지에서 토큰 제거
                localStorage.removeItem('refreshToken'); // 리프레시 토큰 제거
                this.$router.push('/'); // 홈으로 이동
            }
        },
        computed: {
            // 장바구니 상품 수 계산
            cartProductCount() {
                return this.$store.getters.getTotalQuantity;
            }
        }
    }
</script>

<style lang="scss" scoped></style>