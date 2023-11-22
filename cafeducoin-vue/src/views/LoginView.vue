<template>
	<form @submit.prevent="onSubmit">
		<div class="form-group my-3">
			<label>Email</label>
			<input
				type="text"
				v-model="form.email"
				class="form-control"
				placeholder="Email"
				required
			/>
		</div>
		<div class="form-group my-3">
			<label>Mot de passe</label>
			<input
				type="password"
				v-model="form.password"
				class="form-control"
				placeholder="Mot de passe"
				required
			/>
		</div>
		<div 
			v-if="!!form.error"
			class="text-danger my-2"
		>{{ form.error }}</div>
		<div class="row mt-4 mx-0">
			<button
				:disabled="!validForm"
				class="btn btn-success"
				type="submit"
			>Se connecter</button>
			<router-link
				to="/register"
				custom
				v-slot="{ navigate }"
			>
				<button
					class="btn btn-primary"
					@click="navigate"
					role="link"
				>
					S'inscrire
				</button>
			</router-link>
		</div>
	</form>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useUserStore } from '@/store/user.store';
import router from '@/router';

const form = reactive({
	email: '',
	password: '',
	error: ''
});
const validForm = computed(() => form.email !== '' && form.password !== '');

const onSubmit = async () => {
	const userStore = useUserStore();
	form.error = '';
	const { email, password } = form;
	await userStore.logUserIn({email, password});

	if(userStore.isUserLoggedIn) {
		router.push(('/'));
	} else {
		form.error = 'Email et/ou mot de passe invalide(s)'
	}
	form.email = '';
	form.password = '';
}
</script>

<style>
.form-group {
	max-width: 500px;
}

button {
	width: 200px !important;
	margin: 10px 10px 0 0;
}
</style>