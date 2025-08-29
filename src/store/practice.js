function initState() {
    return {
        count: 0,
    }
}

// 상태 유효 범위와 리셋 시점
// 리셋 시점 : 페이지 새로고침, 브라우저 종료시
// 유효 시점 : SPA 라우팅 시
export const practice = {
    // 상태 초기화
    state: initState,

    // 상태값을 변경하는 메서드
    mutations: {
        incrementCount(state) {
            state.count++;
        }
    },
    // 컴포넌트에서 mutations를 직접 호출하는 대신 actions를 통해 mutations를 호출
    actions: {
        incrementCount(context) {
            // vuex에서 actions를 통해 mutations를 호출할 때는 commit 메서드를 사용
            // 이와 같은 구조는 여러 mutations의 조합을 actions에서 호출 할 수 있기 때문에
            context.commit('incrementCount');
        }
    },

    // 상태값을 가져가는 메서드
    getters: {
        getStoreCount: state => state.count,
    }
}