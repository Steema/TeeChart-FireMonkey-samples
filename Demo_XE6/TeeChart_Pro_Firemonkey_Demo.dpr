program TeeChart_Pro_Firemonkey_Demo;
{$I TeeDefs.inc}

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
  Extras in 'Extras.pas' {FmxExtras},
  UnitMainPro in 'UnitMainPro.pas' {MainFormPro},
  DemoCandle in 'Pro\Financial\DemoCandle.pas' {DemoCandleSeries},
  DemoWorld in 'Pro\Maps\DemoWorld.pas' {DemoWorldSeries},
  DemoSurface in 'Pro\3D XYZ\DemoSurface.pas' {DemoSurfaceSeries},
  DemoSurface3D in 'Pro\3D XYZ\DemoSurface3D.pas' {DemoSurface3DSeries},
  DemoTower in 'Pro\3D XYZ\DemoTower.pas' {DemoTowerSeries},
  DemoOrganizational in 'Pro\Other\DemoOrganizational.pas' {DemoOrgSeries},
  DemoPolar in 'Pro\Circular\DemoPolar.pas' {DemoPolarSeries},
  DemoContour in 'Pro\3D XYZ\DemoContour.pas' {DemoContourSeries},
  DemoDonut in 'Pro\Other\DemoDonut.pas' {DemoDonutSeries},
  DemoLiveBindings in 'LiveBindings\DemoLiveBindings.pas' {ChartLiveBindings},
  SampleData in 'Database\SampleData.pas' {DataModule1: TDataModule},
  DemoSeriesBindings in 'LiveBindings\DemoSeriesBindings.pas' {SeriesBindings},
  DemoSeriesLabels in 'LiveBindings\DemoSeriesLabels.pas' {SeriesLabelsBinding},
  DemoToolsGallery in 'Tools\DemoToolsGallery.pas' {DemoTools},
  DemoFunctionsGallery in 'Functions\DemoFunctionsGallery.pas' {FunctionsGalleryDemos},
  DemoExport in 'Export\DemoExport.pas' {ExportDemo},
  DemoClustering in 'Tools\DemoClustering.pas' {ClusteringDemo},
  DemoAnimPoints in 'Animations\DemoAnimPoints.pas' {AnimationPoints},
  DemoAnimSeries in 'Animations\DemoAnimSeries.pas' {AnimationSeriesValues},
  DemoAnimPie in 'Animations\DemoAnimPie.pas' {AnimationPieSeries},
  Unit_Languages in 'Unit_Languages.pas' {LanguagesForm},
  Circular in 'Pro\Gauges\Circular.pas' {CircularGaugeForm},
  DisplayAngle in 'Pro\Gauges\DisplayAngle.pas' {DisplayAngleForm},
  LCDGauges in 'Pro\Gauges\LCDGauges.pas' {LCDGauges},
  DemoAnimBars in 'Animations\DemoAnimBars.pas' {BarTransitions},
  DemoAnimLines in 'Animations\DemoAnimLines.pas' {ProgressiveLines};

{$R *.res}

begin
  //GlobalUseDX10Software:=True;
  //GlobalUseDX10:=True;
//  GlobalUseDirect2D:=False;

  //GlobalUseGPUCanvas:=True;

  {$IFNDEF D21}
  AniFrameRate:=100;
  {$ENDIF}

  {$IFOPT D+}
  ReportMemoryLeaksOnShutdown:=True;

  {$IFDEF D17}
  {$ELSE}
  {$IFDEF MACOS}
  GlobalDisableFocusEffect:=True;
  GlobalUseDirect2D:=True;
  GlobalUseDirect2DSoftware:=True;
  GlobalUseHWEffects:=False;
  {$ENDIF}
  {$ENDIF}

  {$ENDIF}

  Application.Initialize;
  Application.CreateForm(TMainFormPro, MainFormPro);
  Application.CreateForm(TDataModule1, DataModule1);
  Application.Run;
end.
