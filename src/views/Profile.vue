<template>
  <v-container>
    
    &nbsp;&nbsp;
    
    <v-row justify="space-around">
      <v-card width="500">
          
        <v-img
          height="300px"
          src="https://img.wallpapersafari.com/desktop/1920/1080/3/97/52JEF9.jpg"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-h6 white--text pl-0">
              bekery
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                :src=user.photoURL
              >
            </v-avatar>
            
              <div> {{user.displayName}} </div>
              <v-row cols="12" class="d-flex justify-center align-center">
              <div> {{user.email}} </div></v-row>
            
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            
          </div>

          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>




<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
    data: () => ({
        messages: [
        {
          from: 'Bekery',
          message: `Open.`,
          time: '10:00am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'Bekery',
          message: 'Close',
          time: '22:00am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'Bekery',
          message: 'Rest day',
          time: 'Saturday-Sonday',
          color: 'deep-purple lighten-1',
        },
      ],
        user: {}
    }),

    methods: {
        authStateChanged() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties 
                    // https://firebase.google.com/docs/reference/js/firebase.User 
                    console.log(user);
                    this.user = user;
                    // ... 
                } else {
                    
                    // User is signed out 
                    // ... 
                }
            });
        },


    },
    watch: {},
    computed: {},
    mounted() {
        this.authStateChanged();
    },
};
</script>

<style>
</style>