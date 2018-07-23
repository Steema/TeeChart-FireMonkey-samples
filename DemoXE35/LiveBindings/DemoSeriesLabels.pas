unit DemoSeriesLabels;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, Data.Bind.EngExt,
  Fmx.Bind.DBEngExt, System.Rtti, System.Bindings.Outputs, Data.Bind.Components,
  Data.Bind.DBScope, Data.DB, FMXTee.Engine, FMXTee.Series, FMXTee.Procs,
  FMXTee.Chart;

type
  TSeriesLabelsBinding = class(TBaseForm)
    Chart1: TChart;
    Series1: TBarSeries;
    DataSource1: TDataSource;
    BindScopeDB1: TBindScopeDB;
    BindingsList1: TBindingsList;
    BindList1: TBindList;
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses SampleData;

initialization
  RegisterClass(TSeriesLabelsBinding);
end.
