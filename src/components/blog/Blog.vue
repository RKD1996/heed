<template>
  <div>
    <sidebar></sidebar>
    <v-content class="ml-4">
      <wait :progress="progress"></wait>
      <v-layout row wrap>
        <v-flex xs6>
          <span class="display-1"><u>{{projectText}}</u></span>
        </v-flex>
        <v-flex xs6>
          <v-btn color="info" to="/blog/blogcreate">Add New Projects</v-btn>
          <v-btn color="info" @click="draftData">My Drafts</v-btn>
          <v-btn color="info" @click="getBlogData">All Projects</v-btn>
          <v-btn color="info" @click="getMyBlogData">My Projects</v-btn>
        </v-flex>
      </v-layout><br>
      <v-divider></v-divider>
      <v-layout row wrap class="ma-5" v-show="myProjects">
        <v-flex xs12 class="ml-1 mt-4" v-for="t in blog"  :key="t.id">
          <v-card style="border: 1px solid black;" hover elevation-24>
            <v-card-title>
              <v-layout row wrap>
                <v-flex xs12>
                  <div class="headline blue--text" @click="openPost(t.id,t.author_name)"><u>{{t.title}}</u></div>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex class="text-xs-right">
                  By: {{t.author_name}}
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <span>{{t.description}}</span><br>
              <span></span>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="primary" flat @click="openPost(t.id,t.author_name)">Readmore</v-btn>
              <v-btn color="primary" flat @click="draftPost(t)" v-show="dpostbtn === true">Post</v-btn>
              <div class="ml-5">{{new Date(t.date).toDateString()}}</div>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <div v-show="!myProjects">
        <v-layout v-show="!show">
          <v-flex xs12 class="mb-2">
            <div class="title">Pending Review Project</div>
          </v-flex>
        </v-layout>
        <div v-show="!show">
          <v-data-table :headers="projectHeaders" :items="pendingProjectLists" class="elevation-1" style="border:1px solid lightgrey;">
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
              <td class="text-xs-left" @click="openPost(props.item.id,props.item.author_name)">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
              <td class="text-xs-left">{{ props.item.author_name }}</td>
              <td class="text-xs-left">{{ new Date(props.item.date).toDateString() }}</td>
              <td class="text-xs-left">{{ props.item.blog_status == 1?"Pending Review":props.item.blog_status == 2 ? "Approved":"Rejected" }}</td>
            </template>
            <template slot="pageText" slot-scope="props">
              Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
            </template>
          </v-data-table>
        </div>
        <br>
        <v-layout>
          <v-flex xs12 class="mb-2">
            <div class="title">Approved Project</div>
          </v-flex>
        </v-layout>
        <div>
          <v-data-table :headers="projectHeaders" :items="approvedProjectLists" class="elevation-1" style="border:1px solid lightgrey;">
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
              <td class="text-xs-left" @click="openPost(props.item.id,props.item.author_name)">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
              <td class="text-xs-left">{{ props.item.author_name }}</td>
              <td class="text-xs-left">{{ new Date(props.item.date).toDateString() }}</td>
              <td class="text-xs-left">{{ props.item.blog_status == 1?"Pending Review":props.item.blog_status == 2 ? "Approved":"Rejected" }}</td>
            </template>
            <template slot="pageText" slot-scope="props">
              Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
            </template>
          </v-data-table>
        </div>
        <br>
        <v-layout v-show="!show">
          <v-flex xs12 class="mb-2">
            <div class="title">Rejected Project</div>
          </v-flex>
        </v-layout>
        <div v-show="!show">
          <v-data-table :headers="projectHeaders" :items="rejectedProjectLists" class="elevation-1" style="border:1px solid lightgrey;">
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
              <td class="text-xs-left" @click="openPost(props.item.id,props.item.author_name)">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
              <td class="text-xs-left">{{ props.item.author_name }}</td>
              <td class="text-xs-left">{{ new Date(props.item.date).toDateString() }}</td>
              <td class="text-xs-left">{{ props.item.blog_status == 1?"Pending Review":props.item.blog_status == 2 ? "Approved":"Rejected" }}</td>
            </template>
            <template slot="pageText" slot-scope="props">
              Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
            </template>
          </v-data-table>
        </div>
      </div>
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
      myProjects: true,
      pendingProjectLists: [],
      approvedProjectLists: [],
      rejectedProjectLists: [],
      title: '',
      des: '',
      draft: [],
      files: [],
      dpostbtn: '',
      body: '',
      show: '',
      dialog: false,
      progress: false,
      content: ``,
      blog: [],
      projectText: 'All Projects'
    }
  },
  methods: {
    getMyBlogData () {
      this.myProjects = false
      this.projectText = 'My Projects'
      this.progress = true
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/?blog_status=1',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        console.log(res)
        obj.progress = false
        obj.pendingProjectLists = res.data
      })
      axios({
        url: this.$hostname + '/blog/blog/?blog_status=2',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        console.log(res)
        obj.progress = false
        obj.approvedProjectLists = res.data
      })
      axios({
        url: this.$hostname + '/blog/blog/?blog_status=3',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        console.log(res)
        obj.progress = false
        obj.rejectedProjectLists = res.data
      })
    },
    openPost (id, author) {
      console.log(id+" :: "+author)
      localStorage.setItem('postId', id)
      localStorage.setItem('postAuthor', author)
      this.$router.push('/blog/blogpost')
    },
    draftPost (project) {
      this.progress = true
      var form = new FormData()
      form.append('title', project.title)
      form.append('description', project.description)
      form.append('content', project.text)
      form.append('blog_status', 1)
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/' + project.id + '/',
        method: 'put',
        data: form,
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.$router.go(0)
      })
    },
    draftData () {
      this.myProjects = true
      this.projectText = 'My Drafts'
      this.progress = true
      console.log('showing draft data')
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/?blog_status=0',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        console.log(res.data)
        obj.progress = false
        obj.draft = res.data
        if (obj.draft !== '') {
          obj.blog = obj.draft
          obj.dpostbtn = true
        } else {
          obj.draft = []
          obj.dpostbtn = true
        }
      })
    },
    getBlogData () {
      this.myProjects = true
      this.projectText = 'All Projects'
      this.progress = true
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        console.log(res)
        obj.dpostbtn = false
        obj.progress = false
        obj.blog = res.data
        var d
        var n
        for(var i = 0; i<res.data.length; i++) {
          d = new Date(res.data[i].date);
          n = d.toDateString()
          console.log(n)
          //res.data[i].push({'date': n})
        }
      })
    }
  },
  mounted () {
    this.progress = true
    this.getBlogData()
    if (localStorage.getItem('user_type') === 'help_admin') {
      this.show = true
    } else {
      this.show = false
    }
  },
  computed: {
    projectHeaders () {
     return this.$store.state.projectHeaders
   }
 },
  mixins: [loggedInMixin]
}
</script>
