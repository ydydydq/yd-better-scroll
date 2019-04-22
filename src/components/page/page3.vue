<template>
  <transition name="slide">
    <div class="page">
      <h1>上拉加载</h1>
      <div class="area">
        <scroll ref="scroll" :pullUp="true" @pullupLoad="pullupLoad">
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
          <h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1><h1>加载更多内容</h1>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
  import scroll from '@/components/scroll'
  export default {
    name: "page3",
    data(){
      return {
        count: 0,
        timer: null
      }
    },
    methods:{
      pullupLoad(){
        if(this.count<3){
          setTimeout(() => {
            this.count++
            console.log('触发了上拉加载---数据请求中')
            this.$refs.scroll.PullUpFinish()
          }, 2000)
        }else{
          this.$refs.scroll.PullUpFinish(false)
        }
      }
    },
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
