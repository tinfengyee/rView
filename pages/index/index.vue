<template>
  <view class="content">
    <image class="logo r-border-bottom" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title r-border">{{title}}</text>
    </view>
    <r-button size="mini" type="default" plain="">你好</r-button>
    <view class="r-flex" style="height: 400rpx;">
      <r-swiper :list="list"></r-swiper>
    </view>
    <view class="" style="width: 100%;">
      <r-tabs :list="tabsList" current="2"></r-tabs>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello',
        now: Date.now(),
        list: [{
            image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
            title: '昨夜星辰昨夜风，画楼西畔桂堂东'
          },
          {
            image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
            title: '身无彩凤双飞翼，心有灵犀一点通'
          },
          {
            image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
            title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
          }
        ],
        tabsList: [{
          name: '待收货'
        }, {
          name: '待付款'
        }, {
          name: '待评价'
        }],
        current: 0,
        
      }
    },
    onLoad() {
      this.$http.get('products').then(res => {
        console.log(res);
        console.log(this.timeFormat);
      })
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
    border-width: 6px !important;
    color: #007AFF;

    &.r-border::after {
      border-width: 30rpx;
    }
  }
</style>
