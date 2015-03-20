unit MainFrm;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMX.MultiView, FMX.Objects, FMX.TabControl,
  FMX.StdCtrls, FMX.Layouts, FMX.ListView.Types, FMX.ListView, FMX.ExtCtrls, FMX.Ani, FMX.Gestures, FMX.ListBox,
  FMX.DateTimeCtrls, FMX.Edit, FMX.MultiView.Types, FMX.Colors, FMX.MultiView.CustomPresentation,
  FMX.EditBox, FMX.NumberBox, FMX.Controls.Presentation;

type
  TMainForm = class(TForm)
    MultiView1: TMultiView;
    ToolBar1: TToolBar;
    MasterButton: TSpeedButton;
    ToolBar2: TToolBar;
    Label1: TLabel;
    Label2: TLabel;
    ListBoxLines: TListBox;
    ListBoxItem1: TListBoxItem;
    ListBoxItem2: TListBoxItem;
    DetailPanel: TPanel;
    ButtonLines: TButton;
    ButtonBars: TButton;
    ListBoxBars: TListBox;
    ListBoxItem3: TListBoxItem;
    ListBoxItem4: TListBoxItem;
    ListBoxItem5: TListBoxItem;
    ButtonAreas: TButton;
    ListBoxAreas: TListBox;
    ListBoxItem6: TListBoxItem;
    ButtonPies: TButton;
    ListBoxPies: TListBox;
    ListBoxItem11: TListBoxItem;
    ListBoxItem12: TListBoxItem;
    ListBoxItem13: TListBoxItem;
    ListBoxItem14: TListBoxItem;
    ButtonPoints: TButton;
    ListBoxPoints: TListBox;
    ListBoxItem7: TListBoxItem;
    ButtonGantt: TButton;
    ListBoxGantt: TListBox;
    ListBoxItem8: TListBoxItem;
    ButtonBubbles: TButton;
    ListBoxBubbles: TListBox;
    ListBoxItem9: TListBoxItem;
    ButtonMiscellaneous: TButton;
    ListBoxMiscellaneous: TListBox;
    ListBoxItem10: TListBoxItem;
    Image1: TImage;
    procedure ListBoxLinesItemClick(const Sender: TCustomListBox; const Item: TListBoxItem);
    procedure FormCreate(Sender: TObject);
    procedure ListBoxItem1Click(Sender: TObject);
    procedure EmbeddForm(AParent:TControl; AForm:TCustomForm);
    procedure ButtonLinesClick(Sender: TObject);
    procedure Label1Click(Sender: TObject);
  public
    { Public declarations }
  end;

var
  MainForm: TMainForm;

implementation

uses
  FMX.MultiView.Presentations, ScrollerChart, LineChart, StartForm, BarChart,
  AreaChart, PieChart, WebAnalyticsChart, StackedBars, ServerStatus, MultiPies,
  DonutChart, MultiDonut, ProductShipment, ProjectPlanner, CodingLangs;

{$R *.fmx}
{$R *.iPad.fmx IOS}
{$R *.XLgXhdpiTb.fmx ANDROID}

procedure TMainForm.FormCreate(Sender: TObject);
begin
  Label1Click(nil);

  ListBoxLines.Height:= (50 * 2) +2;
  ListBoxBars.Height:= 0;
  ListBoxAreas.Height:= 0;
  ListBoxPies.Height:= 0;
  ListBoxPoints.Height:= 0;
  ListBoxGantt.Height:= 0;
  ListBoxBubbles.Height:= 0;
  ListBoxMiscellaneous.Height:= 0;

  MultiView1.CustomPresentationClass := TMultiViewAlertPresentation;
end;

procedure TMainForm.ListBoxLinesItemClick(const Sender: TCustomListBox; const Item: TListBoxItem);
begin
  Item.IsSelected := False;
  MultiView1.HideMaster;
end;


// AParent can be any control, such as a panel or a tabsheet item of a TabControl.
procedure TMainForm.ButtonLinesClick(Sender: TObject);
begin
  case ((Sender as TButton).Tag) of
        0:  // Lines
            if (ListBoxLines.Height = 0) then
              ListBoxLines.Height:= (50 * 2) +2
            else
              ListBoxLines.Height:=0;
        1 : // Bars
            if (ListBoxBars.Height = 0) then
              ListBoxBars.Height:= (50 * 3) +2
            else
              ListBoxBars.Height:=0;
        2 : // Areas
            if (ListBoxAreas.Height = 0) then
              ListBoxAreas.Height:= 50 +2
            else
              ListBoxAreas.Height:=0;
        3 : // Pies and Donuts
            if (ListBoxPies.Height = 0) then
              ListBoxPies.Height:= (50 * 4) +2
            else
              ListBoxPies.Height:=0;
        4 : // Points
            if (ListBoxPoints.Height = 0) then
              ListBoxPoints.Height:= (50 * 1) +2
            else
              ListBoxPoints.Height:=0;
        5 : // Gantt
            if (ListBoxGantt.Height = 0) then
              ListBoxGantt.Height:= (50 * 1) +2
            else
              ListBoxGantt.Height:=0;
        6 : // Bubbles
            if (ListBoxBubbles.Height = 0) then
              ListBoxBubbles.Height:= (50 * 1) +2
            else
              ListBoxBubbles.Height:=0;
        7 : // Miscellaneous
            if (ListBoxMiscellaneous.Height = 0) then
              ListBoxMiscellaneous.Height:= (50 * 1) +2
            else
              ListBoxMiscellaneous.Height:=0;
  end;
end;

procedure TMainForm.EmbeddForm(AParent:TControl; AForm:TCustomForm);
begin
  while AForm.ChildrenCount>0 do
    AForm.Children[0].Parent:=AParent;
end;

procedure TMainForm.Label1Click(Sender: TObject);
var startChart : TStartChartForm;
begin
  startChart := TStartChartForm.Create(nil);
  EmbeddForm(DetailPanel, startChart);
end;

procedure TMainForm.ListBoxItem1Click(Sender: TObject);
var
  lineChartDemo : TLineChartForm;
  webAnalyticsChart : TWebAnalyticsForm;
  barChartDemo :  TBarChartForm;
  stackedBarsDemo : TStackedBarsForm;
  serverStatusDemo : TServerStatusForm;
  areaChartDemo :  TAreaChartForm;
  pieChartDemo :  TPieChartForm;
  multiplepieChartDemo : TMultiPiesForm;
  donutChartDemo : TDonutChartForm;
  multiDonutChartDemo : TMultiDonutForm;
  productShipmentDemo : TProductShipmentForm;
  projectplannerDemo : TProjectPlannerForm;
  codinglangsDemo : TCodingLangsForm;
  scrollerChartDemo : TScrollerChartForm;
begin
  case ((Sender as TListBoxItem).Tag) of
    0 : // Stock monitoring
    begin
        lineChartDemo := TLineChartForm.Create(nil);
        EmbeddForm(DetailPanel, lineChartDemo);
    end;
    1 : // Web Analytics
    begin
        webAnalyticsChart := TWebAnalyticsForm.Create(nil);
        EmbeddForm(DetailPanel, webAnalyticsChart);
    end;
    2 : // Sales Figures
    begin
        barChartDemo := TBarChartForm.Create(nil);
        EmbeddForm(DetailPanel, barChartDemo);
    end;
    3 : // Stacked Bars
    begin
        stackedBarsDemo := TStackedBarsForm.Create(nil);
        EmbeddForm(DetailPanel, stackedBarsDemo);
    end;
    4 : // Server Status Bars
    begin
        serverStatusDemo := TServerStatusForm.Create(nil);
        EmbeddForm(DetailPanel, serverStatusDemo);
    end;
    5 : // Vegetation Growth - Area
    begin
        areaChartDemo := TAreaChartForm.Create(nil);
        EmbeddForm(DetailPanel, areaChartDemo);
    end;
    6 : // Pie Chart
    begin
        pieChartDemo := TPieChartForm.Create(nil);
        EmbeddForm(DetailPanel, pieChartDemo);
    end;
    7 : // Multiple Pies
    begin
        multiplepieChartDemo := TMultiPiesForm.Create(nil);
        EmbeddForm(DetailPanel, multiplepieChartDemo);
    end;
    8 : // Donut
    begin
        donutChartDemo := TDonutChartForm.Create(nil);
        EmbeddForm(DetailPanel, donutChartDemo);
    end;
    9 : // Multi Donut
    begin
        multiDonutChartDemo := TMultiDonutForm.Create(nil);
        EmbeddForm(DetailPanel, multiDonutChartDemo);
    end;
    10 : // Points
    begin
        productShipmentDemo := TProductShipmentForm.Create(nil);
        EmbeddForm(DetailPanel, productShipmentDemo);
    end;
    11 : // Project planner - gantt
    begin
        projectplannerDemo := TProjectPlannerForm.Create(nil);
        EmbeddForm(DetailPanel, projectplannerDemo);
    end;
    12 : // Popular coding langs - bubbles
    begin
        codinglangsDemo := TCodingLangsForm.Create(nil);
        EmbeddForm(DetailPanel, codinglangsDemo);
    end;
    13 : // Scroller Chart - miscellaneous
    begin
        scrollerChartDemo := TScrollerChartForm.Create(nil);
        EmbeddForm(DetailPanel, scrollerChartDemo);
    end;
  end;
end;

end.
