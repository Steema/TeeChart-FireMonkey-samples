unit AreaChart;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Chart,
  FMXTee.URL, FMXTee.Engine, FMXTee.Procs, FMXTee.Animations.Tools,
  FMXTee.Series.Spline, FMXTee.Series;

type
  TAreaChartForm = class(TForm)
    Chart1: TChart;
    ImportChart1: TImportChart;
    ChartAnimation1: TTeeAnimationTool;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  AreaChartForm: TAreaChartForm;

implementation

{$R *.fmx}

procedure TAreaChartForm.FormCreate(Sender: TObject);
var t : integer;
begin
  Randomize;
  while (t<15) do
  begin
    Chart1.Series[0].Add(Random(100), '', clTeeColor);
    Chart1.Series[1].Add(Random(60), '', clTeeColor);
    Chart1.Series[2].Add(Random(30), '', clTeeColor);
  end;

  (Chart1.Series[0] as TAreaSeries).Smoothed := true;
  (Chart1.Series[1] as TAreaSeries).Smoothed := true;
  (Chart1.Series[2] as TAreaSeries).Smoothed := true;

  (Chart1.Series[0] as TAreaSeries).DrawStyle := dsCurve;
  (Chart1.Series[1] as TAreaSeries).DrawStyle := dsCurve;
  (Chart1.Series[2] as TAreaSeries).DrawStyle := dsCurve;

  Chart1.Axes.Bottom.Increment := 3;
  Chart1.Gradient.Visible := false;

  ChartAnimation1.Play;
end;

end.
