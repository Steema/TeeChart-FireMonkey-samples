unit DemoWorld;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series.Surface, FMXTee.Series.Map, FMXTee.Series.World, FMXTee.Procs,
  FMXTee.Chart, FMX.Objects;

type
  TDemoWorldSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TWorldSeries;
    Text1: TText;
    procedure FormCreate(Sender: TObject);
    procedure Chart1MouseMove(Sender: TObject; Shift: TShiftState; X,
      Y: Single);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoWorldSeries.Chart1MouseMove(Sender: TObject; Shift: TShiftState;
  X, Y: Single);
var tmp : Integer;
begin
  inherited;

  tmp:=Series1.Clicked(PointF(X,Y));

  if tmp=-1 then
     Text1.Text:=''
  else
     Text1.Text:=Series1.XLabel[tmp];
end;

procedure TDemoWorldSeries.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues;
end;

initialization
  RegisterClass(TDemoWorldSeries);
end.
