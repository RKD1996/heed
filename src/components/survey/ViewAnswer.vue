<template>
  <div>
    <sidebar></sidebar>
    <v-content width="100">
      <v-container class="mr-1">
        <v-layout row wrap>
          <v-flex xs12 sm10 md12>
            <v-layout row class="mb-3">
              <v-flex xs4 sm3 md4>
                <v-btn color="default" @click="$router.go(-1)"><v-icon>arrow_left</v-icon>Back</v-btn>
              </v-flex>
            </v-layout>
            <v-card>
              <v-container fluid>
                <v-layout row>
                  <v-flex xs12 sm10 md12 class="mb-2" >
                    <v-card-title>
                      <span class="headline">{{id}}</span>
                      <v-spacer></v-spacer>
                      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
                    </v-card-title>
                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>
                <v-form>
                  <div class="pl-2 pb-4">
                    <v-layout row wrap hover>
                      <v-flex xs4 sm5 md3 class="mr-4">
                        <v-select :items="ages" v-model="filterData.age" label="Age" single-line></v-select>
                      </v-flex>
                      <v-flex xs4 sm5 md3 class="mr-4">
                        <v-select :items="genders" v-model="filterData.gender" label="Gender" single-line></v-select>
                      </v-flex>
                      <v-flex xs4 sm5 md3 class="mr-4">
                        <v-select v-model="id" label="Survey Name" single-line></v-select>
                      </v-flex>
                      <v-flex xs4 sm5 md3>
                        <v-btn color="info" small @click="applyFilter">Apply Filter</v-btn>
                      </v-flex>
                    </v-layout>
                  </div>
                  <v-layout row wrap v-if="btnClicked">
                    <v-flex xs12 md10 offset-sm4>
                      <v-spacer></v-spacer>
                      <app-loading></app-loading>
                      <v-spacer></v-spacer>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap v-if="isFiltered">
                    <v-flex xs12 md12>
                      <v-data-table :headers="headers" :items="questions" :search="search" hide-actions class="elevation-1">
                        <template slot="items" slot-scope="props">
                          <td>{{ props.item.no }}</td>
                          <td class="text-xs-left">{{ props.item.ques }}</td>
                          <td class="text-xs-right">
                            <div v-for="ans in props.item.answers">
                              {{ans.ans}}
                            </div>
                          </td>
                          <td class="text-xs-left">
                            <div v-for="ans in props.item.answers">
                              <v-progress-linear v-model="ans.responses*10" height="5" color="warning"></v-progress-linear>
                            </div>
                          </td>
                          <td class="text-xs-left">
                            <div v-for="ans in props.item.answers">
                              {{ans.responses}}
                            </div>
                          </td>
                          <td class="text-xs-left">{{ props.item.total_responses }}</td>
                        </template>
                        <template slot="pageText" slot-scope="props">
                          Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
                        </template>
                        <v-alert slot="no-results" :value="true" color="error" icon="warning">
                          Your search for "{{ search }}" found no results.
                        </v-alert>
                      </v-data-table>
                    </v-flex>
                  </v-layout>
                </v-form>
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
  props:{
    type:String,
    id:''
  },
  components: {
    "sidebar": Sidebar
  },

  data: () => ({
    btnClicked:false,
    search:'',
    isFiltered:true,
    filterData:{
      age:'',
      gender:''

    },
    ages:['0-14 ','15-24', '25-64','64+'],
    genders:['Male', 'Female' , 'Others'],

    filteredAnswers:[],
    headers: [
      {
        text: 'QNo', value:'no'
      },
      { text: 'Questions', value: 'questions' },
      { text: 'Answers', value: 'answers' },
      { text: 'Progress', value: 'progress' },
      { text: 'Responses', value: 'responses' },
      { text: 'Total Responses', value: 'total_responses' }

    ],
    survey: {
      "id": "ABC123",
      "s_name": "Household Cooking",
      "participants": 32
    },
    questions: [
      {
        "no": "Q5",
        "ques": "How many kitchen appliances do you own?",
        "answers": [
          {ans:"0" , responses: 6},
          {ans:"1" , responses: 8},
          {ans:"2" , responses: 9},
          {ans:"3" , responses: 7},
          {ans:"4+" , responses: 5}
        ],
        "total_responses": 35
      },
      {
        "no": "Q6",
        "ques": "How many people do you cook for on average every day?",
        "answers": [
          {ans:"0-1", responses: 3},
          {ans:"2-3", responses: 12},
          {ans:"4-5" , responses: 13},
          {ans:"6-7" , responses: 2},
          {ans:"7+" , responses : 5}
        ],
        "total_responses": 35
      },
      {
        "no": "Q7",
        "ques": "How many people do you cook for on average every day?",
        "answers": [
          {ans:"0-1", responses: 3},
          {ans:"2-3", responses: 12},
          {ans:"4-5" , responses: 13},
          {ans:"6-7" , responses: 2},
          {ans:"7+" , responses : 5}
        ],
        "total_responses": 35
      },
      {
        "no": "Q8",
        "ques": "How many people do you cook for on average every day?",
        "answers": [
          {ans:"0-1", responses: 3},
          {ans:"2-3", responses: 12},
          {ans:"4-5" , responses: 13},
          {ans:"6-7" , responses: 2},
          {ans:"7+" , responses : 5}
        ],
        "total_responses": 35
      }
    ]

  })

  ,
  mixins:[loggedInMixin],
  methods:{
    applyFilter(){
      this.btnClicked=true,
      this.isFiltered=true,
      axios.get('https://jsonplaceholder.typicode.com/posts', this.filterData)
      .then(response =>{
        this.btnClicked=false,
        this.filteredAnswers=response.data
        //console.log(response.data)
        //alert('Clicked Props Id :'+this.id)
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    back(id){
      this.$router.push({ path: '/survey/'+id })
    }
  }

}
</script>
