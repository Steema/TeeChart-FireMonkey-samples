/**
 * @preserve TeeChart(tm) for JavaScript(tm)
 * @fileOverview TeeChart for JavaScript(tm)
 * v2.3 Jan 2018
 * Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
 * http://www.steema.com
 *
 * Licensed with commercial and non-commercial attributes,
 * specifically: http://www.steema.com/licensing/html5
 *
 * JavaScript is a trademark of Oracle Corporation.
 */

/**
 * @author <a href="mailto:david@steema.com">Steema Software</a>
 * @version 1.9
 */

"use strict";

function FormatEditor(parent,format,id,showFont) {

  var s='<div id="'+id+'" width="130">\
  <ul>\
    <li><a href="#ftabs-1">Fill</a></li>\
    <li><a href="#ftabs-2">Stroke</a></li>';

  if (showFont)
    s+='<li><a href="#ftabs-3">Font</a></li>';

  s+='<li><a href="#ftabs-4">Gradient</a></li>\
      <li><a href="#ftabs-5">Shadow</a></li>\
      <li><a href="#ftabs-6">Image</a></li>\
  </ul>\
  <div id="ftabs-1">\
        Fill:\
        <input type="text" size="16" id="'+id+'ffill">\
          <div id="color_box">\
            <div id="'+id+'color_display" style="position: relative; left: 5px; width: 15px; height: 15px; cursor: pointer; border: 2px solid #000;">\
            </div>\
            <div id="'+id+'color_picker" style="display:none"></div>\
          </div>\
        </BR>\
        Transparency %:\
        <div id="ftransp" style="width=150px;"></div>\
  </div>\
  <div id="ftabs-2">\
        Stroke:\
        <input type="text" size="16" id="'+id+'fstroke">\
        <div id="'+id+'fstrokesize"></div>';

  if (showFont)
    s+='Horiz Round:</br><div id="'+id+'fstrokeroundx"></div>\
        Vert Round:</br><div id="'+id+'fstrokeroundy"></div>';

    s+='Join:\
        <select id="'+id+'fstroke_join">\
          <option value="round">Round</option>\
          <option value="miter">Miter</option>\
          <option value="bevel">Bevel</option>\
        </select>\
        Cap:\
        <select id="'+id+'fstroke_cap">\
          <option value="round">Round</option>\
          <option value="butt">Butt</option>\
          <option value="square">Square</option>\
        </select>\
  </div>';

  if (showFont)
    s+='<div id="ftabs-3" style="display:'+showFont+'">\
        <input type="text" size="46" id="'+id+'ffontstyle">\
        <div id="'+id+'ffontsize"></div>\
        <div id="'+id+'ffontformat"></div>\
        </div>';

  s+='<div id="ftabs-4">\
        <input type="checkbox" id="'+id+'fgradient" checked>Visible\
        Direction:</br>\
        <select id="'+id+'fgradient_direction">\
          <option value="topbottom">Top Bottom</option>\
          <option value="leftright">Left Right</option>\
          <option value="bottomtop" selected>Bottom Top</option>\
          <option value="rightleft">Right Left</option>\
          <option value="radial">Radial</option>\
          <option value="diagonalup">Diagonal Up</option>\
          <option value="diagonaldown">Diagonal Down</option>\
        </select>\
        Balance:\
        <div id="'+id+'fgradient_balance" style="width=150px;"></div>\
  </div>\
  <div id="ftabs-5">\
        <input type="checkbox" id="'+id+'fshadow">Visible</br>\
        Color:\
        <input type="text" size="16" id="'+id+'fshadowcolor">\
        <span>Width:</span>&nbsp;&nbsp;<div id="'+id+'fshadow_width" style="width=150px;"></div>\
        <span>Height:</span>&nbsp;&nbsp;<div id="'+id+'fshadow_height" style="width=150px;"></div>\
        <span>Blur:</span>&nbsp;&nbsp;<div id="'+id+'fshadow_blur" style="width=150px;"></div>\
  </div>\
  <div id="ftabs-6">\
  </div>\
  </div>';

  parent.innerHTML=s;

  if (showFont)
    new FormatEditor(document.getElementById(id+"ffontformat"), format.font, id+"fontformat", false);

  id="#"+id;

  $( id ).tabs();

  $( id+"ffill" ).val(format.fill).keyup(function() { format.fill= this.value; format.chart.draw(); });
  $( id+"fstroke" ).val(format.stroke.fill).keyup(function() { format.stroke.fill= this.value; format.chart.draw(); });
  $( id+"fstrokesize" ).slider( {
      value: format.stroke.size,
      slide: function( event, ui ) {
         format.stroke.size=ui.value;
         format.chart.draw();
      }
    });

  if (showFont) {
    $( id+"fstrokeroundx" ).slider( {
        value: format.round.x,
        slide: function( event, ui ) {
           format.round.x=ui.value;
           format.chart.draw();
        }
      });
    $( id+"fstrokeroundy" ).slider( {
        value: format.round.y,
        slide: function( event, ui ) {
           format.round.y=ui.value;
           format.chart.draw();
        }
      });
  }

  $( id+"fstroke_join").val(format.stroke.join).change(function() { format.stroke.join= this.value; format.chart.draw(); });
  $( id+"fstroke_cap").val(format.stroke.cap).change(function() { format.stroke.cap= this.value; format.chart.draw(); });

  $( id+"fgradient").attr("checked",format.gradient.visible).click(function() { format.gradient.visible= this.checked; format.chart.draw(); });
  $( id+"fgradient_direction").val(format.gradient.direction).change(function() { format.gradient.direction= this.value; format.chart.draw(); });

  $( id+"fshadow").attr("checked",format.shadow.visible).click(function() { format.shadow.visible= this.checked; format.chart.draw(); });
  $( id+"fshadowcolor" ).val(format.shadow.color).keyup(function() { format.shadow.color= this.value; format.chart.draw(); });
  $( id+"fshadow_width" ).slider( {
      value: format.shadow.width,
      min: -100,
      slide: function( event, ui ) {
         format.shadow.width=ui.value;
         format.chart.draw();
      }
  });
  $( id+"fshadow_height" ).slider( {
      value: format.shadow.height,
      min: -100,
      slide: function( event, ui ) {
         format.shadow.height=ui.value;
         format.chart.draw();
      }
  });
  $( id+"fshadow_blur" ).slider( {
      value: format.shadow.blur,
      max: 32,
      slide: function( event, ui ) {
         format.shadow.blur=ui.value;
         format.chart.draw();
      }
  });
  $( id+"ftransp" ).slider( {
      value: format.transparency,
      slide: function( event, ui ) {
         format.transparency=ui.value;
         format.chart.draw();
      }
  });
  $( id+"fgradient_balance" ).slider( {
      value: format.gradient.balance,
      slide: function( event, ui ) {
         format.gradient.balance=ui.value*0.01;
         format.chart.draw();
      }
  });

  if (showFont) {
    $( id+"ffontstyle" ).val(format.font.style).keyup(function() { format.font.style= this.value; format.chart.draw(); });
    $( id+"ffontsize" ).slider( {
      value: format.font.getSize(),
      slide: function( event, ui ) {
         format.font.setSize(ui.value);
         format.chart.draw();
      }
    });

  }

  function colorChosen(color) {
    $(id+"color_display").css('background', color);
    format.fill=color;
    format.chart.draw();
  };

  $(id+'color_picker').farbtastic({ callback: colorChosen, width: 150});

  $(id+'color_picker').dialog({
        autoOpen: false,
        modal: false
        });
        
  $(id+'color_display').click( function(e) {
    $(id+"color_picker").dialog("open"); //slideToggle('fast');
  });

}

function AxisEditor(parent,axis,id) {

  var s='<div id="'+id+'" width="130">\
  <ul>\
    <li><a href="#atabs-1">Axis</a></li>\
    <li><a href="#atabs-2">Labels</a></li>\
    <li><a href="#atabs-3">Grid</a></li>\
    <li><a href="#atabs-4">Ticks</a></li>\
  </ul>\
  <div id="atabs-1">\
    <input type="checkbox" id="'+id+'_visible">Visible\
    <input type="checkbox" id="'+id+'_inverted">Inverted\
    <input type="checkbox" id="'+id+'_auto">Automatic\
  </div>\
  <div id="atabs-2">\
    <input type="checkbox" id="'+id+'labels_visible">Visible\
    <div id="'+id+'labels-format"></div>\
  </div>\
  <div id="atabs-3">\
    <input type="checkbox" id="'+id+'grid_visible">Visible\
    <div id="'+id+'grid-format"></div>\
  </div>\
  <div id="atabs-4">\
    <input type="checkbox" id="'+id+'ticks_visible">Visible\
        Color:\
        <input type="text" size="16" id="'+id+'ticksstroke">\
        <div id="'+id+'tickslength"></div>\
        <div id="'+id+'tickssize"></div>\
        Join:\
        <select id="'+id+'ticks_join">\
          <option value="round">Round</option>\
          <option value="miter">Miter</option>\
          <option value="bevel">Bevel</option>\
        </select>\
        Cap:\
        <select id="'+id+'ticks_cap">\
          <option value="round">Round</option>\
          <option value="butt">Butt</option>\
          <option value="square">Square</option>\
        </select>\
  </div>\
  </div>';

  parent.innerHTML=s;

  new FormatEditor(document.getElementById(id+"labels-format"), axis.labels.format, id+"labelsformat", true);
  new FormatEditor(document.getElementById(id+"grid-format"), axis.grid.format, id+"gridformat", false);

  id="#"+id;

  $( id ).tabs();
  $( id+"_visible").attr("checked",axis.visible).click(function() { axis.visible= this.checked; axis.chart.draw(); });
  $( id+"_inverted").attr("checked",axis.inverted).click(function() { axis.inverted= this.checked; axis.chart.draw(); });
  $( id+"_auto").attr("checked",axis.automatic).click(function() { axis.automatic= this.checked; axis.chart.draw(); });
  $( id+"labels_visible").attr("checked",axis.labels.visible).click(function() { axis.labels.visible= this.checked; axis.chart.draw(); });
  $( id+"grid_visible").attr("checked",axis.grid.visible).click(function() { axis.grid.visible= this.checked; axis.chart.draw(); });
  $( id+"ticks_visible").attr("checked",axis.ticks.visible).click(function() { axis.ticks.visible= this.checked; axis.chart.draw(); });

  $( id+"ticks_join").val(axis.ticks.stroke.join).change(function() { axis.ticks.stroke.join= this.value; axis.chart.draw(); });
  $( id+"ticks_cap").val(axis.ticks.stroke.cap).change(function() { axis.ticks.stroke.cap= this.value; axis.chart.draw(); });
  $( id+"ticksstroke" ).val(axis.ticks.stroke.fill).keyup(function() { axis.ticks.stroke.fill= this.value; axis.chart.draw(); });
  $( id+"tickslength" ).slider( {
      value: axis.ticks.length,
      slide: function( event, ui ) {
         axis.ticks.length=ui.value;
         axis.chart.draw();
      }
  });
  $( id+"tickssize" ).slider( {
      value: axis.ticks.stroke.size,
      slide: function( event, ui ) {
         axis.ticks.stroke.size=ui.value;
         axis.chart.draw();
      }
  });
}

function ChartEditor(parent,chart) {

  if (!(parent instanceof HTMLElement))
     parent=document.getElementById(parent);

  this.chart=chart;

  function seriesItems() {
    var s="'";
    var len=chart.series.items.length;
    for (var t=0; t<len; t++)
      s=s+"<option "+ (t==0 ? "selected" : "") +">"+chart.series.items[t].title+"</option>";
    return s+"'";
  }

  parent.innerHTML='<div id="tabs" width="130">\
  <ul>\
    <li><a href="#tabs-1">Series</a></li>\
    <li><a href="#tabs-2">Axes</a></li>\
    <li><a href="#tabs-3">Panel</a></li>\
    <li><a href="#tabs-4">Walls</a></li>\
    <li><a href="#tabs-5">Legend</a></li>\
    <li><a href="#tabs-6">Aspect</a></li>\
    <li><a href="#tabs-7">Titles</a></li>\
    <li><a href="#tabs-8">Touch</a></li>\
  </ul>\
  <div id="tabs-1">\
        <div style="float:left; width:20%;">\
        <select size="5" style="width:100px; height:20%">'+seriesItems()+'</select>\
        </div>\
        <div id="seriestabs" style="float:right; width:70%;">\
          <ul>\
            <li><a href="#series-formattab">Format</a></li>\
            <li><a href="#series-marks">Marks</a></li>\
            <li><a href="#series-general">General</a></li>\
          </ul>\
          <div id="series-formattab">\
            <input type="checkbox" id="series_visible">Visible\
            Color Each:\
            <select id="series_coloreach">\
              <option value="auto">Automatic</option>\
              <option value="yes">Yes</option>\
              <option value="no">No</option>\
            </select>\
            </br>Transparency %:\
            <div id="series_transp" style="width=150px;"></div></br>\
            <div id="series-format"></div>\
          </div>\
          <div id="series-marks">\
            <input type="checkbox" id="series_marks">Marks\
            <div id="series-marks-format"></div>\
          </div>\
          <div id="series-general">\
            Mouse Cursor:</br>\
            <select id="series_cursor" onchange="chart.series.items[0].cursor= document.getElementById(\'series_cursor\').value;">\
              <option value="default">Default</option>\
              <option value="pointer">Pointer</option>\
              <option value="crosshair">Crosshair</option>\
            </select>\
            </br>\
          </div>\
        </div>\
  </div>\
  <div id="tabs-2">\
        <input type="checkbox" id="axes_visible">Visible\
        </BR>\
        <div id="axistabs" width="130">\
          <ul>\
            <li><a href="#axis-left">Left</a></li>\
            <li><a href="#axis-bottom">Bottom</a></li>\
            <li><a href="#axis-right">Right</a></li>\
            <li><a href="#axis-top">Top</a></li>\
          </ul>\
          <div id="axis-left"></div>\
          <div id="axis-bottom"></div>\
          <div id="axis-right"></div>\
          <div id="axis-top"></div>\
        </div>\
  </div>\
  <div id="tabs-3">\
        <div id="panel-format"></div>\
        <input type="checkbox" id="panel_transp">Transparent\
        </br>\
        Bottom margin %:\
        <div id="margin_bottom" style="width:50px; float: left;"></div>\
        Left margin %:\
        <div id="margin_left" style="width:50px; float: left;"></div>\
        \
  </div>\
  <div id="tabs-4">\
        <input type="checkbox" id="walls_visible">Visible</BR>\
        <div id="backwall-format"></div>\
    \
  </div>\
  <div id="tabs-5">\
        <div style="float:left; width:20%;">\
          <input type="checkbox" id="legend_visible">Visible\
          <input type="checkbox" id="legend_inverted">Inverted</BR>\
          Legend style:</br>\
          <select id="legend_style">\
            <option value="auto">Auto</option>\
            <option value="series">Series</option>\
            <option value="values">Values</option>\
          </select>\
          </br>\
          Text style:</br>\
          <select id="legend_textstyle">\
            <option value="auto" selected>Auto</option>\
            <option value="valuelabel">Value and Label</option>\
            <option value="label">Label</option>\
            <option value="value">Value</option>\
            <option value="index">Index</option>\
            <option value="labelvalue">Label and Value</option>\
            <option value="percent">Percent</option>\
            <option value="percentlabel">Percent and Label</option>\
          </select>\
          </br>\
          Position:</br>\
          <select id="legend_position">\
            <option value="right">Right</option>\
            <option value="left">Left</option>\
            <option value="top">Top</option>\
            <option value="bottom">Bottom</option>\
          </select>\
          </br>\
          Padding:</br>\
          <div id="legend_padding"></div>\
          </br>\
          Vertical:</br>\
          <div id="legend_vertical"></div>\
          <input type="checkbox" id="legend_symbols">Symbols\
        </div>\
        <div id="legend-format" style="float:right;">\
        </div>\
  </div>\
  <div id="tabs-6">\
        <input type="checkbox" id="clip">Clip\
  </div>\
  <div id="tabs-7">\
        Title:\
        <input type="text" size="46" id="title_text">\
        <input type="checkbox" id="title_transp" checked>Transparent\
        <div id="title-format"></div>\
        </br>\
        Footer:\
        <input type="text" size="46" id="footer_text">\
        <input type="checkbox" id="footer_transp" checked>Transparent\
        <div id="footer-format"></div>\
  </div>\
  <div id="tabs-8">\
  </div>\
</div>';

  $( "#tabs" ).tabs();
  $( "#axistabs" ).tabs();
  $( "#seriestabs" ).tabs();

  var s=chart.series.items[0];

  $("#series_visible").attr("checked",s.visible).click(function() { s.visible= this.checked; s.chart.draw(); });
  $("#series_coloreach").val(s.colorEach).change(function() { s.colorEach= this.value; s.chart.draw(); });
  $("#series_marks").attr("checked",s.marks.visible).click(function() { s.marks.visible= this.checked; s.chart.draw(); });
  new FormatEditor(document.getElementById("series-format"), s.format, "seriesformat", false);
  new FormatEditor(document.getElementById("series-marks-format"), s.marks.format, "seriesmarksformat", true);

  $("#title_text").val(chart.title.text).keyup(function() { chart.title.text=this.value; chart.draw(); });
  $("#footer_text").val(chart.footer.text).keyup(function() { chart.footer.text=this.value; chart.draw(); });

  $("#title_transp").attr("checked",chart.title.transparent).click(function() { chart.title.transparent= this.checked; chart.draw(); });
  $("#footer_transp").attr("checked",chart.footer.transparent).click(function() { chart.footer.transparent= this.checked; chart.draw(); });

  $("#clip").attr("checked",chart.aspect.clip).click(function() { chart.aspect.clip= this.checked; chart.draw(); });

  $("#axes_visible").attr("checked",chart.axes.visible).click(function() { chart.axes.visible= this.checked; chart.draw(); });

  new AxisEditor(document.getElementById("axis-left"), chart.axes.left, "aleft");
  new AxisEditor(document.getElementById("axis-bottom"), chart.axes.bottom, "abottom");
  new AxisEditor(document.getElementById("axis-right"), chart.axes.right, "aright");
  new AxisEditor(document.getElementById("axis-top"), chart.axes.top, "atop");

  $("#panel_transp").attr("checked",chart.panel.transparent).click(function() { chart.panel.transparent= this.checked; chart.draw(); });
  $("#walls_visible").attr("checked",chart.walls.visible).click(function() { chart.walls.visible= this.checked; chart.draw(); });

  new FormatEditor(document.getElementById("panel-format"), chart.panel.format, "panelformat", false);
  new FormatEditor(document.getElementById("backwall-format"), chart.walls.back.format, "backwallformat", false);
  new FormatEditor(document.getElementById("title-format"), chart.title.format, "titleformat", true);
  new FormatEditor(document.getElementById("footer-format"), chart.footer.format, "footerformat", true);
  new FormatEditor(document.getElementById("legend-format"), chart.legend.format, "legendformat", true);

  $("#legend_visible").attr("checked",chart.legend.visible).click(function() { chart.legend.visible= this.checked; chart.draw(); });
  $("#legend_inverted").attr("checked",chart.legend.inverted).click(function() { chart.legend.inverted= this.checked; chart.draw(); });
  $("#legend_symbols").attr("checked",chart.legend.symbol.visible).click(function() { chart.legend.symbol.visible= this.checked; chart.draw(); });
  $("#legend_style").val(chart.legend.legendStyle).change(function() { chart.legend.legendStyle= this.value; chart.draw(); });
  $("#legend_textstyle").val(chart.legend.legendTextStyle).change(function() { chart.legend.legendTextStyle= this.value; chart.draw(); });
  $("#legend_position").val(chart.legend.position).change(function() { chart.legend.position= this.value; chart.draw(); });

  $("#legend_padding").slider( {
      value: chart.legend.padding,
      slide: function( event, ui ) {
         chart.legend.padding=ui.value;
         chart.draw();
      }
    });

  $("#legend_vertical").slider( {
      value: chart.legend.vertical,
      slide: function( event, ui ) {
         chart.legend.vertical=ui.value;
         chart.draw();
      }
    });

  $( "#series_transp" ).slider( {
      value: chart.series.items[0].format.transparency,
      slide: function( event, ui ) {
         chart.series.items[0].format.transparency=ui.value;
         chart.draw();
      }
  });

  $( "#margin_bottom" ).slider( {
      value: chart.panel.margins.bottom,
      slide: function( event, ui ) {
         chart.panel.margins.bottom=ui.value;
         chart.draw();
      }
  });
  $( "#margin_left" ).slider( {
      value: chart.panel.margins.left,
      slide: function( event, ui ) {
         chart.panel.margins.left=ui.value;
         chart.draw();
      }
  });

  /*
  $( "#panel-format" ).dialog({
        autoOpen: false,
        height: 200,
        width: 250,
        modal: false
        });
  $( "#panel_format" )
   .button()
   .click(function() {
   $( "#formateditor" ).dialog( "open" );
  });
  */
}

