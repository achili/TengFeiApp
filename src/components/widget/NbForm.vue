<template>
  <div class="nb-form">
    <div>
      <div v-for="formItem in httpForm.form" :key="formItem.name" v-if="formItem.type !== FormItemType.HIDDEN">
        <label :for="formItem.id" class="control-label mt5" v-if="formItem.showDescription">{{formItem.description}}</label>
        <div>
          <NbFromItem :formItem="formItem"></NbFromItem>
        </div>
      </div>
    </div>

    <div>
      <NbLoadingButton :entity="httpForm" :callback="callback" :createClass="createClass"
                       :saveText="saveText" :createText="createText" :createIcon="createIcon" :saveIcon="saveIcon"></NbLoadingButton>
    </div>
  </div>
</template>

<script>
  import BaseEntity from "../../common/model/_base/BaseEntity";
  import Tank from "../../common/model/tank/Tank";
  import FormItem from "../../common/model/_base/FormItem";
  import HttpForm from "../../common/model/_base/HttpForm";
  import NbFromItem from "./NbFormItem";
  import NbLoadingButton from "./NbLoadingButton";
  import NbNumberInput from "./NbNumberInput";
  import NbTank from "./NbTank";

  export default {
    data() {
      return {
        FormItemType: FormItem.prototype.Type,
        baseEntity: new BaseEntity(),
        myNumber: "",
        tank: new Tank()
      }
    },
    props: {
      httpForm: {
        type: HttpForm,
        required: true
      },
      beforeSubmit: {
        type: Function,
        required: false,
        default: function () {
          return true;
        }
      },
      successCallback: {
        type: Function,
        required: false
      },
      errorCallback: {
        type: Function,
        required: false
      },
      createText: {
        type: String,
        required: false,
        "default": "创建"
      },
      createClass:{
        type: String,
        required: false,
        "default":"pull-right btn btn-success"
      },
      saveText: {
        type: String,
        required: false,
        "default": "保存"
      },
      createIcon:{
        type: String,
        required: false,
        "default":"fa fa-plus"
      },
      saveIcon:{
        type: String,
        required: false,
        "default":"fa fa-save"
      }
    },
    components: {
      NbLoadingButton,
      NbNumberInput,
      NbTank,
      NbFromItem
    },
    computed: {},
    methods: {
      callback() {
        if(this.beforeSubmit()) {
          this.httpForm.submit(this.successCallback, this.errorCallback);
        }

      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-form {
    label {
      font-weight: normal;
    }
  }
</style>
