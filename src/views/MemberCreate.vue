<template>
    <v-contianer>
        <v-row justify="center">
            <v-col cols="6">
                <v-card-title class="text-h5 text-center">
                    회원가입
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field label="이름" type="text" prepend-icon="mdi-account" v-model="name" />
                        <v-text-field label="이메일" type="email" prepend-icon="mdi-email" v-model="email" />
                        <v-text-field label="비밀번호" type="password" prepend-icon="mdi-lock" v-model="password" />
                        <v-row>
                            <v-col>
                                <!-- block : 속한 row에서 너비를 꽉 채우는 옵션 -->
                                <v-btn color="primary" block @click="memberCreate">회원가입</v-btn>
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
                name: '', // 회원가입에 필요한 이름
                email: '', // 회원가입에 필요한 이메일
                password: '' // 회원가입에 필요한 비밀번호
            }
        }, methods: {
            async memberCreate() {
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, {
                    // 회원가입에 필요한 데이터
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }).then(() => {
                    this.$router.push('/member/login'); // 회원가입 후 로그인 페이지로 이동
                }).catch(error => {
                    console.error("회원가입 실패:", error);
                    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
                });
            }
        }
    }
</script>

<style lang="scss" scoped></style>