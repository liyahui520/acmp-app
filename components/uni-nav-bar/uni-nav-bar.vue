<template>
	<div style="height:120upx;">
	<view class="uni-navbar" :class="{'uni-navbar-fixed':isFixed,'uni-navbar-shadow':hasShadow}" :style="{'background-color':backgroundColor}">
		<uni-status-bar v-if="insertStatusBar"></uni-status-bar>
		<view class="uni-navbar-header" :style="{color:color}">
			<view class="uni-navbar-header-btns" @tap="onClickLeft">
				<view v-if="leftIcon.length">
					<uni-icon :type="leftIcon" :color="color" size="24"></uni-icon>
				</view>
				<view v-if="leftText.length" class="uni-navbar-btn-text" :class="{'uni-navbar-btn-icon-left':!leftIcon.length}">{{leftText}}</view>
				<slot name="left"></slot>
			</view>
			<view class="uni-navbar-container">
				<!-- <view v-if="title.length" class="uni-navbar-container-title">{{title}}</view> -->
				<!-- 标题插槽 --> 
				<view class="search">
					<view class="content">
						<view class="content-box">
							<text class="icon icon-search">&#xe61c;</text>
							<input class="input uni-input" focus  placeholder="搜索" v-model="inputVal" /> 
							<!-- <view v-if="!active && mode === 2" class="input sub" @click="getFocus">请输入搜索内容</view> -->
							<text  class="icon icon-del" @click="inputclear">&#xe644;</text>
						</view>
				 
					</view> 
				</view>
			</view>
			<view class="uni-navbar-header-btns" @tap="onClickRight">
                <view v-if="rightIcon.length">
                    <uni-icon :type="rightIcon" :color="color" size="24"></uni-icon>
                </view>
                <!-- 优先显示图标 -->
                <view v-if="rightText.length&&!rightIcon.length" class="uni-navbar-btn-text">{{rightText}}</view>
                <slot name="right"></slot>
            </view>
		</view>
	</view>
	</div>
</template>

<script>
    import uniStatusBar from '../uni-status-bar/uni-status-bar.vue'
    import uniIcon from '../uni-icon/uni-icon.vue'

    export default {
        components: {
            uniStatusBar,
            uniIcon
        },
		data(){
			return{
				inputVal:''
			}
		},
        props: {
            /**
             * 标题文字
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * 左侧按钮文本
             */
            leftText: {
                type: String,
                default: ''
            },
            /**
             * 右侧按钮文本
             */
            rightText: {
                type: String,
                default: ''
            },
            /**
             * 左侧按钮图标
             */
            leftIcon: {
                type: String,
                default: ''
            },
            /**
             * 右侧按钮图标
             */
            rightIcon: {
                type: String,
                default: ''
            },
            /**
             * 是否固定在顶部
             */
            fixed: {
                type: [Boolean, String],
                default: false
            },
            /**
             * 按钮图标和文字颜色
             */
            color: {
                type: String,
                default: '#000000'
            },
            /**
             * 背景颜色
             */
            backgroundColor: {
                type: String,
                default: '#FFFFFF'
            },
            /**
             * 是否包含状态栏，默认固定在顶部时包含
             */
            statusBar: {
                type: [Boolean, String],
                default: ''
            },
            /**
             * 是否使用阴影，默认根据背景色判断
             */
            shadow: {
                type: String,
                default: ''
            }
        },
        computed: {
			
            isFixed() {
                return String(this.fixed) === 'true'
            },
            insertStatusBar() {
                switch (String(this.statusBar)) {
                    case 'true':
                        return true
                    case 'false':
                        return false
                    default:
                        return this.isFixed
                }
            },
            hasShadow() {
                var backgroundColor = this.backgroundColor
                switch (String(this.shadow)) {
                    case 'true':
                        return true
                    case 'false':
                        return false
                    default:
                        return backgroundColor !== 'transparent' && backgroundColor.indexOf('rgba') < 0
                }
            }
        },
        methods: {
            /**
             * 左侧按钮点击事件
             */
            onClickLeft() {
                this.$emit('clickLeft')
                this.$emit('click-left')
            },
            /**
             * 右侧按钮点击事件
             */
            onClickRight() {
                this.$emit('clickRight')
                this.$emit('click-right')
            },
			/**
			 * 清空文本框
			 */
			inputclear() {
				this.inputVal = '';
				this.$emit('search', '');
			},
        }
    }
</script>

<style>
    .uni-navbar {
        display: block;
        position: relative;
        width: 100%;
        background-color: #FFFFFF;
        overflow: hidden;
    }
	
	.uni-navbar view{
		line-height:44px;
	}

    .uni-navbar-shadow {
        box-shadow: 0 1px 6px #ccc;
    }

    .uni-navbar.uni-navbar-fixed {
        position: fixed;
        z-index: 998;
    }

    .uni-navbar-header {
        display: flex;
        flex-direction: row;
        width: 100%;
        height:44px;
        line-height:44px;
        font-size: 16px;
    }
	
	.uni-navbar-header .uni-navbar-header-btns{
		display:inline-flex;
		flex-wrap:nowrap;
		flex-shrink:0;
		width: 120upx;
		padding:0 12upx;
	}
	
	.uni-navbar-header .uni-navbar-header-btns:first-child{
		padding-left:2;
	}
	.uni-navbar-header .uni-navbar-header-btns:last-child{
		width: 60upx;
	}
	.uni-navbar-container{
		width:100%;
		margin:0 10upx;
	}
	.uni-navbar-container-title{
		font-size:30upx;
		text-align:center;
		padding-right: 60upx;
	}
</style>

<style lang="scss" scoped>
.search {
	display: flex;
	width: 100%;
	border-bottom: 1px #f5f5f5 solid;
	box-sizing: border-box;
	padding: 15upx;
	font-size: $uni-font-size-base;
	// background: #fff;
	.content {
		display: flex;
		align-items: center;
		width: 100%;
		height: 60upx;
		border: 1px #ccc solid;
		background: #fff;
		overflow: hidden;
		transition: all 0.2s linear;
		border-radius: 30px;

		.content-box {
			width: 100%;
			display: flex;
			align-items: center;
			&.center {
				justify-content: center;
			}
			.icon {
				padding: 0 15upx;
				&.icon-del {
					font-size: 38upx;
				}
			}
			.input {
				width: 100%;
				max-width: 100%;
				line-height: 60upx;
				height: 60upx;
				transition: all 0.2s linear;
				color: #999;
				&.center {
					width: 200upx;
				}
				&.sub {
					// position: absolute;
					width: auto;
					color: grey;
				}
			}
		}
		.searchBtn {
			height: 100%;
			flex-shrink: 0;
			padding: 0 30upx;
			background: $uni-color-success;
			line-height: 60upx;
			color: #fff;
			border-left: 1px #ccc solid;
			transition: all 0.3s;
		}
	}

	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-shrink: 0;
		width: 0;
		transition: all 0.2s linear;
		white-space: nowrap;
		overflow: hidden;
		&.active {
			padding-left: 15upx;
			width: 100upx;
		}
	}
}
@font-face {
	font-family: 'iconfont';
	src: url('https://at.alicdn.com/t/font_989023_efq0mtli526.ttf') format('truetype');
}
.icon {
	font-family: iconfont;
	font-size: 32upx;
	font-style: normal;
	color: #999;
}
</style>