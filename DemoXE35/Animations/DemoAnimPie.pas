unit DemoAnimPie;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMX.StdCtrls, Base, FMXTee.Engine, FMXTee.Series, FMXTee.Procs,
  FMXTee.Chart, FMXTee.Animate, FMXTee.Animations.Tools;

type
  TAnimationPieSeries = class(TBaseForm)
    Chart1: TChart;
    Play: TButton;
    Series1: TPieSeries;
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

procedure TAnimationPieSeries.FormCreate(Sender: TObject);
var PieAnim : TNumberAnimation;
begin
  inherited;

  Anim:=TTeeAnimationTool.Create(Self);
  Chart1.Animations.Add(Anim);

  PieAnim:=TNumberAnimation.Create(Self);

  PieAnim.Instance:=Series1;
  PieAnim.PropertyName:='AngleSize';
  PieAnim.EndValue:=360;

  Anim.Animations.Add(PieAnim);
end;

procedure TAnimationPieSeries.PlayClick(Sender: TObject);
begin
  Anim.Play;
end;

initialization
  RegisterClass(TAnimationPieSeries);
end.
