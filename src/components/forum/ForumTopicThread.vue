<template>
  <div>
    <sidebar></sidebar>
    <v-content width="100">
      <v-container class="mr-1">
        <v-layout row wrap>
          <v-flex xs12 md12 xs10>
            <div>
              <app-backBtn></app-backBtn>
            </div>
            <div v-if="snackbar">
              <app-alert @dismissed="onDismissed" :text="msg" :success="success"></app-alert>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 sm10 md12>
            <v-card>
              <v-card-title primary-title>
                <forum-header></forum-header>
              </v-card-title>
              <v-card-text>
                <v-layout row >
                  <v-flex xs6 md10 sm5>
                    <div class="pb-1">
                      <p class="primary--text display-1">{{topicName}}</p>
                      <p class="black--text">  {{topicDescription}}</p>
                    </div>
                  </v-flex>
                  <v-flex xs6 md2 sm5>
                    <v-dialog v-model="dialog" persistent max-width="800px">
                      <v-btn slot="activator" color="primary" dark><v-icon left dark>add</v-icon>
                        Add Thread</v-btn>
                        <v-card>
                          <v-card-title>
                            <span class="headline">{{threadTitle}}</span>
                          </v-card-title>
                          <v-card-text>
                            <v-form ref="form" v-model="valid" lazy-validation>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                  <v-flex xs12 md10 sm6>
                                    <v-text-field v-model="thread.threadName" :rules="threadRules" label="Thread Name" required></v-text-field>
                                  </v-flex>
                                  <v-flex xs12 md8 sm10>
                                    <v-spacer></v-spacer>
                                    <v-btn :disabled="!valid" color="primary" @click.native="submit">Submit</v-btn>
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
                    </v-flex>
                  </v-layout>
                  <v-data-table :headers="headers" :items="topicThread" class="elevation-1" style="border:1px solid lightgrey;cursor:pointer;">
                    <template slot="items" slot-scope="props" style="border:1px solid lightgrey;">
                      <tr style="line-height:24px;" >
                        <td class="text-xs-left" @click="onThread(props.item.threadId)">
                          <h4 class="primary--text" style="font-weight:400;font-size:17px;">{{ props.item.threadName }}</h4>
                        </td>
                        <td class="text-xs-left" @click="onThread(props.item.threadId)">Posts : {{ props.item.noOfPosts }}</td>
                        <td class="text-xs-left" style="line-height:15px"><div>{{props.item.user}}</div>
                          {{props.item.time}}
                        </td>
                        <td class="text-xs-right">
                          <v-btn fab dark small color="info" @click.native.stop="updateThread(props.item.threadId)"><v-icon dark>edit</v-icon></v-btn>
                          <v-btn fab dark small color="red" @click.native.stop="Deletedialog = true"><v-icon dark>delete</v-icon></v-btn>
                        </td>
                      </tr>
                      <v-dialog v-model="Deletedialog" max-width="500px" transition="dialog-transition">
                        <v-card>
                          <v-card-text>
                            Are you Sure you want to Delete This <b>Thread</b>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn color="error" outline @click="deleteThread(props.item.threadId), Deletedialog = false">Yes</v-btn>
                            <v-btn color="success" outline @click="Deletedialog = false">No</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </template>
                    <template slot="pageText" slot-scope="props">
                      Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
                    </template>
                  </v-data-table>
                </v-card-text>
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
  import BackBtn from '../shared/BackRoutingBtn.vue'

  import axios from 'axios'


  export default{

    props:{
      id:''
    },
    created:function(){
      this.getThreadsWithId(this.id)
    },
    /*mounted: function(){
    this.getThreadsWithId(this.id)
  },*/

  components: {
    "sidebar": Sidebar,
    "forum-header":ForumHeader,
    "app-backBtn":BackBtn

  },

  data(){
    return{
      //thread Title
      threadTitle:'Add New Thread',

      //Alert Bar
      snackbar:false,

      //Dialog
      dialog:false,
      Deletedialog: false,
      valid:false,  // Form Validation
      isLoading:false,  // Progress Loading
      success:true,//   if Submit Succesfully then alert wil be success

      topicName:'',
      topicDescription: '',
      thread:{
        threadName:'',
        topicId: this.id
      },
      topicThread:[
      ],
      threadRules: [
        v => !!v || 'Filed is required',

      ],

      // Time
      ticker: Date.now(),
      createdAt: Date.now()

    }
  },
  mixins:[loggedInMixin],
  computed: {
    headers () {
      return this.$store.state.headers
    }
  },
  methods:{
    getThreadsWithId(event){
      console.log(event)
      this.$store.dispatch('getThreadDetails', {id: event})
      .then(response => {
        var data = response.data
        console.log(data)
        this.topicId = data.id
        this.topicName = data.topic_name
        this.topicDescription = data.topic_description
        var i;
        var threads = data.threads
        for (i=0; i< threads.length; i++){
          var thread = threads[i]
          this.topicThread.push({
            threadId: thread.id,
            threadName: thread.thread_name,
            noOfPosts: thread.post_count,
            user: thread.last_post_author,
            time:thread.last_post_time_ago
          })
        }
      })
      .catch(error =>{
        console.log(error)
      })
    },
    submit () {

      if (this.$refs.form.validate()) {
        this.isLoading=true
        this.valid=false
        this.$store.dispatch('submitPost', {
          thread_name: this.thread.threadName,
          topic: this.thread.topicId
        })
        .then(response =>{
          this.isLoading=false
          this.dialog=false
          this.snackbar=true
          this.msg="Added A New Thread Succesfully"
          // Push To List Of Threads
          var data = response.data
          this.topicThread.push({
            threadId: data.id,
            threadName: data.thread_name,
            noOfPosts: 0,
            user: 'Not Posted Yet',
            time:'Not Posted Yet'
          })

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
    // Individual Thread
    onThread(Threadid){
      this.$router.push({ path: '/forum/'+ this.id + '/thread/' + Threadid + '/posts'})
    },
    updateThread(tId){
      this.dialog=true
    },
    deleteThread(id){
      console.log(id)
      var obj = this
      axios({
        url: 'https://api-help.herokuapp.com/forum/threads/' + id + '/',
        method: 'delete',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      }).then(function(res) {
        obj.$router.go(0)
      })
    }

  }

}
</script>
