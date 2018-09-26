<template>
  <div>
    <sidebar></sidebar>
    <v-content>
      <v-dialog v-model="dialog_modify_gallery" max-width="500px">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            <v-layout row wrap>
              <v-flex xs6 class="headline pt-2">
                <b>Modify Gallery</b>
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
            <v-btn color="primary" flat @click="modifyThisGallery">Submit</v-btn>
            <v-btn color="primary" flat @click="submitFilesClear">Clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog_modify_photo" max-width="500px">
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            <v-layout row wrap>
              <v-flex xs6 class="headline pt-2">
                <b>Modify Photo</b>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <!-- <v-text-field v-model="pname" label="Photo Title" required></v-text-field> -->
            <v-text-field v-model="pdescription" label="Description" multi-line></v-text-field>
            <vuetify-google-autocomplete id="examplePhoto" placeholder="Enter text..." hint="Enter an address" v-on:placechanged="handlePlaceChangedEvent"></vuetify-google-autocomplete>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="modifyThisPhoto">Submit</v-btn>
            <v-btn color="primary" flat @click="submitFilesClear">Clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-container>
        <wait :progress="progress"></wait>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="display-1 pb-5" align="center">Photos of {{ galleryName }}</div>
          </v-flex>
          <v-flex v-show="ifAdmin">
            <v-btn color="primary" @click="modifyGallery">Modify</v-btn>
          </v-flex>
          <v-flex>
            <v-btn color="primary" @click="downloadFile">{{ text }}</v-btn>
          </v-flex>
          <v-flex>
            <v-btn color="primary" @click="selectAll">Select All</v-btn>
          </v-flex>
          <v-flex v-show="ifAdmin">
            <v-btn color="primary" @click="upload"><v-icon left dark>cloud_upload</v-icon> Upload Photos</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm3 class="pt-4 pr-2" v-for="(t, i) in image"  :key="i">
            <v-card>
              <v-card-media id="mediaImg" :src="t.image_path" height="200px" @click="imageClicked(t.image_path,t)"></v-card-media>
              <v-card-actions class="text-xs-right">
                <v-flex xs12 offset-xs3 offset-sm0 offset-md2 offset>
                  <!--{{t.id}}-->
                  <v-checkbox label="click to download" v-model="selected" :value="t.image_path"></v-checkbox>
                  <v-btn color="error" @click="deletePhoto(t.id)" v-show="ifAdmin">Delete</v-btn>
                  <v-dialog v-model="deletedialog" max-width="400">
                    <v-card>
                      <v-card-title class="headline">Delete Image</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        Are you sure you want to delete this <b>Image</b>.
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" flat @click="confirmDelete('yes')">Yes</v-btn>
                        <v-btn color="green darken-1" flat @click="confirmDelete('no')">No</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-flex>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-dialog v-model="dialog" width="500">
        <input type="file" id="files" ref="files" multiple  v-on:change="handleFilesUpload()"/>
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            <v-layout row wrap>
              <v-flex xs6 class="headline pt-2">
                <b>Upload Files</b>
              </v-flex>
              <v-flex xs6 class="text-xs-right">
                <v-btn color="info" dark @click="addFiles">Add Files</v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <div v-for="(file, key) in files" class="text-xs-right pr-5 mr-4" >{{ file.name }} &nbsp &nbsp <v-btn class="remove-file" flat color="error" @click="removeFile( key )">Remove</v-btn></div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="submitFiles">{{Submit_text}}</v-btn>
            <v-btn color="primary" flat @click="submitFilesClear">Clear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="hidden" max-width="900px">
        <v-card>
          <v-card-media height="500px" width="100px" :src="imgurl">
            <v-card-text class="text-xs-right">
              <v-icon id="editbtn" v-show="ifAdmin" @click="editPhoto" color="blue">edit</v-icon> &nbsp;
              <v-icon id="closebtn" @click="show" color="white">close</v-icon>
            </v-card-text>
          </v-card-media>
        </v-card>
      </v-dialog>
    </v-content>
  </div>
</template>
<script>
import Sidebar from '../sidebar/Sidebar.vue'
import loggedInMixin from '../../mixins/loggedInMixin'
import downloadjs from '../../mixins/downloadFile'
import { saveAs } from '../../mixins/FileSaver'
import wait from '../useful/PleaseWait'
import axios from 'axios'
import jszip from 'jszip'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

var zip = new jszip()
var img = zip.folder("images");

export default{
  data(){
    return{
      address: null,
      name: '',
      description: '',
      pname: '',
      pdescription: '',
      // New Gallery Created selection
      dialog_modify_gallery: false,
      dialog_modify_photo: false,
      image: [],
      selected: [],
      files: [],
      deletedialog: false,
      ifAdmin: false,
      imgurl: '',
      selectedImg: '',
      hidden: false,
      access_token: '',
      galleryName: '',
      galleryId: '',
      progress: false,
      dialog: false,
      deleteDilog: false,
      cc: 0,
      text: 'Download',
      text1: 'Download All',
      Submit_text: 'Submit',
      photoId: ''
    }
  },
  mounted(){
    this.progress = true
    var user_type = localStorage.getItem('user_type')
    if(user_type === "help_admin"){
      this.ifAdmin = true
    }
    this.galleryName = localStorage.getItem('gName')
    this.galleryId = localStorage.getItem('gId')
    this.access_token = localStorage.getItem('api_token')
    var vm = this
    this.$store.dispatch('getPhotoGalleryData', {
      id: this.galleryId
    })
    .then( function(response) {
      console.log(response)
      vm.progress = false
      //console.log(response.data)
      vm.image = response.data
    })
    .catch( function(error){
      console.log(error)
    })
  },
  components: {
    "sidebar": Sidebar,
    'wait': wait
  },
  methods: {
    editPhoto () {
      this.dialog_modify_photo = true
    },
    modifyThisPhoto () {
      var obj = this
      var form = new FormData()
      form.append("description", obj.pdescription)
      form.append('location', document.getElementById('examplePhoto').value)
      axios({
        url: this.$hostname + '/gallery/image/' + obj.photoId + '/',
        method: 'put',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
        data: form
      })
      .then(function(res) {
        console.log(res)
        obj.getImageData()
        obj.dialog_modify_photo = false
        obj.progress = true
      })
      .catch(function(err){
        console.log(err)
      })
    },
    modifyThisGallery () {
      this.progress = true
      var n = this.name.split('')
      console.log(n)
      if (n.length >= 1) {
        var obj = this
        axios({
          url: this.$hostname + '/gallery/gallery/' + localStorage.getItem('gId') + '/',
          method: 'put',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
          data: {
            'gallery_name': obj.name,
            'description': obj.description,
            'location': document.getElementById('example').value
          }
        }).then(response => {
          alert('Your Data Has Been SuccessFully Uploaded To Continue Please Press OK')
          obj.dialog_new_gallery = false
          obj.progress = false
          localStorage.setItem('gName', obj.name)
          localStorage.setItem('gDes' ,  obj.description)
          localStorage.setItem('gLoc', document.getElementById('example').value)
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
    handlePlaceChangedEvent(address) {
     this.address = address
   },
    modifyGallery () {
      this.name = localStorage.getItem('gName')
      this.description = localStorage.getItem('gDes')
      document.getElementById('example').value = localStorage.getItem('gLoc')
      this.dialog_modify_gallery = true
    },
    downloadFile () {
      this.text = 'Downloading ...'
      var i
      var t
      var ext
      var cc = 0
      var obj = this
      console.log(obj.selected)
      obj.selected.forEach(function (url){
      console.log(url)
      var get_url = url.split("?")
      console.log(get_url)
      axios({
        url: get_url[0],
        method: 'get',
        responseType: 'arraybuffer'
        //headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
      })
      .then( function(response) {
        t = /.+\.([^?]+)(\?|$)/
          ext = get_url[0].match(t)
          console.log(ext[1])
          obj.imgeData = new Buffer(response.data, 'binary').toString('base64')
          cc = cc + 1
          img.file("img" + cc+ "." + ext[1], obj.imgeData, {base64: true});
          console.log(img.file("img" + cc+ "." + ext[1], obj.imgeData, {base64: true}))
          if(cc === obj.selected.length){
            zip.generateAsync({type:"blob"})
            .then(function(content) {
              saveAs(content, "archive.zip");
              obj.text = 'Download'
            })
          }
        }).catch( function(error){
          console.log(error)
        })
      })
    },
    selectAll () {
      for (let i in this.image) {
				this.selected.push(this.image[i].image_path);
				}
    },
    getImageData() {
      var vm = this
      axios({
        url: this.$hostname + '/gallery/image/?gallery=' + vm.galleryId,
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
      })
      .then( function(response) {
        vm.progress = false
        //console.log(response.data)
        vm.image = response.data
      })
      .catch( function(error){
        console.log(error)
      })
    },
    addFiles(){
      this.$refs.files.click();
    },
    upload () {
      this.dialog = true
    },
    submitFiles () {
      this.Submit_text = 'Submitting ...'
      console.log('clicked')
      var result
      var obj = this
      var myWorker = new SharedWorker("../../../worker.js")
      myWorker.port.postMessage([obj.files, obj.galleryId, obj.access_token])
      myWorker.port.onmessage = function(e) {
        obj.Submit_text = 'Submit'
        result = e.data;
        obj.dialog = false
        console.log('Message received from worker')
        alert(result)
        obj.getImageData()
        obj.files = []
        obj.submitFilesClear ()
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
    removeFile( key ) {
      this.files.splice( key, 1 );
    },
    imageClicked (path,photo) {
      this.photoId = photo.id
      this.pdescription = photo.description
      document.getElementById('examplePhoto').value = photo.location
      this.imgurl = path
      this.hidden = true
    },
    show () {
      if (this.hidden == true) {
        this.hidden = false
      } else {
        this.hidden = true
      }
    },
    deletePhoto (id) {
      this.photoId = id
      this.deletedialog = true
      console.log(id)
    },
    deleteThisPhoto(){
      this.progress = true
      var obj = this
      axios({
        url: this.$hostname + '/gallery/image/' + obj.photoId + '/',
        method: 'delete',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')}
      })
      .then(function(res) {
        console.log(res)
        obj.getImageData()
        obj.progress = true
      })
      .catch(function(err){
        console.log(err)
      })
    },
    confirmDelete (event) {
      if (event === 'yes') {
        this.deleteThisPhoto()
        this.deletedialog = false
      } else {
        console.log('no')
        this.deletedialog = false
      }
    }
  },
  mixins:[loggedInMixin, downloadjs]
}
</script>
<style>
input[type="file"]{
  position: absolute;
  top: -500px;
}
#mediaImg{
  cursor: pointer;
}
#closebtn{
  border: 2px solid blue;
  border-radius: 25px;
  background-color: blue;
  cursor: pointer;
}
</style>
