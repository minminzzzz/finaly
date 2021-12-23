import Vue from "vue";
import VueRouter from "vue-router";
import bmi from "../views/BMITest.vue";
import About from "../views/About.vue";
import page from "../views/page.vue";
import bna from "../views/bna.vue";
import CRUD from "../views/CRUD.vue";
import ABC from "../components/HelloWorld.vue";
import SigninForm from "../views/SigninForm.vue" 
import Profile from "../views/Profile.vue" 

import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: page,
    meta: { 
      requiresAuth: true, },
  },

  {
    path: "/bna",
    name: "Home2",
    component: bna,
    meta: { 
      requiresAuth: true, },
  },


  {
    path: "/signinform",
    name: "Sign in Form",
    component: SigninForm,
  },


  {
    path: "/abc",
    name: "ABC",
    component: ABC,
  },
  {
    path: "/bmi",
    name: "page",
    component: bmi,
    meta: { 
      requiresAuth: true, },
  },
  {
    path: "/crud",
    name: "CRUD",
    component: CRUD,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { 
      requiresAuth: true, },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  // base: "/ite",
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const auth = getAuth(); 
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next(); 
      } else { 
        next({ path: "/signinform" }); 
      } 
    }); 
  } else { 
    next(); 
  } 
});

export default router;
