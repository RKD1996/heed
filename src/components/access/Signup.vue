<template>
  <v-container fluid>
    <v-layout row >
      <v-flex xs12 sm10 offset-sm1 v-if="signUpAlert">
        <app-alert
          :text="msg"
          @dismissed="onDismissed"

        ></app-alert>

      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
        <div class="subheading">Please fill in the form below to requst access to the data portal</div>
        <v-card class="mt-3">
          <v-flex >
           <v-snackbar
                v-model="snackbar"
                absolute
                top
                center
                color="success"
                >
                <span>API Updated successful!</span>
                <v-icon dark>check_circle</v-icon>
            </v-snackbar>

          </v-flex>

          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-layout wrap>
                <v-flex xs12 sm6>
                  <v-text-field
                                    name="name"
                                    label="Full Name"
                                    id="name"
                                    v-model="user.name"
                                    type="text"
                                    prepend-icon="perm_identity"
                                    :rules="nameRules"
                                    required>
                  </v-text-field>
                  <v-text-field
                                    name="email"
                                    label="Email Address"
                                    id="email"
                                    v-model="user.email"
                                    type="email"
                                    prepend-icon="email"
                                    :rules="emailRules"
                                    required>
                  </v-text-field>
                  <v-text-field
                                    name="password"
                                    label="Password"
                                    id="password"
                                    v-model="user.password"
                                    type="password"

                                    prepend-icon="lock"
                                    :rules="passwordRules"
                                    required>
                  </v-text-field>
                  <v-text-field
                                    name="phone"
                                    label="Phone Number"
                                    id="phone"
                                    v-model="user.phone"
                                    type="text"

                                    prepend-icon="phone"
                                    >
                  </v-text-field>
                  <v-text-field
                                    label="Organisation"
                                    v-model="user.organisation"

                                    prepend-icon="graphic_eq"
                                    refs="txtOrg"
                                    :rules="[v => !!v || 'Organizations is required']"
                                    required
                                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm5 offset-sm1>
                  <v-text-field
                                    label="Description"
                                    placeholder="Why would you like access to the data portal and what do you intend to do with the data?"
                                    name="description"
                                    v-model="user.request"
                                    type="text"
                                    textarea
                                    :rules="descRules"
                                    required>
                    ></v-text-field>
                </v-flex>
              </v-layout>
              <v-flex class="text-xs-right">
                <v-btn class="error"
                       @click="submit"
                       :disabled="!valid"
                       >Submit</v-btn>
                  <v-btn @click="clear">reset</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
        <v-flex class="text-xs-right mt-2">
          <router-link to="/signin">Already a  member? Login</router-link>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>



<script>
import signinup from '../../mixins/SigninSignup'

import axios from 'axios'
export default{
    data: () => ({
      user:{
        name:"",
        email:"",
        password:"",

        phone:"",
        organisation:"",
        request:""
      },
      valid: false,
      msg:'',
      checkUser:false,
      snackbar:false,
      signUpAlert:false,

      nameRules: [
        v => !!v || 'Name is required',
      ],

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'

      ],
      passwordRules: [
        v => !!v || 'Password is required',
        //v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}/.test(v) || 'Password must Contain atleat One Uppercase ,lowercase, one special character, one number'
      ],

      phoneRules: [
        v => !!v || 'Phone Number is required',
        v =>  /^[0]?[789]\d{9}$/.test(v) || 'Phone Number must be valid'

      ],
      descRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 30) || 'Name must be greater than 30 characters'
      ]

    }),

  methods: {
      submit () {
        this.valid=false
        if (this.$refs.form.validate()) {
          axios({
            method: 'post',
            url: this.$hostname + '/new_user_request/',
            data: {
                name:this.user.name,
                email:this.user.email,
                password:this.user.password,

                phone_no:this.user.phone,
                organisation:this.user.organisation,
                request:this.user.request
            }
          })
          .then(response =>{
            console.log(response)
            this.$router.push('/')
          })
          .catch(error => {
            console.log(error)
            this.signUpAlert=true
            this.msg="Internal Error"
            // if(error.message=='Network Error'){
            //   this.msg="Network Error . Please Check your Internet Connection"
            // }else if (error.response.status==500 || error.response.status==400) {
            //   this.msg="Internal Error"
            // }
          })



        }
      },
      clear () {
        this.$refs.form.reset()
      },
      onDismissed(){
        this.signUpAlert=false
       this.clear()
      }
    },
    mixins:[signinup]
  }
</script>



<style scoped>
</style>
