<template>
  <div>
    <sidebar></sidebar>
    <v-content width="100">
      <v-container class="mr-1">
        <v-layout row wrap>
          <v-flex xs12 sm10 md12>
            <v-flex>
              <v-snackbar v-model="snackbar" absolute top center color="success">
                <span>API Updated successful!</span>
                <v-icon dark>check_circle</v-icon>
              </v-snackbar>
            </v-flex>
            <v-layout row wrap>
              <v-flex xs2 class="mb-3">
                <v-btn color="default" @click="$router.go(-1)"><v-icon>arrow_left</v-icon>Back</v-btn>
            </v-flex>
            <v-flex class="text-xs-left mt-2">
                <div class="headline">{{title}}</div>
            </v-flex>

            </v-layout>
            <v-card>
              <please-wait :progress="progress"></please-wait>
              <v-container fluid>
                <v-layout row>
                  <v-flex xs12 sm10 md12
                  v-for ="data in survey" :key="data.surveyId">
                  <v-card class="pl-2 pt-1 pb-4" >

                    <v-layout row wrap class="text-xs-center" v-if="isActive">
                      <!--<v-flex xs12 sm10 md8 offset-xs10>
                        <v-btn fab dark small color="primary" @click.native.stop="formActivate" v-show="adminUser"><v-icon dark>edit</v-icon></v-btn>
                      </v-flex>-->
                      <v-flex xs12 class="text-xs-right" v-show="view === true">
                        <v-btn color="info" flat outline @click="formActivate"><v-icon>edit</v-icon>Edit</v-btn>
                        <v-btn color="error" flat outline @click="Deletedialog = true">Delete</v-btn>
                      </v-flex>
                        <v-flex xs6 class="text-xs-left mb-3">
                          <img :src="photo" height="250px" width="400px">
                        </v-flex>

                      <v-flex row wrap>
                        <v-flex  xs6 sm5 md4>
                          <div class="text-xs-left mb-3"><b>Survey Id: </b>{{data.surveyId}}</div>
                        </v-flex>
                        <v-flex  xs6 sm5 md4>
                          <div class="text-xs-left mb-3"><b>Survey Name: </b>{{data.surveyName}} </div>
                        </v-flex>
                        <v-flex  xs6 sm5 md4>
                          <div class="text-xs-left mb-3"><b>Participants: </b> {{data.participants}}</div>
                        </v-flex>
                        <v-flex  xs6 sm5 md4>
                          <div class="text-xs-left mb-3"><b>Country: </b>{{data.country}} </div>
                        </v-flex>
                        <v-flex  xs6 sm5 md4>
                          <div class="text-xs-left mb-3"><b>Target Population: </b>{{data.targetPopulation}}</div>
                        </v-flex>
                        <v-flex  xs6 sm5 md4>
                          <div class="text-xs-left mb-3"><b>Date: </b>{{data.date}} </div>
                        </v-flex>
                        <v-flex  xs6 sm5 md4>
                          <div class="text-xs-left mb-3"><b>Notes: </b>{{data.notes}} </div>
                        </v-flex>
                      </v-flex>
                      <br>
                      <v-flex xs12>
                        <div class="text-xs-left mb-3"><b>Attachments: </b>
                          <div v-for="(value, key) in data.attachments">
                            <a :href="value">{{key}}</a>
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap v-else="isActive" v-show="adminUser">
                      <v-flex xs6 md4 class="mr-4">
                        <v-text-field v-model="data.surveyId" :rules="Rules" label="Survey Id" required></v-text-field>
                      </v-flex>
                      <v-flex xs6 md4 class="mr-4">
                        <v-text-field v-model="data.surveyName" :rules="Rules" label="Survey Name" required></v-text-field>
                      </v-flex>
                      <v-flex xs6 md4 class="mr-4">
                        <v-text-field v-model="data.participants" :rules="Rules" label="Participants" required></v-text-field>
                      </v-flex>
                      <v-flex xs6 md4 class="mr-4">
                        <v-text-field v-model="data.country" :rules="Rules" label="Country" required></v-text-field>
                      </v-flex>
                      <v-flex xs6 md4 class="mr-4">
                        <v-text-field v-model="data.targetPopulation" :rules="Rules" label="Target Population" required></v-text-field>
                      </v-flex>
                      <v-flex xs6 md4 class="mr-4">
                        <v-text-field v-model="data.date" :rules="Rules" label="Date" required></v-text-field>
                      </v-flex>
                      <v-flex xs6 md10 class="mr-4">
                        <v-text-field v-model="data.notes" :rules="Rules" label="Description" required></v-text-field>
                      </v-flex>
                      <!--<v-flex xs12 class="mr-4">
                        <input type="file" ref="attachment" @change="uploadAttachment(data)" />
                      </v-flex>-->
                      <v-flex xs12 md6 sm12 class="pr-3">
                        <input type="file" id="upFiles" ref="upFiles" v-show="show" v-on:change="handleFilesUpload()"/>
                        <v-btn color="info" dark @click="addFiles">Add Files</v-btn>
                      </v-flex>
                      <v-flex xs12 md6 sm12 class="pr-3">
                        <div v-for="(file, key) in files" class="text-xs-right pr-5 mr-4" >{{ file.name }} <br> <v-btn class="remove-file" flat color="error" @click="removeFile( key )">Remove</v-btn></div>
                        <div v-for="(file, key) in attach" class="text-xs-right pr-5 mr-4" >{{ file.filename }} <br> <v-btn class="remove-file" flat color="error" @click="deleteAttachment( file.id )">Remove</v-btn></div>
                      </v-flex>
                      <v-flex xs6 md10>
                        <v-btn :disabled="!valid" @click="submit">Submit</v-btn>
                        <v-btn @click="clear">Cancel</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card>
                  <v-layout row wrap class="mt-3 mb-3">
                    <v-flex xs4 sm3 md4>
                      <v-btn color="info" @click.native="viewAnswer(id)">View Answer</v-btn>
                    </v-flex>
                    <v-flex xs4 sm3 md4>
                      <v-btn color="info" @click.native="download(id)">Download.csv</v-btn>
                    </v-flex>
                    <v-flex xs4 sm3 md4 v-show="adminUser">
                      <!--<v-btn color="info" @click.native="upload(id)">Upload.csv</v-btn>-->
                      <label class="file-select">
                        <div class="select-button mt-1">
                          <span>UPLOAD .CSV</span>
                        </div>
                        <input type="file" ref="file" accept=".csv,.xlsx,.xls" id="csv_file" name="csv_file" @change="handleFileChange()"/>
                      </label>
                    </v-flex>
                  </v-layout>
                  <!--<v-card style="height:300px;border:1px solid lightgrey">
                    <v-card-title primary-title>Question Tree</v-card-title>
                     <tree></tree>
                  </v-card>-->
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
import tree from './QuestionTree.vue'
import BackBtn from '../shared/BackRoutingBtn.vue'
import PleaseWait from '../useful/PleaseWait.vue'

import axios from 'axios'
export default{
  props:{
    type:String,
    id:''
  },
  computed: {
    adminUser: function(){
      return localStorage.getItem('user_type') == 'help_admin'
    }
  },
  components: {
    "sidebar": Sidebar,
    "tree":tree,
    "app-BackBtn":BackBtn,
    "please-wait": PleaseWait

  },
  mounted:function(){
    if (localStorage.getItem('user_type') === "help_admin") {
      this.view = true
      this.show = true
    }
    this.$store.dispatch('getSingleSurveyData', {
      id: this.id
    })
    .then(response =>{
      console.log(response.data)
      if (response.data.survey_image === null) {
        console.log('empty sensor_image')
      } else {
        this.photo = response.data.survey_image
      }
      var survey = response.data
      this.title = survey.survey_name.split(" ")[0]
      this.survey.push({
        surveyName: survey.survey_name,
        participants: survey.no_of_participants,
        country: survey.country,
        questions: survey.no_of_questions,
        date: survey.start_date  + " - " + survey.end_date,
        surveyId: survey.survey_custom_id,
        targetPopulation: survey.target_population,
        notes: survey.notes,
        file: survey.survey_file,
        attachments: survey.attachments
      })
      console.log(this.survey)
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  data: () => ({
    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
    snackbar:false,
    progress: false,
    title: '',
    isActive:true,
    view: '',
    //Hardcode Data
    survey:[
    ],
    valid: true,
    surveyFile:'',
    show: false,
    name: '',
    Rules: [
      v => !!v || 'Field is required',

    ],
    attach: [],
    upFiles: [],
    uploadFile: []
  })
  ,
  mixins:[loggedInMixin],
  methods:{
    handleFilesUpload(){
      let uploadedFiles = this.$refs.upFiles.upFiles;
      for( var i = 0; i < uploadedFiles.length; i++ ){
        this.upFiles.push( uploadedFiles[i] );
      }
    },
    removeFile( key ) {
      this.upFiles.splice( key, 1 );
    },
    deleteSurvey () {
      console.log(localStorage.getItem('sensor_id'))
      var obj = this
      axios({
        url: this.$hostname + '/sensor/sensor/' + localStorage.getItem('sensor_id') + '/',
        method: 'delete',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(function(res) {
        obj.$router.go(-1)
      })
    },
    addFiles(){
      this.$refs.files.click();
    },
    submit () {
      this.progress = true
      var survey = this.survey[0]
      var form = [{
        "survey_custom_id": survey.surveyId,
        "survey_name": survey.surveyName,
        "no_of_participants": survey.participants,
        "country": survey.country,
        "notes": survey.notes,
        "no_of_questions": survey.questions,
        "target_population": survey.targetPopulation,
        "start_date": survey.date.split(" - ")[0],
        "end_date": survey.date.split(" - ")[1],
        "attachment": survey.attachment
      }]
      this.$store.dispatch('postSingleSurveyData', {
        data: form,
        id: this.id
      })
      .then(response => {
        var survey = response.data
        this.isActive=true
        this.progress = false
        this.snackbar = true
        this.survey.pop()
        this.survey.push({
          surveyName: survey.survey_name,
          participants: survey.no_of_participants,
          country: survey.country,
          questions: survey.no_of_questions,
          date: survey.start_date  + " - " + survey.end_date,
          surveyId: survey.survey_custom_id,
          targetPopulation: survey.target_population,
          notes: survey.notes,
          file: survey.survey_file,
          attachments: survey.attachments
        })
      })
      .catch(response => {

      })
    },
    clear () {

      this.isActive=true
    },
    viewAnswer(id){
      // alert('View Answer API Called with Survey Id= ' + id)
      this.$router.push({ path: '/survey/'+id+'/viewanswer' })
    },
    download(id){
      console.log(this.survey[0].attachments)
      if (this.survey[0].file != null){
        window.open(this.survey[0].file)
      } else {
        alert('No survey files uplaoded yet!')
      }
    },
    upload(id){
      // alert('Upload API Called !with Survey Id= ' + id)
      //this.$router.push({ path: '/survey/'+id+'/upload' })
    },
    formActivate(){
      this.isActive=false
    },
    handleFileChange(){
      // Validating csv File
      var fileInput = document.getElementById('csv_file');
      var filePath = fileInput.value;
      var allowedExtensions = /(\.csv|\.xlsx|\.xls)$/i;
      if(!allowedExtensions.exec(filePath)){
        alert('Please upload .csv or excel files only');
        fileInput.value = '';
        return false;
      }

      this.valid = true
      var formData = new FormData()
      this.surveyFile = this.$refs.file[0].files[0]
      console.log(this.surveyFile)
      formData.append('survey_file', this.surveyFile)
      axios({
        url: this.$hostname + '/survey/surveys/' + this.id + '/upload/',
        method: 'put',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('api_token') ,
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
      })
      .then(response => {
        this.survey[0].file = response.data.file
        alert("File uploaded successfully")
      })
      .catch(error => {
        alert("Some Error Occured")
      })
    },
    uploadAttachment(data) {
      data.attachment = this.$refs.attachment[0].files[0]
    }

  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding:9px;
  width:155px !important;

  color: white;
  background-color: #2196f3;

  border-radius: .3rem;
  cursor:pointer;
  text-align: center;
  font-weight: bold;
  -webkit-box-shadow: 0 1px 1px -6px black;
  -moz-box-shadow: 0 1px 1px -1px black;
  box-shadow: 0 4px 6px -6px black;
}

.file-select > input[type="file"] {
  display: none;
}



</style>
