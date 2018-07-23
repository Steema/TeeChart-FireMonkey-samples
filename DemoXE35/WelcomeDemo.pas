unit WelcomeDemo;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  {$IFDEF D20}
  System.Math.Vectors,
  {$ENDIF}
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMX.Types3D, FMXTee.Engine,
  FMXTee.Series, FMXTee.Procs, FMXTee.Chart, FMXTee.Chart3D, FMX.Ani,
  FMX.Controls3D, FMX.Forms3D;

type
  TWelcomeForm = class(TForm3D)
    Chart3DChart1: TChart;
    Chart3D1: TChart3D;
    Series1: TBarSeries;
    Series2: TBarSeries;
    Light1: TLight;
    Light2: TLight;
    Light3: TLight;
    FloatAnimation1: TFloatAnimation;
    FloatAnimation2: TFloatAnimation;
    procedure FormCreate(Sender: TObject);
    procedure Chart3D1CreateChart(Sender: TObject);
    procedure Chart3D1DblClick(Sender: TObject);
    procedure Form3DRender(Sender: TObject; Context: TContext3D);
    procedure Chart3D1MouseDown(Sender: TObject; Button: TMouseButton;
      Shift: TShiftState; X, Y: Single; RayPos, RayDir: TVector3D);
  private
    { Private declarations }
    Time : Single;
    Frames : Integer;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMX.Platform, FMXTee.Animations, FMXTee.Editor.Chart3D, FMXTee.Editor.Chart;

procedure TWelcomeForm.Chart3D1CreateChart(Sender: TObject);
var tmp : TControl3D;
    f   : TChildrenAnimation;
begin
  tmp:=Chart3D1.FindControl('Series_Series2');

  if Assigned(tmp) and (tmp.ChildrenCount>0) then
  begin
    f:=TChildrenAnimation.Create(Self);
    f.Loop:=True;
    f.StopValue:=360;
    f.Duration:=4;
    f.PropertyName:='RotationAngle.Y';
    f.Parent:=tmp;

    f.Overlap:=0.8;

    f.Start;
  end;
end;

procedure TWelcomeForm.Chart3D1DblClick(Sender: TObject);
begin
  TChart3DEditor.Edit(Self, Chart3D1);
end;

procedure TWelcomeForm.Chart3D1MouseDown(Sender: TObject; Button: TMouseButton;
  Shift: TShiftState; X, Y: Single; RayPos, RayDir: TVector3D);
begin
  if Button=TMouseButton.mbRight then
     TChartEditForm.Edit(Self,Chart3D1.Chart);
end;

procedure TWelcomeForm.Form3DRender(Sender: TObject; Context: TContext3D);
var t1 : Single;
begin
  Inc(Frames);

  t1:=TeeTickCount;

  if t1-Time > 1 then
  begin
    Caption:=IntToStr(Frames);
    Time:=TeeTickCount;
    Frames:=0;
  end;
end;

procedure TWelcomeForm.FormCreate(Sender: TObject);
var t : Integer;
begin
  FloatAnimation1.Interpolation:=TInterpolationType.{$IFDEF D20}Elastic{$ELSE}itElastic{$ENDIF};

  Series2.FillSampleValues;

  for t:=0 to Series2.Count-1 do
      Series1.Add(Series2.YValue[t]*(1+Random(60)*0.01));

  Series2.BarStyle:=bsRoundRectangle;
end;

initialization
  RegisterClass(TWelcomeForm);
end.
