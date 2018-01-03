<template>
  <div id="app">
      <div v-if="this.$route.name !== 'Home'">
        Test
      </div>
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    beforeMount () {
    }
  }
</script>


<style scoped>

</style>
