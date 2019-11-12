<template>
  <div class="user-manual">
    <div class="user-manual-header">
      <div class="user-manual-title">
        <div class="user-manual-first-block-svg" @click="$router.closeActivity()" :style="'background:url(\''+(require('../../assets/svg/register/arrow.svg'))+'\') center no-repeat'"></div>
        <div class="user-manual-first-block-name">奕桥-Park用户使用手册</div>
      </div>
    </div>
    <div class="user-manual-content">
      <div class="user-manual-box">
        <div class="user-manual-box-title">
          一、 注册/登录流程
        </div>
        <ul>
          <li>
            1.1 注册<br/>
            如果您需要注册，步骤如下:<br/>
            <p>
              1、登陆页面  > 马上注册 > 填写手机号（有效手机号）> 点击“获取验证码” > 填写验证码 > 输入密码 > 输入确认密码 > 点击“注册”。。
            </p>
            <img src="../../../src/assets/manual/1.jpg" style="width: 28vw;height: 200px;">
            <img src="../../../src/assets/manual/2.jpg" style="width: 28vw;height: 200px;">
            <p>
              2、完成“注册”后可选择：1、可完善个人信息，编辑个人信息 > 填写姓名、地点、电子邮件、公司名称 等。2、选择“跳过”完成注册。（后续可在“更多”中编辑个人档案中完善个人信息）。
            </p>
            <img src="../../../src/assets/manual/3.jpg" style="width: 26vw;height: 200px;">
          </li>

          <li>
            1.2 登录<br/>
            <p>
              输入手机号码 > 密码 > 点击“登录”即可登录。
            </p>
            <img src="../../assets/manual/4.jpg" style="width: 28vw;height: 200px;">
          </li>

          <li>
            1.3 微信登录<br/>
            <p>
              1、 如果账号已经绑定微信，即可以使用微信登陆，使用微信点击“微信登录”即可自动登录。<br/>
              2、	还未进行注册的用户，使用微信登陆，首先需要进行注册（参考：注册），然后绑定微信号。
            </p>
            <img src="../../../src/assets/manual/5.jpg" style="width: 28vw;height: 200px;">
          </li>

          <li>
            1.4 忘记密码<br/>
            <p>
              如果您忘记密码，需要重置密码，步骤为：<br/>
              1、点击“忘记密码” > 输入手机号 > 点击“获取验证码”> 填写验证码 > 点击“提交”<br/>
              2、重置密码：填写设置密码 > 确认密码 > 点击提交
            </p>
            <img src="../../../src/assets/manual/6.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/7.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/8.jpg" style="width: 26vw;height: 200px;">
          </li>
        </ul>
        <div class="user-manual-box-title">
          二、 邀请访客
        </div>
        <ul>
          <li>
            <p>
              如果您想邀请客户或其他外部访客来访，邀请访客的步骤为：<br/>
              1、首页 > 点击“邀请访客” > 填写信息 > 点击“确认邀请”。
            </p>
            <img src="../../../src/assets/manual/a.jpg" style="width: 28vw;height: 200px;">
            <img src="../../../src/assets/manual/b.jpg" style="width: 28vw;height: 200px;">
          </li>

          <li>
            <p>
              2、完成邀请访客后，即可通过微信、电子邮件或复制链接分享给您邀请的访客。
            </p>
            <img src="../../../src/assets/manual/c.jpg" style="width: 28vw;height: 200px;">
          </li>

          <li>
            <p>
              3、当您的访客点击您分享的链结后，访客将收到一份“邀请访问涵”链接，受邀的访客点击链接，在要求访问函的页面输入“姓名”> “手机号”> “验证码”> 点击“提交”
            </p>
            <img src="../../../src/assets/manual/d.jpg" style="width: 28vw;height: 200px;">
          </li>

          <li>
            <p>
              4、提交成功后，受邀的访客将会获取二维码。二维码将会在访问时间前15分钟生效。
            </p>
            <img src="../../../src/assets/manual/e.jpg" style="width: 28vw;height: 200px;">
            <img src="../../../src/assets/manual/f.jpg" style="width: 28vw;height: 200px;">
          </li>
        </ul>
        <div class="user-manual-box-title">
          三、 预约参观
        </div>
        <ul>
          <li>
            <p>
              如果您对我们空间感兴趣，您可以使用奕桥Park APP进行预约。<br/>
              1、预约的方式:<br/>
              ①首页 > 点击 “预约参观”。<br/>
              ②空间 > 点击 “预约参观”。<br/>
            </p>
            <img src="../../../src/assets/manual/g.jpg" style="width: 28vw;height: 200px;">
            <img src="../../../src/assets/manual/h.jpg" style="width: 28vw;height: 200px;">
          </li>

          <li>
            <p>
              2、在出现的列表中填写您的详细信息【姓名、电话、参观的日期、时间，选择感兴趣的空间（移动办公桌、私人办公室、活动场地、会议室）】，如果您有其他的需求，可在备注中填写 > 最后点击点击“确认预约“即可完成预约。<br/>
              <span style="color: red;">*完成预约后，工作人员会尽快与您联系。</span><br/>
              <span style="color: red;">*您的个人通行二维码将在您选择开始开始参观的时间开始生效。</span>
            </p>
            <img src="../../../src/assets/manual/i.jpg" style="width: 28vw;height: 200px;">
            <img src="../../../src/assets/manual/j.jpg" style="width: 28vw;height: 200px;">
          </li>
        </ul>
        <div class="user-manual-box-title">
          四、 发朋友圈
        </div>
        <ul>
          <li>
            1、发布圈子<br/>
            <p>
              首页 > 点击右侧 图标 > 编辑内容（可输入150字） > 添加照片 （可添加8张照片）> 添加定位> 点击“发送”，即完成圈子的发布。
            </p>
            <img src="../../../src/assets/manual/k.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/l.jpg" style="width: 26vw;height: 200px;">
          </li>

          <li>
            2、退出发布：<br/>
            <p>
              如果需要退出，在编辑页面点击 ← 符号，即可完成退出编辑。
            </p>
            <img src="../../../src/assets/manual/m.jpg" style="width: 26vw;height: 200px;">
          </li>

          <li>
            3、删除圈子：<br/>
            <p>
              如果您想删除您发的圈子，点击您圈子的右上角的图标… >在弹出的弹框点击“删除”即可完成删除。
            </p>
            <img src="../../../src/assets/manual/n.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/o.jpg" style="width: 26vw;height: 200px;">
          </li>
        </ul>
        <div class="user-manual-box-title">
          五、 活动场地的预定
        </div>
        <ul>
          <li>
            <p>
              如果您需要预定活动场地您可以在首页 > 空间 > 活动场地中查看详细信息并预定。<br/>
              预订活动场地的步骤：<br/>
            </p>
            <p>
              1、首页> 空间 > 活动场地 > 点击“我要预订” >填写相关信息 > 点击“确认预定”。<br/>
              2、预订成功后您会收到预订信息，稍后社区经理会电话联系您，进一步确认您的需求。
            </p>
            <span style="color: red;"> *若有特别需求，请在“要求备注”中填写其他要求。</span><br/>
            <img src="../../../src/assets/manual/p.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/q.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/r.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/s.jpg" style="width: 26vw;height: 200px;">
          </li>
        </ul>
        <div class="user-manual-box-title">
          六、 会议室
        </div>
        <ul>
          <li>
            6.1预定会议室与支付<br/>
            <p>
              如果您需要预定会议室您可以在首页APP > 空间 > 会议室中查看详细信息并进行预定和支付。<br/>
              预订会议室可在首页和空间中预订，具体的预订方式如下：<br/>
            </p>
            <p>
              首页 > 会议室（空间> 会议室）> 选择日期 > 选择会议室 > 选择可使用的时间 或者 可容纳人数 > 点击“我要预订” > 选择支付方式 > 进行支付（进入支付页面）  > 支付成功 > 在我的会议室记录中状态为“已支付”。
            </p>
            <span style="color: red;">*提示：请在15分钟内完成支付，否则订单将自动取消。</span><br/>
            <span style="color: red;">*如果您选择“POS机”支付请到前台找社区经理。</span><br/>
            <span style="color: red;">*支付成功后个人通行二维码将会在会议开始前15分钟生效。</span><br/>
            <img src="../../../src/assets/manual/t.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/u.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/v.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/w.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/x.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/y.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/z.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2a.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2b.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2c.jpg" style="width: 26vw;height: 200px;">
          </li>

          <li>
            6.2取消<br/>
            <p>
              如果您需要取消已经预订的会议室，您可在 “更多” > 我的订单> 会议室即可查看会议室的订单。
            </p>
            <p>
              取消订单：如果需要取消已经预定的会议室，点击订单向左滑动，点击“取消” >在提示框中点击“是”即可取消已经预定的会议室。取消成功已经支付的租金将会原路返回。<br/>
              取消订单规则：请在会议室开始前2个小时取消会议室订单。在规定的时间内取消，全额返回租金,如果超过规定的时间内取消，租金将全部没收。
            </p>
            <img src="../../../src/assets/manual/2d.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2e.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2f.jpg" style="width: 26vw;height: 200px;">
          </li>
        </ul>
        <div class="user-manual-box-title">
          七、 空间（私人办公室 / 移动办公桌）
        </div>
        <ul>
          <li>
            <p>
              在空间预订中可以选择“快速入驻”或者“我要预订”。
            </p>
            <p>
              “快速入住”是指预订移动办公桌，使用时间在1-28天内，预订完成后可直接线上签约在线支付租金。
            </p>
            <p>
              “我要预订”是指常规的移动办公桌和独立办公室的预订（线上提供需求，线下签约）。
            </p>
          </li>
          <li>
            7.1 预订“快速入驻”&支付<br/>
            <p>
              预订“快速入住” 在空间  > 简介 > 点击“快速预定” >  选择开始日期 / 结束日期  >  点击“确认提交” >  确认订单详情 >  选择同意《奕桥会员协议》   >  点击“确认支付” > 选择支付方式 >  进行支付（进入支付页面）> 支付成功 > 在我的空间记录中状态为“已支付”。
            </p>
            <p>
              Noted：如果选择POS机支付，线下找社区经理完成支付。
            </p>
            <img src="../../../src/assets/manual/2g.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2h.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2i.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2j.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2k.jpg" style="width: 26vw;height: 200px;">
          </li>

          <li>
            7.2预订“我要预订”<br/>
            <p>
              如果客户需要进行常规的移动办公桌和独立办公室的预订可以选择“我要预订” > 填写相关信息，在空间类型中选择“移动办公桌”或“独立办公室” > 填写工位数量 > 填写预备入驻日期 > 点击“我要预定”。
            </p>
            <span style="color: red;">*若有特别需求，请在“其他要求”的表格内填写其他要求。</span><br/>
            <img src="../../../src/assets/manual/2l.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2m.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2n.jpg" style="width: 26vw;height: 200px;">
          </li>
          <li>
            7.3查看订单<br/>
            <p>
              如果您需要查看您预订空间的信息，您可在“更多” > 我的订单> “空间”即可查看已经申请的空间（私人办公室、移动工位）的处理情况（审核中、未通过、已通过）
            </p>
            <span style="color: red;">*若有特别需求，请在“其他要求”的表格内填写其他要求。</span><br/>
            <img src="../../../src/assets/manual/2o.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2p.jpg" style="width: 26vw;height: 200px;">
          </li>
          <li>
            7.4取消订单<br/>
            <p>
              如果您需要取消已经您预订空间，您可在APP的“更多” > 我的订单> “空间”中取消订单。
            </p>
            <p>
              取消订单：如果需要取消已经预订的空间订单，点击订单向左滑动行，点击“取消”，在提示框中点击“是”即可取消已经预订的空间。<br/>
              取消原则：如果您取消的是“快速入驻”预订的移动办公桌的订单，在该订单开始的前一天，您可以随时取消，举例：8月10号开始，在8月9号23:59前可随时取消该订单。
              如果您要取消的“我要预订”预订的移动办公桌或者独立办公室的订单，请在与社区经理线下签订合同前告知社区经理。
            </p>
            <img src="../../../src/assets/manual/2q.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2r.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/2s.jpg" style="width: 26vw;height: 200px;">
          </li>
        </ul>
        <div class="user-manual-box-title">
          八、 付款信息单支付
        </div>
        <ul>
          <li>
            <p>
              您每月的付款信息单都会通过邮件的形式发送给你，您可以点击付款信息中的支付链接进行支付。<br/>
              支付的步骤如下：
            </p>
            <p>
              1.点击/复制支付链接，在出现的页面中选择支付方式<br/>
              ① 支付宝 、 微信<br/>
              ② 网银支付<br/>
              ③ 企业网银
            </p>
            <img src="../../../src/assets/manual/2t.jpg" style="width: 100%;height: 100%;">
            <img src="../../../src/assets/manual/2u.jpg" style="width: 100%;height: 100%;">
          </li>

          <li>
            8.1支付宝、微信支付<br/>
            <p>
              选择支付宝、微信进行支付的方式如下：
            </p>
            <p>
              1.点击微信或者支付宝 > 点击“去支付”。
            </p>
            <img src="../../../src/assets/manual/2v.jpg" style="width: 100%;height: 100%;">
            <p>
              2.在跳转的页面中用手机扫一扫二维码，在手机上确认支付。
            </p>
            <img src="../../../src/assets/manual/2w.jpg" style="width: 100%;height: 100%;">
            <p>
              3.支付完成后显示支付成功。
            </p>
            <img src="../../../src/assets/manual/2x.jpg" style="width: 100%;height: 100%;">
          </li>
          <li>
            8.2网银在线支付<br/>
            <p>
              选择网银支付的方式如下:
            </p>
            <p>
              1.点击网银在线支付 > 点击“去支付”。
            </p>
            <img src="../../../src/assets/manual/2y.jpg" style="width: 100%;height: 100%;">
            <p>
              2.在跳转的页面中用输入银行卡号 > 验证银行卡信息 > 完成支付。。
            </p>
            <img src="../../../src/assets/manual/2z.jpg" style="width: 100%;height: 100%;">
            <p>
              3.支付完成后显示支付成功。
            </p>
            <img src="../../../src/assets/manual/2x.jpg" style="width: 100%;height: 100%;">
          </li>
          <li>
            8.3企业网银在线支付<br/>
            <p>
              选择企业网银支付支付的方式如下：
            </p>
            <p>
              1.点击网银在线支付 > 点击“去支付”。
            </p>
            <img src="../../../src/assets/manual/3a.jpg" style="width: 100%;height: 100%;">
            <p>
              2. 在跳转的页面中选择银行 > 点击到网上银行支付 > 进行复核 > 完成支付。
            </p>
            <img src="../../../src/assets/manual/3b.jpg" style="width: 100%;height: 100%;">
            <p>
              3.支付完成后显示支付成功。
            </p>
            <img src="../../../src/assets/manual/3c.jpg" style="width: 100%;height: 100%;">
          </li>
        </ul>
        <div class="user-manual-box-title">
          九、 联系小桥
        </div>
        <ul>
          <li>
            <p>
              当你有任何问题，或者需要帮助的时候你可以联系小桥（管理员）。<br/>
              联系小桥的步骤为：首页 > 点击“呼唤小桥” <br/>
              您可以选择给小桥到电话或者给小桥留言。 <br/>
            </p>
            <img src="../../../src/assets/manual/3d.jpg" style="width: 26vw;height: 200px;">
            <img src="../../../src/assets/manual/3e.jpg" style="width: 26vw;height: 200px;">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    data () {
      return {

      }
    },
    props:{
    },
    components: {
    },
    methods : {
      goClose(){
        this.$router.closeActivity()
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .user-manual{
    .user-manual-header{
      padding: 10px 20px 10px 20px;
      .user-manual-title{
        position: relative;
        font-size: 18px;
        .user-manual-first-block-svg{
          height: 30px;
          width: 30px;
          display: inline-block;
        }
        .user-manual-first-block-name{
          display: inline-block;
          position: absolute;
          right: 20%;
          font-weight: bold;
          line-height: 32px;
        }
      }
    }
    .user-manual-content {
      height: 100vh;
      overflow-y: scroll;
      -webkit-overflow-scrolling:touch;
      .user-manual-box{
        padding:0 20px 60px 0;
        font-size: 14px;
        .user-manual-box-title {
          text-align: center;
          font-size: 16px;
        }
      }
    }

  }
</style>
