<template>
    <div class="swiper-inner">
        <swiper :options="swiperOption" v-if="currentRole==='Passenger'">
            <swiper-slide v-for="(order, i) in slides_passenger" :key="i" >



            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>



        <swiper :options="swiperOption" v-else>
            <swiper-slide v-for="order in slides_driver">
                <md-card>

                  <md-card-area>

                    <md-card-media md-ratio="16:9">
                      <img :src="getImage(order.driver.id, 'car')" alt="Driver \'s car">
                    </md-card-media>

                    <md-card-header>
                      <div class="md-subheading">
                          <span>{{order.departureCity}}    </span>
                          <i class="lnr lnr-car small"></i>
                          <span>    {{order.arrivalCity}}</span>
                      </div>

                      <div class="md-subhead">
                          <i class="pe-7s-alarm small"></i>
                          <span>  {{order.departureTime}}  {{order.departureDate}}</span>
                      </div>

                      <div class="md-subhead">
                          <span>{{order.departureLocation}}    </span>
                          <i class="pe-7s-angle-right small"></i>
                          <span>  {{order.arrivalLocation}}</span>
                      </div>
                    </md-card-header>

                    <md-card-header>
                        <md-avatar>
                            <img :src="getImage(order.driver.id, 'avatar')" alt="Avatar" v-b-tooltip.hover :title="Driver">
                        </md-avatar>
                        <div class="md-subheading">{{order.driver.firstName}} {{order.driver.lastName}}</div>
                        <div class="md-subhead">{{order.driver.phone}}</div>
                    </md-card-header>

                    <md-card-actions md-alignment="left">
                      <md-button>Action</md-button>
                      <md-button @click.stop="rate(order.driver)">Rate the driver</md-button>
                    </md-card-actions>

                  </md-card-area>

                  <md-card-area>
                    <md-card-header>
                        <md-avatar v-for="(seat,j) in order.driver.car.seats" :key="j" v-if="seat.reserved">
                            <img :src="getImage(seat.passenger.id, 'avatar')" alt="Avatar" :title="seat.passenger.firstName +' '+seat.passenger.lastName+' in '+seat.position">
                        </md-avatar>
                    </md-card-header>

                  </md-card-area>




                    <!-- <md-card-content>
                      <span>From {{order.departureLocation}} to {{order.arrivalLocation}}</span>
                    </md-card-content> -->


                </md-card>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>

    </div>

</template>





<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'


export default {
    components: {
      swiper,
      swiperSlide,
    },

    data: () => ({
        swiperOption: {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows : true
            },
            pagination: {
              el: '.swiper-pagination'
            }
        },

        slides_passenger:{},
        slides_driver: {},
        currentRole: "",
    }),

    methods: {
      getImage(driverId, imageName){
        return this.$store.state.dataUrl + "\\images\\" + driverId + "\\" + imageName + ".jpg";
      },

      getReservedSeat(order){
        let passengers = {};
        let seats = order.driver.car.seats

        for(seat in seats){
          if(seat.reserved){
            passengers.put(seat.passenger);
          }
        }
      },

      rate(driver){
        let user = driver;
        for(let seat in driver.car.seats){
          if(true){

          }
        }
      },
    },


    created () {
        const user = this.$store.state.userLoggedIn;
        if(user.currentRole=="Passenger"){
            this.currentRole = "Passenger";
            let url = this.$store.state.dataUrl+"/orders/get/passengers/finished?id="+user.id;
            this.$http.get(url).then(response => {
                //set to slides_passenger
                const orders = response.body;
                this.slides_passenger = orders;

            }, response => {
                //error callback, notification
                this.$notify({
                  group: 'alumniCarpoolNotification',
                  type: 'error',
                  title: 'Ticket-my finished tickets',
                  text: 'Error occurred when fetching my finished tickets!'
                })
            });
        }else{
          this.currentRole = "Driver";
          let url = this.$store.state.dataUrl+"/orders/get/drivers/finished?id="+user.id;
          this.$http.get(url).then(response => {
              //set results to slides_driver
              const orders = response.body;
              this.slides_driver = orders;

          }, response => {
              //error callback, notification
              this.$notify({
                group: 'alumniCarpoolNotification',
                type: 'error',
                title: 'Ticket-my finished tickets',
                text: 'Error occurred when fetching my finished tickets!'
              })
          });
        }
    },

  }
</script>

<style scoped>
  .swiper-inner {
    width: 100%;
    height: 500px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 490px;
  }
  .md-card {
    width: 300px;
    /* margin: 4px; */
    display: inline-block;
    vertical-align: top;
  }
</style>
