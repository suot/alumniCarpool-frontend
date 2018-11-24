<template>
  <div>
    <h4 class="font-weight-bold py-3 mb-4">Create Posting</h4>
    <b-card no-body>
      <hr class="border-light m-0">
      <!-- Ticket settings -->
      <b-card-body>
        <div class="ui-bordered px-4 pt-4 mb-4">
          <div class="form-row align-items-center">
            <div class="col-md mb-4">
              <b-form-group label="Departure City">
                <b-select v-model="posting.departureCity" :options="['Windsor', 'Waterloo', 'Toronto', 'Markham']" />
              </b-form-group>
            </div>
            <div class="col-md mb-4">
              <b-form-group label="Departure Location">
                <b-input v-model="posting.departureLocation" rows="1" />
              </b-form-group>
            </div>
          </div>

          <div class="form-row align-items-center">
            <div class="col-md mb-4">
              <b-form-group label="Arrival City">
                <b-select v-model="posting.arrivalCity" :options="['Windsor', 'Waterloo', 'Toronto', 'Markham']" />
              </b-form-group>
            </div>
            <div class="col-md mb-4">
              <b-form-group label="Arrival Location">
                <b-input v-model="posting.arrivalLocation" rows="1" />
              </b-form-group>
            </div>
          </div>

          <div class="form-row align-items-center">
            <div class="col-md mb-4">
              <b-form-group label="Departure Date">
                <flat-pickr v-model="posting.departureDate" :config="{ altInput: true, dateFormat: 'm/d/Y', altFormat: 'm/d/Y', mode: 'single' }" :placeholder="!isIEMode ? 'Select a date' : null" />
              </b-form-group>
            </div>
            <div class="col-md mb-4">
              <b-form-group label="Departure Time">
                <flat-pickr v-model="posting.departureTime" :config="{ enableTime:true, noCalendar: true, altInput: true}" :placeholder="!isIEMode ? 'Select departure time' : null" />
              </b-form-group>
            </div>
          </div>
        </div>
      </b-card-body>
      <!-- / Ticket settings -->

      <!-- Footer -->
      <b-card-footer>
        <b-btn variant="primary" @click="createPosting()">Create Posting</b-btn>
        &nbsp;
        <b-btn variant="default">Cancel</b-btn>
      </b-card-footer>
      <!-- Footer -->
    </b-card>
  </div>
</template>


<style src="@/vendor/styles/pages/tickets.scss" lang="scss"></style>
<style src="@/vendor/libs/vue-flatpickr-component/vue-flatpickr-component.scss" lang="scss"></style>


<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';


export default {
  name: 'create-posting',
  metaInfo: {
    title: 'Create Posting'
  },

  components: {
    flatPickr,
  },

  data: () => ({
    posting: {
      creator: {},
      departureCity: "",
      departureLocation: "",
      arrivalCity: "",
	    arrivalLocation: "",
	    departureDate: "",
	    departureTime: "",
      creatingTime: new Date().toUTCString()
    },

  }),

  methods: {
    createPosting(){
      this.posting.creator = this.$store.state.userLoggedIn;

      const url = this.$store.state.dataUrl+"/postings/create";
      const data = this.posting;
      this.$http.post(url, data).then(response => {
        this.$showNotification('acNotification', 'success', 'Posting-create', 'Posting is created successfully!');
        //send message
        const message = {
          type: "Notification_Success_Posting",
          msgContent: "You have created a posting: from " + this.posting.departureLocation + ", " + this.posting.departureCity + " to " + this.posting.arrivalLocation + ", " + this.posting.arrivalCity+" at " + this.posting.departureTime+" " + this.posting.departureDate,
          time: this.posting.creatingTime,
          unread: true
        };
        this.sendMessage(this.$store.state.userLoggedIn, message);
        //redirect
        this.$router.push('/postings/list');
      }, response => {
        this.$showNotification('acNotification', 'error', 'Posting-create', 'Posting is not created successfully!');
      });
    },

    sendMessage(user, message){
      this.$http.get(this.$store.state.dataUrl+"/users/get/"+user.id).then(response => {
        let receiver = response.body;

        if(receiver.messages == null){
          receiver.messages = [];
        }
        receiver.messages.push(message);
        this.$http.put(this.$store.state.dataUrl+"/users/update", receiver).then(response => {

        }, response => {
          this.$showNotification('acNotification', 'warn', 'Message-send message', 'System notification is not sent successfully!');
        });
      }, response => {
        this.$showNotification('acNotification', 'error', 'Message-send message', 'Error occurred when getting user informaiton!');
      });
    },
  }
}
</script>
