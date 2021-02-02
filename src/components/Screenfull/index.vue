<template>
  <div>
    <svg-icon :icon-class="isFullScreen ? 'exit-fullscreen':'fullscreen'" @click="handleFullScreen"/>
  </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  data(){
    return{
       isFullScreen: false
    }
  },
  methods:{
    handleFullScreen(){
      if(!screenfull.isEnabled){
         this.$notify({
            title: '警告',
            message: '您的浏览器不能工作',
            type: 'warning',
            offset: 40
        });
        return false
      }
       screenfull.toggle()
    },
    change(){
      this.isFullScreen = screenfull.isFullscreen
    },
    init(){
       if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>