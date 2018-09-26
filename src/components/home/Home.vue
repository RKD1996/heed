<template>
  <div>
    <sidebar></sidebar>
    <v-container>
      <v-content class="text-xs-center">
        <h1 class="display-1 mt-3">Data Portal</h1>
        <v-flex xs10 offset-xs1 class="mt-1">
          <div class="subheading">The Data Portal is a repository for the HEED Project’s survey, monitoring and photographic data. It serves as a one-stop-shop for all project information for researchers, inside and outside of the project consortium, during and beyond the project lifetime.</div><br>
        </v-flex>
        <v-flex xs10 offset-xs1 class="">
          <div class="subheading">Within the portal all surveys that have been undertaken, as well as live sensor data from our project interventions, can be viewed and used via a searchable user-interface. We encourage students, researchers and other interested parties to engage with the project’s extensive datasets to develop insights and create their own projects. Via the Portal’s forums, those engaged with the data can share findings and discuss issues.</div><br>
        </v-flex>
        <v-flex xs10 offset-xs1 class="">
          <div class="subheading">If you use any data from this portal, please use the appropriate referencing. If you are unsure of how to do that, feel free to ask a question in the forum or get in contact via the contact form.</div>
        </v-flex>
        <br>
        <v-layout class="mt-5">
          <v-flex xs12 sm3 offset-sm1>
            <v-card class="pt-4 pb-4">
              <v-card-title>
                <div class="mx-auto">
                  <div class="display-2">{{ Sensors }}</div>
                  <div class="subheading black--text">Sensors Installed</div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm3 offset-sm1>
            <v-card class="pt-4 pb-4">
              <v-card-title>
                <div class="mx-auto">
                  <div class="display-2">{{ Surveys }}</div>
                  <div class="subheading black--text">Surveys Conducted</div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 sm3 offset-sm1>
            <v-card class="pt-4 pb-4">
              <v-card-title>
                <div class="mx-auto">
                  <div class="display-2">{{ Photos }}</div>
                  <div class="subheading black--text">Photos Uploaded</div>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-content>
    </v-container>
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

  data(){
    return{
      Sensors: '',
      Surveys: '',
      Photos: ''
    }
  },
  methods: {
    getData () {
      var obj = this
      axios({
        url: this.$hostname + '/welcome',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.Sensors = res.data.sensors
        obj.Surveys = res.data.surveys
        obj.Photos = res.data.photos
      })
    }
  },
  mounted () {
    this.getData()
  },
  mixins: [loggedInMixin]
}
</script>
