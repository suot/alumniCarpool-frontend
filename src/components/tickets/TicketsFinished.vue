<template>
    <div class="swiper-inner">
        <swiper :options="swiperOption" v-if="currentRole==='Driver'">
            <swiper-slide v-for="(order, i) in slides_driver" :key="i" >
              <md-card>
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
                        <span>{{order.departureLocation}}    </span>
                        <i class="pe-7s-angle-right small"></i>
                        <span>  {{order.arrivalLocation}}</span>
                    </div>
                    <div class="md-subhead">
                        <i class="pe-7s-alarm small"></i>
                        <span>  {{order.departureTime}}  {{order.departureDate}}</span>
                    </div>
                  </md-card-header>

                  <md-card-header>
                      <md-avatar>
                          <img :src="getImage(order.driver.id, 'avatar')" alt="Avatar" v-b-tooltip.hover title="Driver">
                      </md-avatar>
                      <div class="md-subhead">{{order.driver.firstName}} {{order.driver.lastName}}</div>
                      <div class="md-subhead">{{order.driver.phone}}</div>
                  </md-card-header>

                  <md-card-content>
                      <md-avatar v-for="(seat,j) in order.driver.car.seats" :key="j" v-if="seat.reserved" class="mr-2">
                          <img :src="getImage(seat.passenger.id, 'avatar')" alt="Avatar" v-b-tooltip.hover @click.stop="showModal_avatar(seat.passenger, 'Passenger')" :title="seat.position + ': ' + seat.passenger.firstName +' '+seat.passenger.lastName">
                      </md-avatar>
                  </md-card-content>
              </md-card>

            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>



        <swiper :options="swiperOption" v-else>
            <swiper-slide v-for="order in slides_passenger">
                <md-card>
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
                          <span>{{order.departureLocation}}    </span>
                          <i class="pe-7s-angle-right small"></i>
                          <span>  {{order.arrivalLocation}}</span>
                      </div>
                      <div class="md-subhead">
                          <i class="pe-7s-alarm small"></i>
                          <span>  {{order.departureTime}}  {{order.departureDate}}</span>
                      </div>
                    </md-card-header>

                    <md-card-header>
                        <md-avatar>
                            <img :src="getImage(order.driver.id, 'avatar')" alt="Avatar" v-b-tooltip.hover :title="'Driver: ' + order.driver.firstName + ' ' + order.driver.lastName" @click.stop="showModal_avatar(order.driver, 'Driver')">
                        </md-avatar>
                        <div class="md-subhead">Rate the driver:</div>
                        <!-- <div class="md-subhead">{{order.driver.firstName}} {{order.driver.lastName}}</div> -->
                        <!-- <div class="md-subhead">{{order.driver.phone}}</div> -->
                        <div class="md-subheading">
                            <star-rating v-if="getCurrentRating(order) === 0" :inline="true" :star-size="19" :show-rating="false" @rating-selected="setRating($event, order)" :increment="0.5" title="Rate the driver"></star-rating>
                              <star-rating v-else :inline="true" :star-size="19" :show-rating="false" @rating-selected="setDuplicateRating" :increment="0.5" :rating="getCurrentRating(order)" :read-only="true"></star-rating>
                        </div>
                    </md-card-header>

                    <md-card-content>
                        <md-avatar v-for="(seat,j) in order.driver.car.seats" :key="j" v-if="seat.reserved" class="mr-2">
                            <img :src="getImage(seat.passenger.id, 'avatar')" alt="Avatar" v-b-tooltip.hover :title="seat.position + ': ' + seat.passenger.firstName +' '+seat.passenger.lastName">
                        </md-avatar>
                    </md-card-content>
                </md-card>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>


<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import StarRating from 'vue-star-rating'
import swal from 'sweetalert2';
import '@/vendor/libs/Animation.css'


export default {
    components: {
      swiper,
      swiperSlide,
      StarRating,
      swal,
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
      getImage(userId, imageName){
        return this.$store.state.dataUrl + "\\images\\" + userId + "\\" + imageName + ".jpg";
      },

      showModal_avatar(user, role){
          let url = this.getImage(user.id, 'avatar');
          let name = user.firstName + " " + user.lastName;
          let phone = user.phone;
          let badges = "";
          let tags = user.tags;
          let htmlText = '<div>'+phone+'</div>';
          let altMsg = 'Passenger \'s avatar';


          for(let i in tags){
            badges += '<button class="d-inline-block mr-2" style="border-color: transparent; background: #26B4FF; color: #fff;">' + tags[i] + '</button>';
          }

          if(role == "Driver"){
              altMsg = 'Driver \'s avatar';
              if(user.rating > 0){
                let roundedRating = Math.round( user.rating * 10 ) / 10;
                htmlText += '<div><font size="2">Rated '+ roundedRating +' on '+user.review+' reviews</font></div>';
              }
          }

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
      },

      setDuplicateRating: function(){
          this.$showNotification('acNotification', 'warn', 'Ticket-my finished tickets', 'You have rated this seat. Do not rate it again!');
      },

      getCurrentRating(order){
          const user = this.$store.state.userLoggedIn;
          let currentRating = 0;
          let seats = order.driver.car.seats;

          for(let i=0; i < seats.length; i++){
              if(seats[i].passenger){
                  if(seats[i].passenger.id == user.id){
                      currentRating = seats[i].rating;
                  }else{
                    continue;
                  }
              }else{
                continue;
              }
          };
          return currentRating;
      },

      setRating: function(rating, order) {
          const user = this.$store.state.userLoggedIn;
          let seats = order.driver.car.seats;

          for(let i=0; i < seats.length; i++){
              if(seats[i].passenger != null){
                  if(seats[i].passenger.id == user.id){
                      if(seats[i].rating == 0){
                          //modify in the order
                          seats[i].rating = rating;
                          order.driver.car.seats = seats;
                          //post modified seat to order
                          let url1 = this.$store.state.dataUrl+"/orders/update/"+order.id;
                          this.$http.put(url1, order).then(response => {
                              //modify driver's review and rating
                              let url2 = this.$store.state.dataUrl+"/users/get/"+order.driver.id;
                              this.$http.get(url2).then(response => {
                                  //set to slides_passenger
                                  const driver = response.body;
                                  let currentReview = driver.review;
                                  let currentRating = driver.rating;

                                  driver.rating = (currentReview * currentRating + rating)/(currentReview + 1);
                                  driver.review += 1;

                                  //post modified driver to user table
                                  let url3 = this.$store.state.dataUrl+"/users/update";
                                  this.$http.put(url3, driver).then(response => {
                                      this.$showNotification('acNotification', 'success', 'Ticket-my finished tickets', 'Seat is rated successfully!');

                                      const msgTypeToDriver = "Message";
                                      const msgToDriver = "Thank you driver. I have made the rating on you!";
                                      const msgTypeToPassenger = "Notification_Success_Ticket";
                                      const msgToPassenger = "Thank you passenger. Your rating to the driver is valuable to others.";
                                      this.sendMessageToAll(order, user, msgTypeToDriver, msgToDriver, msgTypeToPassenger, msgToPassenger);

                                  }, response => {
                                      this.$showNotification('acNotification', 'error', 'Ticket-my finished tickets', 'Error occurred when rating driver!');
                                  });
                              }, response => {
                                  this.$showNotification('acNotification', 'error', 'Ticket-my finished tickets', 'Error occurred when retrieving driver!');
                              });
                          }, response => {
                              this.$showNotification('acNotification', 'error', 'Ticket-my finished tickets', 'Error occurred when updating order with seat \'s rating!');
                          });
                      }else{
                          this.$showNotification('acNotification', 'warn', 'Ticket-my finished tickets', 'Additional rating to this seat is ignored!');
                      }
                  }else{
                      continue;
                  }
              }else{
                  continue;
              }
          }
      },

      sendMessageToAll(row, passenger, msgTypeToDriver, msgToDriver, msgTypeToPassenger, msgToPassenger){
        const ticketInfo = "Ticket information: from " + row.departureLocation + ", " + row.departureCity + " to " + row.arrivalLocation + ", " + row.arrivalCity+" at " + row.departureTime+" " + row.departureDate;

        let now = new Date().toUTCString();
        let message_driver = {
          type: msgTypeToDriver,
          msgContent: msgToDriver + " " + ticketInfo,
          time: now,
          unread: true,
          sender: passenger
        };
        //send message to the driver
        this.$sendMessage(row.driver, message_driver);

        //send message to all passengers
        let message_passenger = {
          type: msgTypeToPassenger,
          msgContent: msgToPassenger + " " + ticketInfo,
          time: now,
          unread: true
        };
        this.$sendMessage(passenger, message_passenger);
      },

      getReservedSeat(order){
        let passengers = {};
        let seats = order.driver.car.seats

        for(seat in seats){
          if(seat.reserved){
            passengers.put(seat.passenger);
          }
        }
      }
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
                this.$showNotification('acNotification', 'error', 'Ticket-my finished tickets', 'Error occurred when fetching my finished tickets!');
            });
        }else{
          this.currentRole = "Driver";
          let url = this.$store.state.dataUrl+"/orders/get/drivers/finished?id="+user.id;
          this.$http.get(url).then(response => {
              //set results to slides_driver
              const orders = response.body;
              this.slides_driver = orders;
          }, response => {
              this.$showNotification('acNotification', 'error', 'Ticket-my finished tickets', 'Error occurred when fetching my finished tickets!');
          });
        }
    },

  }
</script>

<style scoped>
  .swiper-inner {
    width: 100%;
    height: 500px;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 500px;
  }
  .md-card {
    width: 300px;
    /* margin: 4px; */
    display: inline-block;
    vertical-align: top;
  }
</style>
