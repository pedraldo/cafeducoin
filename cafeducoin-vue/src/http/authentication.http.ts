import type { User, UserCredentials, UserRegisterInfos, UserWithToken } from '@/types/shared/shared.types';
import axios from 'axios';
import { apiUrl } from './_config';

export async function register(user: UserRegisterInfos): Promise<User> {
	return (await axios.post<User>(`${apiUrl}/register`, user)).data;
}

export async function login(userCredentials: UserCredentials): Promise<UserWithToken> {
	return (await axios.post<UserWithToken>(`${apiUrl}/login`, userCredentials)).data;
}
