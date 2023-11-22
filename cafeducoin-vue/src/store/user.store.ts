import type { User, UserCredentials, UserRegisterInfos, UserWithToken } from '@/types/shared/shared.types';
import { login, register } from "@/http/authentication.http";
import { computed, reactive } from "vue";
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';


export const useUserStore = defineStore('user', () => {
	const user = reactive({
		id: '',
		firstname: '',
		lastname: '',
		email: '',
		token: ''
	});

	const token = localStorage.getItem('token');
	if(token) {
		const decodedToken = jwtDecode<User>(token);
		user.id = decodedToken.id;
		user.firstname = decodedToken.firstname;
		user.lastname = decodedToken.lastname;
		user.email = decodedToken.email;
		user.token = token;
	}


	const isUserLoggedIn = computed(() => !!user.id && !!user.token);

	async function registerUser(userRegisterInfos: UserRegisterInfos): Promise<User> {
		try {
			const userRegistered = await register(userRegisterInfos);

			if(!userRegistered || !userRegistered.id) {
				const msg = 'Register failed.'
				console.error(msg);
			}
			return userRegistered;
		} catch(error) {
			console.error(error);
			return {} as User;
		}
	}
	
	async function logUserIn(userCredentials: UserCredentials): Promise<UserWithToken> {
		try {
			const userLogged = await login(userCredentials);
			if (!userLogged || !userLogged.token) {
				const msg = 'Login failed.'
				throw msg;
			}
			// cookies.set("SessionID", userLogged.token);
			localStorage.setItem('token', userLogged.token);
			user.id = userLogged.id;
			user.firstname = userLogged.firstname;
			user.lastname = userLogged.lastname;
			user.email = userLogged.email;
			user.token = userLogged.token;
			return user;
		} catch(error) {
			console.error(error);
			return {} as UserWithToken;
		}
	}

	function logUserOut(): void {
		user.id = '';
		user.email = '';
		user.firstname = '';
		user.lastname = '';
		user.token = '';
		localStorage.removeItem('token');
	}

	return {
		user,
		isUserLoggedIn,
		registerUser,
		logUserIn,
		logUserOut
	}
});
