<template>
  <div>
    <div class="media align-items-center py-3 mb-3">
      <img :src="`${baseUrl}img/avatars/${userData.avatar}`" alt="" class="d-block ui-w-100 rounded-circle">
      <div class="media-body ml-4">
        <h4 class="font-weight-bold mb-0">{{userData.name}} <span class="text-muted font-weight-normal">Tina{{userData.username}}</span></h4>
        <div class="text-muted mb-2">ID: {{userData.id}}</div>
        <b-btn variant="primary" size="sm">Edit</b-btn>&nbsp;
        <b-btn variant="default" size="sm">Chat</b-btn>&nbsp;
        <b-btn variant="default icon-btn" size="sm"><i class="ion ion-md-mail"></i></b-btn>
      </div>
    </div>
    <b-card no-body class="mb-4">
      <b-card-body>



      </b-card-body>
      <hr class="border-light m-0">
      <div class="table-responsive">



    </div>
    </b-card>

    <b-card no-body>
      <div class="row no-gutters row-bordered">

        <div class="d-flex col-md align-items-center">
          <a href="javascript:void(0)" class="card-body d-block text-dark">
            <div class="text-muted small line-height-1">Rate</div>
            <div class="text-xlarge">{{formatInt(userData.rate)}}</div>
          </a>
        </div>




      </div>
      <hr class="border-light m-0">
      <b-card-body>
      <h6 class="mt-4 mb-3">Personal info</h6>

        <table class="table user-view-table m-0">
          <tbody>
            <td>Role:</td>
            <td>
              <span v-if="userData.role === 1">passagers</span>
            </td>

            <tr>
              <td>First Name:</td>
              <td>{{userData.firstName}}</td>
            </tr>

            <tr>
              <td>Last Name:</td>
              <td>{{userData.lastName}}</td>
            </tr>
            <tr>
              <td>E-mail:</td>
              <td>{{userData.email}}</td>
            </tr>
            <tr>
              <td>University:</td>
              <td>{{userData.alamater}}</td>
            </tr>
          </tbody>
        </table>



        <table class="table user-view-table m-0">
          <tbody>
            <tr v-if="userData.info.gender">
              <td>Gender:</td>
              <td>{{userData.info.gender}}</td>
            </tr>
            <tr v-if="userData.info.city">
              <td>City:</td>
              <td>{{userData.info.city}}</td>
            </tr>

          </tbody>
        </table>

        <h6 class="mt-4 mb-3">Contacts</h6>

        <table class="table user-view-table m-0">
          <tbody>
            <tr v-if="userData.info.phone">
              <td>Phone:</td>
              <td>{{userData.info.phone}}</td>
            </tr>
          </tbody>
        </table>

        <h6 class="mt-4 mb-3">Interests</h6>

        <table class="table user-view-table m-0">
          <tbody>
            <tr v-if="userData.info.tags.length">
              <td>Preferences:</td>
              <td>{{userData.info.tags.join(', ')}}</td>
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
import * as numeral from 'numeral'

export default {
  name: 'pages-user-view',
  metaInfo: {
    title: 'User view - Pages'
  },
  data: () => ({
    userData: {
      avatar: '5-small.png',
      firstName:'Tina',
      lastName: 'White',
      email: 'nmaxwell@mail.com',
      alamater: 'University of Windsor',



      // Statistics
      rate: 25,

      info: {
        gender: 'Female',
        city: 'Windsor',
        plateNum: '12345',
        phone: '+0 (123) 456 7891',
        tags: ['Outgoing', 'No Smoking', 'Pat Friendly','Music']

      }
    }
  }),
  methods: {
    formatInt (v) {
      return numeral(v).format('0,0')
    }
  }
}
</script>
