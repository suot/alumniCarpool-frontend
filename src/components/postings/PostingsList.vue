<template>
  <div>
    <h4 class="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
      <div>Postings</div>
      <router-link :to="{ name: 'postings-create'}"><b-btn variant="primary" class="d-block"><span class="ion ion-md-add"></span>&nbsp; Create Posting</b-btn></router-link>
    </h4>

    <!-- Filters -->
    <div class="ui-bordered px-4 pt-4 mb-4">
      <div class="form-row align-items-center">
        <div class="col-md mb-4">
          <label class="form-label">Departure City</label>
          <b-select v-model="departure_from" :options="['Windsor', 'Waterloo', 'Toronto', 'Markham']" />
        </div>
        <div class="col-md mb-4">
          <label class="form-label">Arrival City</label>
          <b-select v-model="departure_to" :options="['Windsor', 'Waterloo', 'Toronto', 'Markham']" />
        </div>
        <div class="col-md mb-4">
          <label class="form-label">Departure Date</label>
          <flat-pickr v-model="departureDate" :config="{ altInput: true, animate: !isRTL, dateFormat: 'm/d/Y', altFormat: 'm/d/Y', mode: 'single' }" :placeholder="!isIEMode ? 'Select a date' : null" />
        </div>
        <div class="col-md col-xl-2 mb-4">
          <label class="form-label d-none d-md-block">&nbsp;</label>
          <b-btn variant="primary" :block="true" @click="show(departure_from, departure_to, departureDate)">Show</b-btn>
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
          :items="postingsData"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :striped="true"
          :bordered="true"
          :current-page="currentPage"
          :per-page="perPage"
          class="card-table">

          <template slot="creator" slot-scope="data">
            <div v-if="data.value" class="ui-feed-icon-container d-inline-block mr-2">
              <img :src="getImage(data.value.id, 'avatar')" @click.stop="showModal_avatar(data.value)" v-b-tooltip.hover :title="data.value.firstName+' '+data.value.lastName" class="d-block ui-w-30 rounded-circle">
            </div>
          </template>

          <template slot="action" slot-scope="data" v-if="data.item.creator.id===currentUser.id">
            <b-btn variant="outline-warning btn-xs icon-btn md-btn-flat" v-b-tooltip.hover title="Delete" @click.stop="deletePosting(data.item)"><i class="ion ion-md-trash"></i></b-btn>
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
import swal from 'sweetalert2';


export default {
  name: 'posting-list',
  metaInfo: {
    title: 'Posting list'
  },
  components: {
    flatPickr,
    swal,
  },
  data: () => ({
    // Options
    searchKeys: ['departureLocation', 'arrivalLocation', 'departureTime'],
    sortBy: 'departureTime',
    sortDesc: false,
    perPage: 10,
    currentPage: 1,

    fields: [
      { key: 'departureLocation', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'arrivalLocation', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'departureTime', sortable: true, thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'creator', sortable: true, label:'Creator', thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'action', label: 'Action', thClass: 'text-nowrap', tdClass: 'text-nowrap align-middle text-center py-3' }
    ],

    // Filters
    departure_from: 'Any',
    departure_to: 'Any',
    departureDate: null,

    postingsData: [],
    originalPostingsData: [],
  }),

  computed: {
    totalItems () {
      return this.postingsData.length
    },
    totalPages () {
      return Math.ceil(this.totalItems / this.perPage)
    },
    currentUser () {
      return this.$store.state.userLoggedIn
    }
  },

  methods: {
    showModal_avatar(creator){
        let url = this.getImage(creator.id, 'avatar');
        let name = creator.firstName + " " + creator.lastName;
        let phone = creator.phone;
        let badges = "";
        let tags = creator.tags;

        for(let i in tags){
          badges += '<button class="d-inline-block mr-2" style="border-color: transparent; background: #26B4FF; color: #fff;">' + tags[i] + '</button>';
        }

        swal({
            title: name,
            text: phone,
            imageUrl: url,
            // imageWidth: 400,
            // imageHeight: 200,
            imageAlt: 'Creator \'s avatar',
            showConfirmButton: false,
            footer: badges,
            buttonsStyling: false,
            animation: true,
        });
    },

    getImage(driverId, imageName){
      return this.$store.state.dataUrl + "\\images\\" + driverId + "\\" + imageName + ".jpg";
    },

    filter (value) {
      const val = value.toLowerCase()
      const filtered = this.originalPostingsData.filter(d => {
        return Object.keys(d)
          .filter(k => this.searchKeys.includes(k))
          .map(k => String(d[k]))
          .join('|')
          .toLowerCase()
          .indexOf(val) !== -1 || !val
      })
      this.postingsData = filtered
    },

    deletePosting(row){
      this.$http.delete(this.$store.state.dataUrl+'/postings/delete/'+row.id).then(response => {
        //update postingsData and originalPostingsData
        this.removePostingFromResult(row);
        this.$showNotification('acNotification', 'success', 'Posting-delete', 'Posting is deleted successfully!');

        //send message
        const message = {
          type: "Notification_Warn_Posting",
          msgContent: "You have deleted a posting: from " + row.departureLocation + ", " + row.departureCity + " to " + row.arrivalLocation + ", " + row.arrivalCity+" at " + row.departureTime+" " + row.departureDate,
          time: new Date().toUTCString(),
          unread: true
        };
        this.$sendMessage(this.$store.state.userLoggedIn, message);

        //delete the data in table
        this.removePostingFromResult(row);
      }, response => {
        this.$showNotification('acNotification', 'error', 'Posting-delete', 'Posting is not deleted successfully!');
      });

    },

    removePostingFromResult(item){
        this.postingsData.splice(this.postingsData.indexOf(item), 1);
        this.originalPostingsData.splice(this.originalPostingsData.indexOf(item), 1);
    },

    show(from, to, date){
      let url =  this.$store.state.dataUrl+'/postings/get/all?departureCity='+ from + '&arrivalCity='+to+'&departureDate='+date;
      const req = new XMLHttpRequest()
      req.open('GET', url)
      req.onload = () => {
        const data = JSON.parse(req.response)
        this.postingsData = data
        this.originalPostingsData = data.slice(0)
      }
      req.send()
    }
  }
}
</script>
