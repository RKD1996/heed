 <template>
 	<v-snackbar
                v-model="snackbar"
                absolute
                top
                right
                color="success"
                >
                <span>API Updated successful!</span>
                <v-icon dark>check_circle</v-icon>
</v-snackbar>
 </template>
 <script>
 	export default{
 		data(){
 			return{
 				snackbar:true
 			}
 		}
 	}
 </script>