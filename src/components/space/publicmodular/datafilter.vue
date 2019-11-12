<template>
  <div class="data-filter">
    <div class="dataFilter" @click.stop.prevent="filterMaskShow">
      <div class="filterItem" >
          <div :style="'background:url(\''+(require('../../../assets/svg/space/room3.svg'))+'\') center no-repeat'"
               style="height: 30px;width: 30px;float: left;margin:8px 0 0 5%;">
          </div>
        <div class="data-time-now">
          {{$store.state.roomTime | allDay}}
        </div>
        <div>
          <div :style="'background:url(\''+(require('../../../assets/svg/space/severs2.svg'))+'\') center no-repeat'"
               style="height: 18px;width: 18px;float: right;margin:14px 5% 0 0" @click.stop.prevent="filterMaskShow" v-if="!filterShow">
          </div>
          <div :style="'background:url(\''+(require('../../../assets/space/top.svg'))+'\') center no-repeat'"
               style="height: 35px;width: 35px;float: right;margin:5px 3% 0 0" @click.stop.prevent="filterMaskHide" v-if="filterShow">
          </div>
        </div>
      </div>
    </div>
    <div v-show="filterShow" class="positionList">
      <div class="selectContainer">
        <div class="timeSelect">
          <div class="timeText">
            日期
          </div>
          <div class="timeIpt">
            <NbFilterDateTime :filter="pager.getFilter('date')"></NbFilterDateTime>
          </div>
        </div>
        <div class="timeSelect">
          <div class="timeText">
            可容纳人数
          </div>
          <div class="timeIpt">
            <NbSelect :filter="pager.getFilter('capacityType')" :options="options"></NbSelect>
          </div>
        </div>
        <div class="goSelectBtn">
          <div  class="selectBtn" @click.stop.prevent="filterMaskHide">确认</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import NbFilterDateTime from "../../widget/NbFilterDateTime"
    import NbSelect from "../../widget/NbSelect"
    import Pager from "../../../common/model/_base/Pager";
    import {allDay} from "../../../common/filter/time"
    export default {
      data(){
        return {
          DataTimeroomTime:this.$store.state.roomTime,
          filterShow:false,
          type:"date",
          options: [],
          temps: this.$store.state.temps,
          DataTime:new Date(),
          capacityDate:[
            {value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6},{value:7,label:7},{value:8,label:8},
            {value:9,label:9},{value:10,label:10},{value:11,label:11},{value:12,label:12},{value:13,label:13},{value:14,label:14},{value:15,label:15},{value:16,label:16}
          ]
        }
      },
      props:{
        pager: {
          type: Pager,
          required: true,
          validator: function () {
            return true;
          }
        },
        callback:{
          type: Function,
          required: false
        }
      },
      computed:{
        filters(){
          return this.pager.FILTERS;
        }
      },
      components:{
        NbFilterDateTime,
        NbSelect
      },
      methods:{
        filterMaskShow(){
          let that = this;
          that.filterShow = true;
          this.temps.dataFilterShow();
        },
        filterMaskHide(){
          this.callback && this.callback();
          this.filterShow = false;
          this.temps.homeMaskHide();
          this.$store.state.AvailabilityTime = this.DataTime;
        }

      },
      mounted(){
        let that = this;
        this.temps.dataFilterHide = function () {
          that.filterShow = false
        };
        this.pager.getFilter('capacityType').options.forEach(e => {
          this.options.push({value: e.value, label: e.name});
        })

      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .data-filter{
    .dataFilter{
      position: relative;
      width: 100%;
      height: 48px;
      background-color: #F6F6F6;
      .filterItem{
        .data-time-now{
          display: inline-block;
          height: 48px;
          text-align: center;
          line-height: 48px;
          float: left;
          font-size: 18px;
          margin-left: 15px;
        }
      }
    }
    .positionList{
      position: absolute;
      width: 100%;
      z-index: 99;
      .selectContainer{
        width: 100%;
        height: 272px;
        background-color: #fff;
        border-radius:0 0 5px 5px;
        .timeSelect{
          .timeText{
            width: 90%;
            margin: auto;
            padding-top: 20px;
            color: #8C8C8C;
          }
          .timeIpt{
            width: 90%;
            margin:10px 5% 0 5%;
            border-bottom: 1px solid #d7dcdd;
            .nb-filter-datetime{
              width: 100%;
              .el-input{
                width: 100%;
                .el-input__inner{
                  border: none;
                  font-size: 16px;
                  margin-left: -27px;
                  width: 100%;
                }
              }
              .el-input__prefix{
                display: none;
              }
              .el-input__suffix{
                display: none;
              }
            }
            .ipt{
              width: 98%;
              border:none ;
              outline:none;
              margin-bottom: 10px;
              font-size: 18px;
            }
          }
        }
        .dataSelect{

        }
        .goSelectBtn{
          margin-top: 20px;
          .selectBtn{
            width: 90%;
            height: 41px;
            display: block;
            margin: auto;
            border-radius: 5px;
            text-decoration: none;
            color: #fff;
            background: #000;
            text-align: center;
            line-height: 41px;
            font-size: 16px;
          }
        }
      }
      .positionLists{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #a2a2a2;
        opacity: .3;
        z-index: 999999999;
      }
    }
  }

</style>
