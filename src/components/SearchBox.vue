<template>
    <div>

        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <select v-model="selectedCategory" class="form-control" v-on:change="changeSubCategories">
                        <option value="undefined" selected v-translate>دسته بندی</option>
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-8">
                <div class="form-group">
                    <vue-slider width="90%" ref="slider" v-model="priceRange" :formatter="formatter" :max="maxPrice" :bgStyle="bgStyle" :interval="100000"></vue-slider>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <select v-model="selectedSubCategory" class="form-control">
                        <option value="undefined" v-translate>PLEASE_CHOOSE_SUB_CATEGORY</option>
                        <option v-for="subCategory in subCategories" :value="subCategory.id">{{ subCategory.name }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-8">
                <div class="form-group">
                    <vue-slider width="90%" tooltip="hover" :piecewiseStyle="piecewiseStyle" :style="style" ref="slider2" :piecewise="piecewise" :piecewiseLabel="piecewiseLabel" :data="creationYears" v-model="firstYear" :bgStyle="bgStyle"></vue-slider>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <select v-model="selectedCondition" class="form-control">
                        <option value="undefined" v-translate="">PLEASE_CHOOSE_CONDITION</option>
                        <option v-for="(condition, index) in conditions" :value="condition.value">{{ condition.title }}</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <button v-on:click="search()" type="button" class="btn btn-success" v-translate style="float: right;">SEARCH</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import sale from '../services/sale'
import vueSlider from 'vue-slider-component'

export default {
  name: 'SearchBox',
  components: {
    vueSlider
  },
  data () {
    return {
      piecewise: true,
      piecewiseLabel: true,
      firstYear: [parseInt(this.$route.query['createYear[min]']), parseInt(this.$route.query['createYear[max]'])],
      creationYears: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
      style: {
        'marginLeft': '10%'
      },
      piecewiseStyle: {
        'backgroundColor': '#ccc',
        'visibility': 'visible',
        'width': '12px',
        'height': '12px'
      },
      priceRange: [this.$route.query['price[min]'], this.$route.query['price[max]']],
      maxPrice: 5000000,
      multiplier: 100000,
      show: false,
      formatter: '{value} تومان',
      bgStyle: {
        'backgroundColor': '#fff',
        'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
      },
      categories: [],
      subCategories: [],
      selectedCategory: this.$route.query.category,
      selectedSubCategory: this.$route.query['filter[category_id]'],
      selectedCondition: this.$route.query['filter[condition]'],
      conditions: sale.data().availableConditions
    }
  },
  mounted () {
    sale.getCategories(this)
    if (this.$route.query.category !== 'undefined') {
      sale.getSubCategories(this, this.$route.query.category)
    }

    if (this.$route.name === 'Home') {
      this.firstYear = [2012, 2016]
      this.priceRange = [1000000, 3000000]
    }
  },
  methods: {
    changeSubCategories () {
      sale.getSubCategories(this, this.selectedCategory)
    },
    search () {
      let minPrice = this.$refs.slider.getIndex()[0] * this.multiplier
      let maxPrice = this.$refs.slider.getIndex()[1] * this.multiplier
      let price = 'price[min]=' + minPrice + '&price[max]=' + maxPrice
      let minCreateYear = this.creationYears[this.$refs.slider2.getIndex()[0]]
      let maxCreateYear = this.creationYears[this.$refs.slider2.getIndex()[1]]
      let createYear = '&createYear[min]=' + minCreateYear + '&createYear[max]=' + maxCreateYear
      let category = (this.selectedCategory === undefined || this.selectedCategory === undefined) ? '' : '&category=' + this.selectedCategory
      let subCategory = (this.selectedSubCategory === 'undefined' || this.selectedSubCategory === undefined) ? '' : '&filter[category_id]=' + this.selectedSubCategory
      let condition = (this.selectedCondition === 'undefined' || this.selectedCondition === undefined) ? '' : '&filter[condition]=' + this.selectedCondition

      window.location.href = '/search?' + price + createYear + category + subCategory + condition
    }
  }
}
</script>

<style scoped>
    .row{
        margin-bottom: 20px;
        margin-top: 25px;
    }

    .row .col-md-3{
        margin-right: 30px;
    }
</style>
