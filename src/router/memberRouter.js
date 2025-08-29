import MemberListComponent from "@/components/MemberListComponent.vue";
import MemberCreate from "@/views/MemberCreate.vue";
import MemberDetailComponent from "@/components/MemberDetailComponent.vue";
import MemberLogin from "@/views/MemberLogin.vue";
import MyPage from "@/views/MyPage.vue";

export const memberRouter = [
    {
        path: "/member/create",
        name: "MemberCreate",
        component: MemberCreate
    },
    {
        path: "/member/login",
        name: "MemberLogin",
        component: MemberLogin
    },
    {
        path: "/member/list",
        name: "MemberListComponent",
        component: MemberListComponent
    },
    {
        path: "/member/detail/:id",
        name: "MemberDetailComponent",
        component: MemberDetailComponent,
        props: { pageTitle: "회원 상세 정보" }
    },
    {
        path: "/member/mypage",
        name: "MyPage",
        component: MyPage
    }
]