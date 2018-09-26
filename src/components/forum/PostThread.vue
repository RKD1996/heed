<template>
  <div>
    <sidebar></sidebar>
    <v-content>
      <v-container>
        <v-layout>
          <v-flex xs12 md10 xs7>
            <div v-if="snackbar" >
              <app-alert @dismissed="onDismissed" :text="msg" :success="success"></app-alert>
            </div>
            <div>
              <app-backBtn></app-backBtn>
            </div>
          </v-flex>
          <v-flex xs12 md2 xs3>
            <v-dialog v-model="dialog" persistent max-width="800px">
              <v-btn slot="activator" color="primary" dark><v-icon left dark>add</v-icon>
                New Post</v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{postDialog}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 md10 sm6>
                            <v-text-field  v-model="posts.postTitle" :rules="threadRules" label="Post Title" required></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <div class="quill-editor ma-2">
                              <quill-editor ref="myTextEditor" v-model="content" :options="editorOption">
                              </quill-editor>
                            </div>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap>
                      <!--<v-flex xs12 md10 sm6>
                            <v-text-field v-model="posts.postBody" :rules="BodyRules" label="Post Body" :counter="250" multi-line single-line required></v-text-field>
                          </v-flex>-->
                          <v-flex xs12 md8 sm10>
                            <v-spacer></v-spacer><br><br><br>
                            <v-btn :disabled="!valid" color="primary" @click.native="submit">submit</v-btn>
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
          <v-card class="pt-2">
            <v-layout class="mt-2 pt-2" v-for="(post,index) in threadPosts" :key="post.postId">
              <v-flex xs12 md12 sm12>
                <v-card>
                  <v-card-title primary-title>
                    <v-flex xs12 md10 sm7>
                      <div>
                        <div><h3 class="display-1">{{post.postTitle}}</h3></div>
                        <div style="opacity:7;" class="mt-3">
                          <div class="subheading">Author: {{post.username}}</div>
                          <div class="subheading">Posted: {{post.postTime}}</div>
                        </div>
                      </div>
                    </v-flex>
                    <v-flex xs12 md2 sm3>
                      <v-btn fab small color="error" @click="Deletedialog = true">
                        <v-icon>delete</v-icon>
                      </v-btn>
                      <v-dialog v-model="Deletedialog" max-width="500px" transition="dialog-transition">
                        <v-card>
                          <v-card-text>
                            Are You Sure You want to <b>Delete</b> The Post
                          </v-card-text>
                          <v-card-actions>
                            <v-btn color="error" outline @click="deletePost(post.postId), Deletedialog = false">Yes</v-btn>
                            <v-btn color="success" outline @click="Deletedialog = false">No</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-flex>
                    <v-flex xs12 md10>
                      <div class="mt-3">
                        <span class="text-xs-left" v-html="post.postBody"></span>
                      </div>
                    </v-flex>
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
      </v-content>
    </div>
  </template>

  <script>
  import Sidebar from '../sidebar/Sidebar.vue'
  import loggedInMixin from '../../mixins/loggedInMixin'
  import BackBtn from '../shared/BackRoutingBtn.vue'
  import axios from 'axios'

  export default{
    props:{
      topicId: '',
      id:''
    },
    components: {
      "sidebar": Sidebar,
      "app-backBtn":BackBtn

    },
    created:function(){
      this.getPosts(this.id)
      console.log('postThread')
    },
    data(){
      return{
        postDialog:"Add New Post",
        dialog:false,
        set: '',
        Deletedialog: false,
        valid:false,  // Form Validation
        isLoading:false,  // Progress Loading
        success:true,//   if Submit Succesfully then alert wil be success
        snackbar:false,

        posts:{
          postId:0,
          postBody:'',
          postTitle:'',
          postTime:'',
        },
        threadPosts:[
        ],
        threadRules: [
          v => !!v || 'Filed is required',

        ],
        BodyRules: [
          v => !!v || 'Filed is required',
        ],
        content: ``,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            },
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: true
            },
            imageDrop: true,
            imageResize: {
              displayStyles: {
                backgroundColor: 'black',
                border: 'none',
                color: 'white'
              },
              modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            }
          }
        }
      }
    },
    mixins:[loggedInMixin],
    methods:{
      deletePost(id){
        console.log(id)
        console.log(this.set)
        var obj = this
        axios({
          url: 'https://api-help.herokuapp.com/forum/posts/' + id + '/',
          method: 'delete',
          headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
        }).then(function(res) {
          obj.$router.go(0)
        })
      },
      getPosts (threadId) {
        this.$store.dispatch('getPostThread', {
          id: threadId
        })
        .then(response => {
          var data = response.data
          var i;
          for (i=0; i< data.length; i++){
            var post = data[i]
            console.log(post)
            this.threadPosts.push({
              postId: post.id,
              postTitle: post.post_name,
              postBody: post.post_body,
              username: localStorage.getItem("username"),
              postTime: post.last_post_time_ago
            })
          }
        })
        .catch(error => {

        })
      },
      submit () {

        if (this.$refs.form.validate()) {
          this.isLoading=true
          this.valid=false

          console.log(this.topicId)
          console.log(this.id)

          this.$store.dispatch('submitNewPosts', {
            post_name: this.posts.postTitle,
            post_body: this.content,
            thread: this.id
          })
          .then( response => {
            this.isLoading=false
            this.dialog=false
            this.snackbar=true
            this.msg="Added A New Post Succesfully"
            // Push To List Of Threads
            var data = response.data
            this.threadPosts.push({
              postId: data.id,
              postTitle: data.post_name,
              postBody: data.post_body,
              username: localStorage.getItem("username"),
              postTime: data.last_post_time_ago,
            })

            //this.$refs.form.reset()
          })
          .catch(function (error) {
            console.log(error);
          })
        }

      },
      clear(){
        this.content= ``,
        this.dialog=false
        this.$refs.form.reset()
        this.isLoading=false
      },
      onDismissed(){
        this.snackbar=false
      }

    }
  }
  </script>

  <style>
  .quill-code {
    border: none;
    height: auto;
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
  .quill-editor {
    height: 300px;
  }
  </style>
