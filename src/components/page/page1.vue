<template>
  <transition name="slide">
    <div class="page">
      <h1>普通滚动</h1>
      <div class="area">
        <scroll>
          <h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1>
          <h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1>
          <h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1>
          <h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1>
          <h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1>
          <h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1>
          <h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1><h1>我是内容</h1>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
  import scroll from '@/components/scroll'
  export default {
    name: "page1",
    components:{scroll}
  }
</script>

<style scoped>
  .area{
    height: 20rem;
    margin-top: 2rem;
    border: 1px solid darkred;
  }
  /**/
  .page{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    font-size: 0.48rem;
    color: #8CA0B4;
  }
  .slide-enter-active, .slide-leave-active{
    transition: all 0.3s;
  }
  .slide-enter, .slide-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>
