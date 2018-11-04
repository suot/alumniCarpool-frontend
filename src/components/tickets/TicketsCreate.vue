<template>
  <div>

    <h4 class="font-weight-bold py-3 mb-4">
    Create ticket
    </h4>

    <b-card no-body>
      <!-- Ticket -->
      <b-card-body>

        <!-- Header -->

        <!-- / Header -->

        <!-- <b-form-group label="Subject">
          <b-input v-model="ticketData.subject" />
        </b-form-group> -->

      </b-card-body>
      <!-- / Ticket -->

      <hr class="border-light m-0">

      <!-- Ticket settings -->
      <b-card-body>

        <div class="form-row">
          <!-- <div class="col-sm-6">

            <b-form-group label="Priority">
              <b-select v-model="ticketData.priority" :options="{1: 'High', 2: 'Medium', 3: 'Low'}" />
            </b-form-group>

          </div> -->

        </div>

        <div class="ui-bordered px-4 pt-4 mb-4">
    <div class="form-row align-items-center">

        <div class="col-md mb-4">

          <b-form-group label="From/City">
            <b-select v-model="ticketData.Fromcity" :options="{1: 'Windsor', 2: 'Waterloo', 3: 'Toronto', 4: 'Markham'}" />
          </b-form-group>

        </div>





        <div class="col-md mb-4">
      <b-form-group label="Start/Address">
        <b-input v-model="ticketData.startaddress" rows="1" />
      </b-form-group>

        </div>

  </div>

  <!-- <div class="ui-bordered px-4 pt-4 mb-4"> -->
      <div class="form-row align-items-center">
        <div class="col-md mb-4">

          <b-form-group label="To/City">
            <b-select v-model="ticketData.Endcity" :options="{1: 'Windsor', 2: 'Waterloo', 3: 'Toronto', 4: 'Markham'}" />
          </b-form-group>




      </div>
  <div class="col-md mb-4">
        <b-form-group label="End/Address">
          <b-input v-model="ticketData.endaddress" rows="1" />
        </b-form-group>
  </div>
  </div>

<div class="form-row align-items-center">
          <div class="col-md mb-4">
          <b-form-group label="DepartureDate">
          <flat-pickr v-model="filterDepartureDate" :config="{ altInput: true, animate: !isRTL, dateFormat: 'm/d/Y', altFormat: 'm/d/Y', mode: 'single' }" :placeholder="!isIEMode ? 'Select a date' : null" />
          </b-form-group>
          </div>
      <div class="col-md mb-4">
            <b-form-group label="Time">
              <b-input v-model="ticketData.time" rows="1" />
            </b-form-group>
      </div>
</div>
<!-- <div class="col-md mb-4">
      <b-form-group label="Car">
      <b-select v-model="ticketData.car" :options="{1: '雪弗兰', 2: '福特', 3: '特斯拉', 4: '法拉利'}" />
      </b-form-group>
            </div> -->
<!-- </div> -->

<!-- <b-form-group label="Tags">
  <multiselect v-model="ticketData.tags" :multiple="true" :taggable="true" :options="[]" @tag="addTag" class="multiselect-primary" placeholder="Add tag" />
</b-form-group> -->


<!-- <div class="ui-bordered px-3 pt-3">
  <label class="form-label">photos of car</label>
  <div class="clearfix">
    <div v-for="(file, i) in ticketData.attachments" :key="file.path" class="ui-feed-icon-container float-left pt-2 mr-3 mb-3">
      <a @click.prevent="ticketData.attachments.splice(i, 1)" class="ui-icon ui-feed-icon ion ion-md-close bg-secondary text-white"></a>
      <a v-if="isImage(file)" :style="{'background-image': `url(${baseUrl}${file.path})`}" :href="baseUrl + file.path" target="_blank" class="ticket-file-img"></a>
      <a v-else href="javascript:void(0)" class="ticket-file bg-light text-muted font-weight-bold">{{ fileExt(file) }}</a>
    </div>
    <a href="javascript:void(0)" class="ticket-file-add float-left bg-lighter text-muted mt-2 mb-3">
      <span class="ion ion-md-add"></span>
    </a>
  </div>
</div> -->



  </div>




      </b-card-body>
      <!-- / Ticket settings -->

      <!-- Footer -->
      <b-card-footer>
        <b-btn variant="primary" class="mr-2">Create ticket</b-btn>
        <b-btn variant="default">Cancel</b-btn>
        <!-- <b-btn variant="outline-danger icon-btn borderless float-right"><i class="ion ion-md-trash"></i></b-btn> -->
      </b-card-footer>
      <!-- Footer -->
    </b-card>

  </div>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css" />
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
<style src="@/vendor/styles/pages/tickets.scss" lang="scss"></style>
<style src="@/vendor/libs/vue-flatpickr-component/vue-flatpickr-component.scss" lang="scss"></style>

<script>
import Multiselect from 'vue-multiselect'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';

function isRTL () {
  return document.documentElement.getAttribute('dir') === 'rtl' ||
         document.body.getAttribute('dir') === 'rtl'
}


export default {
  name: 'pages-ticket-edit',
  metaInfo: {
    title: 'Ticket edit - Pages'
  },
  components: {
    Multiselect

  },
  components: {
    flatPickr,
  },


  data: () => ({
    ticketData: {
      author: {
        avatar: '11-small.png',
        name: 'Belle Ross',
        username: 'bross'
      },


car:null,
      id: '34564',
      startaddress: '401 asking ave,windsor',
      endaddress: '6301 sliver dart dr,mississauga',
      date:'2018/9/10',
      time:null,
      plateNum:'BYAK369',
      subject: 'esse velit enim elit dolor magna est laboris',
      description: 'Ticket description',
      priority: 1,
      status: 3,
      Fromcity:'',
      Endcity:'',
     filterDepartureDate: null,
      tags: ['Feature', 'High priority'],
      passengers: [
        { avatar: '9-small.png', name: 'Amanda Warner',seat:': front'},
        { avatar: '2-small.png', name: 'Leon Wilson' ,seat:': back side'},
        { avatar: '8-small.png', name: 'Hallie Lewis' ,seat:': beck mid'}
      ],
      attachments: [
        { path: '9-small.png' },
        { path: '2-small.png' },
        { path: '8-small.png' },
        { path: 'path/to/file.txt' }
      ]

    }
  }),
  methods: {
    addTag (newTag) {
      this.ticketData.tags.push(newTag)
    },
    isImage (file) {
      return /\.jpg$|\.png$|\.gif$/i.test(file.path)
    },
    fileExt (file) {
      const parts = file.path.split('.')
      return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'FILE'
    }
  }
}
</script>
