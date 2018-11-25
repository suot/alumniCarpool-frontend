<template>
  <b-navbar toggleable="lg" :variant="getLayoutNavbarBg()" class="layout-navbar align-items-lg-center container-p-x">

    <!-- Brand demo (see demo.css) -->
    <b-navbar-brand to="/" class="app-brand demo d-lg-none py-0 mr-4">
      <span class="app-brand-logo demo bg-primary">
        <svg viewBox="0 0 148 80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="a" x1="46.49" x2="62.46" y1="53.39" y2="48.2" gradientUnits="userSpaceOnUse"><stop stop-opacity=".25" offset="0"></stop><stop stop-opacity=".1" offset=".3"></stop><stop stop-opacity="0" offset=".9"></stop></linearGradient><linearGradient id="e" x1="76.9" x2="92.64" y1="26.38" y2="31.49" xlink:href="#a"></linearGradient><linearGradient id="d" x1="107.12" x2="122.74" y1="53.41" y2="48.33" xlink:href="#a"></linearGradient></defs><path style="fill: #fff;" transform="translate(-.1)" d="M121.36,0,104.42,45.08,88.71,3.28A5.09,5.09,0,0,0,83.93,0H64.27A5.09,5.09,0,0,0,59.5,3.28L43.79,45.08,26.85,0H.1L29.43,76.74A5.09,5.09,0,0,0,34.19,80H53.39a5.09,5.09,0,0,0,4.77-3.26L74.1,35l16,41.74A5.09,5.09,0,0,0,94.82,80h18.95a5.09,5.09,0,0,0,4.76-3.24L148.1,0Z"></path><path transform="translate(-.1)" d="M52.19,22.73l-8.4,22.35L56.51,78.94a5,5,0,0,0,1.64-2.19l7.34-19.2Z" fill="url(#a)"></path><path transform="translate(-.1)" d="M95.73,22l-7-18.69a5,5,0,0,0-1.64-2.21L74.1,35l8.33,21.79Z" fill="url(#e)"></path><path transform="translate(-.1)" d="M112.73,23l-8.31,22.12,12.66,33.7a5,5,0,0,0,1.45-2l7.3-18.93Z" fill="url(#d)"></path></svg>
      </span>
      <span class="app-brand-text demo font-weight-normal ml-2">Alumni Carpool</span>
    </b-navbar-brand>


    <b-collapse is-nav id="app-layout-navbar">
      <b-navbar-nav class="align-items-lg-center ml-auto">
        <b-nav-item-dropdown no-caret :right="!isRTL" class="demo-navbar-notifications mr-lg-3">
          <template slot="button-content">
            <i class="ion ion-md-notifications-outline navbar-icon align-middle"></i>
            <span v-if="new_notifications.length > 0" class="badge badge-primary badge-dot indicator"></span>
            <span class="d-lg-none align-middle">&nbsp; Notifications</span>
          </template>

          <div class="bg-primary text-center text-white font-weight-bold p-3">
            {{ new_notifications.length }} New Notifications
          </div>
          <b-list-group flush>
            <b-list-group-item v-for="(new_notification, i) in new_notifications" :key="i" href="javascript:void(0)" @click.stop="showModal_avatar_notification(new_notification)" class="media d-flex align-items-center">
              <div class="ui-icon ui-icon-sm ion ion-md-home bg-secondary border-0 text-white"></div>
              <div class="media-body line-height-condenced ml-3">
                <div class="text-dark">{{new_notification.message.msgContent.slice(0, 35)}}... </div>
                <div class="text-light small mt-1">
                  {{ new_notification.message.time.slice(0, 10)}} {{ new_notification.message.time.slice(11, 16) }}
                </div>
              </div>
            </b-list-group-item>
          </b-list-group>
          <a href="javascript:void(0)" class="d-block text-center text-light small p-2 my-1">Show all notifications</a>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown no-caret :right="!isRTL" class="demo-navbar-messages mr-lg-3">
          <template slot="button-content">
            <i class="ion ion-ios-mail navbar-icon align-middle"></i>
            <span v-if="new_messages.length > 0" class="badge badge-primary badge-dot indicator"></span>
            <span class="d-lg-none align-middle">&nbsp; Messages</span>
          </template>

          <div class="bg-primary text-center text-white font-weight-bold p-3">
            {{ new_messages.length }} New Messages
          </div>

          <b-list-group flush>

            <b-list-group-item v-for="(new_message, i) in new_messages" :key="i" href="javascript:void(0)" @click.stop="showModal_avatar_message(new_message.message.sender, new_message)" class="media d-flex align-items-center">
              <img :src="getImage(new_message.message.sender.id, 'avatar')" class="d-block ui-w-40 rounded-circle" alt>
              <div class="media-body ml-3">
                <div class="text-dark line-height-condenced">{{new_message.message.msgContent.slice(0, 35)}}... </div>
                <div class="text-light small mt-1">
                  {{ new_message.message.sender.firstName}} {{ new_message.message.sender.lastName}} &nbsp;·&nbsp; {{ new_message.message.time.slice(0, 10)}} {{ new_message.message.time.slice(11, 16) }}
                </div>
              </div>
            </b-list-group-item>

          </b-list-group>
          <a href="javascript:void(0)" class="d-block text-center text-light small p-2 my-1">Show all messages</a>
        </b-nav-item-dropdown>


        <!-- Divider -->
        <div class="nav-item d-none d-lg-block text-big font-weight-light line-height-1 opacity-25 mr-3 ml-1">|</div>
        <b-nav-item-dropdown :right="!isRTL" class="demo-navbar-user">
          <template slot="button-content">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
              <img :src="remoteAvatar" alt class="d-block ui-w-30 rounded-circle">
              <span class="px-1 mr-lg-2 ml-2 ml-lg-0">{{ userData.firstName }} {{ userData.lastName }}</span>
            </span>
          </template>

          <b-dd-item><router-link to="/users/view"><i class="ion ion-ios-person"></i> &nbsp; My profile</router-link></b-dd-item>
          <b-dd-item><router-link to="/users/account-settings"><i class="ion ion-md-settings"></i> &nbsp; Account settings</router-link></b-dd-item>
          <b-dd-item><router-link to="/tickets/my-finished-tickets"><i class="lnr lnr-database"></i> &nbsp; My finished orders</router-link></b-dd-item>
          <b-dd-divider />
          <b-dd-item @click="checkOut()"><i class="ion ion-ios-log-out text-danger"></i> &nbsp; Log Out</b-dd-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import swal from 'sweetalert2';
import '@/vendor/libs/Animation.css';

export default {
  name: 'app-layout-navbar',

  components: {
    swal,
  },

  data: () => ({
    new_notifications: [],
    new_messages: [],
  }),

  computed: {
    userData: function () {
      return this.$store.state.userLoggedIn
    },
    remoteAvatar: function () {
      return this.$store.state.dataUrl + "\\images\\" + this.userData.id + "\\avatar.jpg"
    }
  },

  methods: {
    getImage(userId, imageName){
      return this.$store.state.dataUrl + "\\images\\" + userId + "\\" + imageName + ".jpg";
    },

    showModal_avatar_message(sender, new_message){
      let url = this.getImage(sender.id, 'avatar');
      let name = sender.firstName + " " + sender.lastName;
      let phone = sender.phone;
      let badges = "";
      let tags = sender.tags;
      let htmlText = '<div>'+phone+'</div>';
      let altMsg = 'User \'s avatar';


      for(let i in tags){
        badges += '<button class="d-inline-block mr-2" style="border-color: transparent; background: #26B4FF; color: #fff;">' + tags[i] + '</button>';
      }

      htmlText += '<div><font size="2">'+ new_message.message.msgContent +'</font></div>';

      swal({
          title: name,
          html: htmlText,
          imageUrl: url,
          imageAlt: altMsg,
          showConfirmButton: false,
          footer: badges,
          buttonsStyling: false,
          animation: false,
          customClass: 'animated zoomIn'
      });


      //remove from user.messages
      this.userData.messages.splice(new_message.id, 1);
      this.$http.put(this.$store.state.dataUrl+"/users/update", this.userData).then(response => {
        //remove from new_messages
        this.new_messages.splice(this.new_messages.indexOf(new_message), 1);

      }, response => {
        this.$showNotification('acNotification', 'error', 'Message-send message', 'Error occurred when updating user!');
      });
    },

    showModal_avatar_notification(new_notification){
      let url = this.baseUrl+"img/ac.jpg";
      let htmlText = '<div><font size="2">'+ new_notification.message.msgContent +'</font></div>';
      let altMsg = 'System\'s logo';

      swal({
          html: htmlText,
          imageUrl: url,
          imageAlt: altMsg,
          showConfirmButton: false,
          buttonsStyling: false,
          animation: false,
          customClass: 'animated zoomIn'
      });


      //remove from user.messages
      this.userData.messages.splice(new_notification.id, 1);
      this.$http.put(this.$store.state.dataUrl+"/users/update", this.userData).then(response => {
        //remove from new_messages
        this.new_notifications.splice(this.new_notifications.indexOf(new_notification), 1);

      }, response => {
        this.$showNotification('acNotification', 'error', 'Message-send message', 'Error occurred when updating user!');
      });
    },


    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },

    checkOut () {
      this.$store.commit('update_isLoggedIn', false);
      this.$store.commit('update_userLoggedIn', null);
      this.$router.push('/logout');
    },
  },

  mounted () {
    const user = this.$store.state.userLoggedIn;
    let messageStack = user.messages;
    if(messageStack != null){
      for(let i=0; i<messageStack.length; i++){
        let message = messageStack[i];
        if(message.unread){
          let new_message = {
            id: i,
            message: message
          };

          let type = message.type;
          if(type=="Message"){
            this.new_messages.push(new_message);
          }else{
            this.new_notifications.push(new_message);
          }
        }else{
          continue;
        }
      }
    }
  },

}
</script>
