<template>
  <div class="wrapper" ref="wrapper">
    <div class="scroll-main">
      <!-- 下拉刷新 -->
      <div v-if="pullDown" class="top-tip">
        <div v-if="refreshConfig.textOrIcon" class="loading-text">{{refreshConfig.text}}</div>
        <div v-if="!refreshConfig.textOrIcon" class="loading-icon1">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
      <!-- 内容 -->
      <slot></slot>
      <!-- 上拉加载 -->
      <div v-if="pullUp" class="bottom-tip">
        <div v-if="pullUpConfig.textOrIcon" class="loading-text">{{pullUpConfig.text}}</div>
        <div v-if="!pullUpConfig.textOrIcon" class="loading-icon2">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    /*
      1:屏幕滑动超过一定时间后会派发scroll事件,非实时。
      2:屏幕滑动的过程中实时的派发 scroll 事件,实时。
      3:不仅在屏幕滑动的过程中,而且在momentum滚动动画运行过程中实时派发scroll事件。
       */
    probeType: {
      type: Number,
      default: 1
    },
    /*
        监听渲染的数据动态变化时重新渲染高度
       */
    data: {
      type: Array,
      default: null
    },
    /**
       * 是否开启监听滚动事件,开启的时候会派发一个scroll事件
       */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
       * 是否开启上拉加载功能,开启的时候会派发一个pullupLoad事件
       */
    pullUp: {
      type: Boolean,
      default: false
    },
    /**
       * 是否开启下拉刷新功能,开启的时候会派发一个pulldownRefresh事件
       */
    pullDown: {
      type: Boolean,
      default: false
    },
    /**
       * 是否开启滚动前判断，开启的时候会派发一个beforeScroll事件
       */
    beforeScroll: {
      type: Boolean,
      default: false
    },
    /**
       * 渲染时长,可能是数据请求时间太长的时候,可以将值设置大,如100。
       */
    refreshDelay: {
      type: Number,
      default: 20
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pullDownRefresh: false, /* 这个配置用于做下拉刷新功能,详细配置查看官网 */
      refreshConfig: {/* 这个参数用于切换刷新的状态改变,可以根据需求再设计 */
        textOrIcon: true, // 文字与icon切换
        text: '下拉刷新'
      },
      pullUpLoad: false, /* 同理 */
      pullUpConfig: {
        textOrIcon: true,
        text: '上拉加载'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.pullDown) {
        this.pullDownRefresh = {/* 这个也可以动态化 */
          threshold: 50, /* 触发停留的距离,默认为50px */
          stop: 50/* 回弹停留的距离,默认为40px */
        }
      } else {
        this.pullDownRefresh = false
      }
      if (this.pullUp) {
        this.pullUpLoad = true/* 这里略有不一样 */
      } else {
        this.pullUpLoad = false
      }
      this._initScroll()
    }, 20)
    this.$refs.wrapper.parentElement.style.position = 'relative'
  },
  methods: {
    // 初始化
    _initScroll() {
      var _this = this
      if (!this.$refs.wrapper) {
        return
      }
      // 实例化
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullDownRefresh: _this.pullDownRefresh
      })
      // 监听滚动
      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', pos => {
          _this.$emit('scroll', pos)
        })
      }
      // 上拉加载
      if (this.pullUp) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50) && this.scroll.y<0) {
            _this.pullUpConfig.textOrIcon = false
            this.$emit('pullupLoad')
          }
        })
      }
      // 下拉刷新
      if (this.pullDown) {
        this.scroll.on('touchEnd', (pos) => {
          if (pos.y > 50) {
            _this.refreshConfig.textOrIcon = false
            this.$emit('pulldownRefresh')
          }
        })
      }
      // 开始滚动前判断
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    // 启用better-scroll
    enable() {
      this.scroll && this.scroll.enable()
    },
    // 禁用better-scroll,(touchstart、touchmove、touchend)这些回调不起用
    disable() {
      this.scroll && this.scroll.disable()
    },
    // 手动刷新,重新渲染better-scroll
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 滚动到指定的位置
    scrollTo() {
      /**
         * 参数:
         * 1. x横轴坐标;
         * 2. y纵轴坐标;
         * 3. time滚动动画执行的时长(不设置就是锚点的形式);
         */
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 滚动到指定的目标元素
    scrollToElement() {
      /**
         * 参数:
         * 1. 滚动到的目标元素(DOM,可以通过$refs), 如果是字符串，则内部会尝试调用 querySelector 转换成 DOM 对象;
         * 2. 滚动动画执行的时长;
         * 3. 相对于目标元素的横轴偏移量，如果设置为 true，则滚到目标元素的中心位置;
         * 4. 相对于目标元素的纵轴偏移量，如果设置为 true，则滚到目标元素的中心位置;
         */
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    // 下拉刷新完成
    refreshFinish() {
      this.refreshConfig.textOrIcon = true
      this.scroll.finishPullDown()
    },
    // 上拉加载完成
    PullUpFinish(flag = true) {
      if (flag) {
        this.pullUpConfig.text = '上拉加载'
      } else {
        this.pullUpConfig.text = '没有更多数据'
      }
      this.pullUpConfig.textOrIcon = true
      this.scroll.finishPullUp()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style>
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .top-tip{
    width: 100%;
    height: 50px;
    overflow: hidden;
    text-align: center;
    font-size: 15px;
    color: #AEB9C0;
    line-height: 50px;
    display: flex;
    justify-content: center;
    position: absolute;
    top: -50px;
  }
  .bottom-tip{
    width: 100%;
    height: 50px;
    overflow: hidden;
    text-align: center;
    font-size: 15px;
    color: #AEB9C0;
    line-height: 50px;
    display: flex;
    justify-content: center;
  }
  /*loding动画1*/
  .loading-icon1 {
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px;
  }
  .loading-icon1 > div {
    background-color: #AEB9C0;
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }
  .loading-icon1 .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .loading-icon1 .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  .loading-icon1 .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  .loading-icon1 .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
  @-webkit-keyframes stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }
  @keyframes stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
       transform: scaleY(1.0);
       -webkit-transform: scaleY(1.0);
    }
  }
  /*loding动画2*/
  .loading-icon2 {
    width: 100px;
    text-align: center;
  }
  .loading-icon2 > div {
    width: 20px;
    height: 20px;
    background-color: #AEB9C0;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .loading-icon2 .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  .loading-icon2 .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }
  @-webkit-keyframes bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0.0) }
    40% { -webkit-transform: scale(1.0) }
  }
  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    }
    40% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
  }
</style>
<!--
  better-scroll无法滑动：
  1.wrapper里面不能存在多个同级div。
  2.wrapper第一个子层也是唯一一个子层有没有被正确加上滑动style。
  3.第一个子层高度要超过wrapper。
  4.wrapper要加上定位，absolute或者fixed
-->
