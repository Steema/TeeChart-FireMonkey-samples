unit DatasetField;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, Data.DB, Datasnap.DBClient, FMXTee.Procs, FMXTee.Chart,
  FMXTee.DBChart, FMXTee.Editor.DBChart;

type
  TDatasetDemo = class(TBaseForm)
    ClientDataSet1: TClientDataSet;
    Label1: TLabel;
    DBChart1: TDBChart;
    Series1: TBarSeries;
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

initialization
  RegisterClass(TDatasetDemo);
end.
