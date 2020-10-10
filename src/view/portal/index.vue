<template>
  <div class="portal">
    <div class="portal-title">
      <div class="portal-title-CN">
        <img :src="title" alt="" />
      </div>
      <div class="portal-title-EN">
        <img :src="smallTitle" alt="" />
      </div>
    </div>
    <div class="portal-button">
      <div>
        <a-button @click="draw" block>控制</a-button>
      </div>
      <div>
        <a-button @click="guess" block>显示</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smallTitle: require("@/assets/ENtitle.png"),
      title: require("@/assets/whiteTitle.png"),
    };
  },
  mounted() {},
  methods: {
    draw() {
      this.$router.push("/control");
    },
    guess() {
      this.$router.push("/controlled");
    },
  },
};
</script>

<style lang="scss" scoped>
.portal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-image: url("../../assets/portalBG.png");
  background-size: 100% 100%;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-title {
    // margin-top: 300px;
    max-width: 100%;
    &-CN {
      > img {
        max-width: 100%;
      }
    }
    &-EN {
    //   margin-top: -8%;
      > img {
        max-width: 100%;
      }
    }
  }
  &-button {
    display: flex;
    margin-top: 100px;
    width: 100%;
    justify-content: space-evenly;
    > div {
        width: 20vh;
      max-width: 100%;
      height: 80px;
    //   margin: 0 5%;
      .ant-btn-block {
        height: 80px;
        font-size: 26px;
        color: #164bb1;
      }
    }
  }
}
</style>