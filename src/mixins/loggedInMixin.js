export default {
  mounted: function(){
    if(localStorage.getItem("api_token") === null) {
      this.$router.replace('/')        
    }


  }
}