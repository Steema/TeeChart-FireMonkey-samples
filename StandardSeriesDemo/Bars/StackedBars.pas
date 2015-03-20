unit StackedBars;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Chart,
  FMXTee.URL, FMXTee.Engine, FMXTee.Procs, FMXTee.Animations.Tools,
  FMXTee.Series;

type
  TStackedBarsForm = class(TForm)
    Chart1: TChart;
    ImportChart1: TImportChart;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
   Anim : TSeriesAnimationTool;
  end;

var
  StackedBarsForm: TStackedBarsForm;

implementation

{$R *.fmx}

procedure TStackedBarsForm.FormCreate(Sender: TObject);
begin
  Anim:=TSeriesAnimationTool.Create(Self);

  Chart1.Animations.Add(Anim);

  Anim.StartAtMin:=False;
  Anim.Play;
end;

end.
