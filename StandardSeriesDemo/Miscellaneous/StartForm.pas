unit StartForm;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Chart,
  FMXTee.URL, FMXTee.Engine, FMXTee.Procs, FMX.Layouts, FMXTee.Series.Surface,
  FMXTee.Series.Map, FMXTee.Series.World, FMXTee.Series, FMXTee.Gauges.Numeric,
  FMXTee.Gauges.Linear, FMXTee.Gauges.Circular, FMXTee.Series.Bubble,
  FMXTee.Series.TagCloud, FMXTee.Series.Donut, FMXTee.Series.Spline;

type
  TStartChartForm = class(TForm)
    GridPanelLayout1: TGridPanelLayout;
    Chart1: TChart;
    ImportChart1: TImportChart;
    ImportChart2: TImportChart;
    Chart3: TChart;
    ImportChart3: TImportChart;
    Chart2: TChart;
    SeriesWorld: TWorldSeries;
    Chart4: TChart;
    ImportChart4: TImportChart;
    Chart5: TChart;
    ImportChart5: TImportChart;
    Chart6: TChart;
    ImportChart6: TImportChart;
    Chart7: TChart;
    ImportChart7: TImportChart;
    Chart8: TChart;
    Series1: TTagCloudSeries;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  StartChartForm: TStartChartForm;

implementation

{$R *.fmx}

procedure TStartChartForm.FormCreate(Sender: TObject);
begin
  Chart6.Series[0].FillSampleValues(25);
  Chart6.Series[1].FillSampleValues(25);
  (Chart6.Series[0] as TAreaSeries).Smoothed :=true;
  (Chart6.Series[1] as TAreaSeries).Smoothed :=true;

  Series1.Font.Color := TAlphaColorRec.Blue;
end;

end.
