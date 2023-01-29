<template lang="pug">
form
  input(v-model='email')
  input(type='password', v-model='password')
  button(type='button', @click='signin') Signin
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'AtomsSignin',
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