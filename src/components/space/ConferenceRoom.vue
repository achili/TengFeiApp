<template>
  <div class="conferenceRoom">
      <scroller ref="newsScroller"
                :on-refresh="refresh"
                :on-infinite="infinite">
        <RoomItem :pager="pager.data" :TypeIndex="TypeIndex"></RoomItem>
      </scroller>
  </div>
</template>

<script>
  import RoomItem from "./conferenceroom/roomItem";
  import Tank from "../../common/model/tank/Tank";
  import {simpleDateTime} from "../../common/filter/time";

    export default {
      data(){
        return {
          pager:this.$store.state.conferencePage,
          TypeIndex:"roomBook",
          scrollData: {
            noFlag: false //暂无更多数据显示
          }

        }
      },
      components:{
        RoomItem
      },
      methods :{
        refresh(done) {
          let that = this;
          this.pager.page = 0;
          this.pager.setFilterValue('deleted', false);
          this.pager.setFilterValue("date", simpleDateTime(this.$store.state.roomTime));
          this.pager.setFilterValue("orderCreateTime", "DESC");
          this.pager.setFilterValue("spaceRegionalUuid", that.$store.state.currentSpaceRegionalUuid);
          this.pager.httpFastPage(function(){
            that.pager.page++;
            that.pager.data.forEach(data => {
              if(data.posters) {
                Tank.keepLocalList(data.posters, 300, 570)
              }
            });
            done();
          },function () {
            done();
          });
        },
        infinite(done) {
          let that = this;
          this.pager.setFilterValue('deleted', false);
          this.pager.setFilterValue("date", simpleDateTime(this.$store.state.roomTime));
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
              if(data.posters) {
                Tank.keepLocalList(data.posters, 300, 570)
              }
            });
          });
        }
      },
      mounted(){
        // this.pager.httpFastPage();
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .conferenceRoom{
    position: relative;
    height: 100%;

  }
</style>
