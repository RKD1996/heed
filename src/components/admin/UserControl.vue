<template>
  <div>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12 class="mb-2">
            <div class="title">User Requests</div>
          </v-flex>
          <v-flex>
            <v-snackbar v-model="snackbar" absolute top right color="success">
              <span>API Updated successful!</span>
              <v-icon dark>check_circle</v-icon>
            </v-snackbar>
          </v-flex>
        </v-layout>
        <div >
          <v-data-table :headers="headers" :items="newUsers" class="elevation-1" style="border:1px solid lightgrey;">
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-left">{{ props.item.email }}<br>{{ props.item.phone_no }}<br>{{ props.item.organisation }}</td>
              <td class="text-xs-left">{{ props.item.request }}</td>
              <td class="text-xs-left">
                <v-select :items="newUserApprovals" v-model="props.value" label="New Requests" autocomplete></v-select>
              </td>
              <td class="text-xs-right">
                <v-btn fab dark small color="primary" @click.native.stop="updateRequestStatus(props.item.id,props.value.text,props.item)"><v-icon dark>save</v-icon></v-btn>
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
        <v-data-table :headers="currentHeaders" :items="currentUsers" class="elevation-1" style="border:1px solid lightgrey;">
          <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}<br>{{ props.item.phone_no }}<br>{{ props.item.organisation }}</td>
            <td class="text-xs-left">{{ props.item.request }}</td>
            <td class="text-xs-left"></td>
            <td class="text-xs-left">{{ props.item.group_name }}</td>
            <td class="text-xs-left">
              <v-select :items="permissions" v-model="props.value" label="New Requests" autocomplete></v-select>
            </td>
            <td class="text-xs-right">
              <v-btn fab dark small color="primary" @click.native.stop="updatePermission(props.item.user,props.value)"><v-icon dark>save</v-icon></v-btn>
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
        <v-data-table :headers="declinedHeaders" :items="declinedUsers" class="elevation-1" style="border:1px solid lightgrey;">
          <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}<br>{{ props.item.phone_no }}<br>{{ props.item.organisation }}</td>
            <td class="text-xs-left">{{ props.item.request }}</td>
            <td class="text-xs-left">
              <v-select :items="declineApprovals" v-model="props.value" label="Declined Requests" autocomplete></v-select>
            </td>
            <td class="text-xs-right">
              <v-btn fab dark small color="primary" @click.native.stop="updateRequestStatus(props.item.id,props.value.text,props.item)"><v-icon dark>save</v-icon></v-btn>
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
import loggedInMixin from '../../mixins/loggedInMixin'
import axios from 'axios'
export default{
  created: function(){
    this.btnClicked=true
    //api call for new Users
    this.$store.dispatch('newUser')
    .then(response =>{
      var data = response.data
      console.log(data)
      this.newUsers = data
    })
    .catch(function (error) {
      console.log(error);
    })
    // Api call for Current User
    this.$store.dispatch('requestUser')
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
    this.$store.dispatch('requestDeclineUser')
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
    headers () {
      return this.$store.state.headers_admin
    },
    currentHeaders () {
      return this.$store.state.currentHeaders
    },
    declinedHeaders () {
      return this.$store.state.declinedHeaders
    }
  },
  data () {
    return {
      btnClicked:false,
      permission:true,
      currentPermission:'',
      snackbar:false,
      currentUsers:[],
      newUsers: [],
      declinedUsers: [],
      permissions:[],
      newUserApprovals: [
        {text: 'Approve'},
        {text: 'Decline'}
      ],
      declineApprovals: [
        {text: 'Approve'},
      ],
      role: []
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
        url = this.$hostname + '/approve_user_request/' + id
      } else if(approve_or_decline === 'Decline'){
        url = this.$hostname + '/decline_user_request/' + id
      }
      console.log(url)
      this.$store.dispatch('requestPermission', {
        href: url
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
      var groupId
      var obj = this
      for(var i = 0; i<obj.role.length; i++) {
        if(permission_status === obj.role[i].name) {
          groupId = obj.role[i].id
          break
        }
      }
      axios({
        method: 'put',
        url: this.$hostname + '/user_group/?user_id='+id+'&group_id='+groupId,
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(response => {
        console.log(response)
      }).catch(error => { console.log(error)
      })
    },
    check () {
      if(localStorage.getItem('user_type') === 'help_admin'){
        console.log(localStorage.getItem('user_type'))
      }
      else{
        this.active = false
        this.$router.push('/')
      }
    },
    grantPermission () {
      var obj = this
      axios({
        method: 'get',
        url: this.$hostname + '/group/',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(response => {
        console.log(response.data)
        obj.role = response.data
        for(var i = 0; i<obj.role.length; i++) {
          obj.permissions.push(obj.role[i].name)
        }
      }).catch(error => { console.log(error)
      })
    }
  },
  mounted () {
    this.check()
    this.grantPermission()
  }
}
</script>
