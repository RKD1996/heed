<template>
  <div>
    <sidebar></sidebar>
    
    <v-content>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 md12 sm10
           class="text-xs-center text-sm-center text-md-center text-lg-center">
           <v-card class="pl-4 pr-3">
            <h2 style="opacity:0.7">{{title}} for {{this.id}}</h2>

            <v-card-title primary-title>
              <div>
                
                <div>
                  <input type="file" ref="file" accept=".csv" id="csv_file" name="csv_file" class="form-control" @change="loadCSV($event)">
                </div>
              </div>
            </v-card-title>
            
              <v-card class="tableData" v-if="explorer">
                <table v-if="parse_csv" class="table12345">
                  <thead>
                    <tr>
                      <th v-for="key in parse_header" class="th" 
                         >
                        {{ key | capitalize }}
                        <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                        </span>
                      </th>
                    </tr>
                  </thead> 
                  <tr v-for="csv in parse_csv" class="tr">
                    <td v-for="key in parse_header" class="td">
                      {{csv[key]}}
                    </td>
                  </tr>
              </table>
              </v-card>
             <v-card-actions class="pt-4 pb-4">
                <v-btn  
                  color="primary"
                  @click="uploadFile"
                  :disabled="!valid"
                  >Upload</v-btn>
                <v-btn  
                  color="primary"
                  @click="explorer=!explorer"

                >Hide</v-btn>
              </v-card-actions>
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
        title: "CSV File ",
        file:'',
        explorer:true,
        valid:false,
        channel_name: '',
        channel_fields: [],
        channel_entries: [],
        parse_header: [],
        parse_csv: [],
        sortOrders:{},
        sortKey: ''

        }),
  mixins:[loggedInMixin],
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
},
  methods:{
      
    loadCSV(e) {
      // Validating csv File
      var fileInput = document.getElementById('csv_file');
      var filePath = fileInput.value;
      var allowedExtensions = /(\.csv)$/i;
      if(!allowedExtensions.exec(filePath)){
        alert('Please upload .csv files  only.');
        fileInput.value = '';
        return false;
    }


      this.valid=true
      this.file = this.$refs.file.files[0];

      var vm = this
      
    },
    explorerBtn(){
      this.explorer=false
    },
    uploadFile(){
      let f=this.file
      if (f) {
       alert("File Uploading axios API Called :  "+f+" With Survey Id : "+this.id)

      }else{
        this.valid=false
        alert("Please Select File")

      }
    }
  }
}
</script>
<style>
  .table12345 {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.td, .th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.tr:nth-child(even) {
  background-color: #dddddd;
}
.tableData{
  max-height:430px;
  overflow:auto;
}
</style>
