<template>
	<form @submit.prevent="onSubmit">
		<div class="form-group my-3">
			<label>Prénom</label>
			<input
				type="text"
				v-model="form.firstname"
				class="form-control"
				placeholder="Prénom"
				required
			/>
		</div>
		<div class="form-group my-3">
			<label>Nom</label>
			<input
				type="text"
				v-model="form.lastname"
				class="form-control"
				placeholder="Nom"
				required
			/>
		</div>
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
		<div class="form-group my-3">
			<label>Confirmer le mot de passe</label>
			<input
				type="password"
				v-model="form.passwordConfirm"
				class="form-control"
				placeholder="Mot de passe"
				required
			/>
		</div>
		<div
			v-if="!!form.password && form.password !== form.passwordConfirm"
			class="text-danger my-2"
		>
			Les 2 mots de passe ne sont pas identiques
		</div>
		<div class="row mx-0 mt-4">
			<button
				:disabled="!validForm"
				class="btn btn-success btn-block mr-2"
				type="submit"
			>S'inscrire</button>
			<router-link
				to="/login"
				custom
				v-slot="{ navigate }"
			>
				<button
					class="btn btn-primary"
					@click="navigate"
					role="link"
				>
					Se connecter
				</button>
			</router-link>
		</div>
	</form>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import {useToast} from 'vue-toast-notification';
import { useUserStore } from '@/store/user.store';
import router from '@/router';

const $toast = useToast();

const form = reactive({
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	passwordConfirm: ''
});
const validForm = computed(() => 
	form.firstname && 
	form.lastname && 
	form.email && 
	!!form.password &&
	form.password === form.passwordConfirm
);

const onSubmit = async () => {
	const userStore = useUserStore();
	const { firstname, lastname, email, password } = form;
	const registeredUser = await userStore.registerUser({
		firstname,
		lastname,
		email,
		password
	});
	form.password = '';
	form.passwordConfirm = '';

	if (registeredUser.id) {
		$toast.success('Votre inscription est confirmée !');
		router.push('/login');
	} else {
		const errorMsg = registeredUser.email
			? `Email '${registeredUser.email}' déjà utilisé`
			: `Erreur lors de l'inscription`;
		$toast.error(errorMsg);
	}
}
</script>