<template>
  <div class="news-dtail">
    <div class="dtila-box" ref="box"
         :class="dtailNews.showDetail? 'show-detail':''"
         :style="'top:' + dtailNews.top + 'px'">
      <NbExpanding>
        <div class="detail-title" v-show="dtailNews.showDetail">
          <div class="title-bar">
            <div class="close-ico" @click.stop="oooo"></div>
            <div class="title-bar-text">详情</div>
            <div class="title-bar-share" @click.stop="openShare"></div>
          </div>
          <div class="title-text">{{dtailNews.title}}</div>
          <div class="title-date">{{dtailNews.createTime | newTime}}</div>
        </div>

      </NbExpanding>

      <div class="activity-item" @click.prevent='openUrlTag($event)'>
        <div class="item-img">
          <img :src="dtailNews.poster.getLocalUrlBySize(525, 700)"/>
        </div>
        <div class="title animated" :class="dtailNews.showDetail? 'fadeOut':'fadeIn'" v-show="!dtailNews.showDetail">
          {{dtailNews.title}}
        </div>
        <div class="date animated fadeIn" :class="dtailNews.showDetail? 'fadeOut':'fadeIn'" v-show="!dtailNews.showDetail">
          {{dtailNews.createTime | newsTime}}
        </div>

        <NbExpanding>
          <div class="content" id="news-detail-content" v-show="dtailNews.showDetail" refs="content-height">
            <div class="dtail-news-html" v-show="!dtailNews.loading" v-html="dtailNews.content"></div>

            <div class="seize-seat"  v-show="dtailNews.loading">
              <span><i class="fa fa-spinner fa-spin fa-fw"></i>加载中...</span>
            </div>
          </div>
        </NbExpanding>
      </div>

    </div>
  </div>
</template>

<script>
  import CommunityNews from "../../../common/model/community/CommunityNews";
  import NbExpanding from "../../widget/NbExpanding";
  import CommunityEvents from "../../../common/model/community/CommunityEvents";
  import $ from "jquery";

  export default {
    components: {NbExpanding},
    data() {
      return {
        communityNews: new CommunityNews()
      }
    },
    props: {
      closeCall: {
        type: Function
      },
      dtailNews: {
        type: CommunityNews
      }
    },
    watch: {

    },
    methods: {
      openUrlTag(event){
        if(event.target.nodeName === 'A'){
          this.$router.openActivity('wc_list_details',"slide-left",{enclosureUrl:event.target.href});
        }else if(event.target.nodeName === 'FONT'){
          if(event.target.parentNode.parentNode.nodeName === 'A'){
            this.$router.openActivity('wc_list_details',"slide-left",{enclosureUrl:event.target.parentNode.parentNode.href});
          }else {
            return false
          }
        }
      },
      oooo() {
        this.dtailNews.showDetail = !this.dtailNews.showDetail;
        let that = this;
        setTimeout(function () {
          that.closeCall()
        }, 510)
      },
      closeOwn() {
        this.closeCall()
      },
      openShare() {
        this.communityNews.shareSystem(this.dtailNews.title,this.dtailNews.uuid);
      }
    },
    mounted(){
      this.dtailNews.showDetail = false;
      let that = this;
      setTimeout(function () {
        that.dtailNews.showDetail = true;
      }, 10);
      this.$store.state.newsDetailShowFunction = this.oooo;
      this.dtailNews.httpDetail(function (response) {
        that.dtailNews.content = response.data.data.content;

      });
    }
  }
</script>


<style lang="less" rel="stylesheet/less">
  @transition:0.5s;
  .news-dtail {
    height: 100vh;
    width: 100vw;
    position: relative;
    .dtila-box {
      top: 200px;
      left: 0;
      right: 0;
      position: absolute;
      padding: 0 20px;
      transition: @transition;
      .detail-title {
        background: white;
        .title-bar {
          border-bottom: 1px #F8F9F9 solid;
          display: flex;
          padding: 0 20px;
          .close-ico {
            width: 27px;
            height: 52px;
            background:url('../../../assets/svg/register/arrow.svg') center no-repeat;
          }
          .title-bar-text{
            text-align: center;
            line-height: 52px;
            font-weight: 600;
            font-size: 18px;
            width: 100%;
          }
          .title-bar-share {
            width: 21px;
            height: 52px;
            background:url('../../../assets/svg/register/share.svg') center no-repeat;
          }
        }
        .title-text {
          padding: 20px 20px 0 20px;
          color: #484848;
          font-size: 22px;
          line-height: 30px;
          font-weight: 600;
        }
        .title-date {
          color: #00b288;
          padding: 0 20px 25px 20px;
          font-size: 13px;
        }

      }
      .activity-item {
        overflow-y: scroll;
        -webkit-overflow-scrolling:touch;
        max-height: calc(100vh - 143px);
        margin-bottom: 10px;
        border-radius: 8px;
        box-shadow:0 0 5px #666;
        padding-bottom: 12px;
        transition: @transition;
        background: white;
        .item-img {
          position: relative;
          padding-bottom: 75%;
          border-radius: 8px;
          overflow: hidden;
          transition: @transition;
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
        .content {
          .dtail-news-html {
            min-height: calc(100vh - 153px - 100vw / 2);

            img {

              height: auto;
            }
            p {
              margin: 10px 20px;
              img {
                margin: 0 -20px;
                width: 100vw;
              }
            }
          }
          .seize-seat {
            text-align: center;
            background: white;
            min-height: 55vh;
            line-height: 100px;
          }
        }
      }
      &.show-detail {
        top: 0!important;
        padding: 0;
        .activity-item {
          box-shadow:0 0 0;
          border-radius: 0;
          .item-img {
            border-radius: 0;
          }
        }

      }
    }
  }
</style>
