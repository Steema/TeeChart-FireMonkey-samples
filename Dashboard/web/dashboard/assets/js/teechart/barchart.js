var BarChart;

window.addEventListener('resize', resizeBarChart); 

var BarChartHeight;

function drawBar() {

  // Create chart:
  BarChart=new Tee.Chart("canvas_bar");
  
  loadBarData(BarChart);
    
  BarChart.series.items[0].format.stroke.size=0.2;
  BarChart.series.items[1].format.stroke.size=0.2;
  
  BarChart.series.items[0].marks.visible=false;
  BarChart.series.items[1].marks.visible=false;
  
  BarChart.series.items[0].format.gradient.visible = false;
  BarChart.series.items[1].format.gradient.visible = false;

  BarChart.title.visible=false;

  BarChart.series.items[0].title="All";
  BarChart.series.items[1].title="Years Selected";
  
  BarChart.legend.position="top";
  //BarChart.axes.bottom.labels.rotation = 45;
  BarChart.axes.left.labels.decimals = 0;
  BarChart.axes.bottom.labels.separation = 0;

  BarChart.applyTheme("minimal");
  
  applyPalette(BarChart);

  //animation
  animation = new Tee.SeriesAnimation();
  animation.duration = 900;
  animation.kind = "all";
  fadeAnimation = new Tee.FadeAnimation();
  fadeAnimation.duration = 500;
  fadeAnimation.fade.series = true;
  fadeAnimation.fade.marks = true;
  animation.mode = "linear"; 
  fadeAnimation.mode = "linear";
  animation.items.push(fadeAnimation);

  animation.animate(BarChart);
  
  resizeBarChart();
}

function loadBarData(chart) {
  var jsonXY = document.getElementById("bar_json").value,
      list = JSON.parse(jsonXY).chart,
      xyBar;

  chart.series.items=[];

  for (var t=0; t<list.length; t++) {
     xyBar = chart.addSeries(new Tee.Bar());
     xyBar.loadJSON( { value: list[t] });
  }
}

function resizeBarChart(){
	
	var w;
	var h;
	var canvas = document.getElementById("canvas_bar");
	canvas.left=0;
	w = canvas.offsetParent.offsetWidth-(canvas.offsetLeft*2);
	if (BarChartHeight==undefined)
		BarChartHeight = canvas.offsetParent.clientHeight;
	h = BarChartHeight;
	canvas.offsetLeft=0;
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";
	
	BarChart.ctx.canvas.width=w;
	BarChart.ctx.canvas.height=h;
	BarChart.bounds.width=w;
	BarChart.bounds.height=h;
	
	BarChart.draw();
}