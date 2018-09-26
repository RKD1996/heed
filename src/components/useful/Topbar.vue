<template>
  <div>
    <sidebar></sidebar>
    <v-toolbar fixed>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click = "control('user')">Users</v-btn>
        <v-btn flat @click = "control('sensor')">Sensors</v-btn>
        <v-btn flat @click = "control('project')">Projects</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <user v-show="show1"></user>
    <sensor v-show="show2"></sensor>
    <project v-show="show3"></project>
  </div>
</template>

<script>
import User from '../admin/UserControl.vue'
import Sensor from '../admin/SensorControl.vue'
import Project from '../admin/ProjectControl.vue'
import Sidebar from '../sidebar/Sidebar.vue'

export default {
  data () {
    return {
      show1: true,
      show2: false,
      show3: false
    }
  },
  components: {
    "sidebar": Sidebar,
    "user": User,
    "sensor": Sensor,
    "project": Project
  },
  methods: {
    control (control) {
      if(control === 'user'){
        this.show1 = true
        this.show2 = false
        this.show3 = false
      } else if(control === 'sensor'){
        this.show1 = false
        this.show2 = true
        this.show3 = false
      } else {
        this.show1 = false
        this.show2 = false
        this.show3 = true
      }
    }
  }
}
</script>

<style>

</style>
