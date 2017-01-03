# Html5 history

> 第一次使用markdown写文章，可能有的地方写的不够好，希望大家可以指正。

## Histroy 对象
###　[History](http://www.w3school.com.cn/jsref/dom_obj_history.asp) 对象是 window 对象的一部分，可通过 window.history 属性对其进行访问。
#### 在Html5之前可能对于histroy对象的操作仅仅是 
    
    // 后退

    window.history.back();

    window.history.go(-1);

	// 前进

	window.history.forward();

	window.history.go(1);

## Html5对于History 对象的扩展
### **1. 存储当前记录点**
    
    var json = {version:'1.1.0'};

	window.history.pushState(json,'','http://*******');

> 对于Histroy的pushState的使用下面做些简单的介绍：
> window.history.pushState具有3个参数:pushState(state,title,url)。

> state：记录历史记录点的额外对象，可以为空。
> 简单来说就是在改变url同时所传入的参数，可以使用window.history.state来获取。

> title：标题，不过当前浏览器都不怎么支持。

> url：地址栏地址会根据传入的url进行改变。
> **这里需要注意的是，url只能是同域的url。**

### **2. 替换当前历史记录点**
	
	var json = {version:'2.0.0'};

	window.history.replaceState(json,'','http://*******');

> replaceState与pushState的使用方式是一致的，唯一的区别是replaceState不会新增一个记录点。而是将原来的记录点覆盖掉。也就是说如果执行window.history.go(-1)的后退操作，则会跳转至覆盖后的url。


> 关于这里简单的提一下window.location.replace与window.location.href的不同用法：
> window.location.href使用时会生成一个记录点，而window.location.replace则不会。所以如果打开一个页面a，然后使用window.location.href跳转至b则会生成一个记录点，而使用window.location.replace则不会。

### **3. 监听历史记录点**
    
    window.onpopstate = function(){
    	var json = window.history.state;
    }

> 监听浏览器url改变，不过这里只有window.history.go(-1)或者window.history.go(1) 也就是浏览器的前进和后退操作时才会被触发。pushState和replaceState是无法触发的。

    window.onhashchange = function(){
    	var hash = window.location.hash;
    }

> 监听浏览器url的[hash](http://www.w3school.com.cn/jsref/prop_loc_hash.asp)值的改变，目前SPA所使用的路由，大部分是利用url的hash改变页面不会跳转的特性从而实现监听hash改变来分发功能，有兴趣的可以深入一下。


##### 资料参考：

> [http://www.cnblogs.com/sniper007/p/3536157.html](http://www.cnblogs.com/sniper007/p/3536157.html)

> [http://www.w3school.com.cn](http://www.w3school.com.cn)
