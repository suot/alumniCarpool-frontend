<template>
  <div>
    <h4 class="font-weight-bold py-3 mb-4">
      Account settings
    </h4>

    <b-card no-body class="overflow-hidden">
      <div class="row no-gutters row-bordered row-border-light">

        <div class="col-md-3 pt-0">
          <b-list-group class="account-settings-links" flush>
            <b-list-group-item button :active="curTab === 'general'" @click="curTab = 'general'">General</b-list-group-item>
            <b-list-group-item button :active="curTab === 'password'" @click="curTab = 'password'">Change password</b-list-group-item>
            <b-list-group-item button :active="curTab === 'info'" @click="curTab = 'info'">Info</b-list-group-item>
            <b-list-group-item button :active="curTab === 'car'" @click="curTab = 'car'">Car Info</b-list-group-item>
          </b-list-group>
        </div>

        <div class="col-md-9" v-if="curTab === 'general'">
          <b-card-body class="media align-items-center">
            <img :src="`${baseUrl}img/avatars/${userData.avatar}`" alt="" class="d-block ui-w-80">
            <div class="media-body ml-4">
              <b-btn variant="outline-primary">Upload avatar</b-btn> &nbsp;
              <!-- <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div> -->
            </div>
          </b-card-body>

          <hr class="border-light m-0">

          <b-card-body>
            <b-form-group label="First Name">
              <b-input v-model="userData.firstName" />
            </b-form-group>

            <b-form-group label="Last Name">
              <b-input v-model="userData.lastName" />
            </b-form-group>

            <b-form-group label="Email">
              <b-input v-model="userData.email" />
              <b-alert variant="warning" show class="mt-3 mb-0" v-if="!userData.verified">
                Your email is not confirmed. Please check your inbox.<br>
                <a href="javascript:void(0)">Resend confirmation</a>
              </b-alert>
            </b-form-group>

          </b-card-body>
        </div>

        <div class="col-md-9" v-if="curTab === 'password'">
          <b-card-body class="pb-2">

            <b-form-group label="Current password">
              <b-input type="password" />
            </b-form-group>

            <b-form-group label="New password">
              <b-input type="password" />
            </b-form-group>

            <b-form-group label="Repeat new password">
              <b-input type="password" />
            </b-form-group>

          </b-card-body>
        </div>

        <div class="col-md-9" v-if="curTab === 'info'">
          <b-card-body class="pb-2">
            <b-form-group label="Current Role">
              <b-select v-model="userData.currentRole" :options="['Passenger', 'Driver']"/>
            </b-form-group>

            <b-form-group label="Gender">
              <b-select v-model="userData.gender" :options="['Female', 'Male']"/>
            </b-form-group>

            <b-form-group label="Phone">
              <b-input v-model="userData.phone" />
            </b-form-group>

            <b-form-group label="Tags">
              <multiselect v-model="userData.tags" :multiple="true" :taggable="true" :options="[]" @tag="addTag" placeholder="Add tag" />
            </b-form-group>

          </b-card-body>

          <hr class="border-light m-0">

          <b-card-body class="pb-2">
            <!-- <h6 class="mb-4">Alumni certificate</h6> -->

            <b-form-group label="Alma Mater">
              <b-input v-model="userData.almaMater" />
            </b-form-group>

            <b-form-group label="Student ID">
              <b-input v-model="userData.studentId" />
            </b-form-group>

            <img :src="`${baseUrl}img/avatars/${userData.avatar}`" alt="" class="d-block ui-w-80">&nbsp;
            <div class="media-body ml-4">
              <b-btn variant="outline-primary">Upload avatar</b-btn> &nbsp;
              <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
            </div>
          </b-card-body>
        </div>


        <div class="col-md-9" v-if="curTab === 'car'">
          <b-card-body class="pb-2">
            <b-form-group label="Plate Number">
              <b-input v-model="userData.driver.car.plateNum" />
            </b-form-group>
            <img :src="`${baseUrl}img/avatars/${userData.avatar}`" alt="" class="d-block ui-w-80">
            &nbsp;
            <div class="media-body ml-4">
              <b-btn variant="outline-primary">Upload photos</b-btn> &nbsp;
              <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
            </div>
            &nbsp;
            <b-form-group label="Seats">
              <multiselect v-model="userData.car.seats" :multiple="true" :taggable="true" :options="[]" @tag="addSeat" placeholder="Add seat" />
            </b-form-group>
          </b-card-body>
        </div>
      </div>
    </b-card>

    <div class="text-right mt-3">
      <b-btn variant="primary">Save changes</b-btn>&nbsp;
      <b-btn variant="default">Cancel</b-btn>
    </div>

  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css" />
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

<!-- Page -->
<style src="@/vendor/styles/pages/account.scss" lang="scss"></style>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'account-settings',
  metaInfo: {
    title: 'Account settings'
  },
  components: {
    Multiselect
  },
  data: () => ({
    curTab: 'general',

    userData: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      currentRole: '',
      phone: '',
      avatar: '5-small.png',
      almaMater: '',
      studentId: '',
      certificate: [],
      tags: [],
      verified: false,
      car: {
        plateNum: '',
        carPhoto: '',
        seats: [
          {

          }
        ]

      }

    }
  }),

  methods: {
    addTag (newTag) {
      this.userData.tags.push(newTag)
    },
     addSeat (newTag) {
      this.userData.car.seats.push(newTag)
    }
  },

  created () {
    const user = this.$store.state.userLoggedIn;
    if(user.email){
      this.userData.email = user.email;
    }
    if(user.password){
      this.userData.password = user.password;
    }
    if(user.firstName){
      this.userData.firstName = user.firstName;
    }
    if(user.lastName){
      this.userData.lastName = user.lastName;
    }
    if(user.currentRole){
      this.userData.currentRole = user.currentRole;
    }
    if(user.phone){
      this.userData.phone = user.phone;
    }
    if(user.avatar){
      this.userData.avatar = user.avatar;
    }
    if(user.studentId){
      this.userData.studentId = user.studentId;
    }
    if(user.certificate){
      this.userData.certificate = user.certificate;
    }
    if(user.tags){
      this.userData.tags = user.tags;
    }
    if(user.verified){
      this.userData.verified = user.verified;
    }
    if(user.car){
      this.userData.car = user.car;
    }
  },

}
</script>
