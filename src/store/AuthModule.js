
import AuthService from "@/services/auth/AuthService";

// 로컬저장소에서 user의 정보를 받기
const user = JSON.parse(localStorage.getItem("user"));

// user 상태 정보 설정
// 1) 로그인이 되어있을때 상태 정보 : loggedIn = true
// 2) 로그인이 되지않을때 상태 정보 : loggedIn: false
const initialState = user ? { status : {loggedIn : true}, user}
    : {status: {loggedIn: false}, user: null}


export const auth = {
    namespaced:true,
    // 데이터 정의
    state: initialState,
    // getter 메소드들 정의
    getters: {
    },
    // setter 메소드들 정의
    mutations: {
        // 로그인 성공 메소드
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        // 로그인 실패 메소드
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
    //    로그아웃 메소드 ( 상태정보 갱신 : false )
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
    //    회원가입 성공 메소드
        registerSuccess(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
    //    회원가입 실패 메소드
        registerFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
    },
    // 비동기 함수들 정의
    // axios 통신 ( 성격 : 서버에서 결과를 언제 보내줄 지 모름 )
    actions: {
        login({ commit }, user) {
            // axios 통신 : login ( AuthService.login )
            // springboot 로 login 관련 요청 ( username, password )
            return AuthService.login(user)
        //    성공하면 then
                .then( user => {
                    // commit(뮤테션 메소드명)
                    // loginSuccess(state, user) 메소드 호출
                    // loggedIn 속성 : true, user 속성 : user
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                    },
                    error => {
                    // loginFailure(state) 메소드 호출
                    commit('loginFailure')
                        return Promise.reject(error);
                    }
                );
        },
        logout({commit}) {
            // 로컬저장소에서 user 삭제
            AuthService.logout();
        //    상태정보 갱신 : loggedIn = false
        //    mutations : logout() 메소드 호출
            commit("logout");
        },
    //    register (회원가입)
        register({commit},user) {
            // axios 서버쪽으로 user객체를 전송해서 insert 요청을 함
            AuthService.register(user)
        //    성공하면 then
                .then(response => {
                    // mutations : registerSuccess(state) 메소드 호출
                    commit("registerSuccess");
                    return Promise.resolve(response.data);
                    },
                    error => {
                    // mutations : registerFailure(state) 메소드 호출
                        commit("registerFailure");
                        // 비동기 함수 실패시 : Promise.reject 호출됨
                        return Promise.reject(error);
                    }

                )
        }

    }
}