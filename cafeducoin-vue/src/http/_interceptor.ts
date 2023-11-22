// @ts-check
import axios from 'axios';
import { useUserStore } from '@/store/user.store';
import router from '@/router';
import { useToast } from 'vue-toast-notification';


axios.interceptors.response.use(response => response, err => {
	const $toast = useToast();
  const userStore = useUserStore()
  if (err.response.status === 401) {
		userStore.logUserOut();
		router.push('/login');
		$toast.error('Votre session de connexion a expiré. Veuillez vous reconnecter.')
	}
})
