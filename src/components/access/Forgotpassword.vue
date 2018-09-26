<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm5 offset-sm4>
        <v-card class="cardS">
          <v-flex xs12>
                 <v-card color="red darken-4" height="35px">
                    <v-card-text class="headerText" style="text-align:center">
                      <h3>Reset Password</h3>
                    </v-card-text>
                </v-card>
                </v-flex>
          <v-card-text>
            <v-container>
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
                  <v-flex xs12 offset-sm2>
                    <v-btn class="error" 
                      @click="submit" 
                      :disabled="!valid"
                      style="cursor:pointer"
                      >Send Link</v-btn>
                  
                  </v-flex>
                  <v-layout row>
                  <v-flex xs12>
                   <v-card-text>
                    Click Here <router-link to="/SignIn" tag="span" style="cursor:pointer;color:red">Sign In</router-link>
                    </v-card-text>
                  </v-flex>
                </v-layout>
                
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default{
    data: () => ({
      user:{
        email:""
      },
      valid: true,
     
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'

      ]
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>
<style scoped>
.headerText{
  font-size: 15px;
  font-weight: 200;

  color: white;
}
.cardS{
  margin-top:100px;
  max-width: 400px;
  margin-bottom: 175px !important;


}
.headerText{
 line-height: 10px;
}
@media(max-width: 620px){
.cardS{
  margin-top:50px;
  width: 350px;
  margin-left: -30px;

  
}

}
</style>