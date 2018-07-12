//import { Tee } from "./teechart-gauges";
//import { templateSourceUrl } from "@angular/compiler";

// Type definitions for TeeChart 2.4
// Project: http://www.steema.com
// Definitions by: Steema Software <https://steema.com/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/**
 * TeeChart(tm) for TypeScript
 *
 * v2.4 May 2018
 * Copyright(c) 2012-2018 by Steema Software SL. All Rights Reserved.
 * http://www.steema.com
 *
 * Licensed MIT,
 * specifically: http://www.steema.com/licensing/html5
 *
 * TypeScript is a Microsoft product: www.typescriptlang.org
 *
 */

/**
 * @author <a href="mailto:david@steema.com">Steema Software</a>
 * @version 2.4
 */

//options
//export = Tee; // making it a module
//export as namespace Tee; // keep a global namespace called Tee
//declare namespace Tee { //simply declare the namespace
//or...

//as module
export namespace Tee {

  interface IPoint {
    x: number;
    y: number;
  }

  interface IRectangle {
    x: number;
    y: number;
    width: number;
    height: number;

    contains(point: IPoint): boolean;
  }

  interface ITool {
    active: boolean;
    chart: IChart;

    mousedown(event: any): boolean;
    mousemove(event: any): boolean;
    clicked(p: IPoint): boolean;
    draw(): void;
  }

  interface IGradient {
    chart: IChart;
    visible: boolean;

    colors: string[];
    direction: string;
    stops: number[];
    offset: IPoint;
  }

  interface IShadow {
    chart: IChart;
    visible: boolean;
    blur: number;
    color: string;
    width: number;
    height: number;
  }

  interface IStroke {
    chart: IChart;
    fill: string;
    size: number;
    join: string;
    cap: string;
    dash: number[];
    gradient: IGradient;
  }

  interface IFont {
    chart: IChart;
    style: string;
    gradient: IGradient;
    fill: string;
    stroke: IStroke;
    shadow: IShadow;
    textAlign: string;
    baseLine: string;

    getSize(): number;
    setSize(size: number): void;
  }

  interface IImage {
    url: string;
    chart: IChart;
    visible: boolean;
  }

  interface IFormat {
    font: IFont;
    gradient: IGradient;
    shadow: IShadow;
    stroke: IStroke;
    round: IPoint;
    transparency: number;
    image: IImage;
    fill: string;

    textHeight(text: string): number;
    textWidth(text: string): number;
    drawText(bounds: IRectangle, text: string): any;
    rectangle(x: number, y: number, width: number, height: number): any;
    poligon(points: IPoint[]): any;
    ellipse(x: number, y: number, width: number, height: number): any;
  }

  interface IMargins {
    left: number;
    top: number;
    right: number;
    bottom: number;
  }

  interface IAnnotation extends ITool {
    position: IPoint;
    margins: IMargins;
    items: IAnnotation[];
    bounds: IRectangle;
    visible: boolean;
    transparent: boolean;
    text: string;
    format: IFormat;

    add(text: string): IAnnotation;
    resize(): void;
    clicked(point: IPoint): boolean;
    draw(): void;
  }

  interface IPanel {
    format: IFormat;
    transparent: boolean;
    margins: IMargins;
  }

  interface ITitle extends IAnnotation {
    expand: boolean;
    padding: number;
    transparent: boolean;
  }

  interface IPalette {
    colors: string[];

    get(index: number): string;
  }

  interface IArrow extends IFormat {
    length: number;
    underline: boolean;
  }

  interface IMarks extends IAnnotation {
    arrow: IArrow;
    series: ISeries;

    style: string;

    drawEvery: number;
    visible: boolean;
  }

  interface ISeriesData {
    values: number[];
    labels: string[];
    source: any;
  }

  interface ICursor {
    cursor: string;
  }

  interface ISeriesNoBounds {
    data: ISeriesData;
    marks: IMarks;

    yMandatory: boolean;
    horizAxis: string;
    vertAxis: string;

    format: IFormat;
    hover: IFormat;

    visible: boolean;

    cursor: ICursor;
    over: number;

    palette: IPalette;
    colorEach: string;

    useAxes: boolean;
    decimals: number;

    title: string;

    continuous: boolean;
    sortedOptions : ISortedOptions;

    //refresh(failure: function): void;

    toPercent(index: number): string;
    markText(index: number): string;

    valueText(index: number): string;

    associatedToAxis(axis: IAxis): boolean;

    calc(index: number, position: IPoint): void;

    clicked(position: IPoint): number;

    minXValue(): number;
    maxXValue(): number;

    minYValue(): number;
    maxYValue(): number;

    sortedValues(): number[];
    drawSortedValues(sorted: boolean);

    count(): number;

    addRandom(count: number, range?: number, x?: boolean): ISeries;
  }

  interface ISeries extends ISeriesNoBounds {
    bounds(rectangle: IRectangle): void;
  }

  interface ISortedOptions {
    sortedDrawAnimation: IAnimation;
    sortedValues: number[];
    sortedValuesIndices: number[];
    originalValues:number[];
    sortedLabels: number[];
    originalLabels: string[],
    sorted: boolean,
    ascending: boolean,
    sorting:boolean,
    sortingAnimationType: string; // "verticalchange"
  }

  interface IAxisLabels {
    chart: IChart;
    format: IFormat;
    decimals: number;
    padding: number;
    separation: number; // %
    visible: boolean;
    rotation: number;
    alternate: boolean;
    maxWidth: number;

    labelStyle: string;
    dateFormat: string;

    getLabel(value: number): string;
    width(value: number): number;

  }

  interface IGrid {
    chart: IChart;
    format: IFormat;
    visible: boolean;
    lineDash: boolean;
  }

  interface ITicks {
    chart: IChart;
    stroke: IStroke;
    visible: boolean;
    length: number;
  }

  interface IMinorTicks extends ITicks {
    count: number;
  }

  interface IAxisTitle extends IAnnotation {
    padding: number;
    transparent: boolean;
  }

  interface IAxis {
    chart: IChart;
    visible: boolean;
    inverted: boolean;

    horizontal: boolean;  // readonly
    otherSize: boolean; // readonly
    bounds: IRectangle;  // readonly?

    position: number;
    format: IFormat;
    custom: boolean; // readonly

    grid: IGrid;
    labels: IAxisLabels;
    ticks: ITicks;
    minorTicks: IMinorTicks;
    innerTicks: ITicks;

    title: IAxisTitle;

    automatic: boolean;
    minimum: number;
    maximum: number;
    increment: number;
    log: boolean;

    startPos: number;
    endPos: number;

    start: number; // %
    end: number; // %

    axisSize: number;

    scale: number;
    increm: number;

    calc(value: number): number;
    fromPos(position: number): number;
    fromSize(size: number): number;
    fromSizeCalcIndex(size: number): number;

    hasAnySeries(): boolean;
    scroll(delta: number): void;
    setMinMax(minimum: number, maximum: number): void;
  }

  interface IAxes {
    chart: IChart;
    visible: boolean;

    left: IAxis;
    top: IAxis;
    right: IAxis;
    bottom: IAxis;

    items: IAxis[];

    add(horizontal: boolean, otherSide: boolean): IAxis;
    //each(f: function): void;
  }

  interface ISymbol {
    chart: IChart;
    format: IFormat;
    width: number;
    height: number;
    padding: number;
    visible: boolean;
  }

  interface ILegend {
    chart: IChart;

    transparent: boolean;

    format: IFormat;
    title: IAnnotation;

    bounds: IRectangle;
    position: string;
    visible: boolean;
    inverted: boolean;
    padding: number;
    align: number;

    fontColor: boolean;

    dividing: IStroke;
    over: number;
    symbol: ISymbol;

    itemHeight: number;
    innerOff: number;

    legendStyle: string;
    textStyle: string;

    availRows(): number;
    itemsCount(): number;
    totalWidth(): number;
    showValues(): boolean;
    itemText(series: ISeries, index: number): string;
    isVertical(): boolean;
  }

  interface IScroll {
    chart: IChart;
    active: boolean;
    enabled: boolean;
    direction: string;
    mouseButton: number;

    position: IPoint;
  }

  interface ISeriesList {
    chart: IChart;
    items: ISeries[];

    anyUsesAxes(): boolean;
    clicked(position: IPoint): boolean;
    //each(f: function): void;
    firstVisible(): ISeries;

  }

  interface ITools {
    chart: IChart;
    items: ITool[];

    add(tool: ITool): ITool;
  }

  interface IWall {
    format: IFormat;
    visible: boolean;
    bounds: IRectangle;
  }

  interface IWalls {
    visible: boolean;
    left: IWall;
    right: IWall;
    bottom: IWall;
    back: IWall;
  }

  interface IZoom {
    chart: IChart;
    active: boolean;
    direction: string;
    enabled: boolean;
    mouseButton: number;
    format: IFormat;

    reset(): void;
  }

  interface IChart {
    addSeries(series: ISeries): ISeries;
    draw(context?: CanvasRenderingContext2D): any;

    applyTheme(aTheme: string);
  }

  // SERIES

  interface ICustomBar extends ISeries {
    sideMargins: number;
    useOrigin: boolean;
    origin: number;

    offset: number;
    barSize: number;
    barStyle: string;

    stacked: string;
  }

  interface IStates {
    colors: string[];
    values: number[];
    barStates: IStates[];
    barSize: number;
    gradientVisible: boolean;
  }

  interface IBullet extends ICustomBar {
     states: IStates;
  }

  interface ISeriesPointer {
    chart: IChart;
    format: IFormat;
    visible: boolean;
    colorEach: boolean;
    style: string;
    width: number;
    height: number;
  }

  interface ICustomSeries extends ISeries {
    pointer: ISeriesPointer;

    stacked: string;
    stairs: boolean;
  }

  interface ILine extends ICustomSeries {
    smooth: number;
  }

  interface ISmoothLine extends ILine {
    smooth: number;
  }

  interface IArea extends ISeries {
    useOrigin: boolean;
    origin: number;
  }

  interface IPie extends ISeries {
    donut: number;
    rotation: number;
    sort: string;
    orderAscending: boolean;
    explode: number[];
    concentric: boolean;
    angleWidth: number;
    maxRadius:number;

    calcPos(angle: number, position: IPoint): void;
  }

  interface IDonut extends IPie {
    donutArray : IDonut[];
  }  

  interface IActivityGauge extends IDonut {
    maxWidth : number;

    add(value:number, label:string);
  }

  interface IBubbleData extends ISeriesData {
    radius: number[];
  }

  interface IBubble extends ICustomSeries {
    data: IBubbleData;
  }

  interface IGanttData extends ISeriesData {
    start: number[];
    x: number[];
    end: number[];
  }

  interface IGantt extends ISeries{
    data: IGanttData;
    dateFormat: string;
    colorEach: string;
    height: number;
    margin: IPoint;
    nextTasks : [number,number];
    nextTasksStrokeStyle : string;
    nextTasksPosition : string;

    add(index: number, label: string, start: number, end: number): void;
    addNextTask(point1 : number, point2 : number);
  }

  interface ICandleData extends ISeriesData {
    open: number[];
    close: number[];
    high: number[];
    low: number[];
  }

  interface ICandle extends ICustomSeries {
    data: ICandleData;
    higher: IFormat;
    lower: IFormat;
    style: string;
  }  

  // TOOLS

  interface IDragTool extends ITool {
    series: ISeries;
  }

  interface ICursorTool extends ITool {
    direction: string;
    size: IPoint;

    followMouse: boolean;
    dragging: number;

    format: IFormat;

    horizAxis: IAxis;
    vertAxis: IAxis;

    render: string;

    over(point: IPoint): boolean;
    setRender(render: string): void;
  }

  interface IToolTip extends IAnnotation {
    animated: number;
    autoHide: boolean;
    autoRedraw: boolean;
    currentSeries: ISeries;
    currentIndex: number;
    delay: number;
    findPoint : boolean;

    hide(): void;
    refresh(series: ISeries, index: number): void;
  }

  interface IAnimation extends ITool {
    active: boolean;
    mode:string;
    duration:number;
    items:IAnimation[];
  
    autoDraw: boolean;
    loop: boolean;
    running: boolean;

    animate(chart : IChart);
    start();
    stop();
  }

  class Point implements IPoint {
    public x: number;
    public y: number;
  }

  class Chart implements IChart {
    //public aspect: IAspect;

    public axes: IAxes;
    public footer: ITitle;
    public legend: ILegend;
    public panel: IPanel;
    public scroll: IScroll;
    public series: ISeriesList;
    public title: ITitle;
    public tools: ITools;
    public walls: IWalls;
    public zoom: IZoom;

    public bounds: IRectangle;
    public canvas: HTMLCanvasElement;
    public chartRect: IRectangle;
    public palette: IPalette;

    constructor(canvas: string);
    addSeries(series: ISeries): ISeries;
    getSeries(index: number): ISeries;
    removeSeries(series: ISeries): void;

    draw(context?: CanvasRenderingContext2D): any;
    toImage(image: HTMLImageElement, format: string, quality: number): void;

    applyTheme(aTheme: string);
  }

  var Line: {
    prototype: ILine;
    new (values?: number[]): ILine;
  }

  var PointXY: {
    prototype: ICustomSeries;
    new (values?: number[]): ICustomSeries;
  }

  var Area: {
    prototype: IArea;
    new (values?: number[]): IArea;
  }

  var HorizArea: {
    prototype: IArea;
    new (values?: number[]): IArea;
  }

  var Bar: {
    prototype: ICustomBar;
    new (values?: number[]): ICustomBar;
  }

  var HorizBar: {
    prototype: ICustomBar;
    new (values?: number[]): ICustomBar;
  }

  var Bullet: {
    prototype: IBullet;
    new (values?: number[]): IBullet;
  }

  var Pie: {
    prototype: IPie;
    new (values?: number[]): IPie;
  }

  var Donut: {
    prototype: IDonut;
    new (values?: number[]): IDonut;
  }

  var ActivityGauge: {
    prototype: IActivityGauge;
    new (values?: number[]): IActivityGauge;
  }

  var Bubble: {
    prototype: IBubble;
    new (values?: number[]): IBubble;
  }

  var Gantt: {
    prototype: IGantt;
    new (values?: number[]): IGantt;
  }

  var Volume: {
    prototype: ICustomBar;
    new (values?: number[]): ICustomBar;
  }

  var Candle: {
    prototype: ICandle;
    new (values?: number[]): ICandle;
  }

  // TOOLS

  var CursorTool: {
    prototype: ICursorTool;
    new (chart?: Chart): ICursorTool;
  }

  var DragTool: {
    prototype: IDragTool;
    new (chart?: Chart): IDragTool;
  }

  var ToolTip: {
    prototype: IToolTip;
    new (chart?: Chart): IToolTip;
  }

  var Animation: {
    prototype: IAnimation;
    new (chart?: Chart): IToolTip;
  }
}