<template>
	<view>
	<uni-nav-bar left-icon="list"  right-icon="scan" color="#ffffff" fixed=true shadow=false status-bar=false background-color="#225ba8" title="导航栏组件"></uni-nav-bar>
	<view>
		<view> 
		<uni-tarbar :tab-list="tabList" :tabCur.sync="TabCur" :textFlex=true tab-class="text-center bg-white wuc-tab fixed" :tab-style="CustomBar" select-class="text-blue" @change="tabChange"></uni-tarbar>
		</view> 
		 <view> 
		 <uni-tarbar style="margin-top: 40upx;" :tab-list="tabList" :tabCur.sync="TabCura" :textFlex=false tab-class="text-center bg-white wuc-tab fixed" :tab-style="CustomBar" select-class="text-blue" @change="childtabChange"></uni-tarbar>
		   <swiper :current="ChildCurrent" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
		   <swiper-item v-for="(item,index) in tabList" :key="index">
		     <div class="bg-white padding margin text-center text-black">{{item.name}}</div>
		   </swiper-item>
		 </swiper>
		 </view> 
	</view>
	</view>
</template>

<script>
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import uniTarbar from '@/components/uni-tab-bar/uni-tab-bar.vue'
import {obj2style} from '@/pages/common/js/util.js'
export default {
    components: {
		uniNavBar,
		uniTarbar
		},
	data(){
		return{
			 tabList: [
			    { name: '建设项目' },
			    { name: '现代农业示范区' },
			    { name: '可持续示范区' }
			],
			TabCur: 0,
			TabCura: 0,
			ChildCurrent:0
		}
		},
	
	 computed: {
	    CustomBar() {
	        let style = {};
	        // #ifdef MP-WEIXIN
	        const systemInfo = uni.getSystemInfoSync();
	        let CustomBar =
	          systemInfo.platform === "android"
	            ? systemInfo.statusBarHeight + 50
	            : systemInfo.statusBarHeight + 45;
	        style['top'] = CustomBar + 'px';
	        // #endif
	        // #ifdef H5
	        style['top'] = 0 + 'px';
	        // #endif
	        return obj2style(style);
	    }
	},
	methods:{
		  tabChange(index) {
		    this.TabCur = index;
		},
		swiperChange(){
			
		},
		/**
		 * 子节点点击事件
		 * @param {Object} index 索引
		 */
		childtabChange(index){
			this.ChildCurrent=index;
			let list=this.tabList;
			this.tabList=list;
		}
	},
	
}
</script>
</script>

<style>
</style>
