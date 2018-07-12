var AreaChart;

window.addEventListener('resize', resizeAreaChart); 

var AreaChartHeight;
var AreaScroller;

function drawArea() {
	
  // Create chart:
  AreaChart=new Tee.Chart("canvas_area");

  // Add two Bar series:
  //AreaChart.addSeries(new Tee.Area([5,3,2,4,7,1]) );
  //AreaChart.addSeries(new Tee.Area([4,4,5,8,2,9]) ).visible=true;
  
  //var area1 = new Tee.Area();
  //var areaseries = AreaChart.addSeries(area1);
  
  //areaseries.loadJSON(document.getElementById("area_json"));
  loadAreaData(AreaChart);
  
  AreaChart.removeSeries(AreaChart.series.items[1]);
  
  AreaChart.legend.visible=false;
  
  AreaChart.series.items[0].format.stroke.size=0.5;
  
  AreaChart.series.items[0].smooth=0.3;
  
  AreaChart.axes.left.labels.decimals = 0;
  AreaChart.axes.bottom.increm = 1000;
  AreaChart.axes.bottom.labels.decimals = 0;
  
  AreaChart.series.items[0].marks.visible=false;

  AreaChart.title.visible=false;
  
  AreaChart.panel.margins.left = -4;
  
  AreaChart.axes.left.labels.ongetlabel=function(value,s) {
	s =  s /1000;
	return s + "k"; 
  }

  AreaChart.applyTheme("minimal");
  
  applyPalette(AreaChart);
  
  //tooltip
  tip=new Tee.ToolTip(AreaChart);
  tip.autoHide=true;
  tip.render="dom";
  tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
  tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
  tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";

  AreaChart.tools.add(tip);

  tip.onhide=function() { scaling=0; poindex=-1; }
  
  var t = new Tee.CursorTool(AreaChart);
  t.direction="vertical";

  tip.ongettext=function(tool, text, series, index) {
		var t, s="", ser;

		for(t=0;t<AreaChart.series.count(); t++) {
		  if (t>0) s+="<br/>";
		  ser=AreaChart.series.items[t];
		  s+='<font face="verdana" color="darkorange" size="1"><b>$</b></font><font face="verdana" color="red" size="1">'+ser.data.values[index].toFixed(0)+'</font>';
		}
		return s;
  }
  
  //AreaScroller
  AreaScroller = new Tee.Scroller("canvas_area_scroll", AreaChart);
  /*AreaScroller.onChanging = function(s,min,max) {
    var mi = new Date(min).toDateString(),
        ma = new Date(max).toDateString();
    document.getElementById("dataRange").innerHTML = '<font face="arial" size="2">Showing data from ' + mi + ' to ' + ma + '</font>';
  }*/
  AreaScroller.panel.transparent = true;
  AreaScroller.panel.format.shadow.visible = false;
  AreaScroller.panel.format.round.x = 0;
  AreaScroller.panel.format.round.y = 0;
  
  AreaScroller.panel.format.gradient.visible = true;
  if (AreaChart.panel.format.gradient.colors.length>1)
    AreaScroller.panel.format.gradient.colors = [AreaChart.panel.format.gradient.colors[0],AreaChart.panel.format.gradient.colors[1]];
  else
    AreaScroller.panel.format.gradient.colors = ["white"];
  AreaScroller.panel.format.gradient.direction = "topbottom";
  AreaScroller.panel.format.stroke.fill = "rgba(255,165,0,0.5)";
  AreaScroller.panel.format.stroke.size = 0;


  //animation
  animation=new Tee.SeriesAnimation();
  animation.duration=1000;
  animation.kind="all";
  animation.mode = "linear"; 
 
  animation.animate(AreaChart);
  
  resizeAreaChart();
}

function loadAreaData(chart) {
  var jsonXY = document.getElementById("area_json").value,
      list = JSON.parse(jsonXY).chart,
      xyArea;

  chart.series.items=[];

  for (var t=0; t<list.length; t++) {
     xyArea = chart.addSeries(new Tee.Area());
     xyArea.loadJSON( { value: list[t] });
  }
}

function resizeAreaChart(){
	
	var w;
	var h;
	var canvas = document.getElementById("canvas_area");
	var scrollcanvas = document.getElementById("canvas_area_scroll");
	
	w = canvas.offsetParent.offsetWidth-(canvas.offsetLeft*2);
	ws = w;
	if (AreaChartHeight==undefined)
		AreaChartHeight = canvas.offsetParent.clientHeight*0.7;
	h = AreaChartHeight;
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";
	
	AreaChart.ctx.canvas.width=w;
	AreaChart.ctx.canvas.height=h;
	AreaChart.bounds.width=w;
	AreaChart.bounds.height=h;
	
	AreaChart.draw();

	var wS = AreaChart.axes.bottom.endPos - parseInt(AreaScroller.canvas.style.marginLeft, 10);	
	var hS = (h*0.24);
	
	AreaScroller.ctx.canvas.width=wS;
	AreaScroller.ctx.canvas.height=hS;
		
	scrollcanvas.style.height = hS + "px";
	scrollcanvas.style.width = wS +  "px";
	AreaScroller.setBounds(0, 0, wS, hS);
	
	AreaScroller.draw();
	
}