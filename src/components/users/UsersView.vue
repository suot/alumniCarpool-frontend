<template>
  <div>
    <div class="media align-items-center py-3 mb-3">
      <!-- <img :src="`${baseUrl}img/avatars/${userData.avatar}`" alt="" class="d-block ui-w-100 rounded-circle"> -->
      <div class="media-body ml-4">
        <h4 class="font-weight-bold mb-0"><span class="text-muted font-weight-normal">{{ userData.firstName }} {{ userData.lastName }}</span></h4>
        <router-link to="/users/account-settings"><b-btn variant="primary" size="sm">Edit</b-btn></router-link>&nbsp;
        <router-link to="/users/chat"><b-btn variant="default" size="sm">Chat</b-btn></router-link>&nbsp;
        <b-btn variant="default icon-btn" size="sm"><i class="ion ion-md-mail"></i></b-btn>
      </div>
    </div>

    <b-card no-body>
      <div class="row no-gutters row-bordered">
        <div class="d-flex col-md align-items-center">
          <a href="javascript:void(0)" class="card-body d-block text-dark">
            <div class="text-muted small line-height-1">Rate</div>
            <div class="text-xlarge" v-if="userData.rate">{{ userData.rate }}</div>
            <!-- <div class="text-xlarge">{{formatInt(userData.rate)}}</div> -->
          </a>
        </div>
      </div>

      <!-- <hr class="border-light m-0"> -->

      <b-card-body>
      <h6 class="mt-4 mb-3">Personal info</h6>
        <table class="table user-view-table m-0">
          <tbody>
            <tr>
              <td>First Name:</td>
              <td v-if="userData.firstName">{{ userData.firstName }}</td>
            </tr>

            <tr>
              <td>Last Name:</td>
              <td v-if="userData.lastName">{{ userData.lastName }}</td>
            </tr>

            <tr>
              <td>Current Role:</td>
              <td v-if="userData.currentRole">{{ userData.currentRole }}</td>
            </tr>

            <tr>
              <td>Gender:</td>
              <td v-if="userData.gender">{{userData.gender}}</td>
            </tr>

            <tr>
              <td>Alma Mater:</td>
              <td v-if="userData.almaMater">{{ userData.almaMater }}</td>
            </tr>

            <tr>
              <td>Preferences:</td>
              <td v-if="userData.tags">{{ userData.tags.join(', ') }}</td>
            </tr>
          </tbody>
        </table>

        <h6 class="mt-4 mb-3">Contacts</h6>
        <table class="table user-view-table m-0">
          <tbody>
            <tr>
              <td>E-mail:</td>
              <td>{{ userData.email }}</td>
            </tr>

            <tr>
              <td>Phone:</td>
              <td v-if="userData.phone">{{ userData.phone }}</td>
            </tr>
          </tbody>
        </table>
      </b-card-body>
    </b-card>
  </div>
</template>

<!-- Page -->
<style src="@/vendor/styles/pages/users.scss" lang="scss"></style>

<script>
//import * as numeral from 'numeral'

export default {
  name: 'user-view',
  metaInfo: {
    title: 'User view'
  },
  computed: {
    userData: function () {
      return this.$store.state.userLoggedIn
    }
  },
  methods: {
    // formatInt (v) {
    //   return numeral(v).format('0,0')
    // }
  },
}
</script>
