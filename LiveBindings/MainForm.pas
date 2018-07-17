unit MainForm;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMXTee.Engine, FMXTee.Series,
  FMXTee.Procs, FMXTee.Chart, Data.Bind.EngExt, Fmx.Bind.DBEngExt, System.Rtti,
  System.Bindings.Outputs, Data.Bind.Components, Data.Bind.DBScope, Data.DB,
  Datasnap.DBClient, FMX.TabControl, FMX.Objects, FMX.Ani, FMX.Types3D,
  FMXTee.Chart3D, Data.Bind.DBLinks, FMXTee.Bind.DBLinks, FMX.ListBox,
  FMX.Layouts, System.Math.Vectors, Fmx.Bind.Editors, FMX.Controls.Presentation,
  FMX.StdCtrls, FMX.Controls3D, FMX.Viewport3D;

// This demo is zero-code.
// To Live Bind a TChart or TChart3D by code:
{
var b : TBindDBChartLink;

  b:=TBindDBChartLink.Create(Self);
  b.DataSource:=BindScopeDB1;
  b.Chart:=Chart1;
  b.Active:=True;
}

type
  TTeeChartDBLinkDemo = class(TForm)
    BindScopeDB1: TBindScopeDB;
    ClientDataSet1: TClientDataSet;
    DataSource1: TDataSource;
    TabControl1: TTabControl;
    TabItem1: TTabItem;
    TabItem2: TTabItem;
    Chart1: TChart;
    Panel1: TPanel;
    Chart2: TChart;
    Image1: TImage;
    Image2: TImage;
    TabItem3: TTabItem;
    Viewport3D1: TViewport3D;
    Chart3DChart1: TChart;
    Chart3D1: TChart3D;
    Light1: TLight;
    ColorAnimation1: TColorAnimation;
    Light3: TLight;
    BindingsList1: TBindingsList;
    BindDBChartLinkChart11: TBindDBChartLink;
    BindDBChartLinkChart3DChart11: TBindDBChartLink;
    BindDBChartLinkChart21: TBindDBChartLink;
    TabItem4: TTabItem;
    Chart3: TChart;
    Series1: TLineSeries;
    BindListChart31: TBindList;
    procedure FormCreate(Sender: TObject);
    procedure BindDBChartLinkChart3DChart11Activated(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  TeeChartDBLinkDemo: TTeeChartDBLinkDemo;

implementation

{$R *.fmx}

procedure TTeeChartDBLinkDemo.BindDBChartLinkChart3DChart11Activated(
  Sender: TObject);
begin
  // Cosmetics
  (Chart3DChart1[0] as TBarSeries).BarStyle:=bsRoundRectangle;
  (Chart3DChart1[1] as TBarSeries).BarStyle:=bsRoundRectangle;
end;

procedure TTeeChartDBLinkDemo.FormCreate(Sender: TObject);
var b : TBindDBChartLink;
begin
  TabControl1.ActiveTab:=TabItem1;

  b:=TBindDBChartLink.Create(Self);
  b.DataSource:=BindScopeDB1;
  b.Chart:=Chart1;
  b.Active:=True;
end;

end.
