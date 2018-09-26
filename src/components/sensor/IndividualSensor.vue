<template>
  <div>
    <sidebar></sidebar>
    <v-content>
      <v-layout row>
        <app-backBtn></app-backBtn>
      </v-layout>
      <v-container fluid>
        <wait :progress="progress"></wait>
        <v-card class="pb-5">
          <v-card-text style="font-size:16px;">
            {{sensorData.node_name}}
          </v-card-text>
          <v-layout row>
            <v-flex xs12 md12 sm12>
              <v-card class="ml-4 mr-4 pl-4 pr-4 mb-4 pt-2" style="border:1px solid lightgrey">
                <v-layout row wrap>
                  <v-flex xs12 md4 sm12>
                    <v-select :items="time" v-model="vtime" label="Time"></v-select>
                  </v-flex>
                  <v-flex xs12 md4 sm12>

                  </v-flex>
                  <v-flex xs12 md4 sm12 class="text-md-right">
                    <!--<v-select :items="metrics" v-model="metric" label="Metric"></v-select>-->
                  </v-flex>
                  <v-flex xs12 sm12 md12 class="text-md-center pb-3" >
                    <chart-app></chart-app>
                  </v-flex>
                  <v-flex xs12 md6 sm6 >
                    <div v-show="adminUser">
                      <v-dialog v-model="dialog" persistent max-width="800px">
                        <input type="file" id="file" ref="Surveyfile" v-show="show" v-on:change="handleSurveyFilesUpload()"/>
                        <v-btn small slot="activator" color="primary" dark>Upload Raw Data</v-btn>
                        <v-card class="pl-5 pb-5">
                          <div class="text-md-right">
                            <v-btn outline small fab color="red" @click="dialog=!dialog">
                              <v-icon>close</v-icon>
                            </v-btn>
                          </div>
                          <v-card-title primary-title>
                            <b>To upload or edit raw data:</b>
                          </v-card-title>
                          <v-card-text>
                            <p>• Download the current full data set </p>
                            <p>• If there is currently no data, download the template </p>
                            <p>• Make your additions and edits</p>
                            <p>• Re-upload full data set</p>
                          </v-card-text>
                          <v-card-actions class="mr-5">
                            <v-btn color="info" class="mr-5" small @click="DownloadRawData">Download Raw Data</v-btn>
                            <a :href="completeData.sensor_file" v-show="show" ref="download"></a>
                            <v-btn color="info" class="mr-5" small @click="DownloadRawData">Download Template</v-btn>
                            <v-btn color="info" class="mr-5" small @click="uploadRawData">Upload Raw Data</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </v-flex>
                  <v-flex xs12 md6 sm6 class="text-md-right">
                    <v-btn color="info"  small @click="DownloadRawData">
                      <v-icon left>get_app</v-icon>Download CSV</v-btn>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
            <v-layout row class="mt-5">
              <v-flex xs12 md12 sm10>
                <v-card class="pl-2" style="border:1px solid lightgrey">
                  <v-card-title primary-title>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <div class="headline">Raw Data</div>
                      </v-flex>
                      <v-flex xs3 v-show="view === true">
                        <div class="text-xs-right"><v-btn color="info" flat outline @click="Editdialog = true"><v-icon>edit</v-icon>Edit</v-btn></div>
                      </v-flex>
                      <v-flex xs3 v-show="view === true">
                        <v-btn color="error" flat outline @click="Deletedialog = true">Delete</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card-title>
                  <v-card-text>
                    <v-layout row wrap>
                      <v-flex xs6>
                        <img :src="photo" height="250px" width="400px">
                      </v-flex>
                      <v-flex xs6>
                        <v-layout row wrap>
                          <v-flex xs6>
                            <b>Node ID</b>: {{sensorData.node_id}}
                          </v-flex>
                          <v-flex xs6>
                            <b>Node Name</b>: {{sensorData.node_name}}
                          </v-flex>
                        </v-layout><br>
                        <v-layout row wrap>
                          <v-flex xs6>
                            <b>Node Type</b>: {{sensorData.node_type}}
                          </v-flex>
                          <v-flex xs6>
                            <b>Country</b>: {{sensorData.country_name}}
                          </v-flex>
                        </v-layout><br>
                        <v-layout row wrap>
                          <v-flex xs6>
                            <b>Owner</b>: {{sensorData.owner_name}}
                          </v-flex>
                          <v-flex xs6>
                            <b>Owner Phone</b>: {{sensorData.mobile}}
                          </v-flex>
                        </v-layout><br>
                        <v-layout row wrap>
                          <v-flex xs6>
                            <b>Owner Email</b>: {{sensorData.email}}
                          </v-flex>
                          <v-flex xs6>
                            <b>GPS</b>: X:{{sensorData.gps_x}}, Y:{{sensorData.gps_y}}
                          </v-flex>
                        </v-layout><br>
                        <v-layout row wrap>
                          <v-flex xs12>
                            <b>Notes</b>: {{sensorData.note}}
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout><br><br>
                    <div class="headline">Attachments</div><br>
                    <v-layout row wrap v-for="(t,key) in attach"  :key="key">
                      <v-flex xs6><a :href="t">{{t.filename}}</a></v-flex>
                      <v-flex xs6>
                        <a><v-icon @click="deleteAttachment(t.id)"v-show="ifAdmin" large color="error">delete_forever</v-icon></a>
                        <v-dialog v-model="deletedialog" max-width="400">
                          <v-card>
                            <v-card-title class="headline">Delete Attachment</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                              Are you sure you want to delete this <b>Attachment</b>.
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
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-dialog v-model="Editdialog" max-width="800px">
                <input type="file" id="files" ref="files" v-show="show" v-on:change="handleFilesUpload()"/>
                <v-card>
                  <v-card-title>
                    <div class="headline">Edit Sensor Details </div>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <v-layout row wrap>
                        <v-flex xs12 md6 sm12 class="pr-2">
                          <v-text-field v-model="sensorData.node_name" label="Node Name" id="nodeName"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-3">
                          <v-text-field v-model="sensorData.node_id" label="Node Id" id="email" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-2">
                          <v-select :items="nodeType" v-model="sensorData.node_type" label="Node Type" ></v-select>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-2">
                          <v-text-field v-model="sensorData.owner_name" label="Name Owner" id="owner" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-2">
                          <v-text-field v-model="sensorData.mobile" label="Phone No" id="phoneNo" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-3">
                          <v-text-field v-model="sensorData.email" label="Email" id="email"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-2">
                          <v-select :items="countryName" v-model="sensorData.country_name" label="Country" ></v-select>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-2">
                          <v-select :items="metricType" v-model="sensorData.metric_type" label="Metric" ></v-select>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-3">
                          <v-text-field v-model="sensorData.gps_x" label="GPS(X: co-ordinate)" id="email" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-3">
                          <v-text-field v-model="sensorData.gps_y" label="GPS(Y: co-ordinate)" id="email" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-3">
                          <v-btn color="info" dark @click="addFiles">Add Files</v-btn>
                        </v-flex>
                        <v-flex xs12 md6 sm12 class="pr-3">
                          <div v-for="(file, key) in files" class="text-xs-right pr-5 mr-4" >{{ file.name }} <br> <v-btn class="remove-file" flat color="error" @click="removeFile( key )">Remove</v-btn></div>
                          <div v-for="(file, key) in attach" class="text-xs-right pr-5 mr-4" >{{ file.filename }} <br> <v-btn class="remove-file" flat color="error" @click="deleteAttachment( file.id )">Remove</v-btn></div>
                        </v-flex>
                        <v-flex xs12 md12 sm12 class="pr-2">
                          <v-text-field v-model="sensorData.note" multiLine label="Notes" id="notes" ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12 sm12 class="pr-2">
                          <img :src="imageUrl" height="150" v-if="imageUrl"/>
                          <v-btn @click='pickFile' prepend-icon='attach_file'>Change Photo</v-btn>
                          <input
                          type="file"
                          style="display: none"
                          ref="image"
                          accept="image/*"
                          @change="onFilePicked"
                          >
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn @click="editSensor(sensorData.node_name, sensorData.node_id, sensorData.node_type, sensorData.owner_name, sensorData.mobile, sensorData.email, sensorData.country_name, sensorData.metric_type, sensorData.gps_x, sensorData.gps_y, sensorData.note)" class="info">Submit</v-btn>
                    <v-btn @click="clear" class="info">Clear</v-btn>
                    <v-btn color="error" flat outline @click="Editdialog = false">Close</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-layout>
          </v-card>
          <v-dialog v-model="Deletedialog" max-width="500px">
            <v-card>
              <v-card-title primary-title>
                <div class="headline">
                  Delete Sensor
                </div>
              </v-card-title>
              <v-card-text>
                Do you want to <b>Delete</b> this Sensor??
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="deleteSensor" flat outline>Yes</v-btn>
                <v-btn color="success" @click="Deletedialog = false" flat outline>No</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-content>
    </div>
  </template>

  <script>
  import Sidebar from '../sidebar/Sidebar.vue'
  import loggedInMixin from '../../mixins/loggedInMixin'
  import wait from '../useful/PleaseWait'
  import axios from 'axios'
  import BackBtn from '../shared/BackRoutingBtn.vue'
  import Chart from '../chart/Chart.vue'
  //import LineExample from './LineExample'

  export default{
    computed: {
      adminUser: function(){
        return localStorage.getItem('user_type') == 'help_admin'
      }
    },
    components: {
      "sidebar": Sidebar,
      'app-backBtn':BackBtn,
      'chart-app':Chart,
      'wait': wait
    },
    data(){
      return{
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
        dataPoints: null,
        Editdialog: '',
        height: 20,
        imageName: '',
        imageUrl: '',
        uploadFile: [],
        view: '',
        show: false,
        progress: false,
        Deletedialog: '',
        local1: [],
        local2: [],
        local3: [],
        nodeType: [],
        countryName: [],
        metricType: [],
        attach: [],
        files: [],
        metric:'',
        vtime:'',
        completeData: [],
        dialog:false,
        sensorData: [],
        metrics:['Energy Consumption','Energy Generation', 'Whether'],
        time:['Today','Week','this month'],
        ifAdmin: false,
        deletedialog: false
      }
    },
    methods:{
      confirmDelete (action) {
        if (action === 'yes') {
          this.deleteThisAttachment()
          this.deletedialog = false
        } else {
          console.log('no')
          this.deletedialog = false
        }
      },
      deleteAttachment (id) {
        this.attachmentId = id
        this.deletedialog = true
        console.log(id)
      },
      deleteThisAttachment(){
        this.progress = true
        var obj = this
        axios({
          url: this.$hostname + '/sensor/sensor/'+localStorage.getItem('sensor_id')+'/attachment?id='+obj.attachmentId,
          method: 'delete',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')}
        })
        .then(function(res) {
          console.log(res)
          obj.getData()
          obj.progress = true
        })
        .catch(function(err){
          console.log(err)
        })
      },
      applyBtn(){},
      pickFile () {
        this.$refs.image.click ()
      },
      DownloadRawData () {
        console.log(this.completeData.sensor_file)
        this.$refs.download.click()
      },
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      },
      uploadRawData(){
        this.$refs.Surveyfile.click();
      },
      downloadCsvFile(){},
      clear () {
        this.$refs.form.reset()
        this.imageUrl = ''
      },
      handleSurveyFilesUpload (){
        let uploadedFiles = this.$refs.Surveyfile.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.uploadFile.push( uploadedFiles[i] );
        }
        var form = new FormData()
        form.append('sensor_file', this.uploadFile[0])
        var obj = this
        axios({
          url: this.$hostname + '/sensor/sensor/' + localStorage.getItem('sensor_id') + '/upload/',
          method: 'put',
          data: form,
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res) {
          obj.$router.go(0)
          alert('Sensor Raw Data Was Uploaded')
        }).catch(function(err) {
          alert('File Was Not Uploaded Due Some Error Please Try After SomeTime')
        })
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
      deleteSensor () {
        console.log(localStorage.getItem('sensor_id'))
        var obj = this
        axios({
          url: this.$hostname + '/sensor/sensor/' + localStorage.getItem('sensor_id') + '/archive/',
          method: 'put',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res) {
          obj.$router.go(-1)
        }).catch(function(err) {
          console.log(err)
        })
      },
      addFiles(){
        console.log(this.$refs)

        this.$refs.files.click();
      },
      getData () {
        var obj = this
        axios({
          url: this.$hostname + '/sensor/sensor/' + localStorage.getItem('sensor_id'),
          method: 'get',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        })
        .then(res =>{
          obj.progress = false
          console.log(res.data)
          obj.completeData = res.data
          obj.sensorData = res.data.meta_data
          obj.attach = res.data.attachments
          if (res.data.sensor_image === null) {
            console.log('empty sensor_image')
          } else {
            obj.photo = res.data.sensor_image
          }
        })
      },
      editSensor (node_name, node_id, node_type, owner_name, mobile, email, country_name, metric_type, gps_x, gps_y, note) {
      //  console.log(node_name, node_id, node_type, owner_name, mobile, email, country_name, metric_type, gps_x, gps_y, note)
        //console.log(this.files)
        this.progress = true
        var cname
        var nname
        var mname
        var i
        var j
        var k
        for (i = 0; i<this.local1.length; i++) {
          if (this.local1[i].country_name === country_name) {
            cname = this.local1[i].id
          }
        }
        for (j = 0; j<this.local2.length; j++) {
          if (this.local2[j].node_type === node_type) {
            nname = this.local2[j].id
          }
        }
        for (k = 0; k<this.local3.length; k++) {
          if (this.local3[k].metric_type === metric_type) {
            mname = this.local3[k].id
          }
        }
        var data = {
          "node_id": node_id,
          "node_name": node_name,
          "node_type": node_type,
          "owner_name": owner_name,
          "mobile": mobile,
          "email": email,
          "country_name": country_name,
          "metric_type": metric_type,
          "note": note,
          "gps_x": gps_x,
          "gps_y": gps_y,
          "country": cname,
          "node_type": nname,
          "metric": mname
        }
        var form = new FormData()
        form.append("meta_data", JSON.stringify(data))
        for(var i =0;i<this.files.length;i++){
          form.append("attachment_"+i, this.files[i])
        }
        if(this.imageFile) {
          form.append("sensor_image", this.imageFile)
        }
        var obj = this
        axios({
          url: this.$hostname + '/sensor/sensor/' + localStorage.getItem('sensor_id') + '/',
          method: 'put',
          data: form,
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res) {
          obj.$router.go(0)
          obj.files = []
          obj.progress = false
        }).catch(function(err) {
          console.log(err)
        })
        /*var formData = new FormData()
        formData.append("sensor_image", this.imageFile)
        axios({
          url: this.$hostname + '/sensor/sensor/' + localStorage.getItem('sensor_id') + '/upload/',
          method: 'put',
          data: formData,
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res) {
          obj.$router.go(0)
          obj.files = []
          obj.progress = false
        }).catch(function(err) {
          console.log(err)
        })*/
      }
    },
    mounted () {
      this.getData()
      if (localStorage.getItem('user_type') === "help_admin") {
        this.view = true
        this.ifAdmin = true
      }
      this.local1 = JSON.parse(localStorage.getItem('country'))
      this.local2 = JSON.parse(localStorage.getItem('node'))
      this.local3 = JSON.parse(localStorage.getItem('metric'))
      var obj = this
      this.local1.map(function(data){
        obj.countryName.push(data.country_name)
      })
      this.local2.map(function(data){
        obj.nodeType.push(data.node_type)
      })
      this.local3.map(function(data){
        obj.metricType.push(data.metric_type)
      })
    },
    mixins:[loggedInMixin]

  }

  </script>
