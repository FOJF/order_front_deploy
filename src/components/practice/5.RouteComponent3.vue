<template>
    <div>
        라우트3 테스트
    </div>
    <div>{{ product.id }}</div>
    <div>{{ product.name }}</div>
    <div>{{ product.price }}</div>

</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                product: null,
            }
        },
        methods: {

        },
        async created() {
            console.log(this.$route.params.productId);
            const res = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/${this.$route.params.productId}`);
            this.product = res.data;
        },
    }
</script>

<style lang="scss" scoped></style>