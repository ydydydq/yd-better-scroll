<template>
  <div class="hello">
    <h1>better-scroll</h1>
    <div class="btn-area">
      <div @click="event1">普通滚动</div>
      <div @click="event2">下拉刷新</div>
      <div @click="event3">上拉加载</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  methods: {
    event1(){
      this.$router.push({path:'/HelloWorld/page1'})
    },
    event2(){
      this.$router.push({path:'/HelloWorld/page2'})
    },
    event3(){
      this.$router.push({path:'/HelloWorld/page3'})
    }
  }
}
</script>


<style scoped>
  .hello{
    text-align: center;
    color: #2c3e50;
  }
  h1{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .btn-area{
    width: 100%;
    display: flex;
  }
  .btn-area > div{
    flex: 1;
    box-sizing: border-box;
    padding: 0.48rem;
    font-size: 0.55rem;
    border: 1px solid #cecece;
    border-radius: 0.12rem;
  }
  .btn-area > div:nth-child(2){
    margin: 0 0.48rem;
  }
</style>
