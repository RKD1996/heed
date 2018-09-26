<template>
  <div>
    <please-wait :progress="progress"></please-wait>
    <sidebar></sidebar>
    <v-content>
      <v-container>
        <div class="display-1">Photos</div><br>
        <div class="subheading">Here you can upload and download any photographic data that is collected of interest to the project.</div>
        <v-dialog v-model="dialog_new_gallery" max-width="500px">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              <v-layout row wrap>
                <v-flex xs6 class="headline pt-2">
                  <b>Create a New Gallery</b>
                </v-flex>
                <v-flex xs6 class="text-xs-right">
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-text>
              <v-text-field v-model="name" label="Gallery Title" required></v-text-field>
              <v-text-field v-model="description" label="Description" multi-line></v-text-field>
              <vuetify-google-autocomplete id="example" placeholder="Enter text..." hint="Enter an address" v-on:placechanged="handlePlaceChangedEvent"></vuetify-google-autocomplete>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="submitFiles">Submit</v-btn>
              <v-btn color="primary" flat @click="submitFilesClear">Clear</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
      <v-container grid-list-md>
        <v-layout>
          <v-flex xs6 md6 sm4>
            <div class="headline">Galleries</div>
          </v-flex>
          <v-flex xs6 md5 xs6 class="text-md-right" v-show="ifAdmin">
            <v-btn color="primary" @click="createGallery"><v-icon dark left >add</v-icon>New Gallery</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="isLoading" class="mt-5">
          <v-flex xs6 md12 offset-md5>
            <app-loading></app-loading>
          </v-flex>
        </v-layout>
        <v-card class="pl-3 pt-3 mt-2" v-else="isLoading" >
          <v-layout row wrap class="pt-3 pb-3">
            <v-flex xs6 md6 xs6>
              <!--<v-btn slot="activator" color="primary" dark @click="downloadGallery"><v-icon left dark>get_app</v-icon>Download</v-btn>-->
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6 md3 sm3 class="mb-3 pr-4" v-for="(photo,index) in gallery" :key="photo.galleryId">
              <v-card  hover class="pt-2 pl-2 pr-2 cardHover" style="border:1px solid lightgrey;" >
                <v-card-media height="120" :src = "photo.image_list[0].image_path" v-if ="photo.image_list.length>0" @click="getAllPhoto(photo)">
                  <!--<v-layout row wrap>
                    <v-flex md6 v-for="image in photo.image_list" :key="image.id">
                      <v-card>
                        <v-card-media elevation-7 height="50" width="50">
                        </v-card-media>
                      </v-card>
                    </v-flex>
                  </v-layout>-->
                </v-card-media>
                <v-card-media height="120" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                  v-else ="photo.image_list.length=0" @click="getAllPhoto(photo)">
                </v-card-media>

                <v-card-title primary-title>
                  <v-layout row wrap>
                    <v-flex md12 class="subheading" @click="getAllPhoto(photo)">
                      {{photo.gallery_name}}
                    </v-flex>
                  </v-layout>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-layout row wrap>
                    <v-flex xs12 class="text-xs-center">
                      <v-btn color="error" @click="deleteGallery(photo.id)" v-show="ifAdmin">Delete</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
              <v-dialog v-model="dialog" max-width="400">
                <v-card>
                  <v-card-title class="headline">Delete Gallery</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    Are you sure you want to delete the <b>gallery</b>.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" flat @click="confirmDelete('yes')">Yes</v-btn>
                    <v-btn color="green darken-1" flat @click="confirmDelete('no')">No</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import Sidebar from '../sidebar/Sidebar.vue'
import PleaseWait from '../useful/PleaseWait'
import loggedInMixin from '../../mixins/loggedInMixin'
import axios from 'axios'
import jszip from 'jszip'
import { saveAs } from '../../mixins/FileSaver'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
//import countryCodeList from '../photo/countrycode.json'
var zip = new jszip()
// var img = zip.folder("images");


export default{
  components: {
    "sidebar": Sidebar,
    "please-wait": PleaseWait
  },
  mounted () {
    //this.$refs.address.focus()
    var user_type = localStorage.getItem('user_type')
    if(user_type === "help_admin"){
      this.ifAdmin = true
    }
  },
  created: function(){
    this.isLoading=true   // Initially 'app-loading' component will be loaded until a success api called
    var vm = this
    this.$store.dispatch('getPhotoData')
    .then( function(response) {
      console.log(response.data)
      vm.isLoading=false
      vm.snackbar=false
      vm.gallery = response.data
    })
    .catch( function(error){
      console.log(error)
    })
  },
  data(){
    return{
      address: null,

      description: '',
      // New Gallery Created selection
      dialog_new_gallery: false,
      dialog: false,
      deleteCom: '',
      files: [],
      name: '',
      cc: 0,
      // Download and Checkbox Section
      count:0,
      valid:false,
      dialog:false,
      isLoading:false,
      isDownloading:false,
      snackbar:true,
      progress: false,
      checkboxes:[],
      downloadStatus:'',
      ifAdmin: false,
      //Downloading Proggress
      value: 0,
      query: false,
      show: true,
      interval: 0,
      isCompleted:false,
      // JSON Data
      gallery:[],
      gallaryId: ''
    }
  },
  mixins:[loggedInMixin],
  methods:{
    handlePlaceChangedEvent(address) {
     this.address = address
   },
    createGallery () {
      this.dialog_new_gallery = true
    },
    getAllPhoto(photo){
      //console.log(photo)
      localStorage.setItem('gId' ,  photo.id)
      localStorage.setItem('gName', photo.gallery_name)
      localStorage.setItem('gDes' ,  photo.description)
      localStorage.setItem('gLoc', photo.location)
      this.$router.push({path:'photo/gallery/'+photo.id+'/photos', param:{value: '123'}})

    },
    downloadGallery () {
      var t
      var ext
      var cc = 0
      var c = 0
      var obj = this
      var a = 0
      obj.checkboxes.map(function (url1) {
        c = c + 1
        console.log(c)
        var img = zip.folder("images" + c)
        a = a + url1.length
        url1.map(function (url){
          axios.get( url.imageUrl , {
            responseType: 'arraybuffer'
          }).then(function (response){
            t = /.+\.([^?]+)(\?|$)/
            ext = url.imageUrl.match(t)
            obj.imgeData = new Buffer(response.data, 'binary').toString('base64')
            cc = cc + 1
            img.file("img" + cc+ "." + ext[1], obj.imgeData, {base64: true})
            if ( c === obj.checkboxes.length && cc === a){
              console.log('zip is made')
              zip.generateAsync({type:"blob"})
              .then(function(content) {
                saveAs(content, "archive.zip");
              })
            }
          })
        })
      })
    },
    addFiles(){
      this.$refs.files.click();
    },
    submitFiles () {
      this.progress = true
      var n = this.name.split('')
      console.log(n)
      if (n.length >= 1) {
        var obj = this
        axios({
          method: 'post',
          url: obj.$hostname + '/gallery/gallery/',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
          data: {
            'gallery_name': obj.name,
            'description': obj.description,
            'location': document.getElementById('example').value
          }
        }).then(response => {
          alert('Your Data Has Been SuccessFully Uploaded To Continue Please Press OK')
          obj.dialog_new_gallery = false
          obj.progress = false
          obj.$router.go(0)
        }).catch(error => { console.log(error)
          alert('There Was Some Error While Uploading Please Try Later.....')
          obj.progress = false
        })
      } else {
        alert ('No Enter Some Gallery Name')
        this.progress = false
      }
    },
    submitFilesClear () {
      console.log('clear')
      this.files = ''
      this.dialog = false
      this.$router.go(0)
    },
    handleFilesUpload(){
      let uploadedFiles = this.$refs.files.files;
      for( var i = 0; i < uploadedFiles.length; i++ ){
        this.files.push( uploadedFiles[i] );
      }
    },
    removeFile( key ){
      this.files.splice( key, 1 );
    },
    getImageDetails () {
      var vm = this
      this.$store.dispatch('getPhotoData')
      .then( function(response) {
        console.log(response.data)
        vm.isLoading=false
        vm.snackbar=false
        vm.gallery = response.data
      })
      .catch( function(error){
        console.log(error)
      })
    },
    deleteGallery (id) {
      this.gallaryId = id
      this.dialog = true

    },
    deleteThisGalary () {
     this.progress = true
      var obj = this
      axios({
        url: this.$hostname + '/gallery/gallery/' + obj.gallaryId + '/',
        method: 'delete',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')}
      })
      .then(function(res) {
        console.log(res)
        obj.getImageDetails()
        obj.progress = false
      })
      .catch(function(err){
        console.log(err)
      })
    },
    confirmDelete (event) {
      if (event === 'yes') {
        this.deleteThisGalary()
        this.dialog = false
      } else {
        console.log('no')
        this.dialog = false
      }
    }
  }
}
</script>
<style>
.cardHover img:hover{
  opacity:0.9 !important;
}
.my-0{
  margin-top:-25px !important;
}
input[type="file"]{
  position: absolute;
  top: -500px;
}
</style>
