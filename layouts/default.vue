<template lang="pug">
section.l-default
  header.l-default__header
    .l-default__header-left
      nuxt-link(:to='{ name: "index" }') Top
    .l-default__header-right
      atoms-button(v-if='$store.state.isSignin', @click='signout') Signout
      atoms-button(v-else, @click='showSigninModal = true') Signin

  div
    nuxt

  footer footer

  atoms-modal(v-if='showSigninModal', @close-clicked='showSigninModal = false')
    organisms-signin
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app } from '~/plugins/firebase'
import { User } from '~/models/user'

const auth = getAuth(app)
export default {
  name: 'LayoutsDefault',
  data() {
    return {
      showSigninModal: false,
    }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.commit('setUser', new User({ ...user }))
        this.$store.commit('setIsSignin')
        this.showSigninModal = false
      } else {
        this.$store.commit('resetUser')
      }
    })
  },
  methods: {
    async signout() {
      try {
        await signOut(auth)
        this.$store.commit('resetIsSignin')
        this.$store.commit('resetUser')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss">
@import '~/assets/stylesheets/variables';

html {
  background-color: $color-main;
}
</style>

<style lang="scss" scoped>
.l-default {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
  }
}
</style>