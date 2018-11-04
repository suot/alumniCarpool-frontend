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
            <b-list-group-item button :active="curTab === 'proof'" @click="curTab = 'proof'">Alumni proof</b-list-group-item>
            <b-list-group-item button :active="curTab === 'cars'" @click="curTab = 'cars'">Car Info</b-list-group-item>
            <!-- <b-list-group-item button :active="curTab === 'notifications'" @click="curTab = 'notifications'">Notifications</b-list-group-item> -->
          </b-list-group>
        </div>

        <div class="col-md-9" v-if="curTab === 'general'">
          <b-card-body class="media align-items-center">

            <img :src="`${baseUrl}img/avatars/${accountData.avatar}`" alt="" class="d-block ui-w-80">
            <div class="media-body ml-4">
              <b-btn variant="outline-primary">Upload new photo</b-btn> &nbsp;
              <b-btn variant="default md-btn-flat">Reset</b-btn>
              <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
            </div>

          </b-card-body>
          <hr class="border-light m-0">
          <b-card-body>

            <b-form-group label="First Name">
              <b-input v-model="accountData.firstName" />
            </b-form-group>

            <b-form-group label="Last Name">
              <b-input v-model="accountData.lastName" />
            </b-form-group>

            <b-form-group label="Email">
              <b-input v-model="accountData.email" />
              <b-alert variant="warning" show class="mt-3 mb-0" v-if="!accountData.verified">
                Your email is not confirmed. Please check your inbox.<br>
                <a href="javascript:void(0)">Resend confirmation</a>
              </b-alert>
            </b-form-group>

            <b-form-group label="University">
              <b-input v-model="accountData.almaMater" />
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
              <!-- <b-textarea v-model="accountData.info.currentRole" rows="5" /> -->
              <b-select v-model="accountData.info.currentRole" :options="['Passenger', 'Driver']"/>
            </b-form-group>

            <b-form-group label="Gender">
              <b-select v-model="accountData.info.gender" :options="['Female', 'Male']"/>
            </b-form-group>

            <b-form-group label="City">
              <b-select v-model="accountData.info.city" :options="['Windsor', 'Toronto', 'Waterloo', 'London']" />
            </b-form-group>

            <!-- <b-form-group label="Languages">
              <multiselect v-model="accountData.info.languages" :multiple="true" :options="['English', 'German', 'French']" />
            </b-form-group> -->

          </b-card-body>
          <hr class="border-light m-0">
          <b-card-body class="pb-2">

            <h6 class="mb-4">Contacts</h6>

            <b-form-group label="Phone">
              <b-input v-model="accountData.info.phone" />
            </b-form-group>

            <!-- <b-form-group label="Website">
              <b-input v-model="accountData.info.website" />
            </b-form-group> -->

          </b-card-body>
          <hr class="border-light m-0">
          <b-card-body class="pb-2">

            <h6 class="mb-4">Preferences</h6>

            <b-form-group label="Tags">
              <multiselect v-model="accountData.info.tags" :multiple="true" :taggable="true" :options="[]" @tag="addTag" placeholder="Add tag" />
            </b-form-group>

            <!-- <b-form-group label="Favorite movies">
              <multiselect v-model="accountData.info.movies" :multiple="true" :taggable="true" :options="[]" @tag="addMovieTag" placeholder="Add tag" />
            </b-form-group> -->

          </b-card-body>
        </div>

        <!-- <div class="col-md-9" v-if="curTab === 'links'">
          <b-card-body class="pb-2">
            <b-form-group label="Twitter">
              <b-input v-model="accountData.info.twitter" />
            </b-form-group>
            <b-form-group label="Facebook">
              <b-input v-model="accountData.info.facebook" />
            </b-form-group>
            <b-form-group label="Google+">
              <b-input v-model="accountData.info.google" />
            </b-form-group>
            <b-form-group label="LinkedIn">
              <b-input v-model="accountData.info.linkedin" />
            </b-form-group>
            <b-form-group label="Instagram">
              <b-input v-model="accountData.info.instagram" />
            </b-form-group>
          </b-card-body>
        </div> -->



        <div class="col-md-9" v-if="curTab === 'proof'">
          <b-card-body class="pb-2">

            <b-form-group label="Student ID">
              <b-input v-model="accountData.info.studentId" />
            </b-form-group>

            <img :src="`${baseUrl}img/avatars/${accountData.avatar}`" alt="" class="d-block ui-w-80">
            &nbsp;
            <div class="media-body ml-4">
              <b-btn variant="outline-primary">Upload new photo</b-btn> &nbsp;
              <b-btn variant="default md-btn-flat">Reset</b-btn>
              <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
            </div>

          </b-card-body>
        </div>

        <div class="col-md-9" v-if="curTab === 'cars'">
          <b-card-body class="pb-2">

            <b-form-group label="Plate Number">
              <b-input v-model="accountData.info.plateNum" />
            </b-form-group>
            <img :src="`${baseUrl}img/avatars/${accountData.avatar}`" alt="" class="d-block ui-w-80">
            &nbsp;
            <div class="media-body ml-4">
              <b-btn variant="outline-primary">Upload new photo</b-btn> &nbsp;
              <b-btn variant="default md-btn-flat">Reset</b-btn>
              <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
            </div>
            &nbsp;
            <b-form-group label="Seats">
              <multiselect v-model="accountData.info.seats" :multiple="true" :taggable="true" :options="[]" @tag="addSeat" placeholder="Add seat" />
            </b-form-group>
          </b-card-body>
        </div>
        <!-- <div class="col-md-9" v-if="curTab === 'connections'">
          <b-card-body>
            <b-btn variant="twitter">Connect to <strong>Twitter</strong></b-btn>
          </b-card-body>
          <hr class="border-light m-0">
          <b-card-body>
            <h5 class="mb-2">
              <a href="javascript:void(0)" class="float-right text-muted text-tiny"><i class="ion ion-md-close"></i> Remove</a>
              <i class="ion ion-logo-google text-google"></i>
              You are connected to Google:
            </h5>
            nmaxwell@mail.com
          </b-card-body>
          <hr class="border-light m-0">
          <b-card-body>
            <b-btn variant="facebook">Connect to <strong>Facebook</strong></b-btn>
          </b-card-body>
          <hr class="border-light m-0">
          <b-card-body>
            <b-btn variant="instagram">Connect to <strong>Instagram</strong></b-btn>
          </b-card-body>
        </div> -->

        <!-- <div class="col-md-9" v-if="curTab === 'notifications'">
          <b-card-body class="pb-2">
            <h6 class="mb-4">Activity</h6>
            <b-form-group>
              <label class="switcher">
                <input type="checkbox" class="switcher-input" v-model="accountData.notifications.comments">
                <span class="switcher-indicator">
                  <span class="switcher-yes"></span>
                  <span class="switcher-no"></span>
                </span>
                <span class="switcher-label">Email me when someone comments on my article</span>
              </label>
            </b-form-group>
            <b-form-group>
              <label class="switcher">
                <input type="checkbox" class="switcher-input" v-model="accountData.notifications.forum">
                <span class="switcher-indicator">
                  <span class="switcher-yes"></span>
                  <span class="switcher-no"></span>
                </span>
                <span class="switcher-label">Email me when someone answers on my forum thread</span>
              </label>
            </b-form-group>
            <b-form-group>
              <label class="switcher">
                <input type="checkbox" class="switcher-input" v-model="accountData.notifications.followings">
                <span class="switcher-indicator">
                  <span class="switcher-yes"></span>
                  <span class="switcher-no"></span>
                </span>
                <span class="switcher-label">Email me when someone follows me</span>
              </label>
            </b-form-group>
          </b-card-body>
          <hr class="border-light m-0">
          <b-card-body class="pb-2">
            <h6 class="mb-4">Application</h6>
            <b-form-group>
              <label class="switcher">
                <input type="checkbox" class="switcher-input" v-model="accountData.notifications.news">
                <span class="switcher-indicator">
                  <span class="switcher-yes"></span>
                  <span class="switcher-no"></span>
                </span>
                <span class="switcher-label">News and announcements</span>
              </label>
            </b-form-group>
            <b-form-group>
              <label class="switcher">
                <input type="checkbox" class="switcher-input" v-model="accountData.notifications.products">
                <span class="switcher-indicator">
                  <span class="switcher-yes"></span>
                  <span class="switcher-no"></span>
                </span>
                <span class="switcher-label">Weekly product updates</span>
              </label>
            </b-form-group>
            <b-form-group>
              <label class="switcher">
                <input type="checkbox" class="switcher-input" v-model="accountData.notifications.blog">
                <span class="switcher-indicator">
                  <span class="switcher-yes"></span>
                  <span class="switcher-no"></span>
                </span>
                <span class="switcher-label">Weekly blog digest</span>
              </label>
            </b-form-group>
          </b-card-body>
        </div> -->

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
  name: 'pages-account-settings',
  metaInfo: {
    title: 'Account settings - Pages'
  },
  components: {
    Multiselect
  },
  data: () => ({
    curTab: 'general',
    accountData: {
      avatar: '5-small.png',
      firstName: 'Tina',
      lastName: 'White',
      email: 'nmaxwell@mail.com',
      almaMater: 'University of Windsor.',
      verified: false,
      info: {
        currentRole: 'Passenger',
        gender: 'Female',
        city: 'Windsor',
        languages: ['English'],
        phone: '+1 (123) 456 7891',
        website: '',
        tags: ['Outgoing', 'No Smoking', 'Pet Friendly', 'Music'],
        seats: ['Front', 'Back Left', 'Back Right'],
        studentId: '104-184-772',
        plateNum: '3F208',
        google: '',
        linkedin: '',
        instagram: 'https://www.instagram.com/user'
      },
      notifications: {
        comments: true,
        forum: true,
        followings: false,
        news: true,
        products: false,
        blog: true
      }
    }
  }),
  methods: {
    addTag (newTag) {
      this.accountData.info.tags.push(newTag)
    },
     addSeat (newTag) {
      this.accountData.info.seats.push(newTag)
    }
  }
}
</script>
