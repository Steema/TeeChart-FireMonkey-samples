unit DemoHorizArea;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Procs, FMXTee.Chart;

type
  THorizAreaDemo = class(TBaseForm)
    Chart1: TChart;
    Series1: THorizAreaSeries;
    Series2: THorizAreaSeries;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure THorizAreaDemo.FormCreate(Sender: TObject);
begin
  inherited;
  Chart1.SeriesList.FillSampleValues;
end;

initialization
  RegisterClass(THorizAreaDemo);
end.
