<template>
  <div class="appLoginUser no-select">
    <div class="customerImg"></div>
  </div>
</template>
<script>
export default {
  name: 'LoginUser'
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.appLoginUser{
  background: $navbarBg;
  margin-left: 15px;
  cursor: pointer;
  margin-bottom: 5px;
  .customerImg{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid $loginUserColor;
    transition: all 0.25s ease-in-out;
    background-image: url('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2910188992,231387456&fm=26&gp=0.jpg');
    background-size: 100% 100%;
    &:hover{
      transform: scale(1.2);
      box-shadow:0 0 6px #00ffbfd7 inset;
      box-shadow:0 0 6px #00ffbfd7
    }
  }
}
</style>