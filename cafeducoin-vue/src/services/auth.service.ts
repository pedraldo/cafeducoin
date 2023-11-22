import { useUserStore } from "@/store/user.store";


const getAuthorizationHeader = (() => {
	const userStore = useUserStore();
	return {
		headers: {
			'Authorization': `Bearer ${userStore.user.token}`
		}
	}
});

export { getAuthorizationHeader }