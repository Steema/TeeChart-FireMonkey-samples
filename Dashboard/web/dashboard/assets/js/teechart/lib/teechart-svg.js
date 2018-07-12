// -------------------------------------------------------------
// TeeChart(tm) for JavaScript(tm)
// v2.3 Jan 2018
// Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
// www.steema.com
//
// JavaScript is a trademark of Oracle Corporation.
// -------------------------------------------------------------

"use strict";

function StopColor(pos,color) {
  this.pos=pos;
  this.color=color;
}

function LinearGradient(x1,y1,x2,y2) {

  this.x1=x1;
  this.x2=x2;
  this.y1=y1;
  this.y2=y2;
  this.colors=[];

  this.addColorStop=function(pos,color) {
    this.colors.push(new StopColor(pos,color));
  }

  this.svgcolors=function() {
    var l=this.colors.length, res="";
    for (var t=0; t<l; t++) {
      res+='<stop offset="'+(100*this.colors[t].pos).toFixed(0)+
           '%" style="stop-color:'+this.colors[t].color+'; stop-opacity:1" />';
    }

    return res;
  }

  function coord(x) {
    return x==0 ? "0%" : "1";
  }

  this.tosvg=function(id) {
    return '<linearGradient id="'+id+'" x1="'+coord(this.x1)+
           '" y1="'+coord(this.y1)+'" x2="'+coord(this.x2)+
           '" y2="'+coord(this.y2)+'">"'+this.svgcolors()+"</linearGradient>";
  }
}

function RadialGradient() {
  this.addColorStop=function(pos,color) {}
}

function Path(ctx) {
  this.ctx=ctx;
  this.closed=false;

  this.fill=function() {}
  this.stroke=function() {}
}

function RectPath(ctx, x,y,width,height) {
  this.ctx=ctx;
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;

  this.fill=function() {
     this.ctx.addSVG('<rect x="'+this.x.toFixed(0)+'" y="'+this.y.toFixed(0)+'"  width="'+
          this.width.toFixed(0)+'" height="'+this.height.toFixed(0)+'" fill="'+this.ctx.svgFill()+'"/>');
  }

  this.stroke=function() {
  }
}

function RoundRectPath(ctx, x,y,width,height,xr,yr) {

  this.ctx=ctx;
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;
  this.roundx=xr;
  this.roundy=yr;

  this.fillStroke=function(fill,stroke) {
     this.ctx.addSVG('  <rect x="'+this.x.toFixed(0)+'" y="'+this.y.toFixed(0)+'"  width="'+
          this.width.toFixed(0)+'" height="'+this.height.toFixed(0)+
          '" rx="'+this.roundx.toFixed(0)+'" ry="'+this.roundy.toFixed(0)+
          '" fill="'+fill+'" stroke="'+stroke+'"/>');
  }

  this.fill=function() {
    this.fillStroke(this.ctx.svgFill(),"transparent");
  }

  this.stroke=function() {
    this.fillStroke("transparent",this.ctx.svgstroke());
  }
}

function Measure(text) {
  this.width=10*text.length;
}

function Context(svg) {

  this.svg=svg;

  this.defs="<defs>";

  this.addSVG=function(text) { this.svg.svg+=text; }

  this.svgstroke=function() {
    return this.strokeStyle;
  }

  this.svgFill=function() {
    if (this.fillStyle instanceof LinearGradient)
       return this.svg.defs.urlOf(this.fillStyle);
    else
       return this.fillStyle;
  }

  this.currentPath=null;
  
  this.globalAlpha=1;

  this.shadowBlur = 0;
  this.shadowColor = "DarkGrey";
  this.shadowOffsetX = 0;
  this.shadowOffsetY = 0;
  this.strokeStyle = "black";
  this.fillStyle = "black";
  this.lineWidth = 1;
  this.lineJoin = "";
  this.lineCap = "";
  this.miterLimit= 0;
  this.textAlign="left";
  this.textBaseline="bottom";
  this.font="10px Arial";

  this.arc=function(cx,cy,radius,start,end,clockwise) {}
  this.arcTo=function() {}
  this.beginPath=function() { this.currentPath=new Path(this); }
  this.clearRect=function(x,y,width,height) { this.fillStyle="white"; this.fillRect(0,0,this.svg.width,this.svg.height); }
  this.clip=function() {}
  this.closePath=function() { this.currentPath.closed=true; }
  this.createLinearGradient=function(x1,y1,x2,y2) { return new LinearGradient(x1,y1,x2,y2); }
  this.createRadialGradient=function(x1,y1,r1,x2,y2,r2) { return new RadialGradient(x1,y1,r1,x2,y2,r2); }
  this.drawImage=function(image, x,y,width,height) {}
  this.fill=function() { this.currentPath.fill(); }
  this.fillRect=function(x,y,width,height) { (new RectPath(this,x,y,width,height)).fill(); }

  this.fontsvg=function() {
     return 'font-family="Verdana" font-size="8pt"';
  }

  this.textAnchor=function() {
    if (this.textAlign=="left")
       return "";
    else
    if (this.textAlign=="center")
       return 'text-anchor="middle"';
    else
       return 'text-anchor="end"';
  }

  this.baseline=function() {
    if (this.textBaseline=="bottom")
      return 'style="dominant-baseline:text-after-edge;"';
    else
    if (this.textBaseline=="top")
      return 'style="dominant-baseline:text-before-edge;"';
    else
      return 'style="dominant-baseline:middle;"';
  }

  this.fillText=function(text,x,y) {
    this.addSVG('<text x="'+x.toFixed(0)+'" y="'+y.toFixed(0)+'" '+this.fontsvg()+
                ' '+this.textAnchor()+' '+this.baseline()+' fill="'+this.svgFill()+'">'+
                text+'</text>');
  }

  this.measureText=function(text) { return new Measure(text); }
  this.moveTo=function(x,y) { this.x=x; this.y=y; }

  this.lineTo=function(x,y) {
    this.addSVG('<line x1="'+this.x.toFixed(0)+'" y1="'+this.y.toFixed(0)+
                '" x2="'+x.toFixed(0)+'" y2="'+y.toFixed(0)+'" fill="none"  stroke="'+this.svgstroke()+'"/>');
    this.x=x;
    this.y=y;
  }

  this.quadraticCurveTo=function(x1,y1,x2,y2) {
  }

  this.rect=function(x,y,width,height) { this.currentPath=new RectPath(this,x,y,width,height); return this.currentPath; }
  this.restore=function() {}

  this.roundRect=function(x,y,width,height,xr,yr) { this.currentPath=new RoundRectPath(this,x,y,width,height,xr,yr); return this.currentPath; }

  this.save=function() {}
  this.stroke=function() { this.currentPath.stroke(); }

  this.strokeRect=function(x,y,width,height) { (new RectPath(this,x,y,width,height)).stroke(); }
}

function SVGDef(id, def) {
  this.id=id;
  this.def=def;

  this.tosvg=function() { return def; }
}

function SVGDefs(canvas) {
  this.items=[];

  this.urlOf=function(item) {

    var i=this.items.indexOf(item);

    if (i==-1) {
      i=this.items.length;
      var id="def"+i.toFixed(0);
      this.items.push(new SVGDef(id, item.tosvg(id)));
    }

    return "url(#"+this.items[i].id+")";
  }

  this.tosvg=function() {
    var l=this.items.length;
    if (l>0) {
      var s="<defs>";
      for (var t=0; t<l; t++)
        s+=this.items[t].tosvg();
      return s+"</defs>";
    }
    else return "";
  }
}

function SVGCanvas(width,height) {

  this.defs=new SVGDefs(this);
  this.width=width;
  this.clientWidth=width;
  this.height=height;
  this.clientHeight=height;
  
//'<?xml version="1.0" standalone="no"?>\
//<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\

  this.header='<svg version="1.1" baseProfile="full"\
           xmlns="http://www.w3.org/2000/svg"\
           xmlns:xlink="http://www.w3.org/1999/xlink"\
           width="'+width.toFixed(0)+'px" height="'+height.toFixed(0)+'px">';
           
  this.svg="";

  this.getContext=function(style) {
    return new Context(this);
  }

  this.getSVG=function() {
    return this.header + this.defs.tosvg() + this.svg + "</svg>";
  }
}
