var DonutChart;

window.addEventListener('resize', resizeDonutChart); 

var DonutChartHeight;

function drawDonut() {
  // Create chart:
  DonutChart=new Tee.Chart("canvas_donut");
  
  var donut1 = new Tee.Donut();
  
  //var donut1 = new Tee.Donut([15,17,12,19,30,41]);
  //donut1.data.labels =  [ "jan","feb","mar","apr","may","jun" ];
  //donut1.explode = [4,4,3,5,8,0];
				  
  DonutChart.addSeries(donut1);
  
  donut1.loadJSON(document.getElementById("donut_json"));
  
  donut1.explode = [4,4,3];
  
  DonutChart.legend.visible=false;
  DonutChart.series.items[0].format.stroke.size=0.5;
  DonutChart.series.items[0].format.gradient.visible = false;
  
  DonutChart.series.items[0].marks.visible=true;
  DonutChart.series.items[0].marks.transparent=true;
  
  DonutChart.title.visible=false;

  DonutChart.series.items[0].title="Red";

  var m=DonutChart.series.items[0].marks;
  m.transparent=true;
  m.style = "labels";
  m.format.font.style="12px Tahoma";


  DonutChart.applyTheme("minimal");

  applyPalette(DonutChart);
  
//animation
  animation=new Tee.SeriesAnimation();
  animation.duration=900;
  animation.kind="all";
  fadeAnimation=new Tee.FadeAnimation();
  fadeAnimation.duration=500;
  fadeAnimation.fade.series=true;
  fadeAnimation.fade.marks=true;
  animation.mode = "linear"; 
  fadeAnimation.mode = "linear";
  animation.items.push(fadeAnimation);
  
  animation.animate(DonutChart);  
  
  resizeDonutChart();
}

function setMarksUnder(value) {
  var m=Chart1.series.items[0].marks;
  m.transparent=value;
  m.arrow.underline=value;
  changeTheme(Chart1, "minimal");
  Chart1.draw();
}

function resizeDonutChart(){
	
	var w;
	var h;
	var canvas = document.getElementById("canvas_donut");
	w = canvas.offsetParent.offsetWidth-(canvas.offsetLeft*2);
	if (DonutChartHeight==undefined)
		DonutChartHeight = canvas.offsetParent.clientHeight;
	h = DonutChartHeight;
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";
	
	DonutChart.ctx.canvas.width=w;
	DonutChart.ctx.canvas.height=h;
	DonutChart.bounds.width=w;
	DonutChart.bounds.height=h;
	
	DonutChart.draw();
}