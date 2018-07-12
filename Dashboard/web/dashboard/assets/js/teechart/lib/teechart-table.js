// -------------------------------------------------------------
// TeeChart(tm) for JavaScript(tm)
// v2.3 Jan 2018
// Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
// www.steema.com
//
// JavaScript is a trademark of Oracle Corporation.
// -------------------------------------------------------------

"use strict";

var Tee = Tee || {};

function isNumeric(v) {
  return parseFloat(v)==v;
}

function cellText(cell) {
  return cell.textContent || cell.innerText; // IE
}

Tee.Chart.prototype.fromTable=function(table, style, cols, header, labels) {

  function setTitleFooter(chart,cell) {
    if (cell) {

      var tmp = cellText(cell);

      if (chart.title.text==="")
        chart.title.text=tmp;
      else
        chart.footer.text=tmp;
    }
  }

  var h, st, c, r, l, row, col, cell,
      ta=(table instanceof HTMLTableElement) ? table : document.getElementById(table);

  if (ta) {
    if (header===null) header=-1;
    if (labels===null) labels=-1;

    this.series.items=[];

    if (cols) {

      if (header>-1) {
         h=ta.rows[header];

         if (h) {
           for (c=labels+1; cell=h.cells[c]; c++) {
             this.addSeries(new style()).title= cell ? cellText(cell) : "Series "+c.toFixed(0);
           }

           if (labels>-1) setTitleFooter(this,h.cells[labels]);
         }
      }
      else
      {
         h=ta.rows[0];

         if (h) {
           for (c=labels+1; cell=h.cells[c]; c++) {
             this.addSeries(new style()).title= "Series "+c.toFixed(0);
           }
         }
      }

      for (r=header+1; row = ta.rows[r]; r++) {
         if (row) {
           for (c=labels+1; col = row.cells[c]; c++) {

               st = ( cellText(col)==="" ) ? null : parseFloat( cellText(col) );
               this.series.items[c-labels-1].data.values.push(st);
           }

           if (labels>-1) {
             l = cellText(row.cells[labels]);
             this.series.each(function(s) { s.data.labels.push(l); } );
           }
         }
      }
    }
    else
    {
      for (r=header+1; row = ta.rows[r]; r++) {
         if (row)
         for (c=labels; col = row.cells[c]; c++) {
           if (c==labels) {
             this.addSeries(new style()).title= col ? cellText(col) : "Series "+r.toFixed(0);
           }
           else {
             st = ( cellText(col) === "") ? null : parseFloat( cellText(col) );
             this.series.items[r-header-1].data.values.push(st);
           }
         }
      }

      if (header>-1) {
        row=ta.rows[header];

        for (c=labels+1; col = row.cells[c]; c++)
          this.series.each(function(s) { s.data.labels.push( cellText(col) ); });

        if (labels>-1)
          setTitleFooter(this,row.cells[labels]);
      }
    }

    this.draw();
  }
}

Tee.Table=function(table,chart) {

  var _refresh=null;

  this.header=0;
  this.firstCol=0;
  this.byCols=true;

  var ta=(table instanceof HTMLTableElement) ? table : document.getElementById(table);

  this.table=ta;

  function enableColResize() {
   if (table) {
     var row = tb.getElementsByTagName('tr')[0];
     if (row) {
         cols = row.getElementsByTagName('td');
         if(!cols || cols.length==0)
            cols = row.getElementsByTagName('th');

         if (cols) {
           for(var i=0;i<cols.length;i++)
           {
             var a=document.createElement('div');
             a.className='arrow-down';
             cols[i].appendChild(a);
           }
         }
     }
   }
  }

  function getStyle(x,styleProp)
  {
    if (x.currentStyle)
        return x.currentStyle[styleProp];
    else
    if (window.getComputedStyle)
        return document.defaultView.getComputedStyle(x,null).getPropertyValue(styleProp);
    else
        return "";
  }
  
  this.changeCell=function(cell) {
    if (!(cell instanceof HTMLTableCellElement))
       cell=this;

    var s= cellText(cell), l=Math.max(s.length,5);

    cell.onclick=null;

    var i=document.createElement('input');
    i.type="text";
    i.style.width=cell.clientWidth+"px";

    i.onchange=changeValue;
    i.onkeydown=keyDown;
    i.onblur=changeValue;
    i.value=cell.innerHTML;

    i.className='inline-editor';

    cell.innerHTML="";
    cell.appendChild(i);

    cell.firstChild.focus();
  }

  var _table=this;

  function keyDown(e) {
    var key, text=this;
    if (window.event)
       key = window.event.keyCode;
    else if (e)
       key = e.which;
    else
       return true;

    var c=text.parentNode,
        r=c.parentNode,
        tbl=r.parentNode;

    if (key==27) // escape
       changeValue(text);
    else
    if (key==13) {
       changeValue(text);
    }
    if (key==9) { // tab
      if (e && e.shiftKey) {
        if (c.cellIndex>_table.firstCol) {
          changeValue(text);
          _table.changeCell(tbl.rows[r.rowIndex].cells[c.cellIndex-1]);
        }
        else
        if (r.rowIndex>1) {
          changeValue(text);
          _table.changeCell(tbl.rows[r.rowIndex-1].cells[r.cells.length-1]);
        }
      }
      else
      {
        if (c.cellIndex<(r.cells.length-1)) {
          changeValue(text);
          _table.changeCell(tbl.rows[r.rowIndex].cells[c.cellIndex+1]);
        }
        else
        if (r.rowIndex<(tbl.rows.length-1)) {
          changeValue(text);
          _table.changeCell(tbl.rows[r.rowIndex+1].cells[1]);
        }
      }
      return false;
    }
    else
    if (key==40) { // arrow down
      if (r.rowIndex<(tbl.rows.length-1)) {
        changeValue(text);
        _table.changeCell(tbl.rows[r.rowIndex+1].cells[c.cellIndex]);
      }
    }
    else
    if (key==38) { // arrow up
      if (r.rowIndex>_table.header) {
        changeValue(text);
        _table.changeCell(tbl.rows[r.rowIndex-1].cells[c.cellIndex]);
      }
    }

    return true;
  }

  function changeValue(text) {
    if (this instanceof HTMLInputElement)
      text=this;

    if (text.onchange) {
      text.onchange=null;

      var cell=text.parentNode;

      if (cell) {
        cell.innerHTML= text.value;
        cell.onclick= _table.changeCell;

        if (_refresh) _refresh(cell);
      }

    }
  }

  this.enableRowHighlight=function(color,panel) {
    if (typeof panel=="string")
      panel = document.getElementById(panel);

    if (ta)
    for (var t=0; t<ta.rows.length; t++) {
      ta.rows[t].onmouseover=function() {
         this.style.backgroundColor=color;

         if (panel)
            panel.style.visibility='visible';
      }

      ta.rows[t].onmouseout=function() {
         this.style.backgroundColor='#FFFFFF';

         if (panel)
            panel.style.visibility='hidden';
      }
    }
  }

  function refreshCell(cell) {
  var byCols=_table.byCols,
      ser, row, index, s=cell.innerHTML;

    if (byCols) {
      row=cell.parentNode.rowIndex;
      index=cell.cellIndex;
    }
    else
    {
      row=cell.cellIndex;
      index=cell.parentNode.rowIndex;
    }

    if (row==1) {// header row
      if (index==1) { // title
        if (s!=chart.footer.text) {
          chart.footer.text=s;
          chart.draw();
        }
      }
      else {
        ser=chart.series.items[index-2];
        if (s!=ser.title) {
          ser.title=s;
          chart.draw();
        }
      }
    }
    else
    {
      row-=2;

      if (index==1) { // labels
        ser=chart.series.items[0];
        if (s!=ser.data.labels[row]) {
          chart.series.each(function(s1) {
            s1.data.labels[row]=s;
           });

          chart.draw();
        }
      }
      else {
        ser=chart.series.items[index-2];
        var n=parseFloat(s);

        if (n!=ser.data.values[row]) {
            ser.data.values[row]=n;
            chart.draw();
        }
      }
    }
  }

  this.enableEditing=function(enable, refresh) {

    _refresh=refresh || refreshCell;

    if (ta)
      for (var r=0, row; row = ta.rows[r]; r++)
       if (row)
         for (var c=0, col; col = row.cells[c]; c++)
           if (col)
             col.onclick= enable ? this.changeCell : null;
  }

  // TODO: replace cell.className 
  function dohoverCell(cell,active) {
    if (active) {
       cell.style.backgroundColor='gold';
       cell.style.color='white';
    }
    else
    {
       cell.style.backgroundColor='';
       cell.style.color='';
    }
  }

  this.pointToCell=function(series,index) {
    var s=series.chart.series.items.indexOf(series)+2;

    if (_table.byCols)
       return ta.rows[index+2].cells[s];
    else
       return ta.rows[s].cells[index+2];
  }

  this.hoverCell=function(series,index) {
    if (series.over!=-1)
       dohoverCell(_table.pointToCell(series,series.over),false);

    if (index!=-1)
       dohoverCell(_table.pointToCell(series,index),true);
  }

  function orderToIndex(i) {
    var n=-1;

    for (var t=0; t<chart.series.count(); t++) {
      if (chart.series.items[t].visible) {
        n++;
        if (n==i) return t;
      }
    }

    return -1;
  }

  this.legendHover=function(old,index) {
    var tbl=ta, bycols=_table.byCols, pos=1, c=chart;

    if (c.legend.showValues()) {
        var s=c.series.firstVisible();
        pos=2+c.series.items.indexOf(s);
        bycols=!bycols;
    }

    // non-visible series --> index old ??

    if (bycols) {
       if (old!=-1)
         dohoverCell(ta.rows[pos].cells[orderToIndex(old)+2],false);
       if (index!=-1)
         dohoverCell(ta.rows[pos].cells[orderToIndex(index)+2],true);
    }
    else
    {
       if (old!=-1)
         dohoverCell(ta.rows[old+2].cells[pos],false);
       if (index!=-1)
         dohoverCell(ta.rows[index+2].cells[pos],true);
    }
  }

}

function parseText(data,text) {
  data.values=[];
  data.labels=[];

  var v=text.split("\n"), len=v.length;

  if (len>0) {
    for(var t=0; t<len; t++) {
      var s=v[t], fields=s.split(","), anyNumber=false;

      for(var f=0; f<fields.length; f++)
      {
        s=parseFloat(fields[f]);
        if (s && (!isNaN(s))) {
           anyNumber=true;
           break;
        }
      }

      if (anyNumber) {
        if (fields.length==1) {
          s=parseFloat(s);
          if (isNaN(s)) s=0;
        }
        else
        if (fields.length==2) {
          s=parseFloat(fields[0]);
          if (isNaN(s)) s=0;
          data.labels[t]=fields[1];
        }
        else
        if (fields.length==3) {
          s=parseFloat(fields[1]);
          if (isNaN(s)) s=0;

          data.labels[t]=fields[2];
        }

        data.values[t]=s;
      }
      else
        data.values[t]=0;

    }
  }
}

function loadXML(xml)
{
  if (window.DOMParser)
    return new DOMParser().parseFromString(xml,"text/xml");
  else // Internet Explorer
  {
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async=false;
    xmlDoc.loadXML(xml);
    return xmlDoc;
  }
}

Tee.Series.prototype.loadXML=function(xml) {
  this.data.xml=xml;
  this.refresh();
}

function parseXML(series,xml,seriesTag,pointTag) {
  var data=series.data;
  data.values=[];
  data.labels=[];

  seriesTag=seriesTag || "series";

  var doc=loadXML(xml.value), n;

  var s = doc.getElementsByTagName(seriesTag)[0];
  if (s) {
    n= s.getAttribute("color");
    if (n) series.color=n;

    n= s.getAttribute("name");
    if (n) series.title=n;

    n= s.getAttribute("metric");
    if (n) data.title=n;

    pointTag=pointTag || "point";

    var points= s.getElementsByTagName(pointTag);
    if (points) {
      for (var t = 0; t < points.length; t++) {
        n = points[t].getAttribute("name");
        if (n) data.labels.push(n);

        n = points[t].getAttribute("value");
        data.values.push(parseFloat(n));

        n = points[t].getAttribute("x");
        if (n)
           data.x.push(parseFloat(n));
      }
    }
  }
}

Tee.Series.prototype.loadJSON=function(json) {
  this.data.json=json;
  this.refresh();
}

function parseJSON(series,json,seriesTag,pointTag) {
  var data=series.data, tmp;
  data.values=[];
  data.labels=[];

  seriesTag=seriesTag || "series";

  var o=(typeof json.value === "string" ) ? JSON.parse(json.value) : json.value;
  
  if (o.chart != null)
	  o = o.chart[0];

  if (o.series) {
    if (o.series.name!="") series.title=o.series.name;
    if (o.series.color!="") series.format.fill=o.series.color;

    if (o.series.metric!="")
    {
      data.title=o.series.metric;

	  if (series.mandatoryAxis != null)
	  {
        tmp=series.mandatoryAxis.title;
        if (tmp.text=="") tmp.text=data.title;
	  }
    }

    if (o.series.category!="")
    {
	  if (series.notmandatory != null)
	  {
        tmp=series.notmandatory.title;
        if (tmp.text=="") tmp.text=o.series.category;
	  }
    }

    var p=o.series.point, pp;

    if (p) {
      for(var t=0; t<p.length; t++) {

        pp=p[t];

        data.values.push(pp.value);

        if (pp.name !== undefined)
           data.labels[t]=pp.name;

        if (pp.x !== undefined) {
          if (!data.x) data.x=[];
          data.x[t]=pp.x;
        }

        if (pp.color && (pp.color!=='')) {
          if (!series.palette.colors) series.palette.colors=[];
          series.palette.colors[t]=pp.color;
        }
      }
    }
  }
}

