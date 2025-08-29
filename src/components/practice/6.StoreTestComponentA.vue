<template>
    <h1>
        STORE TEST COMPONENT A
    </h1>
    <p>지역 변수 count : {{ count }}</p>
    <v-btn @click="incrementCount">count값 증가</v-btn>
    <br><br>
    <p>전역 store 변수 값 count : {{ getStoreCount() }}</p>
    <v-btn @click="incrementStoreCount">전역 store count값 증가</v-btn>
</template>

<script>
    export default {
        data() {
            return {
                count: 0,
            }
        },
        methods: {
            incrementCount() {
                this.count++;
            },
            incrementStoreCount() {
                // store의 actions를 호출할 때는 dispatch를 사용
                this.$store.dispatch('incrementCount');
            },
            getStoreCount() {
                return this.$store.getters.getStoreCount;
            }
        },
        computed: {
            // getStoreCount() {
            //     return this.$store.getters.getStoreCount;
            // }
        }
    }
</script>

<style lang="scss" scoped></style>