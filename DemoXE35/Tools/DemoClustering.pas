unit DemoClustering;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  {$IFNDEF UPTOXE3}
  FMX.StdCtrls,
  {$ENDIF}
  {$IFDEF D19}
  FMX.Graphics,
  {$ENDIF}
  FMXTee.Series.Surface,
  FMXTee.Series.Point3D, FMXTee.Engine, FMXTee.Series, FMXTee.Procs,
  FMXTee.Chart, FMX.ListBox, FMX.Memo, FMXTee.Commander, FMX.Layouts, FMX.Edit,
  FMX.TreeView, FMXTee.Tools.Clustering, FMXTee.Functions.Clustering,
  FMX.Platform, FMX.Objects;

type
  TClusteringDemo = class(TForm)
    Chart1: TChart;
    Series1: TPointSeries;
    Series2: TPoint3DSeries;
    CBData: TComboBox;
    ListBoxItem1: TListBoxItem;
    ListBoxItem2: TListBoxItem;
    ListBoxItem3: TListBoxItem;
    ListBoxItem4: TListBoxItem;
    ListBoxItem5: TListBoxItem;
    ListBoxItem6: TListBoxItem;
    TreeView1: TTreeView;
    IrisDataSet: TMemo;
    CB3D: TCheckBox;
    ERandom: TEdit;
    CBCenters: TCheckBox;
    CBCentroid: TCheckBox;
    CBColorize: TCheckBox;
    CBViewClusters: TCheckBox;
    StatusText: TText;
    LRandom: TLabel;
    BRandom: TButton;
    CheckBox1: TCheckBox;
    LBMethod: TListBox;
    TeeCommander1: TTeeCommander;
    procedure Chart1AfterDraw(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
    procedure TreeView1Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure CBCentersClick(Sender: TObject);
    procedure LBMethodClick(Sender: TObject);
    procedure CBDataChange(Sender: TObject);
    procedure CB3DChange(Sender: TObject);
    procedure CBColorizeChange(Sender: TObject);
    procedure CBViewClustersChange(Sender: TObject);
    procedure Chart1MouseDown(Sender: TObject; Button: TMouseButton;
      Shift: TShiftState; X, Y: Single);
    procedure Chart1Exit(Sender: TObject);
    procedure Chart1Enter(Sender: TObject);
    procedure Chart1MouseWheel(Sender: TObject; Shift: TShiftState;
      WheelDelta: Integer; var Handled: Boolean);
    procedure CBCentroidClick(Sender: TObject);
    procedure BExecuteClick(Sender: TObject);
    procedure BRandomClick(Sender: TObject);
    procedure TreeView1Change(Sender: TObject);
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
    Tool : TClusteringTool;

    procedure AddClustersToTree;
    procedure AddRandomData;
    function EvaluateClusters:String;
    procedure FillTree(const c:TCluster; ShowCount:Boolean);
    procedure LoadIrisData(Combination:Integer);
    function SelectedSeries: TChartSeries;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  {$IFDEF D17}
  System.UIConsts,
  {$ENDIF}
  FMXTee.Editor.Tools, FMXTee.Canvas;

procedure TClusteringDemo.FillTree(const c:TCluster; ShowCount:Boolean);

  function ClusterTitle(ACluster:TCluster):String;
  begin
    if ShowCount then
       result:=IntToStr(ACluster.Count)+': '
    else
       result:='';

    with Tool.Data(ACluster) do
         result:=result+FormatFloat('#.00',X)+' '+FormatFloat('#.00',Y);
  end;

  procedure AddNodes(AShape:TTreeViewItem; ACluster:TCluster);
  var t : Integer;
      tmp : TTreeViewItem;
  begin
    AShape.TagObject:=ACluster;

    for t:=0 to ACluster.Count-1 do
    begin
      tmp:=TTreeViewItem.Create(Self);
      tmp.Text:=ClusterTitle(ACluster[t]);
      AShape.AddObject(tmp);

      AddNodes(tmp, ACluster[t]);
    end;
  end;

var t : Integer;
    tmp : TTreeViewItem;
begin
  TreeView1.Clear;

  for t:=0 to c.Count-1 do
  begin
    tmp:=TTreeViewItem.Create(Self);
    tmp.Text:=ClusterTitle(c[t]);
    TreeView1.AddObject(tmp);
    AddNodes(tmp, c[t]);
  end;
end;

procedure TClusteringDemo.LoadIrisData(Combination:Integer);
var t : Integer;
    tmpName,
    s : String;
    tmp:TColor;
    x,y,z,
    a,b,c : Double;
    d : Double;
    Old : Char;
begin
  Series1.Clear;
  Series2.Clear;

  TeeFieldsSeparator:=',';

  Old:=FormatSettings.DecimalSeparator;
  FormatSettings.DecimalSeparator:='.';

  for t:=0 to IrisDataSet.Lines.Count-1 do
  begin
    s:=IrisDataSet.Lines[t];

    a:=StrToFloat(TeeExtractField(s,1));
    b:=StrToFloat(TeeExtractField(s,2));
    c:=StrToFloat(TeeExtractField(s,3));
    d:=StrToFloat(TeeExtractField(s,4));

    tmpName:=TeeExtractField(s,5);

    if tmpName='Iris-setosa' then
       tmp:=claRed
    else
    if tmpName='Iris-versicolor' then
       tmp:=claBlue
    else
       tmp:=claGreen;

    case Combination of
      0:  begin x:=a; y:=b; z:=c; end;
      1:  begin x:=b; y:=c; z:=d; end;
      2:  begin x:=c; y:=d; z:=a; end;
      3:  begin x:=d; y:=a; z:=b; end;
    else
      begin x:=a; y:=c; z:=d; end;
    end;

    Series1.AddXY(x,y,tmpName,tmp);
    Series2.AddXYZ(x,y,z,tmpName,tmp);
  end;

  FormatSettings.DecimalSeparator:=Old;
end;

function TClusteringDemo.SelectedSeries: TChartSeries;
begin
  if CB3D.IsChecked then
     result:=Series2
  else
     result:=Series1;
end;

function TClusteringDemo.EvaluateClusters:String;
begin
  with TBaseClustering.Evaluation(Tool.Hierarchical.Provider, Tool.Clusters) do
    result:='Davies-Bouldin index: '+FormatFloat('0.000', DaviesBouldin)+' '+
            'Dunn index: '+FormatFloat('0.000', Dunn);
end;

procedure TClusteringDemo.AddRandomData;
var n, t : Integer;
begin
  Series1.Clear;
  Series2.Clear;

  Series1.BeginUpdate;
  Series2.BeginUpdate;

  n:=StrToInt(ERandom.Text);

  for t:=0 to n-1 do
      Series1.AddXY(Random(1000)*0.005,Random(1000)*0.005);

  for t:=0 to n-1 do
      Series2.AddXYZ(Random(1000)*0.005,Random(1000)*0.005,Random(1000)*0.005);

  Series1.EndUpdate;
  Series2.EndUpdate;
end;

procedure TClusteringDemo.BRandomClick(Sender: TObject);
begin
  AddRandomData;
  Tool.Clear;
  TreeView1.Clear;
end;

function Tick:{$IFDEF D17}Extended{$ELSE}Single{$ENDIF};
{$IFDEF D17}
var TimerService: IFMXTimerService;
{$ENDIF}
begin
  {$IFDEF D17}
  if TPlatformServices.Current.SupportsPlatformService(IFMXTimerService, IInterface(TimerService)) then
     result:=TimerService.GetTick
  else
     result:=0; // ?
  {$ELSE}
  result:=Platform.GetTick;
  {$ENDIF}
end;

procedure TClusteringDemo.BExecuteClick(Sender: TObject);
var t1, t2 : Single;
begin
  t1:=Tick;
  Tool.Execute;
  t2:=Tick;

  StatusText.Text:=FloatToStr(t2-t1)+' msec. '+EvaluateClusters;

  AddClustersToTree;
end;

procedure TClusteringDemo.Button4Click(Sender: TObject);
begin
  TToolsEditor.Edit(Self, Tool);
end;

procedure TClusteringDemo.CB3DChange(Sender: TObject);
begin
  Series1.Visible:=not CB3D.IsChecked;
  Series2.Visible:=CB3D.IsChecked;

  Chart1.View3D:=CB3D.IsChecked;
  Tool.Series:=SelectedSeries;
end;

procedure TClusteringDemo.CBCentersClick(Sender: TObject);
begin
  Tool.Centers.Visible:=CBCenters.IsChecked;
end;

procedure TClusteringDemo.AddClustersToTree;
begin
  FillTree(Tool.Clusters, Tool.Method<>cmHierarchical);
end;

procedure TClusteringDemo.CBCentroidClick(Sender: TObject);
begin
  Tool.Centroids.Visible:=CBCentroid.IsChecked;
end;

procedure TClusteringDemo.CBColorizeChange(Sender: TObject);
begin
  Tool.ColorEach:=CBColorize.IsChecked;
end;

procedure TClusteringDemo.CBViewClustersChange(Sender: TObject);
begin
  Tool.ShowBounds:=CBViewClusters.IsChecked;
end;

procedure TClusteringDemo.Chart1AfterDraw(Sender: TObject);
var Cluster : TCluster;
    Points  : TPointArray;
    R       : TRect;
begin
  if TreeView1.Selected<>nil then
  begin
    Chart1.Canvas.Brush.Kind:=TBrushKind.{$IFDEF D20}None{$ELSE}bkNone{$ENDIF};
    Chart1.Canvas.Pen.Width:=3;
    Chart1.Canvas.Pen.Color:=claBlack;

    Cluster:=TCluster(TreeView1.Selected.TagObject);

    if Cluster.Count=0 then
    begin
       R.Left:=SelectedSeries.CalcXPosValue(Tool.Data(Cluster).X)-4;
       R.Right:=R.Left+8;

       R.Top:=SelectedSeries.CalcYPosValue(Tool.Data(Cluster).Y)-4;
       R.Bottom:=R.Top+8;

       Chart1.Canvas.EllipseWithZ(R,0);
    end
    else
    begin
      Tool.GetClusterPoints(Cluster, Points);
      Chart1.Canvas.ConvexHull(Points);
      Chart1.Canvas.PolygonWithZ(Points,0);
      Points:=nil;
    end;
  end;
end;

procedure TClusteringDemo.Chart1Enter(Sender: TObject);
begin
  Chart1.Title.Font.Style:=[TFontStyle.fsBold];
end;

procedure TClusteringDemo.Chart1Exit(Sender: TObject);
begin
  Chart1.Title.Font.Style:=[];
end;

procedure TClusteringDemo.Chart1MouseDown(Sender: TObject; Button: TMouseButton;
  Shift: TShiftState; X, Y: Single);
begin
  Chart1.SetFocus;
end;

procedure TClusteringDemo.Chart1MouseWheel(Sender: TObject; Shift: TShiftState;
  WheelDelta: Integer; var Handled: Boolean);
begin
  if Chart1.Panning.MouseWheel=pmwNone then
  begin
    with Chart1.View3DOptions do
         ZoomFloat:=ZoomFloat+WheelDelta*ZoomFloat*0.0001;

    Handled:=True;
  end;
end;

procedure TClusteringDemo.CheckBox1Change(Sender: TObject);
var tmp : Integer;
begin
  if CheckBox1.IsChecked then
     tmp:=TTeeCPU.NumberOfProcessors
  else
     tmp:=1;

  Tool.KMeans.Threads:=tmp;
  Tool.Hierarchical.Threads:=tmp;
  Tool.QTClustering.Threads:=tmp;
end;

procedure TClusteringDemo.CBDataChange(Sender: TObject);
begin
  TreeView1.Clear;

  Tool.Clear;

  LRandom.Enabled:=(CBData.ItemIndex=CBData.Items.Count-1);
  ERandom.Enabled:=LRandom.Enabled;
  BRandom.Enabled:=LRandom.Enabled;

  if CBData.ItemIndex=(CBData.Items.Count-1) then
     AddRandomData
  else
     LoadIrisData(CBData.ItemIndex);
end;

procedure TClusteringDemo.LBMethodClick(Sender: TObject);
begin
  Tool.Method:=TClusteringMethod(LBMethod.ItemIndex);

  AddClustersToTree;
end;

procedure TClusteringDemo.TreeView1Click(Sender: TObject);
begin
  Chart1.Invalidate;
end;

procedure TClusteringDemo.TreeView1Change(Sender: TObject);
begin
  with Tool.GetStats(TCluster(TreeView1.Selected.TagObject)) do
     StatusText.Text:='CoVariance: '+FloatToStr(CoVariance)+
                      ' Correlation: '+FloatToStr(Correlation)+
                      ' Sum of Squares: '+FloatToStr(SumOfSquares);

  Chart1.Invalidate;
end;

procedure TClusteringDemo.FormCreate(Sender: TObject);
begin
  LoadIrisData(0);
  Chart1.Axes.Bottom.LabelStyle:=talValue;

  Chart1.View3DOptions.Perspective:=90;
  Chart1.Chart3DPercent:=100;
  Chart1.Walls.Left.AutoHide:=True;
  Series2.Pointer.Depth:=4;

  Chart1.Panning.MouseWheel:=pmwNone;

  Tool:=TClusteringTool.Create(Self);
  Tool.Name:='ClusteringTool1';
  Tool.ParentChart:=Chart1;
  Tool.Series:=Series1;

  LBMethod.ItemIndex:=0;

  BExecuteClick(Self);
end;

initialization
  RegisterClass(TClusteringDemo);
end.
