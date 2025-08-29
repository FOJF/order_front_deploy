<template>
    <v-contianer>
        <v-row justify="center">
            <v-col cols="6">
                <v-card-title class="text-h5 text-center">
                    로그인
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="이메일" type="email" prepend-icon="mdi-email" v-model="email"
                            @keyup.enter="doLogin" />
                        <v-text-field label="비밀번호" type="password" prepend-icon="mdi-lock" v-model="password"
                            @keyup.enter="doLogin" />
                        <v-row>
                            <v-col>
                                <!-- block : 속한 row에서 너비를 꽉 채우는 옵션 -->
                                <v-btn color="primary" block @click="doLogin">로그인</v-btn>
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
    import { getResultData } from '@/utils/commonDataHandler';

    export default {
        data() {
            return {
                email: '', // 로그인에 필요한 이메일
                password: '' // 로그인에 필요한 비밀번호
            }
        },
        methods: {
            async doLogin() {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member-service/member/doLogin`, {
                    // 로그인에 필요한 데이터
                    email: this.email,
                    password: this.password
                }).then(response => {
                    // 로그인 성공 시 토큰 저장
                    const responseData = getResultData(response);
                    localStorage.setItem('accessToken', responseData.accessToken);
                    localStorage.setItem('refreshToken', responseData.refreshToken);

                    window.location.href = '/'; // 홈으로 이동
                }).catch(error => {
                    // console.error("로그인 실패:", error);
                    console.error("로그인 실패: ", error);
                    alert("로그인에 실패했습니다. 다시 시도해주세요.");
                });
            }
        }
    }
</script>

<style lang="scss" scoped></style>