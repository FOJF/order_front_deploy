import { cart } from "./cart";
import { practice } from "./practice";

const { createStore } = require("vuex");

const store = createStore({
    modules: {
        practice, cart
    }
})

export default store;