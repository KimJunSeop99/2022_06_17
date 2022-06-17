<template>
 <div>
   <div class="col-md-12">
     <div class="card card-container">
       <img
           id="profile-img"
           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
           class="profile-img-card"
       />
       <form name="form" @submit.prevent="handleRegister">
<!--         successful : false 이면 회원가입버튼을 클릭 안한 상태 -->
<!--         successful : false 이면 회원가입 중 에러발생 상태 -->
         <div v-if="!successful">
<!--           유저이름 #1-->
           <div class="form-group">
             <label for="username">Username</label>
             <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
             >
<!--             submit 버튼을 누르고 && 유효성에러가 발생했을 경우 아래 내용이 보임-->
             <div
               v-if="errors.has('username') && submitted"
               class="alert-danger"
             >
               {{ errors.first("username") }}
             </div>
           </div>
<!--            유저이름 끝#1-->
<!--            이메일 #2-->
         <div class="form-group">
           <label for="email">Email</label>
           <input
               v-model="user.email"
               v-validate="'required|max:50'"
               type="text"
               class="form-control"
               name="email"
           >
           <!--             submit 버튼을 누르고 && 유효성에러가 발생했을 경우 아래 내용이 보임-->
           <div
               v-if="errors.has('email') && submitted"
               class="alert-danger"
           >
             {{ errors.first("email") }}
           </div>
         </div>
<!--            이메일 끝 #2-->
<!--            패스워드 #3-->
         <div class="form-group">
           <label for="password">Password</label>
           <input
               v-model="user.password"
               v-validate="'required|min:6|max:20'"
               type="text"
               class="form-control"
               name="password"
           >
           <!--             submit 버튼을 누르고 && 유효성에러가 발생했을 경우 아래 내용이 보임-->
           <div
               v-if="errors.has('password') && submitted"
               class="alert-danger"
           >
             {{ errors.first("password") }}
           </div>
         </div>
<!--         패스워드 끝 #3-->
         <!--         submit 버튼 시작 -->
         <div class="form-group">
           <button class="btn btn-primary btn-block">
             Sign Up
           </button>
         </div>
<!--         submit 버튼끝 -->
         </div>
<!--        successful div 끝 -->
       </form>

       <div
         v-if="message"
         class="alert"
         :class="successful ? 'alert-success' : 'alert-danger'"
         >
         {{ message }}
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import User from "@/models/user";

/* eslint-disable */

export default {
  name: "Register",
  data() {
    return{
      user: new User("","",""),
      submitted: false,
      successful: false,
      message: "" // 에러메시지 저장용
    }
  },
  computed: {
    loggedIn() {
      // 공유저장소의 user 객체에 속성인 loggedIn 값을 가져옴
      return this.$store.state.auth.status.loggedIn;
    }
  },
  // 화면이 뜨자마자 실행되는 이벤트
  mounted() {
  // 로그인이 되어있는 유저이면 /profile 로 강제 페이지 이동시키기
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods:{
    // 회원가입
    handleRegister() {
      this.message = "";
      this.submitted = true; // 회원가입 버튼 클릭시
    //  유효성 체크 로직 실행 ( Vee-Validate 적용 )
    //  $validator.validate() 입력양식 유효성 체크가 통과하면
    //  isValid = true
      this.$validator.validate()
          .then(isValid => {
        //    isValid = true 일때만 아래가 실행됨
        if (isValid) {
        //    springboot 서버 통신 : 공유저장소의 비동기 메소드 호출 ( register )
          this.$store.dispatch("auth/register", this.user)
        //  성공 / 실패 then
        //  성공하면 첫번째 매개변수 실행
        //  실패하면 두번째 매개변수 실행
              .then(
              //    성공
                  data => {
                    // response == date ( 서버쪽 응답 메세지 (객체) )
                    this.message = data.message;
                    this.successful = true;
                  //   강제 페이지 전환 ( 개발자 마음 해도되고 안해도됨 )
                  //   this.$router.push("/login")
                  },
              //    실패
                  error => {
                    this.message =
                        (error.message || error.toString());
                    this.successful = false;
                  }
              )
        }
      })
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>