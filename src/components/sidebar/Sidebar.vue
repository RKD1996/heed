<template>
  <div>
    <v-icon id="menuBtn" class="mt-3 ml-3" @click="openMenu" v-model="drawer">menu</v-icon>
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
      <v-btn class="display ml-5 mt-3" @click="logout">Logout</v-btn>
      <v-list dense class="pt-2">
        <template class="ml-2" v-for="item in items" v-if="public">
          <v-layout row v-if="item.heading" align-center :key="item.heading"></v-layout>
          <v-list-tile v-else @click="" :key="item.text" router :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <template v-for="item in admins" v-if="admin">
          <v-layout row v-if="item.heading" align-center :key="item.heading"></v-layout>
          <v-list-tile v-if="item.class" @click="" :key="item.text" router :to="item.link" >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title >{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
      <div class="ml-5 mt-2 pl-4">
        <img src="../../assets/helplogo.png" height="140">
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  mounted: function(){
    let userType=localStorage.getItem('user_type')


    if (userType=='help_admin') {
      this.admin=true
      this.public=false

      //alert('Admin' +this.items.)
    }else{
      this.public=true
      this.admin=false
      //alert('Public '+this.public)
    }

  },
  data: () => ({

    items: [
      { icon: 'home', text: 'Home', link:'/home/'},
      { icon: 'assessment', text: 'Sensors', link:'/sensor'},
      { icon: 'announcement', text: 'Surveys', link:'/survey'},
      { icon: 'insert_photo', text: 'Photos', link:'/photo'},
      { icon: 'description', text: 'Forums', link:'/forum' },
      { icon: 'chat', text: 'Projects', link:'/blog' },
      { icon: 'info', text: 'Info', link:'/info'},
      { icon: 'contacts', text: 'Contact', link:'/contact'},

    ],
    admins: [
      { icon: 'home', text: 'Home', link:'/home/',class:"public"},
      { icon: 'assessment', text: 'Sensors', link:'/sensor' ,class:"public"},
      { icon: 'announcement', text: 'Surveys', link:'/survey',class:"public"},
      { icon: 'insert_photo', text: 'Photos', link:'/photo',class:'public'},
      { icon: 'description', text: 'Forums', link:'/forum' ,class:"public"},
      { icon: 'chat', text: 'Projects', link:'/blog' ,class:"public"},
      { icon: 'info', text: 'Info', link:'/info',class:"public"},
      { icon: 'contacts', text: 'Contact', link:'/contact',class:"public" },
      { icon: 'account_circle', text: 'Admin', link:'/admin' , class:"admin" }
    ],
    admin:false,
    public:false,
    drawer:true
  }),
  methods:{
    openMenu () {
      console.log('click')
      this.drawer = true
    },
    logout(){
      var api_token = localStorage.getItem('api_token')
      axios({
        url: this.$hostname+ '/logout/',
        method: 'get',
        headers: {'Authorization': 'Token ' + api_token},
      })
      .then(response => {
        localStorage.removeItem('email')
        localStorage.removeItem('api_token')
        localStorage.removeItem('user_id')
        localStorage.removeItem('username')
        localStorage.removeItem('user_type')
        localStorage.clear()
        this.$router.push('/')
      })
      .catch(error => {

      })
    }
  }
}
</script>
<style>
#menuBtn{
  border: 2px solid #9b9da0;
  border-radius: 5px;
}
</style>
