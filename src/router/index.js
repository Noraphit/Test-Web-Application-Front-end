import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from "../components/UserView.vue"
import UserCreate from "../components/UserCreate.vue";
import UserEdit from "../components/UserEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView
    },
    {
      path: '/user',
      name: 'UserView',
      component: UserView
    },
    {
      path: '/create',
      name: 'UserCreate',
      component: UserCreate
    },
    {
      path: '/:id/edit',
      name: 'UserEdit',
      component: UserEdit
    },

  ]
})

export default router
