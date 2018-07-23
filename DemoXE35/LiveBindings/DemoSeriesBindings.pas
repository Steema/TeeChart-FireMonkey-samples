unit DemoSeriesBindings;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, Data.Bind.EngExt,
  Fmx.Bind.DBEngExt, Data.DB, Data.Bind.Components, Data.Bind.DBScope,
  FMXTee.Engine, FMXTee.Series, FMXTee.Procs, FMXTee.Chart, System.Rtti,
  System.Bindings.Outputs;

type
  TSeriesBindings = class(TBaseForm)
    Chart1: TChart;
    Series1: THorizBarSeries;
    BindingsList1: TBindingsList;
    BindScopeDB1: TBindScopeDB;
    DataSource1: TDataSource;
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
  RegisterClass(TSeriesBindings);
end.
