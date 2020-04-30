import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueTextareaAutosize from 'vue-textarea-autosize';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.use(VueTextareaAutosize);
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyBKiCV0CbC4IBdILJMtxlV5tbHCxiwjrKI",
        authDomain: "fitify-7daf8.firebaseapp.com",
        databaseURL: "https://fitify-7daf8.firebaseio.com",
        projectId: "fitify-7daf8",
        storageBucket: "fitify-7daf8.appspot.com",
        messagingSenderId: "724801154995",
        appId: "1:724801154995:web:20d96734b46705c7bf65c6"
});

export const db = firebase.firestore();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
