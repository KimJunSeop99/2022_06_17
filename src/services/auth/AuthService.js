// AuthService.js
// login / logout / register 처리

import http from "../../http-auth";

class AuthService {
//    로그인 메소드(함수)
    login(user){
        // springboot 서버로 로그인 정보 확인 요청
        return http.post("signin", {
                username: user.username,
                password: user.password
            }
        )
    //    성공하면 then
            .then(response => {
                console.log(response.data);
                console.log("accessToken" + response.data.token);
                // JSON.stringify : json 객체 > 문자열로 변환
                // JSON.parse : 문자열 > json 객체로 변환
                if (response.data.token) {
                    localStorage.setItem("user",JSON.stringify(response.data))
                }
                return response.data;
            })
    }

    // logout
    logout(){
        localStorage.removeItem("user")
    }
    // POST 방식 : springboot 서버에 회원가입을 요청 ( insert )
    // 영문사이트 : sign up (회원가입), sign in (로그인)
    register(user) {
        return http.post("/signup", {
            username : user.username,
            email: user.email,
            password: user.password
        })
    }
}

export default new AuthService();