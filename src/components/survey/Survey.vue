<template>
  <div>
    <sidebar></sidebar>
    <v-content width="100">
      <v-container class="mr-1">
        <wait :progress="progress"></wait>
        <div class="display-1">Surveys</div><br>
        <div class="subheading mb-3">Below are the surveys that have been undertaken. Please feel free to explore the answer set. You can download the raw data and the data keys. If you have the correct privileges, you can also upload a new data-set to be processed and upload any attachments as meta-data.
          If you would like to learn more of the data collection methods, please visit the info section of this website.</div>
          <v-layout row wrap>
            <v-flex xs12 sm10 md12>
              <v-flex xs7 sm8 md9 class="mb-3">
                <div class="text-xs-center">List Of Surveys</div>
              </v-flex>
              <v-card>
                <v-container fluid v-show="show === true">
                  <v-layout row>
                    <v-flex xs12 sm10 md8 class="mb-2">
                      <router-link to="survey/new" tag="span">
                        <v-btn  small color="info">New Survey<v-icon right dark>add</v-icon></v-btn>
                      </router-link>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-data-table :headers="headers" :items="surveys" class="elevation-1" style="border:1px solid lightgrey;">
                  <template  slot="items" slot-scope="props" style="border:1px solid lightgrey">
                    <tr>
                      <td @click="onIndRouting(props.item.id)">{{ props.item.survey }}</td>
                      <td class="text-xs-left">{{ props.item.participants }}</td>
                      <td class="text-xs-left">{{ props.item.country}}</td>
                      <td class="text-xs-left">{{ props.item.questions }}</td>
                      <td class="text-xs-left">{{ props.item.date }}</td>
                      <td v-show="show === true"> <v-btn color="info" fab small @click="editSurvey(props.item.id, props.item.survey, props.item.participants, props.item.country, props.item.questions)"><v-icon>edit</v-icon></v-btn> <v-btn fab small color="error" @click="deleteId = props.item.id, Deletedialog = true"><v-icon>delete</v-icon></v-btn></td>
                    </tr>
                  </template>
                  <template slot="pageText" slot-scope="props">
                    Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
                  </template>
                </v-data-table>
              </v-card>
            </v-flex>
          </v-layout>
          <v-dialog v-model="Editdialog" max-width="500px" transition="dialog-transition">
            <v-card>
              <v-card-title primary-title>
                <div class="headline">
                  Edit Survey Details
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field name="name" label="Survey Name" id="id" v-model="sname"></v-text-field>
                <v-text-field name="name" label="No Of Participants" id="id" v-model="number_people"></v-text-field>
                <v-text-field name="name" label="Country" id="id" v-model="scountry"></v-text-field>
                <v-text-field name="name" label="Number Of Question" id="id" v-model="squestion"></v-text-field>
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
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="submitEdited(sname, number_people, scountry, squestion)">Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="Deletedialog" max-width="500px">
            <v-card>
              <v-card-title primary-title>
                <div class="headline">
                  Delete Survey
                </div>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                Do you want to <b>Delete</b> the Survey File
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="deleteSurvey" flat >Yes</v-btn>
                <v-btn color="success" @click="Deletedialog = false" flat>No</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </v-content>
    </div>
  </template>

  <script>
  import Sidebar from '../sidebar/Sidebar.vue'
  import loggedInMixin from '../../mixins/loggedInMixin'
  import axios from 'axios'
  import wait from '../useful/PleaseWait'

  export default{

    components: {
      "sidebar": Sidebar,
      "wait": wait
    },

    data(){
      return{
        headers: [
          { text: 'Survey', value: 'survey' },
          { text: 'No Of Participants', value: 'participants' },
          { text: 'Country', value: 'country' },
          { text: 'No Of questions', value: 'questions' },
          { text: 'Date', value: 'date' },
          { text: 'Edit', value: 'meta_data.node_type' }
        ],
        surveys: [],
        progress: false,
        Deletedialog: '',
        deleteId: '',
        Editdialog: '',
        sid: '',
        show: '',
        sname: '',
        number_people: '',
        scountry: '',
        squestion: '',
        imageName: '',
        imageUrl: '',
        imageFile: ''
      }
    },
    mixins:[loggedInMixin],
    computed: {
      // headers () {
      //   console.log(this.$store.state.headers_survey)
      //   return this.$store.state.headers_survey
      // }
    },
    methods:{
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
      onIndRouting(event){
        //console.log(event)
        localStorage.setItem('survey_id', event)
        this.$router.push({ path: '/survey/'+event })
      },
      getSurveyList: function() {
        var vm = this
        this.$store.dispatch('getSurveyData')
        .then( function(response) {
          let data = response.data
          console.log(data)
          var i;
          for (i=0; i<data.length; i++){
            var survey = data[i]
            vm.surveys.push({
              survey: survey.survey_name,
              participants: survey.no_of_participants,
              country: survey.country,
              questions: survey.no_of_questions,
              date: survey.start_date  + " - " + survey.end_date,
              id: survey.survey_custom_id,
            })
          }
        })
        .catch( function(error){
          console.log(error)
        })
      },
      deleteSurvey () {
        var obj = this
        axios({
          url: this.$hostname + '/survey/surveys/' + obj.deleteId + '/',
          method: 'delete',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
        }).then(function(res) {
          obj.$router.go(0)
        })
      },
      editSurvey (id, name, people, country, question) {
        this.Editdialog = true
        this.sid = id
        this.sname = name
        this.number_people = people
        this.scountry = country
        this.squestion = question
      },
      submitEdited (name, people, country, question) {
        this.progress = true
        console.log(name)
        console.log(people)
        console.log(country)
        console.log(question)
        var form = new FormData()
        form.append("survey_name", name)
        form.append("survey_custom_id", this.sid)
        form.append("no_of_participants", people)
        form.append("country", country)
        form.append("no_of_questions", question)
        form.append("survey_image", this.imageFile)

        for (var pair of form.entries()) {
          console.log(pair[0]+ ', ' + pair[1]);
        }
        var obj = this
        axios({
          url: this.$hostname + '/survey/surveys/' + obj.sid + '/',
          method: 'put',
          data: form,
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
        }).then(function(res) {
          obj.progress = false
          obj.$router.go(0)
        }).catch(function(err) {
          alert("The Form Was Not filled with Correct Format Or there Is a Network Failure Please Try again Later")
          obj.progress = false
        })
      }
    },
    mounted: function() {
      this.getSurveyList()
      if (localStorage.getItem('user_type') === 'help_admin') {
        this.show = true
      } else {
        this.show = false
      }
    }

  }
  </script>
