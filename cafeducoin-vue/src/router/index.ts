import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user.store';
import GamesListViewVue from '@/views/GamesListView.vue';
import LoginViewVue from '@/views/LoginView.vue';
import RegisterViewVue from '@/views/RegisterView.vue';
import GameHistoryViewVue from '@/views/GameHistoryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'games',
      component: GamesListViewVue,
    },
		{
      path: '/games/:id',
      name: 'gameHistory',
      component: GameHistoryViewVue,
    },
		{
      path: '/login',
      name: 'login',
      component: LoginViewVue,
			meta: {
				public: true
			}
    },
		{
      path: '/register',
      name: 'register',
      component: RegisterViewVue,
			meta: {
				public: true
			}
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
});

router.beforeEach((to, from, next) => {
const userStore = useUserStore();
	if(!to.meta.public && !userStore.isUserLoggedIn) {
		next({
			path: '/login',
			query: {
				redirect: to.fullPath
			}
		})
	} else {
		next();
	}
});

export default router
