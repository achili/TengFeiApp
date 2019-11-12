import store from "../../../_store";
import {generateId} from "../../../common/util/Utils";


export default class Activity {
  constructor (name = null, query = {}) {
    this.id = generateId(4);
    this.name = name;
    this.query = query
  }

  isMostTop() {
    return store.state.activityList[store.state.activityList.length - 1].id === this.id;
  };

  static getTopActivity() {
    if(store.state.activityList.length === 0) {
      return null
    }
    return store.state.activityList[store.state.activityList.length - 1];
  };

  static initActivity(query) {
    let params = store.state.route.params;
    let paramKeys = Object.keys(params).reverse();

    //判断是否需要初始化
    if(store.state.activityList.length < paramKeys.length) {
      let activity = new Activity(params[paramKeys[0]], query);

      if(store.state.activityList.length !== 0) {
        if(store.state.activityList[store.state.activityList.length - 1].name === params[paramKeys[0]]) {
          activity = new  Activity(params[paramKeys[store.state.activityList.length]]);
          store.state.activityList.unshift(activity);
          return activity;
        }
      }
      store.state.activityList.push(activity);
      return activity;
    }
    return null;
  }
}
