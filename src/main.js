// 중괄호가 쳐져 있으면, export된 항목 중 하나만 선택하여 import
// 중괄호가 없으면 default(대표요소)를 import
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'; // mdi 아이콘을 사용하기 위한 CSS 파일
import axios from 'axios';
import { getResultData } from './utils/commonDataHandler';
import store from './store';

axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    }, error => {
        return Promise.reject(error);
    }
);

// 모든 axios요청에서 401을 받을경우에 interceptor를 통해 rt를 통한 at 재발급
// rt마저 만료되었을때는 login창으로 이동
axios.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            try {
                console.log("heeer")
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-at`, { refreshToken });
                const result = getResultData(response);
                localStorage.setItem("accessToken", result.accessToken);
                console.log("갱신성공")
                window.location.reload();
            } catch (e) {
                console.log("갱신 실패", e);
                localStorage.clear();
                window.location.href = "/member/login";
            }
        }
        return Promise.reject(error);
    }
)

const app = createApp(App);

app.use(store)
app.use(vuetify)
app.use(router)
app.mount('#app')