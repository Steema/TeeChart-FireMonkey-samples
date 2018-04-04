unit DemoPie;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMXTee.Engine, FMXTee.Series,
  FMXTee.Procs, FMXTee.Chart, Base;

type
  TDemoPieSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TPieSeries;
    TrackBar1: TTrackBar;
    Label1: TLabel;
    procedure FormCreate(Sender: TObject);
    procedure TrackBar1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoPieSeries.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues;
end;

procedure TDemoPieSeries.TrackBar1Change(Sender: TObject);
begin
  Series1.ExplodeBiggest:=Round(TrackBar1.Value);
end;

initialization
  RegisterClass(TDemoPieSeries);
end.
