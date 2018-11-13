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
            <!-- <b-list-group-item button :active="curTab === 'password'" @click="curTab = 'password'">Change password</b-list-group-item> -->
            <b-list-group-item button :active="curTab === 'info'" @click="curTab = 'info'">Info</b-list-group-item>
            <b-list-group-item button :active="curTab === 'car'" @click="curTab = 'car'">Car Info</b-list-group-item>
          </b-list-group>
        </div>

        <div class="col-md-9" v-if="curTab === 'general'">
          <b-card-body class="media align-items-center">

            <div class="example-avatar">
                <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
                  <h3>Drop file to upload</h3>
                </div>
                <div class="avatar-upload"  v-show="!edit">
                  <div class="text-center p-2">
                    <label for="avatar">
                      <img :src="files.length ? files[0].url : `${baseUrl}img/upload_file_none.png`"  class="rounded-circle" />
                      <!-- <h6 class="pt-2">Drop file here to upload</h6> -->
                    </label>
                  </div>
                  <div class="text-center p-2">
                    <file-upload
                      extensions="gif,jpg,jpeg,png"
                      accept="image/png,image/gif,image/jpeg"
                      name="avatar"
                      class="btn btn-primary"
                      :drop="!edit"
                      v-model="files"
                      @input-filter="inputFilter"
                      @input-file="inputFile"
                      ref="upload">
                      Select avatar
                    </file-upload>
                  </div>
                </div>

                <div class="avatar-edit" v-show="files.length && edit">
                  <div class="avatar-edit-image" v-if="files.length">
                    <img ref="editImage" :src="files[0].url" />
                  </div>
                  <div class="text-center p-4">
                    <button type="button" class="btn btn-secondary" @click.prevent="$refs.upload.clear">Cancel</button>
                    <button type="submit" class="btn btn-primary" @click.prevent="editSave">Save and upload</button>
                  </div>
                </div>
              </div>

          </b-card-body>

          <hr class="border-light m-0">

          <b-card-body>
            <b-form-group label="First Name">
              <b-input v-model="userData.firstName" />
            </b-form-group>

            <b-form-group label="Last Name">
              <b-input v-model="userData.lastName" />
            </b-form-group>

            <b-form-group label="Email">
              <b-input v-model="userData.email" />
              <b-alert variant="warning" show class="mt-3 mb-0" v-if="!userData.verified">
                Your email is not confirmed. Please check your inbox.<br>
                <a href="javascript:void(0)">Resend confirmation</a>
              </b-alert>
            </b-form-group>

          </b-card-body>
        </div>

        <!-- <div class="col-md-9" v-if="curTab === 'password'">
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
        </div> -->

        <div class="col-md-9" v-if="curTab === 'info'">
          <b-card-body class="pb-2">
            <b-form-group label="Current Role">
              <b-select v-model="userData.currentRole" :options="['Passenger', 'Driver']"/>
            </b-form-group>

            <b-form-group label="Gender">
              <b-select v-model="userData.gender" :options="['Female', 'Male']"/>
            </b-form-group>

            <b-form-group label="Phone">
              <b-input v-model="userData.phone" />
            </b-form-group>

            <b-form-group label="Tags">
              <input-tag placeholder="Add tags" v-model="userData.tags"></input-tag>
            </b-form-group>

          </b-card-body>

          <hr class="border-light m-0">

          <b-card-body class="pb-2">
            <!-- <h6 class="mb-4">Alumni certificate</h6> -->

            <b-form-group label="Alma Mater">
              <b-input v-model="userData.almaMater" />
            </b-form-group>

            <b-form-group label="Student ID">
              <b-input v-model="userData.studentId" />
            </b-form-group>

            <!-- <img :src="`${baseUrl}img/avatars/${userData.avatar}`" alt="" class="d-block ui-w-80">&nbsp; -->
            <b-form-group label="Upload certificate">
              <!-- <b-input v-model="userData.certificate" /> -->
              <div class="media-body ml-4">
                <b-btn variant="outline-primary">Upload certificate</b-btn> &nbsp;
                <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
              </div>
            </b-form-group>


          </b-card-body>
        </div>

        <div class="col-md-9" v-if="curTab === 'car'">
          <b-card-body class="pb-2">
            <b-form-group label="Plate Number">
              <b-input v-model="userData.car.plateNum" />
            </b-form-group>

            <b-form-group label="Upload your car photo">
              <div class="media-body ml-4">
                <b-btn variant="outline-primary">Upload car photo</b-btn> &nbsp;
                <div class="text-light small mt-1">Allowed JPG, GIF or PNG. Max size of 800K</div>
              </div>
            </b-form-group>

            <b-form-group label="Seats">
              <input-tag placeholder="Add seats" v-model="vacantSeats"></input-tag>
            </b-form-group>
          </b-card-body>
        </div>
      </div>
    </b-card>

    <div class="text-right mt-3">
      <b-btn variant="primary" @click='saveChanges()'>Save changes</b-btn>&nbsp;
      <b-btn variant="default">Cancel</b-btn>
    </div>

  </div>
</template>





<script>
import Cropper from 'cropperjs'
import FileUpload from 'vue-upload-component'
import InputTag from 'vue-input-tag'


export default {
  name: 'account-settings',
  metaInfo: {
    title: 'Account settings'
  },
  components: {
    FileUpload,
    InputTag
  },
  data: () => ({
    curTab: 'general',

    vacantSeats: [],

    userData: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      currentRole: '',
      gender: '',
      phone: '',
      //avatar: '5-small.png',
      almaMater: '',
      studentId: '',
      //certificate: [],
      tags: [],
      verified: false,
      car: {
        plateNum: '',
        //carPhoto: '',
        seats: [],
      }
    },

    //fileUpload
    files: [],
    edit: false,
    cropper: false,

  }),

  methods: {
    addTag (newTag) {
      this.userData.tags.push(newTag)
    },
     addSeat (newTag) {
      this.userData.car.seats.push(newTag)
    },

    saveChanges(){
      //traverse vacantSeats
      if(this.vacantSeats){
        for (let i = 0; i < this.vacantSeats.length; i++){
          let seat = {
            position: this.vacantSeats[i],
            reserved: false,
            rated: false,
            passenger: {},
          };

          //TODO:post seat into db and get its id back; Use id to find a seat later.
          //use seat's unique position value to find it alternatively.
          this.userData.car.seats.push(seat);
        }
      }else{
        this.userData.car.seats = [];
      }

      //post to server
      this.$http.post(this.$store.state.dataUrl+"/users/update", this.userData).then(response => {
        //notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'success',
          title: 'User-update',
          text: 'User profile is updated successfully. Please log in again to see your changes!'
        })
        //redirect
        this.$router.push('/login');
      }, response => {
        // error callback, notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'error',
          title: 'User-update',
          text: 'User profile is not updated successfully!'
        })
      });

    },



    //FileUpload
    editSave() {
      this.edit = false
      let oldFile = this.files[0]
      let binStr = atob(this.cropper.getCroppedCanvas().toDataURL(oldFile.type).split(',')[1])
      let arr = new Uint8Array(binStr.length)

      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      let file = new File([arr], oldFile.name, { type: oldFile.type })
      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true,
      })



      let formData = new FormData();
      formData.append('file', this.files[0]);
      let headers = {'Content-Type': 'multipart/form-data'};

      this.$http.post(this.$store.state.dataUrl+"/users/upload/avatar?id="+this.userData.id, formData, {headers}).then(response => {
        //notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'success',
          title: 'Upload-avatar',
          text: 'Avatar is uploaded successfully!'
        })

      }, response => {
        // error callback, notification
        this.$notify({
          group: 'alumniCarpoolNotification',
          type: 'error',
          title: 'Upload-avatar',
          text: 'Avatar is not uploaded successfully!'
        })
      });
    },
    alert(message) {
      alert(message)
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function () {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        let URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    }
  },

  //fileUpload
  watch: {
    edit(value) {
      if (value) {
        this.$nextTick(function () {
          if (!this.$refs.editImage) {
            return
          }
          let cropper = new Cropper(this.$refs.editImage, {
            aspectRatio: 1 / 1,
            viewMode: 1,
          })
          this.cropper = cropper
        })
      } else {
        if (this.cropper) {
          this.cropper.destroy()
          this.cropper = false
        }
      }
    }
  },

  created () {
    const user = this.$store.state.userLoggedIn;
    if(user.id){
      this.userData.id = user.id;
    }
    if(user.email){
      this.userData.email = user.email;
    }
    if(user.password){
      this.userData.password = user.password;
    }
    if(user.firstName){
      this.userData.firstName = user.firstName;
    }
    if(user.lastName){
      this.userData.lastName = user.lastName;
    }
    if(user.currentRole){
      this.userData.currentRole = user.currentRole;
    }
    if(user.gender){
      this.userData.gender = user.gender;
    }
    if(user.almaMater){
      this.userData.almaMater = user.almaMater;
    }
    if(user.phone){
      this.userData.phone = user.phone;
    }
    // if(user.avatar){
    //   this.userData.avatar = user.avatar;
    // }
    if(user.studentId){
      this.userData.studentId = user.studentId;
    }
    // if(user.certificate){
    //   this.userData.certificate = user.certificate;
    // }
    if(user.tags){
      this.userData.tags = user.tags;
    }
    if(user.verified){
      this.userData.verified = user.verified;
    }
    if(user.car){
      if(user.car.seats){
        for (let i = 0; i < user.car.seats.length; i++){
          this.vacantSeats.push(user.car.seats[i].position);
        }
      }else{
        // this.vacantSeats = ['Front-right', 'Back-left', 'Back-right'];
      }

      if(user.car.plateNum){
        this.userData.car.plateNum = user.car.plateNum;
      }else {
        //default is ''
      }
    }else {
      this.vacantSeats = ['Front-right', 'Back-left', 'Back-right'];
    }
  },

}
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css" />
<style src="cropperjs/dist/cropper.css" />
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
<style src="@/vendor/styles/pages/account.scss" lang="scss"></style>
<style>
.example-avatar .avatar-upload .rounded-circle {
  width: 30px;
  height: 30px;
}
.example-avatar .text-center .btn {
  margin: 0 .5rem
}
.example-avatar .avatar-edit-image {
  max-width: 50%
}
.example-avatar .drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: .6;
  text-align: center;
  background: #000;
}
.example-avatar .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
</style>
