unit DemoPie;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMXTee.Engine, FMXTee.Series,
  FMXTee.Procs, FMXTee.Chart, Base, FMX.StdCtrls;

type
  TDemoPieSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TPieSeries;
    TrackBar1: TTrackBar;
    Label1: TLabel;
    Label2: TLabel;
    TrackBar2: TTrackBar;
    CheckBox1: TCheckBox;
    procedure FormCreate(Sender: TObject);
    procedure TrackBar1Change(Sender: TObject);
    procedure TrackBar2Change(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoPieSeries.CheckBox1Change(Sender: TObject);
begin
  Series1.Marks.Visible:=CheckBox1.IsChecked;
end;

procedure TDemoPieSeries.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues;
end;

procedure TDemoPieSeries.TrackBar1Change(Sender: TObject);
begin
  Series1.ExplodeBiggest:=Round(TrackBar1.Value);
end;

procedure TDemoPieSeries.TrackBar2Change(Sender: TObject);
begin
  Series1.RotationAngle:=Round(TrackBar2.Value);
end;

initialization
  RegisterClass(TDemoPieSeries);
end.
