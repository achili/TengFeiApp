<template>
  <div class="index-news-list">
    <scroller ref="newsScroller"
              :on-refresh="refresh"
              :on-infinite="infinite">
      <div class="list-box">
        <div v-for="news in pager.data" :key="news.uuid" class="activity-item" @click.stop="openDetail(news, $event)">
          <div class="item-img">
            <img :src="news.poster.getLocalUrlBySize(525, 700, require('../../../assets/gif/loading7-5.png'))"/>
          </div>
          <div class="title">
            {{news.title}}
          </div>
          <div class="date">
            {{news.createTime | newsTime}}
          </div>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Pager from "../../../common/model/_base/Pager";
  import CommunityNews from "../../../common/model/community/CommunityNews";

  export default {
    data() {
      return {
        pager: this.$store.state.newsPager
      }
    },
    props: {
      openNewsDetail: {
        type: Function
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
      openDetail(news, e) {
        news.top = e.pageY - e.offsetY;
        this.openNewsDetail(news);
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
            data.poster.keepLocal(525, 700);
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
          that.$refs.newsScroller.finishInfinite(true);
        }, function () {
          done();
        }, function () {
          done();
        }, function (pager) {
          pager.data.forEach(data => {
            data.poster.keepLocal(525, 700);
          });
        });
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .index-news-list {
    position: relative;
    height: 100%;
    background: white;
    .list-box {
      margin-top: 8px;
      background: white;
      padding: 10px 20px 20px 20px;
      .activity-item {
        margin-bottom: 12px;
        border-radius: 8px;
        box-shadow:0 0 3px rgba(48,48,48,.3);
        padding-bottom: 12px;
        .item-img {
          position: relative;
          padding-bottom: 75%;
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
          overflow: hidden;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: auto;
          }
        }
        .title {
          color: #484848;
          margin-top: 13px;
          padding: 0 18px;
          font-size: 16px;
        }
        .date {
          color: #8C8C8C;
          margin-top: 10px;
          padding: 0 18px;
          font-size: 12px;
        }
      }
    }

  }
</style>

