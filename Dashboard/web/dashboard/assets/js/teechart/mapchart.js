var MapChart;
var map;

window.addEventListener('resize', resizeMapChart); 

var MapChartHeight;
var WorldMap;

function drawMap() {
  // Create chart:
  MapChart=new Tee.Chart("canvas_map");

  MapChart.legend.visible=false;
  MapChart.axes.visible=false;
  MapChart.panel.margins.left = 0;
  MapChart.title.visible=false;
  
  var map = loadMapData(MapChart);
  
  map.format.stroke.fill="black";
  map.title = "World";
	 
  MapChart.applyTheme("minimal");
  applyPalette(MapChart);
  
  map.applyPalette();
  MapChart.tools.add(new Tee.ToolTip(MapChart));
  
  resizeMapChart();
}

function loadMapData(chart) {
  var jsonXY = document.getElementById("map_json").value,
      list = JSON.parse(jsonXY).chart,
      xyMap;

  for (var t=0; t<list.length; t++) {
     xyMap = chart.addSeries(new Tee.Map());
	 xyMap.setMap(new Tee.WorldMap());
	 
	 //non standard data import for svg map series
     for (var i=0; i<list[0].series.point.length; i++) {
		xyMap.svg.values[list[0].series.point[i].id] = list[0].series.point[i].value;
	 }
  }
  
  return xyMap;
}

function resizeMapChart(){
	
	var w;
	var h;
	var canvas = document.getElementById("canvas_map");
	canvas.left=0;
	w = canvas.offsetParent.offsetWidth-(canvas.offsetLeft*2);
	if (MapChartHeight==undefined)
		MapChartHeight = canvas.offsetParent.clientHeight * 0.95;
	h = MapChartHeight;
	canvas.offsetLeft=0;
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";
	
	MapChart.canvas.width=w;
	MapChart.canvas.height=h;
	MapChart.bounds.width=w;
	MapChart.bounds.height=h;
	
	MapChart.draw();

}