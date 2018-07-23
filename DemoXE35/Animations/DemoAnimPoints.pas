unit DemoAnimPoints;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMX.StdCtrls, Base, FMXTee.Engine, FMXTee.Series, FMXTee.Procs,
  FMXTee.Chart, FMXTee.Animate, FMXTee.Animations.Tools;

type
  TAnimationPoints = class(TBaseForm)
    Chart1: TChart;
    Play: TButton;
    Series1: TPointSeries;
    procedure FormCreate(Sender: TObject);
    procedure PlayClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
    Anim : TTeeAnimationTool;
  end;

implementation

{$R *.fmx}

procedure TAnimationPoints.FormCreate(Sender: TObject);
var RandomAnim : TRandomPointsAnimation;
begin
  inherited;

  Anim:=TTeeAnimationTool.Create(Self);
  Chart1.Animations.Add(Anim);

  RandomAnim:=TRandomPointsAnimation.Create(Self);
  RandomAnim.Series:=Series1;

  Anim.Animations.Add(RandomAnim);
end;

procedure TAnimationPoints.PlayClick(Sender: TObject);
begin
  Anim.Play;
end;

initialization
  RegisterClass(TAnimationPoints);
end.
