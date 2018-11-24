<template>
  <div>
    <div class="media align-items-center py-3 mb-3">
      <!-- <img :src="`${baseUrl}img/avatars/${userData.avatar}`" alt="" class="d-block ui-w-100 rounded-circle"> -->
      <div class="media-body ml-4">
        <h4 class="font-weight-bold mb-0"><span class="text-muted font-weight-normal">{{ userData.firstName }} {{ userData.lastName }}</span></h4>
        <router-link to="/users/account-settings"><b-btn variant="primary" size="sm">Edit</b-btn></router-link>&nbsp;
        <!-- <router-link to="/users/chat"><b-btn variant="default" size="sm">Chat</b-btn></router-link>&nbsp; -->
        <b-btn variant="default icon-btn" size="sm"><i class="ion ion-md-mail"></i></b-btn>
      </div>
    </div>

    <b-card no-body>
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

          <h6 class="mt-4 mb-3">Others</h6>
          <table class="table user-view-table m-0">
            <tbody>
              <tr  v-if="userData.currentRole==='Driver'">
                <td>Rating:</td>
                <td><star-rating :inline="true" :star-size="19" :show-rating="false" :increment="0.1" :rating="userData.rating" :read-only="true"></star-rating> {{ roundedRating() }} on {{userData.review}} reviews</td>
              </tr>
              <tr>
                <td>Tags:</td>
                <td v-if="userData.tags"><input-tag :read-only="true" v-model="userData.tags"></input-tag></td>
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
import StarRating from 'vue-star-rating'
import InputTag from 'vue-input-tag'


export default {
  name: 'user-view',
  metaInfo: {
    title: 'User view'
  },
  components: {
    StarRating,
    InputTag
  },

  computed: {
    userData: function () {
      return this.$store.state.userLoggedIn
    },
  },
  methods: {
    roundedRating: function(){
      return Math.round( this.$store.state.userLoggedIn.rating * 10 ) / 10;
    }
  },
}
</script>
