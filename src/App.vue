<template>
  <v-app class="app">
    <router-view></router-view>
  </v-app>
</template>

<script>
import loggedInMixin from './mixins/loggedInMixin'

export default {
	mounted: function(){
    if(localStorage.getItem("api_token")!== null) {
      return        
    }
    
  },

  data(){
    return{
     
    }
  },
  mixins:[loggedInMixin]
}
</script>

<style scoped>
</style>
