import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

//var hn = 'http://192.168.43.49:8000'
var hn = 'https://api-help.herokuapp.com'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    headers:[
      {text:"Topic" , value:"topic"},
      {text:"Post By" , value:"author_name"},
      {text:"Threads", value:"thread"},
      {text:"Posts", value:""},
      {text:"Last Post" , value:"Post"},
      {text:"Delete" , value:"delete"}
    ],
    headers_admin: [
      { text: 'Name', value: 'name' },
      { text: 'Email / Phone / Organisation', value: 'email' },
      //{ text: 'Phone', value: 'phone' },
      //{ text: 'Organisation', value: 'organisation' },
      { text: 'Requests', value: 'requests' },
      { text: 'Permission', value: 'permission' },
      { text: 'Save' },
    ],
    currentHeaders: [
      { text: 'Name', value: 'name' },
      { text: 'Email / Phone / Organisation', value: 'email' },
      //{ text: 'Phone', value: 'phone' },
      //{ text: 'Organisation', value: 'organisation' },
      { text: 'Requests', value: 'requests' },
      { text: 'Last Seen', value: 'last_seen' },
      { text: 'Group Name', value: 'group_name' },
      { text: 'Permission', value: 'permission' },
      { text: 'Save' },
    ],
    declinedHeaders: [
      { text: 'Name', value: 'name' },
      { text: 'Email / Phone / Organisation', value: 'email' },
      //{ text: 'Phone', value: 'phone' },
      //{ text: 'Organisation', value: 'organisation' },
      { text: 'Requests', value: 'requests' },
      { text: 'Permission', value: 'permission' },
      { text: 'Save' },
    ],
    sensorHeaders: [
      { text: 'Node Name', value: 'meta_data.node_name' },
      { text: 'Node Id', value: 'id' },
      { text: 'Node Type', value: 'meta_data.node_type' },
      { text: 'Country', value: 'meta_data.country_name' },
      { text: 'Status', value: 'sensor_status' },
      { text: 'Action' },
      { text: 'Save' },
    ],
    projectHeaders: [
      { text: 'Project Name', value: 'title' },
      { text: 'Description', value: 'description' },
      { text: 'Post By', value: 'author_name' },
      { text: 'Date', value: 'date' },
      { text: 'Status', value: 'published' },
    ],
    pendingProjectAdminHeaders: [
      { text: 'Project Name', value: 'title' },
      { text: 'Post By', value: 'author_name' },
      { text: 'Date', value: 'date' },
      { text: 'Status', value: 'published' },
      { text: 'Request', value: 'approval' },
      { text: 'Save' },
    ],
    headers_survey: [
        { text: 'Survey', value: 'Survey' },
        { text: 'No Of Paticipants', value: 'Paticipants' },
        { text: 'Country', value: 'Country' },
        { text: 'No Of Questions', value: 'Questions' },
        { text: 'Date', value: 'date' },
        { text: 'Edit', value: 'Edit' }
      ],
    topics:[{
      topicId: '',
      topicName: '',
      description: '',
      thread: '',
      posts: '',
      posttime: '',
      lastThread: ''
    }],
    name: '',
    description: ''
  },
  actions: {
    // All actions are For Form related page
    getFormData() {
      return axios({
        url: hn + '/forum/topic_list',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      })
    },
    PostNewTopic (description, data) {
      return axios({
        url: hn + '/forum/topics/',
        method: 'post',
        data: {
          'topic_name': data.name,
          'topic_description': data.description
        },
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')}
      })
    },
    getThreadDetails: (content, data) => {
      return axios({
        url: hn + '/forum/' + data.id + '/thread_list/',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') }
      })
    },
    submitPost(context, data) {
      return axios({
        url: hn + '/forum/threads/',
        method: 'post',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
        data: {
          thread_name: data.thread_name,
          topic: data.topic
        }
      })
    },
    getPostThread (context, data) {
      console.log(data)
      return axios({
        url: hn + '/forum/posts/',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
        params: { thread_id: data.id }
      })
    },
    submitNewPosts(context, data){
      console.log(data)
      return axios({
        url: hn + '/forum/posts/',
        method: 'post',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
        data: {
          post_name: data.post_name,
          post_body: data.post_body,
          thread: data.thread
        }
      })
    },
    // All actions are for Admin page
    projectLists(){
      return axios({
        url: hn + '/blog/blog/all/',//?published=1',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
      })
    },
    sensorLists(){
      return axios({
        url: hn + '/sensor/sensor/?sensor_status=all',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
      })
    },
    newUser(){
      return axios({
        url: hn + '/new_user_request/',
        method: 'get',
        params: {
          user_request_status: "New Request"
        }
      })
    },
    requestUser () {
      return axios({
        url: hn + '/new_user_request/',
        method: 'get',
        params: {
          user_request_status: "Request Approved"
        }
      })
    },
    requestDeclineUser () {
      return axios({
        url: hn + '/new_user_request/',
        method: 'get',
        params: {
          user_request_status: "Request Declined"
        }
      })
    },
    requestPermission (context, data) {
      console.log(data)
      return axios({
        url: data.href,
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      })
    },
    // All actions are for Survey page
    getSurveyData () {
      return axios({
        url: hn + '/survey/surveys/',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
      })
    },
    postNewSurvey (context, data) {
      console.log(data)
      var formData = new FormData()
      formData.append("survey_custom_id", data.data[0].survey_custom_id)
      formData.append("survey_name", data.data[0].survey_name)
      formData.append("no_of_participants", data.data[0].no_of_participants)
      formData.append("no_of_questions", data.data[0].no_of_questions)
      formData.append("country", data.data[0].country)
      formData.append("start_date", data.data[0].start_date)
      formData.append("end_date", data.data[0].end_date)
      //formData.append("survey_image", data.data[0].imageFile)
      console.log(formData)
       return axios({
        url: hn + '/survey/surveys/',
        method: 'post',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
        data: formData,
      })
    },
    getSingleSurveyData (context, data) {
      return axios({
        url: hn + '/survey/surveys/' + data.id + '/',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
      })
    },
    postSingleSurveyData (context, data) {
      console.log(data)
      var p = parseInt(data.data[0].no_of_participants)
      var q = parseInt(data.data[0].no_of_questions)

      var formData = new FormData()
      formData.append("survey_custom_id", data.data[0].survey_custom_id)
      formData.append("survey_name", data.data[0].survey_name)
      formData.append("no_of_participants", p)
      formData.append("country", data.data[0].country)
      formData.append("notes", data.data[0].notes)
      formData.append("no_of_questions", q)
      formData.append("target_population", data.data[0].target_population)
      formData.append("start_date", data.data[0].start_date)
      formData.append("end_date", data.data[0].end_date)
      console.log(data.data[0].attachment.length)
      for(var i =0;i<data.data[0].attachment.length;i++){
        formData.append("attachment_"+i, data.data[0].attachment[i])
      }

      return axios({
        url: hn + '/survey/surveys/' + data.id + '/',
        method: 'put',
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('api_token') ,
        },
        data: formData,
      })
    },
    getPhotoData () {
      return axios({
        url: hn + '/gallery/gallery/',
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
      })
    },
    getPhotoGalleryData (context, data) {
      return axios({
        url: hn + '/gallery/image/?gallery=' + data.id,
        method: 'get',
        headers: {'Authorization': 'Token ' + localStorage.getItem('api_token') },
      })
    }
  },
  mutations: {
    getNewTopic (state, payload) {
      state.name = payload.name
      state.description = payload.description
      console.log(state.name)
      console.log(state.description)
    }
  },
  getters: {

  }
})
