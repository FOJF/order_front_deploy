<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        회원 목록
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="member in memberList" :key="member.id">
                                    <td>{{ member.id }}</td>
                                    <td>{{ member.name }}</td>
                                    <td>{{ member.email }}</td>
                                    <td><v-btn :to="`/member/detail/${member.id}`">상세보기</v-btn></td>
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
        data() {
            return {
                memberList: [] // 회원 목록을 저장할 배열
            }
        },
        async created() {
            await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`)
                .then(response => {
                    this.memberList = getResultData(response); // API 응답에서 회원 목록을 가져옴
                })
                .catch(error => {
                    console.error("회원 목록 조회 실패: ", error);
                    // alert("회원 목록을 불러오는 데 실패했습니다.");
                });
        }
    }
</script>

<style lang="scss" scoped></style>