<template>
  <div
		v-for="game in games"
		:key="game.id"
		class="card my-2"
	>
		<div class="card-body">
			<h5 class="card-title">{{game.name }}</h5>
			<router-link
					:to="{ name: 'gameHistory', params: {id: game.id}}"
					v-slot="{ navigate }"
				>
					<button
						class="btn btn-primary"
						@click="navigate"
						role="link"
					>
						Historique
					</button>
				</router-link>
		</div>
  </div>
</template>

<script setup lang="ts">
import type { GameListItem } from '@/types/shared/shared.types';
import { onMounted, ref } from 'vue';
import { getGames } from '@/http/games.http'

const games = ref([] as GameListItem[]);

onMounted(async () => {
	games.value = await getGames();
})
</script>

<style>
.card {
	max-width: 500px;
}
</style>