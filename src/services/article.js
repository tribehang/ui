import Vue from 'vue'

const ARTICLE_API = 'articles'
const ARTICLE_LATEST_COUNT = 10
const ARTICLE_PUBLISH_STATUS = 'published'

export default {
  data () {
    return {
    }
  },
  getLatestArticles (context) {
    let query = '?page[size]=' + ARTICLE_LATEST_COUNT + '&filter[publishStatus]=' + ARTICLE_PUBLISH_STATUS + '&sort=-created_at'

    Vue.http.get(process.env.NODE_API_HOST + ARTICLE_API + '?' + query).then(response => {
      context.latestArticles = response.data.data
      console.log(response.data.data)
    }, response => {
      context.latestArticles = []
    })
  },
  getLatestArticlesByCategory (context, categorySlug) {
    let query = '?page[size]=' + ARTICLE_LATEST_COUNT + '&filter[publishStatus]=' + ARTICLE_PUBLISH_STATUS + '&sort=-created_at' +
    '&relation_filter[category.slug]=' + categorySlug

    Vue.http.get(process.env.NODE_API_HOST + ARTICLE_API + '?' + query).then(response => {
      context.latestIphoneSevens = response.data.data
      console.log(response.data.data)
    }, response => {
      context.latestArticles = []
    })
  }
}
