function $(id){
    return document.getElementById(id);
  }

/* clearAttribute */
function clearAttr(obj){
  obj.style.cssText = '';
}
var olistButIcon =  $('manuNav').getElementsByTagName('span');
var oLogoImg = $('logo').getElementsByTagName('img');
var scrollHeight = null;
/* 窗口侧边栏按钮的点击事件 */
var sideFlag = true;
olistButIcon[0].onclick = function(){
  if (sideFlag) {
    $('manuNav').style.right = 0+'px';
    $('mask').style.width = 600+'px';
    document.body.style.left = -214+'px';
    olistButIcon[0].className='listButIcon2';
    sideFlag= false;
  }
   else {
    $('manuNav').style.right = -214+'px';
    $('mask').style.width = 0+'px';
    document.body.style.left = 0+'px';
    olistButIcon[0].className='listButIcon';
    sideFlag = true;
  }
}
/* header的滚动条事件 */
var scrollEvent = function (){
  if (scrollHeight == 0) {
    clearAttr($('headerWrap'));
    clearAttr($('logo'));
    clearAttr($('header'));
    clearAttr(oLogoImg[0]);
  } else {
    $('headerWrap').style.cssText = 'border-bottom:1px solid #e5e5e5';
    $('header').style.cssText = 'padding:0px';
    $('logo').style.cssText = 'width:130px; height:37px;'
    oLogoImg[0].style.cssText = 'width:130px; height:37px;';
  }
}
/* 图片添加class 添加运动事件 */
window.onload = function (){
   $('webList').className = 'flyIn';
   fn();//在加载时就将窗口宽高比例话
   oBtn();//
   // $('funcList').className = 'flyIn';
}
window.onscroll = function (){
  scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
  if (!flag) {
    clearInterval(timer);
  } else {
    flag=false;
  }
  scrollEvent();
  flyIn('webList');
  flyIn('funcList');
  flyIn('picScroll');
  flyIn('red');
}

/* 检测滚动条用于触发图片的运动事件，在触发之前让其隐藏 */
function flyIn(obj){
  var sectionTop = $(obj).offsetTop;
  var sectionHeight = $(obj).offsetHeight;
  if (scrollHeight>sectionTop-sectionHeight-sectionHeight&&scrollHeight<sectionTop+sectionHeight+-100) {
    $(obj).className = 'flyIn';
    $(obj).style.visibility= 'visible';
  } else {
    $(obj).className = '';
    $(obj).style.visibility= 'hidden';

  }
}
/* video */
/* video的窗口大小--等比 */
var oVideo = $('video').getElementsByTagName('video');
var blackBox = $('yellow').getElementsByTagName('section');
window.addEventListener("resize",fn);

function fn(){
  size($('video'),0.58);
  size(oVideo[0],0.58);
  size(blackBox[0],0.8);
  size(blackBox[1],0.8);
  oBtn();
}
function size(obj,num){
  // alert(obj);
  var vWidth = obj.offsetWidth;
  obj.style.height = vWidth*num+'px';
  // oVideo[0].style.height = vWidth*0.56+'px';
}
/* video 点击播放 删除按钮*/
$('videoPlayBut').onclick = function (){
  var oImg = $('video').getElementsByTagName('img');
  oImg[0].style.display = 'none';
  $('videoPlayBut').style.display = 'none';
  oVideo[0].play();
}


/* 图片无缝轮换 */
var oPic = $('picBox').getElementsByTagName('li');
var aPic = $('picBox').getElementsByTagName('img');
// alert(oPic[0].offsetHeight);
function oBtn(){
  $('picBoxWrap').style.height = oPic[0].offsetHeight+'px';
  $('leftBut').style.top = aPic[0].offsetHeight/2+'px';
  $('rightBut').style.top = aPic[0].offsetHeight/2+'px';
};
var num = 0;
oPic[0].className = 'center';
$('rightBut').onclick = function(){
  if (num<oPic.length-1) {
    // if (num==oPic.length-1) {
    //  oPic[0].className = '';
    // }
    // if (num==oPic.length) {
    //  oPic[0].className = 'center';
    //  num=0;
    // }
    num++;
    oPic[num-1].className = 'left';
    oPic[num].className = 'center';
  } else {
    // oPic[0].className = 'center';
    // // oPic[num-2].className = 'left';
    // // num=0;
    // // oPic[0].className = '';
  }
  $('picBoxWrap').style.height = oPic[num].offsetHeight+'px';
  // if (condition) {
  //   expression
  // }
}
$('leftBut').onclick = function(){
  if (num>0) {
    num--;
    oPic[num+1].className = '';
    oPic[num].className = 'center';
  } else {
    // num = 1;
  }
  $('picBoxWrap').style.height = oPic[num].offsetHeight+'px';
}


// var picBoxWidth = $('picBoxWrap').offsetWidth;
// var num = 0;
// for (var i = 1; i < oPic.length; i++) {
//   oPic[i].style.transform = 'translate('+picBoxWidth+'px, 0)';
// }
// $('leftBut').onclick = function(){
//   if (num<oPic.length-1) {
//     num++;
//   } else {
//     num = -1;
//   }
//   $('picBoxWrap').style.height = oPic[num].offsetHeight+'px';
//   oPic[num].style.transform = 'translate(0, 0)';
//   oPic[num-1].style.transform = 'translate('+-picBoxWidth+'px, 0)';
// }
// $('rightBut').onclick = function(){
//   // alert(num);
//   if (num>0) {
//     num--;
//   } else {
//     // num = 1;
//   }
//   $('picBox').style.transform = 'translate('+-picBoxWidth*num+'px, 0)';
//   $('picBoxWrap').style.height = oPic[num].offsetHeight+'px';
// }

// var picBoxWidth = $('picBoxWrap').offsetWidth;
// var num = 0;
// $('leftBut').onclick = function(){
//   if (num<oPic.length-1) {
//     num++;
//   } else {
//     // num = -1;
//   }
//   $('picBoxWrap').style.height = oPic[num].offsetHeight+'px';
//   $('picBox').style.transform = 'translate('+-picBoxWidth*num+'px, 0)';
// }
// $('rightBut').onclick = function(){
//   // alert(num);
//   if (num>0) {
//     num--;
//   } else {
//     // num = 1;
//   }
//   $('picBox').style.transform = 'translate('+-picBoxWidth*num+'px, 0)';
//   $('picBoxWrap').style.height = oPic[num].offsetHeight+'px';
// }
// 
// 
// 
// for (var i = 0; i < oPic.length; i++) {
//   var 
// }
//
//明明是绝对定位为什么 还会撑开父级还有滚动条？
//使用 translate 不能随着窗口的变化改变，到时当产生偏移值后，再有窗口变化时，translate 的偏移值不变。
//
//
//
//
//回到顶部
var timer = null;
var flag = false;

$('toTop').onclick = function (){
  timer = setInterval(function(){
    var oScroll = document.documentElement.scrollTop||document.body.scrollTop;
    var iSpead = Math.ceil(oScroll/10);
    if (oScroll > 0) {
      document.documentElement.scrollTop=document.body.scrollTop = oScroll-iSpead;
    } else {
      clearInterval(timer);
    }
    flag = true;
  },40)
}

var demo = document.getElementsByClassName('demo');
for (var i = 0; i < demo.length; i++) {
    demo[i].onclick = function(){
    var Hwidth = document.body.offsetWidth;
    window.open('//www.baidu.com','newwindow','width=1000,height=500,menubar=no,resizable=no');
    return false;
  }
}