<template>
  <div class="welfar-member">
    <scroller ref="scroller"
              :on-refresh="refresh"
              :on-infinite="infinite">
      <div class="welfar-member-item" v-for="(welfar,index) in pager.data" :key="welfar.uuid" v-if="welfar.type === welfar.Type.INDIVIDUAL">
        <div class="member-item-box">
          <div class="img-box">
            <img :src="welfar.poster.getLocalUrlBySize(215, 500, require('../../../assets/gif/loading5-21.png'))"/>
            <div class="circular left"></div>
            <div class="circular right"></div>
          </div>
          <div class="title-bar" @click="openDetail(welfar)">
            <div class="ico pull-right" :class="welfar.openDetail? 'up':'down'">
              <i v-show="!welfar.openDetail" class="fa fa-angle-up"></i>
              <i v-show="welfar.openDetail" class="fa fa-angle-down"></i>
            </div>
            <div class="title">{{welfar.title}}</div>
            <div class="abstract">{{welfar.validTime | termOfValidity}}</div>
          </div>
          <div class="content" :class="welfar.openDetail? 'open':''">
            {{welfar.description}}
          </div>
          <div v-show="index!==pager.data.length-1" class="line"></div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        pager: this.$store.state.welfarPager
      }
    },
    components: {

    },
    methods: {
      openDetail(welfar) {
        welfar.openDetail = !welfar.openDetail;
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("spaceRegionalUuid", that.$store.state.currentSpaceRegionalUuid);
        this.pager.httpFastPage(function(){
          that.pager.page++;

          done();
        },function () {
          done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("spaceRegionalUuid", that.$store.state.currentSpaceRegionalUuid);
        this.pager.httpFastNextPage(function(){
          that.$refs.scroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {

        });
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .welfar-member {
    position: relative;
    height: 100%;
    width: 100%;
    margin-top: 10px;
    .welfar-member-item {
      padding: 0 20px;
      .member-item-box {
        padding: 10px 0;
        .img-box {
          position: relative;
          padding-bottom: 43%;//500 215
          border-radius: 6px;
          overflow: hidden;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
          }
          .circular {
            position: absolute;
            background: white;
            top: calc(50% - 10px);

            width: 20px;
            height: 20px;
            border-radius: 100%;
            &.left {
              left: -10px;
            }
            &.right {
              right: -10px;
            }
          }
        }
        .title-bar {
          margin-top: 19px;
          .ico {
            font-size: 24px;
            line-height: 54px;
            margin-right: 5px;
          }
          .title {
            color: #484848;
            font-size: 16px;
            line-height: 28px;
            font-weight: 600;
          }
          .abstract {
            color: #848484;
            font-size: 15px;
            line-height: 26px;
          }
        }
        .content {
          color: #848484;
          transition: 0.5s;
          height: 0;
          overflow: hidden;
          font-size: 13px;
          line-height: 16px;
          letter-spacing: 0.5px;
          padding: 0;
          &.open {
            padding: 5px 0 0 0;
            height: 48px;
          }
        }
        .line {
          margin-top: 15px;
          height: 1px;
          background: #D9DBDA;
          width: 100%;
        }
      }
    }
  }
</style>
