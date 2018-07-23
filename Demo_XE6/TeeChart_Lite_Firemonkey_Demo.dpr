program TeeChart_Lite_Firemonkey_Demo;

uses
  FMX.Forms,
  FMX.Types,
  UnitMain in 'UnitMain.pas' {MainForm},
  Base in 'Base.pas' {BaseForm},
  Demo_Chart3D in 'Demo_Chart3D.pas' {DemoChart3D},
  WelcomeDemo in 'WelcomeDemo.pas' {WelcomeForm},
  DemoArea in 'Standard\DemoArea.pas' {DemoAreaSeries},
  DemoBar in 'Standard\DemoBar.pas' {DemoBarSeries},
  DemoHorizBar in 'Standard\DemoHorizBar.pas' {HorizBarDemo},
  DemoLine in 'Standard\DemoLine.pas' {DemoLine},
  DemoPie in 'Standard\DemoPie.pas' {DemoPieSeries},
  DemoPoint in 'Standard\DemoPoint.pas' {DemoPointSeries},
  StandardGallery in 'Standard\StandardGallery.pas' {StandardDemo},
  Extras in 'Extras.pas' {FmxExtras};

{$R *.res}

begin
//  GlobalDisableFocusEffect:=True;
//  GlobalUseDirect2D:=False;
//  GlobalUseDirect2DSoftware:=True;
//  GlobalUseHWEffects:=False;
//  AniFrameRate:=60;

  {$IFOPT D+}
  ReportMemoryLeaksOnShutdown:=True;
  {$ENDIF}

  Application.Initialize;
  Application.CreateForm(TMainForm, MainForm);
  Application.Run;
end.
