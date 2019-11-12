<template>
  <div class="nb-form-item">
    <div class="nb-input" v-if="formItem.type === FormItemType.INPUT">
      <input :id="formItem.id" type="text" class="usual-style" v-model="formItem.value"  @blur="blur"
             @focus="emptyMsg" :placeholder="formItem.rule.placeholder" :readonly="formItem.rule.readonly">
      <div style="padding-top: 7px" v-show="formItem.errorMsg">
        <span class="danger-style">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="company-input" v-if="formItem.type === FormItemType.COMPANY_CODE">
      <div class="company_code_input">
        <input :id="formItem.id" type="text" class="company_code" v-model="formItem.value"  @blur="blur"
               @focus="emptyMsg" :placeholder="formItem.rule.placeholder" :readonly="formItem.rule.readonly">
        <el-tooltip effect="light" content="如果您拥有公司码，请在此输入，解锁更多功能。公司码是您身份的识别，请您妥善保管。" placement="top-end">
          <div class="company_code_question"></div>
        </el-tooltip>
      </div>

      <div style="padding-top: 7px" v-show="formItem.errorMsg">
        <span class="danger-style">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="nb-input" v-if="formItem.type === FormItemType.HTTP_VERIFY_PHONE" style="position: relative;">
      <input :id="formItem.id" type="text" class="usual-style" v-model="formItem.value"  @blur="blur"
             @focus="emptyMsg" :placeholder="formItem.rule.placeholder" :readonly="formItem.rule.readonly">
      <div style="padding-top: 7px" v-show="formItem.errorMsg">
        <span class="danger-style">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div class="nb-input" v-if="formItem.type === FormItemType.INPUT_PASSWORD" style="position: relative;">
      <input :id="formItem.id" :type="types" class="usual-style" v-model="formItem.value"  @blur="blur"
             @focus="emptyMsg" :placeholder="formItem.rule.placeholder">
      <div v-if="seePasswordShow" style="min-width: 50px;position: absolute;right: 0;top: 0;margin-top: 30px;" @click.stop.prevent="seePassword">
        <div :style ="'background:url(\''+(require('../../assets/svg/login/seePassword.svg'))+'\') center no-repeat'"
             style="width: 24px;height: 20px;">
        </div>
      </div>

      <div v-if="noSeePasswordShow" style="min-width: 50px;position: absolute;right: 0;top: 0;margin-top: 36px;" @click.stop.prevent="noSeePassword">
        <div :style ="'background:url(\''+(require('../../assets/svg/login/noSeePassword.svg'))+'\') center no-repeat'"
             style="width: 24px;height: 14px;">
        </div>
      </div>

      <div style="padding-top: 7px" v-show="formItem.errorMsg">
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

    <!--<div class="nb-text_area" v-if="formItem.type === FormItemType.RICH_TEXT">-->
      <!--<NbEditor v-model="formItem.value" :height="formItem.rule.height"></NbEditor>-->
      <!--<div class="mt2" v-show="formItem.errorMsg">-->
        <!--<i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>-->
      <!--</div>-->
    <!--</div>-->

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

    <!--<div v-if="formItem.type === FormItemType.TANKS">-->
      <!--<NbTanks :tanks="formItem.value" :maxNum="formItem.rule.max"/>-->
      <!--<div class="mt2" v-show="formItem.errorMsg">-->
        <!--<i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div v-if="formItem.type === FormItemType.DATE">-->
      <!--<el-date-picker :id="formItem.id" v-model="formItem.value" type="datetime"-->
                      <!--:placeholder="formItem.rule.placeholder">-->
      <!--</el-date-picker>-->
      <!--<div class="mt2" v-show="formItem.errorMsg">-->
        <!--<i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>-->
      <!--</div>-->
    <!--</div>-->

    <!--<div v-if="formItem.type === FormItemType.MAP_ADDRESS">-->
      <!--<input :id="formItem.id" type="text" class="form-control" v-model="formItem.value.address">-->
      <!--<div class="mt2" v-show="formItem.errorMsg">-->
        <!--<i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>-->
      <!--</div>-->
      <!--<NbMap :height="formItem.rule.height" :width="formItem.rule.width" :position="formItem.value"></NbMap>-->
    <!--</div>-->

    <div v-if="formItem.type === FormItemType.CHECKBOX">
      <div v-for="checkItem in formItem.rule.list" :key="checkItem.val">
        <NbCheckbox :val="checkItem.val" v-model="formItem.value" :inputId="checkItem.val"></NbCheckbox>
        <label :for="checkItem.val">{{checkItem.name}}</label>
      </div>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div  v-if="formItem.type === FormItemType.REMINDER" class="reminder">
      <div class="reminder-title">
        友情提示
      </div>
      <div class="reminder-text">
        提交成功后，工作人员会于一个工作日内联系您。
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.RADIO">
      <div v-for="checkItem in formItem.rule.list" :key="checkItem.val">
        <NbRadio :val="checkItem.val" v-model="formItem.value" :inputId="checkItem.val" :name="checkItem.val"></NbRadio>
        <label :for="checkItem.val">{{checkItem.name}}</label>
      </div>
      <div class="mt2" v-show="formItem.errorMsg">
        <i class="fa fa-warning text-danger"></i> <span class="text-danger">{{formItem.errorMsg}}</span>
      </div>
    </div>

    <div v-if="formItem.type === FormItemType.DATE">
      <el-date-picker :id="formItem.id" v-model="formItem.value" type="datetime"
                      :placeholder="formItem.rule.placeholder">
      </el-date-picker>
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
  import NbRadio from "./NbRadio";
  // import NbTanks from "./NbTanks";
  import NbDateRange from "./NbDateRange";
  // import NbMap from "./map/NbMap";
  import NbCheckbox from "./NbCheckbox"
  export default {
    data() {
      return {
        FormItemType: FormItem.prototype.Type,
        phoneValidation: this.$store.state.user.phoneValidation,
        toolTipClass:'company_code_toolTipClass',
        types: 'password',
        seePasswordShow: false,
        noSeePasswordShow: true
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
      // NbMap,
      NbCheckbox
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
      },
      seePassword() {
        this.types = "password";
        this.seePasswordShow = false;
        this.noSeePasswordShow = true;
      },
      noSeePassword() {
        this.types = "text";
        this.noSeePasswordShow = false;
        this.seePasswordShow = true;
      }
    },
    mounted() {
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .nb-form-item {
    .nb-input {
      width: 100%;
      .usual-style {
        width: 100%;
        resize: none;
        outline: none;
        font-size: 18px;
        border: 0;
        border-bottom: 1px solid #EAEEEF;
        padding-bottom: 20px;
        letter-spacing: 1px;
        margin-top: 30px;
      }

      .danger-style {
        color: #CE0058;
        font-size: 14px;
      }

    }
    .company-input{
      width: 100%;
      border-bottom: 1px solid #EAEEEF;
      .company_code_input{
        .company_code{
          width: 80%;
          resize: none;
          outline: none;
          font-size: 18px;
          border: 0;
          padding-bottom: 20px;
          letter-spacing: 1px;
          margin-top: 30px;
        }
        .company_code_question{
          margin-top: 30px;
          width: 18px;
          height: 18px;
          float: right;
          background: url('../../assets/svg/user/companycode.svg') no-repeat center;
          background-size : 18px 18px;
        }


      }
    }
    .nb-validation {
      display: flex;
      justify-content: space-between;
      .validation {
        resize: none;
        outline: none;
        max-width: 150px;
        font-size: 18px;
        border: 0;
        border-bottom: 1px solid #ccc;
        padding-bottom: 20px;
        letter-spacing: 1px;
      }
      .validation-block {
        border: 1px solid #00B3E4;
        color: #00B3E4;
        padding: 13px 18px;
        text-align: center;
        border-radius: 8px;
        font-size: 16px;
      }
      .validation-wait {
        background-color: #00B3E4;
        border: 1px solid #00B3E4;
        color: #FFFFFF;
        min-width: 90px;
        padding: 13px 18px;
        text-align: center;
        border-radius: 8px;
        font-size: 18px;
      }

    }
    .reminder{
      margin: 60px 0 50px 0;
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
  .el-tooltip__popper{
    width: 210px;
    font-size: 16px;
    color: rgb(102, 102, 102);
  }

</style>

