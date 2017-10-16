<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12 product-head">
                    <h4><i class="fa fa-mobile fa-2x" aria-hidden="true"></i> گوشی موبایل اپل مدل ۷s </h4>
                </div>
            </div>
            <div class="row product-details">
                <div class="col-md-4 product-images">
                    <gallery :images="images" :index="index" @close="index = null"></gallery>
                    <div
                            class="image"
                            :title="hhhhh"
                            v-for="image, imageIndex in images"
                            @click="index = imageIndex"
                            :style="{ backgroundImage: 'url(' + image + ')', width: '93px', height: '93px' }"
                    ></div>
                </div>
                <div class="col-md-8">
                    <h4>گوشی موبایل اپل مدل ۷s</h4>
                    <div class="row">
                        <div class="col-md-6">
                            <i class="fa fa-question-circle-o"></i>
                            <strong  v-translate>STATUS</strong>:
                            <span>کارکرده - سالم</span>
                        </div>
                        <div class="col-md-6">
                            <i class="fa fa-clock-o"></i>
                            <strong  v-translate>SALE_USAGE_IN_MONTHS</strong>:
                            <span>۲ سال و ۶ ماه </span>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <i class="fa fa-gg"></i>
                            <strong  v-translate>PRICE</strong>:
                            <span>۱,۸۰۰,۰۰۰ تومان </span>
                        </div>
                    </div>

                </div>
            </div>
            <div class="row product-attributes">
                <h4 v-translate>PRODUCT_DETAILS_ATTRIBUTES</h4>

                <ul>
                    <li><strong>رنگ :</strong> <span>مشکی</span></li>
                    <li><strong>رزولوشن عکس :</strong> <span>۱۲ مگا پیکسل</span></li>
                    <li><strong>اقلام همراه گوشی :</strong> <span>شارژر, هندزفری</span></li>
                    <li><strong>حافظه داخلی :</strong> <span>۳۲ گیگا بایت </span></li>
                    <li><strong>مقدار رم :</strong> <span>۲ گیگا بایت </span></li>
                    <li><strong>تعداد سیم کارت :</strong> <span>تک سیم کارت</span></li>
                </ul>
            </div>
            <div class="row">
                <button type="button" class="button buttonorng">
                    <a href="/profile" v-translate>BUY_PRODUCT</a>
                </button>
            </div>
        </div>

        <div class="container" style="padding: 20px 50px">
            <div class="row">
                <div class="col-md-12 product-head">
                    <h4 v-translate><i class="fa fa-mobile fa-2x" aria-hidden="true"></i>SIMILAR_PRODUCTS</h4>
                </div>
            </div>

            <div class="row">
                <section class="center slider">
                    <slick ref="slick" :options="slickOptions">
                        <div class="f-width pro-cart">
                            <div class="f-width pro-pic">
                                <img src="../assets/images/product.png" height="100" width="75"/></div>
                            <div class="f-width pro-ttl">
                                <a href="#">گوشي موبايل اپل مدل iPhone 6s ظرفيت 64 گيگابايت</a>
                            </div>
                            <div class="f-width pro-time">
                                <i class="fa fa-clock-o"></i>
                                <span class="bold black">کارکرد : </span>
                                <span>1 سال</span>
                            </div>
                            <div class="f-width pro-price">
                                <i class="fa fa-money"></i>
                                <span class="bold black">قیمت :</span>
                                <span>1350000 تومان</span>
                            </div>
                            <div class="f-width pro-buy-more">
                                <a href="#" class="pro-more">توضیحات بیشتر</a>
                                <a href="" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                        <div class="f-width pro-cart">
                            <div class="f-width pro-pic">
                                <img src="../assets/images/product.png" height="100" width="75"/></div>
                            <div class="f-width pro-ttl">
                                <a href="#">گوشي موبايل اپل مدل iPhone 6s ظرفيت 32 گيگابايت</a>
                            </div>
                            <div class="f-width pro-time">
                                <i class="fa fa-clock-o"></i>
                                <span class="bold black">کارکرد : </span>
                                <span>1 سال</span>
                            </div>
                            <div class="f-width pro-price">
                                <i class="fa fa-money"></i>
                                <span class="bold black">قیمت :</span>
                                <span>1350000 تومان</span>
                            </div>
                            <div class="f-width pro-buy-more">
                                <a href="#" class="pro-more">توضیحات بیشتر</a>
                                <a href="" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                        <div class="f-width pro-cart">
                            <div class="f-width pro-pic">
                                <img src="../assets/images/product.png" height="100" width="75"/></div>
                            <div class="f-width pro-ttl">
                                <a href="#">گوشي موبايل اپل مدل iPhone 6s ظرفيت 32 گيگابايت</a>
                            </div>
                            <div class="f-width pro-time">
                                <i class="fa fa-clock-o"></i>
                                <span class="bold black">کارکرد : </span>
                                <span>1 سال</span>
                            </div>
                            <div class="f-width pro-price">
                                <i class="fa fa-money"></i>
                                <span class="bold black">قیمت :</span>
                                <span>1350000 تومان</span>
                            </div>
                            <div class="f-width pro-buy-more">
                                <a href="#" class="pro-more">توضیحات بیشتر</a>
                                <a href="" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                        <div class="f-width pro-cart">
                            <div class="f-width pro-pic">
                                <img src="../assets/images/product.png" height="100" width="75"/></div>
                            <div class="f-width pro-ttl">
                                <a href="#">گوشي موبايل اپل مدل iPhone 6s ظرفيت 32 گيگابايت</a>
                            </div>
                            <div class="f-width pro-time">
                                <i class="fa fa-clock-o"></i>
                                <span class="bold black">کارکرد : </span>
                                <span>1 سال</span>
                            </div>
                            <div class="f-width pro-price">
                                <i class="fa fa-money"></i>
                                <span class="bold black">قیمت :</span>
                                <span>1350000 تومان</span>
                            </div>
                            <div class="f-width pro-buy-more">
                                <a href="#" class="pro-more">توضیحات بیشتر</a>
                                <a href="" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                        <div class="f-width pro-cart">
                            <div class="f-width pro-pic">
                                <img src="../assets/images/product.png" height="100" width="75"/></div>
                            <div class="f-width pro-ttl">
                                <a href="#">گوشي موبايل اپل مدل iPhone 6s ظرفيت 32 گيگابايت</a>
                            </div>
                            <div class="f-width pro-time">
                                <i class="fa fa-clock-o"></i>
                                <span class="bold black">کارکرد : </span>
                                <span>1 سال</span>
                            </div>
                            <div class="f-width pro-price">
                                <i class="fa fa-money"></i>
                                <span class="bold black">قیمت :</span>
                                <span>1350000 تومان</span>
                            </div>
                            <div class="f-width pro-buy-more">
                                <a href="#" class="pro-more">توضیحات بیشتر</a>
                                <a href="" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                        <div class="f-width pro-cart">
                            <div class="f-width pro-pic">
                                <img src="../assets/images/product.png" height="100" width="75"/></div>
                            <div class="f-width pro-ttl">
                                <a href="#">گوشي موبايل اپل مدل iPhone 6s ظرفيت 32 گيگابايت</a>
                            </div>
                            <div class="f-width pro-time">
                                <i class="fa fa-clock-o"></i>
                                <span class="bold black">کارکرد : </span>
                                <span>1 سال</span>
                            </div>
                            <div class="f-width pro-price">
                                <i class="fa fa-money"></i>
                                <span class="bold black">قیمت :</span>
                                <span>1350000 تومان</span>
                            </div>
                            <div class="f-width pro-buy-more">
                                <a href="#" class="pro-more">توضیحات بیشتر</a>
                                <a href="" class="pro-buy"><i class="fa fa-shopping-cart"></i></a>
                            </div>
                        </div>
                    </slick>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
  require('slick-carousel/slick/slick.css')
  require('slick-carousel/slick/slick-theme.css')

  import Slick from 'vue-slick'
  import VueGallery from 'vue-gallery'

  export default {
    components: { Slick, 'gallery': VueGallery },
    data () {
      return {
        images: [
          'https://images-na.ssl-images-amazon.com/images/I/41lOzhRNJML._SL500_AC_SS350_.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/41-%2BZWF2ADL._SL500_AC_SS350_.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/416V6IJmaWL._SL500_AC_SS350_.jpg',
          'https://images-na.ssl-images-amazon.com/images/I/41wZGEqrqZL._SL500_AC_SS350_.jpg'
        ],
        index: null,
        slickOptions: {
          dots: true,
          slidesToShow: 5
        }
      }
    },
    methods: {
    }

  }
</script>

<style scoped>
    .container {
        background-color: #ffffff;
        margin-bottom: 20px;
        padding: 30px;
        box-shadow: 2px 2px 6px #CCC;
        padding-top: 10px;
    }

    .product-images {
        text-align: center;
    }

    .product-images .image{
        display: block;
        float: right;
        margin-right:10px;
        background-size: 100%;
        margin-top: 10px;
        cursor: pointer;
    }

    .product-images > div:nth-of-type(2){
        width: 300px !important;
        height: 300px !important;
        margin-bottom:5px;
        margin-top: 0px;
    }

    .product-attributes h4{
        background-image: linear-gradient(to right, #ccc 33%, rgba(151, 32, 32, 0) 0%);
        background-position: bottom;
        background-size: 17px 2px;
        background-repeat: repeat-x;
        padding-bottom: 10px;
        font-size: 16px;
        color: #ed8324;
    }

    .product-attributes ul{
        list-style: none;
        padding: 0;
        -webkit-column-count: 2;
        -moz-column-count: 2;
        column-count: 2;
        -webkit-column-gap: 60px;
        -moz-column-gap: 60px;
        column-gap: 60px;
    }

    .product-attributes ul li{
        margin-bottom: 10px;
        margin-right: 15px;
    }

    .product-attributes ul li::before{
        content: "\2022";
        color: #ed8324;
        display: inline-block;
        width: 2em;
        margin-left: -59px;
        font-size: 40px;
        vertical-align: middle;
        line-height: 0px;
        bottom: -4px;
        position: relative;
    }

    .product-head h4{
        border-bottom: 3px solid #ed8324;
        padding-bottom: 10px;
        margin-bottom: 25px;
    }

    .product-details {
        margin-bottom: 25px;
    }

    .product-details h4{
        font-size: 20px;
        color: #0090ff;
        margin-bottom: 15px;
    }

    .button{
        width: 15%;
        float: left;
        margin-left: 45px;
    }
</style>
