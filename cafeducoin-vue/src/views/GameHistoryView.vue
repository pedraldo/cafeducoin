<template>
	<div>
		<h2>{{ game.name }}</h2>
		<h5>{{ gameAvailability.label }}</h5>
		<button 
			v-if="gameAvailability.value"
			class="btn btn-primary" 
			@click="toggleGameBorrowing(game, gameAvailability.value)"
		>Emprunter</button>
		<button 
			v-if="!gameAvailability.value && gameHistory[0].user_id === userStore.user.id"
			class="btn btn-primary" 
			@click="toggleGameBorrowing(game, gameAvailability.value)"
		>Rendre</button>
	</div>
  <div
		v-for="gameHistoryItem, index in gameHistory"
		:key="index"
		class="card my-2"
	>
	<div class="card-body">
    <h5 class="card-title">{{ getGameActionsLabel(gameHistoryItem.action_type) }}</h5>
    <div>
			<span v-if="gameHistoryItem.user_id !== userStore.user.id">Par {{ gameHistoryItem.user_firstname }} {{ gameHistoryItem.user_lastname }}</span>
			<span v-else>Par <strong>Vous</strong></span>
			<div class="ml-1">Le {{ format(new Date(gameHistoryItem.action_date), 'dd/MM/y à HH:mm') }}</div>
		</div>
  </div>
  </div>
</template>

<script setup lang="ts">
import type { GameHistoryItem, Game } from '@/types/shared/shared.types';
import { computed, onMounted, ref } from 'vue';
import { getGameById, getGameHistory } from '@/http/games.http'
import { borrowOrReturnGame, gameAvailabalityData, getGameActionsLabel } from '@/services/games.service';
import router from '@/router';
import { format } from 'date-fns';
import { useUserStore } from '@/store/user.store';

const gameHistory = ref([] as GameHistoryItem[]);
const game = ref({} as Game);
const routeParams = router.currentRoute.value.params
const gameId = routeParams.id as string;
const userStore = useUserStore();

const gameAvailability = computed(() => 
	gameHistory.value[0]
		? gameHistory.value[0].action_type === 'RETURN'
			? gameAvailabalityData[1]
			: gameAvailabalityData[0]
		: gameAvailabalityData[1]
);

onMounted(async () => {
	game.value = await getGameById(gameId);
	gameHistory.value = await getGameHistory(gameId);
	fetchGameHistoryData();
})

const toggleGameBorrowing = async (game: Game, isAvailable: boolean): Promise<void> => {
	const userGame = await borrowOrReturnGame({id: gameId, name: game.name}, isAvailable);
	if (userGame && userGame.id) {
		fetchGameHistoryData();
	}
}

const fetchGameHistoryData = async () => { gameHistory.value = await getGameHistory(gameId); }
</script>

<style>
.card {
	max-width: 500px;
}
</style>