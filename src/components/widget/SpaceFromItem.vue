<template>
  <div class="nb-form-container">
    <div class="nb-input" v-if="formItem.type === FormItemType.INPUT">
      <input :id="formItem.id" type="text" class="usual-style" v-model="formItem.value"  @blur="blur"
             @focus="emptyMsg" :placeholder="formItem.rule.placeholder" :readonly="formItem.rule.readonly">
      <div class="mt2" v-show="formItem.errorMsg">
        <span class="danger-style">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="nb-input" v-if="formItem.type === FormItemType.MOBILE_NUMBER">
      <input :id="formItem.id" type="text" class="usual-style" v-model="formItem.value"  @blur="blur" pattern="[0-9]*"
             @focus="emptyMsg" :placeholder="formItem.rule.placeholder" :readonly="formItem.rule.readonly">
      <div class="mt2" v-show="formItem.errorMsg">
        <span class="danger-style">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="nb-input" v-if="formItem.type === FormItemType.INPUT_PASSWORD">
      <input :id="formItem.id" type="password" class="usual-style" v-model="formItem.value"  @blur="blur"
             @focus="emptyMsg" :placeholder="formItem.rule.placeholder">
      <div class="mt2" v-show="formItem.errorMsg">
        <span class="danger-style">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="nb-text_area" v-if="formItem.type === FormItemType.TEXT_AREA">
      <textarea :id="formItem.id" type="text" class="form-control" v-model="formItem.value"  @blur="blur"
                @focus="emptyMsg" :placeholder="formItem.rule.placeholder"></textarea>
      <div class="mt2" v-show="formItem.errorMsg">
        <span>{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="nb-input" v-if="formItem.type === FormItemType.NUMBER">
      <NbNumberInput v-model="formItem.value" :allowedNegative="formItem.rule.allowedNegative"
                     :allowedDecimal="formItem.rule.allowedDecimal" :placeholder="formItem.rule.placeholder"
                     :blurCallback="blur" @focus="emptyMsg"></NbNumberInput>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.TANK">
      <NbTank :tank="formItem.value"></NbTank>
      <div class="mt2" v-show="formItem.errorMsg">
        <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <!--手机验证码-->
    <div class="nb-validation" v-if="formItem.type === FormItemType.VALIDATION">
      <div>
        <input :id="formItem.id" type="text" class="validation" v-model="formItem.value"  @blur="blur"
               @focus="emptyMsg" :placeholder="formItem.rule.placeholder">
      </div>
      <div class="validation-block" v-if="phoneValidation.coldingDown === 0" @click.stop.prevent="formItem.sendValidation(formItem.rule.checkLogin, formItem.rule.checkNotLogin)">
        获取验证码
      </div>
      <div class="validation-wait" v-if="phoneValidation.coldingDown > 0">
        {{phoneValidation.coldingDown}}s
      </div>
    </div>

    <div style="font-size: 18px;color: #666666;margin-top: 30px;" v-if="formItem.type === FormItemType.SINGER_CHECK">
      <span style="margin-right: 10px;">
        {{formItem.rule.placeholder}}
      </span>
      <span v-for="checkItem in formItem.rule.list" :key="checkItem.val" style="margin-left: 60px;">
         <label :for="checkItem.val">{{checkItem.name}}</label>
         <NbRadio :val="checkItem.val" v-model="formItem.value" :name="checkItem.name"></NbRadio>
      </span>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.CHECKBOX" class="nb-radio">
      <div v-for="checkItem in formItem.rule.list" :key="checkItem.val" class="nb-radio-item">
        <label :for="checkItem.val" class="check-label">{{checkItem.name}}</label>
        <NbCheckbox :val="checkItem.val" v-model="formItem.value" :inputId="checkItem.val"></NbCheckbox>
      </div>
      <div class="mt2" v-show="formItem.errorMsg">
        <span class="text-danger" style="color: #CE0058;">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div  v-if="formItem.type === FormItemType.REMINDER" class="reminder">
      <div class="reminder-title">
        友情提示
      </div>
      <div class="reminder-text">
        <span v-if="!formItem.rule.text">感谢您提交预约。我们的工作人员会尽快与您联络，确认后续事宜。</span>
        <span v-else>{{formItem.rule.text}}</span>
      </div>
    </div>

    <div  v-if="formItem.type === FormItemType.SPACE_ORDER" class="reminder">
      <div class="reminder-title">
        友情提示
      </div>
      <div class="reminder-text">
        <span v-if="!formItem.rule.text">如果您需要同时预订移动办公桌和独立办公室,请分别提交订单。</span>
        <span v-else>{{formItem.rule.text}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.RADIO"  class="nb-radio">
      <div v-for="checkItem in formItem.rule.list" :key="checkItem.val" class="nb-radio-item">
        <label :for="checkItem.val">{{checkItem.name}}</label>
        <NbRadio :val="checkItem.val" v-model="formItem.value" :inputId="checkItem.val" :name="checkItem.val"></NbRadio>
      </div>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.DATE">
      <el-date-picker :id="formItem.id" v-model="formItem.value"  type="date"
                      :editable="false"
                      :placeholder="formItem.rule.placeholder" class="nb-date-picker">
      </el-date-picker>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.TIME">
      <el-time-select :id="formItem.id" v-model="formItem.value"
                      :editable="false"
                      :picker-options="{
                        start: '09:00',
                        step: '00:30',
                        end: '17:30'
                        }"
                      :placeholder="formItem.rule.placeholder" class="nb-date-picker">
      </el-time-select>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.SELECT" class="nb-select-item">
      <el-select v-model="formItem.value" placeholder="请选择" class="nb-select">
        <el-option
          v-for="item in formItem.rule.list"
          :key="item.val"
          :label="item.name"
          :value="item.val">
        </el-option>
      </el-select>
      <div class="mt2" v-show="formItem.errorMsg">
       <span class="text-danger" style="color: #CE0058;">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.SLIDER_TIME" class="nb-select-item">
      <Availability :timeInfo="formItem.value" :timeList="formItem.value.occupyList"></Availability>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import FormItem from "../../common/model/_base/FormItem";
  import NbNumberInput from "./NbNumberInput";
  // import NbEditor from "./NbEditor";
  import NbTank from "./NbTank";
  import {simpleMinute} from "../../common/filter/time";
  import NbRadio from "./NbRadio";
  // import NbTanks from "./NbTanks";
  import NbDateRange from "./NbDateRange";
  // import NbMap from "./map/NbMap";
  import NbCheckbox from "./NbCheckbox"
  // import NbSelect from "./NbSelect"
  import Availability from "../../components/space/publicmodular/availability";
  export default {
    data() {
      return {
        FormItemType: FormItem.prototype.Type,
        phoneValidation: this.$store.state.user.phoneValidation,
        value: ''
      }
    },
    props: {
      formItem: {
        type: FormItem,
        required: true
      }
    },
    components: {
      NbTank,
      NbNumberInput,
      NbRadio,
      // NbEditor,
      // NbTanks,
      NbDateRange,
      // NbSelect,
      // NbMap,
      NbCheckbox,
      Availability
    },
    computed: {},
    watch:{
      'formItem.value'(newVal,oldVal) {
        this.formItem.watch(newVal, oldVal);
      },
      'formItem.value.uuid'(newVal,oldVal) {
        this.formItem.watch(newVal, oldVal);
      }
    },
    methods: {
      blur(){
        this.formItem.validate();
      },
      emptyMsg() {
        this.formItem.errorMsg = null;
      }
    },
    mounted() {}
  }
</script>
<style lang="less" rel="stylesheet/less">
  .nb-form-container {
    .nb-input {
      margin-bottom: 30px;
      .usual-style {
        width: 100%;
        resize: none;
        outline: none;
        font-size: 18px;
        border: 0;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        letter-spacing: 1px;
        margin-top: 20px;
      }

      .danger-style {
        color: #CE0058;
      }
    }
    .nb-radio{
      margin-top: 5px;
      margin-bottom: 30px;
      float: left;
      .nb-radio-item{
        width: 35%;
        text-align: right;
        float: left;
        margin-right: 30px;
        margin-top: 10px;

      }
      .mt2{
        float: left;
        margin-top: 10px;
      }
    }
    .nb-select-item{
      margin-top: 15px;
      margin-bottom: 30px;
      .nb-select{
        border: none;
        resize:none;
        width: 100%;
        outline:none;
        font-size: 16px;
        border-bottom: 1px solid #ccc;
        .el-input__inner{
          border:none;
          padding-left: 0;
          margin-bottom: 10px;
        }
      }
    }
    .form-control{
      border: none;
      resize:none;
      width: 100%;
      outline:none;
      font-size: 18px;
      height: 18px;
      margin-top: 20px;
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }
    .nb-date-picker{
      width: 100%;
      margin-top: 20px;
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
      .el-input__prefix{
        display: none;
      }
      .el-input__inner{
        border: none;
        font-size: 18px;
        margin-left: -30px;
        margin-top: -20px;
      }
    }
    .nb-validation {
      display: flex;
      .validation {
        resize: none;
        outline: none;
        max-width: 180px;
        font-size: 18px;
        border: 0;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        letter-spacing: 1px;
      }
      .validation-block {
        border: 1px solid #00B3E4;
        color: #00B3E4;
        padding: 11px 18px;
        text-align: center;
        border-radius: 8px;
        font-size: 18px;
        margin-left: 20px;
      }
      .validation-wait {
        background-color: #00B3E4;
        border: 1px solid #00B3E4;
        color: #FFFFFF;
        min-width: 90px;
        padding: 11px 18px;
        text-align: center;
        border-radius: 8px;
        font-size: 18px;
        margin-left: 20px;
      }

    }
    .nb-text_area{
      padding-bottom: 20px;
    }
    .reminder{
      margin: 0 0 50px 0;
      .reminder-title{
        font-size: 14px;
        color: #CE0058;
        margin: 0 0 10px 0;
      }
      .reminder-text{
        font-size: 14px;
        color: #a2a2a2;
      }
    }
  }
</style>
