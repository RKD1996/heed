<template>
  <div>
    <sidebar></sidebar>
    <v-content width="100">
      <v-container class="mr-1">
        <v-layout row wrap>
          <v-flex xs12 sm10 md12>
            <v-flex>
              <app-snackbar v-show="snackbar"></app-snackbar>
            </v-flex>
            <v-layout row grid-list-md>
              <v-flex xs6 sm5 md3>
                <router-link to="/survey" tag="span">
                  <v-btn >
                    <v-icon>arrow_left</v-icon>Back
                  </v-btn>
                </router-link>
              </v-flex>
              <v-flex xs6 sm5 md5 offset-xs0 offset-lg2>
                <div class=" headline text-xs-left">Add Survey</div>
              </v-flex>
            </v-layout>
            <v-card>
              <v-container fluid>
                <v-layout row>
                  <v-flex xs12 sm10 md8 class="mb-2">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field v-model="survey.survey_custom_id" :rules="idRules" label="Survey ID" required></v-text-field>
                      <v-text-field v-model="survey.survey_name" :rules="nameRules" label="Survey" required></v-text-field>
                      <v-text-field v-model="survey.no_of_participants" :rules="participantsRules" label="No of Participants" required></v-text-field>
                      <v-text-field v-model="survey.country" :rules="participantsRules" label="Country" required></v-text-field>
                      <!--v-select  v-model="survey.country" :items="countries" :rules="[v => !!v || 'Country is required']" label="Country" required></v-select-->
                      <v-text-field v-model="survey.no_of_questions" :rules="questionsRules" label="No Of Questions" required></v-text-field>
                      <v-flex xs12 md12 sm12 class="pr-2">
                        <img :src="imageUrl" height="150" v-if="imageUrl"/>
                        <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                        <input
                        type="file"
                        style="display: none"
                        ref="image"
                        accept="image/*"
                        @change="onFilePicked"
                        >
                      </v-flex>
                      <v-layout row wrap>
                        <v-flex xs12 sm6 md4>
                          <v-menu
                          ref="menu"
                          :close-on-content-click="false"
                          v-model="menu"
                          :nudge-right="40"
                          :return-value.sync="Fromdate"
                          lazy
                          transition="scale-transition"
                          offset-y
                          full-width
                          min-width="290px"
                          >
                          <v-text-field slot="activator" v-model="survey.start_date" label="From" prepend-icon="event" readonly></v-text-field>
                          <v-date-picker v-model="survey.start_date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.menu.save(survey.start_date)">OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-spacer></v-spacer>
                      <v-flex xs12 sm6 md4>
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="Todate" persistent lazy full-width width="290px">
                          <v-text-field slot="activator" v-model="survey.end_date" label="To" prepend-icon="event" readonly></v-text-field>
                          <v-date-picker v-model="survey.end_date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(survey.end_date)">OK</v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-flex>
                    </v-layout>
                    <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
                    <v-btn @click="clear">Reset</v-btn>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-container>
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
import axios from 'axios'

export default{
  components: {
    "sidebar": Sidebar
  },
  data: () => ({
    survey: {
      survey_custom_id: '',
      survey_name: '',
      no_of_participants: '',
      no_of_questions: '',
      country: '',
      start_date: '',
      end_date: ''
    },
    Fromdate:null,
    Todate:null,
    menu: false,
    modal: false,
    menu2: false,
    valid: true,
    snackbar: false,

    idRules: [
      v => !!v || 'Survey ID is required',
    ],
    nameRules: [
      v => !!v || 'Name is required',
    ],
    email: '',
    participantsRules: [
      v => !!v || 'No Of Participants are required',

    ],
    questionsRules: [
      v => !!v || 'No Of Questions are required',

    ],


    country: null,
    countries: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],
    imageName: '',
    imageUrl: ''
  }),

  methods: {
    pickFile () {
      this.$refs.image.click ()
    },
    onFilePicked (e) {
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        if(this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported

        var survey = this.survey
        /*var form = [{
          "survey_custom_id": survey.survey_custom_id,
          "survey_name": survey.survey_name,
          "no_of_participants": survey.no_of_participants,
          "no_of_questions": survey.no_of_questions,
          "country": survey.country,
          "start_date": survey.start_date,
          "end_date": survey.end_date,
          "imageFile": this.imageFile
        }]
        console.log(form)
        this.$store.dispatch('postNewSurvey', {
          data: form
        })
        .then(response =>{
          this.snackbar=true
          console.log(response.data)
          this.clear()
          this.$router.push({ path: '/survey' })
        })
        .catch(error => {
          console.log(error)
        })*/
        var form = new FormData()
        form.append("survey_custom_id", survey.survey_custom_id)
        form.append("survey_name", survey.survey_name)
        form.append("no_of_participants", survey.no_of_participants)
        form.append("no_of_questions", survey.no_of_questions)
        form.append("country", survey.country)
        form.append("start_date", survey.start_date)
        form.append("end_date", survey.end_date)
        if(this.imageFile)
          form.append("survey_image", this.imageFile)
        var obj = this
        axios({
          url: obj.$hostname + '/survey/surveys/',
          method: 'post',
          data: form,
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res) {
          obj.snackbar=true
          console.log(res.data)
          obj.clear()
          obj.$router.push({ path: '/survey' })
        }).catch(function(err) {
          console.log(err)
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }


  ,
  mixins:[loggedInMixin]
}
</script>
