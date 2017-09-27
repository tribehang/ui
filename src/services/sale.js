import auth from '../auth'
import Vue from 'vue'

const SALE_MAIN_CATEGORIES_API = 'categories?filter[active]=1&filter[parent_id]='
const SALE_SUB_CATEGORIES_API = 'categories?filter[active]=1&filter[parent_id]='

export default {
  data () {
    return {
      availableCreationYears: [
        {title: '۲۰۱۰', value: 2010},
        {title: '۲۰۱۱', value: 2011},
        {title: '۲۰۱۲', value: 2012},
        {title: '۲۰۱۳', value: 2013},
        {title: '۲۰۱۴', value: 2014},
        {title: '۲۰۱۵', value: 2015},
        {title: '۲۰۱۶', value: 2016},
        {title: '۲۰۱۷', value: 2017}
      ],
      availableConditions: [
        {title: 'سالم', value: 'salem'},
        {title: 'در حد سالم', value: 'dar hade salem'},
        {title: 'خراب', value: 'kharab'}
      ]
    }
  },
  getCategories (context) {
    Vue.http.get(process.env.NODE_API_HOST + SALE_MAIN_CATEGORIES_API, {'headers': auth.getAuthHeader()}).then(response => {
      context.categories = response.data.data
    }, response => {
      context.categories = []
    })
  },
  getSubCategories (context, $subCategoryId = 'none') {
    Vue.http.get(process.env.NODE_API_HOST + SALE_SUB_CATEGORIES_API + $subCategoryId, {'headers': auth.getAuthHeader()}).then(response => {
      context.subCategories = response.data.data
    }, response => {
      context.categories = []
    })
  },
  getCategoryAttributes (context, $categoryId = 'none') {
    Vue.http.get(process.env.NODE_API_HOST + 'categories/' + $categoryId + '?include=attributes', {'headers': auth.getAuthHeader()}).then(response => {
      context.attributes = response.data.data.attributes.data
      var attributes = []
      $.each(response.data.data.attributes.data, function (index, value) {
        attributes[index] = {
          id: value.id,
          value: '',
          name: value.name
        }
      })
      context.selectedAttributes = attributes
    }, response => {
      context.categories = []
    })
  },
  addItem (context) {
    var data = {
      'category_id': context.selectedSubCategory.id,
      'condition': this.data().availableConditions[context.selectedConditionIndex].value,
      'createYear': this.data().availableCreationYears[context.selectedYearIndex].value,
      'usageInMonths': 10,
      'category_attributes': context.selectedAttributes
    }
    Vue.http.post(process.env.NODE_API_HOST + 'sales', data, {'headers': auth.getAuthHeader()}).then(response => {
      if (response.status === 201) {
        this.addImages(context, response.data.data.id)
      }
      console.log(response.status)
    }, response => {
      console.log('sale creation failed...')
    })
  },
  addImages (context, $saleId) {
    var data = {
      'sale_id': $saleId,
      'images': [
        context.imageUploadBase64
      ]
    }
    Vue.http.post(process.env.NODE_API_HOST + 'sale_images', data, {'headers': auth.getAuthHeader()}).then(response => {
      if (response.status === 201) {
        context.clickOneMySales()
      }
    }, response => {
      console.log('sale image creation failed...')
    })
  }
}