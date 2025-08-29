import ProductListComponent from "@/components/ProductListComponent.vue";
import ProductCreate from "@/views/ProductCreate.vue";

export const productRouter = [
    {
        path: "/product/list",
        name: "ProductListComponent",
        component: ProductListComponent
    },
    {
        path: "/product/manage",
        name: "ProductManageComponent",
        component: ProductListComponent,
        props: { isAdmin: true }
    },
    {
        path: "/product/create",
        name: "ProductCreate",
        component: ProductCreate
    }
]