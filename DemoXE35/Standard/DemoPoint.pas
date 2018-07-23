unit DemoPoint;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Procs, FMXTee.Chart, FMX.Ani, FMXTee.Animations,
  {$IFDEF D19}
  FMX.Graphics,
  {$ENDIF}
  FMX.StdCtrls;

type
  TDemoPointSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TPointSeries;
    Series2: TPointSeries;
    CheckBox1: TCheckBox;
    CheckBox2: TCheckBox;
    Button1: TButton;
    procedure FormCreate(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
    procedure Chart1AfterDraw(Sender: TObject);
    procedure Chart1MouseMove(Sender: TObject; Shift: TShiftState; X,
      Y: Single);
    procedure CheckBox2Change(Sender: TObject);
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
    ClickedPart : TChartClickedPart;
    IntegerAnimation1 : TIntegerAnimation;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Canvas;

// Sample code to highlight a series point under the mouse:
procedure TDemoPointSeries.Button1Click(Sender: TObject);
begin
  inherited;

  if not Assigned(IntegerAnimation1) then
  begin
    IntegerAnimation1:=TIntegerAnimation.Create(Self);
    IntegerAnimation1.PropertyName:='View3DOptions.Rotation';
    IntegerAnimation1.StopValue:=360;
    IntegerAnimation1.Duration:=5;
    IntegerAnimation1.Parent:=Chart1;
    IntegerAnimation1.Enabled:=True;
  end
  else
    IntegerAnimation1.Start;

end;

procedure TDemoPointSeries.Chart1AfterDraw(Sender: TObject);
var P : TSeriesPointer;
    x,y : Integer;
    tmp : TPointF;
begin
  inherited;

  if ClickedPart.Part=cpSeriesPointer then
  begin
    P:=(ClickedPart.ASeries as TPointSeries).Pointer;

    x:=ClickedPart.ASeries.CalcXPos(ClickedPart.PointIndex);
    y:=ClickedPart.ASeries.CalcYPos(ClickedPart.PointIndex);

    with Chart1.Canvas as TTeeCanvas3D do
    begin
      Brush.Style:=TBrushKind.{$IFDEF D20}None{$ELSE}bkNone{$ENDIF};
      Pen.Color:=TAlphaColors.Red;

      tmp:=Calculate3DPosition(x,y,ClickedPart.ASeries.StartZ);

      Rectangle(tmp.x-P.HorizSize-2, tmp.y-P.VertSize-2,
                tmp.x+P.HorizSize+2, tmp.y+P.VertSize+2);
    end;
  end;
end;

procedure TDemoPointSeries.Chart1MouseMove(Sender: TObject; Shift: TShiftState;
  X, Y: Single);
begin
  inherited;

  Chart1.CalcClickedPart(PointF(X,Y), ClickedPart);
  Chart1.Invalidate;
end;

procedure TDemoPointSeries.CheckBox1Change(Sender: TObject);
begin
  Chart1.View3D:=CheckBox1.IsChecked;
end;

procedure TDemoPointSeries.CheckBox2Change(Sender: TObject);
begin
  Series1.Marks.Visible:=CheckBox2.IsChecked;
  Series2.Marks.Visible:=Series1.Marks.Visible;
end;

procedure TDemoPointSeries.FormCreate(Sender: TObject);
begin
  inherited;

  ClickedPart.Part:=cpNone;

  Chart1.SeriesList.FillSampleValues(8);
end;

initialization
  RegisterClass(TDemoPointSeries);
end.
