unit BarChart;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Chart,
  FMXTee.URL, FMXTee.Engine, FMXTee.Procs, FMXTee.Animations.Tools,
  FMXTee.Series;

type
  TBarChartForm = class(TForm)
    Chart1: TChart;
    ImportChart1: TImportChart;
    procedure Chart1AfterDraw(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
   Anim : TSeriesAnimationTool;
   Drawn : Boolean;
  end;

var
  BarChartForm: TBarChartForm;

implementation

{$R *.fmx}

procedure TBarChartForm.Chart1AfterDraw(Sender: TObject);
begin
  if not Drawn then
  begin
    Anim:=TSeriesAnimationTool.Create(Self);

    Chart1.Animations.Add(Anim);

    Anim.DrawEvery:=1;
    Anim.StartAtMin:=False;
    Anim.Play;
    Drawn:=true;
  end;
end;

end.
