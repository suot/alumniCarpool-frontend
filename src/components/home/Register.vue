<template>
  <div class="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" :style="`background-image: url('${baseUrl}img/login.jpg');`">
    <div class="ui-bg-overlay bg-dark opacity-25"></div>

    <div class="authentication-inner py-5">

      <b-card no-body>
        <div class="p-4 px-sm-5 pt-sm-5">
          <!-- Logo -->
            <div class="d-flex justify-content-center align-items-center pb-2 mb-2">
                <img src="@/assets/ac.jpg" alt class="d-block ui-w-60 rounded-circle">
            </div>
          <!-- / Logo -->
          <!-- Form -->
          <form>
            <b-form-group label="Your first name">
              <b-input v-model="user.firstName" />
            </b-form-group>
            <b-form-group label="Your last name">
              <b-input v-model="user.lastName" />
            </b-form-group>
            <b-form-group label="Your email">
              <b-input v-model="user.email" />
            </b-form-group>
            <b-form-group label="Password">
              <b-input type="password" v-model="user.password" />
            </b-form-group>
            <b-form-group label="Default Role">
              <b-select v-model="user.currentRole" :options="['Passenger', 'Driver']"/>
            </b-form-group>

            <b-btn variant="primary" class="mt-4" @click="createUser()">Sign Up</b-btn>
            <div class="text-light small mt-4">
              By clicking "Sign Up", you agree to our
              <a href="javascript:void(0)">terms of service and privacy policy</a>.
              We’ll occasionally send you account related emails.
            </div>
          </form>
          <!-- / Form -->

        </div>
        <b-card-footer class="py-3 px-4 px-sm-5">
          <div class="text-center text-muted">
            Already have an account? <router-link to="/login">Sign In</router-link>
          </div>
        </b-card-footer>
      </b-card>

    </div>
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/authentication.scss" lang="scss"></style>

<script>
export default {
  name: 'register',
  metaInfo: {
    title: 'Register'
  },
  data: () => ({
    user: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      currentRole: '',
      rating: 0.0,
      review: 0,
      messages: [],
    }

  }),
  methods: {
    createUser(){
      this.$http.post(this.$store.state.dataUrl+"/users/create", this.user).then(
        response => {
          this.$notify({
            group: 'acNotification',
            type: 'success',
            title: 'Register',
            text: 'User is created successfully!'
          })

          console.log("user is created");
          //redirect
          this.$router.push('/login');
        }, response => {
          this.$notify({
            group: 'acNotification',
            type: 'error',
            title: 'Register',
            text: 'User is not created successfully!'
          })

          console.log("user creation fails");
      });
    }
  }
}
</script>
