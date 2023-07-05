<template>
  <div class="mainContainer">
    <iframe
      id="tempHtml"
      ref="tempHtml"
      style="width: 99%; height: calc(100vh - 84px)"
      :src="html"
      frameborder="0"
    />
  </div>
</template>
<style></style>
<script>
export default {
  data() {
    return {
      html: "/display/index.html",
    };
  },

  mounted() {},
  methods: {},
};
</script>
