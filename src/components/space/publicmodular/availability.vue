<template>
    <div class="time-container">
      <div class="time-item" ref="scroll" @touchstart.stop="touchstarts" @touchmove.stop="touchmoves">
        <div class="time-list-container" :style="'width: '+ timeIndex.length * 40 +'px'">
          <div class="time-list list-short"  v-for="(time,index) in timeIndex" :key="time.index" :class="styleDate(index)">
            <div class="line" :class="index%2===0? 'long':''">
              <div class="date">{{time.mata}}</div>
            </div>
          </div>
        </div>
        <div class="slider-list" ref="slider" :style="'left:'+padding+'px'" v-show="sliders" :class="handle ? 'add-list-yellow':''">
          <div class="left-slider" @touchend="touchsend" @touchstart.prevent="touchstart($event)" @touchmove.prevent="touchmove($event)"
               :style="'width: '+ width +'px'"></div>
          <div class="right-slider" @touchend="sliderTouchsend" @touchstart.prevent="sliderTouchstart($event)" @touchmove.prevent="sliderTouchmove($event)"></div>
        </div>
      </div>
    <div class="footer-slider">{{footerTime.footerStart}}-{{footerTime.footerEnd}}</div>
    </div>
</template>

<script>
    export default {
      data(){
        let hour = 60 * 60 * 1000;
        return{
          sliders:true,
          disparity:0,
          timeTimes:{},
          timeIndex:[
            {stamp:7.5 * hour, number:0,time:"7:30"},
            {stamp:8 * hour, number:1,mata:"8AM",time:"8:00"},
            {stamp:8.5 * hour, number:2,time:"8:30"},
            {stamp:9 * hour, number:3,mata:"9AM",time:"9:00"},
            {stamp:9.5 * hour, number:4,time:"9:30"},
            {stamp:10 * hour, number:5,mata:"10AM",time:"10:00"},
            {stamp:10.5 * hour, number:6,time:"10:30"},
            {stamp:11 * hour, number:7,mata:"11AM",time:"11:00"},
            {stamp:11.5 * hour, number:8,time:"11:30"},
            {stamp:12 * hour, number:9,mata:"12AM",time:"12:00"},
            {stamp:12.5 * hour, number:10,time:"12:30"},
            {stamp:13 * hour, number:11,mata:"1PM",time:"13:00"},
            {stamp:13.5 * hour, number:12,time:"13:30"},
            {stamp:14 * hour, number:13,mata:"2PM",time:"14:00"},
            {stamp:14.5 * hour, number:14,time:"14:30"},
            {stamp:15 * hour, number:15,mata:"3PM",time:"15:00"},
            {stamp:15.5 * hour, number:16,time:"15:30"},
            {stamp:16 * hour, number:17,mata:"4PM",time:"16:00"},
            {stamp:16.5 * hour, number:18,time:"16:30"},
            {stamp:17 * hour, number:19,mata:"5PM",time:"17:00"},
            {stamp:17.5 * hour, number:20,time:"17:30"},
            {stamp:18 * hour, number:21,mata:"6PM",time:"18:00"},
            {stamp:18.5 * hour, number:22,time:"18:30"},
            {stamp:19 * hour, number:23,mata:"7PM",time:"19:00"},
            {stamp:19.5 * hour, number:24,time:"19:30"},
            {stamp:20 * hour, number:25,mata:"8PM",time:"20:00"},
            {stamp:20.5 * hour, number:26,time:"20:30"},
            {stamp:21 * hour, number:27,mata:"9PM",time:"21:00"}
          ],
          startX: 0,
          startPadding: 0,
          padding: 40,
          scrollLeft: 0,
          width: 60,
          startWidth: 60,
          temps:this.$store.state.temps,
          grayList:[],
          footerTime:{
            footerStart:"",
            footerEnd:""
          },
          max:[],
          intersectionNumber:[],
          handle:false
        }
      },
      props:{
        timeList:{
          required: false,
          default: function () {
            return [];
          }
        },
        timeInfo:{
          required: false
        }
      },
      components:{

      },
      methods:{
        //时间轴滑动
        touchstarts(){},
        touchmoves(){},
        //滑块左右滑动
        touchstart(e, slider) {
          this.startX = e.changedTouches[0].clientX;
          this.startPadding = this.padding;
        },
        touchmove(e, slider) {
          let spacing = e.changedTouches[0].clientX - this.startX;
          this.padding = this.startPadding + spacing;
        },
        touchsend(e) {
          this.padding = Math.round(this.padding / 40) * 40;
          if(this.padding <  40 * this.grayList.length) {
            this.padding = 40 * this.grayList.length;
          } else if(this.padding + this.width > (this.timeIndex.length - 1) * 40) {
            this.padding = (this.timeIndex.length - 1) * 40 - this.width - 20;
          } else if(this.padding < 0) {
            this.padding = 40
          }
          this.timeInfo.startTime = this.timeIndex[this.padding / 40].stamp;
          this.timeInfo.endTime = this.timeIndex[(this.width - 20) / 40 + this.padding / 40 + 1].stamp;
          this.footTime();
          this.styleList();
        },
        //滑块的右边右滑
        sliderTouchstart(e) {
          this.startX = e.changedTouches[0].clientX;
          this.startWidth = this.width;
        },
        sliderTouchmove(e) {
          let spacing = e.changedTouches[0].clientX - this.startX;
          this.width = this.startWidth + spacing;
        },
        sliderTouchsend() {
          if(this.width < 0) {
            this.width = 0;
          }

          this.width = Math.round(this.width / 40) * 40 + 20;

          if(this.padding + this.width > 1024) {
            this.width = 1024 - this.padding;
          }

          this.timeInfo.startTime = this.timeIndex[this.padding / 40].stamp;
          this.timeInfo.endTime = this.timeIndex[(this.width - 20) / 40 + this.padding / 40 + 1].stamp;
          this.footTime();
        },
        styleDate(index){
          if(this.timeIndex.indexOf(this.timeIndex[index].number) !== this.grayList.indexOf(index)){
            return "grayList";
          } else if(this.timeList.indexOf(index) !== -1){
            return 'add-list-color';
          }else {
            return ''
          }
         },
        sortArray(arr){
          for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
              if (arr[j] >= arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
              }
            }
          }
          return arr;
        },
        intersect(a, b){
          let aIndex = 0;
          let bIndex = 0;
          let result = [];
          while( aIndex < this.sortArray(a).length && bIndex < this.sortArray(b).length ){
            if (this.sortArray(a)[aIndex] < this.sortArray(b)[bIndex]){
              aIndex++;
            } else if (this.sortArray(a)[aIndex] > this.sortArray(b)[bIndex]) {
              bIndex++;
            }else {
              result.push(this.sortArray(a)[aIndex]);
              aIndex++;
              bIndex++;
            }
          }
          return result;
        },
        listHandle(){
          this.max = [];
          let start = this.timeIndex[this.padding / 40].number;
          let end = this.timeIndex[(this.width - 20) / 40 + this.padding / 40 + 1].number;
          for(let i = start; i < end; i++){
            this.max.push(i)
          }
          this.intersectionNumber = [];
          this.intersectionNumber += this.intersect(this.max,this.timeList);
        },
        styleList(){
          this.listHandle();
          if(this.intersectionNumber){
            for(let i = 0; i < this.timeList.length; i++){
              for(let j = 0; j < this.intersectionNumber.length; j++ ){
                if(this.intersectionNumber[j] === this.timeList[i]){
                  this.handle = true;
                }else if (this.intersectionNumber[j] !== this.timeList[i]) {
                  this.handle = true;
                }else {
                  this.handle = true;
                }
              }
            }
          }else {
            this.handle = false;
          }
        },
        sliderIf(){
          if(this.grayList.length < 31){
            this.sliders = true;
            this.padding = 40 * this.grayList.length;
            this.$refs.scroll.scrollLeft = this.padding;
          }else {
            this.sliders = false;
          }
        },
        xxxx() {
          let dataTime = new Date(new Date().setHours(0, 0, 0, 0));
          let xxxTime = new Date(this.$store.state.roomTime.setHours(0, 0, 0, 0));
          this.grayList = [];
          if(dataTime.getTime() === xxxTime.getTime()) {
            let dataTime2 = new Date();
            let Hours = dataTime2.getHours() * 60 * 60 * 1000;
            let Minutes = dataTime2.getMinutes() * 60 * 1000;
            let Seconds = dataTime2.getSeconds() * 1000;
            let Milliseconds = dataTime2.getMilliseconds();
            let dateList = Hours + Minutes + Seconds + Milliseconds;
            for (let i = 0; i < this.timeIndex.length; i++) {
              if(this.timeIndex[i].stamp <= dateList){
                this.grayList.push(this.timeIndex[i].number)
              }
            }
            this.sliderIf()
          } else if(dataTime.getTime() > xxxTime.getTime()) {
            for (let i = 0; i < this.timeIndex.length; i++) {
              this.grayList.push(this.timeIndex[i].number)
            }
          } else {}
          this.sliderIf();
        },
        update() {
          this.timeIndex.forEach(timeIndexI => {
            if(this.timeInfo.startTime === timeIndexI.stamp) {
              this.padding = this.timeIndex.indexOf(timeIndexI) * 40;
              this.footerTime.footerStart = this.timeIndex[this.padding / 40].time;
            }
            if(this.timeInfo.endTime === timeIndexI.stamp) {
              this.width = (this.timeIndex.indexOf(timeIndexI) - this.padding / 40 - 1) * 40 + 20;
              this.footerTime.footerEnd = this.timeIndex[(this.width - 20) / 40 + this.padding / 40 + 1].time;
            }
          });
        },
        footTime(){
          this.footerTime.footerStart = this.timeIndex[this.padding / 40].time;
          this.footerTime.footerEnd = this.timeIndex[(this.width - 20) / 40 + this.padding / 40 + 1].time;
        }
      },
      watch: {
        "$store.state.roomTime"() {
          this.xxxx();
        },
        "timeInfo"() {
          this.update();
        },
        "footerTime"(){
          this.footTime()
        },
        "padding"(){
          if(this.grayList.length > 0){}else{
            if(this.padding >= 40){}else {
              this.padding = 40
            }
          }
        }
      },
      mounted(){
        this.xxxx();
        this.footTime();
        this.styleList();
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .time-container{
    width: 100%;
    height: 100px;
    margin-top: 30px;
    overflow-x: scroll;
    -webkit-overflow-scrolling:touch;
    .slider-list{
      left: 0;
      top: 0;
      height: 50px;
      display: flex;
      background-color:#ffdc35;
      opacity: .5;
      position: absolute;
      .left-slider{
        height: 50px;
      }
      .right-slider{
        width: 20px;
        height:50px;
        background-color:#FF9224;
        opacity: .6;
        display: inline-block;
      }
      .add-list-transparent{
        background-color: #f9a7a7;
        opacity: .8;
      }
    }
    .add-list-yellow{
      background-color: #f9a7a7;
      opacity: .8;
    }

      .footer-slider{
        height: 30px;
        font-size: 14px;
      }
    .time-item{
      width: 100%;
      height: 70px;
      overflow-x: scroll;
      -webkit-overflow-scrolling:touch;
      position: relative;

      .size {
        width: 20px;
      }
      .time-list-container{
        margin-left: -1px;
        float: left;
        height: 50px;
        margin-top: 20px;
        .time-list{
          display: inline-block;
          width: 40px;

        }

        .list-long{
          height: 50px;
        }
        .list-short{
          height: 30px;
          position: relative;
          .line {
            height: 30px;
            position: relative;
            width: 1px;
            background-color: #f6f6f6;
            .date {
              position: absolute;
              left: -15px;
              top: -20px;
              font-size: 14px;
            }
            &.long {
              position: absolute;
              bottom: 0;
              height: 50px;
              left: 0;
              background-color: #d7dcdd;
            }
          }
        }
        .add-list-color{
          background-color: #f9a7a7;
        }
        .grayList{
          background-color: #d7dcdd;
        }
      }
    }
    ::-webkit-scrollbar {/*隐藏滚轮*/
      display: none;
    }
  }
</style>
