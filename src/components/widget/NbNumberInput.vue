<template>
  <div class="nb-number-input" @mouseover="mouseOver" @mouseout="mouseOut">
    <div class="number-input">
      <input class="form-control" @blur="blur" ref="input" maxlength="16" :value="value" @input="updateValue($event.target.value)" :placeholder="placeholder"/>
      <span>
        <button class="up btn btn-white" @click="clickUp" @mouseup="mouseUpAdd"  @blur="blur"
                @mousedown="mouseDownAdd" @mouseover="mouseOverAdd" @mouseout="mouseUpAdd">
          <i class="fa fa-chevron-up"></i>
        </button>
        <button class="down btn btn-white" @click="clickDown" @mouseup="mouseUpSub"  @blur="blur"
                @mousedown="mouseDownSub" @mouseover="mouseOverSub" @mouseout="mouseUpSub">
          <i class="fa fa-chevron-down"></i>
        </button>
      </span>
    </div>
  </div>
</template>


<script>
  import {endWith} from "../../common/filter/str";

  export default {
    data () {
      return {
        increment: 1,
        judgeCount: 0,
        judgeLimit: 4,
        interval: 80,
        time: null,
        isLongPressed: false,
        isInside: false
      }
    },
    props: {
      value: {
        required: false,
        "default": "0"
      },
      allowedNegative: {
        type: Boolean,
        required: false,
        "default": false
      },
      allowedDecimal: {
        type: Boolean,
        required: false,
        "default": true
      },
      placeholder: {
        type: String,
        required: false
      },
      blurCallback: {
        type: Function,
        required: false,
        "default": function () {}
      }
    },
    watch: {},
    computed: {},
    methods: {
      updateValue(value){
        this.$emit('input', "");
        let no;
        if(value === "") {
          no = ""
        } else {
          no = Number(value);
          if (isNaN(no)) {
            no = value.substr(0, value.length - 1);
            if(value === "-" && this.allowedNegative) {
              no = "-";
            }
          }
          if(this.allowedDecimal && endWith(value.toString(), ".")) {
            no = value;
          }
          if (this.$refs.input.value !== no.toString()) {
            this.$refs.input.value = no.toString();
          }
        }

        this.$emit('input', no.toString());

      },
      clickUp(){
        this.$refs.input.focus();
        if (!this.isLongPressed) {
          this.add();
        }
        this.isLongPressed = false;
      },
      clickDown(){
        if (!this.isLongPressed) {
          this.sub();
        }
        this.isLongPressed = false;
      },
      //ADD
      mouseDownAdd(){
        this.time = setInterval(this.longPressAdd, this.interval);
      },
      mouseUpAdd(){
        clearInterval(this.time);
        this.judgeCount = 0;
      },
      mouseOverAdd(){
        clearInterval(this.time);
        this.judgeCount = 0;
      },
      longPressAdd(){
        if (this.judgeCount <= this.judgeLimit) {
          this.judgeCount++;
        } else {
          this.add();
          this.isLongPressed = true;
        }
      },
      //SUB
      mouseDownSub(){
        this.time = setInterval(this.longPressSub, this.interval);
      },
      mouseUpSub(){
        this.$refs.input.focus();
        clearInterval(this.time);
        this.judgeCount = 0;
      },
      mouseOverSub(){
        clearInterval(this.time);
        this.judgeCount = 0;
      },
      longPressSub(){
        if (this.judgeCount <= this.judgeLimit) {
          this.judgeCount++;
        } else {
          this.sub();
          this.isLongPressed = true;
        }
      },
      blur() {
        let value = this.$refs.input.value;
        while (isNaN(value)) {
          value = value.substr(0, value.length - 1);
        }
        this.$emit('input', value.toString());
        if(!this.isInside) {
          this.blurCallback();
        }
      },
      add(){
        let no;
        no = Number(this.value);
        if (isNaN(no)) {
          no = 0;
        }
        no += this.increment;
        this.updateValue(no.toString());
      },
      sub(){
        let no;
        no = Number(this.value);
        if (isNaN(no)) {
          no = 0;
        }
        if (!this.allowedNegative && no - 1 <= 0) {
          no = 0;
        } else {
          no -= this.increment;
        }
        this.updateValue(no.toString());
      },
      mouseOver(){
        this.isInside = true;
      },
      mouseOut(){
        this.isInside = false;
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-number-input {
    .number-input {
      display: table;
      input {
        z-index: 3;
        position: relative;
      }
      span {
        vertical-align: middle;
        display: table-cell;
        button {
          display: block;
          width: 100%;
          padding: 8px 10px;
          margin-left: -1px;
          position: relative;
          &.up {
            border-radius: 0;
            border-top-right-radius: 4px;
          }
          &.down {
            margin-top: -2px;
            border-radius: 0;
            border-bottom-right-radius: 4px;
          }
          i {
            position: absolute;
            top: 3px;
            left: 4px;
            font-size: 9px;
          }
        }
      }
    }
  }
</style>



