unit DemoWorld;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series.Surface, FMXTee.Series.Map, FMXTee.Series.World, FMXTee.Procs,
  FMXTee.Chart, FMX.Objects, FMX.StdCtrls, FMXTee.Canvas, FMX.ListBox,
  FMXTee.Tools;

type
  TDemoWorldSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TWorldSeries;
    Text1: TText;
    Label1: TLabel;
    ComboBox1: TComboBox;
    ChartTool1: TMarksTipTool;
    CheckBox1: TCheckBox;
    procedure FormCreate(Sender: TObject);
    procedure Chart1MouseMove(Sender: TObject; Shift: TShiftState; X,
      Y: Single);
    procedure Series1Click(Sender: TChartSeries; ValueIndex: Integer;
      Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
    procedure ComboBox1Change(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoWorldSeries.Chart1MouseMove(Sender: TObject; Shift: TShiftState;
  X, Y: Single);
var tmp : Integer;
begin
  inherited;

  tmp:=Series1.Clicked(Round(X),Round(Y));

  if tmp=-1 then
     Text1.Text:=''
  else
     Text1.Text:=Series1.XLabel[tmp]+' '+Series1.YValueToText(Series1.ZValue[tmp]);
end;

procedure TDemoWorldSeries.CheckBox1Change(Sender: TObject);
begin
  Series1.Flags.Visible:=CheckBox1.IsChecked;
end;

procedure TDemoWorldSeries.ComboBox1Change(Sender: TObject);
begin
  Series1.Map:=TWorldMap(ComboBox1.ItemIndex);

  Series1.FillSampleValues;

  Chart1.Title.Caption:=ComboBox1.Selected.Text;
end;

procedure TDemoWorldSeries.FormCreate(Sender: TObject);
begin
  inherited;

  ComboBox1.Clear;

  ComboBox1.Items.Add('World');
  ComboBox1.Items.Add('Africa');
  ComboBox1.Items.Add('Asia');
  ComboBox1.Items.Add('Australia');
  ComboBox1.Items.Add('Central America');
  ComboBox1.Items.Add('Europe');
  ComboBox1.Items.Add('Europe 15');
  ComboBox1.Items.Add('Europe 27');
  ComboBox1.Items.Add('Spain');
  ComboBox1.Items.Add('Middle East');
  ComboBox1.Items.Add('North America');
  ComboBox1.Items.Add('South America');
  ComboBox1.Items.Add('USA');
  ComboBox1.Items.Add('USA Hawaii Alaska');
  ComboBox1.Items.Add('Eurasia');
  ComboBox1.Items.Add('UK');
  ComboBox1.Items.Add('Germany');
  ComboBox1.Items.Add('USA Counties');
  ComboBox1.Items.Add('USA Alaska Counties');
  ComboBox1.Items.Add('Japan');
  ComboBox1.Items.Add('China');
  ComboBox1.Items.Add('France');

  ComboBox1.ItemIndex:=12;
end;

procedure TDemoWorldSeries.Series1Click(Sender: TChartSeries;
  ValueIndex: Integer; Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
var Gradient : TTeeGradient;
begin
  if (Button=TMouseButton.mbLeft) and (ValueIndex<>-1) then
  begin
    Gradient:=Series1.Shapes[ValueIndex].Gradient;
    Gradient.Visible:=not Gradient.Visible;
  end;
end;

initialization
  RegisterClass(TDemoWorldSeries);
end.
