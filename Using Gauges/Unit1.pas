unit Unit1;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMX.StdCtrls, FMX.Objects,
  FMX.Controls.Presentation, FMXTee.Gauges.Numeric, FMXTee.Series,
  FMXTee.Editor.EditorPanel, FMXTee.Gauges.Linear, FMXTee.Gauges.Circular,
  FMXTee.Gauges.Knob, FMX.Effects, FMX.Filter.Effects;

type
  TGaugesForm = class(TForm)
    Chart1: TChart;
    ToolBar1: TToolBar;
    Label1: TLabel;
    Series1: TNumericGauge;
    Image1: TImage;
    ChartEditor1: TChartEditor;
    Button1: TButton;
    Chart2: TChart;
    Series2: TNumericGauge;
    Chart3: TChart;
    Series3: TCircularGauge;
    Chart4: TChart;
    CircularGauge1: TCircularGauge;
    Chart5: TChart;
    Series4: TKnobGauge;
    Rectangle2: TRectangle;
    Rectangle1: TRectangle;
    Rectangle3: TRectangle;
    Chart6: TChart;
    Series5: TLinearGauge;
    Chart7: TChart;
    LinearGauge1: TLinearGauge;
    Chart8: TChart;
    Series6: TClockGauge;
    Chart9: TChart;
    KnobGauge1: TKnobGauge;
    Chart10: TChart;
    Series7: TLinearGauge;
    Chart11: TChart;
    LinearGauge2: TLinearGauge;
    Chart12: TChart;
    CircularGauge2: TCircularGauge;
    HueAdjustEffect1: THueAdjustEffect;
    procedure Button1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  GaugesForm: TGaugesForm;

implementation



{$R *.fmx}

procedure TGaugesForm.Button1Click(Sender: TObject);
begin
  ChartEditor1.execute;
end;

procedure TGaugesForm.FormCreate(Sender: TObject);
begin
  // Settings for NumericGauge 1
  Series1.ValueMarker.Shape.Font.Color := TAlphaColorRec.Gray;
  Series1.Markers.Items[2].Text := 'STBY';
  Series1.Markers.Items[1].Shape.Font.Color := TAlphaColorRec.Green;
  Series1.Markers.Items[1].Text := 'MC';

  // Settings for NumericGauge 2
  Series2.ValueMarker.Shape.Font.Color := TAlphaColorRec.Red;
  Series2.Markers.Items[2].Text := 'M443';
  Series2.Markers.Items[1].Shape.Font.Color := TAlphaColorRec.Yellow;
  Series2.Markers.Items[1].Text := 'ALT';

  // Settings for CircularGauge
  Series3.Hand.Brush.Gradient.StartColor := TAlphaColorRec.Orange;
  Series3.Hand.Brush.Gradient.EndColor := TAlphaColorRec.Red;
  Series3.TotalAngle := 280;

  Series6.Frame.InnerBrush.Gradient.Visible := false;
  CircularGauge2.Axis.Visible := false;
end;

end.
