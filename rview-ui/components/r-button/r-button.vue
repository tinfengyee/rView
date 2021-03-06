<template>
	<button
		id="r-wave-btn"
		class="r-btn r-line-1 r-fix-ios-appearance"
		:class="[
			'r-size-' + size,
			plain ? 'r-btn--' + type + '--plain' : '',
			loading ? 'r-loading' : '',
			shape == 'circle' ? 'r-round-circle' : '',
			hairLine ? showHairLineBorder : 'r-btn--bold-border',
			'r-btn--' + type,
			disabled ? `r-btn--${type}--disabled` : '',
			
		]"
		:disabled="disabled"
		:form-type="formType"
		:open-type="openType"
		:app-parameter="appParameter"
		:hover-stop-propagation="hoverStopPropagation"
		:send-message-title="sendMessageTitle"
		send-message-path="sendMessagePath"
		:lang="lang"
		:data-name="dataName"
		:session-from="sessionFrom"
		:send-message-img="sendMessageImg"
		:show-message-card="showMessageCard"
		@getphonenumber="getphonenumber"
		@getuserinfo="getuserinfo"
		@error="error"
		@opensetting="opensetting"
		@launchapp="launchapp"
		:style="[customStyle]"
		@tap.stop="click($event)"
		:hover-class="getHoverClass"
		:loading="loading"
	>
		<slot></slot>
		<view
			v-if="ripple"
			class="r-wave-ripple"
			:class="[waveActive ? 'r-wave-active' : '']"
			:style="{
				top: rippleTop + 'px',
				left: rippleLeft + 'px',
				width: fields.targetWidth + 'px',
				height: fields.targetWidth + 'px',
				'background-color': rippleBgColor || 'rgba(0, 0, 0, 0.15)'
			}"
		></view>
	</button>
</template>

<script>
  export default {
    name: 'r-button',
    props: {
      // 是否细边框
      hairLine: {
        type: Boolean,
        default: true
      },
      // 按钮的预置样式，default，primary，error，warning，success
      type: {
        type: String,
        default: 'default'
      },
      // 按钮尺寸，default，medium，mini
      size: {
        type: String,
        default: 'default'
      },
      // 按钮形状，circle（两边为半圆），square（带圆角）
      shape: {
        type: String,
        default: 'square'
      },
      // 按钮是否镂空
      plain: {
        type: Boolean,
        default: false
      },
      // 是否禁止状态
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 开放能力，具体请看uniapp稳定关于button组件部分说明
      // https://uniapp.dcloud.io/component/button
      openType: {
        type: String,
        default: ''
      },
      // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
      // 取值为submit（提交表单），reset（重置表单）
      formType: {
        type: String,
        default: ''
      },
      // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
      // 只微信小程序、QQ小程序有效
      appParameter: {
        type: String,
        default: ''
      },
      // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
      hoverStopPropagation: {
        type: Boolean,
        default: false
      },
      // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
      lang: {
        type: String,
        default: 'en'
      },
      // 会话来源，open-type="contact"时有效。只微信小程序有效
      sessionFrom: {
        type: String,
        default: ''
      },
      // 会话内消息卡片标题，open-type="contact"时有效
      // 默认当前标题，只微信小程序有效
      sendMessageTitle: {
        type: String,
        default: ''
      },
      // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
      // 默认当前分享路径，只微信小程序有效
      sendMessagePath: {
        type: String,
        default: ''
      },
      // 会话内消息卡片图片，open-type="contact"时有效
      // 默认当前页面截图，只微信小程序有效
      sendMessageImg: {
        type: String,
        default: ''
      },
      // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
      // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
      showMessageCard: {
        type: Boolean,
        default: false
      },
      // 手指按（触摸）按钮时按钮时的背景颜色
      hoverBgColor: {
        type: String,
        default: ''
      },
      // 水波纹的背景颜色
      rippleBgColor: {
        type: String,
        default: ''
      },
      // 是否开启水波纹效果
      ripple: {
        type: Boolean,
        default: false
      },
      // 按下的类名
      hoverClass: {
        type: String,
        default: ''
      },
      // 自定义样式，对象形式
      customStyle: {
        type: Object,
        default () {
          return {};
        }
      },
      // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
      dataName: {
        type: String,
        default: ''
      }
    },
    computed: {
    		// 当没有传bgColor变量时，按钮按下去的颜色类名
    		getHoverClass() {
    			// 如果开启水波纹效果，则不启用hover-class效果
    			if (this.loading || this.disabled || this.ripple || this.hoverClass) return '';
    			let hoverClass = '';
    			hoverClass = this.plain ? 'r-' + this.type + '-plain-hover' : 'r-' + this.type + '-hover';
    			return hoverClass;
    		},
    		// 在'primary', 'success', 'error', 'warning'类型下，不显示边框，否则会造成四角有毛刺现象
    		showHairLineBorder() {
    			if (['primary', 'success', 'error', 'warning'].indexOf(this.type) >= 0 && !this.plain) {
    				return '';
    			} else {
    				return 'r-hairline-border';
    			}
    		}
    	},
    data() {
      return {
        rippleTop: 0, // 水波纹的起点Y坐标到按钮上边界的距离
        rippleLeft: 0, // 水波纹起点X坐标到按钮左边界的距离
        fields: {}, // 波纹按钮节点信息
        waveActive: false // 激活水波纹
      };
    },
    methods: {
      // 按钮点击
      click(e) {
        // 如果按钮时disabled和loading状态，不触发水波纹效果
        if (this.loading === true || this.disabled === true) return;
        // 是否开启水波纹效果
        if (this.ripple) {
          // 每次点击时，移除上一次的类，再次添加，才能触发动画效果
          this.waveActive = false;
          this.$nextTick(function() {
            this.getWaveQuery(e);
          });
        }
        this.$emit('click');
      },
      // 查询按钮的节点信息
      getWaveQuery(e) {
        this.getElQuery().then(res => {
          // 查询返回的是一个数组节点
          let data = res[0];
          // 查询不到节点信息，不操作
          if (!data.width || !data.width) return;
          // 水波纹的最终形态是一个正方形(通过border-radius让其变为一个圆形)，这里要保证正方形的边长等于按钮的最长边
          // 最终的方形（变换后的圆形）才能覆盖整个按钮
          data.targetWidth = data.height > data.width ? data.height : data.width;
          if (!data.targetWidth) return;
          this.fields = data;
          let touchesX = '',
            touchesY = '';
          // #ifdef MP-BAIDU
          touchesX = e.changedTouches[0].clientX;
          touchesY = e.changedTouches[0].clientY;
          // #endif
          // #ifdef MP-ALIPAY
          touchesX = e.detail.clientX;
          touchesY = e.detail.clientY;
          // #endif
          // #ifndef MP-BAIDU || MP-ALIPAY
          touchesX = e.touches[0].clientX;
          touchesY = e.touches[0].clientY;
          // #endif
          // 获取触摸点相对于按钮上边和左边的x和y坐标，原理是通过屏幕的触摸点（touchesY），减去按钮的上边界data.top
          // 但是由于`transform-origin`默认是center，所以这里再减去半径才是水波纹view应该的位置
          // 总的来说，就是把水波纹的矩形（变换后的圆形）的中心点，移动到我们的触摸点位置
          this.rippleTop = touchesY - data.top - data.targetWidth / 2;
          this.rippleLeft = touchesX - data.left - data.targetWidth / 2;
          this.$nextTick(() => {
            this.waveActive = true;
          });
        });
      },
      // 获取节点信息
      getElQuery() {
        return new Promise(resolve => {
          let queryInfo = '';
          // 获取元素节点信息，请查看uniapp相关文档
          // https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefboundingclientrect
          queryInfo = uni.createSelectorQuery().in(this);
          //#ifdef MP-ALIPAY
          queryInfo = uni.createSelectorQuery();
          //#endif
          queryInfo.select('.r-btn').boundingClientRect();
          queryInfo.exec(data => {
            resolve(data);
          });
        });
      },
      // 下面为对接uniapp官方按钮开放能力事件回调的对接
      getphonenumber(res) {
        this.$emit('getphonenumber', res);
      },
      getuserinfo(res) {
        this.$emit('getuserinfo', res);
      },
      error(res) {
        this.$emit('error', res);
      },
      opensetting(res) {
        this.$emit('opensetting', res);
      },
      launchapp(res) {
        this.$emit('launchapp', res);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../libs/css/style.components.scss";
  .r-btn::after {
  	border: none;
  }
  
  .r-btn {
  	position: relative;
  	border: 0;
  	//border-radius: 10rpx;
  	display: inline-block;
  	overflow: hidden;
  	line-height: 1;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	cursor: pointer;
  	padding: 0 40rpx;
  	z-index: 1;
  	box-sizing: border-box;
  	transition: all 0.15s;
  	
  	&--bold-border {
  		border: 1px solid #ffffff;
  	}
  	
  	&--default {
  		color: $r-content-color;
  		border-color: #c0c4cc;
  		background-color: #ffffff;
  	}
  	
  	&--primary {
  		color: #ffffff;
  		border-color: $r-type-primary;
  		background-color: $r-type-primary;
  	}
  	
  	&--success {
  		color: #ffffff;
  		border-color: $r-type-success;
  		background-color: $r-type-success;
  	}
  	
  	&--error {
  		color: #ffffff;
  		border-color: $r-type-error;
  		background-color: $r-type-error;
  	}
  	
  	&--warning {
  		color: #ffffff;
  		border-color: $r-type-warning;
  		background-color: $r-type-warning;
  	}
  	
  	&--default--disabled {
  		color: #ffffff;
  		border-color: #e4e7ed;
  		background-color: #ffffff;
  	}
  	
  	&--primary--disabled {
  		color: #ffffff!important;
  		border-color: $r-type-primary-disabled!important;
  		background-color: $r-type-primary-disabled!important;
  	}
  	
  	&--success--disabled {
  		color: #ffffff!important;
  		border-color: $r-type-success-disabled!important;
  		background-color: $r-type-success-disabled!important;
  	}
  	
  	&--error--disabled {
  		color: #ffffff!important;
  		border-color: $r-type-error-disabled!important;
  		background-color: $r-type-error-disabled!important;
  	}
  	
  	&--warning--disabled {
  		color: #ffffff!important;
  		border-color: $r-type-warning-disabled!important;
  		background-color: $r-type-warning-disabled!important;
  	}
  	
  	&--primary--plain {
  		color: $r-type-primary!important;
  		border-color: $r-type-primary-disabled!important;
  		background-color: $r-type-primary-light!important;
  	}
  	
  	&--success--plain {
  		color: $r-type-success!important;
  		border-color: $r-type-success-disabled!important;
  		background-color: $r-type-success-light!important;
  	}
  	
  	&--error--plain {
  		color: $r-type-error!important;
  		border-color: $r-type-error-disabled!important;
  		background-color: $r-type-error-light!important;
  	}
  	
  	&--warning--plain {
  		color: $r-type-warning!important;
  		border-color: $r-type-warning-disabled!important;
  		background-color: $r-type-warning-light!important;
  	}
  }
  
  .r-hairline-border:after {
  	content: ' ';
  	position: absolute;
  	pointer-events: none;
  	// 设置为border-box，意味着下面的scale缩小为0.5，实际上缩小的是伪元素的内容（border-box意味着内容不含border）
  	box-sizing: border-box;
  	// 中心点作为变形(scale())的原点
  	-webkit-transform-origin: 0 0;
  	transform-origin: 0 0;
  	left: 0;
  	top: 0;
  	width: 199.8%;
  	height: 199.7%;
  	-webkit-transform: scale(0.5, 0.5);
  	transform: scale(0.5, 0.5);
  	border: 1px solid currentColor;
  	z-index: 1;
  }
  
  .r-wave-ripple {
  	z-index: 0;
  	position: absolute;
  	border-radius: 100%;
  	background-clip: padding-box;
  	pointer-events: none;
  	user-select: none;
  	transform: scale(0);
  	opacity: 1;
  	transform-origin: center;
  }
  
  .r-wave-ripple.r-wave-active {
  	opacity: 0;
  	transform: scale(2);
  	transition: opacity 1s linear, transform 0.4s linear;
  }
  
  .r-round-circle {
  	border-radius: 100rpx;
  }
  
  .r-round-circle::after {
  	border-radius: 100rpx;
  }
  
  .r-loading::after {
  	background-color: hsla(0, 0%, 100%, 0.35);
  }
  
  .r-size-default {
  	font-size: 30rpx;
  	height: 80rpx;
  	line-height: 80rpx;
  }
  
  .r-size-medium {
  	display: inline-flex;
  	width: auto;
  	font-size: 26rpx;
  	height: 70rpx;
  	line-height: 70rpx;
  	padding: 0 80rpx;
  }
  
  .r-size-mini {
  	display: inline-flex;
  	width: auto;
  	font-size: 22rpx;
  	padding-top: 1px;
  	height: 50rpx;
  	line-height: 50rpx;
  	padding: 0 20rpx;
  }
  
  .r-primary-plain-hover {
  	color: #ffffff !important;
  	background: $r-type-primary-dark !important;
  }
  
  .r-default-plain-hover {
  	color: $r-type-primary-dark !important;
  	background: $r-type-primary-light !important;
  }
  
  .r-success-plain-hover {
  	color: #ffffff !important;
  	background: $r-type-success-dark !important;
  }
  
  .r-warning-plain-hover {
  	color: #ffffff !important;
  	background: $r-type-warning-dark !important;
  }
  
  .r-error-plain-hover {
  	color: #ffffff !important;
  	background: $r-type-error-dark !important;
  }
  
  .r-info-plain-hover {
  	color: #ffffff !important;
  	background: $r-type-info-dark !important;
  }
  
  .r-default-hover {
  	color: $r-type-primary-dark !important;
  	border-color: $r-type-primary-dark !important;
  	background-color: $r-type-primary-light !important;
  }
  
  .r-primary-hover {
  	background: $r-type-primary-dark !important;
  	color: #fff;
  }
  
  .r-success-hover {
  	background: $r-type-success-dark !important;
  	color: #fff;
  }
  
  .r-info-hover {
  	background: $r-type-info-dark !important;
  	color: #fff;
  }
  
  .r-warning-hover {
  	background: $r-type-warning-dark !important;
  	color: #fff;
  }
  
  .r-error-hover {
  	background: $r-type-error-dark !important;
  	color: #fff;
  }
</style>
