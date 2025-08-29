import { createVuetify } from "vuetify";
import 'vuetify/styles'; // Vuetify 스타일을 가져옵니다.
import * as components from 'vuetify/components'; // components는 vuetify에서 사용할 수 있는 UI 컴포넌트를 의미
import * as directives from 'vuetify/directives'; // directives는 vuetify가 제공하는 추가 디자인 요소
import { mdi } from 'vuetify/iconsets/mdi';

export default createVuetify({
    components,
    directives,
    icons: { defaultSet: 'mdi', sets: { mdi } }
});