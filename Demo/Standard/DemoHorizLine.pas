unit DemoHorizLine;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Procs, FMXTee.Chart;

type
  THorizLineDemo = class(TBaseForm)
    Chart1: TChart;
    Series1: THorizLineSeries;
    Series2: THorizLineSeries;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure THorizLineDemo.FormCreate(Sender: TObject);
begin
  inherited;
  Chart1.SeriesList.FillSampleValues();
end;

initialization
  RegisterClass(THorizLineDemo);
end.
