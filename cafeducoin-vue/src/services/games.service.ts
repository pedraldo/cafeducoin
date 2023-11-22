import { toggleGameBorrowing } from "@/http/games.http";
import { useUserStore } from "@/store/user.store";
import type { GameActionType, GameAvailabality, UserGame } from "@/types/shared/shared.types";
import { useToast } from 'vue-toast-notification';

const $toast = useToast();

const borrowOrReturnGame = async (game: { id: string; name: string;}, isAvailable: boolean): Promise<UserGame> => {
	const userStore = useUserStore();
	const gameId = game.id;
	const userGame: UserGame = await toggleGameBorrowing(gameId, userStore.user.id, isAvailable);
	if(userGame?.id) {
		$toast.success(`Vous avez bien ${isAvailable ? 'emprunté' : 'rendu'} le jeu '${game.name}' !`);
	} else {
		$toast.error(`Erreur lors ${isAvailable ? "de l'emprunt": 'du rendu'} du jeu '${game.name}' ...`);
	}
	return userGame;
}

const gameAvailabalityData: GameAvailabality[] = [
	{value: false, label: 'Emprunté'},
	{value: true, label: 'Disponible'}
];

const getGameActionsLabel = ((key: GameActionType) => {
	switch (key) {
		case 'RETURN': return 'Retourné';
		case 'BORROWING' : return 'Emprunté';
	}
}) 

export { 
	borrowOrReturnGame,
	gameAvailabalityData,
	getGameActionsLabel
}