unit LCDGauges;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Series.Polar, FMXTee.Procs, FMXTee.Chart, FMX.StdCtrls,
  FMXTee.Gauges.Linear, FMXTee.Gauges.Numeric;

type
  TLCDGauges = class(TBaseForm)
    Chart1: TChart;
    Series1: TNumericGauge;
    Series2: TNumericGauge;
    Series3: TLinearGauge;
    Series4: TLinearGauge;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TLCDGauges.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues;
  Series2.FillSampleValues;
  Series3.FillSampleValues;
  Series4.FillSampleValues;
end;

initialization
  RegisterClass(TLCDGauges);
end.
