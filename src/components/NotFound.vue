<template>
  <div class="container">
    <ul class="not-fount-columns">
      <li>
        <div class="row">
          <h3 v-translate>404_TITLE</h3>
          <p>
            <a href="#" class="fa fa-facebook-square fa-3x" aria-hidden="true"></a>
            <a href="#" class="fa fa-instagram fa-3x" aria-hidden="true"></a>
            <a href="#" class="fa fa-telegram fa-3x" aria-hidden="true"></a>
          </p>
        </div>
      </li>
      <li>
        <div class="row">
          <span>404</span>
          <h4 v-translate>404_MESSAGE</h4>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
  .not-fount-columns {
    list-style: none;
    padding: 0;
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
    -webkit-column-gap: 60px;
    -moz-column-gap: 60px;
    column-gap: 60px;
    -webkit-column-rule: 1px solid #CCCBCB;
    -moz-column-rule: 1px solid #CCCBCB;
    column-rule: 1px solid #CCCBCB;
  }

  .not-fount-columns li {
    text-align: center;
  }

  .not-fount-columns li:nth-child(1) .row h3{
    margin-bottom:30px;
  }

  .not-fount-columns li:nth-child(1) .row p a{
    margin-left:20px;
  }

  .not-fount-columns li:nth-child(2) .row span{
    font-size: 150px;
  }

  .not-fount-columns li:nth-child(2) .row h4{
    font-size:25px;
  }

  .fa-instagram {
    background: none !important;
  }
</style>
