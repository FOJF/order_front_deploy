<template>
    <v-container>
        <v-row>
            <v-col cols="8">Hello World 1</v-col>
            <v-col cols="4">Hello World 2</v-col>
        </v-row>
        <v-row>
            <v-card>
                <v-card-title>회원 가입</v-card-title>
                <v-card-text>
                    회원가입을 해주세요
                </v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test1</td>
                        <td>test1@naver.com</td>
                    </tr>
                    <tr>
                        <td>test2</td>
                        <td>test2@naver.com</td>
                    </tr>
                </tbody>

            </v-simple-table>
        </v-row>
    </v-container>

    <v-card>
        <v-card-title style="font-size: 200px;">회원 가입</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field label="이름" />
                <v-text-field label="이메일" type="email" />
                <v-text-field label="비밀번호" type="password" />
                <v-btn color="primary">회원 가입</v-btn>
            </v-form>
        </v-card-text>
    </v-card>

    <!-- 모달 창(팝업)을 위한 v-dialog -->
    <v-btn color="primary" @click="dialog = true">취소</v-btn>
    <!-- v-dialog는 내부적으로 true/false값을 가지고 외부 공개 될지 말지 여부가 결정 -->
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>정말 취소 하시겠습니까?</v-card-title>
            <v-card-actions>
                <v-btn @click="dialog = false">예</v-btn>
                <v-btn @click="dialog = false">아니오</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog: false // 모달 창의 상태를 관리하는 변수
            }
        }
    }
</script>