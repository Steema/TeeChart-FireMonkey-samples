program LinkingCharts;

uses
  System.StartUpCopy,
  FMX.Forms,
  Home in 'Home.pas' {DashForm},
  DataModule in 'DataModule.pas' {DataModule1: TDataModule},
  FileLauncher in 'FileLauncher.pas';

{$R *.res}

begin
  Application.Initialize;
  Application.CreateForm(TDashForm, DashForm);
  Application.CreateForm(TDataModule1, DataModule1);
  Application.Run;
end.
