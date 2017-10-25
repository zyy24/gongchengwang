window.onload=function(){
	
//=======下拉框开始=======
	function dropDown() {
		var oTopTabGroup = document.getElementById('topTabGroup');
		var aTopTabs=getClass(oTopTabGroup,'topTab'); //li
		var aTabs = oTopTabGroup.getElementsByTagName('span');  //i标签
		var oTabListBox  = document.getElementById('TabListBox');//点击显示部分(最大div)
		var oTopTabList  = document.getElementById('topTabList'); 
		var aTopLists = oTopTabList.getElementsByTagName('li');
		var iNum = 0;// topNav用
		var off = true;// topNav用
		for(var i=0; i<aTopTabs.length; i++){
			aTopTabs[i].index = i;
			aTopTabs[i].onclick = function(ev){
				var ev = ev || window.event;
				if(iNum != this.index){
					off = true; //解决来回点li的bug
				}
				if(off){
					for(var j=0; j<aTabs.length; j++){
						aTabs[j].style.backgroundPositionY = '-30px';
						aTopLists[j].style.display = 'none';
					}
					aTabs[this.index].style.backgroundPositionY = '-25px';
					oTabListBox.style.display = 'block';
					aTopLists[this.index].style.display = 'block';
					oTabListBox.style.left = this.offsetLeft + this.offsetWidth/2 - oTabListBox.offsetWidth/2 + 'px'; // 让点击显示部分和相应li居中对齐；
					off = false;
				}else{
					oTabListBox.style.display = 'none';
					aTabs[this.index].style.backgroundPositionY = '-30px';
					off = true;
				}
				iNum = this.index;
				ev.cancelBubble = true;
			};
			document.onclick = function(ev){
				var ev = ev || window.event;
				var t = ev.target || ev.srcElement;
				if(t != aTopTabs && t != oTopTabList){
					off = true;
					for(var j=0; j<aTabs.length; j++){
						aTabs[j].style.backgroundPositionY = '-30px';
					}
					oTabListBox.style.display = 'none';
				}
			};
	}
	}
	dropDown ();
// ========下拉框执行结束结束


//=======轮播图开始carousel=======
    function carousel(){
		var oBtnL = document.getElementById("btn_L");
		var oBtnR = document.getElementById("btn_R");
		var oView = document.getElementById("view");
		var oUl = oView.getElementsByTagName('ul')[0];
		var aLis = oUl.children;
		var oOl = document.getElementsByTagName('ol')[0];
		var oBnts = oOl.children;
		oUl.innerHTML+=oUl.innerHTML;
		var aLis = oUl.children;
		var oLiWidth = aLis[0].offsetWidth;
		var iNum = 0;
		//计算轮播图的宽度
		oUl.style.width = aLis[0].offsetWidth*aLis.length + 'px';
		oW= document.documentElement.clientWidth;
			
		//计算轮播图居中
		oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
		
		//当窗口改变的时候重新计算轮播图居中
		window.onresize=function(){
			oW= document.documentElement.clientWidth;
			oView.style.left = -(oView.offsetWidth - oW)/2 +'px';
		};
			
		//点击右侧按钮
		oBtnR.onclick=function(){
			iNum++;
			if(iNum==aLis.length/2+1){
				oUl.style.left = 0+'px'
				iNum=1;
			}
			for(var i=0; i<oBnts.length;i++){
				oBnts[i].className='';
			};
			if(iNum==aLis.length/2){
				oBnts[0].className='active';
			}else{
				oBnts[iNum].className='active';
			}
			animate(oUl,{'left': -iNum*oLiWidth});
		};
				
		//点击左侧按钮
		oBtnL.onclick=function(){
			iNum--;
			if(iNum<0){
				oUl.style.left =- oUl.offsetWidth/2+'px'
				iNum=aLis.length/2-1;
			};
			for(var i=0; i<oBnts.length;i++){
				oBnts[i].className='';
			};
			oBnts[iNum].className='active';
			animate(oUl,{'left': -iNum*oLiWidth});
		};
			
		//点解数字按钮切换轮播
		for(var i =0; i<oBnts.length;i++){
			oBnts[i].index=i;
			oBnts[i].onclick=function(){
				for(var i =0; i<oBnts.length;i++){
					oBnts[i].className='';
				}
				oBnts[this.index].className='active';
				iNum=this.index;
				animate(oUl,{'left': -this.index*oLiWidth});
			}
		};
	}
	carousel()
//=======轮播图结束carousel=======
	
//=======选项卡开始=======
   	function tab(){
        var oTab=document.getElementById("tab");
        var oBtnGroup = document.getElementById("btn_group");
        var aLi = oBtnGroup.getElementsByTagName("li");
        var aConts = oTab.getElementsByTagName("a");
	    for(var i=0;i<aLi.length; i++){
         	aConts[0].style.display="block";
            aLi[i].index=i;
            aLi[i].onclick=function(){
	            for(var i=0;i<aLi.length; i++){
			        aLi[i].className="";	
			        aConts[i].style.display="none";
				};
	            this.className="active";
	            aConts[this.index].style.display="block";
			}
		}
	}
    tab();	
//=======选项卡结束=======



//=======返回顶部开始=======

	var timerT=null;
	var oBtn = document.getElementById("back");
	var oTop = 0;
	var offT=true;
	window.onscroll=function(){
		oTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(oTop>1000){
			oBtn.style.display='block'
		}else{
			oBtn.style.display='none'
		};				
		if(!offT){
			clearInterval(timerT);	
		}
		offT=false;				
	};
	function top(){
 		oBtn.onclick=function(){
			timerT=setInterval(function(){
				var backTop = Math.floor(oTop/4);
				/*IE8兼容，直接返回顶部*/
				function isIE(){ //ie?
					if (!!window.ActiveXObject || "ActiveXObject" in window){
						return true;
					}else{
						return false;
					}
				}
	            if(isIE()){
	            	var browser=navigator.appName;
		            var b_version=navigator.appVersion;
		            var version=b_version.split(";");
		            var trim_Version=version[1].replace(/[ ]/g,"");
	            	if(browser=="Microsoft Internet Explorer"  &&trim_Version=="MSIE8.0"){
		                if(document.documentElement.scrollTop){
		                    document.documentElement.scrollTop=0;
		                }else{
		                    document.body.scrollTop=0;
	                	}
		            }else{
		            	backtoTop();
		            }
	            }else{
	            	backtoTop();
	            }
	            function backtoTop(){
	           		if(backTop == 0){
						clearInterval(timerT);
					}else{
						if(document.documentElement.scrollTop){
							document.documentElement.scrollTop-=backTop;
						}else{
							document.body.scrollTop-=backTop;	
						}
						offT=true;
					}
	           };
        	},30)
		}
	}
	top();
//=======返回顶部结束=======		    	
}
