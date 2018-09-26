<template>
	<v-btn  small @click="goBack">
      <v-icon left>arrow_back</v-icon>Back
    </v-btn>
</template>

<script>
	export default{
		methods:{
			goBack(){
				this.$router.go(-1)
			}
		}
	}
</script>