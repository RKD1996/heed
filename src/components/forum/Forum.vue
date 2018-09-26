<template>
  <div>
    <sidebar></sidebar>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12 md12 xs10>
            <div v-if="snackbar" >
              <app-alert @dismissed="onDismissed" :text="msg" :success="success"></app-alert>
            </div>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12 md12>
            <v-card >
              <v-card >
                <v-card-title primary-title>
                  <forum-header></forum-header>
                </v-card-title>
              </v-card>
              <v-card class="pl-3 pr-3 pb-3">
                <v-data-table :headers="headers" :items="forumContent" class="elevation-1 " style="border:1px solid lightgrey;cursor:pointer;">
                  <template slot="items" slot-scope="props" style="border:1px solid lightgrey;">
                    <tr style="line-height: 24px;">
                      <td class="text-xs-left" @click="onForum(props.item.topicId)">
                        <h4 class="primary--text" style="font-weight:400;font-size:17px;">{{ props.item.topicName }}</h4>
                        {{ props.item.description }}
                      </td>
                      <td class="text-xs-left">Posts : {{ props.item.posts }}</td>
                      <td class="text-xs-left">Threads: {{ props.item.thread}} </td>
                      <td class="text-xs-left">Posts : {{ props.item.posts }}</td>
                      <td class="text-xs-left" style="line-height:15px"><div>{{props.item.posttime}}</div>
                        {{props.item.lastThread}}
                      </td>
                      <td class="text-xs-left"><v-btn fab small color="error" @click="deleteForumTopic(props.item.topicId)"><v-icon>delete</v-icon></v-btn></td>
                    </tr>
                  </template>
                  <template slot="pageText" slot-scope="props">
                    Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
                  </template>
                </v-data-table>
                <v-layout row class="mt-3">
                  <v-dialog v-model="dialog" persistent max-width="800px">
                    <v-btn slot="activator" color="primary" dark><v-icon left dark>add</v-icon>
                      Add Topic</v-btn>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Add New Topic</span>
                        </v-card-title>
                        <v-card-text>
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container grid-list-md>
                              <v-layout wrap>
                                <v-flex xs12 md10 sm6>
                                  <v-text-field v-model="topic.topicName" :rules="topicRules" label="Topic Name" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 md10 sm6>
                                  <v-text-field v-model="topic.description" :rules="topicRules" label="Description" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 md8 sm10>
                                  <v-spacer></v-spacer>
                                  <v-btn :disabled="!valid" color="primary" @click="addTopic"> Add Topic </v-btn>
                                  <v-btn color="primary"  @click.native="clear">Close</v-btn>
                                </v-flex>
                                <v-flex md4 v-if="isLoading">
                                  <app-loading></app-loading>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-layout>
                </v-card>
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
  import ForumHeader from './ForumHeader'
  import axios from 'axios'



  export default{
    components: {
      "sidebar": Sidebar,
      "forum-header":ForumHeader
    },
    mounted:function(){
      // Calling To API ForumContent
      this.getData()
    },
    data(){
      return{
        dialog: false,
        msg:'',
        success:true,
        isLoading:false,
        topic:{
          topicName:'',
          description:'',
        },
        forumContent:[],
        snackbar:false,
        valid: true,
        dummyTopicId:5,
        topicRules: [
          v => !!v || 'Filed is required',
        ]

      }
    },
    mixins:[loggedInMixin],
    computed: {
      headers () {
        return this.$store.state.headers
      }
    },
    methods:{
      onForum(topicId){
        //console.log(topicId)
        //var jarry = JSON.stringify(topicId);
        this.$router.push({ path: '/forum/'+ topicId + '/threads' })
      },
      addTopic () {

        if (this.$refs.form.validate()) {
          this.isLoading=true
          this.valid=false
          var api_token = localStorage.getItem('api_token')
          this.$store.dispatch('PostNewTopic', {
            description: this.topic.description,
            name: this.topic.topicName
          })
          .then(response =>{
            //console.log(response)
            let data = response.data

            this.isLoading=false
            this.dialog=false
            this.snackbar=true
            this.msg="Add Succesfully"

            // Pushing Into List Of Forums

            this.forumContent.push({
              topicId: data.id,
              topicName: data.topic_name,
              topicDescription: data.topic_description,
              thread: 0,
              posts: 0,
              posttime: 'Not Posted',
              lastThread: 'No Threads'
            })
            // Calling API to Update Topics
            // this.getData()

            this.$refs.form.reset()
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      },
      clear () {
        this.dialog=false
        this.$refs.form.reset()
        this.isLoading=false
      },
      onDismissed(){
        this.snackbar=false
      },
      getData(){
        this.$store.dispatch('getFormData')
        .then(response => {
          console.log(response.data)
          let data = response.data
          var i;
          for (i=0; i<data.length; i++){
            var topic = data[i]
            //console.log(topic.id)
            this.forumContent.push({
              topicId: topic.id,
              topicName: topic.topic_name,
              description: topic.topic_description,
              thread: topic.thread_count,
              posts: topic.post_count,
              posttime: topic.last_post_time_ago,
              lastThread: topic.last_thread_name,
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
      },
      deleteForumTopic (id) {
        console.log(id)
        var obj = this
        axios({
          url: 'https://api-help.herokuapp.com/forum/topics/' + id + '/',
          method: 'delete',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')}
        }).then(function (res) {
          obj.$router.go(0)
        })
      }
    },
    created () {

    }
  }
  </script>
