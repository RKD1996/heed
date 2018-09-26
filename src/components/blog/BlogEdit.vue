<template>
  <div>
    <div>
      <v-toolbar dark color="primary">
        <v-btn icon dark to="/blog">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Post</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat dark @click="dialog = true">Preview</v-btn>
          <v-btn flat dark @click="saveDraft(title, des, content)">Save as Draft</v-btn>
          <v-btn flat dark @click="addBlogPost(title, des, content)">Submit</v-btn>
          <v-btn flat dark @click="clearBlogPost">Clear</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider></v-divider>
      <v-form ref="form">
        <v-layout row wrap class="mt-5">
          <v-flex xs5 class="ma-2">
            <v-text-field label="Post Title" id="id" v-model="title"></v-text-field>
          </v-flex>
          <v-flex xs6 class="ma-2">
            <v-text-field label="Short Description" id="id" v-model="des" counter="250" :rules="rules"></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
      <div class="ma-2">
        <label for="files">Add attachments: </label>
        <v-btn color="info" dark @click="addFiles">Add Files</v-btn>
        <input id="files" type="file" ref="files" v-show="show" multiple v-on:change="handleFilesUpload()" /><br><br>
        <div class="text-xs-right pr-5 mr-4" >
          <v-layout row wrap>
            <v-flex xs4 v-for="(file, key) in files" :key='key' style="border: 1px solid lightgrey;">
              <v-layout row wrap>
                <v-flex xs6 class="mt-2">
                  {{file.name}}
                </v-flex>
                <v-flex xs6>
                  <v-btn class="remove-file" flat color="error" @click="removeFile( key )">Remove</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </div>
      </div>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="quill-editor ma-2">
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption">
            </quill-editor>
          </div>
        </v-flex>
      </v-layout>
      <v-dialog v-model="dialog" width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{title}}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text v-html="content"></v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" flat="flat" @click="dialog = false" outline>Edit</v-btn>
            <v-btn color="green lighten-1" flat="flat" @click="dialog = false">Ok</v-btn>
          </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </template>

<script>
  import hljs from 'highlight.js'
  import VueQuillEditor, { Quill } from 'vue-quill-editor'
  //import Quill from 'quill'
  import { ImageDrop } from 'quill-image-drop-module'
  import { ImageResize } from 'quill-image-resize-module'
  import axios from 'axios'

  Quill.register('modules/imageDrop', ImageDrop)
  Quill.register('modules/imageResize', ImageResize)

  export default {

    data() {
      return {
        attach: [],
        show: false,
        title: '',
        dialog: '',
        des: '',
        content: ``,
        files: [],
        rules: [v => v.length <= 250 || 'Max 250 characters'],
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
            imageResize: true
          }
        }
      }
    },
    mounted() {
      this.progress = true
      var obj = this
      axios({
       url: this.$hostname + '/blog/blog/' + localStorage.getItem('postId'),
       method: 'get',
       headers: {'Authorization': 'Token ' + localStorage.getItem('api_token')},
      }).then(function(res) {
       console.log(res)
       obj.title = res.data.title
       obj.des = res.data.description
       obj.text = res.data.content
       obj.progress = false
       obj.content = obj.text
       obj.attach = res.data.attachments
      })
    },
    computed: {
      contentCode() {
        return hljs.highlightAuto(this.content).value
      },
    },
    methods: {
      handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
        }
      },
      addFiles(){
        this.$refs.files.click();
      },
      removeFileFromServer(file, key ) {
        console.log(file+" :: "+ key );
      },
      removeFile( key ) {
        this.files.splice( key, 1 );
      },
      addBlogPost (title, des, body) {
        var i
        var formData = new FormData()
        formData.append('title',title)
        formData.append('description', des)
        formData.append('content', body)
        formData.append('blog_status', 1)
        for (i = 0; i< this.files.length; i++) {
          formData.append('attachment_' + i, this.files[i])
        }
        var obj = this
        axios({
        url: this.$hostname + '/blog/blog/' + localStorage.getItem('postId')+'/',
        method: 'put',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('api_token')
        },
        data: formData
      }).then(function(res) {
        obj.progress = false
        obj.$router.push("/blog/blogpost")
      })
  },
  saveDraft (title, des, body) {
    // console.log(title)
    // console.log(des)
    // console.log(body)
    var i
    var formData = new FormData()
    formData.append('title',title)
    formData.append('description', des)
    formData.append('content', body)
    formData.append('blog_status', 0)
    for (i = 0; i< this.files.length; i++) {
      formData.append('attachment_' + i, this.files[i])
    }
    var obj = this
    axios({
      url: this.$hostname + '/blog/blog/'+ localStorage.getItem('postId')+'/',
      method: 'put',
      headers: {
        'Authorization': 'Token ' + localStorage.getItem('api_token')
      },
      data: formData
    }).then(function(res) {
      obj.progress = false
      obj.$router.push("/blog")
    })
  },
  clearBlogPost () {
    this.$refs.form.reset()
    this.content = ''
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
