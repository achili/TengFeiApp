import Vue from 'vue'
import App from './view/App'
import router from './_router'
import store from './_store'
import VueResource from 'vue-resource'
import filters from './common/filter'
import {sync} from 'vuex-router-sync'

import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.css";
import "animate.css/animate.min.css";

import {DatePicker,Option,Select,TimeSelect,TimePicker,Tooltip} from 'element-ui';
import VueAMap  from 'vue-amap';
import VueScroller from 'vue-scroller'

import VueClipboard from 'vue-clipboard2'

// 在入口文件中引入(暂时不支持单组件引入的方式):
import wcSwiper from 'wc-swiper';
import 'wc-swiper/style.css';
Vue.use(wcSwiper);
Vue.config.productionTip = false;
//为vue对象添加自定义内容，使得全局可见
Vue.store = store;
Vue.router = router;
sync(store, router);
Vue.use(VueResource);
Vue.http.options.root = store.state.host;
//注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
Vue.use(DatePicker);
Vue.use(VueScroller);
Vue.use(Option);
Vue.use(Select);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Tooltip);
//高德地图
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '81298fa343888077f3dff87115c347be',
  //引入解析经纬度的组件
  plugin: ['Geocoder']
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});

//剪切板功能
Vue.use(VueClipboard);
