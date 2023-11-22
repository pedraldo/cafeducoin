import type { User } from '@/types/shared/shared.types';
import axios from 'axios';
import { getAuthorizationHeader } from '@/services/auth.service';
import { apiUrl } from './_config';

export async function getUsers(): Promise<User[]> {
	return (await axios.get<User[]>(`${apiUrl}/users`, getAuthorizationHeader())).data;
}

export async function getUserById(userId: string): Promise<User> {
	return (await (axios.get<User>(`${apiUrl}/users/${userId}`, getAuthorizationHeader()))).data;
}
