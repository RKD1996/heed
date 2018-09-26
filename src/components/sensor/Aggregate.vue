 <template>
  <div>
    <sidebar></sidebar>
    <v-content>
      <v-layout row>
         <app-backBtn></app-backBtn>
      </v-layout>
    <v-container fluid>
      <v-card class="pb-5">
        
        <v-layout row>
          <v-flex xs12 md12 sm12>
            <v-card class="ml-4 mr-4 pl-4 pr-4 mb-4 pt-2" style="border:1px solid lightgrey">
          <v-layout row wrap>
            <v-flex xs12 md4 sm12>
              <v-select
                :items="metrics"
                v-model="metric"
                label="Metric"
              ></v-select>
              
            </v-flex>
            <v-flex xs12 md4 sm12>
              
            </v-flex>
            <v-flex xs12 md4 sm12 class="text-md-right">
              <v-select
                :items="time"
                v-model="vtime"
                label="Time"
              ></v-select>
              
            </v-flex>
            <v-flex xs12 sm12 md12 class="text-md-center">
              <chart-app></chart-app>
             
            </v-flex>
            <v-flex xs12 md6 sm6 class="">
              
            </v-flex>
            
            <v-flex xs12 md6 sm6 class="text-md-right pt-3 pb-3">
              <div v-show="adminUser">
                <v-dialog v-model="dialog" persistent max-width="800px">
                   <v-btn small slot="activator" color="primary" dark>Download Data</v-btn>
                     <v-card class="pl-5 pb-5">
                       
                      </v-card>
                </v-dialog>
              </div>
              
            
              
            </v-flex>
            
            </v-layout>
            </v-card>
            </v-flex>
              
            </v-layout>
       
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
import axios from 'axios'
import BackBtn from '../shared/BackRoutingBtn.vue'
import Chart from '../chart/Chart.vue'



export default{
 props:{
    type:String,
    data:''
  },
  mounted(){
    for(var i=0;i<this.data.length;i++){
      console.log(this.data[i])
    }
    console.log(this.data)
  },

  computed: {
    adminUser: function(){
      return localStorage.getItem('user_type') == 'help_admin'
    }
  },
  components: {
    "sidebar": Sidebar,
    'app-backBtn':BackBtn,
    'chart-app':Chart
  },
  data(){
    return{
      metric:'',
      vtime:'',
      dialog:false,
        
        
        metrics:['Energy Consumption','Energy Generation', 'Whether'],
        time:['Today','Week','this month']
    }
  },
  methods:{
    
    downloadCsvFile(){}
  
      
  },
  mixins:[loggedInMixin]
  
  }

</script>
