import Vue from 'vue'

const ARTICLE_API = 'articles'
const ARTICLE_PUBLISH_STATUS = 'published'

export default {
  data () {
    return {
    }
  },
  getLatestArticles (context, size) {
    let query = '?page[size]=' + size + '&filter[publishStatus]=' + ARTICLE_PUBLISH_STATUS + '&sort=-created_at'

    Vue.http.get(process.env.NODE_API_HOST + ARTICLE_API + '?' + query).then(response => {
      context.latestArticles = response.data.data
      console.log(response.data.data)
    }, response => {
      context.latestArticles = []
    })
  },
  getLatestArticlesByCategory (context, categorySlug, size) {
    let query = '?page[size]=' + size + '&filter[publishStatus]=' + ARTICLE_PUBLISH_STATUS + '&sort=-created_at' +
    '&relation_filter[category.slug]=' + categorySlug

    Vue.http.get(process.env.NODE_API_HOST + ARTICLE_API + '?' + query).then(response => {
      context.latestArticlesByCategory = response.data.data
      console.log(response.data.data)
    }, response => {
      context.latestArticles = []
    })
  },
  getArticle (context, articleId = '') {
    Vue.http.get(process.env.NODE_API_HOST + ARTICLE_API + '/' + articleId).then(response => {
      context.article = response.data.data
      let articleImages = response.data.data.images.data
      let images = []

      let self = this

      articleImages.forEach(function (element) {
        images.push(self.getArticleImageLink(articleId, element.id))
      })

      context.images = images
      context.similarProductCategorySlug = response.data.data.category.id.slug
    }, response => {
      context.article = ''
    })
  },
  getArticleImageLink (articleId, articleImageId) {
    return process.env.NODE_AWS_BUCKET_LINK + ARTICLE_API + '/' + articleId + '/' + articleImageId + '.jpg'
  }
}
