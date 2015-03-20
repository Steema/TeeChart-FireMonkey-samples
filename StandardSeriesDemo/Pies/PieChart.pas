unit PieChart;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMXTee.URL, FMXTee.Animations.Tools,
  FMXTee.Series, FMXTee.Gauges.Numeric, FMX.StdCtrls;

type
  TPieChartForm = class(TForm)
    Chart1: TChart;
    Panel1: TPanel;
    Chart2: TChart;
    Series1: TNumericGauge;
    Chart3: TChart;
    NumericGauge1: TNumericGauge;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  PieChartForm: TPieChartForm;

implementation

{$R *.fmx}

procedure TPieChartForm.FormCreate(Sender: TObject);
begin
  Chart1[0].Clear;
  Chart1[0].Add(19,'Facebook', clTeeColor);
  Chart1[0].Add(14, 'Tencent', clTeeColor);
  Chart1[0].Add(9, 'WhatsApp', clTeeColor);
  Chart1[0].Add(5, 'LinkedIn', clTeeColor);
  Chart1[0].Add(4, 'Twitter', clTeeColor);

  (Chart1[0] as TPieSeries).PieMarks.LegSize := 20;
  Chart1[0].Marks.FontSeriesColor := true;

  Chart2.Gradient.Visible := false;
  Chart3.Gradient.Visible := false;

  Chart2.Color := Chart1[0].ValueColor[0];
  Chart3.Color := Chart1[0].ValueColor[4];

  Series1.DigitalFont := dfBar;
  NumericGauge1.DigitalFont := dfCustom;

  Series1.Markers[0].Text := '19';
  NumericGauge1.Markers[0].Text := '4';

  Series1.Markers[1].Text := 'Highest';
  NumericGauge1.Markers[1].Text := 'Lowest';

  Series1.Markers[2].Text := 'Facebook';
  NumericGauge1.Markers[2].Text := 'Twitter';

  Series1.Markers[0].Shape.Font.Name := 'Verdana';
  NumericGauge1.Markers[0].Shape.Font.Name := 'Verdana';
  Series1.Markers[1].Shape.Font.Name := 'Verdana';
  NumericGauge1.Markers[1].Shape.Font.Name := 'Verdana';
  Series1.Markers[2].Shape.Font.Name := 'Verdana';
  NumericGauge1.Markers[2].Shape.Font.Name := 'Verdana';

  Series1.Markers[0].Shape.Transparent := true;
  NumericGauge1.Markers[0].Shape.Transparent := true;
  Series1.Markers[1].Shape.Transparent := true;
  NumericGauge1.Markers[1].Shape.Transparent := true;
  Series1.Markers[2].Shape.Transparent := true;
  NumericGauge1.Markers[2].Shape.Transparent := true;
end;

end.
