unit DemoArrow;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Series.Arrow, FMXTee.Procs, FMXTee.Chart;

type
  TArrowSeriesDemo = class(TBaseForm)
    Chart1: TChart;
    Series1: TArrowSeries;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TArrowSeriesDemo.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues(6);
end;

initialization
  RegisterClass(TArrowSeriesDemo);
end.
