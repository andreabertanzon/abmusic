<template>
  <!-- Login Form -->
  <div
    class="text-white text-center font-bold p4 rounded mb-4"
    v-if="loginShowAlert"
    :class="loginAlertVariant"
  >
    {{ loginMessage }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
import { ErrorMessage } from 'vee-validate'
import { mapActions } from 'pinia'
import useUserStore from '../stores/user'

export default {
  name: 'LoginForm',
  components: { ErrorMessage },
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required'
      },

      loginShowAlert: false,
      loginInSubmission: false,
      loginMessage: 'Please wait while we log you in',
      loginAlertVariant: 'bg-blue-500'
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.loginShowAlert = true
      this.loginMessage = 'Please wait while we log you in'
      this.loginInSubmission = true
      this.loginAlertVariant = 'bg-blue-500'

      try {
        await this.authenticate(values)
      } catch (error) {
        this.loginInSubmission = false
        this.loginAlertVariant = 'bg-red-500'
        this.loginMessage = 'Invalid Login Details'
        return
      }
      this.loginAlertVariant = 'bg-green-500'
      this.loginMessage = 'Successfully Logged in!'

      window.location.reload()
    }
  }
}
</script>
