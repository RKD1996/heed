<template>
  <v-layout row justify-center>
    <v-dialog v-model="progress" persistent max-width="300">
      <v-card>
        <v-card-text class="text-xs-center">
          <v-progress-circular indeterminate color="red"></v-progress-circular>
          <span class="ml-4 title">Please Wait</span>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ['progress'],
  data () {
    return {
    }
  }
}
</script>
