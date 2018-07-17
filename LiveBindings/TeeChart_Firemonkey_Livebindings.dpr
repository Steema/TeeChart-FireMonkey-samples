program TeeChart_Firemonkey_Livebindings;

uses
  FMX.Forms,
  MainForm in 'MainForm.pas' {TeeChartDBLinkDemo},
  FMXTee.Bind.DBLinks in 'FMXTee.Bind.DBLinks.pas',
  FMXTee.Bind.Editors in 'FMXTee.Bind.Editors.pas';

{$R *.res}

begin
//  ReportMemoryLeaksOnShutdown:=True;
  Application.Initialize;
  Application.CreateForm(TTeeChartDBLinkDemo, TeeChartDBLinkDemo);
  Application.Run;
end.
