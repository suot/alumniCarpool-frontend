<template>
  <div class="authentication-wrapper authentication-2 ui-bg-cover ui-bg-overlay-container px-4" :style="`background-image: url('${baseUrl}img/login.jpg');`">
    <!-- <div class="ui-bg-overlay bg-dark opacity-25"></div> -->

    <div class="authentication-inner py-5">

      <b-card no-body>
        <div class="p-4 p-sm-5">
          <div class="d-flex justify-content-center align-items-center pb-2 mb-2">
              <img src="@/assets/ac.jpg" alt class="d-block ui-w-80 rounded-circle">
          </div>

          <!-- Form -->
          <form>
            <b-form-group label="Email">
              <b-input v-model="credentials.email" />
            </b-form-group>
            <b-form-group>
              <div slot="label" class="d-flex justify-content-between align-items-end">
                <div>Password</div>
                <router-link to="/password-reset"><a href="javascript:void(0)" class="d-block small">Forgot password?</a></router-link>
              </div>
              <b-input type="password" v-model="credentials.password" />
            </b-form-group>

            <div class="d-flex justify-content-between align-items-center m-0">
              <b-check v-model="credentials.rememberMe" class="m-0">Remember me</b-check>
              <b-btn variant="primary" @click="checkCredentials()">Sign In</b-btn>
            </div>
          </form>
          <!-- / Form -->

        </div>
        <b-card-footer class="py-3 px-4 px-sm-5">
          <div class="text-center text-muted">
            Don't have an account yet? <router-link to="/register">Sign Up</router-link>
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
  name: 'login',
  metaInfo: {
    title: 'Login'
  },
  data: () => ({
    credentials: {
      email: '',
      password: '',
      rememberMe: false
    }

  }),


  methods: {
    checkCredentials(){
      let url = this.$store.state.dataUrl + "/users/get?email="+this.credentials.email+"&password="+this.credentials.password;

      this.$http.get(url).then(
        response => {
          const user = response.body;
          if(user == null || user.id == null){
            this.$showNotification('acNotification', 'error', 'Login', 'User does not exist!');
          }else{
            //TODO: Get token from Java Spring OAuth2
            //TODO: Vuex.store to store token
            if(user.password == ""){
              this.$showNotification('acNotification', 'error', 'Login', 'Password is wrong!');
            }else{
              //console.log("before: " + this.$store.state.isLoggedIn);
              this.$store.commit('update_isLoggedIn', true);
              //console.log("after: " + this.$store.state.isLoggedIn);
              this.$store.commit('update_userLoggedIn', user);
              //redirect
              this.$router.push('/tickets/list');
            }
          }
        }, response => {
          this.$showNotification('acNotification', 'error', 'Login', 'Can not connect to the server!');
        }
      );
    }
  }
}
</script>
