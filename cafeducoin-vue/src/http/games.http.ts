import type { Game, GameHistoryItem, GameListItem, UserGame } from '@/types/shared/shared.types';
import axios from 'axios';
import { getAuthorizationHeader } from '@/services/auth.service';
import { apiUrl } from './_config';

export async function getGames(): Promise<GameListItem[]> {
	return (await axios.get<GameListItem[]>(`${apiUrl}/games`, getAuthorizationHeader())).data;
}

export async function getGameById(gameId: string): Promise<Game> {
	return (await (axios.get<Game>(`${apiUrl}/games/${gameId}`, getAuthorizationHeader()))).data;
}

export async function getGameHistory(gameId: string): Promise<GameHistoryItem[]> {
	return (await (axios.get<GameHistoryItem[]>(`${apiUrl}/games/${gameId}/history`, getAuthorizationHeader()))).data;
}

export async function toggleGameBorrowing(gameId: string, userId: string, isAvailable: boolean): Promise<UserGame> {
	return (await axios.post<UserGame>(`${apiUrl}/games/${gameId}/borrowing`, { userId, isAvailable }, getAuthorizationHeader())).data;
}