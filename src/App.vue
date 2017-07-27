<template>
  <div id="app">
    <div id="header">This is header</div>
    <div id="content">
      <router-view></router-view>
    </div>
    <div id="footer">This is footer</div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app #content{
  background-color: antiquewhite;
}

#app #header{
  font-size: 33px;
  background-color: aquamarine;
}

#app #footer{
  font-size: 33px;
  background-color: cadetblue;
}
</style>
