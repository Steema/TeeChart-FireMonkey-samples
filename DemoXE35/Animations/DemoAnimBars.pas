unit DemoAnimBars;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMX.StdCtrls, Base, FMXTee.Engine, FMXTee.Series, FMXTee.Procs, FMXTee.Chart,
  FMXTee.Animations.Tools, FMXTee.Animate;

type
  TBarTransitions = class(TBaseForm)
    Chart1: TChart;
    Button1: TButton;
    ChartAnimation1: TTeeAnimationTool;
    Series3: TBarSeries;
    Series2: TBarSeries;
    Series1: TBarSeries;
    ChartAnimation2: TTeeAnimationTool;
    Button2: TButton;
    CheckBox1: TCheckBox;
    procedure FormCreate(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TBarTransitions.Button1Click(Sender: TObject);
var tmp : TSeriesTransitionAnimation;
begin
  tmp:=(ChartAnimation1.Animations[0] as TSeriesTransitionAnimation);

  tmp.Before;

  if Series1.MultiBar=mbSelfStack then
     Series1.MultiBar:=mbNone
  else
     Series1.MultiBar:=TMultiBar(Ord(Series1.MultiBar)+1);

  tmp.After;
end;

procedure TBarTransitions.Button2Click(Sender: TObject);
begin
  // Transforms for 2D mode only
  Chart1.View3D:=False;
  CheckBox1.IsChecked:=False;

  ChartAnimation2.Play;
end;

procedure TBarTransitions.CheckBox1Change(Sender: TObject);
begin
  Chart1.View3D:=CheckBox1.IsChecked;
end;

procedure TBarTransitions.FormCreate(Sender: TObject);
begin
  inherited;

  ChartAnimation1.Animations[0].Duration:=500; // milliseconds

  Chart1.SeriesList.FillSampleValues;
end;

initialization
  RegisterClass(TBarTransitions);
end.
