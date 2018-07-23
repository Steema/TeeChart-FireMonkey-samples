unit DemoDB;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Data.DB, Datasnap.DBClient,
  FMXTee.Engine, FMXTee.Series, FMXTee.Procs, FMXTee.Chart, FMXTee.DBChart,
  FMXTee.Editor.Chart, FMXTee.Editor.DBSummary, Base, FMX.StdCtrls;

type
  TDemoDBChart = class(TBaseForm)
    ClientDataSet1: TClientDataSet;
    Label1: TLabel;
    DBChart1: TDBChart;
    Series1: TPieSeries;
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

initialization
  RegisterClass(TDemoDBChart);
end.
