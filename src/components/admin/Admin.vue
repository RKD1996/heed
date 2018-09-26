<template>
  <div>
    <sidebar></sidebar>
    <topbar></topbar><br>

  </div>
</template>
<script>
import Sidebar from '../sidebar/Sidebar.vue'
import Topbar from '../useful/Topbar.vue'
import loggedInMixin from '../../mixins/loggedInMixin'
export default{
  components: {
    "sidebar": Sidebar,
    "topbar": Topbar
  },
  mixins: [loggedInMixin],
  methods:{
    check () {
      if(localStorage.getItem('user_type') === 'help_admin'){
        console.log(localStorage.getItem('user_type'))
      }
      else{
        this.active = false
        this.$router.push('/')
      }
    },
  },
  mounted () {
    this.check()
  }
}
</script>
