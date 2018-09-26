<template>
  <div>
    <sidebar></sidebar>
    <v-content  width="100">
      <v-container class="mr-1">
        <v-layout>
          <v-flex xs12 class="mb-2">
            <div class="title">User Requests</div>
          </v-flex>
          <v-flex>
            <v-snackbar
                 v-model="snackbar"
                 absolute
                 top
                 right
                 color="success"
                 >
                 <span>API Updated successful!</span>
                 <v-icon dark>check_circle</v-icon>
            </v-snackbar>
          </v-flex>
        </v-layout>
        <div style="max-height:360px; overflow:auto;">
          <v-data-table
             :headers="headers"
             :items="newUsers"
             class="elevation-1"
             style="border:1px solid lightgrey;"
             >
             <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
               <td>{{ props.item.name }}</td>
               <td class="text-xs-left">{{ props.item.email }}</td>
               <td class="text-xs-left">{{ props.item.phone_no }}</td>
               <td class="text-xs-left">{{ props.item.organisation }}</td>
               <td class="text-xs-left">{{ props.item.request }}</td>
               <td class="text-xs-left">
                 <v-select
                   :items="newUserApprovals"
                   v-model="props.value"
                   label="New Requests"
                   autocomplete
                   ></v-select>
               </td>
               <td class="text-xs-right">
                 <v-btn fab dark small
                   color="primary"
                   @click.native.stop="updateRequestStatus(props.item.id,props.value.text,props.item)">
                   <v-icon dark>save</v-icon></v-btn>
               </td>
             </template>
             <template slot="pageText" slot-scope="props">
               Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
             </template>
          </v-data-table>
        </div>
        <v-layout class="mt-5">
          <v-flex xs12 class="mb-2">
            <div class="title">Current Users</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="btnClicked">
          <v-flex xs12 md10 offset-sm4>
            <v-spacer></v-spacer>
            <app-loading></app-loading>
            <v-spacer></v-spacer>
          </v-flex>
        </v-layout>
        <v-data-table
            :headers="currentHeaders"
            :items="currentUsers"
            class="elevation-1"
            style="border:1px solid lightgrey;"
            >
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.phone_no }}</td>
              <td class="text-xs-left">{{ props.item.organisation }}</td>
              <td class="text-xs-left">{{ props.item.request }}</td>
              <td class="text-xs-left">
                <td class="text-xs-left">
                  <v-select
                    :items="permissions"
                    v-model="props.value"
                    label="New Requests"
                    autocomplete
                    ></v-select>
                </td>
                <td class="text-xs-right">
                  <v-btn fab dark small
                    color="primary"
                    @click.native.stop="updatePermission(props.item.id,props.value.text,prop.item)">
                    <v-icon dark>save</v-icon></v-btn>
                </td>
            </template>
            <template slot="pageText" slot-scope="props">
              Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
            </template>
        </v-data-table>
        <v-layout class="mt-5">
          <v-flex xs12 class="mb-2">
            <div class="title">Declined Requests</div>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="btnClicked">
          <v-flex xs12 md10 offset-sm4>
            <v-spacer></v-spacer>
            <app-loading></app-loading>
            <v-spacer></v-spacer>
          </v-flex>
        </v-layout>
        <v-data-table
            :headers="declinedHeaders"
            :items="declinedUsers"
            class="elevation-1"
            style="border:1px solid lightgrey;"
            >
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.email }}</td>
              <td class="text-xs-left">{{ props.item.phone_no }}</td>
              <td class="text-xs-left">{{ props.item.organisation }}</td>
              <td class="text-xs-left">{{ props.item.request }}</td>
              <td class="text-xs-left">
                <td class="text-xs-left">
                 <v-select
                   :items="declineApprovals"
                   v-model="props.value"
                   label="Declined Requests"
                   autocomplete
                   ></v-select>
                </td>
                <td class="text-xs-right">
                  <v-btn fab dark small
                    color="primary"
                    @click.native.stop="updateRequestStatus(props.item.id,props.value.text,props.item)">
                    <v-icon dark>save</v-icon></v-btn>
                </td>
            </template>
            <template slot="pageText" slot-scope="props">
              Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
            </template>
        </v-data-table>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import Sidebar from '../sidebar/Sidebar.vue'
import loggedInMixin from '../../mixins/loggedInMixin'
import axios from 'axios'

export default{
  components: {
    "sidebar": Sidebar
  },
  created: function(){
    this.btnClicked=true
    //api call for new Users
    axios({
      url: this.$hostname+ '/new_user_request/',
      method: 'get',
      params: {
        user_request_status: "New Request"
      }
    })
      .then(response =>{
        var data = response.data
        console.log(data)
        this.newUsers = data
      })
      .catch(function (error) {
        console.log(error);
      })
    // Api call for Current User
    axios({
      url: this.$hostname + '/new_user_request/',
      method: 'get',
      params: {
        user_request_status: "Request Approved"
      }
    })
      .then(response =>{
        console.log(response.data)
        this.btnClicked=false
        this.currentUsers=response.data
        // console.log(this.current)
      })
      .catch(function (error) {
        console.log(error);
      })
    // API call for Declined Requests
    axios({
      url: this.$hostname+ '/new_user_request/',
      method: 'get',
      params: {
        user_request_status: "Request Declined"
      }
    })
      .then(response =>{
        var data = response.data
        console.log(data)
        this.declinedUsers = data
      })
      .catch(function (error) {
        console.log(error);
      })
  },
  computed: {
  },
  data () {
      return {
        btnClicked:false,
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Organisation', value: 'organisation' },
          { text: 'Requests', value: 'requests' },
          { text: 'Permission', value: 'permission' },
        ],
        currentHeaders: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Organisation', value: 'organisation' },
          { text: 'Requests', value: 'requests' },
          { text: 'Last Seen', value: 'last_seen' },
          { text: 'Permission', value: 'permission' },
        ],
        declinedHeaders: [
          { text: 'Name', value: 'name' },
          { text: 'Email', value: 'email' },
          { text: 'Phone', value: 'phone' },
          { text: 'Organisation', value: 'organisation' },
          { text: 'Requests', value: 'requests' },
          { text: 'Last Seen', value: 'last_seen' },
          { text: 'Permission', value: 'permission' },
        ],
        permission:true,
        currentPermission:'',
        snackbar:false,
        currentUsers:[],
        newUsers: [],
        declinedUsers: [],
        permissions:[
          'Help Admin','Project Team','Public'
        ],
        newUserApprovals: [
            {text: 'Approve'},
            {text: 'Decline'}
        ],
        declineApprovals: [
            {text: 'Approve'},
        ],
      }
  },
  mixins: [loggedInMixin],
  methods:{
    updateRequestStatus(id, approve_or_decline, new_user){
      console.log(id)
      console.log(approve_or_decline)
      console.log(new_user)
      var url = ''
      var api_token = localStorage.getItem('api_token')
      if (approve_or_decline === 'Approve'){
        url = '/approve_user_request/' + id
      } else if(approve_or_decline === 'Decline'){
        url = '/decline_user_request/' + id
      }
      console.log(url)
      axios({
        url: this.$hostname + url,
        method: 'get',
        headers: {'Authorization': 'Token ' + api_token},
      })
        .then(response =>{
          this.snackbar=true
          console.log(response.data)
          var removeIndex = this.newUsers.map(function(item) { return item.id; }).indexOf(this.id);
          this.newUsers.splice(removeIndex, 1);
          this.declinedUsers.splice(removeIndex, 1);
          if(approve_or_decline === 'Approve'){
            this.currentUsers.push(new_user);
          } else if(approve_or_decline === 'Decline'){
            this.declinedUsers.push(new_user);
          }
        })
    },
    updatePermission(id, permission_status){
      console.log(id)
      console.log(permission_status)
    },
    check () {
      if(localStorage.getItem('user_type') === 'help_admin'){
        console.log(localStorage.getItem('user_type'))
      }
      else{
        this.active = false
        this.$router.push('/')
      }
    }
  },
  mounted () {
    this.check()
  }
}
</script>
