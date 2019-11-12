<template>
    <div class="activitySite">
      <scroller ref="newsScroller"
                :on-refresh="refresh"
                :on-infinite="infinite">
          <ActiveSiteItem :pager="pager.data" :TypeSite="TypeSite"></ActiveSiteItem>
      </scroller>
    </div>
</template>

<script>
  import ActiveSiteItem from "./activesite/activeSiteItem";
  import Pager from "../../common/model/_base/Pager";
  import ActiveSite from "../../common/model/space/activesite/ActiveSite";
    export default {
      data(){
        return {
          pager:this.$store.state.activePage,
          TypeSite:"activeSiteBook",
          scrollData: {
            noFlag: false //暂无更多数据显示
          },
          service:["LED","DEMONSTRATION","VIDEO","MICROPHONE","HORN","WIFI"],
          itemData:[
            {
              uuid:"454654565521321215",
              name:"会议室",
              capacity:"16"
            }
          ]
        }
      },
      components:{
        ActiveSiteItem
      },
      methods :{
        refresh(done) {
          let that = this;
          this.pager.page = 0;
          this.pager.setFilterValue('deleted', false);
          this.pager.setFilterValue("orderCreateTime", "DESC");
          this.pager.setFilterValue("spaceRegionalUuid", that.$store.state.currentSpaceRegionalUuid);
          this.pager.httpFastPage(function(){
            that.pager.page++;
            that.pager.data.forEach(data => {
              data.poster.keepLocal(560, 750);
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
              data.poster.keepLocal(560, 750);
            });
          });
        }
      },
      mounted(){}
    }
</script>

<style lang="less" rel="stylesheet/less">
  .activitySite{
    position: relative;
    height: 100%;
  }
</style>
