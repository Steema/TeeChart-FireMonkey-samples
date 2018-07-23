unit DemoGantt;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Series.Gantt, FMXTee.Procs, FMXTee.Chart;

type
  TGanttSeriesDemo = class(TBaseForm)
    Chart1: TChart;
    Series1: TGanttSeries;
    Button1: TButton;
    Label1: TLabel;
    procedure FormCreate(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Chart1MouseMove(Sender: TObject; Shift: TShiftState; X,
      Y: Single);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Editor.Stroke;

procedure TGanttSeriesDemo.Button1Click(Sender: TObject);
begin
  TStrokeEditor.Edit(Self, Series1.ConnectingPen)
end;

procedure TGanttSeriesDemo.Chart1MouseMove(Sender: TObject; Shift: TShiftState;
  X, Y: Single);
var tmp : Integer;
begin
  tmp:=Series1.Clicked(Round(x),Round(y));

  if tmp=-1 then
     Label1.Text:=''
  else
     Label1.Text:=Series1.XLabel[tmp];
end;

procedure TGanttSeriesDemo.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues(6);
end;

initialization
  RegisterClass(TGanttSeriesDemo);
end.
