<template>
  <v-app>
    <v-content>
      <Calendar/>
    </v-content>
  </v-app>
</template>
<script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-analytics.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-auth.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-firestore.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.11.0/firebase-database.js"></script>
<script>
import Calendar from './components/Calendar';

export default {
  name: 'App',

  components: {
    Calendar,
  },

  data: () => ({
    //
  }),
};
</script>
