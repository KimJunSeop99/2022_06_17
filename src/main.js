import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// bootstrap
// popper : bootstrap 팝업창 띄우는 소스)
// fontawesome-svg-icons 등 : 화면에 아이콘들 설치
// vee-validate : 뷰 유효성 체크 모듈

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

// 뷰 유효성 체크 import
import VeeValidate from "vee-validate";

// 웹 아이콘 import
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome,faUser,faUserPlus,faSignInAlt,faSignOutAlt);


Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
