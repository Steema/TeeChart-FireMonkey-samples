unit DemoPolar;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Series.Polar, FMXTee.Procs, FMXTee.Chart, FMX.StdCtrls;

type
  TDemoPolarSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TPolarSeries;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoPolarSeries.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues;

  Series1.CircleGradient.Visible:=False;
end;

initialization
  RegisterClass(TDemoPolarSeries);
end.
