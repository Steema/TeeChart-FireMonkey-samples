unit DemoAnimLines;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMX.StdCtrls, Base, FMXTee.Engine, FMXTee.Series, FMXTee.Procs, FMXTee.Chart,
  FMXTee.Animations.Tools, FMXTee.Animate;

type
  TProgressiveLines = class(TBaseForm)
    Chart1: TChart;
    Series1: TLineSeries;
    Series2: TLineSeries;
    Series3: TLineSeries;
    Button1: TButton;
    ChartAnimation1: TTeeAnimationTool;
    procedure FormCreate(Sender: TObject);
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TProgressiveLines.Button1Click(Sender: TObject);
begin
  ChartAnimation1.Play;
end;

procedure TProgressiveLines.FormCreate(Sender: TObject);
begin
  inherited;

  Chart1.SeriesList.FillSampleValues;
end;

initialization
  RegisterClass(TProgressiveLines);
end.
