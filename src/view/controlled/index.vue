<template>
  <div class="controlled">
    <div class="controlled-head">
      <div
        v-for="(item, index) in circle"
        :key="index"
        :class="{
          'controlled-head-circle': true,
          active: item.value == showMsg,
        }"
      >
        {{ item.title }}
      </div>
    </div>
    <component :is="componentId" :handleOption="handleFlag"></component>
    11111
  </div>
</template>

<script>
import zsjc from "@/components/scene/scene1";
import ycjc from "@/components/scene/scene2";
import hjzl from "@/components/scene/scene3";
import hsza from "@/components/scene/scene4";

export default {
  data() {
    return {
      ws: null,
      wsHandle: null,
      showMsg: "",
      handleFlag: "",
      componentId: "",
      componentsArr: ["zsjc", "ycjc", "hjzl", "hsza"],
      circle: [
        { title: "走私稽查", value: "zsjc" },
        { title: "渔船检测", value: "ycjc" },
        { title: "环境治理", value: "hjzl" },
        { title: "海上治安", value: "hsza" },
      ],
      handleOption: "",
      activeFlag: "",
    };
  },
  components: {
    zsjc,
    ycjc,
    hjzl,
    hsza,
  },
  mounted() {
    this.initSocket();
    this.initSocketHandle();
  },
  methods: {
    initSocket() {
      this.ws = new WebSocket("ws://localhost:8090");
      this.ws.onmessage = this.websocketonmessage;
      this.ws.onopen = this.websocketonopen;
      this.ws.onerror = this.websocketonerror;
      this.ws.onclose = this.websocketclose;
    },
    websocketonmessage(msg) {
      this.showMsg = msg.data;
      this.componentId = this.componentsArr.filter((v) => v == msg.data)[0];
      console.log(this.componentId, 66);
    },

    //下拉选择接受操作参数传值
    initSocketHandle() {
      this.wsHandle = new WebSocket("ws://localhost:7788");
      this.wsHandle.onmessage = this.websocketonmessageHandle;
    },

    websocketonmessageHandle(msg) {
      this.handleFlag = msg.data;
      console.log(this.handleFlag, 777);
    },
  },
};
</script>

<style scoped lang='scss'>
.controlled {
  &-head {
    height: 200px;
    background: #a8ff78;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &-circle {
      width: 5vw;
      height: 5vw;
      border: 1px solid red;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active{
      background-color: #fff;
    }
  }
}
</style>