<template>
  <div>
      scene2
    <div>{{handleOption}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    handleOption: {
      type: String,
      default: "",
    },
  },
};
</script>