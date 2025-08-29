function initState() {
    return {
        totalQuantity: Number(localStorage.getItem("totalQuantity")) || 0,
        productsInCart: JSON.parse(localStorage.getItem("productsInCart")) || [],
    }
}

export const cart = {
    // 상태 초기화
    state: initState(),

    // 상태값을 변경하는 메서드
    mutations: {
        addCart(state, product) {
            // 전체 장바구니 수량
            state.totalQuantity += product.productCount;
            localStorage.setItem("totalQuantity", state.totalQuantity);
            console.log(state.productsInCart);
            // 장바구니 안에 상품목록
            const productInCart = state.productsInCart.find(p => p.productId === product.productId);
            if (productInCart) productInCart.productCount += product.productCount;
            else state.productsInCart.push(product);
            localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart));
        },
        clearCart(state) {
            state.totalQuantity = 0;
            state.productsInCart = [];
            localStorage.removeItem("totalQuantity");
            localStorage.removeItem("productsInCart");
        }

    },
    actions: {
        addCart(context, product) {
            context.commit('addCart', product);
        },
        clearCart(context) {
            context.commit('clearCart');
        }
    },

    // 상태값을 가져가는 메서드
    getters: {
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart
    }
}