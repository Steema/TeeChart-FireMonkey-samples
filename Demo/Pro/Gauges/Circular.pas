unit Circular;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMX.StdCtrls, Base, FMXTee.Engine, FMXTee.Gauges.Numeric,
  FMXTee.Gauges.Linear, FMXTee.Gauges.Circular, FMXTee.Procs, FMXTee.Chart;

type
  TCircularGaugeForm = class(TBaseForm)
    Chart1: TChart;
    Series1: TCircularGauge;
    TrackBar1: TTrackBar;
    LabelValue: TLabel;
    Label1: TLabel;
    Label2: TLabel;
    TrackBar2: TTrackBar;
    TrackBar3: TTrackBar;
    procedure FormCreate(Sender: TObject);
    procedure TrackBar1Change(Sender: TObject);
    procedure TrackBar2Change(Sender: TObject);
    procedure TrackBar3Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TCircularGaugeForm.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.Value:=Random(100);

  TrackBar1.Value:=Round(Series1.Value);
  LabelValue.Text:=TrackBar1.Value.ToString();
end;

procedure TCircularGaugeForm.TrackBar1Change(Sender: TObject);
begin
  inherited;
  LabelValue.Text:=TrackBar1.Value.ToString();
  Series1.Value:=TrackBar1.Value;
end;

procedure TCircularGaugeForm.TrackBar2Change(Sender: TObject);
begin
  inherited;
  Series1.RotationAngle:=TrackBar2.Value
end;

procedure TCircularGaugeForm.TrackBar3Change(Sender: TObject);
begin
  inherited;
  Series1.TotalAngle:=TrackBar3.Value
end;

initialization
  RegisterClass(TCircularGaugeForm);
end.
