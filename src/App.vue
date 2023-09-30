<template>
  <AppHeader />

  <router-view></router-view>

  <AppPlayer />
  <AppAuth />
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppAuth from './components/AppAuth.vue'
import AppPlayer from './components/Player.vue'
import { mapWritableState } from 'pinia'
import useUserStore from './stores/user'
import { auth } from './includes/firebase'

export default {
  name: 'App',
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn'])
  },
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  // lifecycle method
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<style scoped></style>
