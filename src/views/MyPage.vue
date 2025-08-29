<template>
    <!-- props 값 전달할때는 문자열로 넘길때는 변수명=값 나머지는 :변수명=값 -->
    <MemberDetailComponent :isMyPage="true" />
    <OrderListComponent :isMyPage="true" />
</template>

<script>
    import MemberDetailComponent from '@/components/MemberDetailComponent.vue';
    import OrderListComponent from '@/components/OrderListComponent.vue';

    export default {
        components: {
            MemberDetailComponent,
            OrderListComponent
        },
    }
</script>

<style lang="scss" scoped></style>