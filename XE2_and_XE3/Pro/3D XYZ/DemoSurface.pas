unit DemoSurface;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series.Surface, FMXTee.Procs, FMXTee.Chart, FMXTee.Commander;

type
  TDemoSurfaceSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TSurfaceSeries;
    TeeCommander1: TTeeCommander;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoSurfaceSeries.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues;
end;

initialization
  RegisterClass(TDemoSurfaceSeries);
end.
