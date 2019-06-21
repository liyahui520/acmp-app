export default{
	install(Vue,options){
		Vue.prototype.getEnv = function() {
			/*
			local          --           本地调试
			ckl            --           内网
			test           --           外测
			production     --           生产
			*/
			return 'production'
		},
		Vue.prototype.getUrl = function() {
		    let env = this.getEnv();
		    let origin = 'http://10.2.146.100:8080';
		    if (env == 'test') {
		        origin = 'http://10.2.146.100:8080';
		    }
		    if (env == 'production') {
		        origin = 'http://202.127.45.197';
		    }
			return origin
		},
		Vue.prototype.getHttp = function(ul){
			return new Promise((resolve,reject)=>{
				uni.request({
			    	url:this.getUrl() + ul, //接口地址
			    	data: {},//参数
			    	methods:'GET',
			    	dataType: 'json',
			    	header: {
			        	'content-type': 'application/x-www-form-urlencoded' //自定义请求头信息
			    	},
			    	success: (response) => {//接口调用成功返回值res
						resolve(response.data);
			    	}
				})
			});
		},
		Vue.prototype.postHttp = function(ul,param){
			return new Promise((resolve)=>{
				uni.request({
					url: this.getUrl() + ul, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: param,
					header: {
						'content-type': 'application/json;charset=utf-8' ,//自定义请求头信息
					},
					success: (response) => {
						resolve(response.data)
					}
				});
			})
		},
		Vue.prototype.showToast = function(title,icon){
			uni.showToast({
				title: title,
				duration: 2000,
				icon:icon?icon:'none'
			});
		},
		Vue.prototype.setStr = function(key,value){
			uni.setStorage({
			    key: key,
			    data: value
			});
		},
		Vue.prototype.getStr = function(key){
			let val = uni.getStorageSync(key);
			if(!val){ 
				return null;
			}else{
				return val;//把序列化字符串解析成对象返回JSON.parse(val)
			}
		},
		Vue.prototype.removeStr = function(key){
			uni.removeStorage({
			    key: key
			});
		}
	}
}

/**
 * 为样式动态赋值
 * @param {*} style
 */
export function obj2style(style) {
  let str = [];
  Object.keys(style).forEach(key => {
    str.push(`${key}:${style[key]};`);
  });
  return str.join(';');
}