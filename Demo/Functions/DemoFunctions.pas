unit DemoFunctions;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Chart.Functions, FMXTee.Series, FMXTee.Procs, FMXTee.Chart;

type
  TFunctionsDemo = class(TBaseForm)
    Chart1: TChart;
    Series1: TLineSeries;
    Series2: TLineSeries;
    TeeFunction1: TAverageTeeFunction;
    Button1: TButton;
    procedure FormCreate(Sender: TObject);
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TFunctionsDemo.Button1Click(Sender: TObject);
begin
  Series1.FillSampleValues();
end;

procedure TFunctionsDemo.FormCreate(Sender: TObject);
begin
  inherited;
  Button1Click(Self);
end;

initialization
  RegisterClass(TFunctionsDemo);
end.
