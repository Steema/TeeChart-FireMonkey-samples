
//---------------------------------------------------------------------------

// This software is Copyright (c) 2014 Embarcadero Technologies, Inc. 
// You may only use this software if you are an authorized licensee
// of an Embarcadero developer tools product.
// This software is considered a Redistributable as defined under
// the software license agreement that comes with the Embarcadero Products
// and is subject to that software license agreement.

//---------------------------------------------------------------------------

program MultiViewDemo;



uses
  System.StartUpCopy,
  FMX.Forms,
  MainFrm in 'MainFrm.pas' {MainForm},
  FMX.MultiView.CustomPresentation in 'FMX.MultiView.CustomPresentation.pas',
  LineChart in 'Lines\LineChart.pas' {LineChartForm},
  BarChart in 'Bars\BarChart.pas' {BarChartForm},
  AreaChart in 'Areas\AreaChart.pas' {AreaChartForm},
  PieChart in 'Pies\PieChart.pas' {PieChartForm},
  DonutChart in 'Donuts\DonutChart.pas' {DonutChartForm},
  StartForm in 'Miscellaneous\StartForm.pas' {StartChartForm},
  WebAnalyticsChart in 'Lines\WebAnalyticsChart.pas' {WebAnalyticsForm},
  StackedBars in 'Bars\StackedBars.pas' {StackedBarsForm},
  ServerStatus in 'Bars\ServerStatus.pas' {ServerStatusForm},
  MultiPies in 'Pies\MultiPies.pas' {MultiPiesForm},
  MultiDonut in 'Donuts\MultiDonut.pas' {MultiDonutForm},
  ProductShipment in 'Points\ProductShipment.pas' {ProductShipmentForm},
  ProjectPlanner in 'Gantts\ProjectPlanner.pas' {ProjectPlannerForm},
  CodingLangs in 'Bubbles\CodingLangs.pas' {CodingLangsForm},
  ScrollerChart in 'Miscellaneous\ScrollerChart.pas' {ScrollerChartForm};

{$R *.res}

begin
  Application.Initialize;
  Application.CreateForm(TMainForm, MainForm);
  Application.Run;
end.
