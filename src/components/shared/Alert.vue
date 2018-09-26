<template>
	<div>
		<div v-if="success">
			<v-alert @input="onClose" type="success" dismissible :value="true">
      		{{text}}
    	</v-alert>
		</div>
		<div v-else>
			<v-alert @input="onClose" type="error" dismissible :value="true">
      		{{text}}
    	</v-alert>
		</div>
		
	</div>
	
</template>


<script>
	export default{
		props:['text',"success"],
		data(){
			return{

			}
		},
		methods:{
			onClose(){
				this.$emit('dismissed')
			}
		}
	}
</script>