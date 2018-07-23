unit DemoDonut;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  {$IFDEF D18}
  FMX.StdCtrls,
  {$ENDIF}
  Base, FMX.Objects,
  FMXTee.Engine, FMXTee.Series, FMXTee.Series.Donut, FMXTee.Procs, FMXTee.Chart;

type
  TDemoDonutSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TDonutSeries;
    Text1: TText;
    TrackBar1: TTrackBar;
    procedure TrackBar1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoDonutSeries.TrackBar1Change(Sender: TObject);
begin
  Series1.DonutPercent:=Round(TrackBar1.Value);
end;

initialization
  RegisterClass(TDemoDonutSeries);
end.
