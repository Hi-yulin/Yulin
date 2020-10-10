<template>
  <div class="control">
    <!-- <input type="text" v-model="sendVal" /> -->
    <div class="control-head">
      <div class="control-head-left">
        <span>海域态势感知研究院(深圳)</span>
      </div>
      <div class="control-head-right">
        <a-icon type="search" :style="{ fontSize: '30px', color: '#fff' }" />
        <a-icon type="user" :style="{ fontSize: '30px', color: '#fff' }" />
      </div>
    </div>
    <div class="control-title">
      <!-- <div class="control-title-main">海洋态势感知</div>
      <div class="control-title-EN">Maritime Domain Awareness</div> -->
      <div class="control-title-CN">
        <img :src="title" alt="" />
      </div>
      <div class="control-title-EN">
        <img :src="smallTitle" alt="" />
      </div>
    </div>
    <div class="control-content">
      <div
        class="control-content-button"
        v-for="(item, index) in appArr"
        :key="index"
      >
        <div class="control-content-button-label">
          <div>{{ item.title }}</div>
        </div>
        <div
          :class="{
            'control-content-button-circle': true,
            arrowDown: arrowFlag && index == activIndex,
          }"
          @click="choooseApp(item.value, index)"
        ></div>
        <div
          v-if="index == activIndex && showDropDown"
          class="control-content-button-dropDown"
        >
          <div @click="handle('play')">演示视频</div>
          <div @click="handle('system')">进入系统</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null,
      wsHandle: null,
      showHandle: false,
      activIndex: "",
      arrowFlag: false,
      showDropDown: false,
      appArr: [
        { title: "走私稽查", value: "zsjc" },
        { title: "渔船检测", value: "ycjc" },
        { title: "环境治理", value: "hjzl" },
        { title: "海上治安", value: "hsza" },
      ],
      smallTitle: require("@/assets/ENtitle.png"),
      title: require("@/assets/yellowCN.png"),
    };
  },
  mounted() {
    this.initSocket();
    this.initSocketHandle();
    // 点击空白区域收起下拉和箭头
    let _this = this;
    document.addEventListener("click", function (e) {
      // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
      let flag = e.target.contains(
        document.getElementsByClassName("control-head-right")[0]
      );
      if (!flag) {
        return;
      }
      _this.showDropDown = false;
      _this.arrowFlag = false;
    });
  },
  watch: {
    // sendVal(val) {
    //   this.websocketsend(val);
    // },
  },
  destroyed() {
    this.websocketclose();
  },
  methods: {
    initSocket() {
      this.ws = new WebSocket("ws://localhost:8090");
      this.ws.onmessage = this.websocketonmessage;
      this.ws.onopen = this.websocketonopen;
      this.ws.onerror = this.websocketonerror;
      this.ws.onclose = this.websocketclose;
    },
    websocketonopen() {
      //   this.websocketsend(this.sendVal);
    },
    websocketonmessage() {},
    websocketsend(Data) {
      //数据发送
      this.ws.send(Data);
      // debugger
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
    websocketonerror() {
      //连接建立失败重连
      this.initSocket();
    },
    //选择应用
    choooseApp(e, index) {
      // this.showHandle = !this.showHandle
      if (this.activIndex != index) {
        this.arrowFlag = false;
        this.showDropDown = false;
      }
      this.activIndex = index;
      this.arrowFlag = !this.arrowFlag;
      this.showDropDown = !this.showDropDown;
      this.websocketsend(e);
    },

    //下拉选择接受操作参数传值
    initSocketHandle() {
      this.wsHandle = new WebSocket("ws://localhost:7788");
      this.wsHandle.onclose = this.websocketcloseHandle;
    },
    websocketsendHandle(Data) {
      //数据发送
      this.wsHandle.send(Data);
      // debugger
    },
    websocketcloseHandle() {
      console.log("断开连接");
    },
    //选择下拉
    handle(e) {
      this.websocketsendHandle(e);
      // localStorage.setItem("handle", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.control {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/mainbg.png");
  background-size: cover;
  // background-size: contain;
  background-repeat: no-repeat;
  overflow-y: scroll;
  &-head {
    height: 90px;
    padding: 0 5vh;
    border-bottom: 1px solid rgba(255, 255, 255, 0.45);
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      font-size: 16px;
      color: #ffffff;
    }
    &-right {
      > i {
        margin-left: 20px;
      }
    }
  }
  &-title {
    padding: 5vh 5vh 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // margin-bottom: 10vh;
    &-CN {
      > img {
        max-width: 100%;
      }
    }
    &-EN {
      > img {
        max-width: 100%;
      }
    }
  }
  &-content {
    display: flex;
    width: 100%;
    padding: 0 5vw;
    justify-content: space-evenly;
    position: absolute;
    bottom: 10vh;
    // margin-bottom: 300px;
    flex-wrap: wrap;
    &-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 170px;
      font-size: 18px;
      margin-bottom: 70px;
      &-circle {
        position: relative;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #fff;
        margin-left: 8px;
        cursor: pointer;
        &:before {
          content: " ";
          position: absolute;
          width: 0;
          height: 0;
          left: 11px;
          top: 11px;
          transform: rotate(45deg);
          border: 6px solid;
          border-color: #000 #000 transparent transparent;
        }
        &:after {
          content: " ";
          position: absolute;
          width: 0;
          height: 0;
          left: 8px;
          top: 11px;
          transform: rotate(45deg);
          border: 6px solid;
          border-color: #fff #fff transparent transparent;
        }
      }
      .arrowDown {
        transform: rotate(90deg);
      }
      &-label {
        font-size: 26px;
        margin-left: 18px;
        color: rgba(255, 255, 255, 0.9);
      }
      &-dropDown {
        position: absolute;
        font-size: 22px;
        margin-left: 18px;
        color: rgba(255, 255, 255, 0.9);
        top: 120%;
        left: 10%;
      }
      &-handle {
        > span {
          margin: 0 5px;
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }
  }
}
</style>