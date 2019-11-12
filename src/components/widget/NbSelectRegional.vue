<template>
  <el-select v-model="name" placeholder="请选择"  class="nb-select" @change="currentRegional">
    <el-option
      v-for="item in options"
      :key="item.uuid"
      :label="item.name"
      :value="item.uuid">
    </el-option>
  </el-select>
</template>

<script>
    import Pager from "../../common/model/_base/Pager";
    import CommunityEvents from "../../common/model/community/CommunityEvents";
    import CommunityPosts from "../../common/model/community/CommunityPosts";
    import CommunityNews from "../../common/model/community/CommunityNews";
    import ConferenceRoom from "../../common/model/space/conferenceroom/ConferenceRoom";
    import ActiveSite from "../../common/model/space/activesite/ActiveSite";
    import {readLocalStorage, removeLocalStorage, saveToLocalStorage} from "../../common/util/Utils";
    import Appsettings from "../../common/model/appsettings/Appsettings";
    import Privilege from "../../common/model/privilege/Privilege";
    export default {
        data(){
          return{
            name:'杭州空间',
            idKey:"currentSpaceRegionalUuid",
            nameKey:"currentSpaceRegionalAddress",
            positionName:"currentPositionName",
            positionId:"currentPositionId",
            splashAppsettings: new Appsettings(),
            address: "",
            longitude:121.491719,
            latitude:31.026331,
            distance:[]
          }
        },
      props:{
        filter: {

        },
        options:{

        },
        callback: {
          type: Function,
          required: false
        }
      },
      methods:{
        getDistance( lat1, lng1, lat2, lng2){
          let radLat1 = lat1 * Math.PI / 180.0;
          let radLat2 = lat2 * Math.PI / 180.0;
          let a = radLat1 - radLat2;
          let b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
          let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2),2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2),2)));
          s = s * 6378.137;// EARTH_RADIUS;
          s = Math.round(s * 10000) / 10000;
          return s;
        },
        positionShow(){
          let that = this;
          this.$store.state.plus.geolocation.getCurrentPosition( function (position) {
            that.longitude = position.coords.longitude;
            that.latitude = position.coords.latitude;
            that.$store.state.spaceRegionalList.forEach( item =>{
              that.distance.push(that.getDistance(that.latitude,that.longitude,item.latitude,item.longitude));
            });
            let spaceIndex = that.distance.indexOf(Math.min.apply(null,that.distance));
            if(!readLocalStorage(that.idKey) && !readLocalStorage(that.positionId)){ //上选空 && 上定空
              saveToLocalStorage(that.idKey,that.$store.state.spaceRegionalList[spaceIndex].uuid);
              saveToLocalStorage(that.nameKey,that.$store.state.spaceRegionalList[spaceIndex].name);
              that.$store.state.currentSpaceRegionalUuid = that.$store.state.spaceRegionalList[spaceIndex].uuid;
              that.$store.state.currentSpaceRegionalAddress = that.$store.state.spaceRegionalList[spaceIndex].name;
              // console.log("上选空 && 上定空")
            }else if(readLocalStorage(that.idKey) && !readLocalStorage(that.positionId)){ //上选 && 上定空
              saveToLocalStorage(that.idKey,readLocalStorage(that.idKey));
              that.$store.state.currentSpaceRegionalUuid = readLocalStorage(that.idKey);
              that.$store.state.currentSpaceRegionalAddress = readLocalStorage(that.nameKey);
              // console.log("上选 && 上定空")
            }else if(!readLocalStorage(that.idKey) && readLocalStorage(that.positionId)){ //上选空 && 上定
              saveToLocalStorage(that.idKey,readLocalStorage(that.positionId));
              saveToLocalStorage(that.nameKey,readLocalStorage(that.positionName));
              // console.log("上选空 && 上定")
            }else if(readLocalStorage(that.idKey) && readLocalStorage(that.positionId)){ //上选 && 上定
              if(that.$store.state.spaceRegionalList[spaceIndex].uuid !== readLocalStorage(that.positionId)){ //此定 !== 上定
                saveToLocalStorage(that.idKey,that.$store.state.spaceRegionalList[spaceIndex].uuid);
                saveToLocalStorage(that.nameKey,that.$store.state.spaceRegionalList[spaceIndex].name);
                // console.log("上选 && 上定 >> 此定 !== 上定")
              }else if(that.$store.state.spaceRegionalList[spaceIndex].uuid === readLocalStorage(that.positionId)){ //此定 === 上定
                saveToLocalStorage(that.idKey,readLocalStorage(that.idKey));
                saveToLocalStorage(that.nameKey,readLocalStorage(that.nameKey));
                // console.log("上选 && 上定 >> 此定 === 上定")
              }
            }
            saveToLocalStorage(that.positionId,that.$store.state.spaceRegionalList[spaceIndex].uuid);
            saveToLocalStorage(that.positionName,that.$store.state.spaceRegionalList[spaceIndex].name);
            this.resetData();
          }, function (e) {
            console.error(e.message);
            that.$store.state.plus.nativeUI.toast("获取位置信息失败！",{duration:"short"});
          },{enableHighAccuracy:true, timeout: 10000});
        },
        currentRegional(val){
          saveToLocalStorage(this.idKey,val);
          this.$store.state.currentSpaceRegionalUuid = val;
          this.$store.state.spaceRegionalList.forEach(regional =>{
            if(regional.uuid === val){
              this.$store.state.currentSpaceRegionalAddress = regional.name;
              saveToLocalStorage(this.nameKey,regional.name);
            }
          });
         this.resetData();
        },
        resetData(){
          this.splashAppsettings.downloadSplash();
          this.$store.state.activityPager = new Pager(CommunityEvents);
          this.$store.state.circlePager = new Pager(CommunityPosts);
          this.$store.state.circleTopPager = new Pager(CommunityPosts);
          this.$store.state.newsPager = new Pager(CommunityNews);
          this.$store.state.conferencePage = new Pager(ConferenceRoom);
          this.$store.state.activePage = new Pager(ActiveSite);
          this.$store.state.welfarPager = new Pager(Privilege);
          this.$store.state.appSettingList.httpGetPrice(val);
        }
      },
      mounted(){
        this.$store.state.appSettingList.httpGetPrice(this.$store.state.currentSpaceRegionalUuid);
        this.positionShow();
        if(readLocalStorage(this.nameKey) && readLocalStorage(this.idKey)){
          this.name = readLocalStorage(this.nameKey);
          this.$store.state.currentSpaceRegionalAddress = readLocalStorage(this.nameKey);
          this.$store.state.currentSpaceRegionalUuid = readLocalStorage(this.idKey);
        }else {
          this.name = "杭州空间";
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-select{
    border: none;
    resize:none;
    width: 100%;
    outline:none;

  .el-input__inner{
    border:none;
    padding-left: 0;
    margin-bottom: 10px;
    font-size: 16px;
  }
  }
</style>
