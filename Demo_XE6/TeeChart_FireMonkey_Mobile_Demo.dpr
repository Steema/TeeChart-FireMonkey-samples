program TeeChart_FireMonkey_Mobile_Demo;

uses
  System.StartUpCopy,
  FMX.Forms,
  FMX.Types,
  UnitMain in 'UnitMain.pas' {MainForm},
  UnitMain_Mobile in 'UnitMain_Mobile.pas' {Form1},
  UnitMainPro in 'UnitMainPro.pas' {MainFormPro},
  Base in 'Base.pas' {BaseForm},
  WelcomeDemo in 'WelcomeDemo.pas' {WelcomeForm},
  Demo_Chart3D in 'Demo_Chart3D.pas' {DemoChart3D},
  DemoPrint in 'DemoPrint.pas' {PrintDemo},
  Extras in 'Extras.pas' {FmxExtras},
  DemoAnimPie in 'Animations\DemoAnimPie.pas' {AnimationPieSeries},
  DemoAnimPoints in 'Animations\DemoAnimPoints.pas' {AnimationPoints},
  DemoAnimSeries in 'Animations\DemoAnimSeries.pas' {AnimationSeriesValues},
  ChartAsDataset in 'Database\ChartAsDataset.pas' {ChartDataSetDemo},
  DatasetField in 'Database\DatasetField.pas' {DatasetDemo},
  DemoCrossTab in 'Database\DemoCrossTab.pas' {CrossTabDemo},
  DemoDB in 'Database\DemoDB.pas' {DemoDBChart},
  SampleData in 'Database\SampleData.pas' {DataModule1: TDataModule},
  DemoExport in 'Export\DemoExport.pas' {ExportDemo},
  DemoFunctions in 'Functions\DemoFunctions.pas' {FunctionsDemo},
  DemoFunctionsGallery in 'Functions\DemoFunctionsGallery.pas' {FunctionsGalleryDemos},
  DemoLiveBindings in 'LiveBindings\DemoLiveBindings.pas' {ChartLiveBindings},
  DemoSeriesBindings in 'LiveBindings\DemoSeriesBindings.pas' {SeriesBindings},
  DemoSeriesLabels in 'LiveBindings\DemoSeriesLabels.pas' {SeriesLabelsBinding},
  DemoContour in 'Pro\3D XYZ\DemoContour.pas' {DemoContourSeries},
  DemoSurface in 'Pro\3D XYZ\DemoSurface.pas' {DemoSurfaceSeries},
  DemoSurface3D in 'Pro\3D XYZ\DemoSurface3D.pas' {DemoSurface3DSeries},
  DemoTower in 'Pro\3D XYZ\DemoTower.pas' {DemoTowerSeries},
  DemoPolar in 'Pro\Circular\DemoPolar.pas' {DemoPolarSeries},
  DemoCandle in 'Pro\Financial\DemoCandle.pas' {DemoCandleSeries},
  DemoWorld in 'Pro\Maps\DemoWorld.pas' {DemoWorldSeries},
  DemoDonut in 'Pro\Other\DemoDonut.pas' {DemoDonutSeries},
  DemoOrganizational in 'Pro\Other\DemoOrganizational.pas' {DemoOrgSeries},
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
  DemoClustering in 'Tools\DemoClustering.pas' {ClusteringDemo},
  DemoToolsGallery in 'Tools\DemoToolsGallery.pas' {DemoTools};

{$R *.res}

begin
  //GlobalUseGPUCanvas:=True;
  Application.Initialize;
  Application.CreateForm(TMainFormPro, MainFormPro);
  Application.CreateForm(TDataModule1, DataModule1);
  Application.CreateForm(TMainForm, MainForm);
  Application.FormFactor.Orientations := [TFormOrientation.InvertedLandscape];
  Application.Run;
end.

