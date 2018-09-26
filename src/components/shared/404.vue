<template>
	<div>
		<v-container >
			<v-card class="mt-5 pt-5  pb-5">
				<v-card-text class="text-xs-center pt-5  pb-5">
				<div>
					<div>
						<h1 class=" display-3 red--text">404 ERROR</h1>
					</div>
					
					<div>
						<p class="display-2 " style="opacity:0.7;">Page Not Found <v-icon large>error</v-icon></p>
					</div>
					<div class="mt-2">
						<router-link to="/home">
							<v-btn color="primary">Back To Home</v-btn>
						</router-link>
					</div>
				</div>
			</v-card-text> 
			</v-card>
		  
		</v-container>
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		}
	}
</script>