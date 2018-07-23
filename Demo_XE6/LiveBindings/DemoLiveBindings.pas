unit DemoLiveBindings;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  {$IFNDEF UPTOXE3}
  FMX.StdCtrls,
  {$ENDIF}
  Base, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, Data.Bind.EngExt, Fmx.Bind.DBEngExt,
  Data.Bind.Components, Data.Bind.DBScope, Data.DB, Datasnap.DBClient,

  {$IFNDEF MACOS}
  {$IFNDEF CPUX64}
  {$IFNDEF ANDROID}
  MidasLib,
  {$ENDIF}
  {$ENDIF}
  {$ENDIF}

  Data.Bind.DBLinks, FMXTee.Bind.DBLinks, System.Rtti, System.Bindings.Outputs,
  Fmx.Bind.Editors;

type
  TChartLiveBindings = class(TBaseForm)
    Chart1: TChart;
    BindingsList1: TBindingsList;
    BindDBChartLinkChart11: TBindDBChartLink;
    DataSource1: TDataSource;
    BindScopeDB1: TBindScopeDB;
    CheckBox1: TCheckBox;
    procedure CheckBox1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses SampleData;

procedure TChartLiveBindings.CheckBox1Change(Sender: TObject);
begin
  DataModule1.ClientDataSet1.Active:=CheckBox1.IsChecked;
end;

initialization
  RegisterClass(TChartLiveBindings);
end.
