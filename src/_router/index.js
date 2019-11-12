import Vue from 'vue'
import Router from 'vue-router'
import store from '../_store'

import Activity from '../view/Activity'
import Blank from '../view/Blank'
import ActivityClass from "../common/model/_base/Activity";

let activityNameList = {
  roomBook:1,
  activeSiteBook:2,
  introducTionVisit:3,
  introducTionBook:4,
  write_circle:5,
  inviting_visitors:6
};
//打开一个新的Activity
Router.prototype.openActivity = function (activityName, transition = "slide-left", query = {}) {
  //防止安卓出现连续多次openActivity的情况 动画时长：0.4s 间隔：0.8s
  let currentTime = new Date();
  if(this.lastOpenActivitytime) {
    if(currentTime.getTime() - this.lastOpenActivitytime.getTime() < 800) {
      return;
    }
  }
  this.lastOpenActivitytime = currentTime;

  transition = "slide-left";
  this.transition = transition;
  this.push({path: store.state.route.path + "/" + activityName, query: query});
  if(activityNameList[activityName]){
    if (store.state.user.isLogin) {

    } else {
      this.push({path: store.state.route.path + "/login", query: query});
    }
  }
};
//关闭最上层的Activity  目前还不支持关闭中间的Activity
Router.prototype.closeActivity = function (transition = "slide-right", toActivity) {
  transition = "slide-right";
  let lastActivity = ActivityClass.getTopActivity();
  if(lastActivity.name === 'home') {
    if(!store.state.tabNavigation.home[0].active) {
      store.state.tabNavigation.home.forEach(e => {
        e.active = false;
      });
      store.state.tabNavigation.home[0].active = true;
      return;
    }
    let stratTime = new Date();
    if(this.closeStratTime && stratTime.getTime() - this.closeStratTime.getTime() < 2000) {
      store.state.plus.runtime.quit();
    } else {
      store.state.plus.nativeUI.toast("再按一次返回键回到桌面",{duration:"short"});
      this.closeStratTime = stratTime;
    }
  } else {
    let path = store.state.route.path;
    let newPath = path;
    if(toActivity) {
      try {
        while(ActivityClass.getTopActivity().name !== "home") {
          this.transition = transition;
          store.state.activityList.pop();
          newPath = newPath.slice(0, newPath.lastIndexOf("/"));
          this.push({path: newPath, query: ActivityClass.getTopActivity().query})
        }
      } catch (e) {
        this.openActivity(toActivity)
      }

    } else {
      this.transition = transition;
      store.state.activityList.pop();
      newPath = path.slice(0, path.lastIndexOf("/"));
      this.push({path: newPath, query: ActivityClass.getTopActivity().query})
    }
  }
};

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/app',
      component: Blank,
      children: [{
        path: ':app1',
        component: Activity,
        children: [{
          path: ':app2',
          component: Activity,
          children: [{
            path: ':app3',
            component: Activity,
            children: [{
              path: ':app4',
              component: Activity,
              children: [{
                path: ':app5',
                component: Activity,
                children: [{
                  path: ':app6',
                  component: Activity,
                  children: [{
                    path: ':app7',
                    component: Activity,
                    children: [{
                      path: ':app8',
                      component: Activity,
                      children: [{
                        path: ':app9',
                        component: Activity,
                        children: [{
                          path: ':app10',
                          component: Activity,
                          children: [{
                            path: ':app11',
                            component: Activity,
                            children: [{
                              path: ':app12',
                              component: Activity,
                              children: [{
                                path: ':app13',
                                component: Activity,
                                children: [{
                                  path: ':app14',
                                  component: Activity,
                                  children: [{
                                    path: ':app15',
                                    component: Activity,
                                    children: [{
                                      path: ':app16',
                                      component: Activity,
                                      children: [{
                                        path: ':app17',
                                        component: Activity,
                                        children: [{
                                          path: ':app18',
                                          component: Activity,
                                          children: [{
                                            path: ':app19',
                                            component: Activity
                                          }]
                                        }]
                                      }]
                                    }]
                                  }]
                                }]
                              }]
                            }]
                          }]
                        }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      }]
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(transition => {

});

export default router
