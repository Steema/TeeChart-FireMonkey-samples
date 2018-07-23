unit DemoAnimSeries;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMX.StdCtrls, Base, FMXTee.Engine, FMXTee.Series, FMXTee.Procs,
  FMXTee.Chart, FMXTee.Animations.Tools;

type
  TAnimationSeriesValues = class(TBaseForm)
    Chart1: TChart;
    Series1: TBarSeries;
    Play: TButton;
    CheckBox1: TCheckBox;
    procedure FormCreate(Sender: TObject);
    procedure PlayClick(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
    Anim : TSeriesAnimationTool;
  end;

implementation

{$R *.fmx}

procedure TAnimationSeriesValues.CheckBox1Change(Sender: TObject);
begin
  if CheckBox1.IsChecked then
     Anim.DrawEvery:=0
  else
     Anim.DrawEvery:=1;
end;

procedure TAnimationSeriesValues.FormCreate(Sender: TObject);
begin
  inherited;

  // Cosmetics, better to disable Marks:
  Series1.Marks.Hide;

  Anim:=TSeriesAnimationTool.Create(Self);

  Chart1.Animations.Add(Anim);

  Anim.Series:=Series1;
  Anim.StartAtMin:=False;
  Anim.DrawEvery:=1;
end;

procedure TAnimationSeriesValues.PlayClick(Sender: TObject);
begin
  Anim.Play;
end;

initialization
  RegisterClass(TAnimationSeriesValues);
end.
