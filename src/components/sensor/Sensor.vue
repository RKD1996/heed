<template>
  <div>
    <sidebar></sidebar>
    <v-content>
      <v-container fluid>
        <div class="display-1">Sensors</div><br>
        <div class="subheading mb-2">This page allows you to view data being sent from various sensors that have been installed in refugee camps in Rwanda and Nepal.  Data is being sent live through various methods using the MQTT protocol. Here, you are able to explore the data via the graphical interface or download a CSV file of the raw data. If you have the correct privileges, you are able to connect a new sensor or upload a new data-set in CSV format.
          If you would like to learn more of the data collection methods, please visit the info section of this website.</div>
          <v-card class="pl-2 pb-5">
            <v-layout row class="mb-5 pt-3 pl-3">
              <v-flex xs12 md4 xs6 >
                <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap >
              <v-flex xs12 md3 sm6 class="pr-2 ">
                <v-card class="pl-3 pt-1 pr-3 " style="border: 1px solid lightgrey;">
                  <v-layout row wrap>
                    <v-flex xs6>
                      Country
                    </v-flex>
                    <v-flex xs6 class="text-xs-right">
                      <v-icon v-show="show === true" style="border: 2px solid lightblue; font-size: 16px; color: blue; cursor: pointer;" @click="addCNM('cn')">add</v-icon>
                    </v-flex>
                  </v-layout>
                  <v-select :items="countryName" v-model="country" label="Country " single-line></v-select>
                </v-card>
              </v-flex>
              <v-flex xs12 md4 sm6 class="pr-2">
                <v-card class="pl-3 pt-1 pr-3 " style="border: 1px solid lightgrey;">
                  <v-layout row wrap>
                    <v-flex xs6>
                      Node Type
                    </v-flex>
                    <v-flex xs6 class="text-xs-right">
                      <v-icon v-show="show === true" style="border: 2px solid lightblue; font-size: 16px; color: blue; cursor: pointer;" @click="addCNM('nt')">add</v-icon>
                    </v-flex>
                  </v-layout>
                  <v-select :items="nodeType" v-model="node" label="Node Type" single-line></v-select>
                </v-card>
              </v-flex>
              <!--<v-flex xs12 md5 sm6 class="pr-2" >
                <v-card class="pl-3 pt-1 pr-3 " style="border: 1px solid lightgrey;">
                  <v-layout row wrap>
                    <v-flex xs6>
                      Metricx
                    </v-flex>
                    <v-flex xs6 class="text-xs-right">
                      <v-icon v-show="show === true" style="border: 2px solid lightblue; font-size: 16px; color: blue; cursor: pointer;" @click="addCNM('mt')">add</v-icon>
                    </v-flex>
                  </v-layout>
                  <v-select :items="metricType" v-model="metric" label="Metric" single-line></v-select>
                </v-card>
              </v-flex>-->
            </v-layout>
            <v-layout class="mt-4 mb-3">
              <v-flex xs12 md6 sm6>
                <v-btn color="info" small  @click="applyBtn(country, node, metric)">Apply</v-btn>
                <v-btn color="info" small @click="clearFilter">Clear</v-btn>
              </v-flex>
              <v-flex md3 xs6 sm6 class="text-md-right">
                <v-btn color="info"  small @click="aggregateData" :disabled="!displayAggregateBtn">Aggregate Data</v-btn>
              </v-flex>
              <v-flex xs6 md3 sm6 class="text-md-left">
                <v-dialog v-model="dialog" persistent max-width="800px">
                  <input type="file" id="files" ref="files" v-show="show" v-on:change="handleFilesUpload()"/>
                  <v-btn v-show="show === true" slot="activator" color="info"  small @click="addSensor"><v-icon left dark>add</v-icon>New Sensor</v-btn>
                  <v-card >
                    <v-card-title primary-title>
                      <v-layout row wrap>
                        <v-flex xs9 md6 sm12 >
                          <p style="font-size:25px;">Add New Sensor</p>
                        </v-flex>
                        <v-flex xs3 md6 sm12>
                          <div class="text-md-right">
                            <v-btn outline small fab color="red" @click="dialog=!dialog">
                              <v-icon>close</v-icon>
                            </v-btn>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-card-title>
                    <v-card-text>
                      <v-form v-model="valid" ref="form" lazy-validation>
                        <v-layout row wrap>
                          <v-flex xs12 md6 sm12 class="pr-2">
                            <v-text-field v-model="sensor.nodeName" label="Node Name" id="nodeName" :rules="Rules"></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-3">
                            <v-text-field v-model="sensor.nodeId" label="Node Id" id="email" :rules="Rules"></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-2">
                            <v-select :items="nodeType" v-model="sensor.nodeType" label="Node Type" :rules="Rules"></v-select>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-2">
                            <v-text-field v-model="sensor.owner" label="Name Owner" id="owner"></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-2">
                            <v-text-field v-model="sensor.phoneNo" label="Phone No" id="phoneNo"></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-3">
                            <v-text-field v-model="sensor.ownerEmail" label="Email" id="email"></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-2">
                            <v-select :items="countryName" v-model="sensor.country" label="Country"></v-select>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-2">
                            <v-select :items="metricType" v-model="sensor.metric" label="Metric"></v-select>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-3">
                            <v-text-field v-model="gps_x" label="GPS(X: co-ordinate)" id="email"></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-3">
                            <v-text-field v-model="gps_y" label="GPS(Y: co-ordinate)" id="email"></v-text-field>
                          </v-flex>
                          <!--<v-flex xs12 md6 sm12 class="pr-3">
                            <v-btn color="info" dark @click="addFiles">Add Files</v-btn>
                          </v-flex>
                          <v-flex xs12 md6 sm12 class="pr-3">
                            <div v-for="(file, key) in files" class="text-xs-right pr-5 mr-4" >{{ file.name }} <br> <v-btn class="remove-file" flat color="error" @click="removeFile( key )">Remove</v-btn></div>
                          </v-flex>-->
                          <v-flex xs12 md12 sm12 class="pr-2">
                            <v-text-field v-model="sensor.notes" multiLine label="Notes" id="notes" ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md12 sm12 class="pr-2">
                            <img :src="imageUrl" height="150" v-if="imageUrl"/>
                            <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                            <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                            >
                          </v-flex>
                        </v-layout>
                        <v-card-actions>
                          <v-btn @click="addNewSensor(sensor.nodeName, sensor.nodeId, sensor.nodeType,sensor.owner, sensor.phoneNo, sensor.ownerEmail, sensor.country, sensor.metric, sensor.notes, gps_x, gps_y)" class="info" :disabled="!valid">Submit</v-btn>
                          <v-btn @click="clear" class="error">Cancel</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <div v-if="isEmpty">
              <p class="red--text">Please pick at least one of each category to view data </p>
            </div>
            <v-layout row wrap v-if="isLoading">
              <v-flex xs12 md12 class="text-md-center">
                <app-loading></app-loading>
              </v-flex>
            </v-layout>
            <v-layout row wrap v-if="isResponsed">
              <v-flex xs12 md12 sm10>
                <div>
                  <v-data-table
                  :headers="headers"
                  :items="sensorData"
                  :search="search"
                  v-model="selected"
                  class="elevation-1"
                  >
                  <template slot="items" slot-scope="props">
                    <td>
                      <v-checkbox v-model="selected" :value="props.item.id" primary hide-details></v-checkbox>
                    </td>
                    <td>{{ props.item.photo }}</td>
                      <td class="text-xs-left info--text" style="cursor:pointer;" @click="indiNodeName(props.item.id)">{{ props.item.meta_data.node_name }}</td>
                      <td class="text-xs-left">{{ props.item.meta_data.node_id }}</td>
                      <td class="text-xs-left">{{ props.item.meta_data.owner_name }}</td>
                      <td class="text-xs-left">{{ props.item.meta_data.node_type }}</td>
                      <td class="text-xs-left">X: {{ props.item.meta_data.gps_x }},<br> Y: {{ props.item.meta_data.gps_y }}</td>
                      <td class="text-xs-left">{{ props.item.meta_data.date }}</td>
                      <td class="text-xs-left">{{ props.item.meta_data.country_name }}</td>
                  </template>
                </v-data-table>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
        <v-dialog v-model="Inputdialog" max-width="500px">
          <v-card>
            <v-card-title primary-title>
              <div class="headline">{{inputType_name}}</div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field name="name" :label="inputType" id="id" v-model="inputValue"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="info" flat @click="sendData(inputValue)">Submit</v-btn>
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
import axios from 'axios'



export default{
  props:{
    type:String,
    id:''
  },
  computed: {
    adminUser: function(){
      return localStorage.getItem('user_type') == 'help_admin'
    }
  },
  components: {
    "sidebar": Sidebar
  },
  data(){
    return{
      show: '',
      Inputdialog: '',
      inputType_name: '',
      inputType: '',
      inputValue: '',
      Type: '',
      inputURL: '',
      pagination: {
        sortBy: 'name'
      },
      sensor:{
        nodeId:'',
        nodename:'',
        nodetype:'',
        owner:'',
        ownerEmail:'',
        notes:'',
        country:''
      },
      valid:true,
      Rules: [
        v => !!v || 'Field is required',

      ],
      emailRules: [
        // v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'

      ],
      dialog:false,
      metric:'',
      node:'',
      country:'',
      isLoading:false,
      isResponsed:false,
      isEmpty:false,
      search: '',
      selected: [],
      displayAggregateBtn:false,
      headers: [
        { text: 'Select', value: 'id' },
        {
          text: 'Photo',
          align: 'left',
          sortable: false,
          value: 'photo'
        },
        { text: 'Node Name', value: 'meta_data.node_name' },
        { text: 'Node Id', value: 'meta_data.node_id' },
        { text: 'Owner', value: 'meta_data.owner_name' },
        { text: 'Node Type', value: 'meta_data.node_type' },
        { text: 'GPS Co-ordinates', value: 'meta_data.gps_x' },
        { text: 'Date', value: 'meta_data.date' },
        { text: 'Country', value: 'meta_data.country_name' }
      ],
      sensorData: [],
      filteredData: [],
      countries:[],
      nodes:[],
      metrics:[],
      countryName: [],
      nodeType: [],
      metricType: [],
      sensorBackupData: [],
      gps_x: '',
      gps_y: '',
      title: "Image Upload",
      dialog: false,
      imageName: '',
      imageUrl: '',
      imageFile: '',
      files: []
    }
  },
  methods:{
    addFiles () {
      this.$refs.files.click ()
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
    pickFile () {
      this.$refs.image.click ()
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
    addCNM (event) {
      this.Inputdialog = true
      console.log(event)
      if (event === 'cn') {
        this.inputType_name = 'New Country'
        this.inputType = 'Enter Country Name'
        this.inputURL = this.$hostname + '/sensor/country/'
        this.Type = 'country_name'
      }
      if (event === 'nt') {
        this.inputType_name = 'New Node'
        this.inputType = 'Enter Node Name'
        this.inputURL = this.$hostname + '/sensor/node_type/'
        this.Type = 'node_type'
      }
      if (event === 'mt') {
        this.inputType_name = 'New Metric'
        this.inputType = 'Enter Metric Name'
        this.inputURL = this.$hostname + '/sensor/metric/'
        this.Type = 'metric_type'
      }
    },
    sendData (event) {
      console.log(event)
      console.log(this.inputURL)
      var obj = this
      if (this.Type === 'country_name') {
        axios({
          url: obj.inputURL,
          method: 'post',
          data: {
            "country_name": event
          },
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res){
          console.log(res.data)
          obj.getCountry()
          obj.Inputdialog = false
          obj.inputValue = ''
        })
      }
      if (this.Type === 'node_type') {
        axios({
          url: obj.inputURL,
          method: 'post',
          data: {
            "node_type": event
          },
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res){
          console.log(res.data)
          obj.getNode()
          obj.Inputdialog = false
          obj.inputValue = ''
        })
      }
      if (this.Type === 'metric_type') {
        axios({
          url: obj.inputURL,
          method: 'post',
          data: {
            "metric_type": event
          },
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res){
          console.log(res.data)
          obj.getMetric()
          obj.Inputdialog = false
          obj.inputValue = ''
        })
      }
    },
    addNewSensor(nodeName, nodeId, nodeType, owner, phoneNo, ownerEmail, country, metric, notes, gps_x, gps_y){
      //console.log(nodeName, nodeType, owner, phoneNo, ownerEmail, country, metric, notes)
      if (this.$refs.form.validate()) {
        this.isLoading=true
        this.valid=false
        var cname
        var nname
        var mname
        var i
        var j
        var k
        for (i = 0; i<this.countries.length; i++) {
          if (this.countries[i].country_name === country) {
            cname = this.countries[i].id
          }
        }
        for (j = 0; j<this.nodes.length; j++) {
          if (this.nodes[j].node_type === nodeType) {
            nname = this.nodes[j].id
          }
        }
        for (k = 0; k<this.metrics.length; k++) {
          if (this.metrics[k].metric_type === metric) {
            mname = this.metrics[k].id
          }
        }
        var data = {
          "node_id": nodeId,
          "node_name": nodeName,
          "node_type": nodeType,
          "owner_name": owner,
          "mobile": phoneNo,
          "email": ownerEmail,
          "country_name": country,
          "metric_type": metric,
          "note": notes,
          "date": new Date().toDateString(),
          "gps_x": gps_x,
          "gps_y": gps_y
        }
        var form = new FormData()
        form.append("country", cname)
        form.append("node_type", nname)
        form.append("metric", mname)
        form.append("sensor_image", this.imageFile)
        form.append("meta_data", JSON.stringify(data))
        console.log(this.files.length)
        for(var i =0;i<this.files.length;i++){
          form.append("attachment_"+i, this.files[i])
        }
        var obj = this
        axios({
          url: this.$hostname + '/sensor/sensor/',
          method: 'post',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
          data: form
        })
        .then(response =>{
          console.log(response.data)
          var sensor = response.data
          obj.$router.push({path:'/sensor/'+sensor.id})
          localStorage.setItem('sensor_id', sensor.id)
        })
      }
    },
    clear(){
      this.$refs.form.reset()
      this.dialog = false
    },
    applyBtn(cid, nid, mid){
      console.log(cid, nid, mid)
      this.sensorData = []
      if (nid === '' && mid === '') {
        var obj = this
        var i = 0
        this.sensorBackupData.map(function(data){
          if (data.meta_data.country_name === cid) {
            obj.sensorData.push(data)
          }
          i++
        })
      }
      else if (cid === '' && mid === '') {
        var obj = this
        var i = 0
        this.sensorBackupData.map(function(data){
          if (data.meta_data.node_type === nid) {
            obj.sensorData.push(data)
          }
          i++
        })
      }
      else if (nid === '' && cid === '') {
        var obj = this
        var i = 0
        this.sensorBackupData.map(function(data){
          if (data.meta_data.metric_type === mid) {
            obj.sensorData.push(data)
          }
          i++
        })
      }
      else if (cid === '') {
        var obj = this
        var i = 0
        this.sensorBackupData.map(function(data){
          if (data.meta_data.node_type === nid && data.meta_data.metric_type === mid) {
            obj.sensorData.push(data)
          }
          i++
        })
      }
      else if (nid === '') {
        var obj = this
        var i = 0
        this.sensorBackupData.map(function(data){
          if (data.meta_data.country_name === cid && data.meta_data.metric_type === mid) {
            obj.sensorData.push(data)
          }
          i++
        })
      }
      else if (mid === '') {
        var obj = this
        var i = 0
        this.sensorBackupData.map(function(data){
          if (data.meta_data.country_name === cid && data.meta_data.node_type === nid) {
            obj.sensorData.push(data)
          }
          i++
        })
      } else {
        var obj = this
        var i = 0
        this.sensorBackupData.map(function(data){
          if (data.meta_data.country_name === cid && data.meta_data.node_type === nid && data.meta_data.metric_type === mid) {
            obj.sensorData.push(data)
          }
          i++
        })
      }
    },
    clearFilter () {
      this.country = ''
      this.node = ''
      this.metric = ''
      this.sensorData = this.sensorBackupData
    },
    indiNodeName(id){
      this.$router.push({path:'/sensor/'+id})
      localStorage.setItem('sensor_id', id)
    },
    addSensor(){


    },
    aggregateData(){
      if(this.selected==""){
        alert("Please Select Atlest 1 Sensors")
      }else{
        console.log(this.selected)
        var id=1
        this.$router.push({path:'/sensor/aggregate/'+id})
      }
    },
    getCountry () {
      var obj = this
      axios({
        url: this.$hostname + '/sensor/country/ ',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(function(res){
        //console.log(res.data)
        res.data.map(function(data){
          obj.countries.push(data)
          obj.countryName.push(data.country_name)
        })
        localStorage.setItem('country', JSON.stringify(obj.countries))
      })
    },
    getNode () {
      var obj = this
      axios({
        url: this.$hostname + '/sensor/node_type/ ',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(function(res){
        //console.log(res.data)
        res.data.map(function(data){
          //console.log(data.node_type)
          obj.nodes.push(data)
          obj.nodeType.push(data.node_type)
        })
        localStorage.setItem('node', JSON.stringify(obj.nodes))
      })
    },
    getMetric () {
      var obj = this
      axios({
        url: this.$hostname + '/sensor/metric/ ',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(function(res){
        //console.log(res.data)
        res.data.map(function(data){
          //console.log(data.metric_type)
          obj.metrics.push(data)
          obj.metricType.push(data.metric_type)
        })
        localStorage.setItem('metric', JSON.stringify(obj.metrics))
      })
    },
    getSensorData () {
      var obj = this
      this.isLoading=true
      axios({
        url: this.$hostname + '/sensor/sensor/ ',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(function(res){
        console.log(res.data)
        obj.isLoading=false
        obj.isResponsed=true
        obj.displayAggregateBtn=true
        obj.sensorData = res.data
        obj.sensorBackupData = res.data
      }).catch(function(err){
        console.log(err)
      })
    }
  },
  mounted () {
    this.getSensorData()
    this.getCountry()
    this.getNode()
    this.getMetric()
    if (localStorage.getItem('user_type') === 'help_admin') {
      this.show = true
    } else {
      this.show = false
    }

  },
  mixins:[loggedInMixin]

}

</script>
