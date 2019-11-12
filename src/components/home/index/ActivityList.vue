<template>
  <div class="index-activity-list">
    <scroller ref="activityScroller"
              :on-refresh="refresh"
              :on-infinite="infinite">
      <div class="list-box">
        <div v-for="(activity,index) in pager.data" :key="activity.uuid" class="activity-item" :style="index==pager.data.length-1?'border-bottom:1px white':''">
          <div class="item-img" @click.stop="openDetail(activity)">
            <img :src="activity.poster.getLocalUrlBySize(300, 700, require('../../../assets/gif/loading7-3.png'))"/>
          </div>
          <div class="bar-ico pull-right">
            <i class="fa fa-angle-right"></i>
          </div>
          <div class="bottom-bar" @click.stop="openDetail(activity)">
            <div class="bar-date">
              <div class="date-month">
                {{activity.startTime | monthTime}}
              </div>
              <div class="date-day">
                {{activity.startTime | dayTime}}
              </div>
            </div>
            <div class="bar-content">
              <div class="content-title">
                {{activity.title}}
              </div>
              <div class="content-address">
                {{activity.address.address}}
              </div>
            </div>
          </div>


        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Pager from "../../../common/model/_base/Pager";
  import CommunityEvents from "../../../common/model/community/CommunityEvents";

  export default {
    data() {
      return {
        pager: this.$store.state.activityPager
      }
    },
    components: {
    },
    watch:{
      '$store.state.currentSpaceRegionalAddress'(){
        this.refresh();
      }
    },
    methods: {
      openDetail(activity) {
        this.$router.openActivity("activity_detail", "slide-left", {uuid: activity.uuid});
      },
      refresh(done) {
        let that = this;
        this.pager.page = 0;
        this.pager.setFilterValue('deleted', false);
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("spaceRegionalUuid", that.$store.state.currentSpaceRegionalUuid);
        this.pager.httpFastPage(function(){
          that.pager.page++;
          that.pager.data.forEach(data => {
            data.poster.keepLocal(300, 700);
          });
          done();
        },function () {
          done();
        });
      },
      infinite(done) {
        let that = this;
        this.pager.setFilterValue('deleted', false);
        this.pager.setFilterValue("orderCreateTime", "DESC");
        this.pager.setFilterValue("spaceRegionalUuid", that.$store.state.currentSpaceRegionalUuid);
        this.pager.httpFastNextPage(function(){
          that.$refs.activityScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {
          pager.data.forEach(data => {
            data.poster.keepLocal(300, 700);
          });
        });
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .index-activity-list {
    position: relative;
    height: 100%;
    background: white;
    .list-box {
      margin-top: 8px;
      background: white;
      padding: 0 20px 20px 20px;
      .activity-item {
        padding: 20px 0 10px 0;
        border-bottom: 1px solid #D7DCDD;
        margin-bottom: 10px;
        .item-img {
          position: relative;
          padding-bottom: 43%;
          border-radius: 8px;
          overflow: hidden;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
          }
        }
        .bar-ico {
          margin-top: 30px;
          padding-right: 10px;
          color: #484848;
          font-size: 24px!important;
        }
        .bottom-bar {
          display: flex;
          padding: 20px 5px;
          .bar-date {
            .date-month {
              color: #CE0058;
              font-size: 13px;
              min-width: 29px;
            }
            .date-day {
              text-align: center;
              margin-top: 2px;
              color: #484848;
              font-size: 18px;
              font-weight: 500;
            }
          }
          .bar-content {
            margin-left: 21px;
            .content-title {
              color: #484848;
              font-weight: 600;
              font-size: 18px;
              line-height: 19px;
            }
            .content-address {
              margin-top: 4px;
              font-size: 15px;
              color: #8C8C8C;
            }
          }

        }
      }
    }

  }
</style>

