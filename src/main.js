import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

// import  firebase  from "firebase/app";
// import  "firebase/firestore";

import { initializeApp } from "firebase/app";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyA1YNmQXO978RtXR-3uIF5g2_03VTT30QQ",
  authDomain: "minnn-1564.firebaseapp.com",
  projectId: "minnn-1564",
  storageBucket: "minnn-1564.appspot.com",
  messagingSenderId: "23490253816",
  appId: "1:23490253816:web:c423d4c6c0e11727807c0d",
  measurementId: "G-K3YNK4Y9LS"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  firebase,  
  render: h => h(App)
}).$mount('#app')
