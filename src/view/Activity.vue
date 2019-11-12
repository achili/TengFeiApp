<template>
  <div class="main-app-1">
    <Text1 v-if="activity.name==='text1'" :activity="activity"></Text1>
    <Text2 v-if="activity.name==='text2'" :activity="activity"></Text2>
    <PayTest v-if="activity.name==='pay_test'" :activity="activity"></PayTest>
    <Agreement v-if="activity.name==='agreement'" :activity="activity"></Agreement>
    <Splash v-if="activity.name==='splash'" :activity="activity"></Splash>

    <Home v-if="activity.name==='home'" :activity="activity"></Home>
    <Message v-if="activity.name==='message'" :activity="activity"></Message>
    <UserInformation v-if="activity.name==='user_information'" :activity="activity"></UserInformation>
    <SelfInformation v-if="activity.name==='self_information'" :activity="activity"></SelfInformation>
    <BespeakVisit v-if="activity.name==='bespeak_visit'" :activity="activity"></BespeakVisit>
    <InvitingVisit v-if="activity.name==='inviting_visitors'" :activity="activity"></InvitingVisit>
    <WriteCircle v-if="activity.name==='write_circle'" :activity="activity"></WriteCircle>
    <ReportCircle v-if="activity.name==='report_circle'" :activity="activity"></ReportCircle>
    <NewDetail v-if="activity.name==='new_detail'" :activity="activity"></NewDetail>
    <SearchResult v-if="activity.name==='search-result'" :activity="activity"></SearchResult>
    <ImgDetail v-if="activity.name==='img-detail'" :activity="activity"></ImgDetail>
    <SendPosition v-if="activity.name==='send_position'" :activity="activity"></SendPosition>
    <WcListDetails v-if="activity.name==='wc_list_details'" :activity="activity" ></WcListDetails>

    <div @touchstart="touchstart" @touchend="touchend">
      <ActivityDetail v-if="activity.name==='activity_detail'" :activity="activity"></ActivityDetail>
      <Details v-if="activity.name==='details'" :activity="activity"></Details>
      <Archives v-if="activity.name==='archives'" :activity="activity"></Archives>
      <EditInformation v-if="activity.name==='edit_information'" :activity="activity"></EditInformation>
    </div>

    <Login v-if="activity.name==='login'" :activity="activity"></Login>
    <ReLogin v-if="activity.name==='re_login'" :activity="activity"></ReLogin>
    <ChangePassword v-if="activity.name==='reset_password'" :activity="activity"></ChangePassword>
    <Register v-if="activity.name==='register'" :activity="activity"></Register>
    <WeChatRegister v-if="activity.name==='weChat_register'" :activity="activity"></WeChatRegister>
    <Edit v-if="activity.name==='edit'" :activity="activity"></Edit>
    <FindPassword v-if="activity.name==='find_password'" :activity="activity"></FindPassword>
    <About v-if="activity.name==='about'" :activity="activity"></About>
    <AboutBridge v-if="activity.name==='about_bridge'" :activity="activity"></AboutBridge>
    <UserAgreement v-if="activity.name==='user_agreement'" :activity="activity"></UserAgreement>
    <UserManual v-if="activity.name==='user_manual'" :activity="activity"></UserManual>
    <CommonProblem  v-if="activity.name==='common_problem'" :activity="activity"></CommonProblem>
    <PostsProblem  v-if="activity.name==='posts_problem'" :activity="activity"></PostsProblem>
    <RoomReservation  v-if="activity.name==='room_reservation'" :activity="activity"></RoomReservation>
    <RefundCycle  v-if="activity.name==='refund_cycle'" :activity="activity"></RefundCycle>
    <PaymentSlip  v-if="activity.name==='payment_slip'" :activity="activity"></PaymentSlip>
    <PaymentMethod  v-if="activity.name==='payment_method'" :activity="activity"></PaymentMethod>
    <OtherInvoice  v-if="activity.name==='other_invoice'" :activity="activity"></OtherInvoice>
    <OpeningHours  v-if="activity.name==='opening_hours'" :activity="activity"></OpeningHours>
    <Invoice  v-if="activity.name==='invoice'" :activity="activity"></Invoice>
    <FieldReservation  v-if="activity.name==='field_reservation'" :activity="activity"></FieldReservation>
    <SoftwareLicense v-if="activity.name==='software_license'" :activity="activity"></SoftwareLicense>
    <HeadCut v-if="activity.name==='head_cut'" :activity="activity"></HeadCut>

    <RoomBook v-if="activity.name==='roomBook'" :activity="activity"></RoomBook>
    <IntroducTionVisit v-if="activity.name==='introducTionVisit'" :activity="activity"></IntroducTionVisit>
    <IntroducTionBook v-if="activity.name==='introducTionBook'" :activity="activity"></IntroducTionBook>
    <ActiveSiteBook v-if="activity.name==='activeSiteBook'" :activity="activity"></ActiveSiteBook>
    <Service v-if="activity.name==='service'" :activity="activity"></Service>

    <ActiveOrder v-if="activity.name==='activeOrder'" :activity="activity"></ActiveOrder>
    <ActivesOrder v-if="activity.name==='activesOrder'" :activity="activity"></ActivesOrder>
    <MeetingOrder v-if="activity.name==='meetingOrder'" :activity="activity"></MeetingOrder>
    <MeetingPay v-if="activity.name==='meetingPay'" :activity="activity"></MeetingPay>
    <QuickIntoPay v-if="activity.name==='quickIntoPay'" :activity="activity"></QuickIntoPay>
    <QuickIntoBook v-if="activity.name==='quickIntoBook'" :activity="activity"></QuickIntoBook>
    <SpaceOrder v-if="activity.name==='spaceOrder'" :activity="activity"></SpaceOrder>
    <VisitOrder v-if="activity.name==='visitOrder'" :activity="activity"></VisitOrder>
    <InviteOrder v-if="activity.name==='inviteOrder'" :activity="activity" ></InviteOrder>
    <CircleOrder v-if="activity.name==='circleOrder'" :activity="activity" ></CircleOrder>

    <transition :name="transition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Activity from "../common/model/_base/Activity";

  const HelloWorld = Vue.component('HelloWorld', function (resolve) {
    require(['../v-activity/HelloWorld'], resolve)
  });
  const Text1 = Vue.component('Text1', function (resolve) {
    require(['../v-activity/Text1'], resolve)
  });
  const Text2 = Vue.component('Text2', function (resolve) {
    require(['../v-activity/Text2'], resolve)
  });
  const PayTest = Vue.component('PayTest', function (resolve) {
    require(['../v-activity/PayTest'], resolve)
  });
  const Agreement = Vue.component('Agreement', function (resolve) {
    require(['../v-activity/Agreement'], resolve)
  });

  const Splash = Vue.component('Splash', function (resolve) {
    require(['../v-activity/other/Splash'], resolve)
  });
  const Home = Vue.component('Home', function (resolve) {
    require(['../v-activity/home/Home'], resolve)
  });


  const BespeakVisit = Vue.component('BespeakVisit', function (resolve) {
    require(['../v-activity/home/BespeakVisit'], resolve)
  });
  const InvitingVisit = Vue.component('InvitingVisit', function (resolve) {
    require(['../v-activity/home/InvitingVisit'], resolve)
  });
  const WriteCircle = Vue.component('WriteCircle', function (resolve) {
    require(['../v-activity/home/WriteCircle'], resolve)
  });

  const ReportCircle = Vue.component('ReportCircle', function (resolve) {
    require(['../v-activity/home/ReportCircle'], resolve)
  });


  const NewDetail = Vue.component('NewDetail', function (resolve) {
    require(['../v-activity/home/NewDetail'], resolve)
  });
  const ActivityDetail = Vue.component('ActivityDetail', function (resolve) {
    require(['../v-activity/home/ActivityDetail'], resolve)
  });
  const SearchResult = Vue.component('SearchResult', function (resolve) {
    require(['../v-activity/home/SearchResult'], resolve)
  });
  const ImgDetail = Vue.component('ImgDetail', function (resolve) {
    require(['../v-activity/home/ImgDetail'], resolve)
  });
  const SendPosition = Vue.component('SendPosition', function (resolve) {
    require(['../v-activity/home/SendPosition'], resolve)
  });
  const WcListDetails = Vue.component('WcListDetails', function (resolve) {
    require(['../v-activity/home/WcListDetails'], resolve)
  });

  const UserInformation = Vue.component('UserInformation', function (resolve) {
    require(['../components/home/user/UserInformation'], resolve)
  });
  const SelfInformation = Vue.component('SelfInformation', function (resolve) {
    require(['../components/home/user/SelfInformation'], resolve)
  });
  const Message = Vue.component('Message', function (resolve) {
    require(['../components/home/user/Message'], resolve)
  });

  const Login = Vue.component('Login', function (resolve) {
    require(['../v-activity/login/Login'], resolve)
  });
  const ReLogin = Vue.component('ReLogin', function (resolve) {
    require(['../v-activity/login/ReLogin'], resolve)
  });
  const ChangePassword = Vue.component('ChangePassword', function (resolve) {
    require(['../v-activity/login/ResetPassword'], resolve)
  });
  const Register = Vue.component('Register', function (resolve) {
    require(['../v-activity/login/Register'], resolve)
  });
  const WeChatRegister = Vue.component('WeChatRegister', function (resolve) {
    require(['../v-activity/login/WeChatRegister'], resolve)
  });
  const Edit = Vue.component('Edit', function (resolve) {
    require(['../v-activity/login/Edit'], resolve)
  });
  const FindPassword = Vue.component('FindPassword', function (resolve) {
    require(['../v-activity/login/FindPassword'], resolve)
  });
  const Archives = Vue.component('Archives', function (resolve) {
    require(['../v-activity/more/Archives'], resolve)
  });
  const EditInformation = Vue.component('EditInformation', function (resolve) {
    require(['../v-activity/more/EditInformation'], resolve)
  });
  const About = Vue.component('About', function (resolve) {
    require(['../v-activity/more/About'], resolve)
  });
  const AboutBridge = Vue.component('AboutBridge', function (resolve) {
    require(['../v-activity/more/about/AboutBridge'], resolve)
  });
  const UserAgreement = Vue.component('UserAgreement', function (resolve) {
    require(['../v-activity/more/user/UserAgreement'], resolve)
  });
  const UserManual = Vue.component('UserManual', function (resolve) {
    require(['../v-activity/more/UserManual'], resolve)
  });
  const SoftwareLicense = Vue.component('SoftwareLicense', function (resolve) {
    require(['../v-activity/login/SoftwareLicense'], resolve)
  });
  const HeadCut = Vue.component('HeadCut', function (resolve) {
    require(['../v-activity/more/HeadCut'], resolve)
  });




  const RoomBook = Vue.component('RoomBook', function (resolve) {
    require(['../components/space/conferenceroom/RoomBook'], resolve)
  });
  const IntroducTionVisit = Vue.component('IntroducTionVisit', function (resolve) {
    require(['../components/space/introduction/introducTionVisit'], resolve)
  });
  const IntroducTionBook = Vue.component('IntroducTionBook', function (resolve) {
    require(['../components/space/introduction/introducTionBook'], resolve)
  });
  const ActiveSiteBook = Vue.component('ActiveSiteBook', function (resolve) {
    require(['../components/space/activesite/activeSiteBook'], resolve)
  });
  const Details = Vue.component('Details', function (resolve) {
    require(['../components/space/publicmodular/details'], resolve)
  });
  const Service = Vue.component('Service', function (resolve) {
    require(['../components/space/publicmodular/service'], resolve)
  });
  const QuickIntoBook = Vue.component('QuickIntoBook', function (resolve) {
    require(['../components/space/introduction/QuickIntoBook'], resolve)
  });
  const QuickIntoPay = Vue.component('QuickIntoPay', function (resolve) {
    require(['../components/space/introduction/QuickIntoPay'], resolve)
  });


  const ActiveOrder = Vue.component('ActiveOrder', function (resolve) {
    require(['../v-activity/more/spaceOrder/active/activeOrder'], resolve)
  });
  const ActivesOrder = Vue.component('ActivesOrder', function (resolve) {
    require(['../v-activity/more/spaceOrder/activespace/activesOrder'], resolve)
  });
  const MeetingOrder = Vue.component('MeetingOrder', function (resolve) {
    require(['../v-activity/more/spaceOrder/meeting/meetingOrder'], resolve)
  });
  const MeetingPay = Vue.component('MeetingPay', function (resolve) {
    require(['../v-activity/more/spaceOrder/orderPay/MeetingPay'], resolve)
  });
  const SpaceOrder = Vue.component('SpaceOrder', function (resolve) {
    require(['../v-activity/more/spaceOrder/space/spaceOrder'], resolve)
  });
  const VisitOrder = Vue.component('VisitOrder', function (resolve) {
    require(['../v-activity/more/spaceOrder/visit/visitOrder'], resolve)
  });
  const InviteOrder = Vue.component('InviteOrder', function (resolve) {
    require(['../v-activity/more/spaceOrder/invite/InviteOrder'], resolve)
  });
  const CircleOrder = Vue.component('CircleOrder', function (resolve) {
    require(['../v-activity/more/spaceOrder/circle/CircleOrder'], resolve)
  });
  const CommonProblem = Vue.component('CommonProblem', function (resolve) {
    require(['../v-activity/more/CommonProblem'], resolve)
  });
  const PostsProblem = Vue.component('PostsProblem', function (resolve) {
    require(['../v-activity/more/problem/PostsProblem'], resolve)
  });
  const FieldReservation = Vue.component('FieldReservation', function (resolve) {
    require(['../v-activity/more/problem/FieldReservation'], resolve)
  });
  const Invoice = Vue.component('Invoice', function (resolve) {
    require(['../v-activity/more/problem/Invoice'], resolve)
  });
  const OpeningHours = Vue.component('OpeningHours', function (resolve) {
    require(['../v-activity/more/problem/OpeningHours'], resolve)
  });
  const OtherInvoice = Vue.component('OtherInvoice', function (resolve) {
    require(['../v-activity/more/problem/OtherInvoice'], resolve)
  });
  const PaymentMethod = Vue.component('PaymentMethod', function (resolve) {
    require(['../v-activity/more/problem/PaymentMethod'], resolve)
  });
  const PaymentSlip = Vue.component('PaymentSlip', function (resolve) {
    require(['../v-activity/more/problem/PaymentSlip'], resolve)
  });
  const RefundCycle = Vue.component('RefundCycle', function (resolve) {
    require(['../v-activity/more/problem/RefundCycle'], resolve)
  });
  const RoomReservation = Vue.component('RoomReservation', function (resolve) {
    require(['../v-activity/more/problem/RoomReservation'], resolve)
  });
  export default {
    name: 'activity',
    data() {
      return {
        activity: new Activity(),
        transition: "",
        index: 0,
        //触发距离
        triggerDistance: 70,
        triggerSpeed: 0.6,
        startX: 0,
        startTime: 0
      }
    },
    components: {
      RoomReservation,
      RefundCycle,
      PaymentSlip,
      PaymentMethod,
      OtherInvoice,
      OpeningHours,
      Invoice,
      FieldReservation,
      PostsProblem,
      CommonProblem,
      HelloWorld,
      Text1,
      Text2,
      PayTest,
      Agreement,
      Splash,
      Home,
      BespeakVisit,
      InvitingVisit,
      WriteCircle,
      ReportCircle,
      NewDetail,
      ActivityDetail,
      SearchResult,
      QuickIntoPay,
      UserInformation,
      SelfInformation,
      Message,
      Login,
      ReLogin,
      ChangePassword,
      Register,
      WeChatRegister,
      Edit,
      FindPassword,
      Archives,
      EditInformation,
      About,
      AboutBridge,
      UserAgreement,
      UserManual,
      SoftwareLicense,
      RoomBook,
      IntroducTionVisit,
      IntroducTionBook,
      ActiveSiteBook,
      Details,
      Service,
      ActiveOrder,
      ActivesOrder,
      MeetingOrder,
      MeetingPay,
      QuickIntoBook,
      SpaceOrder,
      VisitOrder,
      InviteOrder,
      ImgDetail,
      CircleOrder,
      SendPosition,
      WcListDetails
    },
    methods: {
      touchstart(e) {
        this.startX = e.changedTouches[0].clientX;
        this.startTime = e.timeStamp
      },
      touchend(e) {
        let distance = e.changedTouches[0].clientX - this.startX;
        let speed = Math.abs(distance) / (e.timeStamp - this.startTime);
        if(distance > this.triggerDistance) {
          if(speed > this.triggerSpeed) {
            this.$router.closeActivity()
          }
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.transition = this.$router.transition;
      let myNext = next;
      //就是那么骚！╮(╯▽╰)╭
      setTimeout(function () {
        myNext();
      },"5");
    },
    mounted() {
      let a = Activity.initActivity(this.$route.query);
      if(a) {
        this.activity = a;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .main-app-1 {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: white;
    transition: all .4s cubic-bezier(.55,0,.1,1);

    .slide-left-enter, .slide-right-leave-active {
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }
    .slide-left-leave-active, .slide-right-enter {
      -webkit-transform: translate(-100%, 0);
      transform: translate(-100%, 0);
    }

    .slide-top-enter, .slide-top-leave-active {
      -webkit-transform: translate(0 100%);
      transform: translate(0, 100%);
    }
    .slide-bottom-leave-active, .slide-bottom-enter {
      -webkit-transform: translate(0, -100%);
      transform: translate(0, -100%);
    }
  }
</style>

