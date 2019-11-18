$(function () {
    $(".GameRule").click(function () {
        $(".RuleContent").fadeIn(300);
    })

    $(".CloseRule").click(function () {
        $(".RuleContent").fadeOut(300);
    })

    $(".StartGame").click(function () {
        $(this).fadeOut(300);
        slider() ;
        Genarote() ;
    })
    $(".Restart").click(function () {
        $(".GameOverContent").fadeOut(300) ;
		$(".score").html("0");
        slider() ;
        Genarote() ;
    })
    $(".ReturnMain").click(function () {
        $(".GameOverContent").fadeOut(300) ;
        $(".StartGame").fadeIn(300) ;
    })

    var timerwidth = $(".timer").width();
    // 时间滚动条滚动的方法
    function slider() {
        $(".timer").width(timerwidth);
        $(".timer").animate({
            width:"0"
        },60000,function () {
            // 滚动条滚完后 -- 游戏结束
            $(".GameOverContent").fadeIn(300);
            clearInterval(ManagroteTimer) ;
			point = {Current :new AddNumPoint(),};
			 $(".score").text("0");
        }) ;
    }

    var currecctImg ;
    var GanarotePosition = [
        {top: 114, left: 95},
        {top: 192,left: 100},
        { top: 160,left: 15},
        {top: 142,left: 184},
        {top: 212,left: 197},
        {top: 221,left: 14},
        {top: 293,left: 27},
        {top: 296,left: 204},
        {top: 274,left: 116}] ; // 存储洞口位置

    var HImgName = [
        "h0.png" , "h1.png","h2.png","h3.png","h4.png","h5.png","h6.png","h7.png","h8.png","h9.png"
    ];  // 灰太狼图片名称
    var XImgName = [
        "x0.png" , "x1.png","x2.png","x3.png","x4.png","x5.png","x6.png","x7.png","x8.png","x9.png"
    ]; // 小灰灰图片名称
    var ManagroteTimer ;
    var Img ;
	// 分数增值 -- 默认一次十分 
	var AddNum = 10 ; 
	// 节点类 
	function AddNumPoint(){
		CurrentAddNumVal = -1 ;
		PrevAddNumPoint =null;
	}
	var point ={
		Current :new AddNumPoint(),
	}
	
    $("body").delegate(".Ganarote>img", "click" , function () {
        if(!IsAdd){
             currecctImg = 7 ;
			// console.log($(".score").text());
			// ran 是 0 则为小灰灰 
            if(Ran == 0){
				var CurrentNum = parseFloat($(".score").text());
				if(CurrentNum<=0)
					return ; 
					// <90 Addnum == 10
					// 90-99 Addnum = 1 
					// 99-99.9 Addnum = 0.1
					// 99.99 Addnum = 0.01
				if(point.Current.CurrentAddNumVal==CurrentNum && CurrentNum>=90){
					point.Current = point.Current.PrevAddNumPoint ; 
					AddNum *=10 ; 
				}
                $(".score").html( (CurrentNum *1000 -AddNum*1000)/1000);
            }else{
				var CurrentNum =parseFloat($(".score").text());
				
				if(CurrentNum+AddNum == 100){
					AddNum*=0.1 ; 
					var Temp = point.Current;
					point.Current = new AddNumPoint() ; 
					point.Current.CurrentAddNumVal = CurrentNum;
					point.Current.PrevAddNumPoint = Temp ;
				}
				var AllVal = (CurrentNum *1000 + AddNum *1000) /1000; 
				var AllValStr = AllVal.toString();
                $(".score").html( AllVal*10/10);
            }
            IsAdd = true ;
        }
    })
    var temp ;
    var Ran;
    var IsAdd ;
    // 生成敌人的方法
    function Genarote() {
         ManagroteTimer = setInterval(function () {
             IsAdd = false ;
             // 删除前面的图片
             // $(".Ganarote>img").remove();
			console.log($(".Ganarote").css("width"));
			console.log($(".Ganarote").css("height"));
             // 生成0-8随机数
              var PosiIndex =  Math.floor(Math.random() * GanarotePosition.length) ;

              // 随机生成位置
              $(".Ganarote").css(GanarotePosition[PosiIndex]);

              // 生成0 或 1  --  生成是 小灰灰还是 灰太狼
              Ran =Math.round(Math.random()) ;
               currecctImg = 0 ;  // 当前播放的图片

              var $img = $("<img src=\"\"  alt=\"\">") ;  //
              Img =  $(".Ganarote").append($img) ;  // 添加img标签
			  Img.css("width","105");
			  Img.css("width","108");
              // 0为 小灰灰
              temp = Ran ==0 ? XImgName : HImgName ;

              var IsTop = false ;
                 var ti =  setInterval(function () {

                     var Site = "imgs/"+temp[currecctImg];
                     $(".Ganarote>img").attr("src",Site) ;
                      if(!IsTop && currecctImg<4){
                          currecctImg ++ ;
                      }else if(currecctImg<4){
                          currecctImg -- ;
                      }
                      else if(currecctImg == 4){
                          currecctImg -- ;
                          IsTop = true ;
                      }else{
                          currecctImg ++ ;
                      }
                      // <5  ++ = -- 6 ++
                      if(currecctImg == 10 | currecctImg == 0 ){
                          clearInterval(ti) ;
                          $(".Ganarote>img:first").remove();
                      }
                  },100)
             // 图片跳转  0-  1 - 2 -3 -4 -5      -6 7 -8 -9
              //         0 - 1 - 2 -3 -4 -5       -4 -3 -2 -1
           },1050) ;

    }

})