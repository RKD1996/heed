<template>
  <div>
    <v-content width="100">
      <v-container class="mr-1">
        <v-layout row wrap >
          <v-flex xs12 md3 sm6 class="pr-2 ">
            <v-card class="pl-3 pt-1 pr-3 " style="border: 1px solid lightgrey;">
              <v-layout row wrap>
                <v-flex xs6 >
                  Status
                </v-flex>
              </v-layout>
              <v-select :items="sensorStatusList" v-model="sensorStatus" label="Sensor Status " single-line></v-select>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout class="mt-4 mb-3">
          <v-flex xs12 md6 sm6>
            <v-btn color="info" small  @click="applyBtn(sensorStatus)">Apply</v-btn>
            <v-btn color="info" small @click="clearFilter">Clear</v-btn>
          </v-flex>
        </v-layout>
        <br>
        <v-layout>
          <v-flex xs12 class="mb-2">
            <div class="title">All Sensor</div>
          </v-flex>
        </v-layout>
        <div style="max-height:360px; overflow:auto;">
          <v-data-table :headers="sensorHeaders" :items="sensorLists" class="elevation-1" style="border:1px solid lightgrey;">
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
                <td class="text-xs-left">{{ props.item.meta_data.node_name }}</td>
                <td class="text-xs-left">{{ props.item.meta_data.node_id }}</td>
                <td class="text-xs-left">{{ props.item.meta_data.node_type }}</td>
                <td class="text-xs-left">{{ props.item.meta_data.country_name }}</td>
                <td class="text-xs-left">{{ props.item.sensor_status }}</td>
                <td class="text-xs-left">
                 <v-select :items="sensorApprovals" v-model="props.value" label="Sensor Requests" autocomplete></v-select>
                </td>
                <td class="text-xs-right">
                 <v-btn fab dark small color="primary" @click.native.stop="updateRequestStatus(props.item.id,props.value)"><v-icon dark>save</v-icon></v-btn>
                </td>
            </template>
            <template slot="pageText" slot-scope="props">
              Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
            </template>
          </v-data-table>
        </div>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import loggedInMixin from '../../mixins/loggedInMixin'
import axios from 'axios'
export default{
  created: function(){
    this.btnClicked=true
    //api call for new Users
    this.$store.dispatch('sensorLists')
    .then(response =>{
     var data = response.data
     console.log(data)
     this.sensorLists = data
    })
    .catch(function (error) {
     console.log(error);
    })
  },
  computed: {
    sensorHeaders () {
     return this.$store.state.sensorHeaders
    },
  },
  data () {
    return {
      sensorStatus: '',
      sensorLists: [],
      sensorLists1: [],
      sensorApprovals: [
       {text: 'activate'},
       {text: 'archive'}
      ],
      sensorStatusList: [
       {text: 'Archived'},
       {text: 'Running'}
      ],
    }
  },
  mixins: [loggedInMixin],
  methods:{
    updateRequestStatus (id,status) {
      var obj = this
      axios({
        url: this.$hostname + '/sensor/sensor/' + id + '/'+status.text+'/',
        method: 'put',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(function(res) {
        obj.$router.go(0)
      })
    },
    applyBtn(status) {
      var obj = this
      obj.sensorLists1 = []
      obj.clearFilter().then( function (response){
        var data = response.data
         console.log(data)
         obj.sensorLists = data
        for(var i = 0; i < obj.sensorLists.length; i++){
          console.log(obj.sensorLists[i].sensor_status)
          console.log(status.text)
          if(obj.sensorLists[i].sensor_status === status.text) {
            obj.sensorLists1.push(obj.sensorLists[i])
          }
        }
        obj.sensorLists = obj.sensorLists1
      })
    },
    clearFilter () {
      return this.$store.dispatch('sensorLists')
    }
  },
}
</script>
