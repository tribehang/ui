<template>
    <div class="container" >
        <div class="search-box" id="sticky" v-sticky="{ zIndex: 1, stickyTop: 0 }">
            <div>
                <search-box></search-box>
            </div>
        </div>

        <div v-for="article in articles" :key="article.id" class="row">
            <div class="col-md-3">
                <div style="text-align: center">
                    <img src="../assets/images/product.png"/>
                </div>
            </div>

            <div class="col-md-9">
                <div class="pro-ttl">
                    <a :href="getArticleLink(article.id)">{{article.category.data.name}}</a>
                </div>
                <div class="f-width pro-time">
                    <i class="fa fa-clock-o"></i>
                    <span class="bold black"> : </span><span v-translate>YEAR</span>
                    <span>{{article.createYear}}</span>
                </div>
                <div class="f-width pro-price">
                    <i class="fa fa-money"></i>
                    <span class="bold black">قیمت :</span>
                    <span>{{article.price}}</span> <span>تومان</span>
                </div>
                <div class="f-width pro-buy-more">
                    <a :href="getArticleLink(article.id)" class="pro-more" v-translate>MORE_INFORMATION</a>
                    <a :href="getArticleLink(article.id)" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                </div>
            </div>
        </div>
  </div>
</template>

<script>

import search from '../services/search'
import SearchBox from '@/components/SearchBox'
import VueSticky from 'vue-sticky'

export default {
  components: {
    'search-box': SearchBox
  },
  directives: {
    'sticky': VueSticky
  },
  name: 'Search',
  data () {
    return {
      articles: []
    }
  },
  mounted () {
    search.execute(this, this.$route.query)
  },
  methods: {
    getArticleLink (itemId) {
      return '/article/' + itemId
    }
  }
}
</script>

<style scoped>
    .row {
        border: 1px solid #9a9797;
        margin: 10px 0px;
        padding: 10px;
    }

    .search-box{
        background: #FFF;
        padding: 35px 25px 1px 0px;
        border: 1px solid #CCC;
        margin-bottom: 20px;
    }
</style>
