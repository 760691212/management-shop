<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view :key="key"/>
    </keep-alive>
  </transition>
</template>
<script>
export default {
    name: 'AppMain',
    computed: {
      cachedViews() {
        console.log(this.$store.state.tagsView.cachedViews);
        return this.$store.state.tagsView.cachedViews
      },
      key() {
        return this.$route.path
      }
  }
}
</script>
<style lang="scss" scoped>
</style>