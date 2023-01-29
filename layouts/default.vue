<template lang="pug">
section
  header
    button(v-if='$store.state.isSignin', type='button', @click='signout') Signout
    button(v-else, type='button', @click='showSigninModal = true') Signin
    template(v-if='showSigninModal')
      atoms-signin
      button(type='button', @click='showSigninModal = false') close
  section
    nuxt
  footer footer
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

