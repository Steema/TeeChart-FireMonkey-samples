program TeeChart_Firemonkey_Demo;

uses
  cwstring, cthreads, FMX_Forms,
  FMX_Types,
  UnitMain in 'UnitMain.pas' {MainForm},
  Base in 'Base.pas' {BaseForm},
  Demo_Chart3D in 'Demo_Chart3D.pas' {DemoChart3D},
  WelcomeDemo in 'WelcomeDemo.pas' {WelcomeForm},
  DemoArea in 'Standard\DemoArea.pas' {DemoAreaSeries},
  DemoArrow in 'Standard\DemoArrow.pas' {ArrowSeriesDemo},
  DemoBar in 'Standard\DemoBar.pas' {DemoBarSeries},
  DemoFastLine in 'Standard\DemoFastLine.pas' {FastLineDemoSeries},
  DemoHorizArea in 'Standard\DemoHorizArea.pas' {HorizAreaDemo},
  DemoHorizBar in 'Standard\DemoHorizBar.pas' {HorizBarDemo},
  DemoHorizLine in 'Standard\DemoHorizLine.pas' {HorizLineDemo},
  DemoLine in 'Standard\DemoLine.pas' {DemoLine},
  DemoPie in 'Standard\DemoPie.pas' {DemoPieSeries},
  DemoPoint in 'Standard\DemoPoint.pas' {DemoPointSeries},
  DemoBubble in 'Standard\DemoBubble.pas' {BubbleSeriesDemo},
  DemoGantt in 'Standard\DemoGantt.pas' {GanttSeriesDemo},
  ChartAsDataset in 'Database\ChartAsDataset.pas' {ChartDataSetDemo},
  DemoCrossTab in 'Database\DemoCrossTab.pas' {CrossTabDemo},
  DemoDB in 'Database\DemoDB.pas' {DemoDBChart},
  DemoPrint in 'DemoPrint.pas' {PrintDemo},
  DemoFunctions in 'Functions\DemoFunctions.pas' {FunctionsDemo},
  DatasetField in 'Database\DatasetField.pas' {DatasetDemo},
  StandardGallery in 'Standard\StandardGallery.pas' {StandardDemo},
  FMXTee.Animations in 'FMXTee.Animations.pas';

{.$R *.res}

begin
//  GlobalDisableFocusEffect:=True;
//  GlobalUseDirect2D:=False;
//  GlobalUseDirect2DSoftware:=True;
//  GlobalUseHWEffects:=False;

  ReportMemoryLeaksOnShutdown:=True;

  Application.Initialize;
  Application.CreateForm(TMainForm, MainForm);
  Application.Run;
end.
