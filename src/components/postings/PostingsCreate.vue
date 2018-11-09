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
    dataUrl: 'http://localhost:1010/postings',

    posting: {
      passenger: {},
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
      this.$http.post(this.dataUrl+"/create", this.posting).then(response => {
        //notification

        //redirect
        this.$router.push('/postings/list');
      }, response => {
        // error callback, notification
      });
    }

  }
}
</script>
