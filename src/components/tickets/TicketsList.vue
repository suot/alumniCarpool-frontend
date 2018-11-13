<template>
  <div>
    <h4 class="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
      <div>Tickets</div>
      <router-link :to="{ name: 'tickets-create'}"><b-btn variant="primary" class="d-block"><span class="ion ion-md-add"></span>&nbsp; Create Ticket</b-btn></router-link>
    </h4>

    <!-- Filters -->
    <div class="ui-bordered px-4 pt-4 mb-4">
      <div class="form-row align-items-center">
        <div class="col-md mb-4">
          <label class="form-label">Departure City</label>
          <b-select v-model="filterFrom" :options="['Windsor', 'Waterloo', 'Toronto', 'Markham']" />
        </div>
        <div class="col-md mb-4">
          <label class="form-label">Arrival City</label>
          <b-select v-model="filterTo" :options="['Windsor', 'Waterloo', 'Toronto', 'Markham']" />
        </div>
        <div class="col-md mb-4">
          <label class="form-label">Departure Date</label>
          <flat-pickr v-model="filterDepartureDate" :config="{ altInput: true, animate: !isRTL, dateFormat: 'm/d/Y', altFormat: 'm/d/Y', mode: 'single' }" :placeholder="!isIEMode ? 'Select a date' : null" />
        </div>
        <div class="col-md col-xl-2 mb-4">
          <label class="form-label d-none d-md-block">&nbsp;</label>
          <b-btn variant="primary" :block="true" @click="show(filterFrom, filterTo, filterDepartureDate)">Show</b-btn>
        </div>
      </div>
    </div>
    <!-- / Filters -->

    <b-card no-body>

      <!-- Table controls -->
      <b-card-body>

        <div class="row">
          <div class="col">
            Per Page: &nbsp;
            <b-select size="sm" v-model="perPage" :options="[10, 20, 30, 40, 50]" class="d-inline-block w-auto" />
          </div>
          <div class="col">
            <b-input size="sm" placeholder="Search..." class="d-inline-block w-auto float-sm-right" @input="filter($event)" />
          </div>
        </div>

      </b-card-body>
      <!-- / Table controls -->

      <!-- Table -->
      <hr class="border-light m-0">
      <div class="table-responsive">

        <b-table
          :items="ticketsData"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :striped="true"
          :bordered="true"
          :current-page="currentPage"
          :per-page="perPage"
          class="card-table">

          <template slot="driver" slot-scope="data">
            <div v-if="data.item.driver" class="ui-feed-icon-container d-inline-block mr-2">
              <img :src="`${baseUrl}img/avatars/1.png`" v-b-tooltip.hover :title="data.item.driver.firstName+', '+data.item.driver.phone+', '+data.item.driver.almaMater+', '+data.item.driver.tags+'.'" class="d-block ui-w-30 rounded-circle">
            </div>
          </template>

          <!-- <template slot="driversAlmaMater" slot-scope="data">
            <div class="ui-feed-icon-container d-inline-block mr-1 mb-1">
              <img :src="`${baseUrl}img/university/`+data.item.driver.almaMater+'.png'" v-b-tooltip.hover :title="'Alma mater: '+data.item.driver.almaMater" class="d-block ui-w-30 rounded-circle">
            </div>
          </template> -->


          <template slot="car" slot-scope="data">
            <div v-if="data.item.driver.car" class="ui-feed-icon-container d-inline-block mr-2">
              <img :src="`${baseUrl}img/car.png`" v-b-tooltip.hover :title="'Plate number: '+data.item.driver.car.plateNum" class="d-block ui-w-30 rounded-circle">
            </div>
          </template>


          <template slot="seats" slot-scope="data">
            <!-- <b-btn v-for="seat in seats" variant="default btn-xs icon-btn md-btn-flat" v-b-tooltip.hover title="Occupy" @click.stop="occupySeat()"><i class="ion ion-md-person-add"></i></b-btn> -->
            <div v-for="(seat, i) in data.item.driver.car.seats" :key="i" class="ui-feed-icon-container d-inline-block mr-2">
              <!-- <a @click.prevent="seats.splice(i, 1)" href="#" class="ui-icon ui-feed-icon ion ion-ios-close bg-secondary text-white"></a> -->
              <!-- <img :src="`${baseUrl}img/avatars/1.png`" v-b-tooltip.hover :title="seat" class="ticket-assignee d-block ui-w-35 rounded-circle"> -->
              <!-- <a href="javascript:void(0)" class="far fa-user ticket-assignee-add d-block ui-w-35 rounded-circle"></a> -->


              <b-btn v-if="seat.reserved" variant="outline-success btn-sm icon-btn md-btn-flat" v-b-tooltip.hover.bottom :title="seat.position+', reserved by '+seat.passenger.firstName+' '+seat.passenger.lastName" @click.stop="releaseSeat(data.item, i)"><i class="fas fa-user-alt"></i></b-btn>
              <b-btn v-if="!seat.reserved" variant="outline-success btn-sm icon-btn md-btn-flat" v-b-tooltip.hover.bottom :title="'Position: '+seat.position" @click.stop="reserveSeat(data.item, i)"><i class="far fa-user"></i></b-btn>
            </div>
          </template>

          <template slot="action" slot-scope="data">
            <div class="ui-feed-icon-container d-inline-block mr-2">
              <b-btn variant="outline-warning btn-sm icon-btn md-btn-flat" v-b-tooltip.hover title="Depart" @click.stop="startJourney(data.item)"><i class="ion ion-md-paper-plane"></i></b-btn>
            </div>
            <div class="ui-feed-icon-container d-inline-block mr-2">
              <b-btn variant="outline-warning btn-sm icon-btn md-btn-flat" v-b-tooltip.hover title="Delete" @click.stop="deleteTicket(data.item)"><i class="ion ion-md-trash"></i></b-btn>
            </div>
          </template>
        </b-table>

      </div>

      <!-- Pagination -->
      <b-card-body class="pt-0 pb-3">

        <div class="row">
          <div class="col-sm text-sm-left text-center pt-3">
            <span class="text-muted" v-if="totalItems">Page {{ currentPage }} of {{ totalPages }}</span>
          </div>
          <div class="col-sm pt-3">
            <b-pagination class="justify-content-center justify-content-sm-end m-0"
              v-if="totalItems"
              v-model="currentPage"
              :total-rows="totalItems"
              :per-page="perPage"
              size="sm" />
          </div>
        </div>

      </b-card-body>
      <!-- / Pagination -->

    </b-card>
  </div>
</template>

<style src="@/vendor/libs/vue-flatpickr-component/vue-flatpickr-component.scss" lang="scss"></style>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';


export default {
  name: 'ticket-list',
  metaInfo: {
    title: 'Ticket list'
  },
  components: {
    flatPickr
  },
  data: () => ({
    // Options
    searchKeys: ['id'],
    sortBy: 'id',
    sortDesc: false,
    perPage: 10,

    fields: [
      //{ key: 'id', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      //{ key: 'departureCity', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'departureLocation', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      //{ key: 'arrivalCity', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'arrivalLocation', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      //{ key: 'departureDate', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'departureTime', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'status', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'driver', label: 'Driver', thClass: 'text-nowrap', tdClass: 'text-nowrap align-middle text-center py-3' },
      { key: 'car', label: 'Car', thClass: 'text-nowrap', tdClass: 'text-nowrap align-middle text-center py-3' },
      //{ key: 'driversAlmaMater', label: 'Driver\'s alma mater', thClass: 'text-nowrap', tdClass: 'text-nowrap align-middle text-center py-3' },
      { key: 'seats', label: 'Seats', thClass: 'text-nowrap', tdClass: 'text-nowrap align-middle text-center py-3' },
      { key: 'action', label: 'Action', thClass: 'text-nowrap', tdClass: 'text-nowrap align-middle text-center py-3' }
    ],

    // Filters
    filterFrom: 'Any',
    filterTo: 'Any',
    filterDepartureDate: null,

    ticketsData: [],
    originalTicketsData: [],

    currentPage: 1,

    seats: ["a", "b", "c"]
  }),

  computed: {
    totalItems () {
      return this.ticketsData.length
    },
    totalPages () {
      return Math.ceil(this.totalItems / this.perPage)
    }
  },

  methods: {
    filter (value) {
      const val = value.toLowerCase()
      const filtered = this.originalTicketsData.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(val) !== -1 || !val
      })
      this.ticketsData = filtered
    },

    reserveSeat(order, i){
      //change the reserved status in order to change icon
      order.driver.car.seats[i].reserved = !order.driver.car.seats[i].reserved;
      //modify order
      order.driver.car.seats[i].reserved = true;
      order.driver.car.seats[i].passenger = this.$store.state.userLoggedIn;
      order.driver.car.seats[i].rated = false;

      //post to server to update the order
      let url = this.$store.state.dataUrl+'/orders/update/'+ order.id;
      this.$http.put(url, order).then(response => {
        //notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'success',
          title: 'Seat-reserve',
          text: 'Seat is reserved successfully!'
        })
        //redirect
        //this.$router.push('/tickets/list');
      }, response => {
        //error callback, notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'error',
          title: 'Seat-reserve',
          text: 'Seat is not reserved successfully!'
        })
      });
    },
    releaseSeat(order, i){
      order.driver.car.seats[i].reserved = !order.driver.car.seats[i].reserved;
      //post to server to remove a passenger from the seat

      //modify order
      order.driver.car.seats[i].reserved = null;
      order.driver.car.seats[i].passenger = null;
      order.driver.car.seats[i].rated = null;

      //post to server to update the order
      let url = this.$store.state.dataUrl+'/orders/update/'+ order.id;
      this.$http.put(url, order).then(response => {
        //notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'success',
          title: 'Seat-cancel reservation',
          text: 'Seat reservation is cancelled successfully!'
        })
        //redirect
        //this.$router.push('/tickets/list');
      }, response => {
        //error callback, notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'error',
          title: 'Seat-cancel reservation',
          text: 'Seat reservation is not cancelled successfully!'
        })
      });

    },


    startJourney(row){
      row.status = "On-board";
      let url = this.$store.state.dataUrl+'/orders/update/'+ row.id;
      this.$http.put(url, row).then(response => {
        //notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'success',
          title: 'Ticket-change',
          text: 'Have a nice journey!'
        })
        //redirect
        //this.$router.push('/tickets/list');
      }, response => {
        //error callback, notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'error',
          title: 'Ticket-change',
          text: 'Error occurred when changing ticket\'s status!'
        })
      });

    },

    deleteTicket(row){
      this.$http.delete(this.$store.state.dataUrl+'/orders/delete/'+row.id).then(response => {
        //notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'warn',
          title: 'Ticket-delete',
          text: 'Ticket is deleted successfully!'
        })
        //delete the data in table
      }, response => {
        //error callback, notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'error',
          title: 'Ticket-delete',
          text: 'Ticket is not deleted successfully!'
        })
      });

    },

    show(from, to, date){
      let url =  this.$store.state.dataUrl+'/orders/get/allOngoing?departureCity='+ from + '&arrivalCity='+to+'&departureDate='+date;
      const req = new XMLHttpRequest()
      req.open('GET', url)
      req.onload = () => {
        const data = JSON.parse(req.response)
        this.ticketsData = data
        this.originalTicketsData = data.slice(0)
      }
      req.send()
    }
  }
}
</script>
