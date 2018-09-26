<template>
  <div>
    <sidebar></sidebar>
    <v-content class="ml-4">
      <wait :progress="progress"></wait>
      <v-layout row wrap>
        <v-flex xs6>
          <v-btn color="info" small to="/blog"><v-icon small>arrow_back_ios</v-icon>Back</v-btn>
        </v-flex>
        <v-flex xs5 class="text-xs-right">
          <v-layout row wrap v-show="!showApprovalBTN">
            <v-flex xs4>
              <v-btn color="primary" v-show="show === true" to="/blog/blogedit"><v-icon>edit</v-icon>Edit</v-btn>
            </v-flex>
            <v-flex xs4 class="text-xs-left">
              <v-btn color="error" v-show="show" @click="deleteBlog"><v-icon>delete</v-icon>Delete</v-btn>
            </v-flex>
            <v-flex xs4>
              <v-btn color="info" v-show="show === true" v-if="showPublish" @click="blogPost" flat><u>{{publishBTN}}</u></v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap v-show="showApprovalBTN">
            <v-flex xs4 class="text-xs-left">
              <v-btn color="error" @click="deleteBlog"><v-icon>delete</v-icon>Delete</v-btn>
            </v-flex>
            <v-flex xs4 class="text-xs-left">
              <v-btn color="info" v-show="show1" @click="updateRequestStatus(3)" flat><u>Reject</u></v-btn>
            </v-flex>
            <v-flex xs4 class="text-xs-left">
              <v-btn color="info" v-show="show1" @click="updateRequestStatus(2)" flat><u>Approve</u></v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs1></v-flex>
      </v-layout>
      <v-container>
        <div class="ma-5 pl-5 pr-5">
          <h1 class="text-xs-left mr-5 pr-5"><u>{{topic}}</u></h1><br>
          <v-layout row wrap>
            <v-flex xs12>
              <div class="text-xs-left"> {{date}} </div>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <div class="text-xs-left"> By: <b>{{author}}</b></div>
            </v-flex>
          </v-layout><br>
          <span class="text-xs-left" v-html="text"></span><br><br>
          <div class="title">
            <u>Attachments</u>
          </div><br>
          <v-layout row wrap>
            <v-flex xs3 v-for="(key, value) in atach"  :key="value">
              <a :href="key">{{value}}</a>
            </v-flex>
          </v-layout>
          <div class="text-xs-left mr-5 pr-5 mt-5 pt-5 headline">
            <span><u>Comments</u></span>
            <div class="text-xs-right mt-3">
              <v-layout row wrap>
                <v-flex xs4>
                  <v-text-field name="name" label="Author Name" id="id" v-model="auth_name"></v-text-field>
                </v-flex>
                <v-flex xs7 class="ml-1">
                  <v-text-field name="name" label="Comment" id="id" v-model="editcomment"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6 class="text-xs-right">
                  <v-btn color="success" flat outline @click="sendAddComment(editcomment, auth_name)">Submit</v-btn>
                </v-flex>
                <v-flex xs6 class="text-xs-left">
                  <v-btn color="info" flat outline @click="clearComment">Clear</v-btn>
                </v-flex>
              </v-layout>
            </div>
          </div>
          <v-layout row wrap class="ma-5">
            <v-flex xs12 v-for="t in comments"  :key="t.id" class="text-xs-center" style="border-left: 1px solid lightgrey; border-right: 1px solid lightgrey;">
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs1></v-flex>
                <v-flex xs1>
                  <v-icon>people</v-icon>
                </v-flex>
                <v-flex xs4 class="text-xs-left">
                  <div class="subheading">{{t.author_name}}</div>
                </v-flex>
                <v-flex xs4 class="text-xs-left">
                  <div class="">{{t.date}}</div>
                </v-flex>
                <v-flex xs1 class="text-xs-right">
                  <v-icon v-show="show === true" style="border: 1px solid blue; font-size: 18px; cursor: pointer;" @click="editComment(t.comment, t.id, t.author_name), Editdialog = true">edit</v-icon>
                  <v-icon v-show="show === true" style="border: 1px solid red; font-size: 18px; color: red; cursor: pointer;" @click="deleteComment(t.id)">close</v-icon>
                </v-flex>
                <v-flex xs1></v-flex>
              </v-layout>
              <v-divider></v-divider>
              <div class="text-xs-center ma-4">
                {{t.comment}}
              </div>
            </v-flex>
          </v-layout>
          <v-dialog v-model="Editdialog" max-width="500px" transition="dialog-transition">
            <v-card>
              <v-card-title primary-title>
                <div class="headline">Comment</div>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-text-field name="name" label="Comment" id="id" v-model="editcomment"></v-text-field>
                  <v-text-field name="name" label="Comment" id="id" v-model="auth_name"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="success" @click="sendEditComment(editcomment, auth_name)">Submit</v-btn>
                <v-btn color="info" @click="clearComment">Clear</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
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
    'wait': wait
  },
  data(){
    return{
      showApprovalBTN: false,
      showPublish: '',
      show: '',
      show1: '',
      editcomment: '',
      eid:'',
      publishBTN: '',
      dt: '',
      auth_name: '',
      Adddialog: '',
      Editdialog: '',
      progress: false,
      date: '',
      author: '',
      topic: '',
      text: '',
      comments: [],
      atach: [],
    }
  },
  methods: {
    updateRequestStatus (status) {
      console.log(status)
      var form = new FormData()
      form.append('title', this.topic)
      form.append('content', this.text)
      form.append('blog_status', status)
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/' + localStorage.getItem('postId') + '/change_status/',
        method: 'put',
        data: form,
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.$router.go(-1)
      })
    },
    backBtn () {
      this.$router.go(-1)
    },
    blogPost () {
      var set
      if (this.publishBTN === 'Un-Publish'){
        set = 0
      } else {
        set = 1
      }
      this.progress = true
      console.log('showing draft data')
      var form = new FormData()
      form.append('title', this.topic)
      form.append('content', this.text)
      form.append('blog_status', 1)
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/' + localStorage.getItem('postId') + '/',
        method: 'put',
        data: form,
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.$router.go(0)
      })
    },
    deleteBlog () {
      this.progress = true
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/' + localStorage.getItem('postId') + '/',
        method: 'delete',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.progress = false
        obj.$router.go(-1)
      })
    },
    deleteComment (id) {
      this.progress = true
      console.log(id)
      var obj = this
      axios({
        url: this.$hostname + '/blog/comment/' + id + '/',
        method: 'delete',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.progress = false
        obj.$router.go(0)
      })
    },
    editComment (comment, id, author) {
      this.editcomment = comment
      this.eid = id
      this.auth_name = author
    },
    sendAddComment (editedComment, auth_name) {
      this.progress = true
      var obj = this
      axios({
        url: this.$hostname + '/blog/comment/?blog=' + localStorage.getItem('postId'),
        method: 'post',
        data: {
          comment: editedComment,
          author_name: auth_name,
          blog: localStorage.getItem('postId')
        },
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.progress = false
        obj.$router.go(0)
      })
    },
    sendEditComment (editedComment, author) {
      this.progress = true
      var obj = this
      axios({
        url: this.$hostname + '/blog/comment/' + obj.eid + '/',
        method: 'put',
        data: {
          comment: editedComment,
          author_name: author,
          blog: localStorage.getItem('postId')
        },
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.progress = false
        obj.$router.go(0)
      })
    },
    clearComment () {
      this.$refs.form.reset()
    },
    getData () {
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/' + localStorage.getItem('postId'),
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.author = res.data.author_name
        obj.topic = res.data.title
        obj.date = res.data.date
        obj.text = res.data.content
        obj.comments = res.data.comments
        obj.progress = false
        obj.atach = res.data.attachments
        var dt = new Date(obj.date)
        obj.date = dt.toDateString()
        console.log(res.data)
        if (localStorage.getItem('user_type') === 'help_admin') {
          obj.showApprovalBTN = true
          if(localStorage.getItem('postAuthor') === localStorage.getItem('username')) {
            obj.show = true
            obj.showApprovalBTN = false
            if (res.data.published == 0){
              obj.publishBTN = 'Publish'
              obj.showPublish = true
            }
          } else {
            if(res.data.blog_status === '1') {
              obj.show1 = true
            }
          }
        } else {
          if(localStorage.getItem('postAuthor') === localStorage.getItem('username')) {
            obj.show = true
            obj.show1 = true
            if (res.data.published == 0){
              obj.publishBTN = 'Publish'
            } else {
              obj.publishBTN = 'Un-Publish'
            }
          } else {
            obj.show = false
          }
        }
      })
    }
  },
  mounted () {
    this.getData()
    this.progress = true
  },
  mixins: [loggedInMixin]
}
</script>
