// -------------------------------------------------------------
// TeeChart(tm) for JavaScript(tm)
// v2.3 Jan 2018
// Copyright(c) 2012-2017 by Steema Software SL. All Rights Reserved.
// www.steema.com
//
// JavaScript is a trademark of Oracle Corporation.
// -------------------------------------------------------------

"use strict";

function LinearGradient() {
  this.addColorStop=function(pos,color) {}
}

function RadialGradient() {
  this.addColorStop=function(pos,color) {}
}

function Path() {
  this.fill=function() {}
  this.stroke=function() {}
}

function Measure() {
  this.width=0;
}

function Context() {

  this.globalAlpha=1;
  
  this.shadowBlur = 0;
  this.shadowColor = "DarkGrey";
  this.shadowOffsetX = 0;
  this.shadowOffsetY = 0;
  this.strokeStyle = "black";
  this.fill = "black";
  this.lineWidth = 1;
  this.lineJoin = "";
  this.lineCap = "";
  this.miterLimit= 0;
  this.textAlign="left";
  this.textBaseline="bottom";
  this.font="10px Arial";

  this.arc=function(cx,cy,radius,start,end,clockwise) {}
  this.arcTo=function() {}
  this.beginPath=function() {}
  this.clearRect=function(x,y,width,height) {}
  this.clip=function() {}
  this.closePath=function() {}
  this.createLinearGradient=function(x1,y1,x2,y2) { return new LinearGradient(); }
  this.createRadialGradient=function(x1,y1,r1,x2,y2,r2) { return new RadialGradient(); }
  this.drawImage=function(image, x,y,width,height) {}
  this.fillRect=function(x,y,width,height) { return new Path(); }
  this.fillText=function(text,x,y) { }
  this.measureText=function(text) { return new Measure(); }
  this.moveTo=function(x,y) {}
  this.lineTo=function(x,y) {}
  this.quadraticCurveTo=function(x1,y1,x2,y2) {}
  this.rect=function(x,y,width,height) { }
  this.restore=function() {}
  this.roundRect=function(x,y,width,height,xr,yr) { return new Path(); }
  this.save=function() {}
  this.stroke=function() {}
  this.strokeRect=function(x,y,width,height) {}
}

function CustomCanvas(width,height) {
  this.getContext=function(style) {
    return new Context();
  }
}
