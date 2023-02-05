<template lang="pug">
form
  atoms-input-text(v-model='email', placeholder='email')
  atoms-input-password(v-model='password', placeholder='password')
  atoms-button(type='button', @click='signin') Signin
  p {{ error }}
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'OrganismsSignin',
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async signin() {
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
      } catch (error) {
        this.error = error
        console.error(error)
      }
    },
  },
}
</script>