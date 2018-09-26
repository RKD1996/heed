<template>
  <div>
    <v-content>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <span class="display-1">All Project</span>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <br>
        <v-layout>
          <v-flex xs12 class="mb-2">
            <div class="title">Pending Review Project</div>
          </v-flex>
        </v-layout>
        <div>
          <v-data-table :headers="pendingProjectHeaders" :items="pendingProjectLists" class="elevation-1" style="border:1px solid lightgrey;">
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
              <td class="text-xs-left" @click="openPost(props.item.id,props.item.author_name)">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.author_name }}</td>
              <td class="text-xs-left">{{ new Date(props.item.date).toDateString() }}</td>
              <td class="text-xs-left">{{ props.item.blog_status == 1?"Pending Review":props.item.blog_status == 2 ? "Approved":"Rejected" }}</td>
              <td class="text-xs-left">
                <v-select :items="projectApprovals" v-model="props.value" label="Project Requests" autocomplete></v-select>
              </td>
              <td class="text-xs-right">
                <v-btn fab dark small color="primary" @click.native.stop="updateRequestStatus(props.item,props.value)"><v-icon dark>save</v-icon></v-btn>
              </td>
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
              <!-- <td class="text-xs-left">
                <v-select :items="projectApprovals" v-model="props.value" label="Project Requests" autocomplete></v-select>
              </td>
              <td class="text-xs-right">
                <v-btn fab dark small color="primary" @click.native.stop="updateRequestStatus(props.item,props.value)"><v-icon dark>save</v-icon></v-btn>
              </td> -->
            </template>
            <template slot="pageText" slot-scope="props">
              Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
            </template>
          </v-data-table>
        </div>
        <br>
        <v-layout>
          <v-flex xs12 class="mb-2">
            <div class="title">Rejected Project</div>
          </v-flex>
        </v-layout>
        <div>
          <v-data-table :headers="projectHeaders" :items="rejectedProjectLists" class="elevation-1" style="border:1px solid lightgrey;">
            <template slot="items" slot-scope="props" style="border:1px solid lightgrey">
              <td class="text-xs-left" @click="openPost(props.item.id,props.item.author_name)">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.description }}</td>
              <td class="text-xs-left">{{ props.item.author_name }}</td>
              <td class="text-xs-left">{{ new Date(props.item.date).toDateString() }}</td>
              <td class="text-xs-left">{{ props.item.blog_status == 1?"Pending Review":props.item.blog_status == 2 ? "Approved":"Rejected" }}</td>
              <!-- <td class="text-xs-left">
                <v-select :items="projectApprovals" v-model="props.value" label="Project Requests" autocomplete></v-select>
              </td>
              <td class="text-xs-right">
                <v-btn fab dark small color="primary" @click.native.stop="updateRequestStatus(props.item,props.value)"><v-icon dark>save</v-icon></v-btn>
              </td> -->
            </template>
            <template slot="pageText" slot-scope="props">
              Pages {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
            </template>
          </v-data-table>
        </div>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import loggedInMixin from '../../mixins/loggedInMixin'
import axios from 'axios'
export default{
  created: function(){
    this.btnClicked=true
    //api call for new Users
    this.$store.dispatch('projectLists')
    .then(response =>{
      var data = response.data
      console.log(data)
      this.projectLists = data
      for(var i = 0; i < data.length; i++) {
        if(data[i].blog_status == 1) {
          this.pendingProjectLists.push(data[i])
        } else if(data[i].blog_status == 2) {
          this.approvedProjectLists.push(data[i])
        } else if(data[i].blog_status == 3) {
          this.rejectedProjectLists.push(data[i])
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  },
  computed: {
    pendingProjectHeaders () {
      return this.$store.state.pendingProjectAdminHeaders
    },
    projectHeaders () {
      return this.$store.state.projectHeaders
    },
  },
  data () {
    return {
      pendingProjectLists: [],
      approvedProjectLists: [],
      rejectedProjectLists: [],
      projectApprovals: [
        {text: 'Approve', value:2},
        {text: 'Reject', value:3}
      ],
    }
  },
  mixins: [loggedInMixin],
  methods:{
    openPost (id, author) {
      console.log(id+" :: "+author)
      localStorage.setItem('postId', id)
      localStorage.setItem('postAuthor', author)
      this.$router.push('/blog/blogpost')
    },
    updateRequestStatus (project,status) {
      console.log(project)
      console.log(status)
      var form = new FormData()
      form.append('title', project.title)
      form.append('content', project.content)
      form.append('blog_status', status)
      var obj = this
      axios({
        url: this.$hostname + '/blog/blog/' + project.id + '/change_status/',
        method: 'put',
        data: form,
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
        obj.$router.go(0)
      })
    }
  },
  mounted () {

  }
}
</script>
