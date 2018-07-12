/**
 * @preserve TeeChart(tm) for JavaScript(tm)
 * @fileOverview TeeChart for JavaScript(tm)
 * v2.4 Feb 2018
 * Copyright(c) 2012-2018 by Steema Software SL. All Rights Reserved.
 * http://www.steema.com
 *
 * Licensed with commercial and non-commercial attributes,
 * specifically: http://www.steema.com/licensing/html5
 *
 * JavaScript is a trademark of Oracle Corporation.
 */

/**
 * @author <a href="mailto:david@steema.com">Steema Software</a>
 * @version 2.4
 */

/**
 * @namespace TeeChart namespace, contains all classes and methods.
 */
var Tee=Tee || {};

/*global exports, window, requestAnimFrame, Image, clearTimeout, HTMLTextAreaElement,
clearInterval, parseText, document, parseXML, parseJSON, navigator, setInterval,
HTMLInputElement, HTMLCanvasElement */

(function() {
 "use strict";

if (typeof exports !== 'undefined') exports.Tee=Tee;

if (typeof window !== 'undefined') {
  window.requestAnimFrame = (function( /*callback*/ ){
      return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback){
          window.setTimeout(callback, 1000 / 60, new Date().getTime());
      };
  })();
}

// IE8 does not support defineProperty, so just in case:
var obDefP;
try {
  Object.defineProperty({}, 'x', {});
  obDefP=Object.defineProperty;
}
catch(e) {}

// For "IE < 9" :
// http://stackoverflow.com/questions/2790001/fixing-javascript-array-functions-in-internet-explorer-indexof-foreach-etc
// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}

/**
 * @memberOf Tee
 * @public
 * @constructor
 * @class Represents an X,Y point.
 * @param {Number} x Horizontal point position.
 * @param {Number} y Vertical point position.
 * @property {Number} x The horizontal coordinate.
 * @property {Number} y The vertical coordinate.
 */
Tee.Point = function(x,y) {
  this.x=x;
  this.y=y;
}

function Point(x,y) {
   return new Tee.Point(x, y);
}

function pointInLine(p,p1,p2,tolerance) {

  function distance() {
    var dx, dy;

    if ((p2.x==p1.x) && (p2.y==p1.y)) {
      dx=p.x-p1.x;
      dy=p.y-p1.y;
    }
    else
    {
      dx=p2.x-p1.x;
      dy=p2.y-p1.y;

      var result = ((p.x-p1.x)*dx+(p.y-p1.y)*dy)/(dx*dx+dy*dy);

      if (result<0) {
        dx=p.x-p1.x;
        dy=p.y-p1.y;
      }
      else
      if (result>1) {
        dx=p.x-p2.x;
        dy=p.y-p2.y;
      }
      else
      {
        dx=p.x-(p1.x+result*dx);
        dy=p.y-(p1.y+result*dy);
      }

    }

    return Math.sqrt(dx*dx+dy*dy);
  }

  if (((p.x==p1.x) && (p.y==p1.y)) || ((p.x==p2.x) && (p.y==p2.y)))
     return true;
  else
     return Math.abs(distance())<=(tolerance+1);
}

/**
 * @memberOf Tee
 * @public
 * @constructor
 * @class Represents a rectangle with origin xy position, width and height
 * @param {Number} x The position of left side of rectangle.
 * @param {Number} y The position of top side of rectangle.
 * @param {Number} width Amount of rectangle width.
 * @param {Number} height Amount of rectangle height.
 * @property {Number} x The position of left side of rectangle.
 * @property {Number} y The position of top side of rectangle.
 * @property {Number} width Amount of rectangle width.
 * @property {Number} height Amount of rectangle height.
 */
Tee.Rectangle = function(x,y,width,height)
{
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;  
    
/**
 * Sets Rectangle properties.
 * @memberOf Tee.Rectangle
 * @param {Number} x The position of left side of rectangle.
 * @param {Number} y The position of top side of rectangle.
 * @param {Number} width Amount of rectangle width.
 * @param {Number} height Amount of rectangle height.
 */
  this.set = function(x,y,width,height)
  {
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height; 
  }
  
/**
 * Sets Rectangle properties from rectangle r parameter.
 * @public
 * @memberOf Tee.Rectangle
 * @param {Tee.Rectangle} r The Rectangle instance to copy values from.
 */
  this.setFrom = function(r)
  {
    this.x=r.x;
    this.y=r.y;
    this.width=r.width;
    this.height=r.height;
  }
  
/**
 * @returns {Number} Returns the position in pixels of the right side of the
 * rectangle.
 */
  this.getRight = function()
  {
    return this.x+this.width;
  }
  
/**
 * @returns {Number} Returns the position in pixels of the bottom side of the
 * rectangle.
 */
  this.getBottom = function()
  {
    return this.y+this.height; 
  }
  
/**
 * @param {Number} value Defines the position of top side of rectangle.
 */
  this.setTop = function(value)
  {
    this.height -= (value-this.y);
    this.y=value;  
  }
  
/**
 * @param {Number} value Defines the position of bottom side of rectangle.
 */
  this.setBottom=function(value) 
  {
    this.height = value - this.y;
  };
  
/**
 * @param {Number} value Defines the position of left side of rectangle.
 */
  this.setLeft=function(value) 
  {
    this.width -= (value-this.x);
    this.x=value;
  };
  
/**
 * @param {Number} value Defines the position of right side of rectangle.
 */
  this.setRight=function(value) 
  {
    this.width = value - this.x;
  };
  
 /**
 * @returns {Boolean} Returns if {@link Tee.Point} p is inside the rectangle.
 * @param {Tee.Point} p XY position to test.
 */
  this.contains=function(p) 
  {
    return (p.x>=this.x) && (p.x<=(this.x+this.width)) &&
         (p.y>=this.y) && (p.y<=(this.y+this.height));
  };
  
/**
 *
 * @param {Number} x Horizontal pixels.
 * @param {Number} y Vertical pixels.
 */
  this.offset=function(x,y) 
  {
    this.x+=x;
    this.y+=y;
  };
}

function Rectangle(x,y,width,height)
{
   return new Tee.Rectangle(x,y,width,height);
}

/**
 * Sets Rectangle properties.
 * @memberOf Tee.Rectangle
 * @param {Number} x The position of left side of rectangle.
 * @param {Number} y The position of top side of rectangle.
 * @param {Number} width Amount of rectangle width.
 * @param {Number} height Amount of rectangle height.
 */
/*Rectangle.prototype.set=function(x,y,width,height) {
  this.x=x;
  this.y=y;
  this.width=width;
  this.height=height;
};*/

/**
 * Sets Rectangle properties from rectangle r parameter.
 * @public
 * @memberOf Tee.Rectangle
 * @param {Tee.Rectangle} r The Rectangle instance to copy values from.
 */
/*Rectangle.prototype.setFrom=function(r) {
  this.x=r.x;
  this.y=r.y;
  this.width=r.width;
  this.height=r.height;
};*/

/**
 * @returns {Number} Returns the position in pixels of the right side of the
 * rectangle.
 */
//Rectangle.prototype.getRight=function() { return this.x+this.width; };

/**
 * @returns {Number} Returns the position in pixels of the bottom side of the
 * rectangle.
 */
//Rectangle.prototype.getBottom=function() { return this.y+this.height; };

/**
 * @param {Number} value Defines the position of top side of rectangle.
 */
/*Rectangle.prototype.setTop=function(value) {
  this.height -= (value-this.y);
  this.y=value;
};*/

/**
 * @param {Number} value Defines the position of bottom side of rectangle.
 */
/*Rectangle.prototype.setBottom=function(value) {
  this.height = value - this.y;
};*/

/**
 * @param {Number} value Defines the position of left side of rectangle.
 */
/*Rectangle.prototype.setLeft=function(value) {
  this.width -= (value-this.x);
  this.x=value;
};*/

/**
 * @param {Number} value Defines the position of right side of rectangle.
 */
/*Rectangle.prototype.setRight=function(value) {
  this.width = value - this.x;
};*/

/**
 * @returns {Boolean} Returns if {@link Tee.Point} p is inside the rectangle.
 * @param {Tee.Point} p XY position to test.
 */
/*Rectangle.prototype.contains=function(p) {
  return (p.x>=this.x) && (p.x<=(this.x+this.width)) &&
         (p.y>=this.y) && (p.y<=(this.y+this.height));
};*/

/**
 *
 * @param {Number} x Horizontal pixels.
 * @param {Number} y Vertical pixels.
 */
/*Rectangle.prototype.offset=function(x,y) {
  this.x+=x;
  this.y+=y;
};*/

/**
 * @memberOf Tee
 * @constructor
 * @class Values for each side (left, top, right and bottom) as percentage margins.
 * @property {Number} [left=2] Amount of left margin as percent of chart width.
 * @property {Number} [top=2] Amount of top margin as percent of chart height.
 * @property {Number} [right=2] Amount of right margin as percent of chart width.
 * @property {Number} [bottom=2] Amount of bottom margin as percent of chart height.
 */
function Margins() {
  this.left=this.right=this.top=this.bottom=2;

  /*
   * @private
   */
  this.apply=function(r) {
    var w=r.width, h=r.height;

    r.x+=(w*this.left*0.01);
    r.width -=(w*(Math.min(100,this.left+this.right))*0.01);

    r.y+=(h*this.top*0.01);
    r.height -=(h*(Math.min(100,this.top+this.bottom))*0.01);
  };
}

/**
 * @constructor
 * @class Abstract base class to represent a "tool"
 * @param {Tee.Chart} chart The parent chart this tool belongs to.
 * @property {Boolean} [active=true] Determines if this tool will be painted or enabled.
 */
Tee.Tool=function(chart) {
  this.chart=chart;
  this.active=true;
}

/**
 * @constructor
 * @augments Tee.Tool
 * @class Base abstract class to perform Animations.
 * @property {Number} [duration=500] Duration in milliseconds of the animation.
 * @property {boolean} [loop=false] When true, the animation never stops (starts again when finished).
 * @property {boolean} [running=false] Read-only, returns if the animation is currently running.
 * @property {Tee.Animation[]} items Sub-animations that are executed in parallel with self.
 * @property {boolean} [autoDraw=true] When true, the animation repaints the chart at every step.
 */
Tee.Animation=function(target, onstep) {
  Tee.Tool.call(this,target);

  this.active=true;
  this.mode="linear";
  this.duration=500;
  this.items=[];

  this.autoDraw=true;
  this.loop=false;
  this.running=false;

  this.onstart=null;
  this.onstop=null;

  if (target)
    if (target instanceof Tee.Chart)
       this.chart=target;
    else
    if (target instanceof Tee.Animation) {
       this.chart=target.chart;
       target.items.push(this);
    }

  var o=null;

  this._dostart=function() {
    this.init=new Date().getTime();

    o.start();
    for(var t=0, i; i=o.items[t++];) if (i.active) { i.chart=o.chart; i.start(); }

    o.chart.draw();
    requestAnimFrame(this.step, this);
  }

  this.animate=function(chart) {
    if (!this.running) {
      this.running=true;

      if (chart) this.chart=chart;

      o=this;
      this._dostart();
    }
  }

  this.start=function() { if (this.onstart) this.onstart(); }
  this.stop=function() { if (this.onstop) this.onstop(); }

  this.doStep=function(f) { if (onstep) onstep(f); }

  this.step=function() {
    var now=new Date().getTime(),
        t, i, tmp=(now-o.init)/o.duration,
        f= o.mode=="linear" ? tmp : Math.pow(2,10*(tmp-1));

    if ((f>=0) && (f<1)) {

      if (o.running) {
        o.doStep(f);

        for(t=0; i=o.items[t++];)
          if (i.active) {
            i.chart=o.chart;
            i.doStep(f);
          }

        if (o.autoDraw)
           o.chart.draw();

        requestAnimFrame(o.step,o);
      }
    }
    else {
      o.stop();
      for(t=0; i=o.items[t++];) if (i.active) { i.chart=o.chart; i.stop(); }

      if (o.onstop) o.onstop(o);

      if (o.loop)
        o._dostart();
      else
      {
        o.running=false;
        o.chart.draw();
      }
    }
  }
}

Tee.Animation.prototype=new Tee.Tool();

/**
 * @constructor
 * @class Draws a glow animation behind the bounds rectangle property
 * @param {Number} duration Animation duration in milliseconds.
 * @param {Tee.Rectangle} bounds The rectangle to apply the animation.
 * @param {Tee.Format} format The formatting properties to paint the bounds rectangle.
 */
function AnimateHover(duration,bounds,format) {
  this.format=format;
  this.bounds=bounds;

  var o=this, s=format.shadow;

  this.old=new Shadow();
  this.old.set(s);

  s.visible=true;
  s.color="rgba(0,255,0,0.1)";
  s.blur=10;
  s.width=0;
  s.height=0;

  this.enabled=true;

  var a=new Tee.Animation(format.chart, function(f) {
    if (!o.enabled) return;

    if (f<1)
      o.format.shadow.color="rgba(0,255,0,"+f.toString()+")";
    else
    if (o.autoHide)
      o.restore();
  });

  a.duration=duration;
  a.animate();

  this.restore=function() {
    this.format.shadow.set(this.old);
    this.enabled=false;
  }
}

Tee.Tool.prototype.mousedown=function() {}
Tee.Tool.prototype.mousemove=function() {}
Tee.Tool.prototype.mouseout=function() {}
Tee.Tool.prototype.clicked=function() { return false; }
Tee.Tool.prototype.draw=function() {}

/**
 * @constructor
 * @memberOf Tee
 * @class Colors and direction to fill areas with gradients
 * @param {Tee.Chart} chart The parent chart this gradient object belongs to.
 * @property {Boolean} [visible=false] Determines if contents will be filled using this gradient.
 * @property {Color[]} colors Array of colors to define the gradient.
 * @property {String} [direction="topbottom"] Defines the gradient orientation
 * ("topbottom", "bottomtop", "leftright", "rightleft", "radial", "diagonalup", "diagonaldown").
 * @property {Number[]} stops Array of percentages from 0 to 1, for each color in colors array.
 * @property {Point} offset For radial gradients, moves the center xy position.
 */
function Gradient(chart) {
  this.chart=chart;
  this.visible=false;

  this.colors=["white","silver"];
  this.direction="topbottom";
  this.stops=null;
  this.offset={ x:0, y:0 }

 /**
  * @returns {CanvasGradient} Returns a canvas gradient
  */
  this.create=function(r,color) {
    return this.rect(r.x,r.y,r.width,r.height,color);
  }

 /**
  * @returns {CanvasGradient} Returns a canvas gradient
  */
  this.rect=function(x,y,width,height,color) {
    var g, c=this.chart.ctx, l=c.createLinearGradient;

    if (this.direction=="topbottom")
      g = l.call(c,x,y,x,y+height);
    else
    if (this.direction=="bottomtop")
      g = l.call(c,x,y+height,x,y);
    else
    if (this.direction=="leftright")
      g = l.call(c,x,y,x+width,y);
    else
    if (this.direction=="rightleft")
      g = l.call(c,x+width,y,x,y);
    else
    if (this.direction=="radial") {
      var px=x+width*0.5+this.offset.x,
          py=y+height*0.5+this.offset.y,
          rad=Math.max(width,height);

      g = c.createRadialGradient(px, py, 0, px, py, rad);
    }
    else
    if (this.direction=="diagonalup")
      g = l.call(c,x,y+height,x+width,y);
    else
      g = l.call(c,x,y,x+width,y+height);

    if (color)
       this.setEndColor(color);
       //this.colors[0]=color;  // pie inverted effect

    var t, co=this.colors, len=co.length, s=this.stops, sl=s ? s.length : 0;

    if (len>1)
      for(t=0; t<len; t++)
         g.addColorStop(sl<=t ? t/(len-1) : s[t], co[t]);
    else
      g.addColorStop(0, (len>0) ? co[0] : "white");

    return g;
  }
}

/**
 * @memberOf Tee.Gradient
 * Sets color to all gradient colors except first color.
 * @param {Color} color The color to set.
 */
Gradient.prototype.setEndColor=function(color) {
  if (color && (color!==""))
  for (var t=1, l=this.colors.length; t<l; t++)
     this.colors[t]=color;
}

/**
 * @constructor
 * @memberOf Tee
 * @class Color and parameters to draw shadows behind areas
 * @param {Tee.Chart} chart The parent chart this shadow object belongs to.
 * @property {Boolean} [visible=false] Determines if contents will be filled with a backdrop shadow or not.
 * @property {Number} [blur=4] Amount of softness effect.
 * @property {Color} [color="DimGray"] The color used to draw the shadow.
 * @property {Number} [width=4] Amount in pixels to translate the shadow in horizontal direction.
 * @property {Number} [height=4] Amount in pixels to translate the shadow in vertical direction.
 */
function Shadow(chart) {
  this.chart=chart;
  this.visible=false;
  this.blur = 4;
  this.color = "rgba(80,80,80,0.75)";
  this.width=4;
  this.height=4;

  this.prepare=function(c) {
   if (this.visible) {
     c.shadowBlur = this.blur;
     c.shadowColor = this.color;
     c.shadowOffsetX = this.width;
     c.shadowOffsetY = this.chart.isAndroid ? -this.height : this.height;
   }
   else
     c.shadowColor = "transparent";
  }
}

Shadow.prototype.set=function(s) {
  this.visible=s.visible;
  this.color=s.color;
  this.blur=s.blur;
  this.width=s.width;
  this.height=s.height;
}

/**
 * @constructor
 * @memberOf Tee
 * @class Image and url to draw images
 * @param {Tee.Chart} chart The parent chart this image object belongs to.
 * @property {Boolean} visible When true, the image is displayed.
 * @property {URL} [url=""] The source url to retrieve the image.
 * @property {HTMLImage} image The <a href="http://www.w3.org/2003/01/dom2-javadoc/org/w3c/dom/html2/HTMLImageElement.html">
 * html DOM Image component</a> to store or retrieve the image.
 */
function ChartImage(chart) {
  this.url="";
  this.repeat='no-repeat';
  this.backFill=false;
  this.chart=chart;
  this.visible=true;

  this.tryDraw=function(x,y,width,height) {
    if (!this.image) {
      this.image=new Image();

      this.image.onload = function(){
        chart.draw();
      }
    }

    if (this.image.src==="") {
      chart=this.chart;
      this.image.src = this.url;
    }
    else
    if (chart.ctx.drawImage){ // Threejs check
       if (this.repeat == 'repeat'){
       var pattern = chart.ctx.createPattern(this.image, 'repeat');
         chart.ctx.fillStyle = pattern;
         chart.ctx.fillRect(x,y,width,height);
     }
     else{
         chart.ctx.drawImage(this.image, x,y,width,height);
     }
  }
  }
}

/**
 * @constructor
 * @memberOf Tee
 * @class Color and properties to draw lines
 * @param {Tee.Chart} chart The parent chart this stroke object belongs to.
 * @property {Color} fill Defines the color used to fill the stroke lines.
 * @property {Number} [size=1] Defines the size in pixels of the stroke lines.
 * @property {String} [join="round"] Controls how to paint unions between lines. (miter, round, bevel)
 * @property {String} [cap="square"] Controls how to paint ending line points. (square, round, butt)
 */
function Stroke(chart) {
  this.chart=chart;
  this.fill="black";
  this.size=1;
  this.join="round";
  this.cap="square";
  this.dash=null;

  this._g=null;

  if (obDefP)
    obDefP(this,"gradient", {
      get: function() { if (!this._g)
                          this._g=new Gradient(this.chart);
                        return this._g;
                      }
       });
  else
    this._g=this.gradient=new Gradient(chart);

  this.prepare=function(fill,c) {
    c=c || this.chart.ctx;
    var g=this._g;

    c.strokeStyle=(g && g.visible) ? g.create(this.chart.bounds) : fill ? fill : this.fill;

    c.lineWidth = this.size;
    c.lineJoin = this.join;
    c.lineCap = this.cap;

    c.shadowColor = "transparent";

    if (c.setLineDash)
       c.setLineDash(this.dash || []);  // [] --> Safari WebKit exception
    else
    if (c.mozCurrentTransform)
       c.mozDash=this.dash;
    else
    if (this.chart.isChrome)
       c.webkitLineDash=this.dash;
  }

  /*
   * @private
   */
  this.setChart=function(chart) {
    this.chart=chart;
    if(this._g) this._g.chart=chart;
  }
}

/**
 * @memberOf Tee
 * @constructor
 * @class Style and fill properties to display text
 * @param {Tee.Chart} chart The parent chart this font object belongs to.
 * @property {String} [style="11px Tahoma"] Font family, size and attributes.
 * @property {Color} [fill="black"] Color used to fill texts using this font.
 * @property {Tee.Shadow} shadow Attributes to fill a shadow behind text.
 * @property {Tee.Stroke} stroke Attributes to draw an outline around text.
 * @property {String} [textAlign="center"] Defines to draw text at left, right or center inside container.
 */
function Font(chart) {
  this.chart=chart;
  
  this.style="11px Tahoma";

  this._g=null;

  if (obDefP)
    obDefP(this, "gradient", {
      get: function() {  if (!this._g)
                           this._g=new Gradient(this.chart);
                         return this._g;
                      }
      });
  else
    this._g=this.gradient=new Gradient(chart);

  this.fill="black";

  this._sh=null;

  if (obDefP)
    obDefP(this,"shadow", {
    get : function() {  if (!this._sh)
                           this._sh=new Shadow(this.chart);
                        return this._sh;
      }
    });
  else
    this._sh=this.shadow=new Shadow(chart);

  this._s=null;

  if (obDefP)
    obDefP(this, "stroke", {
      get: function() {  if (!this._s) {
                            this._s=new Stroke(this.chart);
                            this._s.fill="";
                         }
                         return this._s;
                      }
    });
  else {
    this._s=this.stroke=new Stroke(chart);
    this._s.fill="";
  }

  this.textAlign="center";
  this.baseLine="alphabetic";

}

/**
* @returns {Number} Returns the size of font, or 20 if it can't be guessed.
*/
Font.prototype.getSize=function() {
  var s=this.style.split(" "), t, res;
  for (t=0; t<s.length; t++) {
    res=parseFloat(s[t]);
    if (res) return res;
  }

  return 20;
}

Font.prototype.setSize=function(value) {
  var tmp="", s=this.style.split(" "), t;
  for (t=0; t<s.length; t++)
     (parseFloat(s[t])) ? tmp+=value.toString()+"px " : tmp+=s[t]+" ";

  this.style=tmp;
}

Font.prototype.prepare=function() {
  var c=this.chart.ctx;
  c.textAlign=this.textAlign;
  c.textBaseline=this.baseLine;

  if (this._sh) this._sh.prepare(c);

  if (c.font!=this.style) // speed opt.
     c.font=this.style;
}

/**
 * @private
 **/
Font.prototype.setChart=function(chart) {
  this.chart=chart;
  if (this._g) this._g.chart=chart;
  if (this._sh) this._sh.chart=chart;
  if (this._s) this._s.setChart(chart);
}

/**
 * Draws a dashed line.
 * @param {Number} x Starting line horizontal position in pixels.
 * @param {Number} y Starting line vertical position in pixels.
 * @param {Number} x2 Ending line horizontal position in pixels.
 * @param {Number} y2 Ending line vertical position in pixels.
 * @param {Number[]} [da] Optional array of dash offsets.
 */
function dashedLine(ctx, x, y, x2, y2, da) {
  if (!da) da = [10,5];

  ctx.save();

  var dx = (x2-x), dy = (y2-y), len = Math.sqrt(dx*dx + dy*dy), rot = Math.atan2(dy, dx);
  ctx.translate(x, y);
  ctx.moveTo(0, 0);
  ctx.rotate(rot);
  var dc = da.length, di = 0, draw = true;
  x = 0;
  while (len > x) {
      x += da[di++ % dc];
      if (x > len) x = len;
      draw ? ctx.lineTo(x, 0): ctx.moveTo(x, 0);
      draw = !draw;
  }
  ctx.restore();
}

/**
 * @constructor
 * @public
 * @class Contains visual parameters like fill, shadow, image, font.
 * @param {Tee.Chart} chart The parent chart this format object belongs to.
 * @property {Tee.Gradient} gradient Gradient properties to fill contents.
 * @property {Color} fill Color used to paint contents interior.
 * @property {Tee.Stroke} stroke Properties to draw lines around boundaries.
 * @property {Tee.Shadow} shadow Properties to draw a backdrop shadow.
 * @property {Tee.Font} font Properties to fill text.
 * @property {Tee.ChartImage} image Image to fill background.
 * @property {Tee.Point} round Width and height of rectangle rounded corners.
 * @property {Number} transparency Controls the transparency, from 0 (opaque) to 1 (transparent).
 */
Tee.Format=function(chart)
{
  this.chart=chart;

  this.gradient=new Gradient(chart);
  this.fill="rgb(200,200,200)";

  this.stroke=new Stroke(chart);

  this.round={ x:0, y:0 }
  this.transparency=0;

  this.font=new Font(chart);

  this._img=null;

  if (obDefP)
    obDefP(this, "image", {
    get: function() {  if (!this._img)
                          this._img=new ChartImage(this.chart);
                       return this._img;
                    }
    });
  else
    this._img=this.image=new ChartImage(chart);

  this.shadow=new Shadow(chart);

  /**
   * Draws a rectangle with rounded corners
   * @param {Number} x Position in pixels of left side of rectangle.
   * @param {Number} y Position in pixels of top side of rectangle.
   * @param {Number} width Amount in pixels of rectangle width.
   * @param {Number} height Amount in pixels of rectangle height.
   * @param {Number} xr Amount in pixels of corners radius width.
   * @param {Number} yr Amount in pixels of corners radius height.
   * @param {Boolean[]} [corners] Optional, defines to paint top-left, top-right, bottom-left and bottom-right corners.
   */
  this.roundRect=function(ctx, x, y, width, height) {

    if (ctx.roundRect) {
      ctx.roundRect(x,y,width,height, this.round.x,this.round.y);
      return;
    }

    var r=x+width, b=y+height, xr=this.round.x, yr=this.round.y, c=this.round.corners;

    if (height<0) {
      y=b;
      b=y-height;
    }

    if (width<0) {
      x=r;
      r=x-width;
    }

    if (2*xr > width) xr=width*0.5;
    if (2*yr > height) yr=height*0.5;

    ((!c) || c[0]) ? ctx.moveTo(x + xr, y) : ctx.moveTo(x, y);

    if ((!c) || c[1]) {
      ctx.lineTo(r - xr, y);
      ctx.quadraticCurveTo(r, y, r, y + yr);
    }
    else
      ctx.lineTo(r, y);

    if ((!c) || c[2]) {
      ctx.lineTo(r, b - yr);
      ctx.quadraticCurveTo(r, b, r - xr, b);
    }
    else
      ctx.lineTo(r, b);

    if ((!c) || c[3]) {
      ctx.lineTo(x + xr, b);
      ctx.quadraticCurveTo(x, b, x, b - yr);
    }
    else
      ctx.lineTo(x,b);

    if ((!c) || c[0]) {
      ctx.lineTo(x, y + yr);
      ctx.quadraticCurveTo(x, y, x + xr, y);
    }
    else
      ctx.lineTo(x,y);

    ctx.closePath();
  }

 /**
  * @returns {Number} Returns the height in pixels of a given text using current font size and attributes.
  */
  this.textHeight=function( /*text*/ ) {

      return this.font.getSize()*1.3;

      //var s=document.createElement("span");
      //s.font=this.font.style;
      //s.textContent=text;
      //return s.offsetHeight;

      //return 20;
  }

 /**
  * @returns {Number} Returns the width in pixels of a given text using current font size and attributes.
  */
  this.textWidth=function(text) {
    return this.chart.ctx.measureText(text).width;
  }

  this.fillBack=function(c,getbounds,x,y,width,height) {
  if (this.gradient.visible) {
     c.fillStyle = (getbounds) ? this.gradient.create(getbounds()) : this.gradient.rect(x,y,width,height);
     c.fill();
    }
    else
    if (this.fill!=="") {
      c.fillStyle = this.fill;
      c.fill();
    }
  }

  // (Firefox bottleneck)

  this.draw=function(c,getbounds,x,y,width,height) {
     var i=this._img, oldtransp;

     if (typeof(x)==='object') {
       y=x.y;
       width=x.width;
       height=x.height;
       x=x.x;
     }

     if (this.transparency>0) {
        oldtransp=c.globalAlpha;
        c.globalAlpha=(1-this.transparency)*oldtransp;
     }

     this.shadow.prepare(c);
   
     if (i && i.visible && (i.url!=="")) {
       c.save();
       c.clip();
     
     if (i.backFill == true) {
         this.fillBack(c,getbounds,x,y,width,height);   
     }

       if (getbounds) {
         var r=getbounds();
         i.tryDraw(r.x,r.y,r.width,r.height);
       }
       else
         i.tryDraw(x,y,width,height);

       c.restore();
     }
     else
     {
       this.fillBack(c,getbounds,x,y,width,height);
     }

     if (this.stroke.fill!=="") {
       this.stroke.prepare();
       c.stroke();
     }

     if (this.transparency>0)
       c.globalAlpha=oldtransp;
  }

  this.drawText=function(bounds,text) {

    var g=this.font._g, c=this.chart.ctx,
        s=this.font._s, a=this.font.textAlign,
        x=bounds.x,
        y=bounds.y;

    function xy(text) {
      c.fillText(text,x,y);

      if (s && (s.fill!=="")) {
        s.prepare();
        c.strokeText(text, x,y);
      }
    }

    c.fillStyle = (g && g.visible && bounds) ? g.create(bounds) : this.font.fill;

    if (a=="center")
       x+=(0.5*bounds.width);
    else
    if ((a=="right") || (a=="end"))
       x+=bounds.width;

    var rows=(text+"").split("\n"), l=rows.length;

    if (l>1) {
        var h=this.textHeight(rows[0]);

        for (var t=0; t<l; t++) {
          xy(rows[t]);
          y+=h;
        }
    }
    else
      xy(text);
  }

  this.rectangle=function(x,y,width,height) {
     if (this.transparency < 1)
     {
       if (typeof(x)==='object')
        this.rectangle(x.x,x.y,x.width,x.height);
       else
       {
         this.rectPath(x,y,width,height);
         this.draw(this.chart.ctx,null,x,y,width,height);
       }
     }
  }

  // Returns "r" rectangle around points xy array.

  this.polygonBounds=function(points,r) {
    var x0=0,y0=0,x1=0,y1=0, l=points.length, p,t;

    if (l>0) {
      x0=x1=points[0].x;
      y0=y1=points[0].y;

      for (t=1; t<l; t++) {
        p=points[t].x;
        if (p<x0) x0=p; else if (p>x1) x1=p;
        p=points[t].y;
        if (p<y0) y0=p; else if (p>y1) y1=p;
      }
    }

    r.x=x0; r.y=y0; r.width=x1-x0; r.height=y1-y0;
  }

  var tmp=new Rectangle();

  this.polygon=function(points) {
     var c=this.chart.ctx, l=points.length, t;

     c.beginPath();
     c.moveTo(points[0].x,points[0].y);

     for (t=1; t<l; t++)
       c.lineTo(points[t].x,points[t].y);

     c.closePath();

     var _this=this;

     this.draw(c,function() { _this.polygonBounds(points,tmp); return tmp; });
  }
}

Tee.Format.prototype.ellipsePath=function(c, cx, cy, width, height) {
    /*
    var w=width*0.5, top=centerY-height, bot=centerY+height;

    c.beginPath();
    c.moveTo(centerX, top);
    c.bezierCurveTo(centerX + w, top, centerX + w, bot, centerX, bot);
    c.bezierCurveTo(centerX - w, bot, centerX - w, top, centerX, top);
    c.closePath();
    */

   if (this.chart.__webgl) {
     c.z=this.z;
     c.depth=this.depth;
     c.ellipsePath(cx,cy,width,height);
   }
   else
   {
     c.save();
     c.translate(cx,cy);
     c.scale(width*0.5,height*0.5);
     c.beginPath();
     c.arc(0,0,1,0,2*Math.PI,false);
     //c.scale(height*0.5,width*0.5);
     c.restore();
   }
}

Tee.Format.prototype.ellipse=function(cx,cy,width,height) {
  var c=this.chart.ctx;
  this.ellipsePath(c,cx,cy,width,height);
  this.draw(c,null,cx-width*0.5,cy-height*0.5,width,height);
}

Tee.Format.prototype.sphere=function(cx,cy,width,height) {

  if (this.chart.__webgl) {
    var ctx=this.chart.ctx;
    ctx.depth=this.depth;
    ctx.z=this.z;

    if (this.gradient.visible)
      ctx.fillStyle=this.gradient.colors[this.gradient.colors.length-1];
      
    ctx.sphere(cx,cy,width,height);
  }
  else
    this.ellipse(cx,cy,width,height);
}

Tee.Format.prototype.cylinder=function(r, topradius, vertical, inverted) {

   if (this.chart.__webgl) {
       var ctx=this.chart.ctx;
       ctx.depth=this.depth;
       ctx.z=this.z;
       ctx.image=this.image;
       ctx.cylinder(r, topradius, vertical, inverted);
       return;
   }
  else
  if (topradius==1)
    this.cube(r);
  else
  {
    var w=r.width, h=r.height;

    if (vertical)
      this.polygon([new Point(r.x+w*0.5,r.y),
                    new Point(r.x,r.y+h),
                    new Point(r.x+w,r.y+h)]);
    else
      this.polygon([new Point(r.x+w,r.y+h*0.5),
                    new Point(r.x,r.y),
                    new Point(r.x,r.y+h)]);
  }
}

Tee.Format.prototype.cube=function(r) {
  var a=this.chart.aspect,
      is3D=a.view3d, w, h, old,
      ax=0,
      ay=0;

  if (is3D) {

     if (this.chart.__webgl) {
         var ctx=this.chart.ctx;
         ctx.depth=this.depth;
         ctx.z=this.z;
         ctx.cube(r, this.round.x);
         return;
     }

      var z=this.z,
          depth=this.depth;

      ax=z*a._orthox,
      ay=-z*a._orthoy;

      w=r.x+r.width;
      h=r.y+r.height;

      var dx=depth*a._orthox,
          dy=-depth*a._orthoy;

      old=this.shadow.visible;
      this.shadow.visible=false;

      var ww=w+dx, hh=r.y+dy;

      if (depth>0) {
        this.polygon([ {x:w,y:r.y}, {x:ww,y:hh}, {x:ww,y:h+dy}, {x:w,y:h} ]);

        if (r.width>0)
          this.polygon([ {x:r.x,y:r.y}, {x:r.x+dx,y:hh}, {x:ww,y:hh}, {x:w,y:r.y} ]);
      }
  }

  this.rectPath(r.x+ax,r.y+ay,r.width,r.height);

  if (is3D) this.shadow.visible=old;
}

Tee.Format.prototype.rectPath=function(x,y,width,height) {
  var c=this.chart.ctx;

  c.beginPath();

  if ((this.round.x>0) && (this.round.y>0))
    this.roundRect(c,x,y,width,height);
  else
    c.rect(x,y,width,height);
}


/**
 * @private
 */
Tee.Format.prototype.setChart=function(chart) {
  this.chart=chart;
  this.shadow.chart=chart;
  this.gradient.chart=chart;
  this.font.setChart(chart);
  if (this._img) this._img.chart=chart;
  this.stroke.setChart(chart);
}

/**
 * @constructor
 * @augments Tee.Tool
 * @class Represents a rectangle containing text
 * @param {Tee.Chart} chart The parent chart this annotation belongs to.
 * @param {String} text The text to draw inside the annotation.
 * @param {Number} [x=10] Optional left side position in pixels.
 * @param {Number} [y=10] Optional top side position in pixels.
 * @property {Tee.Margins} margins Properties to control spacing between text and rectangle boundaries.
 * @property {Boolean} visible When true, the annotation is displayed.
 * @property {Boolean} transparent When true, the annotation background is not displayed. Only the text is painted.
 * @property {Tee.Format} format Properties to control the annotation background and text appearance.
 */
Tee.Annotation=function(chart,text,x,y) {
  Tee.Tool.call(this,chart);

  /**
   * @property {Tee.Point} position Top-left coordinates of annotation rectangle.
   * @default x:10, y:10
   */
  this.position=new Point(x || 10, y || 10);

  var m=this.margins=new Margins();

  this.items=[];

  var b=this.bounds=new Rectangle();
  this.visible=true;
  this.transparent=false;
  this.text=text || "";
  this.isDom = false;
  this.domElement = null;
  this.domStyle = "border-radius: 5px;border: 2px solid #faad44;background: #FFF;padding:5px;";
  var f=this.format=new Tee.Format(chart);

  f.font.textAlign="center";
  f.font.baseLine="top";
  f.fill="beige";
  f.round={ x:4, y:4 }
  f.stroke.fill="silver";
  f.shadow.visible=true;

  f.depth=0.05;
  f.z=0.5;

  var fontH, thisH, over;

  this.getDOMHeight = function () { return this.domElement == null ? 0 : this.domElement.offsetHeight }
  this.getDOMWidth = function () { return this.domElement == null ? 0 : this.domElement.offsetWidth }
  this.moveTo=function(x,y) {
    this.position.x=x;
    this.position.y=y;

    this.resize();
  }

  function isEmpty(str) {
    return (!str || 0 === str.length);
  }

  this.shouldDraw=function() {
    return this.visible && (!isEmpty(this.text));
  }

  this.resize=function() {
    if (isEmpty(this.text)) return;

    f.font.prepare();

    this.rows=this.text.split("\n");
    fontH=f.textHeight(this.text);

    var l=this.rows.length;

    thisH=fontH*l + m.top;

    var w, h=thisH+m.bottom;

    if (l>1) {
      w=0;
      while(l--) w=Math.max(w,f.textWidth(this.rows[l]+"W"));
    }
    else
      w=f.textWidth(this.text+"W");

    w+=(m.left+m.right);

    var pos=this.position, p=pos.y+thisH, t, i;
    /*
    for(t=0; i=this.items[t++];)
    {
      var bi=i.bounds;
      i.resize();
      h+=bi.height;
      w=Math.max(w,bi.width);
      bi.x=pos.x;
      bi.y=p;
      p+=bi.height;
    }

    for(t=0; i=this.items[t++];)
      i.bounds.width=w-m.right;
      */
    b.set(pos.x,pos.y,w,h);
  }

  this.add=function(text) {
    var a=new Tee.Annotation(this.chart,text);

    this.items.push(a); //[this.items.length]=a;
    a.transparent=true;
    return a;
  }

  this.doDraw=function() {
    if (!isEmpty(this.text)) {

          if (this.isDom) {
              this.drawDOMText();
          }
          else {
      if (this.transparent)
        this.chart.ctx.z=f.z;
      else
        if (this.chart.aspect.view3d && (this.format.depth>0)) {

           var oldz=f.z;
           f.z -= this.format.depth*0.5;
           f.cube(b);
           f.draw(this.chart.ctx,null,b);
           f.z=oldz;
        }
        else {
           this.chart.ctx.z=f.z;
           f.rectangle(b);
        }

      var old, ft=this.format.transparency, ctx=this.chart ? this.chart.ctx : null;

      if (ft>0) {
        old=ctx.globalAlpha;
        ctx.globalAlpha=(1-ft)*old;
      }

      f.font.prepare();

      b.y+=m.top+(0.1*fontH);
      b.x+=m.left;

      var w=b.width;
      b.width-=m.right;

      /*
      if (this.transform) {
       ctx.save();
       this.transform(b);
      }
      */

      f.drawText(b, this.text);

      //if (this.transform) ctx.restore();

      b.x=this.position.x;
      b.y=this.position.y;
      b.width=w;

      if (ft>0)
         ctx.globalAlpha=old;
    }
        /*
    for(var t=0, i; i=this.items[t++];)
       i.doDraw();
       */
  }
  }

 /**
  * @returns {Boolean} Returns if {@link Tee.Point} p is inside this Annotation bounds.
  */
  this.clicked=function(p) {
    return this.visible && b.contains(p); // (&& this.text!="")
  }

  this.doMouseMove=function(p) {
    this.mouseinside=this.clicked(p);

    if (this.mouseinside) {
      if (this.cursor)
         this.chart.newCursor=this.cursor;

      if (!this.wasinside)
         over=new AnimateHover(250, b, f);
    }
    else
    if (this.wasinside) {
       over.restore();
       this.chart.draw();
    }

    this.wasinside=this.mouseinside;
  }

  this.mousemove=function(p) {
    if (this.cursor && (this.cursor!="default"))
      this.doMouseMove(p);
  }

  this.forceDraw=function() {
    this.resize();
    this.doDraw();
  }

  this.setChart=function(chart) {
    this.chart=chart;
    this.format.setChart(chart);
  }

  this.drawDOMText = function () {
      var rect = this.chart.canvas.getBoundingClientRect();
      var opacity = this.transparent ? "opacity:0;" : "opacity:1;";
      if(!this.domElement){
          this.domElement = document.createElement('div');
          document.body.appendChild(this.domElement);
      }
      this.chart.canvas.setAttribute('style', 'z-index:1;');
      this.domElement.setAttribute('style', "position:absolute;top:" + (this.position.y + rect.top) + "px;left:" + (this.position.x + rect.left) + "px;display:block;z-index:10000;" + this.domStyle + opacity);
      if (this.domElement.innerHTML != this.text) this.domElement.innerHTML = this.text;
  }
}

Tee.Annotation.prototype=new Tee.Tool();

Tee.Annotation.prototype.draw=function() {
  if (this.visible) this.forceDraw();
}

/**
 * @constructor
 * @augments Tee.Tool
 * @class Allows dragging series data by mouse or touch
 * @param {Tee.Chart} chart The parent chart this tool belongs to.
 * @property {Tee.Series} [series=null] A series to be dragged, or null to drag all.
 */
Tee.DragTool=function(chart) {
  Tee.Tool.call(this,chart);

  this.series=null;

  var ta=this.target={ series:null, index:-1 };

  this.clicked=function() {
    ta.series=null;
    ta.index=-1;
  }

  var p=new Point(0,0);
  
  this.Point =  p;

  this.mousedown=function(event) {
    var s=this.chart.series.items, t, len=s.length;

    this.chart.calcMouse(event,p);

    ta.series=null;
    ta.index=-1;

    if (this.series && this.series.visible) {
        ta.index=this.series.clicked(p);
        if (ta.index!=-1)
          ta.series=this.series;
    }
    else
    for(t=0; t<len; t++) {
      if (s[t].visible) {
        ta.index=s[t].clicked(p);
        if (ta.index!=-1) {
          ta.series=s[t];
          break;
        }
      }
    }

    return ta.index!=-1;
  }
  
  this.mousemove=function(p) {
    if (ta.index!=-1) {
      var s=ta.series, tmp=s.mandatoryAxis.fromPos( s.yMandatory ? p.y : p.x );
    
      if (this.onchanging) tmp=this.onchanging(this,tmp);

      s.data.values[ta.index]=tmp;

      if (this.onchanged) this.onchanged(this,tmp);
      this.chart.draw();
    }
  }
}

Tee.DragTool.prototype=new Tee.Tool();

/**
 * @constructor
 * @augments Tee.Tool
 * @class Draws mouse draggable horizontal and / or vertical lines inside axes
 * @param {Tee.Chart} chart The parent chart this cursor tool belongs to.
 * @property {String} direction Determines if the cursor will be displayed as "vertical", "horizontal" or "both".
 * @property {Tee.Format} format Properties to control the cursor lines stroke appearance.
 * @property {Tee.Point} size The size of cursor, {x:0, y:0} means lines will cover full axes bounds.
 * @property {boolean} followMouse When true the cursor follows mouse movement over the chart.
 */
Tee.CursorTool=function(chart) {
  Tee.Tool.call(this,chart);

  this.direction="both"; // "vertical", "horizontal", "both"
  this.size=new Point(0,0);

  this.followMouse=true;
  this.dragging=-1;

  this.format=new Tee.Format(chart);

  this.horizAxis=chart ? chart.axes.bottom : null;
  this.vertAxis=chart ? chart.axes.left : null;

  var old, r=new Rectangle();

  this.over=function(p) {
    var res=-1;
    if (r.contains(p)) {
      var v=Math.abs(old.x-p.x)<3, h=Math.abs(old.y-p.y)<3, d=this.direction;
      if ((d=="both") && v && h) res=0; else
      if (v && ((d=="both") || (d=="vertical"))) res=1; else
      if (h && ((d=="both") || (d=="horizontal"))) res=2;
    }
    return res;
  }

  this.calcRect=function() {
    var cr=chart.chartRect, h=this.horizAxis, v=this.vertAxis;

    r.x=h ? h.startPos : cr.x;
    r.width=h ? h.endPos-r.x : cr.width;

    r.y=v ? v.startPos : cr.y;
    r.height=v ? v.endPos-r.y : cr.height;
  }

  var pp=new Point(0,0);

  this.mousedown=function(p) {
    this.chart.calcMouse(p,pp);
    this.dragging= this.followMouse ? -1 : this.over(pp);
    return this.dragging>-1;
  }

  this.clicked=function() { this.dragging=-1; }

  this.mousemove=function(p) {

    var d=this.dragging, fm=this.followMouse;

    if (fm || (d>-1)) {
      if (!old) old=new Point();

      if ( (old.x != p.x) || (old.y != p.y) ) {

        this.calcRect();

        if (r.contains(p)) {
          if (fm || (d===0) || (d===1)) old.x=p.x;
          if (fm || (d===0) || (d===2)) old.y=p.y;

          if (this.render=="full")
             this.chart.draw();
          else
          {
            //Restore initial canvas before drawing cursor to clean previous position

            if (canvasCopy)
              if (this.render=="copy")
          this.chart.ctx.drawImage(canvasCopy,0,0);
              else
              {
                 var b=chart.bounds;
                 ctxCopy.clearRect(b.x,b.y,b.width,b.height);
              }

            this.dodraw( this.render=="copy" ? this.chart.ctx : ctxCopy);
          }

          if (this.onchange)
            this.onchange(p);

          return;
        }
      }
    }

    var o=this.over(p);

    if (old && (o>-1)) {
       this.chart.newCursor=(o===0) ? "move" : (o===1) ? "e-resize" : "n-resize";
    }
    else
       this.chart.newCursor="default";
  }

  this.render="copy";

  var canvasCopy, ctxCopy;

  this.setRender=function(r)
  {
    this.render=r;

    if (canvasCopy)
    {
      this.resetCopy();
      this.chart.draw();
    }
  }

  this.resetCopy=function()
  {
    var ca=this.chart.canvas;

    if (this.render=="layer")
    {
      canvasCopy.style.position="absolute";
      ca.parentNode.appendChild(canvasCopy);

      canvasCopy.setAttribute("left",ca.offsetLeft+"px");
      canvasCopy.setAttribute("top",ca.offsetTop+"px");

      canvasCopy.style.left=ca.offsetLeft;
      canvasCopy.style.top=ca.offsetTop;

      canvasCopy.style.zIndex=10;
      canvasCopy.style.pointerEvents="none";
    }
    else
    if (canvasCopy.parentNode)
      canvasCopy.parentNode.removeChild(canvasCopy);
  }

  this.draw=function() {

    if (this.render=="full")
      this.dodraw(this.chart.ctx);
    else
    {
      if (!canvasCopy) {
        canvasCopy=this.chart.canvas.cloneNode();
        this.resetCopy();
        ctxCopy=canvasCopy.getContext("2d"); // ,{alpha:false} (opaque canvas) 
      }

      if (this.render=="copy")
      {
        //var b=chart.bounds;
        //ctxCopy.clearRect(b.x,b.y,b.width,b.height);
      ctxCopy.drawImage(chart.canvas,0,0);

        this.dodraw(this.chart.ctx);
      }
      else
        this.dodraw(ctxCopy);
    }
  }

  this.dodraw=function(c) {
    var d=this.direction, both=d=="both", p;

    this.calcRect();

    if (!old)
      old=new Point(r.x+0.5*r.width, r.y+0.5*r.height);

    c.beginPath();

    if (both || d=="vertical") {
      p=this.size.y*0.5;
      c.moveTo(old.x, p===0 ? r.y : old.y-p);
      c.lineTo(old.x, p===0 ? r.y+r.height : old.y+p);
    }

    if (both || d=="horizontal") {
      p=this.size.x*0.5;
      c.moveTo(p===0 ? r.x : old.x-p,old.y);
      c.lineTo(p===0 ? r.x+r.width : old.x+p,old.y);
    }

    this.format.stroke.prepare(this.format.stroke.fill, c);
    c.stroke();
  }
}

Tee.CursorTool.prototype=new Tee.Tool();

/**
 * @constructor
 * @augments Tee.Tool
 * @class Shows an annotation when mouse is over a series data point
 * @param {Tee.Chart} chart The parent chart this tooltip belongs to.
 * @property {Boolean} [autoHide=false] When true, the tooltip is automatically removed after "delay" milliseconds.
 * @property {Number} [delay=1000] Amount of milliseconds to wait before removing the last displayed tooltip (when "autoHide" is true).
 * @property {Number} [animated=100] Duration in milliseconds to animate the movement of tooltip from old to new position.
 * @property {Boolean} [findPoint=false] When true, the tooltip jumps to the nearest point.
 */
Tee.ToolTip=function(chart) {
  Tee.Annotation.call(this,chart);
  this.pointer = {
      fill: "Green",
      firstCircleRadius: "2",
      secondCircleRadius: "5",
      visible: false,
      firstCircleOpacity: "1",
      secondCircleOpacity: "0.4",
      animationVisible: true,
      animationDuration: 200
  };
  this.visible=false;
  this.findPoint = false;

  /**
   * @private
   */
  this.currentSeries=null;
  /**
   * @private
   */
  this.currentIndex=-1;
  /**
   * @private
   */
  this.timID=null;

  this.autoHide=false;
  this.delay=1000;
  this.animated=100;
  this.autoRedraw=true;
  this.render="dom";
  this.domStyle="padding:5px; margin-left:5px; background-color:#666; border-radius:4px 4px; color:#FFF; z-index:1000;";

  this.hide=function() {
    var isDom = this.render === 'dom';

    if (this.visible || isDom) {
      if (this.onhide)
        this.onhide(this);

      this.visible=false;

      if (this.autoRedraw)
        if (isDom)
           Tee.DOMTip.hide();
        else
           this.chart.draw();

      this.currentIndex=-1;
      this.currentSeries=null;
    }
  }

  var redraw=function(args) {
    if (args) args[0].hide();
  }
  this.mousemove=function(p) {

    var li=this.chart.series, len=li.count(), ser=null, index=-1; 
    if (this.chart.chartRect.contains(p))
    for (var t=len-1; t>=0; t--) {
      var s=li.items[t];

      if (s.visible) {
	    index=s.clicked(p);
          if ((index == -1) && (s.continuous)) {
    		index = Math.round(this.chart.axes.bottom.fromSizeCalcIndex(p.x-this.chart.axes.bottom.startPos));
              var distance, oldDistance;
              for (var n = 0; n < len; n++) {
                  distance = Math.abs(li.items[n].data.values[index] - this.chart.axes.left.fromPos(p.y));
                  if (n == 0) {
                      oldDistance = distance;
                      s = li.items[n];
                  }
                  else if(distance<oldDistance){
                      s = li.items[n];
                  }
              }
          }

        if (index!=-1) {
          ser=s;
          break;
        }
      }
    }
    else
	    index=-1;
    if (index==-1) {
      this.hide();

      this.currentIndex=-1;
      this.currentSeries=null;
    }
    else
    if ((index != this.currentIndex) || (ser!=this.currentSeries)) {

      this.currentIndex=index;
      this.currentSeries=ser;

      if (ser) {
        this.refresh(ser,index);

        if (this.autoHide && (this.delay > 0)) {
           clearTimeout(this.timID);
           this.timID=window.setTimeout(redraw, this.delay, [this]);
        }
      }
    }
  }

  var o=null;

  function step() {

    function changeTo(f) {
      o.moveTo(o.oldX+f*o.deltaX,o.oldY+f*o.deltaY);
      if (o.autoRedraw)
         o.chart.draw();
    }

    var now=new Date().getTime(),
        f=(now-o.init)/o.animated;

    if (f<1) {
      changeTo(f);
      window.requestAnimFrame(step,o);
    }
    else
      changeTo(1);
  }

  this.refresh=function(series,index) {
    var isDom = this.render==="dom";
    this.visible= !isDom;

    this.text=series.markText(index);

    if (this.ongettext)
      this.text=this.ongettext(this,this.text,series,index);

    if (this.text!=="") {
      this.resize();

      var p=new Point();
      series.calc(index,p);

      p.x-=this.bounds.width*0.5;
      p.y-=1.5*this.bounds.height;

      if (p.x<0) p.x=0;
      if (p.y<0) p.y=0;

      if ( (!isDom) && (!this.autoHide) && (this.animated>0) &&
           (!isNaN(this.position.x)) && (!isNaN(this.position.y))) {
        this.oldX=this.position.x;
        this.oldY=this.position.y;

        this.deltaX=(p.x-this.oldX);
        this.deltaY=(p.y-this.oldY);

        this.init=new Date().getTime();
        o=this;
        window.requestAnimFrame(step,this);
      }
      else
      {
        this.moveTo(p.x,p.y);

        if (this.autoRedraw)
           if (isDom)
             Tee.DOMTip.show(this.text, 'auto', this.chart.canvas, this.domStyle, this);
           else
             this.chart.draw();
      }

      if (this.onshow)
          this.onshow(this,series,index);
    }
  }
}

Tee.ToolTip.prototype=new Tee.Annotation();

/**
 * @memberOf Tee.Chart
 * @constructor
 * @class Contains a list with all "tools"
 * @param {Tee.Chart} chart The parent chart this tool list belongs to.
 * @property {Tee.Tool[]} items Array of Tee.Tool objects.
 */
function Tools(chart) {
  this.chart=chart;
  this.items=[];

  this.draw=function() {
    for(var t=0, s; s=this.items[t++];)
      if (s.active) s.draw();
  }

  this.mousemove=function(p) {
    for(var t=0, s; s=this.items[t++];)
      if (s.active) s.mousemove(p);
  }

  this.mousedown=function(event) {
    for(var t=0, s, done=false; s=this.items[t++];)
      if (s.active) {
        if (s.mousedown(event)) done=true;
      }

    return done;
  }

  this.mouseout=function() {
    for(var t=0, s; s=this.items[t++];)
      if (s.active) s.mouseout();
  }

  this.clicked=function(p) {
    var l=this.items.length;

    for(var t=l, s, done=false; s=this.items[--t];) {
      if (s.active && s.clicked(p)) {
         done=true;

         if (s.onclick)
            done=s.onclick(s,p.x,p.y);
      }
    }

    return done;
  }

 /**
  * @returns {Tee.Tool} Returns the tool parameter.
  */
  this.add=function(tool) {
    this.items.push(tool);
    return tool;
  }
}

// http://simple.wikipedia.org/wiki/Rainbow
Tee.RainbowPalette=function() { return ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#6600FF","#8B00FF"]};

/**
 * @constructor
 * @class Contains an array of colors to be used as series data fill color
 * @param {Color[]} colors The array of colors to build the palette.
 */
Tee.Palette=function(colors) {
  this.colors=colors;
}

/**
 * @returns {String} Returns the index'th color in colors array (mod length
 * if index is greater than number of colors).
 * @param {Integer} index The position inside colors array (circular, if index is greater than colors length).
 */
Tee.Palette.prototype.get=function(index) {
  return this.colors[ (index==-1) ? 0 : index % this.colors.length];
}

/**
 * @constructor
 * @memberOf Tee.Chart
 * @class Controls how to zoom chart axes by mouse or touch drag
 * @param {Tee.Chart} chart The parent chart this zoom object belongs to.
 * @property {Boolean} enabled Allows chart zoom by mouse/touch dragging.
 * @property {Number} mouseButton Defines the mouse button that can be used to zoom (0=Left button, etc).
 * @property {Tee.Format} format Properties to control the appearance of rectangle that appears while dragging.
 * @property {String} [direction="both"] Allows chart zoom in horizontal, vertical or both directions.
 */
function Zoom(chart) {
  this.chart=chart;

  /**
   * @private
   */
  this.active=false;

  this.enabled=true;

  /**
   * @private
   */
  this.done=false;

  this.direction="both";

  /**
   * When true, zoom rectangle maintains same width to height proportion of Chart.
   */
  this.keepAspect=false;

  this.mouseButton=0;
  this.wheel={ enabled:false, factor:1 }

  var f=this.format=new Tee.Format(chart);
  f.fill="rgba(255,255,255,0.5)";
  f.stroke.fill="darkgray";
  f.stroke.size=2;

  //c.ctx.globalCompositeOperation="source-over";

  var r=new Rectangle();

  this.change=function(pos) {
     if (!this.old)
       this.old=new Point();

     var old=this.chart.oldPos;

     this.old.x=pos.x-old.x;

     if (this.keepAspect) {
       var r= this.chart.chartRect;
       this.old.y= this.old.x*(r.height/r.width);
     }
     else
       this.old.y=pos.y-old.y;
  }

  function check(z) {
    var c=z.chart.chartRect, d=z.direction, b=(d==="both");
    r.set(c.x, c.y, c.width, c.height);

    if (z.old) {
      if (b || (d==="horizontal")) {
        if (z.old.x<0) {
          r.x=z.chart.oldPos.x+z.old.x;
          r.width=-z.old.x;
        }
        else
        {
          r.x=z.chart.oldPos.x;
          r.width=z.old.x;
        }
      }

      if (b || (d==="vertical")) {
       if (z.old.y<0) {
         r.y=z.chart.oldPos.y+z.old.y;
         r.height=-z.old.y;
       }
       else
       {
         r.y=z.chart.oldPos.y;
         r.height=z.old.y;
       }
      }
    }

    return r;
  }

  this.draw=function() {
    f.rectangle(check(this));
  }

  this.apply=function() {

    if ((this.old.x<0) || (this.old.y<0)) {
      this.reset();

      if (this.onreset)
         this.onreset();
    }
    else
    {
      check(this);

      if ((r.width>3) && (r.height>3)) {

        var d=this.direction, b=(d==="both");

        this.chart.axes.each(function() {
          if (this.horizontal) {
            if (b || (d==="horizontal"))
              this.calcMinMax(r.x,r.x+r.width);
          }
          else
            if (b || (d==="vertical"))
              this.calcMinMax(r.y+r.height,r.y);
        });

        return true;
      }
    }

    return false;
  }

  this.reset=function() {
      this.chart.axes.each(function() { this.automatic=true; });
  }
}

/**
 * @constructor
 * @memberOf Tee.Chart
 * @class Controls how to scroll chart axes by mouse or touch drag
 * @param {Tee.Chart} chart The parent chart this scroll object belongs to.
 * @property {Boolean} [enabled=true] Allows chart scroll by mouse/touch dragging.
 * @property {Number} [mouseButton=2] Defines the mouse button that can be used to scroll (2=Right button, etc).
 * @property {String} [direction="both"] Determines if scroll is allowed in "horizontal", "vertical" or "both" directions.
 */
function Scroll(chart) {
  this.chart=chart;

  /**
   * @private
   */
  this.active=false;

  this.enabled=true;

  /**
   * @private
   */
  this.done=false;

  this.mouseButton=2;
  this.direction="both";  // horizontal,vertical,both

  /**
   * @private
   */
  this.position=new Point(0,0);
}

/**
 * @memberOf Tee.Chart
 * @constructor
 * @augments Tee.Annotation
 * @class Displays text at top or bottom chart sides
 * @param {Tee.Chart} chart The parent chart this title object belongs to.
 * @param {Color} fontColor The color to fill the title text.
 * @param {Boolean} [expand=false] When true, title background is aligned to panel.
 */
function Title(chart, fontColor) {
  Tee.Annotation.call(this,chart);
  this.transparent=true;

  this._expand=false;

  if (obDefP)
    obDefP(this,"expand", {
      get: function() { return this._expand; },
      set: function(value) {
         this._expand=value;
         if (!this._expand) {
           var ff=this.format;
           ff.round.x=8;
           ff.round.y=8;
           ff.round.corners=null;
           ff.stroke.fill="black";
         }
      }
    });
  else
    this._expand=this.expand=false;

  var f=this.format.font, s=f.shadow, p=this.position;
  s.visible=true;
  s.width=2;
  s.height=2;
  s.blur=8;

  f.style="18px Tahoma";
  f.fill=fontColor;

  this.padding=4;

  this.calcRect=function(fromTop) {
    this.resize();

    var h=this.transparent? 1 : 2,
        b=this.bounds,
        size=b.height+h*this.padding, r=chart.chartRect;

    if (fromTop)
    {
      p.y=r.y;

      if (r.automatic)
          r.setTop(r.y+size);
    }
    else
    {
      p.y=r.y+r.height-b.height-this.padding;

      if (r.automatic)
          r.height-=size;
    }

    if (r.height<0) r.height=0;

    p.x=0.5*(chart.canvas.width-b.width);
  }

  this.tryDraw=function(top) {
   if (this.shouldDraw()) {

     this.calcRect(top);

     var b=this.bounds, ctx=this.chart.ctx, groups=ctx.beginParent;

     this.visual = groups ? ctx.beginParent() : null;

     if (this._expand)
     {
       var f=chart.panel.format;
       p.x=f.stroke.fill!=="" ? f.stroke.size : 0;
       p.y=top ? p.x : chart.canvas.height-(f.shadow.visible ? f.shadow.height :0)-p.x-b.height; //+1; <-- only when panel border round?

       b.width=chart.canvas.width- (f.shadow.visible ? f.shadow.width : 0) - 2*p.x;

       var ff=this.format;
       ff.round.x=f.round.x;
       ff.round.y=f.round.y;
       ff.round.corners=[top,top,!top,!top];
       ff.stroke.fill="";

       this.transparent=false;
     }

     b.x=p.x;
     b.y=p.y;

     this.doDraw();

     if (groups)
       ctx.endParent();
   }
  }
}

Title.prototype=new Tee.Annotation();

/**
 * @memberOf Tee.Chart
 * @constructor
 * @public
 * @class Defines the visual properties for chart background
 * @param {Tee.Chart} chart The parent chart this panel object belongs to.
 * @property {Tee.Margins} margins Controls the spacing between background panel to chart contents.
 * @property {Tee.Format} format Visual properties to paint the chart panel background.
 * @property {Boolean} transparent Determines if panel background will be filled or not.
 */
function Panel(chart)
{
  var f=this.format=new Tee.Format(chart);
  f.round.x=12;
  f.round.y=12;
  f.stroke.size=3;
  f.gradient.visible=true;
  f.gradient.direction="bottomtop";
  f.shadow.visible=true;
  f.stroke.fill="#606060";

  this.transparent= !!chart.__webgl;

  this.margins=new Margins();

  this.clear=function() {
    var b=chart.bounds;
    chart.ctx.clearRect(b.x,b.y,b.width,b.height);
  }

  this.draw=function() {
    if (this.transparent || chart.__webgl)
       this.clear();
    else
    {
      var r=chart.chartRect, sh=f.shadow;

      if (sh.visible) {
        r.width-=(0.5*Math.abs(sh.width))+2;
        r.height-=(0.5*Math.abs(sh.height))+2;

        if (sh.width<0) r.x-=sh.width;
        if (sh.height<0) r.y-=sh.height;
      }

      var s=0;

      if (f.stroke.fill!=="")
      {
        s=f.stroke.size;
        if (s>1) {
          s*=0.5;
          r.x+=s;
          r.y+=s;
          r.width-=2*s;
          r.height-=2*s;
        }
      }

      if (sh.visible || (f.round.x>0) || (f.round.y>0))
        this.clear();

      f.rectangle(r);

      if (s>0) {
        r.x+=s;
        r.y+=s;
        r.width-=2*s;
        r.height-=2*s;
      }
    }
  }
}

/**
 * @memberOf Tee.Chart
 * @constructor
 * @public
 * @class Properties to display a rectangle panel around chart axes
 * @param {Tee.Chart} chart The parent chart this wall object belongs to.
 * @property {Tee.Format} format Defines visual properties to paint this wall.
 * @property {Boolean} [visible=true] Determines if this wall will be displayed or not.
 */
function Wall(chart)
{
  var f=this.format=new Tee.Format(chart);
  f.fill="#E6E6E6";
  f.stroke.fill="black";
  f.z=0;
  f.depth=0;

  this.visible=true;
  this.bounds=new Rectangle();
  this.size=0;

  this.draw=function() {
    f.cube(this.bounds);
    f.draw(chart.ctx, null, this.bounds);
  }
}

/**
 * @returns {Number} Returns the integer part of value, without decimals, rounded to lower.
 */
function trunc(value) {
  return value | 0;
}

/**
 * @memberOf Tee.Chart
 * @constructor
 * @class Defines a scale from minimum to maximum, to transform series points into chart canvas pixels coordinates.
 * @param {Tee.Chart} chart The chart object this axis object belongs to.
 * @param {Boolean} horizontal Determines if axis is horizontal or vertical.
 * @param {Boolean} otherSide Determines if axis is at top/right or bottom/left side of chart.
 * @property {Tee.Format} format Visual properties to draw the axis line.
 * @property {Tee.Chart.Axis-Labels} labels Properties to display axis labels at tick increments.
 * @property {Tee.Chart.Axis-Grid} grid Properties to display grid lines at tick increments.
 * @property {Tee.Chart.Axis-Ticks} ticks Properties to display tick lines at each increment.
 * @property {Tee.Chart.Axis-Ticks} innerTicks Properties to display tick lines at each increment, inside chart.
 * @property {Tee.Chart.Axis-Ticks} minorTicks Properties to display small tick lines between ticks.
 * @property {Tee.Chart.Axis-Title} title Properties to display text that describes the axis.
 */
function Axis(chart,horizontal,otherSide) {
  this.chart=chart;
  this.visible=true;
  this.inverted=false;
  this.horizontal=horizontal;
  this.otherSide=otherSide;
  this.bounds=new Rectangle();

  this.position=0;

  this.format=new Tee.Format(chart);
  this.format.stroke.size=2;
  this.format.depth=0.2;

  this.custom=false;

  this.z = otherSide ? 1 : 0;

  this.maxLabelDepth = 0;

  /**
   * @constructor
   * @public
   * @class Displays text to annotate axes
   * @param {Tee.Chart} chart The chart object this axis labels object belongs to.
   * @property {Tee.Format} format Defines the visual properties to paint the axis title.
   * @property {Boolean} [visible=true] Determines if axis labels will be displayed or not.
   * @property {String} dateFormat="shortDate" Configures string format for date & time labels
   * @property {Number} rotation=0 Defines the label rotation angle from 0 to 360 degree.
   * @property {String} labelStyle="auto" Determines label contents from series data ("auto", "value", "mark", "text").
   * @property {Number} decimals=2 Defines the number of decimals for floating-point numeric labels.
   * @property {Boolean} alternate=false When true, labels are displayed at alternate positions to fit more labels in the same space.
   */
  function Labels(chart,axis) {

    this.chart=chart;
    this.format=new Tee.Format(chart);
    this.decimals=2;
    this.fixedDecimals = false;
    this.padding=4;
    this.separation=10; // %
    this.visible=true;
    this.rotation=0;
    this.alternate=false;
    this.maxWidth=0;

    this.wordWrap="no"; // auto,yes,no

    this.roundFirst=true;
    this.labelStyle="auto"; // auto,value,mark,text

    this.dateFormat="shortDate";

    this.checkStyle=function() {
      var st=this.labelStyle, s=axis.firstSeries;

      this._text=null;
    this._textlabels=null;

      if (st=="auto") {
        if ((s.data.labels.length>0) && s.associatedToAxis(axis) && (axis.horizontal==s.notmandatory.horizontal))
    {
       this._text=s;
      
        if ((this.chart.series.items.length > 1) && (this.chart.series.items[0] instanceof Tee.Bar) 
                                    && (this.chart.series.items[0].stacked == "sideAll")){
        
        var li=chart.series.items, t, tt, ser;
        this._textlabels=this._text.data.labels;
        for(t=1; ser=li[t++];){
           if (ser.visible && ser.associatedToAxis(axis)) {
             for(tt=0; tt < ser.data.values.length; tt++){  
               this._textlabels.push(ser.data.labels[tt]);
             }
           }
          }

           if (s === undefined)
              s="";
           }
    }
      }
      else
      if ((st=="mark") || (st=="text"))
         this._text=s;
    }

    
    this.formatValueString=function(value)
    {
			if (this.valueFormat){
				var DecimalSeparator = Number("1.2").toLocaleString().substr(1,1); 
				
				var AmountWithCommas = (value * 1).toLocaleString();
				var arParts = String(AmountWithCommas).split(DecimalSeparator);
				var intPart = arParts[0];
				
				var padding = "";
				if (this.decimals > 0)
					for (var i=0; i<this.decimals; i++) {
						padding = padding + "0";    
					}
				
				var decPart = (arParts.length > 1 ? arParts[1] : '');
				decPart = (decPart + padding).substr(0,this.decimals);
        
				if (decPart.length > 0)
					return intPart + DecimalSeparator + decPart;
				else
					return intPart;
          }
			else
				return value.toFixed(this.decimals);
    }

    /**
     * @returns {String} Returns the series label that corresponds to a given value, (or the value if no label exists).
     */
    this.getLabel=function(value) {
      var v=trunc(value), s, data;

      if (this._text && (v==value)) {

         data=this._text.data;

         if (data.x) v=data.x.indexOf(v);
     
     var li=chart.series.items, t, ser;

     //specific case: check for non-std sideAll labelling
     if ((li.length > 0) && (li[0] instanceof Tee.Bar) 
                && (li[0].stacked == "sideAll")) {
       s= data.labels[value];
     }
     else {       
      s= data.labels[v];
     }

         // Last resort, try to find labels from any series in axis:

         if (!s) {
       for(t=0; ser=li[t++];)
       if (ser!=this._text) {
       if (ser.visible && ser.associatedToAxis(axis)) {
         s=ser.data.labels[v];
         if (s) break;
       }
         }

           if (s === undefined)
              s="";
         }
      }
      else
      if (axis.dateTime) {
        if (Date.prototype.format)  // script: src/date.format.js
            s=new Date(value).format(this.dateFormat);
        else
            s=new Date(value).toDateString(); // fallback
      }
      else
        s = this.formatValueString(value);

      if (this.ongetlabel) {
        s=this.ongetlabel(value,s);
        this.format.font.prepare(); // <-- in case user code at ongetlabel event has changed the font.
      }

      return ""+s;
    }
    
   /**
    * @returns {Number} Returns the width in pixels of value converted to string.
    */
    this.width=function(value) {
    var oldFixDec = this.fixedDecimals; //check widest label when sizing 
    this.fixedDecimals = true;
      var tmpWidth = this.format.textWidth(this.getLabel(value));
    this.fixedDecimals = oldFixDec;
    return tmpWidth;
    }

  }

  this.labels=new Labels(chart,this);
  var f=this.labels.format.font;

  /**
   * Changes the axis maximum and minimum values
   * @param {Number} delta The positive or negative amount to scroll.
   */
  this.scroll=function(delta) {
    this.automatic=false;
    if (this.inverted) delta=-delta;
    this.minimum+=delta;
    this.maximum+=delta;
  }

  if (horizontal)  {
    f.textAlign="center";
    f.baseLine= otherSide ? "bottom" : "top";
  }
  else
  {
    f.textAlign= otherSide ? "left" : "right";
    f.baseLine="middle";
  }

  /**
   * @constructor
   * @class Format and parameters to display a grid of lines at axes increments
   * @param {Tee.Chart} chart The chart object this axis grid object belongs to.
   * @property {Tee.Format} format Visual properties to draw axis grids.
   * @property {Boolean} [visible=true] Determines if grid lines will be displayed or not.
   * @property {Boolean} [centered=false] Determines if grid lines are displayed at axis label positions or at middle between labels.
   * @property {Boolean} [lineDash=false] Draws grid lines using dash-dot segments or solid lines.
   */
  function Grid(chart) {
    this.chart=chart;
    var f=this.format=new Tee.Format(chart);
    f.stroke.fill="silver";
    f.stroke.cap="butt";
    f.fill="";
    this.visible=true;
    this.lineDash=false;
  }

  this.grid=new Grid(chart);

  /**
   * @constructor
   * @class Stroke parameters to draw small lines at axes labels positions
   * @param {Tee.Chart} chart The chart object this axis ticks object belongs to.
   * @property {Tee.Stroke} stroke Defines the visual attributes used to draw the axis ticks.
   * @property {Number} [length=4] The length of ticks in pixels.
   */
  function Ticks(chart) {
    this.chart=chart;
    this.stroke=new Stroke(chart);
    this.stroke.cap="butt";
    this.visible=true;
    this.length=4;
  }

  this.ticks=new Ticks(chart);

  this.innerTicks=new Ticks(chart);
  this.innerTicks.visible=false;

  var m=this.minorTicks=new Ticks(chart);
  m.visible=false;
  m.length=2;
  m.count=3;

  /**
   * @constructor
   * @augments Tee.Annotation
   * @class Text and formatting properties to display near axes
   * @param {Tee.Chart} chart The chart object this axis title object belongs to.
   * @param {Boolean} [transparent=true] Determines if axis title will be displayed or not.
   */
  function Title(chart) {
    Tee.Annotation.call(this,chart);
    this.padding=4;
    this.transparent=true;
    this.rotation=0;
    this.format.font.textAlign="center";

    this.drawIt=function(textAlign, x,y, rotation) {

      this.format.font.textAlign = textAlign;

      if (rotation === 0) {
         this.position.x=x;
         this.position.y=y;
         this.forceDraw();
      }
      else {
         var ctx = chart.ctx;
         ctx.save();

         ctx.translate(x,y);
         ctx.rotate(-rotation * Math.PI/180);

         this.position.x=0;
         this.position.y=0;

         this.forceDraw();
         ctx.restore();
      }
    }
  }

  Title.prototype=new Tee.Annotation();

  this.title=new Title(chart);
  if (!horizontal)
    this.title.rotation = otherSide ? 270:90;

  this.automatic=true;
  this.minimum=0;
  this.maximum=0;
  this.increment=0;
  this.log=false;

  this.startPos=0;
  this.endPos=0;

  this.start=0; // %
  this.end=100; // %

  this.axisSize=0;

  this.scale=0;
  this.increm=0;

  function calcWordWrap(f, s) {
    var r=0, w, ss=s.split(" "), t;

    for (t=0; t<ss.length; t++) {
      w=f.textWidth(ss[t]);
      if (w>r) r=w;
    }

    return r;
  }

  function toRadians(angle) {
      return angle * (Math.PI / 180);
  }

  /**
    * @returns {Number} Returns the approximated width in pixels of largest axis label.
  */
  this.minmaxLabelWidth = function (adjust) {

      var l = this.labels, f = l._text, w = 0, s, wordWrap;
      var la = this.labels, l;

      if (f !== null) {
            wordWrap = (l.wordWrap == "auto") || (l.wordWrap == "yes");

          la.format.font.prepare();

          for (var t = 0, le = f.data.labels.length; t < le; t++) {

              s = f.data.labels[t];
              if (this.ongetlabel)
                  s = this.ongetlabel(t, s);

              if (s)
                  w = Math.max(w, wordWrap ? calcWordWrap(l.format, s) : l.format.textWidth(s));
          }
      }
      else {
          var mi = this.roundMin(), ma = this.maximum;
          w = Math.max(l.width(mi), l.width(0.5 * (mi + ma)));

          w = Math.max(w, l.width(0.0000001));
          w = Math.max(w, l.width(ma));
      }

      //adjust for rotation (if any). Are we adjusting or spacing?
      if (l.rotation == 0) {
          if (((this.horizontal) && (adjust)) || ((!this.horizontal) && (!adjust))) {
              w = la.format.textHeight("Wj");
          }
      }
      else if (this.horizontal) {
          if (adjust) {
              w = Math.abs(Math.sin(toRadians(l.rotation)) * w);
          }
          else {
              w = Math.abs(Math.cos(toRadians(l.rotation)) * w);
          }
      }
      else {
          if (adjust) {
              w = Math.abs(Math.cos(toRadians(l.rotation)) * w);
          }
          else {
              w = Math.abs(Math.sin(toRadians(l.rotation)) * w);
          }
      }

      //guarantee minimum spacing
      if (w < la.format.textHeight("Wj")) w = la.format.textHeight("Wj");
      return w;
  }

  this.checkRange=function() {
    if ((this.maximum - this.minimum) < this.minAxisRange)
       this.maximum = this.minimum + this.minAxisRange;
  }

  this.checkMinMax=function() {
    var s=this.chart.series, h=this.horizontal;

    if (this.automatic) {
      this.minimum= h ? s.minXValue(this) : s.minYValue(this);
      this.maximum= h ? s.maxXValue(this) : s.maxYValue(this);
    
      this.checkRange();
    }
  }

 /**
  * @returns {Number} Returns if any visible series has less than n values.
  * Only called from Axis calcIncrement, to avoid axis label increments to be
  * smaller than series number of points.
  */
  function anySeriesHasLessThan(c, n) {
    var t, s, isY;

    for(t=0; s=c.chart.series.items[t++];) {
      if (s.visible && s.sequential) {
         isY=s.yMandatory;

         if ((isY && c.horizontal) ||
            ((! isY) && (! c.horizontal))) {
              if (s.associatedToAxis(c)) {
                if (s.count()<=n)
                   return true;
              }
         }
      }
    }

    return false;
  }

 /**
  * @returns {Number} Returns the next bigger value in the sequence 1,2,5,10,20,50...
  */
  function nextStep(value) {
    if (! isFinite(value)) return 1;
    else if (value>=10) return 10*nextStep(0.1*value);
    else if (value<1) return 0.1*nextStep(value*10);
    else return (value<2) ? 2 : (value<5) ? 5 : 10;
  }

 /**
  * @returns {Number} Returns the best appropriate distance between axis labels.
  */
  function calcIncrement(c, maxLabelSize) {
    if (c.maximum==c.minimum) return 1;
    else
    {
      var tmp=c.axisSize/maxLabelSize, less=anySeriesHasLessThan(c,tmp);
      tmp=Math.abs(c.maximum-c.minimum)/(tmp+1);
      return less ? Math.max(1,tmp) : nextStep(tmp);
    }
  }

  this.calcAxisScale=function() {
    var range=this.maximum-this.minimum;
    if (range===0) range=1;
    else
    if (this.log) range=Math.log(range);

    this.scale=this.axisSize/range;
  }

  this.calcScale=function()
  {
    var la=this.labels, l;

    la.format.font.prepare();
    l = this.minmaxLabelWidth(false);

    if (la.alternate) l*=0.5;

    l*=(1+(la.separation*0.02));

    this.increm = (this.increment===0) ? calcIncrement(this,l) : this.increment;

    if (this.increm<=0) this.increm=0.1;
	else if ((this.increm>0) && (this.increm<=0.00000001)) this.increm=0.00000001;
  }

 /**
  * @returns {Boolean} Returns the first visible series associated to this axis, or null if any.
  */
  this.hasAnySeries=function() {
    var li=this.chart.series.items, t, s, d, h;

    for(t=0; s=li[t++];) {
      // DB fix Sep-2013, empty series should not be considered:
      if (s.visible && s.associatedToAxis(this) && ( s.__alwaysDraw || (s.count()>0) ) ) {

        // Remember now if series "s" has date-time values:

        h=this.horizontal;
        if (s.yMandatory) h=!h;

        d= h ? s.data.values : s.data.x;
        this.dateTime=d && (d.length>0) && (d[0] instanceof Date);

        return s;
      }
    }

    return null;
  }

  this.drawAxis=function() {
    var t=this,
        f=t.format,
        c=t.chart.ctx,
        pos=t.axisPos,
        start=t.startPos,
        end=t.endPos;

    var rad=20*f.depth, r;

    if (this.chart.aspect.view3d && (rad>0)) {
       if (horizontal)
         r={x:start, y:pos-rad*0.5, width:end-start, height:rad};
       else
         r={x:pos-rad*0.5, y:start, width:rad, height:end-start};

       var old=this.z;
       f.z = old-f.depth*0.5;
       f.cylinder(r, 1, !horizontal);
       f.draw(c, null, r);
       f.z = old;
    }
    else
    {
      c.z=this.z;

      c.beginPath();

      if (horizontal) {
        c.moveTo(start, pos);
        c.lineTo(end, pos);
      }
      else
      {
        c.moveTo(pos, start);
        c.lineTo(pos, end);
      }

      f.stroke.prepare();
      c.stroke();
    }
  }

  this.drawGrids=function() {
    var c=this.chart.ctx, p, r=this.chart.chartRect,
        f=this.grid.format, x1,y1,x2,y2, v,
        vmin=this.roundMin();

    if (this.grid.centered) {
      var tmp=this.increm*0.5;
      if ((vmin-tmp)>=this.minimum)
         vmin-=tmp;
      else
         vmin+=tmp;
    }

    var a=this.chart.aspect, is3d=a.view3d, isOrtho=is3d && a.orthogonal,
        off3d = is3d ? 1:0;

    c.beginPath();

    if (horizontal) {
      y1=this.bounds.y - off3d;
      y2=otherSide ? r.getBottom()-1 : r.y+1;
    }
    else {
      x1=this.bounds.x + off3d;
      x2=otherSide ? r.x+1 : r.getRight()-1;
    }

    var oldpos, pos=-1;

    if (f.fill!=="") {
      v=vmin;

      var old=f.stroke.fill;
      f.stroke.fill="";

      while (v <= this.maximum) {
        p=this.calc(v);

        if ((pos % 2)===0)
          (horizontal) ? f.rectangle(oldpos,y2,p-oldpos,y1-y2) : f.rectangle(x1,oldpos,x2-x1,p-oldpos);

        oldpos=p;

        v += this.increm;
        pos++;
      }

      f.stroke.fill=old;
      c.fillStyle="";
    }

    v=vmin;

    if (isOrtho)
        if (horizontal) {
          y1-=a._orthoy;
          y2-=a._orthoy;
        }
        else
        {
          x1+=a._orthox;
          x2+=a._orthox;
        }

    var isCustomDash = f.stroke.dash && (!c.setLineDash) && (!c.mozCurrentTransform);

    c.z=is3d ? this.chart.walls.back.format.z - 0.01 : 0;

	while (v <= this.maximum) {

	  pos=this.calc(v); 

	  (horizontal) ? x1=x2=pos : y1=y2=pos;

	  if (isOrtho) {
		if (horizontal) {
		  x1+=a._orthox;
		  x2+=a._orthox;
		}
		else
		{
		  y1-=a._orthoy;
		  y2-=a._orthoy;
		}
	  }

	  // TODO: lineZ (3D grid sides)

	  if (is3d && (!this.otherSide) && c.lineZ)
		 c.lineZ(x1,y1,0,c.z);

	  if (isCustomDash)
		  dashedLine(c,x1,y1,x2,y2);
	  else
	  {
		c.moveTo(x1,y1);
		c.lineTo(x2,y2);
	  }

	  v += this.increm;
	}

    f.stroke.prepare();
    f.shadow.prepare(c);

    c.stroke();
  }

  function truncFloat(n) { return n - n % 1; }

 /**
  * @returns {Number} Returns the axis minimum value rounded according the axis increment distance.
  */
  this.roundMin=function() {
    // OLD: var v=trunc(this.minimum/this.increm);

    // NEW: Fix against rounding precision of "trunc" (|0) operator:

    if ((this.increm===0) || (!this.labels.roundFirst))
       return this.minimum;
    else
    {
      //var v = parseFloat(new Number(this.minimum/this.increm).toFixed(0));

      var v = truncFloat(this.minimum/this.increm);

      return this.increm * ((this.minimum<=0) ? v : (1+v));
    }
  }

  this.drawTicks=function(t,factor,mult) {

    var v = this.roundMin(), tl=1+t.length, tl2=1;

    if ((horizontal && otherSide) || ((!horizontal) && (!otherSide)) )
    {
      tl=-tl;
      tl2=-1;
    }

    tl*=factor;
    tl2*=factor;

    tl+=this.axisPos;
    tl2+=this.axisPos;

    var p, inc, n=1, cou=0;

    if (mult===0)
       inc=this.increm;
    else {
       n+=mult;
       inc=this.increm/n;
    }

    var c=this.chart.ctx;

    c.beginPath();

    while (v <= this.maximum) {

      if ((mult===0) || ((cou++ % n)!==0)) {
        p=this.calc(v);

        if (horizontal) {
          c.moveTo(p,tl2);
          c.lineTo(p,tl);
        }
        else
        {
          c.moveTo(tl2,p);
          c.lineTo(tl,p);
        }
      }

      v += inc;
    }

    t.stroke.prepare();

    t.z=this.z;
    c.z=t.z;

    c.stroke();
  }

  this.drawTitle=function() {
    var l=this.labels, tmpX, tmpY,
        titleBounds=this.title.bounds,
        rotation = this.title.rotation,
        //ctx=this.chart.ctx,
        textAlign="center";

    if (this.title.text!=="") {

      if (horizontal)
      {
       tmpY = this.title.padding;

       if (this.ticks.visible) tmpY += this.ticks.length;

       if (l.visible) {
         l.format.font.prepare();
         var h = this.maxLabelDepth;
         if (l.alternate) h*=2;
         tmpY +=h;
       }

       tmpX=this.startPos+this.axisSize*0.5;

       if (this.otherSide) tmpY = -tmpY - titleBounds.height;

       tmpY = this.axisPos + tmpY;

       if (rotation===0) {
         tmpX -= (titleBounds.width*0.5);
       }
       else
       {
         tmpX += titleBounds.height * (this.otherSide ? -0.5 : 0.5);
         if (!this.otherSide) tmpY += 1.5*titleBounds.height;
         textAlign= this.otherSide ? "near" : rotation===270 ? "near" : "far";
       }

      }
      else
      {
       tmpX = this.title.padding;

       if (this.ticks.visible) tmpX += this.ticks.length;

       if (l.visible) {
     var w = l.maxWidth;
         if (l.alternate) w*=2;
         tmpX += w;
       }

       tmpY = this.startPos + 0.5*this.axisSize;

       if (rotation===0) {
         tmpX = this.axisPos + (this.otherSide ? tmpX : -tmpX);
         tmpY -= 0.5 * titleBounds.height;
         textAlign= this.otherSide ? "near" : "far";
       }
       else {
         tmpX += titleBounds.height;
         tmpX = this.axisPos + (this.otherSide ? tmpX : -tmpX);
         tmpY += titleBounds.width * (this.otherSide ? -0.5 : 0.5);
       }

      }

      this.title.drawIt(textAlign, tmpX, tmpY, rotation);

//      chart.ctx.rect(tmpX,tmpY,titleBounds.width,titleBounds.height);
//      chart.ctx.stroke();
    }
  }

  this.rotatedWidth = function(l, w) {
      return Math.abs(Math.sin(toRadians(l.rotation)) * w);
  }

  this.drawLabel=function(value,r) {
    var l=this.labels, s=l.getLabel(value);

    /*
    if (this.firstSeries && (this.firstSeries.notmandatory==this))
       s=l.getLabel(this.firstSeries,value);
    else
       s=l.getLabel(null,value);
    */

    r.width=l.format.textWidth(s);
    if (r.width>l.maxWidth)
        l.maxWidth=r.width;

    if (l.rotation == 0)
      (this.horizontal) ? r.x-=0.5*r.width : r.y+=r.height*0.5;
    else
    {
       var c=this.chart.ctx;
       c.save();
       c.translate(r.x, r.y);
       c.rotate(-Math.PI*l.rotation/180);
       c.textAlign = "right";

       if (this.horizontal) {
           r.x = -this.rotatedWidth(l, r.width) * 0.5;
           r.y = -(this.rotatedWidth(l, r.height) * 0.5)+3;
       }
       else {
           r.x = -2;
           r.y = -8;
       }
    }

    if (l.format.font.textAlign=="right")
      r.x-=r.width;

    l.format.z=this.z * this.chart.walls.back.format.z;

    l.format.drawText(r, s);

    if (l.rotation!==0)
      this.chart.ctx.restore();
  }

  this.drawLabels=function() {
	var v=this.roundMin(), r=new Rectangle(), c=this.axisPos, l=this.labels;
    //var v=(this.minimum<this.maximum) ? this.roundMin() : this.minimum, r=new Rectangle(), c=this.axisPos, l=this.labels;

    l.maxWidth=0;
    l.format.font.prepare();

    var tl= this.ticks.visible ? this.ticks.length : 0;

    tl+=l.padding;

    if (this.horizontal)
      (this.otherSide) ? c -=tl : c +=tl;
    else
      (this.otherSide) ? c +=tl : c -=tl;

    var oldc=c;

    r.height=l.format.textHeight("Wj");
    
    var alter = l.alternate,
    w = alter ? (this.horizontal ? -this.minmaxLabelWidth(true) : this.minmaxLabelWidth(true)) : 0, p;

    // TODO: if ongetlabels .... (loop for user-custom labels position and text)

    while (v <= this.maximum) {
      p=this.calc(v);

      if (this.horizontal)
      {
        r.x=p;
        r.y=c; // -r.height*0.5;
      }
      else
      {
        r.x=c;
        r.y=p-r.height*0.5;
      }

      if (alter)
         c= ( c==oldc ) ? this.otherSide ? oldc+w : oldc-w : oldc;

      this.drawLabel(v,r);
      v += this.increm;
    }

  }

 /**
  * @returns {Number} Returns the position in pixels for a given value, using the axis scales.
  */
  this.calc=function(value) {
    var p;

    if (value !== value) // isNaN() <-- slow
      p=0;
    else
    if (this.log)
    {
      value-=this.minimum;
      p=(value<=0) ? 0 : Math.log(value) * this.scale;
    }
    else
      p=(value - this.minimum) * this.scale;

    if (this.horizontal)
       return this.inverted ? this.endPos - p : this.startPos + p;
    else
       return this.inverted ? this.startPos + p : this.endPos - p;
  }

 /**
  * @returns {Number} Returns the axis value for a given position in pixels.
  */
  this.fromPos=function(p) {
    var i = this.horizontal;
    if (this.inverted) i=!i;
    return this.minimum + ((i ? (p-this.startPos) : (this.endPos-p)) /this.scale);
  }

  this.fromSize=function(p) {
    return (p/this.scale);
  }
    /**
    * @returns {Number} Returns the index of a given position in pixels (only works in bottom axes).
    */
  this.fromSizeCalcIndex=function(p) {
	  var  index = -1;
	  if(this.dateTime==true){

		  var i=0,inc=0,actualValue=((this.maximum-this.minimum)/(this.axisSize)*p + this.minimum);
		
		if(this.chart.series.items[0].data.x.length>1){
			inc = this.chart.series.items[0].data.x[1].getTime() - this.chart.series.items[0].data.x[0].getTime();
		}
		while(index==-1 && i<(this.chart.series.items[0].data.x.length)){
	    	if(this.chart.series.items[0].data.x[i].getTime() + (inc/2) > actualValue && actualValue + inc/2 > this.chart.series.items[0].data.x[i].getTime()){
	    		index=i;
	    	}
	    	else i++;
	    }
	  }
	  else{
		  index = (p/this.scale)+this.minimum;
		  if(this.chart.series.items[0].data.values.length<index || index<-0.5) index=-1;
	  }
    return (index);
  }
 /**
  * @returns {Number} Returns the size in pixels of a given value, using the axis scales.
  */
  this.calcSize=function(value) {
    return Math.abs(this.calc(value)-this.calc(0));
  }

 /**
  * @param {Number} p1 Position in pixels to be axis minimum.
  * @param {Number} p2 Position in pixels to be axis maximum.
  */
  this.calcMinMax=function(p1,p2) {
    this.automatic=false;

    var a=this.fromPos(p1), b=this.fromPos(p2), tmp;
    if (a>b) { tmp=a; a=b; b=tmp; }

    this.minimum=a;
    this.maximum=b;
  
    this.checkRange();
  }
  
  this.minAxisRange = 0.0000000001;

  this.setMinMax=function(min,max) {
    this.automatic=false;
  
    this.minimum=min;
    this.maximum=max;
  
    this.checkRange();
  }
}

Axis.adjustRect=function() {

  if (!this.visible) return;

  var s=0, l=this.labels,
      b=this.chart.chartRect,
      ti=this.title,
      hasTitle;

  // Recalc firstSeries even if this axis is not visible:
  this.firstSeries=this.hasAnySeries();

  if (this.firstSeries && this.visible) {

    this.checkMinMax();

    l.checkStyle();

    hasTitle = ti.shouldDraw();
    if (hasTitle)
       ti.resize();

    if ((b.automatic) && (!this.custom)) {

      if (l.visible) {
        l.format.font.prepare();
        s = this.minmaxLabelWidth(true);
        this.maxLabelDepth = s;

        if (l.alternate) s*=2;
        s+=l.padding;
      }

      if (this.ticks.visible)
        s+=this.ticks.length;

      if (hasTitle)
        s+=ti.bounds.height; //+ti.padding;

      if (this.horizontal)
         (this.otherSide) ? b.setTop(b.y + s) : b.height -= s;
      else
         (this.otherSide) ? b.width -=s : b.setLeft(b.x+s);
    }
  }
}

Axis.prototype.setPos=function(a,b) {
  this.startPos=a+(this.start*b*0.01);
  this.endPos=a+(this.end*b*0.01);
  this.axisSize=this.endPos-this.startPos;
}

/**
 * Axis rect calcs. Returns current ChartRect.
 */
Axis.calcRect=function() {
  if (!this.firstSeries) return;

  this.checkMinMax();

  // Calc bounds
  var b=this.chart.chartRect, bo=this.bounds, h=this.horizontal;

  if (h) {
    bo.y= this.otherSide ? b.y : b.y+b.height;
    bo.width=b.width;
    this.setPos(b.x,b.width);
  }
  else
  {
    bo.x= this.otherSide ? b.x+b.width : b.x;
    bo.height=b.height;
    this.setPos(b.y,b.height);
  }

  this.calcAxisScale();

  var tmp=this.chart.series;

  //specific case: check for non-std sideAll scaling
  if (tmp.items.length > 0) {
    if (this.automatic) {
      var s=tmp.items[0];

      if ( (s instanceof Tee.Bar) &&
           (s.notmandatory == this) &&
           (s.stacked == "sideAll") )
      {
         s.notmandatory.minimum = -0.5;
         s.notmandatory.maximum = s.countAll(false)-0.5;
      }
    }
  }

  // Calculate axis margins:
  if (this.automatic) {
    var s=this.chart.series, m = h ? s.horizMargins() : s.vertMargins(),
        hasX=(m.x>0), hasY=(m.y>0);

    if (hasX)
       this.minimum-=this.fromSize(m.x);

    if (hasY)
       this.maximum+=this.fromSize(m.y);

    if (hasX || hasY)
       this.calcAxisScale();
  }

  this.calcScale();

  // Calc pos

  var v = (h ? b.height : b.width) * this.position * 0.01,
      w = this.chart.walls,
      wallsize=0,
      haswalls=w.visible && this.chart.aspect.view3d;

  if (h) {
    if (haswalls && w.bottom.visible) wallsize=w.bottom.size;
    this.axisPos= this.otherSide ? b.y+ v : b.getBottom() + wallsize - v;
  }
  else {
    if (haswalls && w.left.visible) wallsize=w.left.size;
    this.axisPos= this.otherSide ? b.getRight() - v : b.x - wallsize + v;
  }
}

Axis.draw=function() {
  if (this.visible && this.firstSeries) {

    this.z = this.otherSide ? this.chart.walls.back.format.z : 0;

	//guarantee centre label for one-value axes.
    if (Math.abs(this.maximum-this.minimum) <= 0.000000001 /*widen beyond this.minAxisRange*/)
	{
	   if (Math.abs(this.minimum) < 0.000000001) 	
		 this.setMinMax(this.minimum-0.00000001,this.maximum+0.00000001);
	   else
	     this.setMinMax(this.minimum-(this.minimum/10000000),this.maximum+(this.maximum/10000000));
	   if (this.chart != null)
	     this.chart.draw();
	}
	
    if (this.format.stroke.fill!=="")
       this.drawAxis();

    // Protect against infinite loop:
    if ( (this.roundMin()+(1000*this.increm)) > this.maximum ) {

      if (this.grid.visible) this.drawGrids();
      if (this.ticks.visible) this.drawTicks(this.ticks,1,0);
      if (this.innerTicks.visible) this.drawTicks(this.innerTicks,-1,0);
      if (this.minorTicks.visible) this.drawTicks(this.minorTicks,1,Math.max(0,this.minorTicks.count));
      if (this.labels.visible) this.drawLabels();
    }

    if (this.title.shouldDraw())
        this.drawTitle();
  }
}


/**
 * @memberOf Tee.Chart
 * @constructor
 * @class Displays a list of chart series data
 * @param {Tee.Chart} chart The parent chart this legend object belongs to.
 * @property {Number} align Legend position as offset % of chart size. Default 0.
 * @property {Number} padding Percent of chart size pixels to leave as margin from legend.
 * @property {Boolean} transparent Determines to draw or not the legend background.
 * @property {Tee.Format} format Formatting properties to draw legend background and items.
 * @property {Tee.Format} hover Limited Formatting properties for mouseover hover of text. Offers color and enabled.
 * @property {Tee.Annotation} title Draws a title on top of legend.
 * @property {Rectangle} bounds Defines the legend position in pixels.
 * @property {String} position Automatic position legend ("left", "top", "right" or "bottom").
 * @property {Boolean} visible Defines to draw or not the legend.
 * @property {Boolean} inverted When true, legend items are displayed in inverted order.
 * @property {Boolean} fontColor Determines to fill each legend item text using series or point colors.
 * @property {Stroke} dividing Draws a line between legend items.
 * @property {Symbol} symbol Properties to draw a small indicator next to each legend item.
 * @property {String} legendStyle Determines to draw all visible series names or first visible series points. ("auto", "series", "values").
 * @property {String} textStyle What to draw at each legend item for series values: "auto", "valuelabel", "label", "value", "percent", "index", "labelvalue", "percentlabel"
 */
function Legend(chart)
{
  this.chart=chart;

  this.transparent=false;

  var f=this.format=new Tee.Format(chart);
  f.fill="white";
  f.round.x=8;
  f.round.y=8;
  f.font.baseLine="top";
  f.shadow.visible=true;

  f.z=0;
  f.depth=0.05;

  this.title=new Tee.Annotation(chart);
  this.title.transparent=true;

  this.bounds=new Rectangle();
  this.position="right";  // left, top, right, bottom, custom
  this.visible=true;
  this.inverted=false;

  this.padding=5; // margin from legend to axes edge, percent of legend size

  this.margin=5; // margin from legend to chart edge, percent of legend size

  this.align=0; // % default = 0

  this.fontColor=false;

  var d=this.dividing=new Stroke(chart);
  d.fill=""; //"rgb(220,220,220)";
  d.cap="butt";

  this.over=-1;
  
  /**
   * @constructor
   * @public
   * @class Displays a symbol at chart legend for each legend item
   * @param {Tee.Chart} chart The parent chart this legend symbol object belongs to.
   * @property {String} string Draws a rectangle shape or a line as a symbol.
   */
  function Symbol(chart) {
    this.chart=chart;

    var f=this.format=new Tee.Format(chart),
        s=f.shadow;

    s.visible=true;
    s.color="silver";
    s.width=2;
    s.height=2;

    f.depth=0.01;

    this.width=8;
    this.height=8;
    this.padding=8; // "100%"

    this.style="rectangle"; // "line"
    this.visible=true;

    function tryHover(series,index) {
      if (series.hover.enabled) {
        var sv=chart.legend.showValues();

        if ((sv && (series.over==index)) ||
            ((!sv) && (series.over>=0)))
               return series.hover;
      }

      return null;
    }

    this.draw=function(series,index,x,y) {
      var c=chart.ctx, fhover=tryHover(series, index), old=f.fill, olds=f.stroke;

      f.fill= series.legendColor(index);

      c.z=-0.01;

      switch (this.style) {
        case "rectangle":
          if (fhover)
            f.stroke=fhover.stroke; // ??

          if (this.chart.aspect.view3d) {
            var r={x:x, y:y-this.height*0.5-1,width:this.width,height:this.height};
  
            old=f.z;
  
            var oldz=c.z;
            
            f.z=c.z-f.depth;
  
            f.cube(r);
            f.draw(c,null,r);
  
            f.z=old;
            c.z=oldz;
          }
          else
            f.rectangle(x,y-this.height*0.5-1,this.width,this.height);
          break;
        case "triangle":
          if (fhover)
            f.stroke=fhover.stroke;
          
          f.polygon([new Point(x+this.width*0.5,y-this.height*0.5),
            new Point(x+this.width,y+this.height*0.5),
            new Point(x,y+this.height*0.5)]);

          break;
        case "ellipse":
          if (fhover)
            f.stroke=fhover.stroke;
          
          f.ellipse(x+this.width*0.5,y,this.width,this.height);
          break;
        default: //"line"
          c.beginPath();
          c.moveTo(x,y);
          c.lineTo(x+this.width,y);
  
          if (fhover)
              fhover.stroke.prepare();
          else
              f.stroke.prepare(f.fill);
  
          c.stroke();
          break;
      }

      f.fill=old;
      f.stroke=olds;
    }
  }

  /*
   * Contains properties to paint a visual representation near each legend item.
   */
  this.symbol=new Symbol(chart);

  this.itemHeight=10;
  this.innerOff=0;

  this.legendStyle="auto"; // auto, series, values, ...
  this.textStyle="auto"; // valuelabel, label, value, percent, index, labelvalue, percentlabel
  
  this.hover=new Tee.Format(chart);
  this.hover.enabled=true;
  this.hover.font.fill="red";

 /**
  * @returns {Number} Returns the width in pixels of legend items, including text and symbols if visible.
  */
  this.totalWidth=function() {
    var w=itemWidth+8, s=this.symbol;
    if (s.visible) w+=s.width+s.padding;
    return w;
  }

  var titleHeight=0;

  this._space=function() {
    return this.bounds.y+titleHeight+(this.margin*chart.bounds.height*0.01);
  }

 /**
  * @returns {Number} Returns the maximum number of vertical rows using the available height.
  */
  this.availRows=function() {
    var h=this._space()+(this.itemHeight*0.5);
    if (!h) h=0;
    return trunc( (chart.bounds.getBottom()-h) / this.itemHeight);
  }

  function seriesCount(legend) {
    var ss=chart.series;
    return legend.showHidden? ss.items.length : ss.visibleCount();
  }

 /**
  * @returns {Number} Returns the number of legend items that should be displayed.
  */
  this.itemsCount=function() {
    var ss=chart.series,
        result=seriesCount(this),
        rr=chart.bounds;

    if (result===0) return 0;

    var st=this.legendStyle;

    if ((st==="values") && (result>0))
       result=ss.firstVisible().legendCount();
    else
    {
      if (((st==="auto") && (result>1)) || (st==="series")) {
        var t;
        for(t=0; t<ss.items.length; t++)
          if (!ss.items[t].legend.visible)
            result--;
    }
      else
      if (result==1)
        result=ss.firstVisible().legendCount();
    }

    if (this.isVertical()) {
      if ((0.5+result)*this.itemHeight > (rr.height-this._space()))
         result=this.availRows();
    }
    else
    {
      this.rows=1;

      var total=this.totalWidth(), pad=this.calcPadding(rr);

      var chartW=rr.width-2*pad;

      if (result*total > chartW) {
         var w=rr.x+pad;
         if (!w) w=0;

         this.perRow=trunc(chartW / total);

         if (result > this.perRow) {
           this.rows=1+trunc(result / this.perRow);

           if (this.rows * this.itemHeight > rr.height-this.bounds.y) {
             this.rows=this.availRows();
             result=this.rows * this.perRow;
           }
         }
      }
      else
        this.perRow=result;
    }

    return result;
  }

 /**
  * @returns {Boolean} Returns if legend shows series titles or a series values.
  */
  this.showValues=function() {
    var s=this.legendStyle;
    return (s=="values") || ((s=="auto") && (seriesCount(this)==1));
  }

 /**
  * @returns {String} Returns the index'th legend text string.
  */
  this.itemText=function(series,index) {
    var res=series.legendText(index,this.textStyle,false,true);
    return this.ongettext ? this.ongettext(this,series,index,res) : res;
  }

  this.calcItemPos=function(index, pos) {
    var i=this.itemHeight, b=this.bounds;
    pos.x=b.x;
    pos.y=b.y+this.innerOff;

    if (this.isVertical()) {
      pos.x += b.width - 6 - this.innerOff;
      pos.y += (i*0.4) + (index*i) + titleHeight;
    }
    else
    {
      pos.x += this.innerOff + (1+(index % this.perRow)) * this.totalWidth();
      pos.y += (i * (trunc(index/this.perRow) + 0.25));
    }
  }

  this.calcItemRect=function(index, r) {
    var i=this.itemHeight, b=this.bounds;
    r.height=i;
    r.x=b.x;
    r.y=b.y;

    if (this.isVertical()) {
      r.width=b.width;
      r.y += (i*0.4) + (index*i) + titleHeight;
    }
    else
    {
      r.width=this.totalWidth();
      r.x += this.innerOff + ((index % this.perRow) * r.width);
      r.y += (i * (trunc(index/this.perRow) + 0.25));
    }
  }

  var rMouse=new Rectangle();

  this.mousedown=function(p) {
    if (this.onclick && (this.over!==-1)) {

      if (this.showValues())
        this.onclick(chart.series.firstVisible(), this.over);
      else {
        var ss=chart.series.items, l=ss.length, c=0;
        for (var t=0; t<l; t++)
          if (this.showHidden || ss[t].visible) {
            if (c==this.over) {
               this.onclick(ss[t],-1);
               break;
            }
            else c++;
          }
      }

      return true;
    }

    return false;
  }

  this.mousemove=function(p) {
    var n=this.over;

    if (this.bounds.contains(p)) {
      var c=this.itemsCount();
      for (var t=0; t<c; t++) {
        this.calcItemRect(t,rMouse);
        if (rMouse.contains(p)) {
          n=t;
          break;
        }
      }
    }
    else
      n=-1;

    if (n!=this.over) {
      if (this.onhover)
         this.onhover(this.over,n);

      this.over=n;

      var o=this.chart;
      window.requestAnimFrame(function() {o.draw()});
    }

    if (this.onclick)
       this.chart.newCursor= (n===-1) ? "default" : "pointer";
  }

  this.drawSymbol=function(series,index,itemPos) {
    var s=this.symbol;

    s.draw(series,index,itemPos.x-itemWidth - s.width-s.padding,
                                  itemPos.y+(this.itemHeight*0.4));
  }

  var itemPos={x:0,y:0}, r=new Rectangle(), aligns;
  
  this.drawItem=function(text,series,index,isSeries) {

    var vertical=this.isVertical();

    this.calcItemPos(index,itemPos);

    r.x=itemPos.x;
    r.y=itemPos.y;

    if (vertical)
      r.y -= this.chart.isMozilla? 0 : 2;
    else
    if (this.chart.isMozilla)
      r.y++;
    else
      r.y--;

    var old=f.font.fill;

    if (this.over==index)
      f.font.fill= this.hover.enabled ? this.hover.font.fill : old;
    else
    if (this.fontColor)
      f.font.fill= this.showValues() ? series.legendColor(index) : series.format.fill;
    else
    if (!series.visible)
      f.font.fill="silver";

    var c=this.chart.ctx;

    if (isSeries) {
      f.font.textAlign="start";
      r.x -= itemWidths[0];
      c.textAlign=f.font.textAlign;
      f.drawText(r, text);
    }
    else
    {
      if (!(text instanceof Array))
         text=[text];

      if (vertical) {
        var l=text.length, oldW=r.width, sep=f.textWidth(" ");
        while(l--) {

          f.font.textAlign= aligns[l] ? "start" : "end";
          r.x -= itemWidths[l];

          c.textAlign=f.font.textAlign;
          f.drawText(r, text[l]);

          r.width -= itemWidths[l]+sep;
        }
        r.width=oldW;
      }
      else
      {
        f.font.textAlign= "start";
        r.x -= itemWidth;
        c.textAlign=f.font.textAlign;
        f.drawText(r, text.join(" "));
      }

    }

    f.font.fill=old;

    var hassymbol=(!series.isColorEach) || this.showValues();

    if (this.symbol.visible && hassymbol)
      this.drawSymbol(series,index,itemPos);

    if ((index>0) && (this.dividing.fill!==""))
    {
      var b=this.bounds;
      c.beginPath();

      if (this.isVertical()) {
        c.moveTo(b.x,r.y-2);
        c.lineTo(b.getRight(),r.y-2);
      }
      else
      {
        var xx=r.x - itemWidth -4, sy=this.symbol;
        if (sy.visible) xx-= (sy.width+sy.padding);
        c.moveTo(xx, b.y);
        c.lineTo(xx, b.getBottom());
      }

      this.dividing.prepare();
      c.stroke();
    }
  }

 /**
  * @returns {Boolean} Returns if index'th series is visible and has been displayed at legend.
  */
  this.drawSeries=function(index,order) {
    var s=chart.series.items[index];
    if ((this.showHidden || s.visible) && s.legend.visible) {
      this.drawItem(s.titleText(index),s,order,true);
      return true;
    }
    else
      return false;
  }

  this.draw=function() {
    var c=this.itemsCount(), len, t, ti=this.title, ctx=chart.ctx, old,
        ft=this.format.transparency,
        vertical=this.isVertical();

    if (c>0) {

      var groups=ctx.beginParent;
      this.visual = groups ? ctx.beginParent() : null;

      f.cube(this.bounds); //avoids first Legend item being dropped from format in WebGL transparent Legends
      
      if (!this.transparent) {
        f.draw(ctx, null, this.bounds);
      }

      if (ft>0) {
        old=ctx.globalAlpha;
        ctx.globalAlpha=(1-ft)*old;
      }

      if (vertical && (titleHeight>0)) {
        ti.bounds.x=this.bounds.x-4;
        ti.bounds.y=this.bounds.y;
        ti.doDraw();
      }

      f.font.prepare();

      r.width=itemWidth;
      r.height=this.itemHeight;
      
      if (this.showValues()) {

        var s=chart.series.firstVisible(), order=0;
        len=c;

        switch (this.textStyle) {
          case "auto":
          case "percentlabel":
          case "valuelabel":  aligns=[false,true]; break;
          case "labelpercent":
          case "labelvalue": aligns=[true,false]; break;
          case "label": aligns=[true]; break;
          default: aligns=[false]; break;
        }

        if (this.inverted)
        while(len--)
          this.drawItem(this.itemText(s,len),s,order++);
        else
        for(t=0; t<len; t++)
          this.drawItem(this.itemText(s,t),s,t);
      }
      else
      {
        len=chart.series.count();
        if (vertical) len=Math.min(len,this.availRows());
        c=0;

        aligns=[true];

        if (this.inverted)
        while(len--) {
          if (this.drawSeries(len,c)) c++;
        }
        else
        for(t=0; t<len; t++)
          if (this.drawSeries(t,c)) c++;
      }

      if (ft>0)
         ctx.globalAlpha=old;

      if (groups)
         ctx.endParent();
    }
  }

  var itemWidth, itemWidths;

 /**
  * @returns {Number} Returns the maximum width in pixels of all legend items text.
  */
  this.calcWidths=function() {
    var s, t, d, c, l=chart.series, text;

    itemWidth=0;
    itemWidths=[0,0];

    if (this.showValues()) {
      s=l.firstVisible();
      c=this.itemsCount();

      for(t=0; t<c; t++) {
        text=this.itemText(s,t);
        if (!(text instanceof Array)) text=[text];

        if (text.length>0) {
          d=f.textWidth(text[0]);
          if (d>itemWidths[0]) itemWidths[0]=d;

          if (text.length>1) {
            d=f.textWidth(text[1]);
            if (d>itemWidths[1]) itemWidths[1]=d;
          }
        }
      }
    }
    else
    {
      c=l.count();

      for(t=0; t<c; t++) {
        s=l.items[t];

        if (this.showHidden || s.visible) {
          d=f.textWidth(s.titleText(t));
          if (d>itemWidths[0]) itemWidths[0]=d;
        }
      }
    }

    itemWidth=itemWidths[0]+itemWidths[1];
  }

 /**
  * @returns {Number} Returns the distance in pixels between legend and chart bounds.
  */
  this.calcPadding=function(r) {
    // var p=this.padding, n = parseFloat( (p.indexOf("%") == -1) ? p : p.substring(0,p.length-1));

    return 0.01 * this.padding * (this.isVertical() ? r.width : r.height );
  }

 /**
  * @returns {Boolean} Returns if legend orientation is vertical.
  */
  this.isVertical=function() {
    var p=this.position;
    return (p==="right") || (p==="left");
  }

  this.calcrect=function() {
    var titleWidth=0, t=this.title, r=chart.chartRect, a=this.align, b=this.bounds,
        vert=this.isVertical();

    if (t.shouldDraw()) {
      t.resize();
      titleHeight=t.bounds.height;
      titleWidth=t.bounds.width;
    }
    else
      titleHeight=0;

    if (vert)
       b.y = (a===0) ? r.y : chart.bounds.height*a*0.01;
    else
       b.x = (a===0) ? r.x : chart.bounds.width*a*0.01;

    f.font.prepare();
    this.itemHeight=f.textHeight("Wj");

    this.calcWidths();

    var pad=this.calcPadding(r), s, co=this.itemsCount();

    if (vert) {
      s= this.symbol.visible ? this.symbol.width+this.symbol.padding : 0;

      b.width = Math.max(titleWidth, 12+itemWidth + s);

      b.height= (0.5+co) * this.itemHeight + titleHeight;

      if ((b.width-6)>titleWidth)
         t.bounds.width=b.width-6;
    }
    else
    {
      b.width = pad + this.perRow * this.totalWidth();
      b.x += (0.5 *(r.width - b.width));
      b.height= this.itemHeight * (this.rows+0.25);
    }

    if (f.stroke.fill!=="") {
      s= +f.stroke.size;
      if (s>1) {
        b.width+=s;
        b.height+=s;
        this.innerOff=s*0.5;
      }
    }

    // Resize chartRect:

    if (co===0) return;

    if (this.position==="right")
    {
      b.x = r.getRight() - b.width - (this.margin*b.width*0.01);
      if (r.automatic)
          r.setRight(Math.max(r.x,b.x-pad));
    }
    else
    if (this.position==="left")
    {
      b.x = r.x;
      if (r.automatic)
          r.setLeft(b.x+b.width+pad);
    }
    else
    if (this.position==="top")
    {
      b.y = r.y + pad;
      if (r.automatic)
          r.setTop(b.getBottom()+pad);
    }
    else
    {
      b.y = r.getBottom() - b.height - pad;
      if (r.automatic)
          r.setBottom(b.y - pad);
    }
  }
}

/**
 * @memberOf Tee.Series
 * @constructor
 * @augments Tee.Annotation
 * @class Formatting properties to display annotations near series data points
 * @param {Tee.Series} series The parent series this marks object belongs to.
 * @param {Tee.Chart} chart The parent chart this marks object belongs to.
 * @property {Tee.Format} arrow Displays a line from mark to corresponding series point.
 * @property {Number} [arrow.length=10] Distance in pixels from mark to corresponding series point.
 * @property {Boolean} [arrow.underline=false] Draws a line under mark text.
 * @property {String} [style="auto"] Determines the text to display inside mark.
 * @property {Boolean} visible Defines if series marks are to be displayed or not.
 * @property {Number} [drawEvery=1] Controls how many marks to skip in between. (Useful for large series).
 */
function Marks(series,chart) {
  Tee.Annotation.call(this,chart);
  this.series=series;

  var arrow=this.arrow=new Tee.Format(chart);
  arrow.length=10;
  arrow.underline=false;
  arrow.z=0.5;
  arrow.depth=0.1;

  this.style = "auto"; // "value", "percent", "label", "valuelabel", "percentlabel" ...

  this.drawEvery=1;
  this.visible=false;
  this.format.z=0.5;

  /*
   * @private
   */
  this.setChart=function(chart) {
    this.chart=chart;
    this.format.setChart(chart);
    arrow.setChart(chart);
  }

  this.drawPolar=function(center,radius,angle,index) {
    var text=this.series.markText(index),
        px=center.x+Math.cos(angle)*radius,
        py=center.y+Math.sin(angle)*radius,
        c=this.chart.ctx;

    this.text=text;
    this.resize();

    var b=this.bounds, p2x, p2y, p=this.position;

    radius+=arrow.length;
    p2x=center.x+Math.cos(angle)*radius,
    p2y=center.y+Math.sin(angle)*radius;

    if (p2x-b.width<0)
      p2x-=(p2x-b.width-4);

    if (Math.abs(p2x-center.x)<b.width)
      p.x=p2x-b.width*0.5;
    else
      p.x= (p2x<center.x) ? p2x-b.width : p2x;

    if (Math.abs(p2y-center.y)<b.height)
      p.y=p2y-b.height*0.5;
    else
      p.y= (p2y<center.y) ? p2y-b.height : p2y;

    c.beginPath();
    c.moveTo(px,py);
    c.lineTo(p2x,p2y);

    if (arrow.underline) {
      if ((p2y<=p.y) || (p2y>=(p.y+b.height))) {
        c.moveTo(p.x,p2y);
        c.lineTo(p.x+b.width,p2y);
      }
    }

    arrow.stroke.prepare();
    c.stroke();

    this.draw();
  }

  this.canDraw=function(x,y,index,inverted) {
    var s = this.series.markText(index);

    if (s && (s!=="") && ( this.showZero || (s!=="0") ) ) {
      this.text=s;
      this.resize();

      var factor= inverted ? -1 : 1, r=this.bounds, m=this.series.yMandatory;

      if (m) {
        r.x=x-(r.width*0.5);
        r.y=y-factor*(arrow.length+ (inverted ? 0 : r.height));
      }
      else
      {
        r.x=x+factor*arrow.length;
        if (inverted) r.x-=r.width;
        r.y=y-(r.height*0.5);
      }

      this.position.x= r.x;
      this.position.y= r.y;

      return true;
    }
    else
      return false;
  }

  this.drawMark=function(x,y,index,inverted) {

    if (this.canDraw(x,y,index,inverted)) {

      this.draw();

      var r=this.bounds, m=this.series.yMandatory;

      var rbot=inverted ? r.y : r.getBottom(), c=this.chart.ctx,
          is3d = this.chart.aspect.view3d;

      if (m) {

        if (is3d) {
           var rr={ x:x-3, y:rbot, width:6, height: y-rbot};

           arrow.z=this.format.z-arrow.depth*0.5;

           arrow.cylinder(rr, 1, true);
           arrow.draw(this.chart.ctx, null, rr);

           return;
        }
        else
        {
          c.beginPath();

          c.moveTo(x,rbot);
          c.lineTo(x,y);

          if (arrow.underline) {
            c.moveTo(r.x,rbot);
            c.lineTo(r.x+r.width,rbot);
          }
        }
      }
      else
      {
        var py=r.y+(r.height*0.5);

        c.beginPath();
        c.moveTo(x,py);

        if (inverted) r.x+=r.width;
        c.lineTo(r.x,py);

        if (arrow.underline) {
          c.moveTo(r.x,r.y+r.height);
          c.lineTo(r.x+ (inverted ? -r.width : r.width),r.y+r.height);
        }
      }

      arrow.stroke.prepare();
      c.stroke();
    }
  }
}

Marks.prototype=new Tee.Annotation();

/**
 * @returns {Number} Returns the sum of all values in the array or typed-array parameter.
 * @param {Array|ArrayBuffer} a The array or typed-array to sum.
 */
/*
function ArraySum(a){
  var sum=0, len=a.length;
  while(len--) sum+=a[len];
  return sum;
}
*/

/**
 * @returns {Number} Returns the sum of all absolute values in the array or typed-array parameter.
 * @param {Array|ArrayBuffer} a The array or typed-array to do absolute sum.
 */
function ArraySumAbs(a){
  var sum=0, len=a.length;
  while(len--) sum+= (a[len]>0 ? a[len] : -a[len]);
  return sum;
}

if (!('map' in Array.prototype)) {
  Array.prototype.map= function(mapper, that /*opt*/) {
    var other= new Array(this.length);
    for (var i= 0, n= this.length; i<n; i++)
      if (i in this)
        other[i]= mapper.call(that, this[i], i, this);
    
    return other;
  };
}
if (!('filter' in Array.prototype)) {
  Array.prototype.filter= function(filter, that /*opt*/) {
    var other= [], v;
    for (var i=0, n= this.length; i<n; i++)
      if (i in this && filter.call(that, v= this[i], i, this))
        other.push(v);

    return other;
  };
}
  
/**
* removes nulls that Math.max/min.apply doesn't handle correctly
*/
function removeEmptyArrayElements(arr) { 
  if (!isArray(arr)) {
      return arr;
   } else {
       return arr.filter( function(elem) { return elem !== null } ).map(
      removeEmptyArrayElements);
  }
}

function isArray(obj) {
  return obj && (obj.constructor==Array);
}

/**
 * @returns {Number} Returns the maximum value in the array or typed-array parameter.
 * @param {Array|ArrayBuffer} a The array or typed-array of numbers.
 */
function ArrayMax(a){
  var arr = removeEmptyArrayElements(a);
  var max = -Number.MAX_VALUE;
  arr.forEach(function(e) {
    if (max < e) {
      max = e;
    }
  });
  if (Object.prototype.toString.call(max) === '[object Date]') {
    max = max.getTime();
  }
  return max;
}
/**
 * @returns {Number} Returns the minimum value in the array or typed-array parameter.
 * @param {Array|ArrayBuffer} a The array or typed-array of numbers.
 */
function ArrayMin(a){
  var arr = removeEmptyArrayElements(a);
  var min = Number.MAX_VALUE;
  arr.forEach(function(e) {
    if (min > e) {
      min = e;
    }
  });
  if (Object.prototype.toString.call(min) === '[object Date]') {
    min = min.getTime();
  }
  return min;
}

/**
 * @constructor
 * @class Base abstract class to define a series of data
 * @param {Object|Tee.Chart|Number[]} o An array of numbers, or a chart or datasource object.
 * @property {Tee.Chart} chart The parent chart this Series object belongs to.
 * @property {Number[]} data.values Array of numbers as main series data.
 * @property {String[]} data.labels Array of strings used to display at axis labels, legend and marks.
 * @property {Tee.Format} format Visual properties to display series data.
 * @property {Boolean} [visible=true] Determines if this series will be displayed or not.
 * @property {String} [cursor="default"] Defines the mouse cursor to show when mouse is over a series point.
 * @property {Object} data Contains all series data values, labels, etc.
 * @property {Tee.Series.Marks} marks Displays annotations near series points.
 * @property {Boolean} [colorEach="auto"] Paints points using series fill color, or each point with a different color
 * from series palette or chart palette color array.
 * @property {String} [horizAxis="bottom"] Defines the horizontal axis associated with this series.
 * @property {String} [vertAxis="left"] Defines the horizontal axis associated with this series.
 */
Tee.Series=function(o,o2) {
  this.chart=null;
  this.data={ values:[], labels:[], source:null }

  this.sortedOptions = {
      sortedDrawAnimation: new Tee.Animation(),
      sortedValues: [],
      sortedValuesIndices: [],
      originalValues: [],
      sortedLabels: [],
      originalLabels: [],
      sorted: false,
      ascending: true,
      sorting:false,
      sortingAnimationType:"verticalchange"
  };
  this.yMandatory=true;
  this.horizAxis="bottom";
  this.vertAxis="left";
  this.legend={ visible:true };

  this.sequential=true;

  var f=this.format=new Tee.Format(this.chart),
      ho=this.hover=new Tee.Format(this.chart), s=ho.shadow;
  this.sortedOptions.sortedDrawAnimation.duration = 500;
  this.sortedOptions.sortedDrawAnimation.mode = "linear";
  f.fill="";
  f.stroke.fill="";
  this.visible=true;

  // Hover
  ho.stroke.size=0.3;
  ho.fill="";
  ho.stroke.fill="red";

  s.visible=true;
  s.blur=10;
  s.width=0;
  s.height=0;

  this.cursor="default";
  this.over=-1;

  this.marks=new Marks(this,this.chart);

  this.palette=new Tee.Palette();
  this.paletteName = "opera";
  this.themeName = "default";
  
  this.colorEach="auto";
  this.useAxes=true;
  this.decimals=2;

  this._paintAxes=true;
  this._paintWalls=true;

  this.sortValues = function () {
      this.sortedOptions.sorting = true;
      var indices = [], values = this.data.values, ascending = this.sortedOptions.ascending;
      this.sortedOptions.sortedLabels = [];
      for (var i = 0; i < this.data.values.length;i++){
          indices.push(i);
      }
      indices.sort(function (a, b) { return ascending ? values[a] - values[b] : values[b] - values[a] });
      this.sortedOptions.originalValues = this.data.values.slice();
      this.sortedOptions.originalLabels = this.data.labels.slice();
      for (var i = 0; i < indices.length; i++) {
          this.sortedOptions.sortedLabels.push(this.data.labels[indices[i]] ? this.data.labels[indices[i]] : indices[i]);
      }
      this.sortedOptions.sortedValuesIndices = indices;
      this.sortedOptions.sortedValues = this.data.values.slice().sort(function (a, b) { return ascending ? a - b : b - a });
      this.sortedOptions.sorting = false;
      return this.sortedOptions.sortedValues.slice();
    
  }

  this.drawSortedValues = function (sorted) {
      var animation = this.sortedOptions.sortedDrawAnimation;
      if (this.sortedOptions.sorted != sorted&&!this.sortedOptions.sorting&&animation&&!animation.running) {
          this.sortedOptions.sorted = sorted;
          var data = this.data;
          if (sorted) this.sortValues();
          var prevValues = sorted ? this.sortedOptions.originalValues.slice() : this.sortedOptions.sortedValues.slice();
          var values = this.data.values;
          var endValues = sorted ? this.sortedOptions.sortedValues.slice() : this.sortedOptions.originalValues.slice();

          if ((!(values.length == endValues.length && values.every(function (v, i) { return v === endValues[i] })))) {

              animation.chart = this.chart;

              animation.doStep = function (f) {
                  if (f < 1) {
                      for (var i = 0; i < prevValues.length; i++) {
                          values[i] = prevValues[i] + (endValues[i] - prevValues[i]) * f;
                      }
                  }
              }

              animation.onstop = function () {
                  for (var i = 0; i < prevValues.length; i++) {
                      values[i] = endValues[i];
                  }
                  animation.running = false;
              }

              animation.onstart = function () {
                  animation.running = true;
              }
              animation.animate();
          }
          this.data.labels = sorted ? this.sortedOptions.sortedLabels.slice() : this.sortedOptions.originalLabels.slice();
          this.chart.draw();
          
      }
  }

  this.init=function(o,o2) {
    if (typeof(o)==="object") {
      if (o) {
         if (o instanceof Array) {
            this.data.values=o;

            if (o2 instanceof Array)
              this.data.labels=o2;
         }
         else
         if (o instanceof Tee.Chart) {
            this.chart=o;
            if (o2 instanceof Array)
              this.data.values=o2;
         }
         else
         {
            this.data.source=o;
            this.refresh();
         }
      }
    }
  }

  this.init(o,o2);

 /**
  * @returns {String} Returns the color of index point in series, using series palette or chart palette.
  */
  this.getFill=function(index,f) {
    var p=this.palette, c=(p && p.colors) ? p.get(index) : null;
    if (c===null)
       return (this.isColorEach || (!f)) ? this.chart.palette.get(index) : f.fill;
    else
       return c;
  }

 /**
  * @returns {boolean} Returns true when the index'th series value is null and should not be painted.
  */
  this.isNull=function(index) { return this.data.values[index]===null; }

 /**
  * @returns {CanvasGradient} Returns a canvas gradient using color, or color if gradient is not visible.
  */
  this.getFillStyle=function(r,color) {
    return f.gradient.visible ? f.gradient.create(r,color) : color;
  }

  this.title="";

  this.titleText=function(index) {
    return this.title || "Series "+index.toString();
  }

  this.refresh=function(failure) {
    if (this.data.source) {

      if (this.data.source instanceof HTMLTextAreaElement) {
        parseText(this.data,this.data.source.value);

        if (this.chart)
           this.chart.draw();
      }
      else
      if (this.data.source instanceof HTMLInputElement) {
        Tee.doHttpRequest(this, this.data.source.value, function(target,data) {
          parseText(target.data,data);
          target.chart.draw();
        }, function(status,statusText) { if (failure) failure(this,status,statusText ); });
      }
      else
        if (failure) failure(this);
    }
    else
    if (this.data.xml) {
      parseXML(this,this.data.xml);
      this.chart.draw();
    }
    else
    if (this.data.json) {
      parseJSON(this,this.data.json);
      this.chart.draw();
    }
  }

 /**
  * @returns {String} Returns the series index'th data label, or the value if no label exists at that index.
  */
  this.valueOrLabel=function(index) {
    var s=this.data.labels[index];

    if ( (!s) || (s===""))
      s=this.valueText(index);

    return s;
  }

 /**
  * @returns {String} Returns a percentual representation of the series index'th value, on total of series values.
  */
  this.toPercent=function(index) {
    var v=this.data.values;
    return (100*Math.abs(v[index])/ArraySumAbs(v)).toFixed(this.decimals)+" %";
  }

 /**
  * @returns {String} Returns the text string to show at series marks, for a given series point index.
  */
  this.markText=function(index) {
    var m=this.marks, res=this.dataText(index,m.style,false);
    return m.ongettext ? m.ongettext(this,index,res) : res;
  }

 /**
  * @returns {Boolean} Returns if series is associated to axis, either horizontal or vertical.
  */
  this.associatedToAxis=function(axis) {
    if (axis.horizontal)
      return (this.horizAxis=="both") || (this._horizAxis==axis);
    else
      return (this.vertAxis=="both") || (this._vertAxis==axis);
  }

  this.bounds=function(r) {
    var h=this._horizAxis, v=this._vertAxis;

    r.x=h.calc(this.minXValue());
    r.width=h.calc(this.maxXValue())-r.x;

    r.y=v.calc(this.maxYValue());
    r.height=v.calc(this.minYValue())-r.y;
  }

  this.calcStack=function(index,p,value) {
    var sum=this.pointOrigin(index,false)+value, tmp, a=this.mandatoryAxis;

    p.x=this.notmandatory.calc(this.data.x ? this.data.x[index] : index);

    if (this.isStack100) {
      tmp=this.pointOrigin(index,true);
      p.y=(tmp===0) ? a.endPos : a.calc(sum*100.0/tmp);
    }
    else
      p.y=a.calc(sum);

    if (!this.yMandatory) {
      tmp=p.x;
      p.x=p.y;
      p.y=tmp;
    }
  }

 /**
  * @returns {Number} Returns the sum of all previous visible series index'th value, for stacking.
  */
  this.pointOrigin=function(index, sumAll) {
     var res=0, t, s, li=this.chart.series.items, v, tmp;

     for (t=0; t<li.length; t++) {
       s=li[t];

       if ((!sumAll) && (s == this)) break;
       else if (s.stacked!="no") {
         v = s.data.values;

         if (s.visible && (s.constructor == this.constructor) && (v.length > index)) {
           tmp = v[index];

           // Protect against undefined (NaN)
           if (tmp !== undefined)
             res += (sumAll && (tmp < 0)) ? -tmp : tmp;
         }
       }
     }

     return res;
  }

  this.doHover=function(index) {
    var o=this.chart
    if (index!=this.over) {
      if (o.onhover)
          o.onhover(this,index);

      this.over=index;

      if (this.hover.enabled)
         window.requestAnimFrame(function() {o.draw()});
    }
  }
}

  /*
   * @private
   */
  Tee.Series.prototype.initZ=function(index,total) {
    var f=this.format;
    f.z=index/total;
    f.depth=1/total;
    this.marks.format.z = f.z + f.depth*0.5;
  }

  /*
   * @private
   */
  Tee.Series.prototype.setChart=function(series,chart) {
    series.chart=chart;

    series.recalcAxes();

    series.format.setChart(chart);
    series.marks.setChart(chart);
    series.hover.setChart(chart);
  }

  Tee.Series.prototype.calc=function(index,p) {
    var d=this.data,
        x=this.notmandatory.calc( d.x ? d.x[index] : index),
        y=this.mandatoryAxis.calc(d.values[index]);

    p.x=this.yMandatory ? x : y;
    p.y=this.yMandatory ? y : x;
  }

  Tee.Series.prototype.recalcAxes=function() {
    var a=this.chart.axes;

    if (this.horizAxis instanceof Axis)
      this._horizAxis=this.horizAxis;
    else
      this._horizAxis= (this.horizAxis=="top") ? a.top : a.bottom;

    if (this.vertAxis instanceof Axis)
      this._vertAxis=this.vertAxis;
    else
      this._vertAxis= (this.vertAxis=="right") ? a.right : a.left;

    this.mandatoryAxis = this.yMandatory ? this._vertAxis : this._horizAxis;
    this.notmandatory = this.yMandatory ? this._horizAxis : this._vertAxis;
  }

  // Pending for solution (gauges.bounds) :
  Tee.Series.prototype.getRect=function() { return new Rectangle(); }

  Tee.Series.prototype.clicked=function() { return -1; }
  
  Tee.Series.prototype.fixedFloatToLocal=function(value, decimals) {
  
	  var fixed = value.toFixed(decimals);
	  var localeVal = value.toLocaleString(this.chart.language);
	  
	  if (fixed.indexOf(".")!=-1) {
		var n = 1.1; n = n.toLocaleString(this.chart.language).substring(1, 2);
	    var fractions = fixed.substring(fixed.indexOf(".")+1); //zero based idx
		return localeVal.substring(0,localeVal.indexOf(n) == -1 ? localeVal.length : localeVal.indexOf(n))+n+fractions;
	  }
	  else return value;
  }  

 /**
  * @returns {String} Returns the text string for a given series point index value.
  */
  Tee.Series.prototype.valueText=function(index) {
      var vv=this.data._old || this.data.values, d=vv[index];

      if (d) {
        if (d instanceof Date)
          return d.format ? d.format(this.dateFormat) : d.toString();
        else
        if (this.valueFormat)
          return d.toLocaleString(this.chart.language);
        else
        if (trunc(d)==d)
          return this.fixedFloatToLocal(d,0).toString();
        else
          return this.fixedFloatToLocal(d,this.decimals).toString();
      }
      else
        return "0";
  }

  Tee.Series.prototype.labelOrTitle=function(index) {
    return this.data.labels[index] || this.title;
  }

  Tee.Series.prototype.mousedown=function() { return false; }

  Tee.Series.prototype.mousemove=function(p) {
    if (this.hover.enabled || (this.cursor!="default")) {
      var tmp=this.clicked(p);

      this.doHover(tmp);

      if ((this.cursor!="default") && (tmp!=-1)) {
        if (!this.chart.newCursor)
           this.chart.newCursor=this.cursor;
        return;
      }
    }

    var m=this.marks;

    if (m.visible) {
      var len=this.data.values.length, p2=new Point(), t;

      for(t=0; t<len; t+=m.drawEvery)
      if (!this.isNull(t)) {
        this.markPos(t,p2);

        if (m.canDraw(p2.x,p2.y,t)) {
          if (m.bounds.contains(p)) {
              this.doHover(t);
              break;
          }
        }
      }
    }
  }

  Tee.Series.prototype.mouseout=function() {}

  Tee.Series.prototype.markPos=function(t,p) {
    this.calc(t,p);
    return false;
  }

  Tee.Series.prototype.drawMarks=function() {
    var len=this.data.values.length, p=new Point(), t, inv;

    for(t=0; t<len; t+=this.marks.drawEvery)
    if (!this.isNull(t)) {
      inv=this.markPos(t,p);
      this.marks.drawMark(p.x,p.y,t,inv);
    }
  }

  Tee.Series.prototype.horizMargins=function() {}
  Tee.Series.prototype.vertMargins=function() {}

 /**
  * @returns {Number} Returns the minimum value of series x values, or zero if no x values exist.
  */
  Tee.Series.prototype.minXValue=function() {
    return (this.data.x && (this.data.x.length>0)) ? ArrayMin(this.data.x) : 0;
  }

 /**
  * @returns {Number} Returns the minimum value of series data values, or zero if no values exist.
  */
  Tee.Series.prototype.minYValue=function() {
    var v=this.data.values;
    return v.length>0 ? ArrayMin(v) : 0;
  }

 /**
  * @returns {Number} Returns the maximum value of series x values, or data length minus one, if no x values exist.
  */
  Tee.Series.prototype.maxXValue=function() {
    if (this.data.x)
      return this.data.x.length>0 ? ArrayMax(this.data.x) : 0;
    else {
      var len=this.data.values.length;
      return len===0 ? 0 : len-1;
    }
  }

 /**
  * @returns {Number} Returns the maximum value of series values, or zero if no values exist.
  */
  Tee.Series.prototype.maxYValue=function() {
    var v=this.data.values, l=v.length, t, value, res;

    if (l>0) {
       res=ArrayMax(v);

       if (res !== res)  // isNan, protect against
       {
         for (t=0; t<l; t++) {
           value=v[t];

           if (value !== undefined) {
             if (res !== res)
                res=value;
             else
             if (value>res)
                res=value;
           }
         }
       }

       return (res === res) ? res : 0;
    }
    else
      return 0;
  }

  Tee.Series.prototype.calcColorEach=function() {
    this.isColorEach=(this.colorEach=="yes");
  }

 /**
  * @returns {Number} Returns the maximum of all series values, or sum of all stacked values.
  */
  Tee.Series.prototype.stackMaxValue=function() {
    if (this.stacked=="100")
       return 100;
    else
    {
      var temp= Tee.Series.prototype.maxYValue;

      if (this.stacked=="no")
         return temp.call(this);
      else
      {
        var res=temp.call(this), v=this.data.values, len=v.length, value;

        while(len--) {
          value=v[len];
          if (value === undefined) value=0;
          res=Math.max(res, this.pointOrigin(len,false) + value);
        }

        return res;
      }
    }
  }

 /**
  * @returns {String} Returns the text string to show for a given series point index.
  * @param {Number} index The point position in series data array.
  * @param {String} style Defines how text is returned: "auto", "value", "percent", "percentlabel",
  * "valuelabel", "label", "index", "labelvalue", "labelpercent"
  */
  Tee.Series.prototype.dataText=function(index,style,title,asArray) {

    function calcRet(a,b) {
      if (asArray)
        return l ? [a,b] : [a,""];
      else
        return a+ (b ? " "+b : "");
    }

    var l=title ? this.labelOrTitle(index) : this.data.labels[index];

    if (style=="value")
      return this.valueText(index);
    else
    if (style=="percent")
      return this.toPercent(index);
    else
    if (style=="percentlabel")
      return calcRet(this.toPercent(index),l)
    else
    if ((style=="valuelabel") || (style=="auto"))
      return calcRet(this.valueText(index),l);
    else
    if (style=="label")
      return l || "";
    else
    if (style=="index")
      return index.toFixed(0);
    else
    if (style=="labelvalue")
      return calcRet(l,this.valueText(index));
    else
    if (style=="labelpercent")
      return calcRet(l,this.toPercent(index));
    else
      return this.valueOrLabel(index);
  }

 /**
  * @returns {String} Returns the text string to show for a given series point index.
  * @param {Number} index The point position in series data array.
  * @param {String} style Defines how text is returned: "auto", "value", "percent", "percentlabel",
  * "valuelabel", "label", "index", "labelvalue", "labelpercent"
  */
  Tee.Series.prototype.legendText=Tee.Series.prototype.dataText;

 /**
  * @returns {Number} Returns the number of series data values.
  */
  Tee.Series.prototype.count=function() { return this.data.values.length; }

 /**
  * @returns {Number} Returns the number of items to show at legend.
  */
  Tee.Series.prototype.legendCount=function() { return this.count(); }

 /**
  * @returns {Color} Returns the color of index'th legend symbol.
  */
  Tee.Series.prototype.legendColor=function(index) {
     return this.isColorEach && (index!=-1) ? this.getFill(index) : this.format.fill;
  }

  Tee.Series.prototype.addRandom=function(count, range, x) {

    if (!range) range=1000;
    if (!count) count=5;

    var d=this.data;
    d.values.length=count;

    if (x)
      d.x=new Array(count);

    if (count>0) {
      d.values[0]=Math.random()*range;

      if (x) d.x[0]=Math.random()*range;

      for (var t=1; t<count; t++) {
        d.values[t]=d.values[t-1] + (Math.random()*range) -(range*0.5);
        if (x) d.x[t]=Math.random()*range;
      }

    }

    return this;
  }

/**
 * @returns {Array} Returns an array of series data indices sorted according to sortBy parameter.
 */
Tee.Series.prototype.doSort=function(sortBy,ascending) {
  if (sortBy=="none")
    return null;
  else
  {
    var d=this.data.values, len=d.length, sorted=new Array(len), t=0;
    for(; t<len; t++) sorted[t]=t;

    if (sortBy=="labels") {
      d=this.data.labels;

      var A,B, before=ascending ? -1 : 1, after=ascending ? 1 : -1;

      sorted.sort( function(a,b) {
                       A=d[a].toLowerCase();
                       B=d[b].toLowerCase();
                       return A<B ? before : A==B ? 0 : after
                   });
    }
    else
      sorted.sort( ascending ? function(a,b){return d[a]-d[b]} : function(a,b){return d[b]-d[a]} );

    return sorted;
  }
}

/**
 * @memberOf Tee.Chart
 * @constructor
 * @class Contains a list of chart series objects
 * @param {Tee.Chart} chart The parent chart this list of series belongs to.
 * @property {Tee.Series[]} items The array containing series instances.
 */
function SeriesList(chart)
{
  this.chart=chart;
  this.items=[];

 /**
  * @returns {Number} Returns the total number of series in chart, visible or not.
  */
  this.count=function() { return this.items.length; }

 /**
  * @returns {Boolean} Returns if {@link Tee.Point} p parameter is over any series point.
  */
  this.clicked=function(p) {
    var done=false;

    this.each(function(s) {
      if (s.visible && s.onclick) {
        var index=s.clicked(p);
        if (index!=-1)
          done=s.onclick(s,index,p.x,p.y);
      }
    });

    return done;
  }

  this.mousedown=function(event) {
    for(var t=0, s, done=false; s=this.items[t++];)
      if (s.visible) {
        if (s.mousedown(event)) done=true;
      }

    return done;
  }

  this.mousemove=function(p) {
    for(var t=0, s; s=this.items[t++];)
      if (s.visible)
          s.mousemove(p);

    /*
    var len=this.items.length, s;

    while(len--) {
      s=this.items[len];
      if (s.visible)
          s.mousemove(p);
    }
    */
  }

  this.mouseout=function() {
    this.each(function(s) { if (s.visible) s.mouseout(); });
  }

 /**
  * Counts how many visible series exist of the same class type.
  * @returns {Number} Returns the number of visible series in chart of the same type as this.
  */
  this.visibleCount=function(s,c,res) {
    var r=0, it=this.items, len=it.length, i;

    while(len--, i=it[len])
      if (i.visible && ((!c) || (i instanceof c))) {
        if (res && (i==s)) res.index=r;
        r++;
      }
    if (res) { res.total=r; res.index=(r-1-res.index); }
    return r;
  }

  this.beforeDraw=function() {
    this.each(function(s) {
      if (s.useAxes)
        s.recalcAxes();

      s.calcColorEach();
    });
  }

 /**
  * @returns {Boolean} Returns if any visible series in chart needs axes to be represented.
  */
  this.anyUsesAxes=function() {
    var len=this.items.length, s;
    while(len--) {
      s=this.items[len];
      if (s.visible && s.useAxes)
         return true;
    }

    return false;
  }

 /**
  * @returns {Tee.Series} Returns the first visible series in chart, or null if any.
  */
  this.firstVisible=function() {
    for(var t=0, s; s=this.items[t++];)
      if (s.visible) return s;
    return null;
  }

 /**
  * Calculates the maximum amount of vertical margins in pixels from all series.
  * @returns {Tee.Point} Returns the maximum top/bottom distance in pixels that all series need to be separated from axes.
  */
  this.vertMargins=function() {
    var result, li=this.items, len=li.length, s, t;

    if (len>0) {
      result={x:0,y:0};
      s={x:0,y:0};
      li[0].vertMargins(result);

      for(t=1; t<len; t++) {
		if (li[t].data.values.length>0)
		{			
			s.x=s.y=0;
			li[t].vertMargins(s);
			if (s.x>result.x) result.x=s.x;
			if (s.y>result.y) result.y=s.y;
		}
      }
    }
    return result;
  }

 /**
  * Calculates the maximum amount of horizontal margins in pixels from all series
  * @returns {Tee.Point} Returns the maximum left/right distance in pixels that all series need to be separated from axes.
  */
  this.horizMargins=function() {
    var result, li=this.items, len=li.length, s, t;

    if (len>0) {
      result={x:0,y:0};
      s={x:0,y:0};
      li[0].horizMargins(result);

      for(t=1; t<len; t++) {
		if (li[t].data.values.length>0)
		{			  
			s.x=s.y=0;
			li[t].horizMargins(s);

			if (s.x>result.x) result.x=s.x;
			if (s.y>result.y) result.y=s.y;
		}
      }
    }
    return result;
  }

 /**
  * @returns {Number} Returns the minimum of all visible non-empty series associated to axis, minimum x values.
  */
  this.minXValue=function(axis) {
    var result=Infinity, v;
    this.eachAxis(axis, function(s) {
      v=s.minXValue();
      if (v<result) result=v;
    });
    return result;
  }

 /**
  * @returns {Number} Returns the minimum of all visible series mininum data values.
  */
  this.minYValue=function(axis) {
    var result=Infinity, v;
    this.eachAxis(axis, function(s) {
      v=s.minYValue();
      if (v<result) result=v;
    });
    return result;
  }

 /**
  * @returns {Number} Returns the maximum of all visible series maximum x values.
  */
  this.maxXValue=function(axis) {
    var result=-Infinity, v;
    this.eachAxis(axis, function(s) {
      v=s.maxXValue();
      if (v>result) result=v;
    });
    return result;
  }

 /**
  * @returns {Number} Returns the maximum of all visible series maximum data values.
  */
  this.maxYValue=function(axis) {
    var result=-Infinity, v;
    this.eachAxis(axis, function(s) {
      v=s.maxYValue();
      if (v>result) result=v;
    });
    return result;
  }

  function axisStrokeSize(axis) {
    if (axis.visible && axis.firstSeries) {
      var s = axis.format.stroke;
      return s.fill==='' ? 0 : s.size*0.5;
    }
    else
      return 0;
  }

  this.draw=function() {
    var len=this.items.length,
        ch=this.chart,
        c=ch.ctx, a=ch.aspect, t, s;

    if (len>0) {

      for(t=0; t<len; t++) {
          s=this.items[t];
          if (s.visible && s.beforeDraw)
              s.beforeDraw();
      }

      var shouldClip=a.clip && this.anyUsesAxes(),
          axes=ch.axes;

      if (shouldClip) {
        var chr = ch.chartRect,
            ax = axisStrokeSize(axes.left),
            ay = axisStrokeSize(axes.top),
            r={ x: chr.x + ax,
                y: chr.y + ay,
                width: chr.width - axisStrokeSize(axes.right),
                height: chr.height - axisStrokeSize(axes.bottom) };

        a.clipRect(r);
      }

      try
      {
        var groups=c.beginParent;

        for(t=0; t<len; t++) {
          s=this.items[t];

          if (s.visible) {
            var old=c.globalAlpha;
            c.globalAlpha=(1-s.format.transparency);

            if (s.transform)
            {
               c.save();
               s.transform();
            }

            s.visual = groups ? c.beginParent() : null;
      
      if (s.onbeforedraw) s.onbeforedraw(s);

            s.draw();

            if (groups)
               c.endParent();

            if (s.ondraw) s.ondraw(s);

            if (s.transform) c.restore();

            c.globalAlpha=old;
          }
        }

      }
      finally
      {
        if (shouldClip)
           //a.clipRect(ch.bounds);
           c.restore();
      }

      for(t=0; t<len; t++) {
        s=this.items[t];

        if (s.visible && s.marks.visible) {

           if (s.transform)
           {
             c.save();
             s.transform();
           }

           s.drawMarks();

           if (s.transform) c.restore();
        }
      }
    }
  }
}

/**
 * @type SeriesList 
*/
 /* Calls f function parameter for each series in list */
SeriesList.prototype.each=function(f) {
  var l=this.items.length, t=0;
  for(; t<l; t++) f(this.items[t]);
}

SeriesList.prototype.eachAxis=function(axis, func) {
  var len=this.items.length, s;
  while(len--) {
    s=this.items[len];
    if (s.visible && ((!axis) || s.associatedToAxis(axis)) && (s.__alwaysDraw || (s.count()>0)))
        func(s);
  }
}

/**
 * @memberOf Tee.Chart
 * @constructor
 * @class Contains four axis objects: left, top, right and bottom
 * @property {Boolean} [visible=true] Draws or not all the chart axis objects.
 * @property {Number} [transparency=0] Applies transparency to all axes in chart, from 0 to 1.
 * @param {Tee.Chart} chart The parent chart this axes object belongs to.
 */
function Axes(chart)
{
  this.chart=chart;
  this.visible=true;

  this.transparency=0;

  /**
   * @public
   * @type Tee.Chart.Axis
   */
  this.left=new Axis(chart,false,false);

  /**
   * @public
   * @type Tee.Chart.Axis
   */
  this.top=new Axis(chart,true,true);

  /**
   * @public
   * @type Tee.Chart.Axis
   */
  this.right=new Axis(chart,false,true);

  /**
   * @public
   * @type Tee.Chart.Axis
   */
  this.bottom=new Axis(chart,true,false);

  this.items=[this.left,this.top,this.right,this.bottom];
  this.each=function(f) { for(var t=0, a; a=this.items[t++];) f.call(a); };

  /**
   * Creates and adds a new custom Axis
   */
  this.add=function(horiz,other) {
    var a=new Axis(chart,horiz,other);
    a.custom=true;
    this.items.push(a);
    return a;
  }
}

/**
 * @example
 * var Chart1 = new Tee.Chart("canvas");
 * Chart1.addSeries(new Tee.Bar([1,2,3,4]));
 * Chart1.draw();
 * @constructor
 * @class The main Chart class
 * @param {String|HTMLCanvasElement} [canvas] Optional canvas id or <a href="https://www.w3.org/wiki/HTML/Elements/canvas">element</a>.
 * @property {HTMLCanvasElement} canvas The <a href="https://www.w3.org/wiki/HTML/Elements/canvas">canvas</a> where this chart will paint to.
 * @property {Tee.Rectangle} bounds The rectangle where this chart will be painted inside canvas.
 * @property {Tee.Palette} palette The list of colors to use as default colors for series and points.
 * @property {Tee.Chart.Aspect} aspect Contains properties related to 3D and graphics parameters.
 * @property {Tee.Chart.Panel} panel Contains properties used to fill the chart background.
 * @property {Tee.Chart.Walls} walls Contains properties used to draw chart walls around axes.
 * @property {Tee.Chart.Axes} axes Contains a list of axis used to draw series.
 * @property {Tee.Chart.Legend} legend Contains properties to control the legend, a panel showing the list of series or values.
 * @property {Tee.Chart.SeriesList} series Contains a list of Tee.Series objects that belong to this chart.
 * @property {Tee.Chart.Title} title Properties to draw text at top side of chart.
 * @property {Tee.Chart.Title} footer Properties to draw text at bottom side of chart.
 * @property {Tee.Chart.Zoom} zoom Properties to control mouse/touch dragging to zoom chart axes scales.
 * @property {Tee.Chart.Scroll} scroll Properties to control mouse/touch dragging to scroll or pan contents inside chart axes.
 * @property {Tee.Chart.Tools} tools Contains a list of Tee.Tool objects that belong to this chart.
 */
Tee.Chart=function(canvas,data,type)
{
  var ua=typeof navigator!="undefined" ? navigator.userAgent.toLowerCase() : "";
  /**
   * @constant
   * @private
   */
  this.isChrome=ua.indexOf('chrome') > -1;
  /**
   * @constant
   * @private
   */
  this.isAndroid=ua.indexOf('android') > -1;
  /**
   * @constant
   * @private
   */
  this.isMozilla=(typeof window !== 'undefined') && window.mozRequestAnimationFrame;

  this.language = window.navigator.userLanguage || window.navigator.language;

  if (canvas) {
    if ((typeof HTMLCanvasElement!=="undefined") && (canvas instanceof HTMLCanvasElement))
       this.canvas=canvas;
    else
    if (typeof(canvas)=="string")
       this.canvas=document.getElementById(canvas);
    else
      this.canvas=canvas;
  }

  if (!this.canvas)
  {
    this.canvas=document.createElement("canvas");
    this.canvas.width=600;
    this.canvas.height=400;
  }

  var c=this.canvas;
  var isNLc=false;

  this.__webgl=c.__webgl;

  if (c.__webgl || (c.clientWidth===0))
    this.bounds=new Rectangle(0,0,c.width,c.height);
  else
  {
    this.bounds=new Rectangle(0,0,c.clientWidth,c.clientHeight);
	  c.width = c.clientWidth;
	  c.height = c.clientHeight;
  }

  this.chartRect=new Rectangle();
  this.chartRect.automatic=true;
  this.chartRect.setFrom(this.bounds);

  this.palette=new Tee.Palette([ "#4466a3", "#f39c35", "#f14c14", "#4e97a8", "#2b406b",
                "#1d7b63", "#b3080e", "#f2c05d", "#5db79e", "#707070",
                "#f3ea8d", "#b4b4b4"]);

  /**
   * @memberOf Tee.Chart
   * @class Contains properties related to canvas and 2D / 3D
   * @param {Tee.Chart} chart The parent chart this aspect object belongs to.
   * @property {Boolean} clip When true, series contents will be restricted to paint inside axes boundaries.
   */
  this.aspect={
    chart:this,
    view3d: this.__webgl,
    ortogonal: !this.__webgl,
    rotation:0,
    elevation:315,
    perspective:50,
    clip:true,

    _orthox:10,
    _orthoy:8,

    /**
     * @param {Tee.Rectangle} r The rectangle object to apply clipping.
     */
    clipRect:function(r) {

      var c=this.chart.ctx;
      c.save();

      c.beginPath();

      if (this.view3d)
         c.rect(r.x,r.y-this._orthoy,r.width+this._orthox,r.height+this._orthoy);
      else
         c.rect(r.x,r.y,r.width,r.height);
         
      c.clip();
      //c.closePath();
    }
  }

  var aspect=this.aspect;
  
  /*
   * Properties to paint the chart background
   */
  this.panel=new Panel(this);

  /**
   * @memberOf Tee.Chart
   * @constructor
   * @class Contains left, right, bottom and back wall objects
   * @param {Tee.Chart} chart The parent chart this walls object belongs to.
   * @property {Boolean} [visible=true] Determines if walls will be displayed or not.
   * @property {Tee.Chart.Wall} back Visual properties to paint the back wall.
   */
  this.walls={
    chart:this,
    visible:true,
    left:new Wall(this),
    right:new Wall(this),
    bottom:new Wall(this),
    back:new Wall(this),

    draw:function(r,aspect) {
      var old, ctx=this.chart.ctx, t=this.transparency, groups=ctx.beginParent;

      this.visual = groups ? ctx.beginParent() : null;

      if (t>0) {
          old=ctx.globalAlpha;
          ctx.globalAlpha=(1-t)*old;
        }

      var backBounds=this.back.bounds;
      backBounds.setFrom(r);

      if (aspect.view3d) {

         var bottomsize=this.bottom.visible ? this.bottom.size : 0,
             leftsize=this.left.size;

         if (leftsize>0) {
            backBounds.x -= leftsize;
            backBounds.width += leftsize;
         }

         if (bottomsize>0)
            backBounds.height += bottomsize;

         this.left.bounds.set(r.x-leftsize, r.y, leftsize, r.height + bottomsize );
         this.bottom.bounds.set(r.x, r.getBottom(), r.width, bottomsize);

         this.back.format.depth=this.back.size;
      }

      (!this.back.visible || this.back.draw());

      if (this.chart.aspect.view3d) {
        if (this.left.visible) this.left.draw();
        if (this.bottom.visible) this.bottom.draw();
        if (this.right.visible) this.right.draw();
      }

      if (t>0) ctx.globalAlpha=old;

      if (groups)
          ctx.endParent();
    }
  }

  var bf=this.walls.back.format;
  bf.fill="rgb(240,240,240)";
  bf.shadow.visible=true;
  bf.z=1;

  var lw=this.walls.left;
  lw.format.fill="#BBAA77";
  lw.format.depth=1;
  lw.size=2;

  var bof=this.walls.bottom;
  bof.format.depth=1;
  bof.size=2;
  
  this.walls.right.visible=false;

  /*
   * Four axes
   */
  this.axes=new Axes(this);

  /*
   * Properties to paint a list of series or values.
   */
  this.legend=new Legend(this);

  /*
   * List of Tee.Series objects that this chart contains.
   */
  this.series=new SeriesList(this);

  this.title=new Title(this, "blue");
  this.title.text="TeeChart";
  this.title.format.z=1;

  this.footer=new Title(this, "red");
  this.footer.format.z=0;

  this.zoom=new Zoom(this);
  this.scroll=new Scroll(this);

  this.tools=new Tools(this);

  /**
   * @private
   */
  this.oldPos=new Point();

  /**
   * @private
   * @returns {Tee.Point} Returns the xy local coordinates from a mouse or touch event
   */
  this.calcMouse=function(e,p) {

  p.x = e.clientX;
    p.y = e.clientY;

    var element = this.canvas, r;

    // IE, Moz3+, Chr, Op9.5+, Saf4+
    if (element.getBoundingClientRect) {
      r=element.getBoundingClientRect();
      p.x-=r.left;
      p.y-=r.top;
    }
    else //earlier Moz.
    if (element.offsetParent)
      do {
        p.x-= element.offsetLeft;
        p.y-= element.offsetTop;
        element = element.offsetParent;
      } while (element);
  }

  var pMove=new Point(0,0);

  this.domousemove=function(event) {
    var c=this.chart;
    if (!c.ctx) return false;

    event=event || window.event;

    if (event.touches)
       event=event.touches[event.touches.length-1];

    c.calcMouse(event,pMove);

    if (c.scroll.active) {

       var d=c.scroll.direction, both=(d=="both"), delta;

       if (both || (d=="horizontal")) {
         delta=c.axes.bottom.fromSize(c.oldPos.x-pMove.x);
         c.axes.top.scroll(delta);
         c.axes.bottom.scroll(delta);
       }

       if (both || (d=="vertical")) {
         delta= -c.axes.left.fromSize(c.oldPos.y-pMove.y);
         c.axes.left.scroll(delta);
         c.axes.right.scroll(delta);
       }

       c.oldPos.x=pMove.x;
       c.oldPos.y=pMove.y;

       c.scroll.done=true;

       if (c.onscroll) c.onscroll(event);

       if (c.scroll.done)
         window.requestAnimFrame(function() {c.draw()});

       return false;
    }
    else
    if (c.zoom.active) {

       if ((pMove.x != c.oldPos.x) || (pMove.y != c.oldPos.y)) {

         c.zoom.change(pMove);

         window.requestAnimFrame(function() { c.draw(); });

         c.zoom.done=true;
       }

       return false;
    }
    else
    {
      c.newCursor=null;
      c.tools.mousemove(pMove);
      c.series.mousemove(pMove);
      c.legend.mousemove(pMove);
      c.title.mousemove(pMove);
    if (c.mousemove) c.mousemove(pMove);

      var s=this.chart.canvas.style;

      if (c.newCursor) {
         if (s.cursor!=c.newCursor) {
           c.oldCursor=s.cursor;
           s.cursor=c.newCursor;
         }
      }
      else
      if ((c.oldCursor!==undefined) && (s.cursor!=c.oldCursor))
         s.cursor=c.oldCursor;

      return true;
    }
  }

  var p=new Point(0,0);
  
  this.domousedown=function(event) {
    event=event || window.event;
    var done=false, c=this.chart;

    c.calcMouse(event.touches ? event.touches[0] : event,p);
	    var inRect=c.series.anyUsesAxes() && c.chartRect.contains(p);

	    doubleTap(c);
    	if(c.zoom.enabled){
    		twoFingersZoom(c,c.zoom);
    	}    
    
    
    var inRect=c.series.anyUsesAxes() && c.chartRect.contains(p);

    if (event.touches) {
      //alert("touch! "+event.touches.length.toString());
      // two-finger pinch to zoom, one finger to scroll

      if (event.touches.length>1) {
       // c.zoom.active=c.zoom.enabled && inRect;
    	  //if (c.zoom.active)
    	  c.scroll.active=false;
      }
      else {
        c.scroll.active=c.scroll.enabled && inRect;
        if (c.scroll.active)
          c.zoom.active=false;
      }
    }
    else
    {
      c.zoom.active=(event.button==c.zoom.mouseButton) && c.zoom.enabled && inRect;
      c.scroll.active=(event.button==c.scroll.mouseButton) && c.scroll.enabled && inRect;
    }

    c.zoom.done=false;
    c.scroll.done=false;
    c.oldPos=p;

    if (event.button===0) {  // c.zoom.mouseButton)
       done=c.tools.mousedown(event);
       if (!done) {
         done=c.series.mousedown(event);

         if (!done)
           done=c.legend.mousedown(event);
       }
     if (!done)
       if (c.mousedown) done=c.mousedown(event);

       c.canvas.oncontextmenu=null;
    }
    else
    if (event.button==2)
       c.canvas.oncontextmenu=function() {
         return false;
       }


    if (done)
      c.zoom.active=c.scroll.active=false;
    else
      done=(c.zoom.active || c.scroll.active);

    if (event.preventDefault)
       event.preventDefault();
    else
       event.cancelBubble=true;

    if (done) {

      // IE < 9 : "fromElement"
      var target = event.target || event.fromElement;

      if (target && target.setCapture)
          target.setCapture();
    }

    return !done;
  }

  this.domouseup=function(event) {
    event=event || window.event;
    var c=this.chart, done;
    c.zoom.active=false;
    c.scroll.active=false;

    if (c.zoom.done) {

      if (c.zoom.apply())
        if (c.onzoom) c.onzoom();

      c.draw();

      done=true;
    }
    else
    {
      done=c.scroll.done;
      if (!done) {
        done=c.series.clicked(c.oldPos);
        if (!done) {
           done=c.tools.clicked(c.oldPos);
           if (!done) {
             done=c.title.clicked(c.oldPos);
             if (done && c.title.onclick)
                 c.title.onclick(c.title);
           }
        }
    if (!done)
       if (c.mouseup) done=c.mouseup(event);
      }
    }

    c.zoom.old=null;

    c.zoom.done=false;
    c.scroll.done=false;

    if (done)
      if (event.preventDefault)
         event.preventDefault();
      else
         event.cancelBubble=true;
    else
      c.canvas.oncontextmenu=null;

    // IE < 9 : "fromElement"
    var target = event.target || event.fromElement;

    if (target && target.releaseCapture)
        target.releaseCapture();
  }


  /*
  if (c.addEventListener) {
    c.addEventListener("mousedown", this.domousedown, false);
    c.addEventListener("touchstart", this.domousedown, false);
    c.addEventListener("mousemove", this.domousemove, false);
    c.addEventListener("touchmove", this.domousemove, false);
    c.addEventListener("mouseup", this.domouseup, false);
    c.addEventListener("touchstop", this.domouseup, false);
  }
  else {
    // IE <9 attachEvent

    if (c.attachEvent) {
      c.attachEvent("onmousedown", this.domousedown);
      c.attachEvent("ontouchstart", this.domousedown);
      c.attachEvent("onmousemove", this.domousemove);
      c.attachEvent("ontouchmove", this.domousedown);
      c.attachEvent("onmouseup", this.domouseup);
      c.attachEvent("ontouchstop", this.domousedown);
    }
  }
  */

  c.onmousedown = c.ontouchstart = this.domousedown;
  c.onmouseup = c.ontouchend = this.domouseup;
  c.onmousemove = c.ontouchmove = this.domousemove;

  // Mouse wheel default to zoom / unzoom axes:

  this._doWheel=function(event) {

    function applyAxis(a) {
       var axisrange = a.maximum - a.minimum;

       if (axisrange>0) {
         var range = delta * axisrange * 0.05;
         a.setMinMax( a.minimum + range, a.maximum - range);
       }
    }

    var c=this.chart;

    if (!c.zoom.wheel.enabled) {
      for(var t=0, s; s=c.tools.items[t++];)
        if ((s instanceof Tee.ToolTip) && (s.active))
          s.hide();

      return;
    }

    event=event || window.event;

    var delta = c.zoom.wheel.factor * ( (event.wheelDelta) ? event.wheelDelta/120 : (event.detail) ? -event.detail/3 : 0 );

    if (Math.abs(delta)>0) {

      var p = { x:0, y:0 };
      c.calcMouse(event,p);

      if (c.chartRect.contains(p)) {
        c.axes.each(function() {
          applyAxis(this);
        });

        c.draw();

        event.returnValue = false;
        if (event.preventDefault)
           event.preventDefault();
      }

      for(var t=0, s; s=c.tools.items[t++];)
        if ((s instanceof Tee.ToolTip) && (s.active))
          s.mousemove(p);
    }
  }

  if (c.addEventListener)
      c.addEventListener('DOMMouseScroll', this._doWheel, false);

  c.onmousewheel = this._doWheel;

  // Alternative to canvas lack of mouse setCapture:

  c.onmouseout=function(e) {
    if (e && (!e.target.setCapture))
       this.chart.scroll.active=false;

    this.chart.series.mouseout();
    this.chart.tools.mouseout();
  }

  /**
   * @returns {Tee.Series} Returns the series parameter
   * @param {Tee.Series} series The series object to add to chart.
   */
  this.addSeries=function(series) {
    series.setChart(series,this);
    if (series.donutArray !=null && series.donutArray !== 'undefined') series.linkDonutsToChart();

    var li=this.series.items, n=li.indexOf(series);

    if (n==-1)
       n=li.push(series)-1;

    if (series.title==="")
      series.title="Series"+(1+n).toString();

    if (series.format.fill==="")
      series.format.fill=this.palette.get(n);

    return series;
  }

  this.removeSeries=function(series) {
    var li=this.series.items, n=li.indexOf(series);
    if (li!=-1)
       li.splice(n,1);
  }

  c.chart=this;

  function newSeries(v) {
    var St=type || Tee.Bar, s=c.chart.addSeries(new St(c.chart));
    s.data.values=v;
  }

  if (data && (data.length>0)) {
    if (data[0] instanceof Array)
       for(var t=0; t<data.length; t++)
         newSeries(data[t]);
    else
       newSeries(data);
  }

  /**
   * @returns {Tee.Series} Returns the index'th series in chart series list
   * @param {Integer} index The index of the chart series list to obtain.
   */
  this.getSeries=function(index) {
    return this.series.items[index];
  }

  /**
   * Main Chart draw method. Repaints all chart contents.
   */
  this.draw=function(ctx) {

   var series=this.series, r=this.chartRect;

   this.ctx = ctx || (this.canvas.getContext ? this.canvas.getContext("2d") : null); //,{alpha:false} (opaque canvas)
   ctx=this.ctx;

   if (!ctx)
      throw "Canvas does not provide Context";

   if (r.automatic)
       r.setFrom(this.bounds);

   var len=series.items.length, s, paintAxes=false, paintWalls=false,
       maxZ=1, visCount=series.visibleCount(), tmp=0;

   while(len--) {
      s=series.items[len];

      if (s.visible) {

        s.initZ(tmp,visCount);
        tmp++;

        if (s._paintAxes)
           paintAxes=true;
        if (s._paintWalls)
           paintWalls=true;

        if (s.maxZ && (s.maxZ>maxZ))
           maxZ=s.maxZ;
      }
    }

   this.walls.left.format.depth=maxZ;
   this.walls.bottom.format.depth=maxZ;
   this.walls.back.format.z=maxZ;

   this.panel.draw();

   if (r.automatic)
      this.panel.margins.apply(r);

   this.title.tryDraw(true);
   this.footer.tryDraw(false);

   series.beforeDraw();

   if (this.legend.visible) {
     this.legend.calcrect();
     this.legend.draw();
   }

   if (aspect.view3d && (!this.__webgl)) {
     r.y+=aspect._orthoy;
     r.height-=aspect._orthoy;
     r.width-=aspect._orthox;
   }

   var ax=this.axes, oldt;

   if (this.series.anyUsesAxes()) {

     ax.each(Axis.adjustRect);
     ax.each(Axis.calcRect);

     if (this.walls.visible && paintWalls)
         this.walls.draw(r,this.aspect);

     if (ax.visible && paintAxes) {

       if (ax.transparency>0) {
         oldt=ctx.globalAlpha;
         ctx.globalAlpha=(1-ax.transparency)*oldt;
       }

       var groups=ctx.beginParent;
       ax.visual = groups ? ctx.beginParent() : null;

       ax.each(Axis.draw);

       if (groups)
          ctx.endParent();

       if (ax.transparency>0)
          ctx.globalAlpha=oldt;
     }
   }

   this.series.draw();
   this.tools.draw();

   if (this.zoom.active)
       this.zoom.draw();

   if (this.ondraw) this.ondraw(this);
   
   if (this.isNLc)
   {
	   var f = new Tee.Format(this);
	   var msg = "TeeChart Evaluation (c)Steema Software 2018";
	   var tw; 
	   var ctx = this.ctx;
	   ctx.save();
	   ctx.font = "13px Courier";
	   tw = f.textWidth(msg);
	   var rText = { x: this.chartRect.x + (this.chartRect.width / 2) - (tw/2), y: (this.bounds.height / 2), width: tw, height: f.textHeight("H")};
	   ctx.translate((this.chartRect.x + (this.chartRect.width / 2)), (this.bounds.height / 2));
	   ctx.rotate(-30 * Math.PI / 180);
	   ctx.translate(-(this.chartRect.x + (this.chartRect.width / 2)), -(this.bounds.height / 2));
	   f.font.fill = "rgba(64,108,128, 0.55)";
	   f.drawText(rText, msg);
	   ctx.restore();
   }   
  }

  /**
   * Paints chart to image parameter, as PNG or JPEG picture made from canvas.
   * @param {String} image The id of an Image HTML component.
   * @param {String} format Can be "image/png" or "image/jpeg"
   * @param {Number} quality From 0% to 100%, jpeg compression quality.
   */
  this.toImage=function(image,format,quality) {
    var i=document.getElementById(image);
    if (i)
      i.src= (format!=="") ? this.canvas.toDataURL(format, quality) : this.canvas.toDataURL();
  }
}

/**
 * @constructor
 * @augments Tee.Series
 * @class Base abstract class to draw data as vertical or horizontal bars
 * @property {Number} [sideMargins=100] Defines the percent of bar size to use as spacing between axes.
 * @property {Boolean} [useOrigin=true] Determines if {Tee.CustomBar#origin} value is used as bar minimum.
 * @property {Number} [origin=0] Defines the value to use as bar minimum.
 * @property {Number} [barSize=70] Defines the percent size of bars on available space.
 * @property {Number} [offset=0] Defines the percent bar size to offset each bar.
 * @property {String} [barStyle="bar"] Which shape to draw ("bar", "ellipse", "line").
 * @property {Boolean} [stacked="no"] Use "no", "yes", "100", "sideAll", "self", "side" to define stack behaviour with other BarSeries.
 */
Tee.CustomBar=function(o,o2) {

  Tee.Series.call(this,o,o2);

  this.sideMargins=100;
  this.useOrigin=true;
  this.origin=0;
  this.continuous=false;

  this.marks.visible=true;
  this.marks.location='end';

  this.hover.enabled=true;

  this.offset=0; // %
  this.barSize=70; // %
  this.barStyle="bar"; // "ellipse"
  var percent = 1;
  var f=this.format;
  f.fill="";
  f.stroke.fill="black";
  f.shadow.visible=true;
  f.round.x=4;
  f.round.y=4;
  f.gradient.visible=true;

  f.depth=1;

  this.stacked="no"; // "yes", "100", "sideAll", "self", "side"

  this.drawBar=function(r, barStyle) {
  
    var old = f.depth, oldz=f.z, ctx=this.chart.ctx;

    if (!barStyle) barStyle=this.barStyle;

    f.depth = ( 0.5*Math.min( this.yMandatory ? r.width : r.height, 200) ) / 100;  // 200=Three.totalDepth !!

      if ((r.width > 0) && (r.height>0)) {
      if (this.stacked !== 'side')
        f.z=f.z+0.5*(1-f.depth);

      if (barStyle==="bar") {
         f.cube(r);
      }
      else
      if (barStyle==="line") {
         var pos;

         ctx.beginPath();
         ctx.z=f.z+f.depth*0.5;

         if (this.yMandatory) {
         pos=r.x+0.5*r.width;

         ctx.moveTo(pos,r.y);
         ctx.lineTo(pos,r.y+r.height);

         //f.rectPath(pos,r.y,1,r.height);
         }
         else
         {
         pos=r.y+0.5*r.height;

         ctx.moveTo(r.x,pos);
         ctx.lineTo(r.x+r.width, pos);

         //f.rectPath(r.x,pos,r.width,1);
         }
      }
      else
      if (barStyle==="cylinder")
         f.cylinder(r, 1, this.yMandatory);
      else
      if (barStyle==="cone")
         f.cylinder(r, 0, this.yMandatory);
      else
      if ((barStyle==="ellipsoid") && this.chart.__webgl) {
         ctx.depth=f.depth;
         ctx.z=f.z;
         ctx.image=this.image;
         ctx.ellipsoid(r, this.yMandatory);
      }
      else {
         f.z += 0.5*f.depth;
         f.ellipsePath(this.chart.ctx, r.x+(r.width*0.5),r.y+(r.height*0.5), r.width,r.height);
      }

      f.depth = old;
      f.z = oldz;
        
      return true;
    }
    else return false;
  }

 /**
  * @returns {Number} Returns the number of visible Tee.CustomBar series that are displayed before this series.
  */
  this.countAll=function(upToThis) {
    var i=this.chart.series.items, res=0, len=i.length, t, s;

    for (t=0; t<len; t++) {
      s=i[t];

      if ((s==this) && upToThis)
         break;
      else
      if (s.visible && (s.constructor==this.constructor))
        res+=s.data.values.length;
    }

    return res;
  }

  var offset=new Point(),originPos,bar=new Rectangle(),
      visibleBar={total:0, index:0};

  this._margin=0;

  this.calcBarOffset=function(axisSize) {

    var barSize=axisSize, all=(this.stacked=="sideAll");

    this.countall= all ? this.countAll(true) : 0;

    var tmpLen, len= all ? this.countAll() : this.data.values.length;

    if (len>1)
       barSize /= (len);

    if (this.stacked=="no") {
      barSize /= visibleBar.total;
    offset.x=(barSize*this.barSize*0.01) * ((visibleBar.total==1) ? -0.5 : (visibleBar.index -(visibleBar.total*0.5))) ;
      tmpLen=visibleBar.total;
    }
    else
    {
      offset.x=-barSize*0.5;
      tmpLen=1;
    }

    offset.y=barSize*this.barSize*0.01;

    this._margin=(0.5*tmpLen*offset.y)+this.sideMargins*(tmpLen*(barSize-offset.y))*0.005;

  if (this.stacked!="no")
      offset.x+=(this.offset*barSize*0.01) + (barSize-offset.y)*0.5;
  }

  this.calcStackPos=function(t,p) {
    var v, tmp, a;

    if (this.isStacked) {
      this.calcStack(t,p,this.data.values[t]);

      v=this.pointOrigin(t,false), a=this.mandatoryAxis;

      if (this.isStack100) {
        tmp=this.pointOrigin(t,true);
        originPos=(tmp===0) ? a.endPos : a.calc(v*100.0/tmp);
      }
      else
        originPos=a.calc(v);
    }
    else
    {
      this.calc(t,p);

      if (this.stacked=="sideAll") {
        tmp=this.notmandatory.calc(this.countall+t);
        if (this.yMandatory)
           p.x=tmp;
        else
           p.y=tmp;
      }
    }
  }
  
  var hasPaintedOver = false;

  this.drawSortedValues = function (sorted) {
      var animation = this.sortedOptions.sortedDrawAnimation;
      if (this.sortedOptions.sorted != sorted && !this.sortedOptions.sorting && animation && !animation.running) {
          
          this.sortedOptions.sorted = sorted;
          var data = this.data;
          if (this.sortedOptions.sorted) this.sortValues();
              
          var prevValues = this.sortedOptions.sorted ? this.sortedOptions.originalValues.slice() : this.sortedOptions.sortedValues.slice();
          var values = this.data.values;
          var endValues = this.sortedOptions.sorted ? this.sortedOptions.sortedValues.slice() : this.sortedOptions.originalValues.slice();

          var series = this;
          var sortedOptions = this.sortedOptions;
          animation.chart = this.chart;
          if (sortedOptions.sortingAnimationType == "horizontalchange") {
              animation.doStep = function (f) {
                //do with draw
                  if (f < 1) {
                      percent = f;
                      series.draw();
                  }
              }

              animation.onstop = function () {
                  percent = 1;
                  if (sortedOptions.sorted)
                      for (var i = 0; i < prevValues.length; i++) {
                          values[i] = endValues[i];
                      }
                  //animation.running = false;
              }
              animation.onstart = function () {
                  if (!sortedOptions.sorted)
                      for (var i = 0; i < prevValues.length; i++) {
                          values[i] = endValues[i];
                      }
                  //animation.running = true;
              }
          }
          else {
              animation.doStep = function (f) {
                  //do with draw
                  if (f < 1) {
                      for (var i = 0; i < prevValues.length; i++) {
                          values[i] = prevValues[i] + (endValues[i] - prevValues[i]) * f;
                      }
                  }
              }

              animation.onstop = function () {
                  percent = 1;
                  for (var i = 0; i < prevValues.length; i++) {
                      values[i] = endValues[i];
                  }
                  animation.running = false;
              }
              animation.onstart = function () {
                  animation.running = true;
              }

          }
          animation.animate();

          this.data.labels = this.sortedOptions.sorted ? this.sortedOptions.sortedLabels.slice() : this.sortedOptions.originalLabels.slice();
        
          
          this.chart.draw();
      }
  }
  this.draw=function() {
    var len=this.data.values.length;

    if (len>0) {
      this.initOffsets();

      var p=new Point(), c=this.chart.ctx;

      if (!this.hover.enabled) {
        f.stroke.prepare();
        f.shadow.prepare(c);
      }

      var hover=this.hover.enabled,
          isLine=(this.barStyle==='line'),
          _styles=this.data.styles;

    if ((hover) && (this.format.image.url!=null))
    {
      this.hover.image.url = this.format.image.url;
    this.hover.image.repeat = this.format.image.repeat;
    this.hover.image.backFill = this.format.image.backFill;
    }

      f.z = 0; //B407 init
      for(var t=0; t<len; t++)
      if (!this.isNull(t)) {
        this.calcStackPos(t,p);
          
          
          var sortedP = new Tee.Point();
          
          if (percent < 1) {
              this.calcStackPos(this.sortedOptions.sortedValuesIndices.findIndex(function (x) { return x == t }), sortedP);
              if (this.sortedOptions.sorted) p.x = (-p.x + sortedP.x) * percent + p.x;
              else p.x = (p.x - sortedP.x) * percent + sortedP.x;

          }
        this.calcBarBounds(p,bar,offset,originPos instanceof Array? originPos[t]: originPos);
        var pointPainted = this.drawBar(bar, _styles ? _styles[t] : null);

        var isover=(hover && (this.over==t)),
            ff= isover ? this.hover : f;

        c.fillStyle=this.getFillStyle(bar, this.getFill(t, ff.fill==='' ? f : ff));
        
        if (!this.format.gradient.visible)
          ff.fill=c.fillStyle;

        if (hover)
          ff.shadow.prepare(c);
    
    if (isover) {
      if ((this.format.image.url!=null) && (!hasPaintedOver)) //prevent fill flicker for first hover
      { 
        hasPaintedOver = true;
        f.draw(c,null,bar);
      }
      else 
        c.fill();
    }
    
    if (pointPainted)
    {
            ff.draw(c,null,bar);

            if (isLine || (ff.stroke.fill!=="")) {

              if (hover)
                 ff.stroke.prepare();

              if ((!isover) && isLine)
                c.strokeStyle=c.fillStyle;

              c.shadowColor = "transparent";

              c.stroke();

              if (ff.shadow.visible)
                 c.shadowColor = ff.shadow.color;
            }
    }
      }
    }
  }

  this.calcColorEach=function() {
    this.chart.series.visibleCount(this,Tee.CustomBar,visibleBar);
    this.isColorEach=(this.colorEach=="yes") || ((this.colorEach=="auto") && (visibleBar.total==1));
  }

  this.initOffsets=function() {
    var nomand = this.notmandatory, mand = this.mandatoryAxis,
        range=this.yMandatory ? this.maxXValue()-this.minXValue() : this.maxYValue()-this.minYValue();

  if (this.stacked=="sideAll")  
    this.calcBarOffset(nomand.axisSize);
  else
    this.calcBarOffset(range===0? nomand.axisSize : nomand.calcSize(range));

    if (this.useOrigin) {
      if (this.origin instanceof Array) {
         originPos = [];
         for (var t=0; t<this.origin.length; t++) {
             originPos[t] = mand.calc(this.origin[t]);
         }
      }
      else {
        originPos = mand.calc(this.origin);
      }
    }
    else
    if (this.yMandatory)
       originPos=mand.inverted ? mand.startPos : mand.endPos;
    else
       originPos=mand.inverted ? mand.endPos : mand.startPos;

    var st=this.stacked;

    this.isStacked=(st!=="no") && (st!=="sideAll") && (st!=='side');
    this.isStack100=st==="100";
  }

 /**
  * @returns {Number} Returns the index of series bar that contains {@link Tee.Point} p parameter.
  */
  this.clicked=function(p) {

    this.initOffsets();

    var p2=new Point(), len=this.data.values.length, t;
    
    for(t=0; t<len; t++)
    if (!this.isNull(t)) {
        this.calcStackPos(t,p2);
        this.calcBarBounds(p2,bar,offset,originPos instanceof Array? originPos[t]: originPos);

        if (bar.contains(p))
           return t;
    }

    return -1;
  }

  this.markPos=function(t,p) {
    var yMand=this.yMandatory, op=offset.x+(offset.y*0.5), m=this.marks;

    this.calcStackPos(t,p);

    if (this.stacked=="sideAll") {
      var tmp=this.notmandatory.calc(this.countall+t);
      (yMand) ? p.x=tmp : p.y=tmp;
    }

    var inv=(this.useOrigin && (this.data.values[t] < ((this.origin instanceof Array)? this.origin[t]: this.origin)));
    if (this.mandatoryAxis.inverted) inv=!inv;

    // Marks location

    if (m.location=="center") {
      this.calcBarBounds(p,bar,offset,originPos instanceof Array? originPos[t]: originPos);

      if (m.canDraw(p.x,p.y,t,inv)) {
        if (yMand)
          p.y=bar.y+(bar.height*0.5)+(m.bounds.height*0.5);
        else
          p.x=bar.x+(bar.width*0.5)-(m.bounds.width*0.5);
      }
    }

    var a=this.chart.aspect, is3d=a.view3d, wx=0, wy=0;

    if (is3d && a.orthogonal) {
      wx=a._orthox*0.5;
      wy=a._orthoy*0.5;
    }

    if (yMand) {
      p.x += is3d ? op+wx : op;
      if (is3d) p.y-=wy;
    }
    else {
      p.y += is3d ? op-wy : op;
      if (is3d) p.x+=wx;
    }

    return inv;
  }

  /*
  this.drawMarks=function() {
    var len=this.data.values.length, m=this.marks, p=new Point(), inv;

    if (len>0)
      for(var t=0; t<len; t+=m.drawEvery)
        if (!this.isNull(t)) {
          inv=this.markPos(t,p);
          m.drawMark(p.x, p.y, t, inv);
        }
  }
  */
  
  this.labelOrTitle=function(index) {
    var s=this.title, l=this.data.labels[index];
    return visibleBar.total>1 ? (s || l ) : this.parent.labelOrTitle(index);
  }

  this.initZ=function(index,total) {
    var s, f=this.format;

    if (this.stacked !== 'side')
    {
      f.z=0;
      f.depth=1;

      while(index>1) {
        index--;
        s=this.chart.series.items[index];

        if (s.visible && (s.constructor==this.constructor)) {
          f.z=s.z;
          f.depth=s.depth;
          break;
        }
      }

    }
    else
      Tee.Series.prototype.initZ.call(this,index,total);

    this.marks.format.z = f.z + f.depth*0.5;
  }

}

Tee.CustomBar.prototype=new Tee.Series();
Tee.CustomBar.prototype.parent=Tee.Series.prototype;
Tee.CustomBar.constructor=Tee.CustomBar;

/**
 * @constructor
 * @augments Tee.CustomBar
 * @class Draws data as vertical bars
 */
Tee.Bar=function(o,o2) {

  Tee.CustomBar.call(this,o,o2);

  this.calc=function(index,p) {
    (this.isStacked) ? this.calcStack(index,p,this.data.values[index]) : this.parent.calc.call(this,index,p);
  }

  this.horizMargins=function(p) {
    this.initOffsets();
    p.x=this._margin;
    p.y=this._margin;
  }

  this.vertMargins=function(p) {
    var m=this.marks, st=this.format.stroke, hasNeg=this.minYValue()<(this.origin instanceof Array? ArrayMin(this.origin): this.origin);

    if (m.visible && (m.location!=='center')) {
       p.y=m.arrow.length+m.format.textHeight("Wj")+m.margins.top+m.margins.bottom;
       st=m.format.stroke;
    }

    if (st.fill!=="")
       p.y+=(2*st.size)+1;

    if (hasNeg)
       p.x=p.y;
  }

  this.maxXValue=function() {
    return (this.stacked==="sideAll") ? this.countAll()-1 : this.parent.maxXValue.call(this);
  }

  this.minYValue=function() {
    var res=this.parent.minYValue.call(this);
    return this.useOrigin ? Math.min(this.origin instanceof Array? ArrayMin(this.origin): this.origin, res) : res;
  }

  this.maxYValue=function() {
    if ((this.stacked==="sideAll") || (this.stacked==="side")) {
      var res=0, s, ss=this.chart.series.items, l=ss.length, t, val;

      for (t=0; t<l; t++) {
        s=ss[t];
        if (s.visible && (s.constructor === this.constructor)) {
           val = s.parent.maxYValue.call(s);
           if (val>res) res=val;
        }
      }
      
      return res;
    }
    else
       return this.stackMaxValue();
  }

  this.calcBarBounds=function(p,bar,offset,originPos) {
    bar.x=p.x+offset.x;
    bar.width=offset.y;

    if (this._vertAxis.inverted)
    {
      bar.y=originPos;
      bar.height=p.y-bar.y;
    }
    else
    {
      bar.y=p.y;
      bar.height=originPos-p.y;
    }

    if (bar.height<0) {
      bar.y+=bar.height;
      bar.height=-bar.height;
    }
  }
}

Tee.Bar.prototype=new Tee.CustomBar();
Tee.Bar.prototype.parent=Tee.CustomBar.prototype;

/**
 * @constructor
 * @augments Tee.CustomBar
 * @class Draws data as horizontal bars
 */
Tee.HorizBar=function(o,o2) {

  Tee.CustomBar.call(this,o,o2);

  this.yMandatory=false;
  this.format.gradient.direction="rightleft";

 /**
  * @returns {Number} Returns the maximum width in pixels of series marks texts.
  */
  this.maxMarkWidth=function() {
    var res=0, f, t, m=this.marks, l=this.count(), n;

    if (m.visible) {

     f=this.marks.format;
     f.font.prepare();

     for(t=0; t<l; t+=m.drawEvery)
     if (!this.isNull(t)) {
       n=f.textWidth(this.markText(t)+"W");
       if (n>res) res=n;
     }
    }
    return res;
  }

  this.horizMargins=function(p) {
    var m=this.marks, st=this.format.stroke, hasNeg=this.minXValue()<this.origin;

    if (m.visible && (m.location!=='center')) {
       p.y=m.arrow.length+this.maxMarkWidth()+m.margins.left+m.margins.right;
       st=m.format.stroke;
    }

    if (st.fill!=="")
       p.y+=(2*st.size)+1;

    if (hasNeg)
       p.x=p.y;
  }

  this.vertMargins=function(p) {
    this.initOffsets();
    p.x+=this._margin;
    p.y+=this._margin;
  }

  this.maxYValue=function() {
    return (this.stacked=="sideAll") ? this.countAll()-1 : this.parent.maxXValue.call(this);
  }

  this.minYValue=function() {
    return (this.stacked=="sideAll") ? 0 : this.parent.minXValue.call(this);
  }

  this.minXValue=function() {
    var res=this.parent.minYValue.call(this);
    return this.useOrigin ? Math.min(this.origin, res) : res;
  }

  this.maxXValue=function() {
    return this.stackMaxValue();
  }

  this.calcBarBounds=function(p,bar,offset,originPos) {
    bar.y=(p.y+offset.x);
    bar.height=offset.y;

    if (this._horizAxis.inverted)
    {
      bar.x=p.x;
      bar.width=originPos-p.x;
    }
    else
    {
      bar.x=originPos;
      bar.width=p.x-bar.x;
    }

    if (bar.width<0) {
      bar.x+=bar.width;
      bar.width=-bar.width;
    }
  }
}

Tee.HorizBar.prototype=new Tee.CustomBar();
Tee.HorizBar.prototype.parent=Tee.CustomBar.prototype;

/**
 * @constructor
 * @augments Tee.HorizBar
 * @class Draws a HorizBar with states in background and one limit.
 * @property {object}[limit] limit contains the properties of the limit.
 * @property {object}[states] states contains the properties of the states.
 */
Tee.Bullet = function (o, o2) {
    Tee.HorizBar.call(this, [o[0]], o2 ? [o2[0]] : []);
    
    this.barSize = 25;
    /**
     * @property {number}[origin: 38] it contains the origin of the limit.
     * @property {number}[width: 0.2] it contains the width of the limit.
     * @property {number}[height: 35] it contains the height of the limit.
     * @property {string}[color: "red"] it contains the color of the limit.
     * @property {object}[bar: null] it contains the limit bar.
     */
    this.limit = {
        origin: 38,
        width: 0.2,
        height: 35,
        color: "red",
        bar: null
    };
    this.marks.visible = false;
    /**
     * @property {array}[colors: ["#111", "#444", "#777", "#BBB", "#EEE"]] it contains the colors of the states.
     * @property {array}[values: [10, 10, 10, 10, 10]] it contains the values of the states.
     * @property {array}[barStates: []] it contains the bar array of the states.
     * @property {number}[barSize: 50] it contains the size of the states.
     * @property {boolean}[gradientVisible: false] it contains if the gradient will be visible or not.
     */
    this.states = {
        colors: ["#111", "#444", "#777", "#BBB", "#EEE"],
        values: [10, 10, 10, 10, 10],
        barStates: [],
        barSize: 50,
        gradientVisible: false
    };
    createStatesBars(this.states, this.origin);
    function createStatesBars(states, origin) {
        var sumStatesValues = 0;
        if (states.values.length > 0) {
            states.barStates.push(createBarState(states.values[0], sumStatesValues + origin, states.barSize, states.colors[0], states.colors[0], states.gradientVisible));
            sumStatesValues += states.values[0];
            for (var i = 1; i < states.values.length; i++) {
                states.barStates.push(createBarState(states.values[i], sumStatesValues + origin, states.barSize, states.colors[(i - 1) % states.colors.length], states.colors[(i) % states.values.length], states.gradientVisible));
                sumStatesValues += states.values[i];
            }
        }
    }

    this.minValue = function () {
        if (this.states.barStates.length >= 1)
            return this.states.barStates[0].origin;
        else
            return 0;
    }
    this.maxValue = function () {
        if (this.states.barStates.length >= 1)
            return this.states.barStates[this.states.barStates.length - 1].data.values[0];
        else
            return 0;
    }
    function createBarState(value, origin, barSize,color1, color2, gradientVis) {
        var values = [value + origin];
        var bar = new Tee.HorizBar(values);
        bar.stacked = "side";
        bar.origin = origin;
        bar.barSize = barSize;
        bar.marks.visible = false;
        bar.format.round.x = 0;
        bar.format.round.y = 0;
        bar.format.gradient.colors = [color1, color2];
        if (gradientVis) {
            bar.format.gradient.direction = "leftright";
            bar.format.gradient.visible = true;
        }
        else {
            bar.format.gradient.visible = false;
            bar.format.fill = color2;
            bar.palette.colors = [color2];
        }
        bar.format.shadow.visible = false;
        bar.format.stroke.fill = "rgba(0,0,0,0.0)";
        
        return bar;
    };
    this.parentDraw = this.draw;
    this.draw = function () {
        var minVal, maxVal;
        minVal = this.minValue();
        maxVal = this.maxValue();
        this.chart.zoom.reset = function () {
            this.chart.axes.each(function () { this.automatic = true; });
            this.chart.axes.bottom.setMinMax(minVal, maxVal);
        }
        this.states.barStates = [];
        createStatesBars(this.states, this.origin);
        for (var i = 0; i < this.states.barStates.length; i++) {
            if (this.chart) this.states.barStates[i].setChart(this.states.barStates[i], this.chart);
              this.states.barStates[i].draw();
        }
        this.limit.bar = createBarState(this.limit.width, this.limit.origin + this.origin, this.limit.height, this.limit.color, this.limit.color, false)
        this.limit.bar.setChart(this.limit.bar, this.chart);
        this.limit.bar.draw();
        this.parentDraw();
    }
}
Tee.Bullet.prototype = new Tee.HorizBar();
Tee.Bullet.prototype.parent = Tee.HorizBar.prototype;
/**
 * @constructor
 * @augments Tee.Series
 * @class Base abstract class for line, area, scatter plots
 * @property {Tee.CustomSeries-Pointer} pointer Paints a visual representation at each point position.
 * @property {String} stacked Defines if multiple series are displayed one on top of each other.
 * @property {Number} smooth Draws lines between points as diagonals (value 0) or smooth curves (value > 0 < 1).
 * @property {Boolean} [stairs=false] Draws lines between points in stairs mode instead of diagonals.
 * @property {Boolean} [invertedStairs=false] Draws lines between points in inverted stairs mode instead of diagonals.
 */
Tee.CustomSeries=function(o,o2) {
  Tee.Series.call(this,o,o2);

  this.stacked="no"; // "yes", "100"
  this.stairs=false;
  this.invertedStairs=false;
  
  this.continuous=true; //allows tooltip interpolation between points

  this.hover.enabled=true;
  this.hover.line=false;

  /*
   * @private
   */
  this.isStacked=false;
  this.isStack100=false;

  this.smooth=0;

  /**
   * @constructor
   * @public
   * @class Formatting properties to draw symbols at series data positions
   * @property {Number} [width=12] The horizontal size in pixels
   * @property {Number} [height=12] The vertical size in pixels
   * @property {Tee.Format} format Visual properties to paint pointers.
   * @property {Boolean} [colorEach=false] Determines if pointers will be filled using a different color
   * for each point in series.
   * @property {String} [style="rectangle"] The shape to draw at pointer positions
   */
  function Pointer(chart, series) {

    /*
     * @private
     */
    this.setChart=function(chart) {
      this.chart=chart;
      this.format.setChart(chart);
    }

    this.chart=chart;
  
  this.inflateMargins = true;

    /*
     * Visual properties to paint pointers
     */
    var f=this.format=new Tee.Format(chart);

    f.shadow.visible=false;
    f.fill="";
    f.gradient.colors=["white","white","white"];
    f.gradient.visible=true;
    f.shadow.visible=true;

    /*
     * Determines if pointers will be displayed.
     */
    this.visible=false;

    this.colorEach=false;

    /*
     * Visual style of pointer ("rectangle", "cylinder", "cone", "ellipse", "sphere", "triangle", "diamond", "downtriangle", "cross", "x").
     */
    this.style="rectangle";

    this.width=12;
    this.height=12;

    this.draw=function(p,index,f,fill) {
      var c=this.chart.ctx;

      f.z=series.format.z;

      if (this.transform) {
        c.save();
        this.transform(p.x,p.y,index);
      }

      var w=this.width*0.5, h=this.height*0.5, r;

      if (this.style=="cube")  {
        r={x:p.x-w, y:p.y-h, width:this.width, height:this.height};

        var wh=Math.max(w,h)/50; // 50=totalDepth !

        f.z=(series.format.z+series.format.depth)*0.5 - wh*0.5;
        f.depth=wh;

        f.cube(r);
        f.draw(c, null, r);
      }
      else
      if (this.style=="rectangle")
        f.rectangle(p.x-w,p.y-h,this.width,this.height);
      else
      if (this.style=="ellipse")
        f.ellipse(p.x,p.y,this.width,this.height);
      else
      if (this.style=="sphere") {
        f.depth=series.format.depth;
        f.sphere(p.x,p.y,this.width,this.height);
      }
      else
      if (this.style=="cylinder") {
        r={x:p.x-w, y:p.y-h, width:this.width, height:this.height};

        // Remember gradient properties:
        var g=f.gradient,
            oldDir=g.direction,
            oldColors=g.colors.slice(0);

        // Set gradient to resemble cylinder:
        g.direction="leftright";
        g.colors=[g.colors[1],g.colors[0],g.colors[1]];

        f.cylinder(r, 1, true);
        f.draw(c, null, r);

        // Restore gradient properties:
        g.direction=oldDir;
        g.colors=oldColors;
      }
      else
      if (this.style=="cone") {
        r={x:p.x-w, y:p.y-h, width:this.width, height:this.height};

        // Draw cylinder with top radius 0% to create a cone:
        f.cylinder(r, 0, true);

        f.draw(c, null, r);
      }
      else
      if (this.style=="triangle")
        f.polygon([new Point(p.x,p.y-h),
                             new Point(p.x-w,p.y+h),
                             new Point(p.x+w,p.y+h)]);
      else
      if (this.style=="downtriangle")
        f.polygon([new Point(p.x,p.y+h),
                             new Point(p.x-w,p.y-h),
                             new Point(p.x+w,p.y-h)]);
      else
      if (this.style=="diamond")
        f.polygon([new Point(p.x,p.y-h),
                             new Point(p.x-w,p.y),
                             new Point(p.x,p.y+h),
                             new Point(p.x+w,p.y)]);
      else
      {
        c.beginPath();

        if (this.style=="cross") {
          c.moveTo(p.x-w,p.y);
          c.lineTo(p.x+w,p.y);
          c.moveTo(p.x,p.y-h);
          c.lineTo(p.x,p.y+h);
        }
        if (this.style=="x") {
          c.moveTo(p.x-w,p.y-h);
          c.lineTo(p.x+w,p.y+h);
          c.moveTo(p.x-w,p.y+h);
          c.lineTo(p.x+w,p.y-h);
        }

        f.stroke.prepare(fill);
        c.stroke();
      }

      if (this.transform)
        c.restore();
    }

    this.setSize=function(size) {
       this.width=size;
       this.height=size;
    }
  }

  /*
   * Visual indication at series point positions.
   */
  this.pointer=new Pointer(this.chart, this);

  this.maxYValue=function() {
    return this.stackMaxValue();
  }

  this.calc=function(index,p) {
    (this.isStacked) ? this.calcStack(index,p,this.data.values[index]) : Tee.Series.prototype.calc.call(this,index,p);
  }

  this.calcColorEach=function() {
    this.isColorEach=(this.colorEach=="yes") || this.pointer.colorEach;
  }

  this.initZ=function(index,total) {
    var s, f=this.format;

    if (this.stacked !== 'no') {

      f.z=0;
      f.depth=1;

      while(index>1) {
        index--;
        s=this.chart.series.items[index];

        if (s.visible && (s.constructor==this.constructor)) {
          f.z=s.z;
          f.depth=s.depth;
          break;
        }
      }
    }
    else
      Tee.Series.prototype.initZ.call(this,index,total);

    this.marks.z = f.z + f.depth*0.5;
  }
}

Tee.CustomSeries.prototype=new Tee.Series();

Tee.CustomSeries.prototype.drawPointers=function() {
  var len=this.data.values.length,
      f=this.pointer.format,
      isEach=(this.colorEach=="yes") || this.pointer.colorEach;

  if (!isEach)
    if (f.fill==="")
       f.fill=this.format.fill;

  var p=new Point(), g=f.gradient, t, fill=f.fill, old=fill;

  if ((!isEach) && (g.visible))
     g.setEndColor(fill);

  for(t=0; t<len; t++)
  if (!this.isNull(t)) {
    this.calc(t,p);

    fill=this.getFill(t,f);

    if (fill!=old) {
      (g.visible) ? g.setEndColor(fill) : f.fill=fill;
      old=fill;
    }

    this.getSize(t);

    this.pointer.draw(p,t,f,fill);

    if (this.hover.enabled && (this.over==t))
      this.pointer.draw(p,t,this.hover,fill);
  }

  if (isEach)
    f.fill=old;
}

/**
 * @private
 */
Tee.CustomSeries.prototype.setChart=function(series,chart) {
    var tmp=Tee.Series.prototype.setChart;
    tmp(series,chart);
    series.pointer.setChart(chart);
}

/**
 * @returns {Number} Returns the index of the series point that contains p {@link Tee.Point} parameter.
 */
Tee.CustomSeries.prototype.clicked=function(p) {

  var p1=new Point(), p2=new Point(), len=this.data.values.length, t;

  // Line+Pointer only acts when this.hover.line=true

  if (this.drawLine && (len>0) && (this.hover.line || (!this.pointer.visible))) {
    this.calc(0,p1);

    for(t=1; t<len; t++)
    // if (!this.isNull(t))  <--- pending
    {
        this.calc(t,p2);

        if (this.stairs)
        {
          var p1a;

          if (this.invertedStairs)
             p1a=new Point(p2.x,p1.y);
          else
             p1a=new Point(p1.x,p2.y);

          if ((pointInLine(p,p1,p1a,3)) || (pointInLine(p,p1a,p2,3)))
             return t;
        }
        else
          if (pointInLine(p,p1,p2,3))  // near-line tolerance in pixels
             return t;

        p1.x=p2.x;
        p1.y=p2.y;
    }
  }

  if (this.pointer.visible) {
    var r=new Rectangle(), po=this.pointer;

    for(t=len-1; t>=0; t--)
    if (!this.isNull(t)) {
      this.calc(t,r);
      this.getSize(t);
      r.x-=po.width*0.5;
      r.width=po.width;
      r.y-=po.height*0.5;
      r.height=po.height;

      if (r.contains(p)) return t;
    }
  }

  return -1;
}

Tee.CustomSeries.prototype.horizMargins=function(p) {
  var po=this.pointer, s=po.format.stroke;
  if ((po.visible) && (po.inflateMargins))
    p.x=p.y=( (s.fill!=="") ? s.size : 0 ) + 1+(po.width*0.5);
}

Tee.CustomSeries.prototype.vertMargins=function(p) {
  var po=this.pointer, s=po.format.stroke;
  if ((po.visible) && (po.inflateMargins))
    p.x=p.y=( (s.fill!=="") ? s.size : 0 ) + 1+(po.height*0.5);
}

Tee.CustomSeries.prototype.getSize=function() {}

/**
 * @constructor
 * @augments Tee.CustomSeries
 * @class Draws series data as a contiguous polyline between points
 * @property {Boolean} [stairs=false] Determines if lines between points are direct (diagonals) or as stairs (horizontal and vertical).
 */
Tee.Line=function(o,o2) {

  Tee.CustomSeries.call(this,o,o2);

  this.drawLine=true;

  this.treatNulls="dontPaint";

  var f=this.format;
  f.shadow.visible=true;
  f.shadow.blur=10;
  f.lineCap="round";

  this.doDrawLine=function(c) {

    var p=new Point(), oldX, oldY, len=this.data.values.length, t, smop, s,
        begin=0, end=len, no=this.notmandatory;

    if ((!this.smooth) && (!this.data.x)) {
      begin=Math.max(0,trunc(no.minimum)-1);
      end=Math.min(len,trunc(no.maximum)+2);
    }

    var a=this.chart.aspect, is3d=a.view3d;

    //if (is3d)
    //  var wx=a._orthox*0.5, wy=a._orthoy*0.5;

    c.beginPath();

    if ((this.smooth>0) && (typeof Tee.drawSpline !== 'undefined')) {
      smop=new Array(2*len);

      for(t=0; t<len; t++) {
        this.calc(t,p);

        smop[2*t]=p.x;
        smop[2*t+1]=p.y;
      }

      if (c.spline)
        c.spline(smop);
      else
        Tee.drawSpline(c, smop, this.smooth, true);

    }
    else
    {
      var noNulls = this.treatNulls !== "skip";

      for (t=begin; t<end; t++)
      if (this.isNull(t)) {
        if (noNulls)
            begin=-1;  // Dont Paint until next non-null
      }
      else
      {
        this.calc(t,p);

        /*
        if (is3d) {
          p.x+=wx;
          p.y-=wy;
        }
        */

        if ((t==begin) || (begin===-1)) {
           c.moveTo(p.x,p.y);
           begin=0;
        }
        else
        if (this.stairs) {
          if (this.invertedStairs)
             c.lineTo(p.x,oldY);
          else
             c.lineTo(oldX,p.y);

          c.lineTo(p.x,p.y);
        }
        else
           c.lineTo(p.x,p.y);

        oldX=p.x;
        oldY=p.y;
      }
    }

    var st=f.stroke;

    // Chrome bug with shadow and stroke size == 1
    if (this.chart.isChrome && f.shadow.visible)
       st.size=Math.max(1.1,st.size);

    c.z=f.z;
    c.depth=f.depth;

    s=st.fill;
    if (s==="") s=f.fill;

    st.prepare(s);
    f.shadow.prepare(c);

    if (is3d) {
      c.fillStyle=f.fill;
      c.fill();
    }

    if (s!=='')
       c.stroke();
  }

  this.draw=function() {
    var len=this.data.values.length;

    if (len>0) {
      this.isStacked=this.stacked!="no";
      this.isStack100=this.stacked=="100";

      if (this.drawLine)
         this.doDrawLine(this.chart.ctx);

      if (this.pointer.visible)
         this.drawPointers();
    }
  }
}

Tee.Line.prototype=new Tee.CustomSeries();

/**
 * @constructor
 * @augments Tee.Line
 * @class Draws series data as points at vertical and horizontal axes positions
 */
Tee.PointXY=function(o,o2) {
  Tee.Line.call(this,o,o2);
  this.hover.enabled=true;
  this.pointer.visible=true;
  this.drawLine=false;
}

Tee.PointXY.prototype=new Tee.Line();

Tee.Series.prototype.cellRect=function(r,act,series) {
  var visible={total:0, index:-1};
  r.setFrom(this.chart.chartRect);
  this.chart.series.visibleCount(this,series,visible);

  if (act && (visible.total>1)) {
    var cols=Math.round(Math.sqrt(visible.total)), rows=Math.round(visible.total/cols);

    if (r.width>r.height) {
      var tmp=cols;
      cols=rows;
      rows=tmp;
    }

    r.width/=cols;
    r.x+=1.03*(visible.index % cols)*r.width;

    r.height/=rows;
    r.y+=1.03*trunc(visible.index/cols)*r.height;

    // % spacing between multiple series
    r.width*=0.94;
    r.height*=0.94;
  }

  return r;
}

/**
 * @constructor
 * @augments Tee.Series
 * @class Draws series data as slices of a circle
 * @property {Number} [rotation=0] Rotates all slices by specified degree from 0 to 360.
 * @property {Number[]} explode Determines percent of separation from each slice to pie center.
 */
Tee.Pie=function(o,o2) {
  Tee.Series.call(this,o,o2);

  this.marks.style="percent";

  this.donut=0;
  this.rotation=0;
  this.colorEach="yes";
  this.useAxes=false;
  this.continuous = false;
  this.angleWidth = 360;
  this.maxRadius = 100;
  var f=this.format;
  f.stroke.fill="black";
  f.shadow.visible=true;
  f.gradient.visible=true;
  f.gradient.direction="radial";
  f.gradient.colors=["white","white","white"];

  this.hover.enabled=true;

  this.sort="values";
  this.orderAscending=false;

  this.explode=null;

  this.marks.visible=true;

  this.concentric=false;

 /**
  * @returns {Number} Returns the index'th pie slice value.
  */
  this.getValue=function(index) {
    return this.data.values[index];
  }

  this.calcCenter=function(t,radius,mid,center) {
    if (this.explode) {
      var v=this.explode[t];
      if (v) {
        v=radius*v*0.01;
        center.x+=(v*Math.cos(mid));
        center.y+=(v*Math.sin(mid));
      }
    }
  }

  this.clicked=function(p) {
    var c=this.chart.ctx, len=this.data.values.length, t, index;

    //IE8 ExCanvas does not support "isPointInPath"

    if (c.isPointInPath) {

      endAngle=angle=Math.PI*this.rotation/180.0;

      for (t=0; t<len; t++) {
        index = sorted ? sorted[t] : t;

        if (!this.isNull(index)) {
          this.slice(c,index);

          if (c.isPointInPath(p.x,p.y))
            return index;
        }
      }
    }

    return -1;
  }

  var total, piex, piey, radius, donutRadius,
      center={x:0,y:0}, sorted, angle, endAngle, hoverang;

  function calcPos(angle,p) {
    p.x=center.x+Math.cos(angle)*donutRadius;
    p.y=center.y+Math.sin(angle)*donutRadius;
  }

  // Return Pie radius, and returns pie center xy at "c" parameter
  this.getCenter=function(c) {
    c.x=center.x;
    c.y=center.y;
    return radius;
  }

  this.slice=function(c,index) {
    var p=new Point();

    endAngle += Math.PI * 2 * (Math.abs(this.data.values[index]) / total) / (360 / this.angleWidth);
    center.x=piex;
    center.y=piey;
    this.calcCenter(index,radius,(angle+endAngle)*0.5,center);

    if (this.donut===0) {
       p.x=center.x;
       p.y=center.y;
    }
    else
       calcPos(angle,p);

    var webgl=this.chart.__webgl;

    if (webgl) {
      calcPos(2*Math.PI-angle,p);
      c.slice(p,center,radius,angle,endAngle,donutRadius,f.tube,f.beveled);
    }
    else
    {
      c.beginPath();
      c.moveTo(p.x,p.y);
      c.arc(center.x,center.y,radius,angle,endAngle,false);

      if (this.donut!==0) {
        calcPos(endAngle,p);
        c.lineTo(p.x,p.y);
        c.arc(center.x,center.y,donutRadius,endAngle,angle,true);
      }

      c.closePath();
    }

    if (index==this.over)
      hoverang=angle;

    angle=endAngle;
  }

  this.fill=function(i) {
    return this.getFillStyle(this.chart.chartRect,this.getFill(i));
  }

  this.slices=function(shadow) {
    var c=this.chart.ctx, len=this.data.values.length, t, index;

    endAngle=angle=Math.PI*this.rotation/180.0;

    // TODO: Replace with overriden Tee.Format.slice
    c.z=0.5;
    c.depth=1;

    for(t=0; t<len; t++) {

      index = sorted ? sorted[t] : t;

      if (!this.isNull(index)) {
        this.slice(c,index);

        if (shadow)
           f.shadow.prepare(c);
        else
           c.fillStyle=this.fill(index);

        c.fill();

        if (!shadow) {
           var st=f.stroke;

           if (st.fill!=="") {
             st.prepare();
             c.stroke();
           }
        }
      }
    }
  }

  var r=new Rectangle();

  this.draw=function() {
    var len=this.data.values.length;

    if (len>0) {

      var h=0, m=this.marks;

      if (f.shadow.visible)
         h+=2*f.shadow.height;

      if (m.visible) {
        m.format.font.prepare();
        h+=m.format.textHeight("Wj")+m.arrow.length*0.5;
      }

      this.cellRect(r,!this.concentric, Tee.Pie);

      piex=r.x+(r.width*0.5);
      piey=r.y+(r.height*0.5);

      radius=r.width*0.5;
      var r2=(r.height-2*h)*0.5;

      if (r2<0) r2=0;
      if (r2<radius) radius=r2;

      donutRadius=radius*this.donut*0.01;
      radius = radius / (100 / this.maxRadius);
      total=ArraySumAbs(this.data.values);

      sorted=this.doSort(this.sort, this.orderAscending);

      if (!this.chart.__webgl)
         this.slices(true);
         
      this.slices(false);

      if (this.hover.enabled && (this.over!=-1)) {
        var st=this.hover;
        if (st.stroke.fill!=="") {
          endAngle=angle=hoverang;

          var c=this.chart.ctx;
          this.slice(c,this.over);
          c.fillStyle=this.fill(this.over);
          st.draw(c,null,r);
        }
      }
    }
  }

  this.drawMarks=function() {
    var endAngle=Math.PI*this.rotation/180.0, angle=endAngle, mid,
        v=this.data.values, len=v.length, index, t;

    this.marks.format.z = 0.5;

    for(t=0; t<len; t+=this.marks.drawEvery) {

      index= sorted ? sorted[t] : t;

      if (!this.isNull(index)) {
        endAngle+=Math.PI*2*(Math.abs(v[index]) /total);
        mid=(angle+endAngle)*0.5;
        center.x=piex;
        center.y=piey;
        this.calcCenter(t,radius,mid,center);
        this.marks.drawPolar(center, radius, mid , index);
        angle=endAngle;
      }
    }
  }
}

Tee.Pie.prototype=new Tee.Series();

/**
 * @constructor
 * @augments Tee.CustomSeries
 * @class Draws series data as filled mountain segments between points
 * @property {Boolean} [useOrigin=false] Determines if {Tee.Area#origin} value is used as area minimum.
 * @property {Number} [origin=0] Defines the value to use as area minimum.
 */
Tee.Area=function(o,o2) {

  Tee.CustomSeries.call(this,o,o2);

  this.useOrigin=false;
  this.origin=0;
  this.drawLine=true;

  var f=this.format;
  f.shadow.visible=true;
  f.lineCap="round";
  f.stroke.fill="black";
  f.fill="";
  f.beveled=true;

  f.depth=1;
  f.z=0.5;

  var r=new Rectangle();

  this.draw=function() {
    var len=this.data.values.length;

    if (len>0) {
      var a=this.mandatoryAxis, nm=this.notmandatory, originPos, isY=this.yMandatory;

      if (this.useOrigin)
        originPos=a.calc(this.origin);
      else
      if ((isY && a.inverted) || ((!isY) && (!a.inverted)))
        originPos=a.startPos;
      else
        originPos=a.endPos;

      this.isStacked=this.stacked!="no";
      this.isStack100=this.stacked=="100";

      var start, p=new Point(), old, t, c=this.chart.ctx, smop,
          doStack=this.isStacked, // && (visibleBar.index>0),
          begin=0,end=len;

      if ((!this.smooth) && (!this.data.x)) {
        begin=Math.max(0,trunc(nm.minimum)-1);
        end=Math.min(len,trunc(nm.maximum)+2);
      }

      c.depth=f.depth;
      c.z=f.z;
      
      c.beginPath();

      if ((this.smooth>0) && (typeof Tee.drawSpline !== 'undefined')) {
        smop=new Array(2*len);

        for(t=0; t<len; t++) {
          this.calc(t,p);

          smop[2*t]=p.x;
          smop[2*t+1]=p.y;
        }

        start= isY ? smop[0] : smop[1];

        if (c.spline)
          c.spline(smop, true);
        else
          Tee.drawSpline(c, smop, this.smooth, true);

        if (doStack) {
          var tmp=0;

          for (t=len-1; t>=0; t--) {
            this.calcStack(t,p,0);
            smop[tmp++]=p.x;
            smop[tmp++]=p.y;
          }

          c.lineTo(smop[0], smop[1]);

          if (c.spline)
            c.spline(smop, true);
          else
            Tee.drawSpline(c, smop, this.smooth, false);
        }
      }
      else
      //  if (!this.isNull(t)) <-- pending
      {
        this.calc(begin,p);
        c.moveTo(p.x,p.y);
        start= isY ? p.x : p.y;
        old=isY ? p.y : p.x;

        if (this.stairs)
          for(t=begin+1; t<end; t++) {
            this.calc(t,p);
            c.lineTo(p.x,old);
            c.lineTo(p.x,p.y);
            old=isY ? p.y : p.x;
          }
        else
          for(t=begin+1; t<end; t++) {
            this.calc(t,p);
            c.lineTo(p.x,p.y);
          }
      }

      if (doStack) {
        if (this.smooth===0)
          for (t=end-1; t>=begin; t--) {
            this.calcStack(t,p,0);
            if (this.stairs) {
              c.lineTo(p.x,old);
              c.lineTo(p.x,p.y);
              old=isY ? p.y : p.x;
            }
            else
              c.lineTo(p.x,p.y);
          }
      }
      else
      {
        if (isY) {
          c.lineTo(p.x,originPos);
          c.lineTo(start,originPos);
        }
        else
        {
          c.lineTo(originPos,p.y);
          c.lineTo(originPos,start);
        }
      }

      c.closePath();

      var g=f.gradient;
      if (g.visible)
        g.colors[g.colors.length-1]=f.fill;

      this.bounds(r);

      if (c.__webgl)
          c.beveled = f.beveled;

      f.draw(c,null,r);

      if (this.pointer.visible)
         this.drawPointers();
    }
  }

  this.minYValue=function() {
    var v=this.yMandatory ? Tee.Series.prototype.minYValue.call(this) : Tee.Series.prototype.minXValue.call(this);
    return this.yMandatory ? this.useOrigin ? Math.min(v,this.origin) : v : v;
  }

  this.minXValue=function() {
    var v=this.yMandatory ? Tee.Series.prototype.minXValue.call(this) : Tee.Series.prototype.minYValue.call(this);
    return this.yMandatory ? v : this.useOrigin ? Math.min(v,this.origin) : v;
  }

  this.maxYValue=function() {
    var v = this.yMandatory ? this.stackMaxValue() : Tee.Series.prototype.maxXValue.call(this);
    return this.yMandatory ? this.useOrigin ? Math.max(v,this.origin) : v : v;
  }

  this.maxXValue=function() {
    var v = this.yMandatory ? Tee.Series.prototype.maxXValue.call(this) : this.stackMaxValue();
    return this.yMandatory ? v : this.useOrigin ? Math.max(v,this.origin) : v;
  }

  this.vertMargins=function(p) {
    if (this.yMandatory && (f.stroke.fill!==""))
      p.y+=f.stroke.size+2;
  }

  this.horizMargins=function(p) {
    if ((!this.yMandatory) && (f.stroke.fill!==""))
      p.y+=f.stroke.size+2;
  }
}

Tee.Area.prototype=new Tee.CustomSeries();

/**
 * @constructor
 * @augments Tee.Area
 * @class Horizontal area style
 */
Tee.HorizArea=function(o,o2) {
  Tee.Area.call(this,o,o2);
  this.yMandatory=false;
}
Tee.HorizArea.prototype=new Tee.Area;

/**
 * @constructor
 * @augments Tee.Pie
 * @class Draws series data as slices of a circle, with a center hole
 * @property {Number} [donut=50] Percent of hole size relative to pie radius. From 0 to 100.
 */
Tee.Donut=function(o,o2) {
    var lessDonutWidth = 100;
    var donutArray = [];
  Tee.Pie.call(this,o,o2);
  this.donut=50;
    
    this.refreshWidth = function () {
        if (this.concentric) {
            donutArray = this.chart.series.items;
            var nVisibleDonuts = 0;
            var n = 0;
            for (var i = 0; i < donutArray.length; i++) {
                if (donutArray[i].visible) nVisibleDonuts++;
            }
            if (lessDonutWidth == 100) getLessDonutWidth();
            for (var i = 0; i < donutArray.length; i++) {
                if (donutArray[i].visible) {
                    donutArray[i].donut = lessDonutWidth + n * ((100 - lessDonutWidth) / (nVisibleDonuts));
                    n++;
                }
            }
        }
    }
    function getLessDonutWidth() {
        for (var i = 0; i < donutArray.length; i++) {
            if (donutArray[i].donut < lessDonutWidth) lessDonutWidth = donutArray[i].donut;
                }
    }

}

Tee.Donut.prototype=new Tee.Pie();
   
    /**
     * @constructor
     * @augments Tee.Donut
     * @class Draws comparative of values plotted as concentric circular bands
     * @property {Number} [rotation=270] Rotates all slices by specified degree from 0 to 360.
     * @property {Number} [angleWidth=values%] Indicates the width of the Donut/Pie/ActivityGauge in degrees form 0 to 360.
     */
    
Tee.ActivityGauge = function (o, o2) {
    
    Tee.Donut.call(this, [], []);
    this.data = {
        values:(o!=null)?o:[],
        labels: (o2 != null) ? o2 : []
    }
    
    this.donutArray = [];
    this.maxWidth = 230;
    this.maxDrawWidth = this.maxWidth;
    this.addRandom = function (count) {
        for (var i = 0; i < count; i++) {
            this.add((Math.floor((Math.random() * 20) + 10)), (String.fromCharCode(65 + i)));
        }
        return this;
    }
    this.maxValue = function () {
        var tmp = this.data.values[0];
        for (var i = 0; i < this.data.values.length; i++) {
            if (tmp < this.data.values[i]) tmp = this.data.values[i];
        }
        return tmp;
    }

    if (o != null) {
        for (var i = 0; i < o.length; i++) {
            var donutCenterSize = 40;
            var tmpDonut = donutCenterSize + ((100 - donutCenterSize) * (i) / o.length);
            var tmpMaxRadius = donutCenterSize + ((100 - donutCenterSize) * (i + 1) / o.length);
            var tmpAngleWidth = Math.abs(this.maxDrawWidth * o[o.length - 1 - i] / this.maxValue());
            this.donutArray.push(createDonut(o[o.length - 1 - i], o2[o.length - 1 - i], tmpDonut, tmpMaxRadius, tmpAngleWidth));
        }
        }

    this.clicked = function (p) {
        var index = -1, i = 0;
        while (i < this.donutArray.length&&index==-1) {
            if (index == -1 && this.donutArray[i].clicked(p) != -1)     index =  this.donutArray.length - i - 1;
            i++;
    }
        return index;

    }
    function createDonut(value, label, tmpDonut, maxRadius, angleWidth) {
        var donut = new Tee.Donut([value], [label]);
        donut.concentric = true;
        donut.marks.visible = false;
        donut.format.shadow.visible = false;
        donut.format.gradient.visible = false;
        donut.donut = tmpDonut;
        donut.maxRadius = maxRadius;
        donut.angleWidth = angleWidth;
        donut.rotation = 270;
        donut.visible = false;
        return donut;
    }

    function copyFormat(donut, origin, colorNum) {
        var dF = donut.format;
        var f = origin.format;
        dF.fill = origin.chart.palette.colors[origin.donutArray.length - 1 - colorNum % origin.chart.palette.colors.length];
        dF.font.baseLine = f.font.baseLine;
        dF.font.fill = f.font.fill;
        dF.font.style = f.font.style;
        dF.font.textAlign = f.font.textAlign;
        dF.gradient.colors = [f.gradient.colors[0][colorNum]];
        dF.gradient.direction = f.gradient.direction;
        dF.gradient.offset.x = f.gradient.offset.x;
        dF.gradient.offset.y = f.gradient.offset.y;
        dF.gradient.stops = f.gradient.stops;
        dF.gradient.visible = f.gradient.visible;
        dF.round.x = f.round.x;
        dF.round.y = f.round.y;
        dF.shadow.blur = f.shadow.blur;
        dF.shadow.color = f.shadow.color;
        dF.shadow.height = f.shadow.height;
        dF.shadow.visible = f.shadow.visible;
        dF.shadow.width = f.shadow.width;
        dF.stroke.fill = f.stroke.fill.slice(0);
        dF.stroke.cap = f.stroke.cap;
        dF.stroke.dash = f.stroke.dash;
        dF.stroke.join = f.stroke.join;
        dF.stroke.size = f.stroke.size;
        dF.transparency = f.transparency;
        donut.fill = function (i) { return dF.gradient.visible ? dF.gradient.colors : dF.fill; }
    }
    this.recalcWidth=function() {
        for (var i = 0; i < this.donutArray.length; i++) {
            var donutCenterSize = 40;
            this.donutArray[i].donut = donutCenterSize + ((100 - donutCenterSize) * (i) / this.data.values.length);
            this.donutArray[i].maxRadius = donutCenterSize + ((100 - donutCenterSize) * (i + 1) / this.data.values.length);
            this.donutArray[i].angleWidth = Math.abs(this.maxDrawWidth * this.data.values[this.data.values.length - 1 - i] / this.maxValue());
        }
    }

    this.minValue = function () {
        var tmp = this.data.values[0];
        for (var i = 0; i < this.data.values.length; i++) {
            if (tmp > this.data.values[i]) tmp = this.data.values[i];
        }
        return tmp;
    }
    this.add = function (value, label) {
        var donutTmp = createDonut(value, label, 0, 0, 0);
        this.donutArray.push(donutTmp);
        this.data.values.push(value);
        this.data.labels.push(label);
        if(this.chart!=null) this.linkDonutsToChart();
    }
    this.draw = function () {
        
        for (var i = 0; i < this.donutArray.length; i++) {
            var c = this.donutArray[i].chart.ctx;
            copyFormat(this.donutArray[i], this, i);
            c.fillStyle = this.donutArray[i].getFillStyle(this.donutArray[i].chart.chartRect, this.donutArray[i].format.fill);
            this.recalcWidth();
            this.donutArray[i].draw();

        }
    }
    this.linkDonutsToChart = function () {
        for (var i = 0; i < this.donutArray.length; i++) {
            this.donutArray[i].setChart(this.donutArray[i], this.chart);
        }
        }
    }
Tee.ActivityGauge.prototype = new Tee.Donut();


/**
 * @constructor
 * @augments Tee.Series
 * @class Draws series data as Gantt horizontal bars with start and end datetime values.
 * @property {Number} [height=70] Percent of gantt bar height. From 0 to 100.
 */
Tee.Gantt=function(o,o2) {
  Tee.Series.call(this,o,o2);

  this.yMandatory=false;

  this.dateFormat="mediumDate";
  
  this.hover.enabled=true;
  this.hover.round.x=this.hover.round.y=8;

  this.nextTasks = [];
  this.nextTasksStrokeStyle = "Black";
  this.nextTasksPosition = "back";//back, front
  this.colorEach="yes";

  this.data.start=this.data.values;
  this.data.x=[];
  this.data.end=[];

  this.height=70;
  this.margin=new Point(6,6);
  this.continuous = false;
  var f=this.format;
  f.shadow.visible=true;
  f.round.x=f.round.y=8;
  f.stroke.fill="black";
  f.gradient.visible=true;

  var r=new Rectangle(), _h;

  this.addNextTask = function (point1, point2) {
      this.nextTasks.push([point1, point2]);
  }

  this.addRandom=function(count) {
    if (!count) count=5;

    var d=this.data;

    d.x.length=count;
    d.start.length=count;
    d.end.length=count;

    if (count>0) {
      var year=2012, month, day;

      for (var t=0; t<count; t++) {
        d.x[t]=t;

        month=trunc(Math.random()*12);
        day=trunc(Math.random()*10);
        d.start[t]=new Date(year, month, day);
        if (month<5) month=5+trunc(Math.random()*7);
        d.end[t]=new Date(year, month, day+Math.random()*10);
      }
    }
  }

  this.bounds=function(index,r) {
    if (this.isNull(index))
       return false;
    else
    {
      this.calc(index,r);
      r.y-=_h*0.5;
      r.width=(this.data.end) ? this.mandatoryAxis.calcSize(this.data.end[index]-this.data.start[index]) : 0;
      r.height=_h;

      return true;
    }
  }

  this.add=function(pos, label, start, end) {
    var d=this.data;
    d.labels.push(label);
    d.x.push(pos);
    d.start.push(start);
    d.end.push(end);
  }

  this.clicked=function(p) {
    var len=this.data.values.length, t;

    for (t=0; t<len; t++)
        if (this.bounds(t,r) && r.contains(p)) return t;

    return -1;
  }

  this.draw=function() {
    var len=this.data.values.length, t, ff,
        hover=this.hover,
          oldFill = hover.fill,
          c = this.chart.ctx,
          punts = [];
      if (this.nextTasksPosition == "back") {
          drawLines(this);
      }
    _h=this.notmandatory.calcSize(this.height*0.01);

    for(t=0; t<len; t++)
      if (this.bounds(t,r)) {
        ff= (hover.enabled && (this.over===t)) ? hover : f;
        ff.fill=this.getFillStyle(r, this.getFill(t,ff));
        ff.rectangle(r);
      }

    hover.fill=oldFill;
    if (this.nextTasksPosition == "front") {
        drawLines(this);
    }
    function drawLines(gantt) {
        for (var i = 0; i < gantt.nextTasks.length; i++) {

            c.beginPath();
            c.strokeStyle = gantt.nextTasksStrokeStyle;
            c.lineWidth = 2;
            c.fillStyle = "000000";
            punts.push(Math.round(gantt.chart.axes.bottom.calc(gantt.data.end[gantt.nextTasks[i][0]])));
            punts.push(Math.round(gantt.chart.axes.left.calc(gantt.data.x[gantt.nextTasks[i][0]])));
            punts.push(Math.round(gantt.chart.axes.bottom.calc(gantt.data.start[gantt.nextTasks[i][1]])));
            punts.push(Math.round(gantt.chart.axes.left.calc(gantt.data.x[gantt.nextTasks[i][1]])));
            
            c.moveTo(punts[0], punts[1]);
            c.lineTo(punts[0] - ((punts[0] - punts[2]) / 2), punts[1]);
            c.lineTo(punts[0] - ((punts[0] - punts[2]) / 2), punts[3]);
            c.lineTo(punts[2], punts[3]);

            c.stroke();
            
            punts = [];
        }
    }
  }

  this.horizMargins=function(p) {
    p.x=this.margin.x;
    p.y=this.margin.y;
  }

  this.minYValue=function() {
    return this.parent.minXValue.call(this)-0.5;
  }

  this.maxYValue=function() {
    return this.parent.maxXValue.call(this)+0.5;
  }

  this.minXValue=function() {
    return ArrayMin(this.data.start);
  }

  this.maxXValue=function() {
    return ArrayMax(this.data.end);
  }
}

Tee.Gantt.prototype=new Tee.Series();
Tee.Gantt.prototype.parent=Tee.Series.prototype;

/**
 * @constructor
 * @augments Tee.PointXY
 * @class Draws data as points, each one with a different size or radius
 * @property {Object} data Contains each bubble x, value and radius.
 * @property {Number[]} data.radius Defines each bubble radius value.
 */
Tee.Bubble=function(o,o2) {
  Tee.PointXY.call(this,o,o2);

  var p=this.pointer;
  p.colorEach=true;
  p.style="sphere";
  p.format.gradient.visible=true;
  p.format.gradient.direction="radial";

  /**
   * When true, horizontal and vertical edge margins are calculated.
   */
  this.inflate=true;

  this.data.radius=[];

  this.addRandom=function(count) {
    var d=this.data;

    if(!count) count=5;

    d.values.length=count;

    d.x=null;
    d.radius=[];
    d.radius.length=count;

    if (count>0) {
      for (var t=0; t<count; t++) {
        d.values[t]=Math.random()*1000;
        d.radius[t]=50+Math.random()*150;
      }
    }
  }
}

Tee.Bubble.prototype.initZ=function() {
  this.parent.prototype.initZ.call(this);
  this.format.marks.z = this.format.z -1;
}

Tee.Bubble.prototype=new Tee.PointXY();

Tee.Bubble.prototype.getSize=function(index) {
  var s=(this.data.radius) ? this._vertAxis.calcSize(this.data.radius[index]) : 0;
  this.pointer.width=s;
  this.pointer.height=s;
}

Tee.Bubble.prototype.horizMargins=function(p) {

  this.calcWidth=function(index) {
    this.getSize(index);
    var res=1+(this.pointer.width*0.5), s=this.pointer.format.stroke;
    if (s.fill!=="") res+=s.size;
    return res;
  }

  if (this.pointer.visible && this.inflate) {
    p.x=this.calcWidth(0);
    p.y=this.calcWidth(this.count()-1);
  }
}

Tee.Bubble.prototype.vertMargins=function(p) {

  this.calcHeight=function(index) {
    this.getSize(index);
    var res=1+(this.pointer.height*0.5), s=this.pointer.format.stroke;
    if (s.fill!=="") res+=s.size;
    return res;
  }

  if (this.pointer.visible && this.inflate) {

    var low, high, lowIndex=0, highIndex=0, l=this.count(), pos={x:0,y:0};

    if (l>0) {
      this.calc(0,pos);
      low=high=pos.y;

      for (var t=1; t<l; t++) {
        this.calc(t, pos);

        if (pos.y<low)
           lowIndex=t;
        else
        if (pos.y>high)
           highIndex=t;
      }

      p.x=this.calcHeight(highIndex);
      p.y=this.calcHeight(lowIndex);
    }
  }
}

/**
 * @constructor
 * @augments Tee.Bar
 * @class Draws financial Volume data as thin Bar lines.
 */
Tee.Volume=function(o,o2) {
  Tee.Bar.call(this,o,o2);

  this.barStyle="line";
  this.marks.visible=false;
  this.colorEach=false;
  var f=this.format;
  f.shadow.visible=false;
  f.gradient.visible=false;
  f.stroke.fill="";
}
Tee.Volume.prototype=new Tee.Bar;

/**
 * @constructor
 * @augments Tee.PointXY
 * @class Draws financial OHLC data as Candle or CandleBar points.
 * @property {String} style Defines candle style ("candle", "bar", "openclose").
 */
Tee.Candle=function(o,o2) {
  Tee.PointXY.call(this,o,o2);

  var f=this.format;
  f.z=0.5;
  f.depth=0.1;

  this.pointer.width=7;
  this.pointer.format.stroke.visible=false;

  var hi=this.higher=this.pointer.format;
  hi.fill="green";

  var lo=this.lower=new Tee.Format(this.chart);
  lo.fill="red";
  lo.stroke.visible=false;

  this.style="candle";

  /*
   * @private
   */
  this.setChart=function(series,chart) {
    var tmp=Tee.PointXY.prototype.setChart;
    tmp(series,chart);
    lo.setChart(chart);
  }

  this.draw=function() {
    var d=this.data, len=d.values.length, t, p=new Point(),
      po=this.pointer, w=po.width*0.5, o,h,l, m=this.mandatoryAxis, y, he,
      c=this.chart.ctx, col, x, r;

    c.z=f.z+f.depth*0.5;

    for (t=0; t<len; t++)
    if (!this.isNull(t)) {

      this.calc(t,p);
      x=p.x;

      o=m.calc(d.open[t]);
      h=m.calc(d.high[t]);
      l=m.calc(d.low[t]);

      if (p.y>o) {
        y=o;
        he=p.y-o;
        col=lo;
      }
      else {
        y=p.y;
        he=o-y;
        col=hi;
      }

      if (this.style=="bar") {
        c.beginPath();

        c.moveTo(x,h);
        c.lineTo(x,l);
        c.moveTo(x-w,o);
        c.lineTo(x,o);
        c.moveTo(x,p.y);
        c.lineTo(x+w,p.y);

        col.stroke.prepare(col.fill);

        c.stroke();
      }
      else
      {
        col.depth=w/100; // totalDepth*0.5 !!
        col.z=f.z+(f.depth*0.5)-col.depth*0.5;

        r={x:x-w,y:y,width:po.width,height:he};

        if (this.pointer.style==="cylinder")
           col.cylinder(r, 1, true);
        else
           col.cube(r);

        col.draw(c,null,r);

        if (this.hover.enabled && (this.over==t))
          this.hover.rectangle(x-w,y,po.width,he);
      }

      if (this.style!="openclose")
      if ((h<y) || (l>(y+he))) {

        c.z=f.z+f.depth*0.5;

        c.beginPath();

        c.moveTo(x,y);
        c.lineTo(x,h);

        c.moveTo(x,y+he);
        c.lineTo(x,l);

        if (this.hover.enabled && (this.over==t))
          this.hover.stroke.prepare(col.fill);
        else
          col.stroke.prepare(col.fill);

        c.stroke();
      }
    }
  }

  this.minYValue=function() {
    return this.data.low.length>0 ? ArrayMin(this.data.low) : 0;
  }

  this.maxYValue=function() {
    return this.data.high.length>0 ? ArrayMax(this.data.high) : 0;
  }

  this.addRandom=function(count) {
    var d=this.data;
    if (!count) count=10;
    d.values.length=count;
    d.close=d.values;
    if (d.open) d.open.length=count; else d.open=new Array(count);
    if (d.high) d.high.length=count; else d.high=new Array(count);
    if (d.low) d.low.length=count; else d.low=new Array(count);

    if (count>0) {
      var tmp=25+Math.random()*100, o;

      for (var t=0; t<count; t++) {
        o=d.open[t]=tmp;
        tmp=d.close[t]=tmp+(Math.random()*25)-12.5;
        d.high[t]=Math.max(o,tmp)+Math.random()*15;
        d.low[t]=Math.min(o,tmp)-Math.random()*15;
      }
    }
  }
}

Tee.Candle.prototype=new Tee.PointXY();

Tee.Candle.prototype.clicked=function(p) {
  var w=this.pointer.width, m=this.mandatoryAxis, n=this.notmandatory,
      d=this.data, len=d.values.length, r=new Rectangle(), t, o,c;

  r.width=w;

  for(t=0; t<len; t++)
  if (!this.isNull(t)) {
    r.x=n.calc(t)-w*0.5;

    o=m.calc(d.open[t]), c=m.calc(d.close[t]);
    r.y=(o>c) ? c : o;
    r.height=Math.abs(o-c);

    if (r.contains(p)) return t;
  }

  return -1;
}

Tee.Candle.prototype.vertMargins=function() {}


/**
 * @constructor
 * @augments Tee.CustomSeries
 * @class Draws values as Polar / Radar charts.
 * @property {Number} [rotation:0] Rotates polar points, from 0 to 360 degree.
 */
Tee.Polar=function(o,o2) {
  Tee.CustomSeries.call(this,o,o2);

  this.pointer.visible=true;
  this.rotation=0; // degress from 0 to 360

  this._paintAxes=false;
  this._paintWalls=false;
  this.continuous = false;
  this.useOrigin=false;
  this.origin=0;

  var p={x:0,y:0}, pp,
      f=this.format,
      center={x:0,y:0},
      radius,
      pi180=Math.PI/180;

  f.stroke.fill="black";
  f.z=0.5;

  this.calc=function(index,p) {
    var d=this.data, v=d.values[index],
        mand=this.mandatoryAxis;

    var x=d.x ? d.x[index] : 360*index/d.values.length,
        dif = mand.inverted ? mand.maximum-v : v-mand.minimum,
        angle = pi180 * (this.rotation + x),
        rad = dif * radius / (mand.maximum-mand.minimum);

    p.x=center.x+Math.cos(angle) * rad;
    p.y=center.y+Math.sin(angle) * rad;
  }

  function tryDrawAxis(axis, px, py) {
    if (axis.visible) {
      var old=axis.axisPos;
      axis.axisPos=px;
      axis.startPos=py-radius;
      axis.endPos=py+radius;

      var oldz=axis.z;
      axis.z=1 - axis.chart.walls.back.size*0.5 -0.1;

      axis.drawAxis();

      axis.axisPos=old;
      axis.z=oldz;
    }
  }

  function calcCenter(r, axis) {
    var rw=r.width, rh=r.height;
    center.x=r.x+(0.5*rw);
    center.y=r.y+(0.5*rh);
    radius = Math.min(rw, rh)*0.5;

    if (axis.visible && axis.labels.visible) {
      var textH=axis.labels.format.textHeight("W");
      radius-=textH;
    }
  }

  this.beforeDraw=function() {

    var oldz;

    calcCenter(this.chart.chartRect, this.notmandatory);

    // Background:

    var walls=this.chart.walls;

    if (walls.visible) {
      var wall=walls.back;

      if (wall.visible) {
          var wallFormat=wall.format;

          oldz=wallFormat.z;
          wallFormat.z= 1;
          wallFormat.ellipse(center.x,center.y,2*radius,2*radius);
          wallFormat.z=oldz;
      }
    }

    if (this.chart.axes.visible) {
      var nomand=this.notmandatory,
          nomandgrid=nomand.grid.format.stroke,
          mand=this.mandatoryAxis,
          vmin=0,
          ctx=this.chart.ctx,
          angle,
          labelincrem=10,
          nomandrotation=nomand.rotation || 0;

      // Axis Labels

      if (nomand.visible && nomand.labels.visible) {
        var rText={x:0,y:0,width:0,height:0},
            labelsF=nomand.labels.format,
            textH=labelsF.textHeight("W"),
            labelRadius=radius+textH*0.8;

        labelincrem = Math.max(10, 90/trunc(radius/textH));

        oldz=labelsF.z;
        labelsF.z=0.6;

        vmin=0;
        while (vmin<360) {
          angle= pi180 * (vmin + nomandrotation);

          rText.x=center.x + Math.cos(angle) * labelRadius;
          rText.y= center.y + (Math.sin(angle) * labelRadius) - (textH*0.5);

          labelsF.drawText(rText, ""+vmin);

          vmin+= labelincrem;
        }

        labelsF.z=oldz;
      }

      // line grids

      if (nomand.visible && nomand.grid.visible) {

        var gridincrem= nomand.increment || 10;

        ctx.z= 1 - walls.back.size*0.5 - 0.1;
        ctx.beginPath();

        vmin=0;
      
        while (vmin<360) {
          angle= pi180 * (vmin + nomandrotation);

          ctx.moveTo(center.x,center.y);
          ctx.lineTo(center.x+Math.cos(angle) * radius,
                     center.y+Math.sin(angle) * radius);

          vmin+= gridincrem;
        }

        nomandgrid.prepare(nomandgrid.fill,ctx);
        ctx.stroke();
      }

      // circle grids

      if (mand.visible && mand.grid.visible) {
        vmin=mand.roundMin();

        var rad, mandgrid=mand.grid.format,
            gridstep=2*radius/(mand.maximum-mand.minimum);

        oldz=mandgrid.z;

        mandgrid.z= 1 - walls.back.size*0.5 - 0.1;
        ctx.z=mandgrid.z;

        while (vmin<mand.maximum) {
          rad=(vmin-mand.minimum)*gridstep;
          mandgrid.ellipse(center.x,center.y,rad,rad);
          vmin += mand.increm;
        }

        mandgrid.z=oldz;
      }

      tryDrawAxis(mand,center.x,center.y);
      tryDrawAxis(nomand,center.y,center.x);
    }
  }

  this.draw=function() {
    calcCenter(this.chart.chartRect, this.notmandatory);

    var len=this.data.values.length, t;

    // Draw Points

    pp=[];

    for(t=0; t<len; t++)
    if (!this.isNull(t)) {
      this.calc(t,p);
      pp.push({x:p.x, y:p.y});
    }

    len=pp.length;

    if (len>0) {

      if (this.style=="bar") {
        var ctx=this.chart.ctx;
        ctx.beginPath();

        for(t=0; t<len; t++) {
          ctx.moveTo(center.x,center.y);
          ctx.lineTo(pp[t].x, pp[t].y);
        }

        this.format.stroke.prepare(this.format.fill, ctx);
        ctx.stroke();
      }
      else
         f.polygon(pp);

      if (this.pointer.visible)
          this.drawPointers();
    }
  }

  this.minYValue=function() {
    var v=Tee.Series.prototype.minYValue.call(this);
    return this.useOrigin ? Math.min(v,this.origin) : v;
  }

  this.maxYValue=function() {
    var v = this.stackMaxValue();
    return this.useOrigin ? Math.max(v,this.origin) : v;
  }
}

Tee.Polar.prototype=new Tee.CustomSeries;


// String.trim:
if (typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
  }
}

/**
 * @constructor
 * @augments Tee.Series
 * @class Calculates each point color using point values and the palette colors array.
 */
Tee.PaletteSeries=function(o,o2) {
  Tee.Series.call(this,o,o2);

  var palette=this.palette;
  palette.colors = Tee.RainbowPalette();

  var rgb, numcolors;

  this._min=0;
  this._range=0;

  this.prepareColors=function() {
    var p=palette.colors, color;

    numcolors=p.length;
    rgb=new Array(numcolors);

    for (var c=0; c<numcolors; c++) {
      color=p[c].trim();

      if (color.length==7) // #RRGGBB
        rgb[c]={ r: parseInt(color.substr(1,2),16),
                 g: parseInt(color.substr(3,2),16),
                 b: parseInt(color.substr(5,2),16),
                 a: 0
               };
      else
      if (color.substr(0,4)=='rgb(') {
         var tmp = color.slice(4, color.length - 1).split(',');
         rgb[c]={ r: tmp[0], g: tmp[1], b: tmp[2], a: tmp[3] || 0 };
      }
    }
  }

  this.getColor=function(value) {
    var colorIndex = ( (numcolors-1) * ( (value-this._min)/this._range) | 0);
    return rgb[ palette.inverted ? numcolors-1-colorIndex : colorIndex];
  }

  /**
   * @returns {Number} Returns the number of items to show at legend.
   */
  this.legendCount=function() { return this.palette.colors ? this.palette.colors.length : 0; }
}

Tee.PaletteSeries.prototype=new Tee.Series;

/**
* @returns {String} Returns the color of index'th legend symbol.
*/
Tee.PaletteSeries.prototype.legendColor=function(index) {
  var p=this.palette, c=p.colors, i=p.inverted;

  if (this.chart.legend.inverted) i = !i;

  if (p.grayScale) {
    var tmp = (index*255/c.length) | 0;
    if (i) tmp=255-tmp;
    return "rgb(" + tmp + "," + tmp + "," + tmp +")";
  }
  else
    return c ? c[ i ? index : this.legendCount()-index-1] : this.format.fill;
}

/**
* @returns {String} Returns the palette value of index'th legend symbol.
*/
Tee.PaletteSeries.prototype.legendText=function(index /*,style,title,asArray*/ ) {
  index= -1 + this.legendCount() - index;
  return (this._min + (index* this._range/(this.palette.colors.length-1) )).toFixed(this.decimals);
}

// This script made by:
// Michael Leigeber
// http://www.scriptiny.com/
// http://www.scriptiny.com/author/michael/

Tee.DOMTip=function(){
var top = 3,
    left = 3,
    arrowtt,
    speed = 10,
    timer = 10,
    arrowWidth = 8,
    arrowStyleBefore,
    followCursor=false,
    arrowStyleAfter,
    arrowBorderWidth,
    tip,
    previousIndex,
    previousNearestSeries,
    domStylesBorderColor,
    domStylesBackgroundColor,
    arrowBorderRadius,
    endalpha = 97,
    alpha = 0,
    tt,
    ttstyle,
    h,
    animation,
    target,
    ie = ((typeof document!=='undefined') && document.all) ? true : false,
    width;

 return{
     show: function (v, w, dest, domStyle, toolTip) {
         if(toolTip)
         {
         tip = toolTip;
             if (!toolTip.findPoint) {
             arrowWidth = 0;
             followCursor = true;
         }
        }
    if (!tt){
            arrowStyleAfter = document.createElement('style');
            arrowStyleBefore = document.createElement('style');

            domStylesBorderColor = "";
      tt = document.createElement('div');
            arrowtt = document.createElement('div');

            tt.setAttribute('id', 'teetip1');
            arrowtt.setAttribute('id', 'teetiparrow1');
      tt.className='teetip';
            arrowtt.className = 'teetiparrow';
    
      tt.setAttribute("style", domStyle);
            domStylesBorderColor = tt.style.getPropertyValue("border-color");
            domStylesBackgroundColor = tt.style.getPropertyValue("background-color");

            arrowBorderWidth = tt.style.getPropertyValue("border-width");
            arrowBorderRadius = tt.style.getPropertyValue("border-radius");

            arrowBorderRadius = arrowBorderRadius.substring(0, arrowBorderRadius.length - 2);
            
            if (arrowBorderWidth.length == 0) arrowBorderWidth = 0;
            else {
                arrowBorderWidth = arrowBorderWidth.substring(0, arrowBorderWidth.length - 2);
                arrowBorderWidth = arrowBorderWidth * 2;
            }

            arrowStyleBefore.innerHTML = ".teetiparrow{width:0;height:0;border: " + arrowWidth + "px solid;position: absolute;content: '';border-color: " + domStylesBorderColor + " transparent transparent transparent;bottom: -" + arrowWidth * 2 + "px;left: 25px;}";
            arrowStyleAfter.innerHTML = ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" + (arrowWidth - arrowBorderWidth / 2) + "px;bottom: " + (arrowBorderWidth - (arrowWidth - 1)) + "px; border: " + (arrowWidth - arrowBorderWidth / 2) + "px solid;border-color: " + domStylesBackgroundColor + " transparent transparent transparent;}";
            document.head.appendChild(arrowStyleBefore);
            document.head.appendChild(arrowStyleAfter);

            document.body.appendChild(tt);
            tt.appendChild(arrowtt);
      ttstyle=tt.style;
      ttstyle.opacity = 0;

      // IE only:
      if (ie)
         ttstyle.filter = 'alpha(opacity=0)';
    }
    
    target=dest;
    

    ttstyle.display = 'block';
    ttstyle.position = 'absolute';
        tt.innerHTML = arrowtt.outerHTML + v;
    ttstyle.width = w ? w + 'px' : 'auto';

    if (!w && ie)
        ttstyle.width = tt.offsetWidth;

    if (tt.offsetWidth > 300)
      ttstyle.width = 300 + 'px';
        width = tt.offsetWidth;
    h = parseInt(tt.offsetHeight,10) + top;
    if (tt.timer) clearInterval(tt.timer);
    tt.timer = setInterval(function() { Tee.DOMTip.fade(1) },timer);

        document.onmousemove = this.pos;
    
  },

  pos: function(e){
      if(tip){
          if (!tip.findPoint) {
          arrowWidth = 0;
          followCursor = true;
      }
      else {
          arrowWidth = 8;
          followCursor = false;
      }

          if (target) {
              var chart = target.chart;
              var chartRect = chart.chartRect;
              var horizontal = chart.axes.bottom.firstSeries ? !chart.axes.bottom.firstSeries.yMandatory : false;
          }
         if (chart) {
                 chart.draw();
                 if (chart.series.items[0] instanceof Tee.Pie || followCursor||!target) {
      var d = document.documentElement,
          u = ie ? e.clientY + d.scrollTop : e.pageY,
                     l = ie ? e.clientX + d.scrollLeft : e.pageX - width / 2 - 10 - arrowWidth;
                    arrowStyleBefore.innerHTML = ".teetiparrow{width:0;height:0;border: " + arrowWidth + "px solid;position: absolute;content: '';border-color: " + domStylesBorderColor + " " + domStylesBorderColor + " transparent transparent;bottom: -" + arrowWidth * 2 + "px;left: " + (tt.getBoundingClientRect().width - arrowWidth * 2 - arrowBorderWidth / 2) + "px;}";
                    arrowStyleAfter.innerHTML = ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" + (arrowWidth - arrowBorderWidth / 2) + "px;bottom: " + (arrowBorderWidth - (arrowWidth - 1)) + "px; border: " + (arrowWidth - arrowBorderWidth / 2) + "px solid;border-color: " + domStylesBackgroundColor + " " + domStylesBackgroundColor + " transparent transparent;}";

             }
             else {
                 var index ;
                 if (!horizontal) index = Math.round(chart.axes.bottom.fromSizeCalcIndex(e.clientX - chart.canvas.getBoundingClientRect().left - chart.axes.bottom.startPos));
                 else index = Math.round(chart.axes.left.fromPos(e.layerY));
                 var point = new Point();
                 var distance, minDistance;
                 if (e.target==chart.canvas) {
                     for (var n = 0; n < chart.series.items.length; n++) {
                         if (!horizontal) distance = Math.abs(chart.series.items[n].data.values[index] - chart.axes.left.fromPos(e.layerY));
                         else distance = Math.abs(chart.series.items[n].data.values[index] - chart.axes.bottom.fromPos(e.layerX));
                         if (n == 0) {
                             minDistance = distance;
                             chart.series.items[n].calc(index, point);
                         }
                         else if (distance < minDistance) {
                             chart.series.items[n].calc(index, point);
                             minDistance = distance;
                         }

                     }
                 }
                 var d = document.documentElement;
                 var marginTop = tt.style.marginTop.substring(0, tt.style.marginTop.length-2);
                 var marginLeft = tt.style.marginLeft.substring(0, tt.style.marginLeft.length-2);
                 var u = Math.round(point.y + window.scrollY + chart.canvas.getBoundingClientRect().top - tt.getBoundingClientRect().height - arrowWidth - marginTop + arrowBorderWidth/2);
                 var l = Math.round(point.x + window.scrollX + chart.canvas.getBoundingClientRect().left - tt.getBoundingClientRect().width / 2 - marginLeft - arrowBorderWidth/2);


                     if (((l + width / 2) - chartRect.x) > chartRect.width) {
                     u = Math.round(point.y + window.scrollY + chart.canvas.getBoundingClientRect().top - tt.getBoundingClientRect().height - arrowWidth * 2 - marginTop + arrowBorderWidth / 2);
                     l = Math.round(point.x + window.scrollX + chart.canvas.getBoundingClientRect().left - tt.getBoundingClientRect().width - marginLeft);
                     ttstyle.borderRadius = arrowBorderRadius + "px " + arrowBorderRadius + "px 0px " + arrowBorderRadius + "px";
                     arrowStyleBefore.innerHTML = ".teetiparrow{width:0;height:0;border: " + arrowWidth + "px solid;position: absolute;content: '';border-color: " + domStylesBorderColor + " " + domStylesBorderColor + " transparent transparent;bottom: -" + arrowWidth * 2 + "px;left: " + (tt.getBoundingClientRect().width - arrowWidth*2 - arrowBorderWidth/2) + "px;}";
                     arrowStyleAfter.innerHTML = ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" + (arrowWidth - arrowBorderWidth / 2) + "px;bottom: " + (arrowBorderWidth - (arrowWidth - 1)) + "px; border: " + (arrowWidth - arrowBorderWidth / 2) + "px solid;border-color: " + domStylesBackgroundColor + " " + domStylesBackgroundColor + " transparent transparent;}";
                     
                 }
                     else if ((l-width/2) < chartRect.x) {
                     l = Math.round(point.x + window.scrollX + chart.canvas.getBoundingClientRect().left - marginLeft);
                     u = Math.round(point.y + window.scrollY + chart.canvas.getBoundingClientRect().top - tt.getBoundingClientRect().height - arrowWidth*2 - marginTop + arrowBorderWidth/2);
                     ttstyle.borderRadius = arrowBorderRadius + "px " + arrowBorderRadius + "px "+ arrowBorderRadius + "px 0px";
                     arrowStyleBefore.innerHTML = ".teetiparrow{width:0;height:0;border: " + arrowWidth + "px solid;position: absolute;content: '';border-color: " + domStylesBorderColor + " transparent transparent " + domStylesBorderColor + ";bottom: -" + arrowWidth * 2 + "px;left: " + (0 - arrowBorderWidth/2) + "px;}";
                     arrowStyleAfter.innerHTML = ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" + (arrowWidth - arrowBorderWidth / 2) + "px;bottom: " + (arrowBorderWidth - (arrowWidth - 1)) + "px; border: " + (arrowWidth - arrowBorderWidth / 2) + "px solid;border-color: " + domStylesBackgroundColor + " transparent transparent " + domStylesBackgroundColor + ";}";
                 }
                 else if(l) {
                     ttstyle.borderRadius = arrowBorderRadius + "px " + arrowBorderRadius + "px " + arrowBorderRadius + "px " + arrowBorderRadius + "px";
                     arrowStyleBefore.innerHTML = ".teetiparrow{width:0;height:0;border: " + arrowWidth + "px solid;position: absolute;content: '';border-color: " + domStylesBorderColor + " transparent transparent transparent;bottom: -" + arrowWidth * 2 + "px;left: " + ((tt.getBoundingClientRect().width / 2) - (arrowWidth)) + "px;}";
                     arrowStyleAfter.innerHTML = ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" + (arrowWidth - arrowBorderWidth / 2) + "px;bottom: " + (arrowBorderWidth - (arrowWidth - 1)) + "px; border: " + (arrowWidth - arrowBorderWidth / 2) + "px solid;border-color: " + domStylesBackgroundColor + " transparent transparent transparent;}";
                     }
                 }
                 if (tip && tip.pointer.visible) {
                     drawPoint();
                     u -= tip.pointer.secondCircleRadius > tip.pointer.firstCircleRadius ? tip.pointer.secondCircleRadius : tip.pointer.firstCircleRadius;
             }
             }
             else {
                 var d = document.documentElement,
                         u = ie ? e.clientY + d.scrollTop : e.pageY,
                         l = ie ? e.clientX + d.scrollLeft : e.pageX - width / 2 - 10 - arrowWidth;

             }
             }
      else {
          arrowWidth = 0;
          followCursor = true;
          var d = document.documentElement,
             u = ie ? e.clientY + d.scrollTop : e.pageY,
             l = ie ? e.clientX + d.scrollLeft : e.pageX - width / 2 - 10 - arrowWidth;
          arrowStyleBefore.innerHTML = ".teetiparrow{width:0;height:0;border: " + arrowWidth + "px solid;position: absolute;content: '';border-color: " + domStylesBorderColor + " " + domStylesBorderColor + " transparent transparent;bottom: -" + arrowWidth * 2 + "px;left: " + (tt.getBoundingClientRect().width - arrowWidth * 2 - arrowBorderWidth / 2) + "px;}";
          arrowStyleAfter.innerHTML = ".teetiparrow:after{content: ' ';position: absolute;width: 0;height: 0;left: -" + (arrowWidth - arrowBorderWidth / 2) + "px;bottom: " + (arrowBorderWidth - (arrowWidth - 1)) + "px; border: " + (arrowWidth - arrowBorderWidth / 2) + "px solid;border-color: " + domStylesBackgroundColor + " " + domStylesBackgroundColor + " transparent transparent;}";

      }
      if ((u-h)<0) u=h;
      if (l<0) l=0;
      
	  if (target) {
		  var offsetLeft = target.offsetLeft;
		  var node=target;
		  while ((node.offsetParent!=null)){
			   offsetLeft+=node.offsetLeft;
			   node=node.offsetParent;
		  }
      
		  if (l>(offsetLeft+target.clientWidth-tt.offsetWidth - 25))
            l = offsetLeft+target.clientWidth-tt.offsetWidth - 25;
      }
            
      // Try to hide tooltip when moving mouse outside target bounds:
      
      /*
      if (target) {
        if ((l>target.clientLeft) && (l<(target.clientLeft+target.clientWidth)) )
        {
        }
        else {
          Tee.DOMTip.hide();
          return;
        }
      }
      */
	  if (followCursor) {
      ttstyle.top = (u - h) + 'px';
      ttstyle.left = (l + left) + 'px';
	  }
	  else {
	      ttstyle.top = (u /*- h*/) + 'px';
	      ttstyle.left = (l /*+ left*/) + 'px';
      }



      function animatePointer(point, c) {
          var pointer = tip.pointer;
          animation = new Tee.Animation(tip, function (f) {
              if (f < 1) {
                  tip.chart.draw();
                  drawPointAt(point, pointer.secondCircleRadius*f, pointer.fill, pointer.secondCircleOpacity, c);
                  drawPointAt(point, pointer.firstCircleRadius * f, pointer.fill, pointer.firstCircleOpacity, c);
              }
          });
          animation.onstop = function () {          
            tip.chart.draw();
            drawPointAt(point, pointer.secondCircleRadius, pointer.fill, pointer.secondCircleOpacity, c);
            drawPointAt(point, pointer.firstCircleRadius, pointer.fill, pointer.firstCircleOpacity, c);
          }
          animation.duration = pointer.animationDuration;
          animation.animate();
      }
      function drawPointAt(point, size, color, opacity, c) {
          c.strokeStyle = color;
          c.fillStyle = color;
          c.globalAlpha = opacity;
          c.lineWidth = size;
          c.beginPath();
          c.ellipse(point.x, point.y, size/2, size/2, 0, 0, 7, false);
          c.stroke();
      }
      function drawPoint() {
          if (e.target.chart) {
              e.target.chart.draw();
              var index;
              var point = new Point();
              var distance, minDistance;
              var nearestSeries;
              var pointer = tip.pointer;
              var color = tip.pointer.fill;
              if (!horizontal) index = Math.round(chart.axes.bottom.fromSizeCalcIndex(e.clientX - chart.canvas.getBoundingClientRect().left - chart.axes.bottom.startPos));
              else index = Math.round(chart.axes.left.fromPos(e.layerY));
              if (e.target == chart.canvas) {
                  for (var n = 0; n < chart.series.items.length; n++) {
                      if (!horizontal) distance = Math.abs(chart.series.items[n].data.values[index] - chart.axes.left.fromPos(e.layerY));
                      else distance = Math.abs(chart.series.items[n].data.values[index] - chart.axes.bottom.fromPos(e.layerX));
                      if (n == 0) {
                          minDistance = distance;
                          chart.series.items[n].calc(index, point);
                          nearestSeries = chart.series.items[n];
                      }
                      else if (distance < minDistance) {
                          chart.series.items[n].calc(index, point);
                          minDistance = distance;
                          nearestSeries = chart.series.items[n];
                      }
                  }
              }
              
              var c = (e.target.chart.ctx);
              if (!previousNearestSeries) {
                  previousNearestSeries = nearestSeries;
              }
              else if (index != -1 && previousNearestSeries != nearestSeries) {
                  previousNearestSeries = nearestSeries;
                  if (pointer.animationVisible)
                      animatePointer(point, c);//here will go the animation
	  }

              if (index != -1 && !previousIndex || index == -1) {
                  previousIndex = index;
              }
              else if (index != -1 && previousIndex != index) {
                  previousIndex = index;
                  if(pointer.animationVisible)
                    animatePointer(point,c);//here will go the animation
              }

              drawPointAt(point, pointer.secondCircleRadius, pointer.fill, pointer.secondCircleOpacity, c);
              drawPointAt(point, pointer.firstCircleRadius, pointer.fill, pointer.firstCircleOpacity, c);
          }
      }
  },

  fade: function(d){
    var a = alpha;

    if ( ((a !== endalpha) && (d === 1)) || ((a !== 0) && (d === -1)) ){
      var i = speed;

      if (endalpha - a < speed && d == 1)
        i = endalpha - a;
      else
      if (alpha < speed && d == -1)
        i = a;

      alpha = a + (i * d);

      ttstyle.opacity = alpha * 0.01;

      // IE only:
      if (ie)
         ttstyle.filter = 'alpha(opacity=' + alpha + ')';
    }
    else
    {
      clearInterval(tt.timer);
      if(d == -1) {
         ttstyle.display = 'none';
         document.onmousemove = null;
      }
    }
  },

  hide: function(){
      if (tt) {
        clearInterval(tt.timer);
        tt.timer = setInterval(function(){Tee.DOMTip.fade(-1)},timer);
        if (target&&target.chart)
            target.chart.draw();
      }
  }
 };
}();

//*********** teechart-extras start ********************

Tee.Chart.prototype.drawReflection=function()
{
  var c=this.ctx, h=this.bounds.height;

  c.scale(1,-1);
  c.translate(0,-h*2);

  this.ondraw=null;
  this.draw();
  c.translate(0,h*2);
  c.scale(1,-1);

  var mirrorHeight=this.canvas.height-h, y=h,
      gradient = c.createLinearGradient( 0, y, 0, y+mirrorHeight),
      color=this.reflectionColor;

  gradient.addColorStop( 0, colorAlpha(color,0.5));
  gradient.addColorStop( 1, colorAlpha(color,1));
  c.fillStyle = gradient;
  c.beginPath();
  c.shadowColor="transparent";
  c.rect( 0, y, this.bounds.width, mirrorHeight );
  c.fill();

  this.ondraw=this.drawReflection;
}

function colorAlpha(color,alpha) {
  return 'rgba( '+color[0]+', '+color[1]+', '+color[2]+', '+alpha+' )';
}


/*
  Copyright 2010 by Robin W. Spencer
  http://scaledinnovation.com/analytics/splines/aboutSplines.html

  Modifications by Steema Software.

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You can find a copy of the GNU General Public License
    at http://www.gnu.org/licenses/.
*/

Tee.drawSpline=function(ctx,pts,t,move,closed){
  var cp=[], n=pts.length, i;

  function point(x0,y0,x1,y1,x2,y2,t){

      function square(x) { return x*x; }

      var d=Math.sqrt(square(x1-x0)+square(y1-y0)),
          a=t*d/(d+Math.sqrt(square(x2-x1)+square(y2-y1))),
          b=t-a;

      return [x1+a*(x0-x2),y1+a*(y0-y2),x1-b*(x0-x2),y1-b*(y0-y2)];
  }

  if(closed){
    if (move)
       ctx.moveTo(pts[0],pts[1]);

    pts.push(pts[0],pts[1],pts[2],pts[3]);
    pts.unshift(pts[n-1]);
    pts.unshift(pts[n-1]);

    for(i=0;i<n;i+=2)
        cp=cp.concat(point(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));

    cp=cp.concat(cp[0],cp[1]);

    for(i=2;i<n+2;i+=2)
        ctx.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);
  }
  else
  {
    for(i=0;i<n-4;i+=2)
        cp=cp.concat(point(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));

    if (move)
       ctx.moveTo(pts[0],pts[1]);

    ctx.quadraticCurveTo(cp[0],cp[1],pts[2],pts[3]);

    for(i=2;i<n-5;i+=2)
        ctx.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);

    ctx.quadraticCurveTo(cp[2*n-10],cp[2*n-9],pts[n-2],pts[n-1]);
  }
}

function modCustomAxes(c,featureColor,defaultStrokeColor) {
  	for (var i = 0; i < c.axes.items.length; i++) {
	  if (i>3){
		c.axes.items[i].labels.format.font.setSize(11);
		c.axes.items[i].format.stroke.fill = defaultStrokeColor;
		c.axes.items[i].labels.format.font.fill = featureColor;
		c.axes.items[i].title.format.font.fill = featureColor;
		c.axes.items[i].title.format.font.setSize(20);
		c.axes.items[i].grid.visible=false;
  	    c.axes.items[i].grid.format.stroke.size = 0.6;
	    c.axes.items[i].grid.format.stroke.fill = "silver";
	  }
	}
}

function defaultTheme(c) {

  var featureColor = "rgba(0,0,0,1)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "white";
  var seriesPenColor = "white";
  
  c.title.format.font.style="18px Verdana";
  c.walls.visible=true;
  c.panel.format.shadow.visible=false;
  c.panel.format.round.x=8;
  c.panel.format.round.y=8;
  c.panel.format.gradient.visible=true;
  c.panel.format.gradient.colors=["rgba(224,224,224,1.0)","white"];
  c.panel.format.gradient.direction="diagonalup";
  c.panel.format.stroke.fill="rgba(204,204,204,1.0)";
  c.panel.format.stroke.size = 1;
  
  applyPalette(c,"opera");
  
  if (c.series.items.length > 0) {
  	for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }  
  
  c.axes.left.labels.format.font.setSize(11);
  c.axes.bottom.labels.format.font.setSize(11);
  c.axes.left.format.stroke.fill = defaultStrokeColor;
  c.axes.bottom.format.stroke.fill = defaultStrokeColor;
  c.axes.left.labels.format.font.fill = featureColor;
  c.axes.bottom.labels.format.font.fill = featureColor;
  c.axes.left.title.format.font.fill = featureColor;
  c.axes.left.title.format.font.setSize(20);  
  c.axes.bottom.title.format.font.fill = featureColor;
  c.axes.bottom.title.format.font.setSize(20);
  c.axes.left.grid.visible=true;
  c.axes.bottom.grid.visible=false;

  c.axes.left.grid.format.stroke.size = 0.6;
  c.axes.bottom.grid.format.stroke.size = 0.6;
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";

  c.axes.left.grid.visible=true;
  c.axes.top.grid.visible=true;
  c.axes.right.grid.visible=true;
  c.axes.bottom.grid.visible=true;

  if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }

  //legend
  c.legend.transparent=false;
  c.legend.format.fill = "white";
  c.legend.format.font.setSize(11);
  c.legend.format.font.fill = featureColor;  
  c.legend.fontColor = false;  
  
  //title
  c.title.format.font.fill = featureColor;
  
  c.walls.visible = false;  
}

function twilightTheme(c) {

  var featureColor = "rgba(224,224,224,0.6)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "rgba(82,82,82,1)";
  var seriesPenColor = "white";
  
  c.title.format.font.style="18px Verdana";
  c.walls.visible=true;
  c.panel.format.shadow.visible=false;
  c.panel.format.round.x=8;
  c.panel.format.round.y=8;
  c.panel.format.gradient.visible=true;
  c.panel.format.gradient.colors=["rgba(99,99,99,1.0)","rgba(19,19,19,1.0)"];
  c.panel.format.gradient.direction="topbottom";
  c.panel.format.stroke.fill="rgba(204,204,204,1.0)";
  c.panel.format.stroke.size = 1;
  
  applyPalette(c,"redRiver");
  
  if (c.series.items.length > 0) {
  	for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }
  
  //axes
  c.axes.left.format.stroke.fill = featureColor;
  c.axes.bottom.format.stroke.fill = featureColor;
  c.axes.left.labels.format.font.setSize(11);
  c.axes.bottom.labels.format.font.setSize(11);
  c.axes.left.labels.format.font.fill = featureColor;
  c.axes.bottom.labels.format.font.fill = featureColor;
  c.axes.left.title.format.font.fill = featureColor;
  c.axes.left.title.format.font.setSize(20);  
  c.axes.bottom.title.format.font.fill = featureColor;
  c.axes.bottom.title.format.font.setSize(20);
  c.axes.bottom.grid.visible=false;
  c.axes.left.grid.visible=true; 
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";
  
  if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }
  
  //legend
  c.legend.transparent=true;
  c.legend.format.font.setSize(14);
  c.legend.format.font.fill = featureColor;
  c.legend.format.fill = "rgba(0,0,0,0.1)";
  
  //title
  c.title.format.shadow.visible=false;
  var baseFontStyle = "18px Arial";
  c.title.format.font.style=baseFontStyle;
  c.title.format.font.style="bold " + baseFontStyle;
  c.title.format.font.fill = featureColor;
  c.title.format.font.shadow.visible=false;    
  
  c.walls.visible = false;  
}

function daybreakTheme(c) {

  var darkContrastColor = "rgba(14,14,54,0.6)";
  var featureColor = "rgba(224,224,224,0.6)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "rgba(82,82,82,1)";
  var seriesPenColor = "white";
  
  c.title.format.font.style="18px Verdana";
  c.walls.visible=true;
  c.panel.format.shadow.visible=false;
  c.panel.format.round.x=8;
  c.panel.format.round.y=8;
  c.panel.format.gradient.visible=true;
  c.panel.format.gradient.colors=["rgba(201,204,242,1.0)","rgba(255,252,255,1.0)","rgba(21,21,23,1.0)"];
  c.panel.format.gradient.direction="topbottom";
  c.panel.format.stroke.fill="rgba(204,204,204,1.0)";
  c.panel.format.stroke.size = 1;
  
  applyPalette(c,"redRiver");
  
  if (c.series.items.length > 0) {
  	for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }  
  
  //axes
  c.axes.left.format.stroke.fill = darkContrastColor;
  c.axes.bottom.format.stroke.fill = featureColor;
  c.axes.left.labels.format.font.setSize(11);
  c.axes.bottom.labels.format.font.setSize(11);
  c.axes.left.labels.format.font.fill = darkContrastColor;
  c.axes.bottom.labels.format.font.fill = featureColor;
  c.axes.left.title.format.font.fill = darkContrastColor;
  c.axes.left.title.format.font.setSize(20);  
  c.axes.bottom.title.format.font.fill = featureColor;
  c.axes.bottom.title.format.font.setSize(20);
  c.axes.bottom.grid.visible=false;
  c.axes.left.grid.visible=true;
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";  
  
   if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }
  
  //legend
  c.legend.transparent=true;
  c.legend.format.font.setSize(14);
  c.legend.format.font.fill = "silver";
  
  //title
  c.title.format.shadow.visible=false;
  var baseFontStyle = "18px Arial";
  c.title.format.font.style=baseFontStyle;
  c.title.format.font.style="bold " + baseFontStyle;
  c.title.format.font.fill = darkContrastColor;
  c.title.format.font.shadow.visible=false;  
  
  c.walls.visible = false;  
}

function minimalTheme(c) {
  //designed with white background in mind
  c.title.transparent=true;
  c.walls.visible=false;
  c.footer.transparent=true;
  c.panel.format.shadow.visible=false;
  c.panel.format.stroke.fill="";
  c.panel.format.round.x=0;
  c.panel.format.round.y=0;
  c.panel.format.gradient.visible=false;
  c.panel.format.fill="white";
  
  var featureColor = "rgba(124,124,144,0.9)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var invisibleStrokeColor = "rgba(0,0,0,0.0)";
  var backBlendColor = "white";
  var seriesPenColor = "white";
  
  applyPalette(c,"seaWash");
  
  if (c.series.items.length > 0) {
      for (var i = 0; i < c.series.items.length; i++) {
          c.series.items[i].format.fill=c.palette.get(i);
          if ((c.series.items[i].pointer != null) && (c.series.items[i].pointer.format != null)) {
              c.series.items[i].pointer.format.fill=c.palette.get(i);
              c.series.items[i].pointer.format.stroke.fill = backBlendColor;
          }
      }
  }
  
  //axes
  c.axes.left.format.stroke.fill = defaultStrokeColor;
  c.axes.bottom.format.stroke.fill = defaultStrokeColor;
  c.axes.left.format.stroke.fill = invisibleStrokeColor;
  c.axes.left.labels.format.font.setSize(14);
  c.axes.bottom.labels.format.font.setSize(14);
  c.axes.left.labels.format.font.fill = featureColor;
  c.axes.bottom.labels.format.font.fill = featureColor;
  c.axes.left.title.format.font.fill = featureColor;
  c.axes.left.title.format.font.setSize(20);  
  c.axes.bottom.title.format.font.fill = featureColor;
  c.axes.bottom.title.format.font.setSize(20);
  /*c.series.each(function(series) {
    series.notmandatory.grid.visible=false;
  });*/  
  c.axes.left.grid.visible=true;
  c.axes.bottom.grid.visible=false;
  c.axes.left.grid.format.stroke.size = 0.6;
  c.axes.bottom.grid.format.stroke.size = 0.6;
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";
  
  if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }

  //legend
  c.legend.transparent=true;
  c.legend.format.font.setSize(14);
  c.legend.format.font.fill = featureColor;
  
  //title
  c.title.format.shadow.visible=false;
  var baseFontStyle = "18px Arial";
  c.title.format.font.style=baseFontStyle;
  c.title.format.font.style="bold " + baseFontStyle;
  c.title.format.font.fill = featureColor;
  c.title.format.font.shadow.visible=false;

}

function excelTheme(c) {

  minimalTheme(c);
 
  var featureColor = "rgba(0,0,0,0.9)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "white";
  var seriesPenColor = "white";
  
  applyPalette(c,"excel");
  
  c.axes.left.grid.format.stroke.fill = featureColor;
  c.axes.bottom.grid.format.stroke.fill = featureColor;
  
  if (c.series.items.length > 0) {
	  for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }
}

function darkTheme(c) {
  
  applyPalette(c,"onBlack");
    
  var featureColor = "rgba(224,224,224,0.6)";
  var defaultStrokeColor = "rgba(39,79,105,0.8)";
  var backBlendColor = "rgba(82,82,82,1)";
  var seriesPenColor = "white";
  
  c.title.transparent=true;
  c.legend.transparent=true;
  c.footer.transparent=true;
  
  //panel
  c.panel.format.shadow.visible=false;
  c.panel.format.stroke.fill="";
  c.panel.format.round.x=0;
  c.panel.format.round.y=0;
  c.panel.format.gradient.colors=["rgba(0,0,0,1)","rgba(0,0,0,1)"];
  c.panel.format.gradient.visible=true;

  if (c.series.items.length > 0) {
  	for (var i = 0; i < c.series.items.length; i++)
	  {
			c.series.items[i].format.fill=c.palette.get(i);
			if (c.series.items[i].pointer != null)
			{
				c.series.items[i].pointer.format.fill=c.palette.get(i);
				c.series.items[i].pointer.format.stroke.fill = backBlendColor;
			}
	  }
  }
  
  //axes
  c.axes.left.format.stroke.fill = featureColor; //defaultStrokeColor;
  c.axes.bottom.format.stroke.fill = featureColor; //defaultStrokeColor;
  c.axes.left.labels.format.font.setSize(14);
  c.axes.bottom.labels.format.font.setSize(14);
  c.axes.left.labels.format.font.fill = featureColor;
  c.axes.bottom.labels.format.font.fill = featureColor;
  c.axes.left.title.format.font.fill = featureColor;
  c.axes.left.title.format.font.setSize(20);  
  c.axes.bottom.title.format.font.fill = featureColor;
  c.axes.bottom.title.format.font.setSize(20);
  c.axes.bottom.grid.visible=false;
  c.axes.left.grid.visible=true;
  c.axes.left.grid.format.stroke.fill = "silver";
  c.axes.bottom.grid.format.stroke.fill = "silver";
  
  if (c.axes.items.length > 0) {
    modCustomAxes(c,featureColor,defaultStrokeColor)
  }
  
  //walls
  c.walls.visible=false;

  //legend
  c.legend.transparent=true;
  c.legend.format.font.setSize(14);
  c.legend.format.font.fill = featureColor;
  
  //title
  c.title.format.shadow.visible=false;
  var baseFontStyle = "18px Arial";
  c.title.format.font.style=baseFontStyle;
  c.title.format.font.style="bold " + baseFontStyle;
  c.title.format.font.fill = featureColor;
  c.title.format.font.shadow.visible=false;
}

Tee.Chart.prototype.applyTheme=function(theme) {
  if ((!theme) || (theme==""))
    this.applyTheme("default");
  else
  if (theme=="default")
     defaultTheme(this);
  else
  if (theme=="minimal")
     minimalTheme(this);
  else
  if (theme=="excel")
     excelTheme(this);
  else
  if (theme=="dark")
    darkTheme(this);
  else
  if (theme=="twilight")  	
	twilightTheme(this);
  else
  if (theme=="daybreak")  	
	daybreakTheme(this);	

  this.themeName = theme;	
  this.draw();
}

Tee.Chart.prototype.applyPalette=function(paletteName) {
  applyPalette(this,paletteName);
}

function applyPalette(c,paletteName) {
 
  //default (Opera)
  var colorList = [ "#4466a3", "#f39c35", "#f14c14", "#4e97a8", "#2b406b",
                    "#1d7b63", "#b3080e", "#f2c05d", "#5db79e", "#707070",
                    "#f3ea8d", "#b4b4b4"];

  /*Castaway*/					 
  if (paletteName=="castaway")
    colorList = ["#4466a3", "#E8D0A9","#B7AFA3","#C1DAD6","#F5FAFA","#ACD1E9","#6D929B"];
  else /*ClassicPalette*/
  if (paletteName=="classic")	
	colorList = ["#0000FF","#00FF00","#00FFFF","#FF0000","#FF00FF","#FFFF00","#000080",
	             "#008000","#008080","#800000","#808000","#808080"];				   
  else /*Cool*/				
	if (paletteName=="cool")
		colorList=["rgba(43,64,107,1.0)","rgba(59,84,140,1.0)","rgba(68,102,163,1.0)",
		           "rgba(78,151,168,1.0)","rgba(93,183,158,1.0)","rgba(65,160,138,1.0)",
				   "rgba(43,146,125,1.0)","rgba(29,123,99)"];				 
  else /*Excel*/
  if (paletteName=="excel")
     colorList = ["#FF9999","#663399","#CCFFFF","#FFFFCC","#660066","#8080FF","#CC6600",
                  "#FFCCCC","#800000","#FF00FF","#00FFFF","#FFFF00","#800080","#000080",
				  "#808000","#FF0000","#FFCC00","#FFFFCC","#CCFFCC","#00FFFF","#FFCC99",
				  "#CC99FF"];
  else /*GrayscalePalette*/ 
  if (paletteName=="grayscale")	
	colorList = ["#F0F0F0","#E0E0E0","#D0D0D0","#C0C0C0","#B0B0B0","#A0A0A0","#909090",
	             "#808080","#707070","#606060","#505050","#404040","#303030","#202020",
				 "#101010"];	
  else /*MacOSPalette*/ 
  if (paletteName=="macOS")	
	colorList = ["#FFFFFF","#FCF305","#FF6402","#DD0806","#F20884","#4600A5","#0000D4",
	             "#02ABEA","#1FB714","#006411","#562C05","#90713A","#C0C0C0","#808080",
				 "#404040","#000000"];	
  else /*ModernPalette*/ 
  if (paletteName=="modern")	
	colorList = ["#FF9966","#FF6666","#99CCFF","#669966","#CCCC99","#9966CC","#CC6666",
	             "#FFCC99","#9966FF","#CCCCCC","#66FFCC","#6699FF","#996699","#CCCCFF"];				 
  else /*OnBlack*/
	if (paletteName=="onBlack")
		colorList=["rgba(200,230,90,1.0)","rgba(90,150,220,1.0)","rgba(230,90,40,1.0)",
		           "rgba(230,160,15)"];
  else /*Opera - default*/
  if (paletteName=="opera")
	 colorList = colorList; //do nothing, Opera is default.
  else /*PastelsPalette*/
  if (paletteName=="pastels")	
	colorList = ["#CCFFFF","#FFFFCC","#CCCCFF","#00CCCC","#CCCCCC","#009999","#999999",
	             "#DDCCCC","#FFCC66","#CCCCFF","#FF9999","#FFFF99","#99CCFF","#CCFFCC"];	 
  else /*Rainbow*/
  if (paletteName=="rainbow")	
	colorList = ["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#6600FF","#8B00FF"]
  else /*RedRiver*/
  if (paletteName=="redRiver")
    colorList = ["#DC5C05","#FFC519","#6EC5B8","#FF9000","#978B7D","#C7BAA7"];  //#FFAC00
  else /*Rust*/
  if (paletteName=="rust")	
	colorList = ["#CBFFFA","#7F3D17","#7F5E17","#22287F","#DD1E2F","#EBB035","#06A2CB",
	             "#218559","#D0C6B1","#B67721","#68819E","#747E80","#D5E1DD","#F7F3E8",
				 "#F2583E","#77BED2"];
  else /*SeaWash*/
  if (paletteName=="seaWash")
    colorList = ["#DC5C05","#FFAC00","#6EC5B8","#E8D0A9","#978B7D","#C7BAA7","#C1DAD6",
	             "#FFC99F","#ACD1E9","#6D929B","#D3E397","#FFF5C3"];
  else /*SolidPalette*/ 
  if (paletteName=="solid")	
	colorList = ["#0000FF","#FF0000","#00FF00","#FFCC00","#404040","#FFFF00","#FF00C0",
	             "#FFFFFF"];
  else /*TeeChart*/
  if (paletteName=="teechart")
	colorList=["rgba(255,0,0,1.0)","rgba(0,128,0,1.0)","rgba(255,255,0,1.0)","rgba(0,0,255,1.0)",
	           "rgba(255,255,255,1.0)","rgba(128,128,128,1.0)","rgba(255,0,255,1.0)",
			   "rgba(0,128,128,1.0)","rgba(0,0,128,1.0)","rgba(128,0,0,1.0)","rgba(0,255,0,1.0)",
			   "rgba(128,128,0,1.0)","rgba(128,0,128,1.0)","rgba(192,192,192,1.0)",
			   "rgba(0,255,255,1.0)","rgba(0,0,0,1.0)","rgba(173,255,47,1.0)","rgba(135,206,235,1.0)",
			   "rgba(255,228,196,1.0)","rgba(75,0,130,1.0)"];
  else /*Warm*/
  if (paletteName=="warm")
	colorList = ["rgba(243,234,141,1.0)","rgba(242,192,93,1.0)","rgba(243,156,53,1.0)",
	             "rgba(245,129,28,1.0)","rgba(243,107,21,1.0)","rgba(241,76,20,1.0)",
				 "rgba(230,24,10,1.0)","rgba(179,8,14)"];
  else /*WebPalette*/ 
  if (paletteName=="web")	
	colorList = ["#FFA500","#0000CE","#00CE00","#FFFF40","#40FFFF","#FF40FF","#FF4000",
	             "#8080A5","#808040"];				 
  else /*RainbowWidePalette*/ 
  if (paletteName=="rainbowWide")	
	colorList = ["#990000","#C30000","#EE0000","#FF1A00","#FF4600","#FF7300","#FF9F00",
	             "#FFCB00","#FFF700","#E3F408","#C3E711","#A3DA1B","#83CD25","#63C02E",
				 "#42B338","#22A642","#029A4B","#0C876A","#1A758A","#2863AA","#3650CB",
				 "#443EEB","#612AFF","#9615FF","#CC00FF"];				 
  else /*WindowsVistaPalette*/
  if (paletteName=="windowsVista")	
	colorList = ["#001FD2","#E00201","#1E6602","#E8CD7E","#AFABAC","#A4D0D9","#3D3B3C",
	             "#95DD31","#9E0001","#DCF774","#45FDFD","#D18E74","#A0D891","#D57A65",
				 "#9695D9"];
  else /*WindowsXPPalette*/ 
  if (paletteName=="windowsxp")	
	colorList = ["rgba(130,155,254,1.0)","rgba(252,209,36,1.0)","rgba(124,188,13,1.0)","rgba(253,133,47,1.0)",
				 "rgba(253,254,252,1.0)","rgba(226,78,33,1.0)","rgba(41,56,214,1.0)","rgba(183,148,0,1.0)",
				 "rgba(90,134,0,1.0)","rgba(210,70,0,1.0)","rgba(211,229,250,1.0)","rgba(216,216,216,1.0)",
				 "rgba(95,113,123,1.0)"];
  else /*VictorianPalette*/
  if (paletteName=="victorian")	
	colorList = ["#5DA5A1","#C45331","#E79609","#F6E84A","#B1A2A7","#C9A784","#8C7951",
	             "#D8CDB7","#086553","#F7D87B","#016484"];				 
	
				 
  c.paletteName = paletteName;				 
  c.palette.colors = colorList;
    
  if (c.series.items.length > 0) {
	  for (var i = 0; i < c.series.items.length; i++)
	  {
		c.series.items[i].format.fill=c.palette.get(i);
		if ((c.series.items[i].pointer != null) && (c.series.items[i].pointer.format != null))
		{
		  c.series.items[i].pointer.format.fill=c.palette.get(i);
		}
	  }
  }	
  
  c.draw();
}

function makeHttpObject() {
  try {return new XMLHttpRequest();}
  catch (error) {}
  try {return new ActiveXObject("Msxml2.XMLHTTP");}
  catch (error) {}
  try {return new ActiveXObject("Microsoft.XMLHTTP");}
  catch (error) {}

  throw new Error("Could not create HTTP request object.");
}

Tee.doHttpRequest=function(target, url, success, failure) {
  var request = makeHttpObject();
  if (request) {
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if ( (request.status === 200) || (request.status === 0) )
          success(target, request.responseText);
        else
        if (failure)
          failure(request.status, request.statusText);
      }
    };
    request.open("GET", url, true);
    request.send(null);
  }
}

Tee.Slider=function(chart,position) {
  Tee.Tool.call(this,chart);

  var touchDragging=false;
  
  var t=this.thumb=new Tee.Format(chart);
  t.round={ x:4, y:4}
  t.stroke.size=0.5;
  t.gradient.visible=false;
  t.gradient.direction="leftright";
  t.shadow.visible=false;

  var f=this.back=new Tee.Format(chart);
  f.fill="white";
  f.gradient.visible=false;
  f.stroke.fill="darkgrey";
  f.round={ x:4, y:4 }

  var g=this.grip=new Tee.Format(chart);
  g.round={ x:4, y:4}
  g.stroke.fill="rgb(20,20,20,1.0)";

  this.gripSize=3;

  var b=this.bounds={x:10, y:10, width:200, height:20};
  this.transparent=false;

  this.margin=16; // %
  this.min=0;
  this.max=100;

  this.position=(typeof position == 'undefined') ? 50 : position;

  this.useRange=false;
  this.thumbSize=8;
  this.horizontal=true;
  this.cursor="pointer";
  this.delta=0;

  function contains(r,p) {
    return (p.x>=r.x) && (p.x<=(r.x+r.width)) && (p.y>=r.y) && (p.y<=(r.y+r.height));
  }

  this.thumbRect=function(r) {
    var range=this.max-this.min,
        v=range > 0 ? (this.position-this.min)/range : 0;

    if (this.horizontal) {
       r.width=this.thumbSize;
       r.x=b.x+v*b.width-(r.width*0.5);
       r.y=b.y;
       r.height=b.height;
    }
    else
    {
      r.height=this.thumbSize;
      r.y=b.y+v*b.height-(r.height*0.5);
      r.x=b.x;
      r.width=b.width;
    }
  }

  var r={};

  this.gripRect=function(r) {
    if (this.horizontal) {
      var h=r.height*0.2;
      return {x:r.x-this.gripSize,y:(r.y+r.height*0.5)-h,width:2*this.gripSize,height:2*h};
    }
    else
    {
      var w=r.width*0.2;
      return {x:(r.x+r.width*0.5)-w,y:r.y-this.gripSize,width:2*w,height:2*this.gripSize};
    }
  }

  this.draw=function() {
    var d=this.horizontal ? b.height : b.width,
        m=d*this.margin*0.01;

    if (!this.transparent) {
       if (this.horizontal)
         this.back.rectangle(b.x,b.y+m,b.width,d-2*m);
       else
         this.back.rectangle(b.x+m,b.y,d-2*m,b.height);
    }

    if (this.onDrawThumb)
      this.onDrawThumb(this);

    this.thumbRect(r);

    if (this.invertThumb) {
      var th=this.thumb;

      if (this.horizontal) {
         th.rectangle(b.x,b.y+m,r.x,b.height-2*m);
         th.rectangle(b.x+r.x+r.width,b.y+m,b.width,b.height-2*m);
      }
      else
      {
         th.rectangle(b.x+m,b.y,b.width-2*m,r.y);
         th.rectangle(b.x+m,b.y+r.y+r.height,b.width-2*m,b.height);
      }
    }
    else
      this.thumb.rectangle(r);

    if (this.useRange) {
      if (this.horizontal) {
         var r1=this.gripRect(r);
         this.grip.rectangle(r1);
         r1.x+=r.width;
         this.grip.rectangle(r1);
      }
    }
  }

  this.clickAt=function(pos) {
    var off=this.horizontal ? b.x : b.y,
        s=this.horizontal ? b.width : b.height,
        ra=(this.max-this.min),
        v;

    v=this.min+Math.max(0,(pos+this.delta-off)*ra/s);

    if (v>this.max) v=this.max;

    if (this.onChanging) {
       var v2=this.onChanging(this,v);
       if (typeof v2 !== 'undefined')
          v=v2;
    }

    if (v<this.min) v=this.min; else if (v>this.max) v=this.max;

    this.chart.newCursor=this.cursor;

    if (this.position!=v)  {
      this.position=v;

      //requestAnimFrame(function() { this.chart.draw(); });

      this.chart.draw();
    }
  }

  this.resized=function() {
     if (this.onChanging) this.onChanging(this,this.position);
     this.chart.draw();
     this.chart.newCursor="col-resize";
  }
  this.chart.canvas.addEventListener('touchstart', function(e){
  	touchDragging=true;
  	e.preventDefault();
  });
  this.chart.canvas.addEventListener('touchend', function(e){
  	touchDragging=false;
  	e.preventDefault();
  });
  this.mousemove=function(p) {
    var s=this.horizontal ? b.width : b.height,
        pp=this.horizontal ? p.x : p.y,
        ra=(this.max-this.min);

    this.thumbRect(r);

    if (this.resizeBegin && (pp<(r.x+r.width))) {
      var old=this.thumbSize, dif=r.x-pp, v2=0.5*(dif*ra/s);
      this.thumbSize+=dif;
      this.position-=v2;

      if (this.position<this.min) {
        this.position=this.min;
        this.thumbSize=old;
      }

      this.resized();
    }
    else
    if (this.resizeEnd && (pp>r.x)) {
      var dif2=r.x+r.width-pp, v3=0.5*(dif2*ra/s);
      this.thumbSize -= dif2;
      this.position -= v3;
      this.resized();
    }
    else
    if (this.dragging||touchDragging) {
      this.clickAt(pp);
    }
    else
    {
      var ingrip=false;

      if (this.useRange) {
         var r1=this.gripRect(r);
         ingrip=contains(r1,p);
         if (!ingrip) {
           r1.x+=r.width;
           ingrip=contains(r1,p);
         }
      }

      if (ingrip)
         this.chart.newCursor="col-resize";
      else
      if (contains(r,p))
         this.chart.newCursor=this.cursor;
    }
  }

  var p={x:0,y:0};

  this.mousedown=function(event) {
    this.thumbRect(r);
    this.chart.calcMouse(event,p);

    var r1=this.gripRect(r);
    this.resizeBegin=this.useRange && contains(r1,p);
    r1.x+=r.width;

    this.resizeEnd=this.useRange && (!this.resizeBegin) && contains(r1,p);
    this.dragging=(!this.resizeBegin) && (!this.resizeEnd) && contains(r,p);

    if ((!this.resizeBegin) && (!this.resizeEnd)) {
      if (this.dragging)
        this.delta=(this.horizontal ? (r.x+r.width*0.5)-p.x : (r.y+r.height*0.5)-p.y);
      else
      if (contains(b,p))
      {
        var tmp=this.horizontal ? r.width*0.5 : r.height*0.5;
        this.delta=-tmp;
        this.clickAt(tmp+ (this.horizontal ? p.x : p.y));
      }
    }

    return this.dragging || this.resizeBegin || this.resizeEnd;
  }

  this.clicked=function() {
    var d=this.dragging || this.resizeBegin || this.resizeEnd;
    this.resizeBegin=this.resizeEnd=this.dragging=false;
    this.delta=0;
    return d;
  }

  this.mouseout=function() {
    this.resizeBegin=this.resizeEnd=this.dragging=false;
  }
}

Tee.Slider.prototype=new Tee.Tool();

Tee.Scroller=function(canvas,target) {
  Tee.Chart.call(this,canvas);

  this.target=target;

  this.aspect.clip=false;
  this.panel.transparent=true;
  this.title.visible=false;

  var scroller=this.scroller=new Tee.Slider(this);
  scroller.useRange=true;
  scroller.thumbSize=100;

  var u=scroller.thumb;
  u.shadow.height=0;
  u.transparency=0.6;
  u.stroke.fill="black";
  u.shadow.visible=false;

  scroller.horizontal=true;
  var b=scroller.bounds;
  b.x=0;
  b.y=0;
  b.width=this.bounds.width;
  b.height=this.bounds.height;
  scroller.margin=0;

  scroller.lock=false;

  this.tools.add(scroller);

  var o=this;

  target.ondraw=function() { if (!scroller.lock) o.draw(); }
  target.onscroll=function() {
    var a=this.axes.bottom, li=this.series, mi=li.minXValue(), ma=li.maxXValue(),
       dif=a.maximum-a.minimum;

    if (a.minimum<mi) { a.minimum=mi; a.maximum=a.minimum+dif; }
    if (a.maximum>ma) { a.maximum=ma; a.minimum=a.maximum-dif; }
  }

  this.useRange=function(value) {
    scroller.useRange=value;
    this.draw();
  }

  this.invertThumb=function(value) {
    scroller.invertThumb=value;
    this.draw();
  }

  scroller.onChanging=function(s,v) {
    var r=(s.thumbSize*(s.max-s.min)/s.bounds.width)*0.5,
        li=target.series, mi=li.minXValue(), ma=li.maxXValue();

    if ((v-r)<mi) v=mi+r;
    else
    if ((v+r)>ma) v=ma-r;

    target.axes.bottom.setMinMax(v-r,v+r);
    this.lock=true;

    //requestAnimFrame(function() {target.draw();});

    target.draw();
    this.lock=false;

    if (o.onChanging)
      o.onChanging(o,v-r,v+r);

    return v;
  }

  this.setBounds=function(x,y,width,height) {
    this.bounds.x=x;
    this.bounds.y=y;
    this.bounds.width=width;
    this.bounds.height=height;

    b.x=x;
    b.y=y;
    b.width=width;
    b.height=height;
  }

  scroller.onDrawThumb=function(s) {

    var r=target.chartRect, ctx=target.ctx;
    target.chartRect=scroller.bounds;
    target.ctx=scroller.chart.ctx;

    function saveAxis(axis,data) {
      var res={mi:axis.minimum, ma:axis.maximum, sp:axis.startPos, ep:axis.endPos}
      restoreAxis(axis,data);
      return res;
    }

    function restoreAxis(axis,old) {
      axis.minimum=old.mi;
      axis.maximum=old.ma;
      axis.startPos=old.sp;
      axis.endPos=old.ep;
      axis.scale=(old.ep-old.sp)/(old.ma-old.mi);
    }

    var b=scroller.bounds,
        c=target,
        li=c.series,
        h,v;

    s.min=li.minXValue();
    s.max=li.maxXValue();

    h=saveAxis(c.axes.bottom,{sp:b.x,ep:b.x+b.width,mi:s.min,ma:s.max});
    v=saveAxis(c.axes.left,{sp:b.y,ep:b.y+b.height,mi:li.minYValue(),ma:li.maxYValue()});

    var p=(h.mi+h.ma)*0.5,dif=(h.ma-h.mi),ra;

    if (s.position!=p) {
      s.thumbSize=dif*s.bounds.width/(s.max-s.min);
      ra=dif*0.5;
      if (o.onChanging) o.onChanging(o,p-ra,p+ra);
      s.position=p;
    }

    c.series.each(function(s) { if (s.visible && s.useAxes) s.draw();});

    restoreAxis(c.axes.bottom,h);
    restoreAxis(c.axes.left,v);

    c.chartRect=r;
    c.ctx=ctx;
  }
}

Tee.Scroller.prototype=new Tee.Chart();

Tee.SliderControl=function(canvas) {
  var tmp=new Tee.Chart(canvas);
  tmp.panel.transparent=true;
  tmp.title.visible=false;

  var s=new Tee.Slider(tmp);

  s.bounds.x=s.thumbSize+1;
  s.bounds.width=tmp.canvas.width-2*s.thumbSize-2;
  s.bounds.y=(tmp.canvas.height-s.bounds.height)*0.5;

  tmp.tools.add(s);
  return s;
}

Tee.CheckBox=function(chart,text,checked) {
  Tee.Annotation.call(this,chart);

  this.transparent=true;
  this.text=text;
  this.checked=checked || true;
  this.margins.left=10;

  this.cursor="pointer";
  
  this.check=new Tee.Format(chart);
  this.check.fill="white";

  this.draw=function() {
    Tee.Annotation.prototype.draw.call(this);

    var c=this.chart.ctx, x=this.position.x+2;

    var h=this.bounds.height*0.6, y=this.position.y+(this.bounds.height-h)*0.4;

    this.check.rectangle(x,y,h,h);

    if (this.checked) {
      c.beginPath();
      c.moveTo(x+3,y+5);
      c.lineTo(x+4,y+8);
      c.lineTo(x+7,y+2);
      this.check.stroke.prepare();
      c.stroke();
    }
  }

  this.chart.canvas.addEventListener('touchstart', function(){
	  
  });
  this.onclick=function( /*a,x,y*/ ) {
	  this.checked=!this.checked;
    if (this.onchange) this.onchange(this);
    return true;
  }

}

Tee.CheckBox.prototype=new Tee.Annotation();

//*********** teechart-extras end ********************

//*********** teechart-animations end ********************

if (typeof exports !== 'undefined') exports.Tee=Tee;

/**
 * @returns {Number} Returns the integer part of value, without decimals, rounded to lower.
 */
function trunc(value) {
  return value | 0;
}

/**
 * @constructor
 * @augments Tee.Tool
 * @class Base abstract class to perform Animations.
 * @property {Number} [duration=500] Duration in milliseconds of the animation.
 * @property {boolean} [running=false] Read-only, returns if the animation is currently running.
 */
 /*
Tee.Animation=function(target, onstep) {
  Tee.Tool.call(this,target);

  this.active=true;
  this.mode="linear";
  this.duration=500;
  this.items=[];
  this.running=false;

  if (target)
    if (target instanceof Tee.Chart)
       this.chart=target;
    else
    if (target instanceof Tee.Animation) {
       this.chart=target.chart;
       target.items.push(this);
    }

  var o=null;

  this.animate=function(chart) {
    if (!this.running) {
      this.running=true;

      if (chart) this.chart=chart;

      this.init=new Date().getTime();

      o=this;

      o.start();
      for(var t=0, i; i=o.items[t++];) if (i.active) { i.chart=o.chart; i.start(); }

      o.chart.draw();
      requestAnimFrame(this.step, this);
    }
  }

  this.start=function() {}
  this.stop=function() {}

  this.doStep=function(f) { if (onstep) onstep(f); }

  this.step=function() {
    var now=new Date().getTime(),
        t, i, tmp=(now-o.init)/o.duration,
        f= o.mode=="linear" ? tmp : Math.pow(2,10*(tmp-1));

    if ((f>=0) && (f<1)) {
      o.doStep(f);

      for(t=0; i=o.items[t++];)
        if (i.active) {
          i.chart=o.chart;
          i.doStep(f);
        }

      o.chart.draw();
      requestAnimFrame(o.step,o);
    }
    else {
      o.stop();
      for(t=0; i=o.items[t++];) if (i.active) { i.chart=o.chart; i.stop(); }

      if (o.onstop) o.onstop(o);

      o.running=false;
      
      o.chart.draw();
    }
  }
}

Tee.Animation.prototype=new Tee.Tool;
*/

/**
 * @constructor
 * @augments Tee.Animation
 * @class Fades in/out chart elements.
 */
Tee.FadeAnimation=function(target) {
  Tee.Animation.call(this,target);

  this.kind="in"; // in, out

  var o=this, fa;

  this.fade={}

  this.setTransp=function(value) {

    if (o.kind=="out") value=1-value;

    if (fa.legend)
        o.chart.legend.format.transparency=value;

    if (fa.walls)
        o.chart.walls.transparency=value;

    if (fa.series)
        o.chart.series.each(function(s) { s.format.transparency=value; });

    if (fa.marks)
        o.chart.series.each(function(s) { s.marks.transparency=value; });

    if (fa.title)
        o.chart.title.format.transparency=value;

    if (fa.axes)
        o.chart.axes.transparency=value;

    if (fa.panel)
        o.chart.panel.format.transparency=value;
  }

  this.start=function() { fa=this.fade; this.setTransp(1); }
  this.stop=function() { this.setTransp(0); }
  this.doStep=function(f) { o.setTransp(1-f); }
}

Tee.FadeAnimation.prototype=new Tee.Animation();

/**
 * @constructor
 * @augments Tee.Animation
 * @class Animates series data
 * @property {Tee.Series} series Optional Tee.Series object to animate. When null, all series and axes are animated.
 * @property {String} [kind="axis"] Animation style. Can be: axis, left, top, right, bottom, x, y, each, all, zoomin, zoomout.
 */
Tee.SeriesAnimation=function(target) {
  Tee.Animation.call(this,target);

  if (target instanceof Tee.Series) {
    this.series=target;
    this.chart=target.chart;
  }
  else
    this.series=null;

  this.oldmin=0;
  this.oldmax=0;
  this.oldauto=true;

  var scaling=1, o=this;

  this.kind="axis"; // "left", "right", "top", "bottom", "axis", "x", "y", "zoomin", "zoomout", "each", "all"

  function changeAxis(o,a,amount) {
    a.automatic=false;
    var mid=(o.oldmin+o.oldmax)*0.5, range=(o.oldmax-o.oldmin)*0.5;
    a.maximum=mid+amount*range;
    a.minimum=mid-amount*range;
  }

 /**
  * @returns {Tee.Axis} Returns the mandatory axis of the animated series, or null
  * if no visible series exist.
  */
  this.getAxis=function() {
    var s=this.series || this.chart.series.firstVisible();
    return s ? s.mandatoryAxis : null;
  }

  this.getOtherAxis=function() {
    var s=this.series || this.chart.series.firstVisible();
    if (s) {
      if (s.yMandatory) {
        if (s.vertAxis === "both")
          return this.chart.axes.right;
      }
      else if (s.horizAxis === "both")
        return this.chart.axes.top;
    }
    else return null;
  }

  this.doStep=function(f) {

    var a=o.getAxis(), a2=o.getOtherAxis();
    if (a) {
      a.automatic=false;
    }
    if (a2) {
      a2.automatic=false;
    }

    if (o.kind=="axis") {
       changeAxis(o,a,1+(1-f)*100);
       if (a2)
         changeAxis(o,a2,1+(1-f)*100);
    }
    else
    o.chart.series.each(function(s) {
      if (o.series && (o.series!==s)) return;

      var v=s.data.values, old=s.data._old, t, len=v.length;

                    if (s instanceof Tee.ActivityGauge) {
                        s.maxDrawWidth = s.maxWidth * (f);
                    }
                    else
                    if (s instanceof Tee.Pie) {
        s.rotation=360*(1-f);
        scaling=f;
      }
      else
      if (o.kind=="each") {
       var stepf=trunc(len*f);

       for(t=0; t<stepf; t++) v[t]=old[t];

       if (stepf<len)
          v[stepf]=old[stepf]*((len*f)-stepf);
      }
      else
      if (o.kind=="all") {
       for(t=0; t<len; t++) v[t]=old[t]*f;
      }
      else
      if (o.kind!="axis") {
        scaling=f;
      }
    });
  }

  this.stop=function() {
            this.doStep(1);
    var a=o.getAxis(), a2=o.getOtherAxis();

    if (a) {
      a.maximum=o.oldmax;
      a.minimum=o.oldmin;
      a.automatic=o.oldauto;
    }
    if (a2) {
      a2.maximum=o.oldmax;
      a2.minimum=o.oldmin;
      a2.automatic=o.oldauto;
    }

    o.chart.series.each(function(s) {
      if (s.transform)
         s.transform=null;

      if ((o.kind=="each") || (o.kind=="all"))
      if (s.data._old)
      {
         s.data.values=s.data._old;
         s.data._old=null;
      }
    });
  }

  this.start=function() {

    var a=this.getAxis(), a2=this.getOtherAxis(), c=this.chart, ss=c.series.items,
        w=c.chartRect.width, h=c.chartRect.height, t, s,
        ww=c.bounds.width, hh=c.bounds.height;

    if (ss.length===0)
      return false;

    this.oldmin=a.minimum;
    this.oldmax=a.maximum;
    this.oldauto=a.automatic;

    for (t=0; t<ss.length; t++) {
      s=ss[t];

      if (this.series && (this.series!==s)) continue;

      if (s instanceof Tee.Pie)
        s.transform=function() { this.chart.ctx.scale(scaling, scaling); }
      else
      if ((this.kind=="each") || (this.kind=="all")) {
        var v=s.data.values, tt, len=v.length;
        s.data._old=v.slice(0);
        for(tt=0; tt<len; tt++) v[tt]=0;
        a.automatic=false;
        if (a2)
          a2.automatic=false;
      }
      else
      if (this.kind=="left")
        s.transform=function() { this.chart.ctx.translate(-w*(1-scaling),0); }
      else
      if (this.kind=="right")
        s.transform=function() { this.chart.ctx.translate(w*(1-scaling),0); }
      else
      if (this.kind=="x")
        s.transform=function() { this.chart.ctx.scale(scaling, 1); }
      else
      if (this.kind=="y")
        s.transform=function() { this.chart.ctx.scale(1, scaling); }
      else
      if (this.kind=="top")
         s.transform=function() { this.chart.ctx.translate(0,-h*(1-scaling)); }
      else
      if (this.kind=="bottom")
         s.transform=function() { this.chart.ctx.translate(0,h*(1-scaling)); }
      else
      if (this.kind=="zoomin")
         s.transform=function() {
           var ctx=this.chart.ctx;
           ctx.translate(ww*0.5,hh*0.5);
           ctx.scale(scaling,scaling);
           ctx.translate(-ww*0.5,-hh*0.5);
         }
      else
      if (this.kind=="zoomout")
         s.transform=function() {
           var ctx=this.chart.ctx;
           ctx.translate(ww*0.5,hh*0.5);
           ctx.scale(2-scaling,2-scaling);
           ctx.translate(-ww*0.5,-hh*0.5);
         }
    }

    if (this.kind=="axis") {
      changeAxis(this, a, 100);
      if (a2)
        changeAxis(this, a2, 100);
    }
  }
}

Tee.SeriesAnimation.prototype=new Tee.Animation();


/**
 * @constructor
 * @augments Tee.Animation
 * @class Animates Series marks items.
 */
Tee.MarksAnimation=function(target) {
  Tee.Animation.call(this,target);

  if (target && (target instanceof Tee.Series)) {
    this.series=target;
    this.chart=target.chart;
  }
  else
    this.series=null;

  this.current=-1;

  var m=this.series.marks, o=this, old;

  function marksText(series,index,result) {
    if (index<=o.current)
       return result;
    else
       return "";
  }

  this.start=function() {
     old=m.ongettext;
     m.ongettext=marksText;
  }

  this.stop=function() {
     m.ongettext=old;
     this.current=-1;
  }

  this.doStep=function(f) {
    o.current=trunc(o.series.data.values.length*f);
  }
}

Tee.MarksAnimation.prototype=new Tee.Animation();

//*********** teechart-animations end ********************

}).call(this);



/*TOUCH FUNCTIONS*/
/**
 * Double tap function reset the axes of the chart if canvas is double tapped.
 */
function doubleTap(chart){
	var canvas=chart.canvas;
	var timeout;
	var lastTap = 0;
	canvas.addEventListener('touchend', function(e) {
	    var currentTime = new Date().getTime();
	    var tapLength = currentTime - lastTap;
	    clearTimeout(timeout);
	    if (tapLength < 600 && tapLength > 100) {
	    	chart.zoom.reset();
	    	chart.draw();
	    } 
	    else {
	    	timeout = setTimeout(function() {
	        	clearTimeout(timeout);
	        }, 600);
	    }
	    lastTap = currentTime;
	    e.preventDefault();
	});
	
}

/**
 * Zoom the axes of the chart changing the min and the max value when two fingers are touching and moving in the canvas.
 */

function twoFingersZoom(chart,zoom){
	
	var canvas = chart.canvas;
	var timer;
	var maxDistX=0, minDistX=0, maxDistY=0, minDistY=0;
	var newMinDistX=0, newMaxDistX=0, newMinDistY=0, newMaxDistY=0;
	var oldMinDistX=0, oldMaxDistX=0, oldMinDistY=0, oldMaxDistY=0;
	var touches = [];
	var touchedMoreThanOnceStart;
	var pMinX, pMinY, pMaxX, pMaxY;
	var iniMinX, iniMinY, iniMaxX, iniMaxY;
	touchedMoreThanOnceStart=false;
	timer = setInterval(touchZoom, 100);

	function touchZoom() {
		var len = touches.length;
		if(len>1){
			var tmp=0;
			var touch1 = touches[0];
			var touch2 = touches[1];
			if(!touchedMoreThanOnceStart){

				iniMinX=touch1.pageX;
				iniMaxX=touch2.pageX;
				iniMinY=touch1.pageY;
				iniMaxY=touch2.pageY;
				
				if(iniMinX>iniMaxX){
					tmp=iniMinX;iniMinX=iniMaxX;iniMaxX=tmp;
				}
				if(iniMinY>iniMaxY){
					tmp=iniMinY;iniMinY=iniMaxY;iniMaxY=tmp;
				}
				
				touchedMoreThanOnceStart = true;
			}
			else{
				pMinX=touch1.pageX;
				pMaxX=touch2.pageX;
				pMinY=touch1.pageY;
				pMaxY=touch2.pageY;
				if(pMinX>pMaxX){
					tmp=pMinX;pMinX=pMaxX;pMaxX=tmp;
				}
				if(pMinY>pMaxY){
					tmp=pMinY;pMinY=pMaxY;pMaxY=tmp;
				}

				newMinDistX = pMinX - iniMinX;
				newMinDistY = pMinY - iniMinY;
				newMaxDistX = pMaxX - iniMaxX;
				newMaxDistY = pMaxY - iniMaxY;

				minDistX=oldMinDistX-newMinDistX;
				minDistY=oldMinDistY-newMinDistY;
				maxDistX=oldMaxDistX-newMaxDistX;
				maxDistY=oldMaxDistY-newMaxDistY;

				oldMinDistX=newMinDistX;
				oldMinDistY=newMinDistY;
				oldMaxDistX=newMaxDistX;
				oldMaxDistY=newMaxDistY;
				
				
			}
			if(zoom.direction=="both"||zoom.direction=="horizontal"){
				drawMinMaxBottom(chart.axes.bottom.startPos+minDistX,chart.axes.bottom.endPos+maxDistX);
			}
			if(zoom.direction=="both"||zoom.direction=="vertical"){
				drawMinMaxLeft(chart.axes.left.startPos+minDistY,chart.axes.left.endPos+maxDistY);
			}
		
		}
	}

	canvas.addEventListener('touchend', function() {
		if(touchedMoreThanOnceStart){
			touchedMoreThanOnceStart=false;
		}
		clearInterval(timer);
	});
	canvas.addEventListener('touchmove', function(event) {
		event.preventDefault();
		touches = event.touches;
	});

	function drawMinMaxBottom(min, max) {
	    chart.axes.top.calcMinMax(min, max);
	    chart.axes.bottom.calcMinMax(min, max);
		chart.draw();
	}
	function drawMinMaxLeft(min, max) {
	    chart.axes.right.calcMinMax(min, max);
	    chart.axes.left.calcMinMax(min, max);
		chart.draw();
	}
}

