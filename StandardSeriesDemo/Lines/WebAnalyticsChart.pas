unit WebAnalyticsChart;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Chart,
  FMXTee.URL, FMXTee.Engine, FMXTee.Procs, FMX.Layouts, FMXTee.Tools,
  FMXTee.Series, FMXTee.Series.Donut;

type
  TWebAnalyticsForm = class(TForm)
    GridPanelLayout1: TGridPanelLayout;
    Chart1: TChart;
    Chart2: TChart;
    Chart3: TChart;
    Chart4: TChart;
    ChartTool1: TCursorTool;
    ChartTool2: TAnnotationTool;
    ChartTool3: TAnnotationTool;
    ChartTool4: TAnnotationTool;
    ChartTool5: TCursorTool;
    ChartTool6: TCursorTool;
    procedure FormCreate(Sender: TObject);
    procedure ChartTool1Change(Sender: TCursorTool; x, y: Integer; const XValue,
      YValue: Double; Series: TChartSeries; ValueIndex: Integer);
    procedure ChartTool5Change(Sender: TCursorTool; x, y: Integer; const XValue,
      YValue: Double; Series: TChartSeries; ValueIndex: Integer);
    procedure ChartTool6Change(Sender: TCursorTool; x, y: Integer; const XValue,
      YValue: Double; Series: TChartSeries; ValueIndex: Integer);
  private
    { Private declarations }
  public
    { Public declarations }
    function InterpolateLineSeries(series:TChartSeries; firstindex:integer; lastindex:integer; xvalue: double): Double;
    function InterpolateCustomLineSeries(series:TCustomSeries; xvalue: Double): Double;
  end;

var
  WebAnalyticsForm: TWebAnalyticsForm;

implementation

{$R *.fmx}

procedure TWebAnalyticsForm.ChartTool1Change(Sender: TCursorTool; x, y: Integer;
  const XValue, YValue: Double; Series: TChartSeries; ValueIndex: Integer);
begin
    ChartTool2.Text := Chart4[0].Title + ': Y(' + Format('%8.2f',[XValue]) + ') = ';
    ChartTool2.Text := ChartTool2.Text + Format('%8.2f',[InterpolateCustomLineSeries(Chart4[0] as TCustomSeries, XValue)]) + ')';
    ChartTool2.Left := x + 10;
    ChartTool2.Top := Chart4.Axes.Left.IStartPos;
end;

procedure TWebAnalyticsForm.ChartTool5Change(Sender: TCursorTool; x, y: Integer;
  const XValue, YValue: Double; Series: TChartSeries; ValueIndex: Integer);
begin
    ChartTool3.Text := Chart4[1].Title + ': Y(' + Format('%8.2f',[XValue]) + ') = ';
    ChartTool3.Text := ChartTool3.Text + Format('%8.2f',[InterpolateCustomLineSeries(Chart4[1] as TCustomSeries, XValue)]) + ')';
    ChartTool3.Left := x + 10;
    ChartTool3.Top := Chart4.Axes.Left.IStartPos + 18;
end;

procedure TWebAnalyticsForm.ChartTool6Change(Sender: TCursorTool; x, y: Integer;
  const XValue, YValue: Double; Series: TChartSeries; ValueIndex: Integer);
begin
    ChartTool4.Text := Chart4[2].Title + ': Y(' +  Format('%8.2f',[XValue]) + ') = ';
    ChartTool4.Text := ChartTool4.Text + Format('%8.2f',[InterpolateCustomLineSeries(Chart4[2] as TCustomSeries, XValue)]) + ')';
    ChartTool4.Left := x + 10;
    ChartTool4.Top := Chart4.Axes.Left.IStartPos + 36;
end;

procedure TWebAnalyticsForm.FormCreate(Sender: TObject);
begin
  Chart1[0].ValueColor[1] := Chart4[0].Color;
  Chart2[0].ValueColor[1] := Chart4[1].Color;
  Chart3[0].ValueColor[1] := Chart4[2].Color;

  Chart2[0].ValueColor[0] := Chart1[0].ValueColor[0];
  Chart3[0].ValueColor[0] := Chart1[0].ValueColor[0];

  (Chart4[0] as TLineSeries).Smoothed:=true;
  (Chart4[1] as TLineSeries).Smoothed:=true;
  (Chart4[2] as TLineSeries).Smoothed:=true;

  ChartTool1.Snap := true;
  ChartTool2.Shape.Font.Color := Chart4[0].Color;
  ChartTool3.Shape.Font.Color := Chart4[1].Color;
  ChartTool4.Shape.Font.Color := Chart4[2].Color;

  Charttool2.Text:='';
  Charttool3.Text:='';
  Charttool4.Text:='';
end;

function TWebAnalyticsForm.InterpolateCustomLineSeries(series: TCustomSeries;
  xvalue: Double): Double;
begin
  result:= InterpolateLineSeries(series, series.FirstDisplayedIndex, series.LastDisplayedIndex, xvalue);
end;

function TWebAnalyticsForm.InterpolateLineSeries(series: TChartSeries;
  firstindex, lastindex: integer; xvalue: double): Double;
var   index:integer;
      dx, dy : Double;
begin

  for index := firstindex to lastindex-1 do
    if ((index = -1) or (series.XValues.Value[index] > xvalue)) then break;

  // safeguard
  if (index < 1) then index := 1
  else if (index >= series.Count) then index := series.Count - 1;
  // y=(y2-y1)/(x2-x1)*(x-x1)+y1
  dx := series.XValues[index] - series.XValues[index - 1];
  dy := series.YValues[index] - series.YValues[index - 1];
  if (dx <> 0.0) then
    result :=  dy * (xvalue - series.XValues[index - 1]) / dx + series.YValues[index - 1]
  else
    result := 0.0;
end;

end.
