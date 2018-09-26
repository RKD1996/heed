<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm4 offset-sm4>

        <h1 class="text-xs-center display-1">Data Portal</h1>
        <v-flex v-if="errorAlert">
          <app-alert @dismissed="onDismissed" :text="errorMessage"
          ></app-alert>
        </v-flex>
        <v-card class="mt-3">
          <v-card-text>
            <h3 class="headline text-xs-center">Sign In</h3>
          </v-card-text>
          <v-card-text>
           
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                                    name="email"
                                    label="Email"
                                    id="email"
                                    v-model="user.email"
                                    type="email"
                                    prepend-icon="email"
                                    :rules="emailRules"
                                    required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
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
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 class="text-xs-right">
                  <v-btn class="error" 
                         @click="loginUser" 
                         :disabled="!valid"
                         >
                         <span v-if="isLoading">Loading...</span>
                         <span v-else>Login</span>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
        <v-layout class="mt-3">
          <v-flex xs6>
            <router-link to="/signup">Request Access</router-link>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <router-link to="/forgotpassword">Forgot Password?</router-link>
          </v-flex>
        </v-layout>
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
        email:"",
        password:"",
      },
      valid: false,
      errorAlert:false,
      isLoading:false,
      errorMessage:"",
      userType:'',
     
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'

      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be 8 characters'
      ]
    }),

    methods: {
      loginUser () {
        if (this.$refs.form.validate()) {
          
          this.isLoading=true
          this.valid=false
         /* localStorage.setItem('email' , "mrutu@fmail.com ")
            localStorage.setItem('api_token' , "sdfghjklkjhgfdfghjklkjhgfdfghjkjhgfdfgh465633")
            localStorage.setItem('user_id' , "256fghj")
            localStorage.setItem('username' , "Mrutyun")
            localStorage.setItem('user_type' , "admin")
          this.$router.push('/home')*/
          // for Trial
          if(this.user.email=="admin@gmail.com"){
            this.userType="Admin"
          }else{
            this.userType="public"
          }

          axios({
            url: this.$hostname+ '/get_auth_token/',
            method: 'post',
            data: {
              email_or_username: this.user.email,
              password: this.user.password
            }
          })
          .then(response =>{
            console.log(response)
            var data = response.data
            localStorage.setItem('email' , data.email)
            localStorage.setItem('api_token' , data.token)
            localStorage.setItem('user_id' , data.user_id)
            localStorage.setItem('username' , data.username)
            localStorage.setItem('user_type' , data.user_type)

            // taking id is a token and storing in localstorage
            //let api_token='5A9zYq5G9KwbbFMzBEaP5c2yid984h6q0VPHc5gA3pcgvt7HBt0FrBvUJdD6'
            //localStorage.setItem('api_token' , api_token)

            this.$router.push('/home')
          })
          .catch(error => {
            console.log(error)
            this.errorAlert=true
            this.isLoading=false
            this.valid=false
            this.user.email=""
            this.user.password=""
            if(error.message=='Network Error'){
             
              this.errorMessage="Network Error . Please Check your Internet Connection"
             
            }else if (error.status==500) {
              this.errorMessage="Internal Error"
            }else{
              this.errorMessage="Incorrect Email or Password !"
            }
          })
         
        }
      },
      onDismissed(){
        this.clear()
        this.errorAlert=false

      },
      clear () {
        this.$refs.form.reset()
      }

    },
    mixins:[signinup]
    
  }
</script>

<style scoped>
</style>
