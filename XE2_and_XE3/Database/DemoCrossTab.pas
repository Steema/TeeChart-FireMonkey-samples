unit DemoCrossTab;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.DBChart, FMXTee.Chart.Crosstab, Data.DB, Datasnap.DBClient,
  FMXTee.Series, FMXTee.Procs, FMXTee.Chart, FMXTee.Editor.CrossTab;

type
  TCrossTabDemo = class(TBaseForm)
    ClientDataSet1: TClientDataSet;
    Label1: TLabel;
    DBChart1: TDBChart;
    Series1: TBarSeries;
    DBCrossTabSource1: TDBCrossTabSource;
    Series2: TBarSeries;
    Series3: TBarSeries;
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

initialization
  RegisterClass(TCrossTabDemo);
end.
