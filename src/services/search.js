import Vue from 'vue'

const ARTICLE_API = 'articles'
const ARTICLE_PUBLISH_STATUS = 'published'

export default {
  data () {
    return {
    }
  },
  execute (context, data) {
    let params = jQuery.param(data)
    let size = 100
    let query = 'page[size]=' + size + '&filter[publishStatus]=' + ARTICLE_PUBLISH_STATUS + '&'

    Vue.http.get(process.env.NODE_API_HOST + ARTICLE_API + '?' + query + params).then(response => {
      context.articles = response.data.data
    }, response => {
      context.articles = []
    })
  }
}
