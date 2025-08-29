<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h5 text-center">
                        {{ isMyPage ? '내 회원 정보' : '회원 상세 정보' }}
                    </v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>이름</th>
                                    <th>이메일</th>
                                    <th>권한</th>
                                    <th>삭제 여부</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ memberDetail.id }}</td>
                                    <td>{{ memberDetail.name }}</td>
                                    <td>{{ memberDetail.email }}</td>
                                    <td>{{ memberDetail.role }}</td>
                                    <td>{{ memberDetail.deleted ? '삭제됨' : '활성' }}</td>
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
        // 화면간에 매개변수를 넘길 때 사용하는 변수값을 props라고 부른다.
        props: ['isMyPage'],
        data() {
            return {
                memberDetail: {} // 회원 상세 정보를 저장할 객체
                // 여기에 필요한 데이터 속성을 추가할 수 있습니다.
            }
        },
        methods: {
            // 여기에 필요한 메소드를 추가할 수 있습니다.
        },
        async created() {
            const requestUrl = `${process.env.VUE_APP_API_BASE_URL}/member/${this.isMyPage ? 'myinfo' : 'detail/' + this.$route.params.id}`;

            // 컴포넌트가 생성될 때 실행할 로직을 여기에 추가
            await axios.get(requestUrl)
                .then(response => {
                    // API 응답에서 회원 상세 정보를 가져옴
                    this.memberDetail = getResultData(response);
                })
                .catch(error => {
                    console.error("회원 상세 정보 조회 실패: ", error);
                    alert("회원 상세 정보를 불러오는 데 실패했습니다.");
                });
        }
    }
</script>

<style lang="scss" scoped></style>