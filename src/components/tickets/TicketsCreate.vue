<template>
  <div>
    <h4 class="font-weight-bold py-3 mb-4">Create Ticket</h4>
    <b-card no-body>
      <hr class="border-light m-0">
      <!-- Ticket settings -->
      <b-card-body>
        <div class="ui-bordered px-4 pt-4 mb-4">
          <div class="form-row align-items-center">
            <div class="col-md mb-4">
              <b-form-group label="Departure City">
                <b-select v-model="order.departureCity" :options="['Windsor', 'Waterloo', 'Toronto', 'Markham']" />
              </b-form-group>
            </div>
            <div class="col-md mb-4">
              <b-form-group label="Departure Location">
                <b-input v-model="order.departureLocation" rows="1" />
              </b-form-group>
            </div>
          </div>

          <div class="form-row align-items-center">
            <div class="col-md mb-4">
              <b-form-group label="Arrival City">
                <b-select v-model="order.arrivalCity" :options="['Windsor', 'Waterloo', 'Toronto', 'Markham']" />
              </b-form-group>
            </div>
            <div class="col-md mb-4">
              <b-form-group label="Arrival Location">
                <b-input v-model="order.arrivalLocation" rows="1" />
              </b-form-group>
            </div>
          </div>

          <div class="form-row align-items-center">
            <div class="col-md mb-4">
              <b-form-group label="Departure Date">
                <flat-pickr v-model="order.departureDate" :config="{ altInput: true, dateFormat: 'm/d/Y', altFormat: 'm/d/Y', mode: 'single' }" :placeholder="!isIEMode ? 'Select a date' : null" />
              </b-form-group>
            </div>
            <div class="col-md mb-4">
              <b-form-group label="Departure Time">
                <flat-pickr v-model="order.departureTime" :config="{ enableTime:true, noCalendar: true, altInput: true}" :placeholder="!isIEMode ? 'Select departure time' : null" />
              </b-form-group>
            </div>
          </div>
        </div>
      </b-card-body>
      <!-- / Ticket settings -->

      <!-- Footer -->
      <b-card-footer>
        <b-btn variant="primary" @click="createTicket()">Create Ticket</b-btn>
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
  name: 'create-ticket',
  metaInfo: {
    title: 'Create Ticket'
  },

  components: {
    flatPickr,
  },

  data: () => ({
    order: {
      driver: {},
      status: "Boarding",
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
    createTicket(){
      //add driver to the created orders
      this.order.driver = this.$store.state.userLoggedIn;

      this.$http.post(this.$store.state.dataUrl+'/orders/create', this.order).then(response => {
        this.$showNotification('acNotification', 'success', 'Ticket-create', 'Ticket is created successfully!');

        //send message
        const order = this.order;
        const msgToDriver = "You have created a ticket: from " + order.departureLocation + ", " + order.departureCity + " to " + order.arrivalLocation + ", " + order.arrivalCity+" at " + order.departureTime+" " + order.departureDate;
        const message = {
          type: "Notification_Success_Ticket",
          msgContent: msgToDriver,
          time: new Date().toUTCString(),
          unread: true
        };
        this.$sendMessage(this.$store.state.userLoggedIn, message);
        this.$router.push('/tickets/list'); //redirect to ticketsList page
      }, response => {
        this.$showNotification('acNotification', 'error', 'Ticket-create', 'Ticket is not created successfully!');
      });
    },
  }
}
</script>
