program TeeChart_Standard_Firemonkey_Demo;

uses
  FMX.Types,
  FMX.Forms,
  Base in 'Base.pas' {BaseForm},
  Demo_Chart3D in 'Demo_Chart3D.pas' {DemoChart3D},
  DemoPrint in 'DemoPrint.pas' {PrintDemo},
  UnitMain in 'UnitMain.pas' {MainForm},
  WelcomeDemo in 'WelcomeDemo.pas' {WelcomeForm},
  ChartAsDataset in 'Database\ChartAsDataset.pas' {ChartDataSetDemo},
  DatasetField in 'Database\DatasetField.pas' {DatasetDemo},
  DemoCrossTab in 'Database\DemoCrossTab.pas' {CrossTabDemo},
  DemoDB in 'Database\DemoDB.pas' {DemoDBChart},
  DemoFunctions in 'Functions\DemoFunctions.pas' {FunctionsDemo},
  DemoArea in 'Standard\DemoArea.pas' {DemoAreaSeries},
  DemoArrow in 'Standard\DemoArrow.pas' {ArrowSeriesDemo},
  DemoBar in 'Standard\DemoBar.pas' {DemoBarSeries},
  DemoBubble in 'Standard\DemoBubble.pas' {BubbleSeriesDemo},
  DemoFastLine in 'Standard\DemoFastLine.pas' {FastLineDemoSeries},
  DemoGantt in 'Standard\DemoGantt.pas' {GanttSeriesDemo},
  DemoHorizArea in 'Standard\DemoHorizArea.pas' {HorizAreaDemo},
  DemoHorizBar in 'Standard\DemoHorizBar.pas' {HorizBarDemo},
  DemoHorizLine in 'Standard\DemoHorizLine.pas' {HorizLineDemo},
  DemoLine in 'Standard\DemoLine.pas' {DemoLine},
  DemoPie in 'Standard\DemoPie.pas' {DemoPieSeries},
  DemoPoint in 'Standard\DemoPoint.pas' {DemoPointSeries},
  StandardGallery in 'Standard\StandardGallery.pas' {StandardDemo},
  Extras in 'Extras.pas' {FmxExtras};

{$R *.res}

begin
  AniFrameRate:=100;

  Application.Initialize;
  Application.CreateForm(TMainForm, MainForm);
  Application.Run;
end.
