var superWidget=function(){var configAll,configActiveWidget,inited,box,activeWidgetID,widgetConditionsGroups,groupsConditions,groupConditionsID,addEvent,removeEvent,messageEvent;return{prepareLoader:function(e){var i=".sk-folding-cube%7Bmargin%3A20px%20auto%3Bwidth%3A40px%3Bheight%3A40px%3Bposition%3Arelative%3B-webkit-transform%3ArotateZ(45deg)%3Btransform%3ArotateZ(45deg)%7D.sk-folding-cube%20.sk-cube%7Bfloat%3Aleft%3Bwidth%3A50%25%3Bheight%3A50%25%3Bposition%3Arelative%3B-webkit-transform%3Ascale(1.1)%3B-ms-transform%3Ascale(1.1)%3Btransform%3Ascale(1.1)%7D.sk-folding-cube%20.sk-cube%3Abefore%7Bcontent%3A''%3Bposition%3Aabsolute%3Btop%3A0%3Bleft%3A0%3Bwidth%3A100%25%3Bheight%3A100%25%3Bbackground-color%3A{color}%3B-webkit-animation%3Ask-foldCubeAngle%202.4s%20infinite%20linear%20both%3Banimation%3Ask-foldCubeAngle%202.4s%20infinite%20linear%20both%3B-webkit-transform-origin%3A100%25%20100%25%3B-ms-transform-origin%3A100%25%20100%25%3Btransform-origin%3A100%25%20100%25%7D.sk-folding-cube%20.sk-cube2%7B-webkit-transform%3Ascale(1.1)%20rotateZ(90deg)%3Btransform%3Ascale(1.1)%20rotateZ(90deg)%7D.sk-folding-cube%20.sk-cube3%7B-webkit-transform%3Ascale(1.1)%20rotateZ(180deg)%3Btransform%3Ascale(1.1)%20rotateZ(180deg)%7D.sk-folding-cube%20.sk-cube4%7B-webkit-transform%3Ascale(1.1)%20rotateZ(270deg)%3Btransform%3Ascale(1.1)%20rotateZ(270deg)%7D.sk-folding-cube%20.sk-cube2%3Abefore%7B-webkit-animation-delay%3A.3s%3Banimation-delay%3A.3s%7D.sk-folding-cube%20.sk-cube3%3Abefore%7B-webkit-animation-delay%3A.6s%3Banimation-delay%3A.6s%7D.sk-folding-cube%20.sk-cube4%3Abefore%7B-webkit-animation-delay%3A.9s%3Banimation-delay%3A.9s%7D%40-webkit-keyframes%20sk-foldCubeAngle%7B0%25%2C10%25%7B-webkit-transform%3Aperspective(140px)%20rotateX(-180deg)%3Btransform%3Aperspective(140px)%20rotateX(-180deg)%3Bopacity%3A0%7D25%25%2C75%25%7B-webkit-transform%3Aperspective(140px)%20rotateX(0deg)%3Btransform%3Aperspective(140px)%20rotateX(0deg)%3Bopacity%3A1%7D90%25%2C100%25%7B-webkit-transform%3Aperspective(140px)%20rotateY(180deg)%3Btransform%3Aperspective(140px)%20rotateY(180deg)%3Bopacity%3A0%7D%7D%40keyframes%20sk-foldCubeAngle%7B0%25%2C10%25%7B-webkit-transform%3Aperspective(140px)%20rotateX(-180deg)%3Btransform%3Aperspective(140px)%20rotateX(-180deg)%3Bopacity%3A0%7D25%25%2C75%25%7B-webkit-transform%3Aperspective(140px)%20rotateX(0deg)%3Btransform%3Aperspective(140px)%20rotateX(0deg)%3Bopacity%3A1%7D90%25%2C100%25%7B-webkit-transform%3Aperspective(140px)%20rotateY(180deg)%3Btransform%3Aperspective(140px)%20rotateY(180deg)%3Bopacity%3A0%7D%7D)%3B",t=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");i=decodeURIComponent(i),i=i.replace(/\{color\}/g,"#"+configActiveWidget.buttonBackground),o.type="text/css",o.styleSheet?o.styleSheet.cssText=i:o.appendChild(document.createTextNode(i)),t.appendChild(o);var n="%3Cdiv%20class%3D%22sk-folding-cube%22%3E%3Cdiv%20class%3D%22sk-cube1%20sk-cube%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22sk-cube2%20sk-cube%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22sk-cube4%20sk-cube%22%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22sk-cube3%20sk-cube%22%3E%3C%2Fdiv%3E%3C%2Fdiv%3E";return n=decodeURIComponent(n)},random:function(e,i){return Math.floor(Math.random()*i-e+1)+e},loader:function(e){box.loader.style.opacity=e?1:0,box.loader.style.visibility=e?"visible":"hidden"},isMobile:function(){return/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)},hideWidget:function(){box.head.style.cursor="pointer",box.style.top="auto",box.style.marginTop=0,box.style.bottom=-(box.offsetHeight-box.head.offsetHeight)+"px"},showWidget:function(){box.head.style.cursor="default","top"==configActiveWidget.position2&&(box.style.top=configActiveWidget.distance2+"px"),"center"==configActiveWidget.position2&&(box.style.top="50%",box.style.marginTop=.5*-box.offsetHeight+"px"),"bottom"==configActiveWidget.position2&&(box.style.bottom=configActiveWidget.distance2+"px"),box.style.transform="scale(1) translate3d(0, 0, 0)"},destroyWidget:function(e){var i=superWidget.getCookie("widget_currentID");"undefined"!=typeof widget_debugMode&&console.log("destroyWidget --- widget_currentID: ",i),superWidget.surveyFilled(i),superWidget.setCookie("survey_filled_"+i,1,2592e3),superWidget.setCookie("widget_config",0,-1),superWidget.setCookie("widget_activeID",0,-1),superWidget.setCookie("widget_currentID",0,-1),box&&(e?("top"==configActiveWidget.position2&&(box.style.top=-box.offsetHeight-20+"px"),"center"==configActiveWidget.position2&&(box.style.top=-box.offsetHeight-20+"px"),"bottom"==configActiveWidget.position2&&(box.style.bottom=-box.offsetHeight-20+"px"),setTimeout(function(){document.body.removeChild(box),box=!1},2e3)):(document.body.removeChild(box),box=!1),inited=!1,removeEvent(messageEvent,superWidget.message,!1))},activateRetargeting:function(e,i){superWidget.actionAfterLoadConfig=function(){var t="web_widget_";this.setCookie(t+e,i,2678400),superWidget.actionAfterLoadConfig=!1},"undefined"!=typeof superWidget.configIsLoaded&&superWidget.actionAfterLoadConfig()},deactivateRetargeting:function(e){var i="web_widget_";if("undefined"==typeof e){var t=this.getAllCookies();for(var o in t)0==o.indexOf(i)&&this.setCookie(o,"",0)}else this.setCookie(i+e,"",0);this.destroyWidget(!1)},readRetargetCookies:function(){var e=this.getAllCookies(),i="";for(var t in e)0==t.indexOf("web_widget_")&&(i+="&cookies["+t+"]="+e[t]);return i},getDomain:function(){var e=location.host,i=e.match(/[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6}$/i);return"path=/; domain="+i},getAllCookies:function(){if(""===document.cookie)return{};for(var e=document.cookie.split("; "),i={},t=0,o=e.length;t<o;t++){var n=e[t].split("="),d=decodeURIComponent(n.shift());0==d.indexOf("web_widget_")&&(i[d]=decodeURIComponent(n.join("=")))}return i},setCookie:function(e,i,t){var o=new Date;o.setTime(o.getTime()+1e3*t);var n="expires="+o.toUTCString(),d=superWidget.getDomain();document.cookie=e+"="+i+"; "+n+"; "+d},surveyFilled:function(e){if(e){var i=superWidget.getCookie("widget_surveyFilled");if(null!=i&&i.length>0){if(i.indexOf(e)!==-1)return;i+=","+e}else i=e;superWidget.setCookie("widget_surveyFilled",i,31104e3)}},getCookie:function(e){var i=document.cookie,t=i.indexOf(" "+e+"=");if(t==-1&&(t=i.indexOf(e+"=")),t==-1)i=null;else{t=i.indexOf("=",t)+1;var o=i.indexOf(";",t);o==-1&&(o=i.length),i=unescape(i.substring(t,o))}return i},clearCookies:function(e,i){superWidget.setCookie("widget_config",0,-1),superWidget.setCookie("widget_activeID",0,-1),superWidget.setCookie("widget_currentID",0,-1),"undefined"==typeof e&&(superWidget.setCookie("widget_pageViewCount",0,-1),superWidget.setCookie("widget_timeStamp",0,-1),superWidget.setCookie("widget_minimized",0,-1),"number"==typeof i&&superWidget.setCookie("widget_capping_"+i,0,-1))},pageViewCount:function(e){var i=parseInt(superWidget.getCookie("widget_pageViewCount"),10);return i||(i=0),e&&(i++,superWidget.setCookie("widget_pageViewCount",i,1800)),i},timeStamp:function(){var e,i=parseInt(superWidget.getCookie("widget_timeStamp"),10),t=parseInt((new Date).getTime()/1e3,10);return i?e=t-i:(e=0,superWidget.setCookie("widget_timeStamp",t,1800)),e>1800&&(e=0,superWidget.setCookie("widget_timeStamp",t,1800),superWidget.setCookie("widget_pageViewCount",0,1800)),parseInt(e,10)},initWidget:function(e){if(1==inited||!configActiveWidget)return!1;if(inited=!0,!configActiveWidget.url)return!1;if(1==configActiveWidget.mobile&&superWidget.isMobile())return!1;"auto"==configActiveWidget.width&&(configActiveWidget.autowidth=!0,configActiveWidget.width=320),"auto"==configActiveWidget.height&&(configActiveWidget.autoheight=!0,configActiveWidget.height=180);var i=function(e){return document.createElement(e)},t=function(e,i){for(var t in i)i.hasOwnProperty(t)&&(e.style[t]=i[t])};if(1==parseInt(configActiveWidget.random_position,10)){var o=superWidget.random(1,3);1==o?configActiveWidget.position="left":2==o?configActiveWidget.position="center":configActiveWidget.position="right"}if(1==parseInt(configActiveWidget.random_position2,10)){var n=superWidget.random(1,3);1==n?configActiveWidget.position2="top":2==n?configActiveWidget.position2="center":configActiveWidget.position2="bottom"}var d="auto",r="auto",s="0";"left"==configActiveWidget.position&&(d=configActiveWidget.distance+"px"),"center"==configActiveWidget.position&&(d="50%",s=.5*-configActiveWidget.width+"px"),"right"==configActiveWidget.position&&(r=configActiveWidget.distance+"px");var g=configActiveWidget.width;isNaN(configActiveWidget.width)||(g=configActiveWidget.width+"px");var a="auto",c="auto",p="0";"top"==configActiveWidget.position2&&(a="-2000px"),"center"==configActiveWidget.position2&&(a="-2000px"),"bottom"==configActiveWidget.position2&&(c="-2000px"),box=i("div"),box.id="feedbackWidgetBox",t(box,{position:"fixed",top:a,bottom:c,right:r,left:d,marginTop:p,marginLeft:s,width:g,borderRadius:"5px",zIndex:"19999",font:"bold 11px/30px Arial, sans-serif",boxShadow:"0 0 10px rgba(0, 0, 0, 0.3)",background:"#FFF",transform:"scale(0.2) rotate(15deg) translate3d(0, 0, 0)"});var u=i("div");u.innerHTML=configActiveWidget.title,t(u,{background:"#"+configActiveWidget.headBackground,display:"block",height:"46px",borderRadius:"5px 5px 0 0",textDecoration:"none",color:"#"+configActiveWidget.titleColor,fontSize:"16px",fontWeight:"bold",lineHeight:"46px",paddingLeft:"15px",cursor:"pointer"}),u.onclick=function(e){e.stopPropagation(),superWidget.showWidget(),t(l,{display:"block"}),t(u,{cursor:"default"}),superWidget.setCookie("widget_minimized",0,1800)},box.appendChild(u),box.head=u;var l=i("span");l.innerHTML="&times;",t(l,{display:1==e?"none":"block",height:"28px",width:"13px",position:"absolute",top:"9px",right:"15px",color:"#"+configActiveWidget.titleColor,fontSize:"26px",cursor:"pointer"}),l.onclick=superWidget.destroyWidget,u.close=l,box.appendChild(l);var f=i("div");t(f,{borderRadius:"0 0 6px 6px",overflow:"hidden",background:"#"+configActiveWidget.backgroundWidget,height:parseInt(configActiveWidget.height,10)+50+59+"px",transition:"0.5s background-color",transform:"translate3d(0, 0, 0)"}),box.appendChild(f),box.content=f;var m=i("div");t(m,{position:"fixed",top:"50%",left:"50%",marginLeft:"-20px",marginTop:"-20px",opacity:0,visibility:"hiddden",transition:"all 0.5s",transform:"translate3d(0, 0, 0)"}),m.innerHTML=superWidget.prepareLoader(),box.appendChild(m),box.loader=m;var v=function(e){if(!e||e.indexOf("://")===-1)return!1;var i=e.split("://")[1];return 1!==i.indexOf("?ok=1")&&(i=i.split("?ok=1")[0]),i="//"+i+"?ok=1"},w=i("iframe"),W=encodeURIComponent(window.location.href),h=v(configActiveWidget.url);if("undefined"!=typeof widget_prefill&&"undefined"!=typeof widget_prefill[activeWidgetID]){h=v(configActiveWidget.url_prefill);for(var b in widget_prefill[activeWidgetID])h+="&"+b+"="+encodeURIComponent(widget_prefill[activeWidgetID][b])}h+="&t="+(new Date).getTime(),h+="&parentURL="+W;var C=superWidget.getCookie("smclient");"undefined"!=typeof C&&C&&(h+="&smclientid="+C),"undefined"!=typeof widget_external_key&&widget_external_key.length&&(h+="&external_key="+widget_external_key),w.src=h,t(w,{width:"100%",border:"none",height:"100%",background:configActiveWidget.backgroundWidget,transition:"opacity 0.5s",transform:"translate3d(0, 0, 0)"}),f.appendChild(w),document.body.appendChild(box),superWidget.setCapping(configActiveWidget.id),addEvent(messageEvent,superWidget.message,!1)},initPopup:function(e){configActiveWidget.facebox&&configActiveWidget.facebox.width&&configActiveWidget.facebox.height&&(popupBox={},function(){var i={url:e,width:configActiveWidget.facebox.width,height:configActiveWidget.facebox.height},t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="//"+configActiveWidget.url.split("/")[2]+"/scripts/widget/popup.min.min.js",t.onload=function(){popupBox.initPopup(i)};var o=document.getElementsByTagName("script")[0];"undefined"==typeof popupBoxInited&&(popupBoxInited=!0,o.parentNode.insertBefore(t,o))}())},message:function(event){var dat=event.data;if(dat.indexOf("widgetIsLoading")!==-1&&(box.getElementsByTagName("IFRAME")[0].style.opacity=0,superWidget.loader(!0)),dat.indexOf("widgetWidth")!==-1&&dat.indexOf("___")!==-1){var dimensions=dat.split("___"),newWidth=parseInt(dimensions[1],10);if(configActiveWidget.autowidth&&!isNaN(newWidth)){var titleWidth=0;box.head.style.position="fixed",box.head.style.right=0,titleWidth=box.head.offsetWidth+40,box.head.style.position="static",newWidth>titleWidth&&(titleWidth=newWidth),titleWidth<320&&(titleWidth=320),box.style.width=titleWidth+"px",box.style.transition="width 0.5s","center"==configActiveWidget.position&&(box.style.marginLeft=.5*-parseInt(box.style.width,10)+"px")}}if(dat.indexOf("widgetHeight")!==-1){if(dat.indexOf("___")!==-1){var dimensions=dat.split("___"),newHeight=parseInt(dimensions[1],10),iframe=box.getElementsByTagName("IFRAME")[0],content=box.getElementsByTagName("DIV")[1];configActiveWidget.autoheight&&(content.style.transition="0.5s height",content.style.transform="translate3d(0, 0, 0)",content.style.height=newHeight+"px",iframe.style.height=newHeight+"px"),iframe.style.opacity=1}"undefined"==typeof configActiveWidget.cookie&&(box.style.transition="1.5s transform, 1s bottom, 1s top, 1s margin-top, 0.5s width"),superWidget.loader(!1),1==superWidget.getCookie("widget_minimized")?superWidget.hideWidget():superWidget.showWidget()}if(dat.indexOf("newURL")!==-1&&dat.indexOf("___")){var url=decodeURI(dat.split("___")[1]);configActiveWidget.url=url,superWidget.setCookie("widget_currentID",configActiveWidget.id,1800),1==configActiveWidget.anchor&&(superWidget.setCookie("widget_activeID",configActiveWidget.id,1800),superWidget.setCookie("widget_config",JSON.stringify(configActiveWidget),1800))}if(dat.indexOf("closefeedbackWidgetBox")!==-1)if(dat.indexOf("___")){var id=dat.split("___")[1];superWidget.surveyFilled(id),superWidget.setCookie("widget_activeID",0,-1),superWidget.setCookie("widget_config",0,-1),setTimeout(function(){superWidget.destroyWidget(!0)},1e4)}else superWidget.setCookie("widget_activeID",0,-1),superWidget.setCookie("widget_config",0,-1),superWidget.destroyWidget(!0);else if(dat.indexOf("openFacebox")!==-1){var url=dat.split("___");superWidget.initPopup(url[1])}else if(dat.indexOf("windowOpen")!==-1){var url=dat.split("___");window.location.href=url[1]}else if(dat.indexOf("windowGaOpen")!==-1){var url=dat.split("___");url=url[1];var waitForRedirect=function(){window.gaReady?window.location.href=url:setTimeout(waitForRedirect,250)};waitForRedirect()}else if(dat.indexOf("salesManago")!==-1){var id=dat.split("___"),_smclientid=id[1];superWidget.setCookie("smclient",_smclientid,1800)}dat.indexOf("integrationGA")!==-1&&eval("("+decodeURI(dat.split("___")[1])+")()")},setCapping:function(e){var i=superWidget.getCapping(e);(!i||isNaN(i)||parseInt(i,10)<=0)&&(i=0),superWidget.setCookie("widget_capping_"+e,++i,2592e3)},getCapping:function(e){return parseInt(superWidget.getCookie("widget_capping_"+e),10)},checkCapping:function(e,i){var t=superWidget.getCapping(e);return!!(isNaN(t)||0==i||i>parseInt(t,10))},oneCondition:function(id,name,val){if("undefined"!=typeof widget_debugMode&&console.log("       - "+name+" -> "+val),"operator"==name)groupsConditions[id].operator=val;else if("url"==name){for(var i=0;i<val.length;i++)window.location.href.indexOf(val[i])!==-1&&groupsConditions[id].check++;groupsConditions[id].length+=val.length}else if("time"==name)setTimeout(function(){groupsConditions[id].check++},1e3*parseInt(val,10));else if("timePage"==name){var timePage=superWidget.timeStamp();timePage>=val?groupsConditions[id].check++:setTimeout(function(){groupsConditions[id].check++},1e3*(parseInt(val,10)-timePage))}else if("pageCount"==name)superWidget.pageViewCount()>=parseInt(val,10)&&groupsConditions[id].check++;else if("leavePage"==name&&1==val)groupsConditions[id].leavePage=function(e){groupsConditions[id].check==groupsConditions[id].length-1&&e.clientY<=10&&(groupsConditions[id].check++,document.removeEventListener("mouseout",groupsConditions[id].leavePage,!1))},document.addEventListener("mouseout",groupsConditions[id].leavePage,!1);else if("pixels"!=name||isNaN(val))if("percent"!=name||isNaN(val))if("viewports"!=name||isNaN(val))if("js"==name){var f=val["function"],t=parseInt(val.time,10);f=decodeURIComponent((f+"").replace(/%(?![\da-f]{2})/gi,function(){return"%25"}).replace(/\+/g,"%20")),f=f.toString().replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&"),eval(f),groupsConditions[id].jstrue_f=widgetJSRule,groupsConditions[id].jstrue_t=t;var checkJS=function(){groupsConditions[id].jstrue_f(function(e){return!configActiveWidget&&void(1==e?groupsConditions[id].check++:t>0&&setTimeout(checkJS,1e3*groupsConditions[id].jstrue_t))})};checkJS()}else"minimized"==name&&(groupsConditions[id].minimized=!0);else groupsConditions[id].scrollViewports=function(e){var i=window.scrollY,t=window.innerHeight,o=parseInt(i/t,10);o>=val&&(groupsConditions[id].check++,document.removeEventListener("scroll",groupsConditions[id].scrollViewports,!1))},document.addEventListener("scroll",groupsConditions[id].scrollViewports,!1);else groupsConditions[id].scrollPercent=function(e){var i=window.scrollY,t=superWidget.getDocHeight(),o=window.innerHeight,n=i/(t-o)*100;n>=val&&(groupsConditions[id].check++,document.removeEventListener("scroll",groupsConditions[id].scrollPercent,!1))},document.addEventListener("scroll",groupsConditions[id].scrollPercent,!1);else groupsConditions[id].scrollPx=function(e){var i=window.scrollY;i>val&&(groupsConditions[id].check++,document.removeEventListener("scroll",groupsConditions[id].scrollPx,!1))},document.addEventListener("scroll",groupsConditions[id].scrollPx,!1);"operator"!=name&&"url"!=name&&"minimized"!=name&&groupsConditions[id].length++},oneGroupTimeout:function(e,i){setTimeout(function(){if(activeWidgetID)return!1;var t=groupsConditions[e];t.check==t.length?("undefined"!=typeof widget_debugMode&&console.log("wszystkie warunki spełnione w grupie: "+e+" z widgetuID: "+i),widgetConditionsGroups[i].check++,t.minimized&&(widgetConditionsGroups[i].minimized=!0)):superWidget.oneGroupTimeout(e,i)},250)},oneGroupConditions:function(e,i,t){groupsConditions[e]={},groupsConditions[e].check=0,groupsConditions[e].length=0,"undefined"!=typeof widget_debugMode&&console.log("   * Grupa: "+e);for(var o in i)superWidget.oneCondition(e,o,i[o]);"or"==groupsConditions[e].operator&&0!=groupsConditions[e].length&&(groupsConditions[e].length=1),"undefined"!=typeof widget_debugMode&&console.log("       - w grupie "+e+" liczba obowiązkowych warunków do spełnienia: "+groupsConditions[e].length),widgetConditionsGroups[t].length++,superWidget.oneGroupTimeout(e,t)},oneWidgetTimeout:function(e){setTimeout(function(){if(activeWidgetID)return!1;var i=widgetConditionsGroups[e];if("undefined"!=typeof widget_debugMode&&console.log("ilość spełnionych reguł "+i.check+", reguł do spełnienia: "+i.length+" dajemy widgetID: "+e),i.check>=i.length){if("undefined"!=typeof widget_debugMode&&console.log("warunki spełnione! dajemy widgetID: ",e),activeWidgetID=e,configActiveWidget=configAll[e],1==i.minimized?(superWidget.setCookie("widget_minimized",1,1800),superWidget.initWidget(!0)):superWidget.initWidget(!1),1==configActiveWidget.anchor){var t=JSON.parse(JSON.stringify(configActiveWidget));t.cookie=1,superWidget.setCookie("widget_activeID",e,1800),superWidget.setCookie("widget_config",JSON.stringify(t),1800)}superWidget.setCookie("widget_currentID",e,1800)}else superWidget.oneWidgetTimeout(e)},250)},oneWidgetConditions:function(e){widgetConditionsGroups[e]={},widgetConditionsGroups[e].check=0,widgetConditionsGroups[e].length=0,"undefined"!=typeof widget_debugMode&&console.log("> WIDGET ID: "+e);var i=configAll[e],t=i.conditions;for(var o in t){var n=t[o];"object"==typeof n&&(superWidget.oneGroupConditions(groupConditionsID,n,e),groupConditionsID++)}"undefined"!=typeof widget_debugMode&&(console.log("   * Operator między grupami: "+i.operator),console.log("   * Ilość grup warunków: "+widgetConditionsGroups[e].length)),"or"==i.operator&&(widgetConditionsGroups[e].length=1),i.capping&&!isNaN(i.capping)&&0!=parseInt(i.capping,10)&&(widgetConditionsGroups[e].length++,superWidget.checkCapping(e,i.capping)&&widgetConditionsGroups[e].check++),"undefined"!=typeof widget_debugMode&&console.log("   * Ilość grup warunków do spełnienia: "+widgetConditionsGroups[e].length),superWidget.oneWidgetTimeout(e)},waitForAction:function(){widgetConditionsGroups={},groupsConditions={},groupConditionsID=0;for(var e in configAll)superWidget.oneWidgetConditions(e)},initActiveWidget:function(){eval("configActiveWidget = ("+superWidget.getCookie("widget_config")+");"),superWidget.checkCapping(configActiveWidget.id,parseInt(configActiveWidget.capping,10))?(superWidget.initWidget(superWidget.getCookie("widget_minimized")),"undefined"!=typeof widget_debugMode&&console.log("checkCapping - init")):(superWidget.clearCookies(!0),superWidget.initUnknownWidget(),"undefined"!=typeof widget_debugMode&&console.log("checkCapping - init unknown"))},initUnknownWidget:function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0;var i=document.getElementsByTagName("script"),t="";if(i.length>0)for(var o in i)if(i[o].src&&i[o].src.indexOf("/script.min.js")!==-1){"https:"==document.location.protocol?(t=i[o].src.replace(/https:\/\/(.*)\/scripts\/widget\/script\.min\.js(.*)$/,"$1"),"undefined"!=typeof widget_debugMode&&console.log("widget_ownerID z adresu skrypty",i[o].src)):"http:"==document.location.protocol&&(t=i[o].src.replace(/http:\/\/(.*)\/scripts\/widget\/script\.min\.js(.*)$/,"$1"),"undefined"!=typeof widget_debugMode&&console.log("widget_ownerID z adresu skryptu",i[o].src)),"undefined"==typeof widget_ownerID&&i[o].src.indexOf("#id=")!==-1&&(widget_ownerID=i[o].src.match(/#id=(.*)$/)[1],"undefined"!=typeof widget_debugMode&&console.log("widget_ownerID z adresu URL#id=",widget_ownerID));break}if("undefined"==typeof widget_ownerID)return!1;e.src="//"+t+"/widget.php",e.src+="?id="+widget_ownerID,e.src+="&url="+encodeURIComponent(window.location.href),e.src+="&time="+superWidget.timeStamp(),e.src+="&count="+superWidget.pageViewCount(!0),e.src+=superWidget.readRetargetCookies(),"undefined"!=typeof widget_getFilled&&(e.src+="&getFilled=1"),"undefined"!=typeof widget_getAll&&(e.src+="&getAll=1"),document.referrer.length&&(e.src+="&referrer="+encodeURIComponent(document.referrer));var n=superWidget.getCookie("widget_surveyFilled");null!=n&&n.length>0&&(e.src+="&filled="+n),e.onload=function(){"undefined"!=typeof configOfSuperWidget&&(configAll=configOfSuperWidget,superWidget.configIsLoaded=!0,"function"==typeof superWidget.actionAfterLoadConfig&&superWidget.actionAfterLoadConfig(),superWidget.waitForAction())};var d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(e,d)},debug:function(e){return"undefined"!=typeof e&&e?(superWidget.setCookie("widget_debug",e,2592e3),console.log("Dev mode on")):(superWidget.setCookie("widget_debug",0,-1),console.log("Dev mode off"))},init:function(){addEvent=window.addEventListener||window.attachEvent,removeEvent=window.removeEventListener||window.detachEvent,messageEvent=window.addEventListener?"message":"onmessage",parseInt(superWidget.getCookie("widget_debug"),10)&&(widget_debugMode=1),""!==superWidget.readRetargetCookies()?superWidget.initUnknownWidget():superWidget.getCookie("widget_activeID")?superWidget.initActiveWidget():superWidget.initUnknownWidget()},getDocHeight:function(){var e=document;return Math.max(e.body.scrollHeight,e.documentElement.scrollHeight,e.body.offsetHeight,e.documentElement.offsetHeight,e.body.clientHeight,e.documentElement.clientHeight)}}}();superWidget.init();