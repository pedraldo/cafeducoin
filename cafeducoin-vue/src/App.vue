<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed } from 'vue';
import { useUserStore } from './store/user.store';
import router from './router';

const userStore = useUserStore();
const isUserLoggedIn = computed(() => userStore.isUserLoggedIn);

// onMounted(() => {
// })
const logout = () => {
	userStore.logUserOut();
	router.push('/login');

}
</script>

<template>
  <header>
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand">Cafe Du Coin</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarSupportedContent">
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li v-if="isUserLoggedIn" class="nav-item">
							<router-link
								to="/"
								custom
								v-slot="{ navigate }"
							>
								<a class="nav-link" @click="navigate" href="#">Jeux</a>
							</router-link>
						</li>
						<li v-if="isUserLoggedIn" class="nav-item">
							<a class="nav-link" @click="logout()" role="link" href="#">Déconnexion</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
  </header>

	<main class="my-3">
		<RouterView />
	</main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/*@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/
</style>
