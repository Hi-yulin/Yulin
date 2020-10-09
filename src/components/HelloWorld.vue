
<template>
  <div class="ContactWrap">
    <div class="Contact">
      <div class="ContactSide">
        <div class="ContactSide-tip">联系人</div>
        <div v-for="(item,index) in userList" :key="index">
          <div class="ContactItem" @click="chooseUser(item)" :class="{ChooseItem : item.uid == chooseId}">
            <img class="UserAvator" :src="item.avaUrl" alt="头像" />
            <div class="UserContent">
              <div class="UserMsg">
                <span class="UserName">{{item.username}}</span>
                <span class="MsgTime">06-22</span>
              </div>
              <div class="UserSnippet">{{item.content}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="ContactBox">
        <div class="ContactBox-header">再见</div>
        <div class="MessageBox" ref="MessageBox">
          <div
            v-for="(item,index) in chatList"
            :key="index"
            class="Message"
            :style="item.id == uid?'flex-direction:row-reverse':''"
          >
            <!-- <div class="UserHead"> -->
            <img :src="item.avaUrl" class="UserAvator" />
            <!-- </div> -->
            <div class="UserMsg" :class="item.id == uid?'RightMessage':'LeftMessage'">
              <span :style="item.id == uid?' float: right;':''">{{item.content}}</span>
            </div>
          </div>
        </div>
        <!-- 输入框 -->
        <div class="InputBox">
          <textarea v-model="msg" class="InputTextarea" rows="3" @keyup.enter="send"></textarea>
          <div class="InputBox-footer">
            <div class="FooterDesc">按Enter键发送</div>
            <button class="sendButton"  @click="send">发送</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import util from "@/utils/index.js";
 
export default {
  name: "contact",
  components: {},
  data() {
    return {
      uid: 0,
      ws: null,
      msg: "", //聊天信息
      chatList: [
        {
          id: 14,
          content: "你说啥",
          avaUrl:
            "https://pic4.zhimg.com/v2-a12b2d609fa2d5d16c10ea069419f3c3_xs.jpg"
        },
        {
          id: 1,
          content: "我说你可真好看",
          avaUrl:
            "https://pic4.zhimg.com/v2-a12b2d609fa2d5d16c10ea069419f3c3_xs.jpg"
        },
        {
          id: 14,
          content: "谢谢夸奖，也就一般般啦",
          avaUrl:
            "https://pic4.zhimg.com/v2-a12b2d609fa2d5d16c10ea069419f3c3_xs.jpg"
        }
      ], //聊天记录
      userList: [
        {
          uid:1,
          username: "再见",
          content: "做好自己",
          time: "6-22",
          avaUrl:
            "https://pic4.zhimg.com/v2-a12b2d609fa2d5d16c10ea069419f3c3_xs.jpg"
        },
        {
             uid:2,
          username: "再见",
          content: "做好自己",
          time: "6-22",
          avaUrl:
            "https://pic4.zhimg.com/v2-a12b2d609fa2d5d16c10ea069419f3c3_xs.jpg"
        },
        {
             uid:3,
          username: "再见",
          content: "做好自己",
          time: "6-22",
          avaUrl:
            "https://pic4.zhimg.com/v2-a12b2d609fa2d5d16c10ea069419f3c3_xs.jpg"
        },
        {
             uid:4,
          username: "再见",
          content: "做好自己",
          time: "6-22",
          avaUrl:
            "https://pic4.zhimg.com/v2-a12b2d609fa2d5d16c10ea069419f3c3_xs.jpg"
        }
      ],
      chooseId:0
    };
  },
  mounted() {
    this.initWebsocket();
    // this.uid = util.getUser().id;//可以自己写个假数据
    this.uid = Ma
  },
  methods: {
    //创建websocket链接
    initWebsocket() {
      let that = this;
      if (window.WebSocket) {
        var ws = new WebSocket("ws://localhost:8001");
        that.ws = ws;
        ws.onopen = function(e) {
          console.log("连接服务器成功");
          let msg = {
            type: 1,
            uid: that.uid
          };
          ws.send(JSON.stringify(msg));
        };
        ws.onclose = function(e) {
          console.log("服务器关闭");
        };
        ws.onerror = function() {
          console.log("连接出错");
        };
        // 接收服务器的消息
        ws.onmessage = function(e) {
          let message = JSON.parse(e.data);
          console.log(message);
          that.chatList.push(message);
        };
      }
    },
    //发送信息
    send() {
      let toId;
      if (this.uid == 14) {
        toId = 1;
      } else {
        toId = 14;
      }
      let msg = {
        id: this.uid,
        bridge: [this.uid, toId],
        content: this.msg,
        avaUrl:
          "https://pic4.zhimg.com/v2-a12b2d609fa2d5d16c10ea069419f3c3_xs.jpg"
      };
      this.ws.send(JSON.stringify(msg)); //这里是把聊天内容发给服务端
      this.msg = "";
      setTimeout(() => {
        this.scrollBottm();
      }, 200);
    },
    //滚动条滚动到底部
    scrollBottm() {
      let el = this.$refs["MessageBox"];
      el.scrollTop = el.scrollHeight;
    },
    //选择联系人
    chooseUser(user){
        this.chooseId = user.uid;
    }
  }
};
</script>
<style lang="scss" scoped>
.Contact {
  height: 614px;
  width: 1002px;
  background-color: #fff;
  border: 1px solid #ebebeb;
  box-shadow: 0 0 4px 0 rgba(26, 26, 26, 0.1);
  border-radius: 3px;
  margin: 8px auto 0;
  display: flex;
  //联系人
  .ContactSide {
    width: 286px;
    height: 100%;
    border-right: 1px solid #ebebeb;
    .ContactSide-tip {
      height: 40px;
      line-height: 40px;
      font-weight: 600;
      padding: 0 30px;
      border-bottom: 1px solid #ebebeb;
    }
  }
  .ContactItem {
    padding: 12px 20px 12px 29px;
    cursor: pointer;
    display: flex;
    border-bottom: 1px solid #f7f8fa;
    .UserContent {
      flex: 1;
      .UserMsg {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .UserName {
          font-size: 15px;
          columns: #444444;
          font-weight: 600;
        }
        .MsgTime {
          font-size: 12px;
          color: #999999;
          float: right;
        }
      }
    }
  }
  .ChooseItem{
    background: #f5f4f4;
 }
  .UserAvator {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .ContactBox {
    width: 710px;
    &-header {
      font-size: 15px;
      margin: 0 14px;
      height: 20px;
      padding-bottom: 9px;
      padding-top: 21px;
      border-bottom: 1px solid #ebebeb;
      font-weight: 600;
      text-align: center;
    }
    //聊天框
    .MessageBox {
      height: 362px;
      overflow: scroll;
      .Message {
        display: flex;
        margin: 20px;
        .UserMsg {
          max-width: 388px;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 14px;
          position: relative;
          margin: 0 8px;
          text-align: left;
          white-space: pre-wrap;
          word-break: break-all;
        }
        .LeftMessage {
          background-color: #f6f6f6;
          color: #444;
          &::after {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
            left: -4px;
            top: 14px;
            background: #f6f6f6;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
        .RightMessage {
          background-color: #0084ff;
          color: #fff;
          &::after {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
            right: -4px;
            top: 14px;
            background: #0084ff;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
          }
        }
      }
    }
    //输入框
    .InputBox {
      padding: 0 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 170px;
      background: #fff;
      z-index: 10;
      .InputTextarea {
        margin-top: 20px;
        width: 100%;
        border: none;
        font-size: 14px;
        flex: 1;
      }
      &-footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 50px;
        .FooterDesc {
          font-size: 14px;
          color: #bfbfbf;
          padding-right: 10px;
        }
        .sendButton {
          color: #fff;
          background-color: #0084ff;
          border-radius: 6px;
          width: 72px;
          height: 32px;
          font-size: 13px;
          line-height: 32px;
          text-align: center;
        }
      }
    }
  }
}
 
</style>