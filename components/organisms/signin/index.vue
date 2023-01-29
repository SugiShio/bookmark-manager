<template lang="pug">
form
  atoms-input-text(v-model='email')
  atoms-input-password(v-model='password')
  atoms-button(type='button', @click='signin') Signin
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'OrganismsSignin',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async signin() {
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>