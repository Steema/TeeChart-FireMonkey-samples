unit Home;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Control,
  FMXTee.Grid, FMXTee.Engine, FMXTee.Gauges.Numeric, FMXTee.Gauges.Linear,
  FMXTee.Procs, FMXTee.Chart, FMX.Layouts, FMX.Controls.Presentation,
  FMX.StdCtrls, FMX.Colors, FMXTee.Series.Surface, FMXTee.Series.Map,
  FMXTee.Series.World, FMX.Objects, FMXTee.Series, FMXTee.Series.Donut,
  FMXTee.Series.Bubble, FMXTee.Series.Spline, FireDAC.Stan.Intf,
  FireDAC.Stan.Option, FireDAC.Stan.Error, FireDAC.UI.Intf, FireDAC.Phys.Intf,
  FireDAC.Stan.Def, FireDAC.Stan.Pool, FireDAC.Stan.Async, FireDAC.Phys,
  FireDAC.FMXUI.Wait,
  FireDAC.Stan.Param, FireDAC.DatS, FireDAC.DApt.Intf, FireDAC.DApt, Data.DB,
  FireDAC.Comp.DataSet, FireDAC.Comp.Client, FMXTee.DBChart,
  FireDAC.Stan.StorageBin,
  {$IFNDEF IOS}
  FireDAC.Phys.ODBCBase,
  {$ENDIF}
  FMXTee.Animations.Tools, FMXTee.Tools, FMXTee.Tools.ScrollPager,
  FMXTee.Tools.SubChart, FMX.Ani, FMXTee.Editor.Series.WorldMap,
  FMXTee.Chart.Crosstab;

type

  TCommentType = (Global, Regional, Country);


  TDashForm = class(TForm)
    Layout1: TLayout;
    Layout2: TLayout;
    Label1: TLabel;
    Label2: TLabel;
    Layout3: TLayout;
    GridPanelLayout1: TGridPanelLayout;
    Layout4: TLayout;
    GridPanelLayout2: TGridPanelLayout;
    AreaChart: TDBChart;
    BarChart: TDBChart;
    DonutChart: TDBChart;
    Layout5: TLayout;
    GridPanelLayout3: TGridPanelLayout;
    MapChart: TDBChart;
    MapSeries: TWorldSeries;
    ColorBox1: TColorBox;
    Image1: TImage;
    Layout6: TLayout;
    LBTotalSales: TLabel;
    Label5: TLabel;
    ColorBox2: TColorBox;
    Image2: TImage;
    Layout7: TLayout;
    LBTotalItemsSold: TLabel;
    Label7: TLabel;
    ColorBox3: TColorBox;
    Layout8: TLayout;
    LBTotalSalesCountryValue: TLabel;
    LBTotalSalesCountry: TLabel;
    ColorBox4: TColorBox;
    Image4: TImage;
    Layout9: TLayout;
    LBTotalSalesCountryBTValue: TLabel;
    LBBetween: TLabel;
    AreaSeries: TAreaSeries;
    Series4: TBarSeries;
    Series5: TBarSeries;
    DonutSeries: TDonutSeries;
    _salesbycountryView: TFDQuery;
    _salesbyyearcountryView: TFDQuery;
    _salesbycontinentView: TFDQuery;
    _salesbyyearcontinentView: TFDQuery;
    TeeGrid1: TTeeGrid;
    Fact_ordersqueryView: TFDQuery;
    Image5: TImage;
    Rectangle1: TRectangle;
    ChartTool1: TMarksTipTool;
    ChartTool2: TMarksTipTool;
    ChartTool3: TScrollPagerTool;
    Fact_invoicesqueryView: TFDQuery;
    LBTotalSalesCountryBt: TLabel;
    QuerySalesByCountryBt: TFDQuery;
    Circle1: TCircle;
    TotalSalesIconAnimation: TFloatAnimation;
    QuerySalesByCountryMap: TFDQuery;
    Lookup_countryTable: TFDQuery;
    ColorAnimation1: TColorAnimation;
    ColorAnimation2: TColorAnimation;
    ColorAnimation3: TColorAnimation;
    ColorAnimation4: TColorAnimation;
    BExportToWeb: TColorBox;
    Label3: TLabel;
    DBCrossTabSource1: TDBCrossTabSource;
    CursorTool: TCursorTool;
    CursorToolHoriz: TCursorTool;
    Series1: TAreaSeries;
    FDQuery1: TFDQuery;
    procedure FormShow(Sender: TObject);
    procedure TeeGrid1Select(Sender: TObject);
    procedure BarChartClickSeries(Sender: TCustomChart; Series: TChartSeries;
      ValueIndex: Integer; Button: TMouseButton; Shift: TShiftState; X,
      Y: Integer);
    procedure DonutChartClickSeries(Sender: TCustomChart; Series: TChartSeries;
      ValueIndex: Integer; Button: TMouseButton; Shift: TShiftState; X,
      Y: Integer);
    procedure AreaChartDblClick(Sender: TObject);
    procedure ChartTool3Scrolled(Sender: TObject);
    procedure MapSeriesClick(Sender: TChartSeries; ValueIndex: Integer;
      Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
    procedure BExportToWebClick(Sender: TObject);
    procedure Series4GetBarStyle(Sender: TCustomBarSeries; ValueIndex: Integer;
      var TheBarStyle: TBarStyle);
    procedure AreaChartMouseDown(Sender: TObject; Button: TMouseButton;
      Shift: TShiftState; X, Y: Single);
    procedure AreaChartMouseUp(Sender: TObject; Button: TMouseButton;
      Shift: TShiftState; X, Y: Single);
    procedure MapChartClickSeries(Sender: TCustomChart; Series: TChartSeries;
      ValueIndex: Integer; Button: TMouseButton; Shift: TShiftState; X,
      Y: Integer);
  private
    AStartYear, AEndYear : Double;
    BarAnimation : TSeriesAnimationTool;
    DonutAnimation : TSeriesAnimationTool;
    AreaAnimation : TSeriesAnimationTool;

		activeCountry : string;
		activeRegion : string;

    First : Boolean;
    SharedFolder : string;
    Scrolled : Boolean;

    CommentType : TCommentType;
    CountrySelected : String;
    DoScroll : Boolean;
    IndexBarClicked : integer;
    BarSeriesClicked : TChartSeries;
    ValueIndexCountry : integer;

    function GetTotalSalesByCountryBetween(ACountry : String; StartValue, EndValue : Double) : Double;

    procedure Init;
    procedure RefreshCountryYear(Country: string);
    procedure RefreshCountryYearComment(CommentType: TCommentType);
    procedure StopAreaAnimation(Sender: tObject);
    procedure StopBarAnimation(Sender: tObject);
    procedure StopDonutAnimation(Sender: tObject);

    procedure SetTotalSales;
    procedure SetTotalItemsSold;
    procedure AnimateBarChart;
    procedure AnimateAreaChart;
    procedure AnimateDonutChart;

    procedure CreateAnimations;
    procedure FillAreaSeriesBySelectedCountry(AValueIndex: integer);
    procedure RefreshGrid(AStartValue, AEndValue: Integer);
    procedure UpdateTotalSalesByCountryBetweenLabels(ACounry : string; AStart, AEnd : double);
    procedure UpdateTotalSalesByCountryLabels(AValueIndex : integer);
    procedure FillMapValues;
    function GetContinentFromCountry(ACountry: string): string;
    procedure FillDonutSeriesBySelectedContinent(AContinent: string);
    procedure ConfigureBarChart;
    procedure ConfigureAreaChart;
    procedure ConfigureDonutChart;
    procedure ConfigureMapChart;
    procedure ShowSavedFile;
    procedure RefreshBarChart(AStart, AEnd: integer);
    procedure FillCountryData;
  public


  end;

var
  DashForm: TDashForm;

const
  BluesPalette:Array[0..8] of TAlphaColor =
    (
      $FFD6E1FA,
      $FF7797D1,
      $FF4466a3,
      $FF3b548c,
      $FF3B548C,
      $FF2B406B,
      $FF1C2A47,
      $FF121C2F,
      $FF0C121F
    );


implementation

{$R *.fmx}

uses
  System.StrUtils, FMXTee.Store, System.ioutils,
  Tee.Grid, Tee.Grid.CSV, Tee.Grid.JSON, System.JSON,
  FMX.Memo, DataModule
{$IFDEF MSWINDOWS}
  , Winapi.Windows
{$ENDIF MSWINDOWS}
  {$IFNDEF IOS}
  , FMXTee.Editor.EditorPanel
  {$ENDIF}
  , FileLauncher;


Procedure TDashForm.ShowSavedFile;
begin
  TeeGoToURL(0, ExtractFilePath(ParamStr(0))+'\export\LinkingCharts.html');
end;

procedure TDashForm.BExportToWebClick(Sender: TObject);

  procedure ExportIndicatorsData(FileName : string);
  var
    myFile : TextFile;
  begin
    // Try to open the Test.txt file for writing to
    AssignFile(myFile, FileName);
    ReWrite(myFile);

    // Write a couple of well known words to this file
    // Indicator 1  - Total Sales Value
    WriteLn(myFile, 'var aTotalsales = "' + StringReplace(LBTotalSales.Text, '$','', [rfReplaceAll, rfIgnoreCase]) + '";');

    // Indicator 2  - Total Items Sold
    WriteLn(myFile, 'var aTotalitemssold = "' + LBTotalItemsSold.Text+ '";');

    // Indicator 3  - Total Sales Country Text and Total Sales Country Value
    // Indicator 4  - Total Sales Country between Label and Value
    WriteLn(myFile, 'var aTotalsalesin = "' + StringReplace(LBTotalSalesCountryValue.Text, '$','', [rfReplaceAll, rfIgnoreCase]) + '";');
    WriteLn(myFile, 'var aTotalsalesinbetween = "' + StringReplace(LBTotalSalesCountryBTValue.Text, '$','', [rfReplaceAll, rfIgnoreCase]) + '";');

    WriteLn(myFile, 'var aCountry = "' + CountrySelected + '";');
    WriteLn(myFile, 'var aStartyear = "' + Round(AStartYear).ToString + '";');
    WriteLn(myFile, 'var aEndyear = "' + Round(AEndYear).ToString + '";');

    // Close the file
    CloseFile(myFile);

    // Reopen the file for reading
    Reset(myFile);
    // Close the file for the last time
    CloseFile(myFile);
  end;

  procedure ExportTeeGridData(FileName : string; AData : string);
  var
    myFile : TextFile;
  begin
    // Try to open the Test.txt file for writing to
    AssignFile(myFile, FileName);
    ReWrite(myFile);

    WriteLn(myFile, AData);

    // Close the file
    CloseFile(myFile);

    // Reopen the file for reading
    Reset(myFile);
    // Close the file for the last time
    CloseFile(myFile);
  end;

  procedure ExportMapSeries(FileName : string);
  var
    myFile : TextFile;
    i : integer;
    ZVal : double;
    CountryCode, oldCountry : string;
  begin
    oldCountry := '.';

    // Try to open the Test.txt file for writing to
    AssignFile(myFile, FileName);
    ReWrite(myFile);

    WriteLn(myFile, '{ "chart": [');
    WriteLn(myFile, '  {');
    WriteLn(myFile, '   "series": {');
    WriteLn(myFile, '   "name":"MapSeries",');
    WriteLn(myFile, '   "color":"#FFCCFFFF",');
    WriteLn(myFile, '   "point": [');
    for i := 0 to MapSeries.Count-1 do
    begin
      ZVal := MapSeries.ZValues[i];
      CountryCode := MapSeries.Shapes[i].Code;

      if ZVal <> 0 then
      begin
        if oldCountry <> MapSeries.Labels[i] then
        begin
          oldCountry := MapSeries.Labels[i];
          if First then
            First := False
          else
            WriteLn(myFile, ',');

          WriteLn(myFile, '     { "value":'+ MapSeries.ZValue[i].ToString +', "x":0, "name":"'+ MapSeries.Labels[i] +'" '+ ', "id":"' + CountryCode + '" }');
        end;
      end;
    end;
    First := True;
    WriteLn(myFile, '   ]');
    WriteLn(myFile, '   }');
    WriteLn(myFile, '  }');
    WriteLn(myFile, ' ]');
    WriteLn(myFile, '}');

    // Close the file
    CloseFile(myFile);

    // Reopen the file for reading
    Reset(myFile);
    // Close the file for the last time
    CloseFile(myFile);
  end;


var
  GridDataAsStr, epath, appPath, URL : String;
begin
  SharedFolder := InputBox('Shared Folder','Please, enter a correct shared path where the Web files will be created',SharedFolder);

  if not DirectoryExists(SharedFolder) then
  begin
     ShowMessage('The path added does not exists, please enter a correct one.');
     exit;
  end;

  if DirectoryExists(SharedFolder + '\dashboard') then
    TDirectory.Delete(SharedFolder + '\dashboard', true);

  appPath :=GetCurrentDir;
  TDirectory.Copy(appPath + '\..\..\web', SharedFolder);

  epath := SharedFolder + '\dashboard\data';
  CreateDir(epath);

  // MapChart
  // Export MapChart manually
  ExportMapSeries(epath  + '\MapChart.JSON');

  (*
  with TSeriesDataJSON.Create(MapChart,nil) do
  try
    IncludeIndex:=True;
    SaveToFile(epath  + '\MapChart.JSON');
  finally
    Free;
  end;
  *)

  // DonutChart
  with TSeriesDataJSON.Create(DonutChart,nil) do
  try
    IncludeIndex:=True;
    SaveToFile(epath  + '\DonutChart.JSON');
  finally
    Free;
  end;

  // BarChart
  with TSeriesDataJSON.Create(BarChart,nil) do
  try
    IncludeIndex:=True;
    SaveToFile(epath  + '\BarChart.JSON');
  finally
    Free;
  end;

  // AreaChart
  with TSeriesDataJSON.Create(AreaChart,nil) do
  try
//    Series := AreaSeries;
    IncludeIndex:=True;
    SaveToFile(epath + '\AreaChart.JSON');
  finally
    Free;
  end;

  // TeeGrid
  GridDataAsStr:= TJSONData.From( TeeGrid1.Grid, nil, True );  // <-- whole grid
  ExportTeeGridData (epath + '\TeeGrid.JSON', GridDataAsStr);

  GridDataAsStr := TCSVData.From( TeeGrid1.Grid);  // <-- whole grid
  ExportTeeGridData (epath + 'TeeGrid.csv', GridDataAsSTr);

  ExportIndicatorsData(epath + '\Variables.js');


  ShowMessageUser('Remember to create an alias like http://localhost/dashboard/reports/ which redirects to \export\web\dashboard\reports folder');
  URL := 'http://localhost/dashboard/reports/index.html';
 // URL := StringReplace(URL, '"', '%22', [rfReplaceAll]);
 {$IFDEF MSWINDOWS}
  TFileLauncher.Open(url);
  {$ENDIF MSWINDOWS}
end;

procedure TDashForm.AnimateDonutChart;
begin
  DonutAnimation.Play;
end;

// Open Chart Editor of Selected Chart, at double click
procedure TDashForm.AreaChartDblClick(Sender: TObject);
{$IFNDEF IOS}
var ChartEditor : TChartEditor;
{$ENDIF}
begin
  {$IFNDEF IOS}
  ChartEditor := TChartEditor.Create(Self);
  ChartEditor.Chart := TChart(Sender);
  ChartEditor.Execute;
  {$ENDIF}
end;

procedure TDashForm.AreaChartMouseDown(Sender: TObject; Button: TMouseButton;
  Shift: TShiftState; X, Y: Single);
begin
  //Scrolled:=false;
end;

procedure TDashForm.AreaChartMouseUp(Sender: TObject; Button: TMouseButton;
  Shift: TShiftState; X, Y: Single);
begin
  if Scrolled = true then
  begin
  if AStartYear <> -1 then
  begin
    if DoScroll then
    begin
      // Refresh TeeGrid data
      AStartYear := ChartTool3.ColorBandTool.StartValue;
      AEndYear := ChartTool3.ColorBandTool.EndValue;

      RefreshBarChart(Round(AStartYear), Round(AEndYear));
      RefreshGrid(Round(AStartYear), Round(AEndYear));
      UpdateTotalSalesByCountryBetweenLabels(DonutSeries.Labels.Labels[ValueIndexCountry], AStartYear, AEndYear);
    end;
  end;
  Scrolled := False;
  end;
end;

procedure TDashForm.BarChartClickSeries(Sender: TCustomChart;
  Series: TChartSeries; ValueIndex: Integer; Button: TMouseButton;
  Shift: TShiftState; X, Y: Integer);
begin
  IndexBarClicked := ValueIndex;
  BarSeriesClicked := Series;
end;

procedure TDashForm.StopAreaAnimation(Sender : tObject);
begin
  // Update Total Sales, and Sales by country between selected years indicators.....
  UpdateTotalSalesByCountryBetweenLabels(DonutSeries.Labels.Labels[ValueIndexCountry],
      ChartTool3.ColorBandTool.StartValue,
      ChartTool3.ColorBandTool.EndValue);
end;

procedure TDashForm.StopBarAnimation(Sender: tObject);
begin
  AnimateAreaChart;
end;

procedure TDashForm.StopDonutAnimation(Sender: tObject);
begin
  AnimateBarChart;
end;

procedure TDashForm.AnimateAreaChart;
begin
  AreaAnimation.Play;
end;

procedure TDashForm.AnimateBarChart;
begin
  BarAnimation.Play;
end;

// Fill specific Data to Area Chart by using the Country selected on Donut Series
procedure TDashForm.FillAreaSeriesBySelectedCountry(AValueIndex : integer);

    procedure ConfigureSmoothing;
    var
      SmoothingFunc : TSmoothingFunction;
      SmoothArea : TAreaSeries;
    begin
      while AreaChart.SeriesCount > 1 do
        AreaChart.RemoveSeries(AreaChart[1]);

      SmoothingFunc := TSmoothingFunction.Create(Self);
      SmoothArea := TAreaSeries.Create(Self);
      AreaChart.AddSeries(SmoothArea);

      SmoothArea.SetFunction(SmoothingFunc);
      SmoothArea.Pen.Visible := False;
      SmoothArea.AreaColor := AreaSeries.Color;
      SmoothArea.LinePen.Visible := False;
      SmoothArea.AreaLinesPen.Visible := False;

      SmoothArea.DataSource := AreaSeries;
      SmoothArea.CheckDataSource;

      AreaSeries.Visible := False;
      AreaAnimation.Series := SmoothArea;

      CursorTool.Series := SmoothArea;
      CursorToolHoriz.Series := SmoothArea;
    end;

begin
    // Clear Series
    AreaSeries.Clear;
    AreaSeries.DataSources.Clear;

    // Assign again the DataSource
    AreaSeries.DataSource := _salesbyyearcountryView;

    // Refresh FireDac qoery by using specific Country
    _salesbyyearcountryView.Close;
    _salesbyyearcountryView.Params.Items[0].AsString := DonutSeries.Labels.Labels[AValueIndex];
    _salesbyyearcountryView.Open();

    // Change the Area Chart title
    AreaChart.Title.Text.Text := 'Sales by Country : ' + DonutSeries.Labels.Labels[AValueIndex];

    // Band Values for Scroll pager Tool
    DoScroll := False;
    if AStartYear = -1 then
      AStartYear := 2005;

    if AEndYear = -1 then
      AEndYear := 2010;

    ChartTool3.ColorBandTool.StartValue := Round(AStartYear);
    DoScroll := True;
    ChartTool3.ColorBandTool.EndValue := Round(AEndYear);

    // Update Total Sales, and Sales by Country indicators...
    CountrySelected := DonutSeries.Labels.Labels[AValueIndex];

    UpdateTotalSalesByCountryLabels(AValueIndex);

    ConfigureSmoothing;
end;

procedure TDashForm.DonutChartClickSeries(Sender: TCustomChart;
  Series: TChartSeries; ValueIndex: Integer; Button: TMouseButton;
  Shift: TShiftState; X, Y: Integer);
begin
  ValueIndexCountry := ValueIndex;
  FillAreaSeriesBySelectedCountry(ValueIndexCountry);

  TotalSalesIconAnimation.Start;
  ColorAnimation1.Start;
  AreaAnimation.Play;
end;

procedure TDashForm.FormShow(Sender: TObject);
begin
  Init();
end;

function TDashForm.GetTotalSalesByCountryBetween(ACountry: String; StartValue,
  EndValue: Double): Double;
begin
  QuerySalesByCountryBt.Close;

  QuerySalesByCountryBt.Params[0].AsString := ACountry;
  QuerySalesByCountryBt.Params[1].AsFloat := Round(StartValue);
  QuerySalesByCountryBt.Params[2].AsFloat := Round(EndValue);

  QuerySalesByCountryBt.Open;

  result := QuerySalesByCountryBt.Fields[0].AsFloat;

  QuerySalesByCountryBt.Close;
end;

procedure TDashForm.RefreshBarChart(AStart : integer; AEnd: integer);
begin
  _salesbyyearcontinentView.Active := False;
  _salesbyyearcontinentView.Params.ParamByName('P1').AsInteger:= AStart;
  _salesbyyearcontinentView.Params.ParamByName('P2').AsInteger := AEnd;
  _salesbyyearcontinentView.Active := True;
  Series5.CheckDataSource;
end;

// By scrolling the Area Chart scroller, the Data Grid is refreshed...
procedure TDashForm.ChartTool3Scrolled(Sender: TObject);
begin
  Scrolled := true;
end;

// Define the Charts Animations....
procedure TDashForm.CreateAnimations;
begin
    // Bar Chart Animation
    BarAnimation:=TSeriesAnimationTool.Create(Self);
    BarChart.Animations.Add(BarAnimation);
    BarAnimation.StartAtMin:=False;
    BarAnimation.DrawEvery:=1;
    BarAnimation.OnStop:=StopBarAnimation;

    // Area Chart Animation
    AreaAnimation:=TSeriesAnimationTool.Create(Self);
    AreaChart.Animations.Add(AreaAnimation);
    AreaAnimation.StartAtMin:=False;
    AreaAnimation.DrawEvery:=1;
    AreaAnimation.OnStop:=StopAreaAnimation;

    // Donut Chart Animation
    DonutAnimation:=TSeriesAnimationTool.Create(Self);
    DonutChart.Animations.Add(DonutAnimation);
    DonutAnimation.StartAtMin:=False;

    DonutAnimation.DrawEvery:=1;
    DonutAnimation.OnStop:=StopDonutAnimation;
end;

// Settings for Bar Chart
procedure TDashForm.ConfigureBarChart;
begin
    BarChart.Hover.Visible := False;
    _salesbycontinentView.Active := True;

{$IFDEF IOS}
    BarChart.Legend.Font.Size := 10;
{$ENDIF}
end;

// Settings for Area Chart
procedure TDashForm.ConfigureAreaChart;
begin
    AreaChart.Hover.Visible := False;
    AreaChart.AllowZoom := False;

    // Chart Scroller Tool
    ChartTool3.SubChartTool.Charts.Items[0].Chart.Hover.Visible := False;
    ChartTool3.SubChartTool.Charts.Items[0].Chart.Series[0].Color := BarChart.Series[1].Color;
end;

// Settings for Donut Chart
procedure TDashForm.ConfigureDonutChart;
begin
    DonutChart.Hover.Visible := False;
    DonutSeries.Marks.FontSeriesColor :=  True;

{$IFDEF IOS}
    DonutSeries.Marks.Visible := False;
{$ENDIF}
end;

// Settings for Map Chart
procedure TDashForm.ConfigureMapChart;

  procedure RandomValues(const AList:TChartValueList);
  var t : Integer;
  begin
    for t:=0 to AList.Count-1 do
    begin
        AList.Value[t]:=Random(10000);
    end;

    AList.Modified:=True;
    AList.Owner.Repaint;
  end;

begin
    MapChart.ColorPaletteIndex := 3;
    MapChart.Hover.Visible := False;

    // In the case that you want to use entities for Cities.
    (*
    MapSeries.Layers.Cities.Size:=csValue;
    MapSeries.Layers.Cities.Visible := true;
    MapSeries.Layers.Cities.Series.Pointer.Color:= TAlphaColorRec.Orange;

    RandomValues(MapSeries.Layers.Cities.Series.RadiusValues);
    *)
    MapChart.Tools.Add(TMarksTipTool);
    (MapChart.Tools[0] as TMarksTipTool).Style := TSeriesMarksStyle.smsLabelValue;
    (MapChart.Tools[0] as TMarksTipTool).Font.Size := 20;
    (MapChart.Tools[0] as TMarksTipTool).Font.Color := TAlphaColorRec.Royalblue;
    (MapChart.Tools[0] as TMarksTipTool).Format.Transparent := true;
//    (MapChart.Tools[0] as TMarksTipTool).MouseAction := TMarkToolMouseAction.mtmClick;

    FillCountryData;
end;

procedure  TDashForm.FillCountryData;
var
  aCountry : string;
  aValue : double;
  i : integer;
begin
    FDQuery1.Close;
    FDQuery1.Open();;

    FDQuery1.First;
    while (not FDQuery1.Eof) do
    begin
      aValue := FDQuery1.Fields[0].AsFloat;
      aCountry := FDQuery1.FieldByName('Country_name').AsString;

      for i := 0 to MapSeries.Count-1 do
      begin
        if UpperCase(MapSeries.Labels[i]) = UpperCase(aCountry) then begin
          MapSeries.ZValue[i] := aValue;
        end;
      end;

      FDQuery1.Next;
    end;
end;

// Initialization
procedure TDashForm.Init;
begin
  DataModule1.TechproducssqliteConnection.Connected := true;

{$IFDEF MACOS}
  Layout4.Height := 192;
  LBTotalSales.TextSettings.Font.Size := 14;
  Label5.TextSettings.Font.Size := 14;
  LBTotalItemsSold.TextSettings.Font.Size := 14;
  Label7.TextSettings.Font.Size := 14;
  LBTotalSalesCountry.TextSettings.Font.Size := 14;
  LBTotalSalesCountryValue.TextSettings.Font.Size := 14;
  LBTotalSalesCountryBt.TextSettings.Font.Size := 14;
  LBTotalSalesCountryBTValue.TextSettings.Font.Size := 14;
  LBBetween.TextSettings.Font.Size := 14;
{$ELSE}
  Layout4.Height := 256;
  LBTotalSales.TextSettings.Font.Size := 18;
  Label5.TextSettings.Font.Size := 18;
  LBTotalItemsSold.TextSettings.Font.Size := 18;
  Label7.TextSettings.Font.Size := 18;
  LBTotalSalesCountry.TextSettings.Font.Size := 18;
  LBTotalSalesCountryValue.TextSettings.Font.Size := 18;
  LBTotalSalesCountryBt.TextSettings.Font.Size := 18;
  LBTotalSalesCountryBTValue.TextSettings.Font.Size := 18;
  LBBetween.TextSettings.Font.Size := 18;
{$ENDIF}

{$IF DEFINED(iOS) or DEFINED(ANDROID)}
  LBTotalSales.TextSettings.Font.Size := 10;
  Label5.TextSettings.Font.Size := 10;
  LBTotalItemsSold.TextSettings.Font.Size := 10;
  Label7.TextSettings.Font.Size := 10;
  LBTotalSalesCountry.TextSettings.Font.Size := 10;
  LBTotalSalesCountryValue.TextSettings.Font.Size := 10;
  LBTotalSalesCountryBt.TextSettings.Font.Size := 10;
  LBTotalSalesCountryBTValue.TextSettings.Font.Size := 10;
  LBBetween.TextSettings.Font.Size := 10;
{$ENDIF}

    MapSeries.Map := TWorldMap.wmWorld;

    FormatSettings.DecimalSeparator := '.';
    FormatSettings.ThousandSeparator := ',';
    IndexBarClicked := -1;
    BarSeriesClicked := nil;

    AStartYear := -1;
    AEndYear := -1;

    First := True;
    SharedFolder := 'c:\Temp';

    CreateAnimations;

    ConfigureBarChart;
    ConfigureAreaChart;
    ConfigureDonutChart;

    SetTotalSales;
    SetTotalItemsSold;

    ConfigureMapChart;

    // Fill Data for Map Series
    FillMapValues;

    // Select by default a Continent automatically
    FillDonutSeriesBySelectedContinent('AS');

    // Select by default the first Value Donut Chart to fill Area Series.
    FillAreaSeriesBySelectedCountry(0);

    RefreshGrid(2005,2010);

    _salesbycountryView.Active:=true;
    _salesbyyearcontinentView.Active:=true;
end;

procedure TDashForm.FillMapValues;
var
  i, idx : integer;
  Country : string;
begin
  Lookup_countryTable.Active := true;

  if Lookup_countryTable.Active then
  begin
    if Lookup_countryTable.RecordCount>0 then
    begin
        Lookup_countryTable.First;
        while (not Lookup_countryTable.Eof) do
        begin
          Country := Lookup_countryTable.FieldByName('Country_name').AsString;

          for i := 0 to MapSeries.Count-1 do
          begin
            if ((UpperCase(MapSeries.Labels[i]) =  UpperCase(Country)) or (MapSeries.Labels[i].Contains(Country))) then
            begin
              idx := AnsiIndexStr(Lookup_countryTable.FieldByName('Continent').AsString, ['AF','AS','EU','NA','OC','SA'] ) ;
              MapSeries.ValueColor[i] := TAlphaColor(BluesPalette[idx]);
            end;

          end;
          Lookup_countryTable.Next;
        end;
      end;
    end;
end;

procedure TDashForm.RefreshGrid(AStartValue, AEndValue : Integer);
begin
  Fact_ordersqueryView.Active := False;
  Fact_ordersqueryView.Close;
  if (AStartValue <> -1) and (AEndValue <> -1) then
  begin
    Fact_ordersqueryView.SQL.Text := 'SELECT * FROM (SELECT Fact_Orders.ID, Fact_Orders.Cod_Customer, ' +
       'Fact_Orders.Orderdate, Fact_Orders.Invoice_year, Fact_Orders.Invoice_num, Fact_Orders.Product_code, ' +
       ' Fact_Orders.Pack_code ' + 'FROM Fact_Orders)  where Invoice_year >=' + AStartValue.ToString +
       ' and Invoice_year <= ' + AEndValue.ToString;
  end
  else
    Fact_ordersqueryView.SQL.Text := 'SELECT * FROM (SELECT Fact_Orders.ID, Fact_Orders.Cod_Customer, ' +
      'Fact_Orders.Orderdate, Fact_Orders.Invoice_year, Fact_Orders.Invoice_num, Fact_Orders.Product_code, ' +
      'Fact_Orders.Pack_code ' +'FROM Fact_Orders)';

  Fact_ordersqueryView.Open;
  Fact_ordersqueryView.Active := True;
end;

function TDashForm.GetContinentFromCountry(ACountry : string) : string;
var
  QueryGetContinent : TFDQuery;
begin
  Result := '';
  QueryGetContinent := TFDQuery.Create(self);
  try
    QueryGetContinent.Connection := DataModule1.TechproducssqliteConnection;
    QueryGetContinent.SQL.Text := 'Select Continent FROM Lookup_Country WHERE Country_code_A2=:ID;';
    QueryGetContinent.Params.ParamByName('ID').AsString := ACountry;

    QueryGetContinent.Open();
    result := QueryGetContinent.Fields[0].AsString;
  finally
    QueryGetContinent.Free;
  end;
end;

procedure TDashForm.FillDonutSeriesBySelectedContinent(AContinent : string);
var
  idx : integer;
  ContinentName : string;
begin
  _salesbycountryView.Active := False;
  idx := AnsiIndexStr(AContinent, ['AF','AS','EU','NA','OC','SA'] ) ;

  case idx of
     0 : ContinentName := 'Africa';
     1 : ContinentName := 'Asia';
     2 : ContinentName := 'Europe';
     3 : ContinentName := 'North America';
     4 : ContinentName := 'Oceania';
     5 : ContinentName := 'South America';
  end;

  _salesbycountryView.Params.ParamByName('P1').AsString := ContinentName;
  _salesbycountryView.Active := True;
end;

procedure TDashForm.MapChartClickSeries(Sender: TCustomChart;
  Series: TChartSeries; ValueIndex: Integer; Button: TMouseButton;
  Shift: TShiftState; X, Y: Integer);
begin
    // Query sales by country map
    (*
    QuerySalesByCountryMap.Close;
    QuerySalesByCountryMap.Params.Items[0].AsString := MapSeries.XLabel[ValueIndex];
    QuerySalesByCountryMap.Open();
    if QuerySalesByCountryMap.RecordCount>0 then
    begin
      MapSeries.ZValue[ValueIndex] := QuerySalesByCountryMap.Fields[0].AsFloat;
    end;
    *)
end;

procedure TDashForm.MapSeriesClick(Sender: TChartSeries; ValueIndex: Integer;
  Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
var
  CountryCode, ContName : string;
  s : TShiftState;
begin
  // Get Continent From Country Code
  CountryCode := MapSeries.Shapes.ByName[MapSeries.Labels[ValueIndex]].Code;
  ContName := GetContinentFromCountry(CountryCode);

  FillDonutSeriesBySelectedContinent(ContName);
  DonutChartClickSeries(DonutChart,DonutSeries,0,TMouseButton.mbLeft, s, 0,0);

  AnimateDonutChart;
end;

// Gets Total Sales....
procedure TDashForm.SetTotalSales;
begin
  DataModule1.QueryTotalSales.Open;
  LBTotalSales.Text := CurrToStrF(DataModule1.QueryTotalSales.Fields[0].AsFloat, ffCurrency,0);
  ColorAnimation4.Start;
end;

// Gets Total items sold....
procedure TDashForm.SetTotalItemsSold;
begin
  DataModule1.QueryTotalItemsSold.Open();
  LBTotalItemsSold.Text := DataModule1.QueryTotalItemsSold.Fields[0].asstring;

  ColorAnimation3.Start;
end;

procedure TDashForm.TeeGrid1Select(Sender: TObject);
var
  row : integer;
begin
    row :=  TeeGrid1.Selected.Row;
    if (row > -1) then
      RefreshCountryYear(DonutChart[0].Labels[row]);
end;

// Update Total Sales, and Sales by country between selected years indicators.....
procedure TDashForm.UpdateTotalSalesByCountryBetweenLabels(ACounry: string;
  AStart, AEnd: double);
begin
  LBTotalSalesCountryBT.Text := 'Total Sales in ' +  ACounry;

  LBBetween.Text := 'between ' + Round(AStart).ToString + ' and ' + Round(AEnd).ToString;
  LBTotalSalesCountryBTValue.Text :=  CurrToStrF(GetTotalSalesByCountryBetween(ACounry,
        AStart, AEnd), ffCurrency,0);
  ColorAnimation2.Start;
end;

procedure TDashForm.UpdateTotalSalesByCountryLabels(AValueIndex : integer);
begin
  LBTotalSalesCountry.Text := 'Total Sales in ' +  DonutSeries.Labels.Labels[AValueIndex];
  LBTotalSalesCountryValue.Text :=  CurrToStrF(DonutSeries.YValues[AValueIndex], ffCurrency,0);
end;


procedure TDashForm.RefreshCountryYear(Country: string);
var
  sqlStr : string;
begin
    AreaChart.Series[0].Clear;
    AreaChart.Series[1].Clear;
    //setup the data query for the country table to get all available year data to better see trend
    sqlStr := 'SELECT Sum(Fact_Invoices.Invoice_Value)AS SumOfInvoice_Value, Fact_Invoices.Invoice_year AS AYear, Lookup_Country.Country_name';
    sqlStr := sqlStr + ' FROM(Lookup_Customers INNER JOIN Fact_Invoices ON Lookup_Customers.Cod_Customer = Fact_Invoices.Cod_Customer)';
    sqlStr := sqlStr + ' INNER JOIN Lookup_Country ON Lookup_Customers.Country_code_A2 = Lookup_Country.Country_code_A2';
    sqlStr := sqlStr + ' WHERE Lookup_Country.Country_name = (:country) ';
    sqlStr := sqlStr + ' GROUP BY Fact_Invoices.Invoice_year, Lookup_Country.Country_name';
end;

procedure TDashForm.RefreshCountryYearComment(CommentType: TCommentType);
var
  up201314, up201415, aboutCountry : Boolean;
  comments : array of String;
  offset : integer;
begin
    //Mockup of an auto-commentary system, add comments from range according to data performance
    if (AreaChart[0].YValues.Count > 2) then
      up201314 := AreaChart[0].YValues.Value[AreaChart[0].Count - 2] > AreaChart[0].YValues.Value[AreaChart[0].Count - 3]
    else
      up201314 := false;

    if (AreaChart[0].YValues.Count > 2) then
      up201415 := AreaChart[0].YValues.Last > AreaChart[0].YValues[AreaChart[0].Count - 2]
    else
      up201415 := false;

   // TODO textBox1.Clear();

    SetLength(comments,10);

    offset := 0;
    aboutCountry := false;

    case ord(CommentType) of
      0:
      begin
        comments[0] := 'Overall situation';
        comments[1] := '';
        comments[2] := 'Total sales summed are $' + BarChart[0].YValues.TotalABS.ToString();  // Format 1 dec
      end;
      1:
      begin
        comments[0] := 'From ' + activeRegion;
        aboutCountry := true;
        offset := 3;
      end;
      2:
      begin
        aboutCountry := true;
      end;
      end;


    if ((aboutCountry) and (LowerCase(activeCountry) <> 'other')) then
    begin
      comments[0 + offset] := 'Results for ' + activeCountry;
      if ((up201314) and (not up201415)) then
      begin
        comments[2 + offset] := 'Despite an upturn in 2014 results were disappointing as 2014 moved into 2015.';
        comments[3 + offset] := '';
      end
      else if ((not up201314) and (up201415)) then
      begin
        comments[2 + offset] := 'Last year''s results were very encouraging as the downward trend of 2014 was turned-around for a positive beginning to 2015';
        comments[3 + offset] := '';
      end
      else if ((up201314) and (up201415)) then
      begin
        comments[2 + offset] := 'Good progress in 2014 was consolidated for for a positive beginning to 2015.';
        comments[3 + offset] := '';
      end
      else if ((not up201314) and (not up201415)) then
      begin
        comments[2 + offset] := 'The slide for ' + activeCountry + ' hasn''t been corrected yet; work is being done to bring the market into line for the current year';
        comments[3 + offset] := '';
      end;
    end;

    comments[4 + offset] := '';

    comments[5 + offset] := '';

    if (CommentType = global) then
      comments[6 + offset] := 'Dollar has strengthened, supporting return currency conversion.';

//  TODO   textBox1.Lines := comments;
end;

procedure TDashForm.Series4GetBarStyle(Sender: TCustomBarSeries;
  ValueIndex: Integer; var TheBarStyle: TBarStyle);
var oldColor : TAlphaColor;
begin
  oldColor := Sender.Color;

  if (ValueIndex = IndexBarClicked) and (BarSeriesClicked = Sender) then
  begin
    TheBarStyle := TBarStyle.bsBevel;
    Sender.NormalBarColor:= TAlphaColor(BluesPalette[5]);
  end
  else begin
    TheBarStyle := TBarStyle.bsRectangle;
    Sender.NormalBarColor:= oldColor;
  end;
end;

end.
