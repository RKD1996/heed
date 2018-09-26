<template>
  <div>
    <sidebar></sidebar>
    <v-content>
    <v-container>

        <v-layout>
          <v-flex xs12>
            <div class="display-1">Contact</div><br>
            <div class="subheading">It is strongly advised that you use the forum section of the data portal to pose any questions for the project team and the wider community. However, if you are not getting a response, please fill out the form below and one of the project team will get back to you.</div>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="ma-5 mt-4 text-xs-center">
          <v-flex xs12>
            <v-card>
              <v-card-title>
                <div class="headline">
                  Contact Us
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="form">
                <v-layout row wrap>
                  <v-flex xs5 class="ma-2">
                    <v-text-field label="Name" id="id" v-model="name" :rules="Rules"></v-text-field>
                  </v-flex>
                  <v-flex xs6 class="ma-2">
                    <v-text-field label="Email" id="id" v-model="email" :rules="emailRules"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs11 class="ma-2">
                    <v-text-field label="Message" textarea v-model="message" :rules="Rules"></v-text-field>
                  </v-flex>
                </v-layout>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-layout row wrap>
                  <v-flex xs6 class="text-xs-right">
                    <v-btn color="info" @click="submit">Submit</v-btn>
                  </v-flex>
                  <v-flex xs6 class="text-xs-left">
                    <v-btn color="info" @click="clear">Clear</v-btn>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
  </v-content>
  </div>
</template>


<script>
import Sidebar from '../sidebar/Sidebar.vue'
import loggedInMixin from '../../mixins/loggedInMixin'

export default{
  components: {
    "sidebar": Sidebar
  },
  data(){
    return{
      name: '',
      email: '',
      message: '',
      Rules: [
          v => !!v || 'This Field is required',
        ],
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
    }
  },
  methods: {
    submit (){
      console.log(this.name)
      console.log(this.email)
      console.log(this.message)
    },
    clear () {
      this.$refs.form.reset()
    }
  },
  mixins:[loggedInMixin]
}
</script>
