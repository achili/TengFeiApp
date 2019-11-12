<template>
  <div class="swiperContainer">

    <div @touchstart.stop.prevent="blank"
         @touchmove.stop.prevent="blank"
         @mousedown.prevent="blank">
      <wc-swiper ref="swiper" class="swiperList">
        <wc-slide v-for="url in urlList" :key="url.index">
          <div class="img-box">
            <div class="img" :style="'background: url(\''+url+'\') center;'" style="margin: 0 auto;"></div>
          </div>
        </wc-slide>
      </wc-swiper>
    </div>
    <div class="swiper-text" v-for="item in introduce" :key="item.name" v-if="item.name === $store.state.currentSpaceRegionalAddress">
      <div class="EF title">{{item.title}}</div>
      <p class="EF">{{item.introduce}}</p>
    </div>

  </div>

</template>

<script>
    import Tank from "../../../common/model/tank/Tank";

    export default {
      data() {
        return {
          urlList: []
        }
      },
      props:{
        bannerlist:{

        },
        TypeIndex:{

      },
        introduce:{

        }
      },
      components: {

      },
      methods: {
        blank() {},
        goBook(e){
          this.$router.openActivity(e,"")
        },
        getUrl(iiii) {
          if(iiii instanceof Tank) {
            iiii.keepLocal(600, 700, iiii.getUrlBySize(600, 700));
            return iiii.getLocalUrlBySize(600, 700, iiii.getUrlBySize(600, 700));
          } else {
            return iiii.url;
          }
        }
      },
      mounted(){
        this.bannerlist.forEach(e => {
          this.urlList.push(this.getUrl(e));
        })
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .swiperContainer{
    width: 100%;
    .img-box {
      height: 100%;
      width: 100%;
      .img {
        height: 100%;
        width: 100%;
        background-size: cover!important;
      }
    }

    .swiperList{
      width: 100%;
      height: 300px
    }
    .swiper-text{

      .EF{
        width: 90%;
        text-align: left;
        font-size: 16px;
        margin-left: 5%;
        margin-top: 8px;
        line-height:1.5
      }
      .title{
        font-size: 20px;
        margin-top: 20px;
      }

    }
    .wc-slide {
      z-index: 0!important;
    }



  }

</style>
