<template>
    <div>
        <a href="/" v-translate>HOME</a>
        <a><i class="fa fa-angle-left" aria-hidden="true"></i></a>
        <a :href="path">{{title}}</a>
  </div>
</template>

<script>

export default {
  name: 'Breadcrumbs',
  props: {
    'title': {'default': '', String},
    'path': {'default': '#', String}
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
