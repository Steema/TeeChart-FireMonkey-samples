unit DemoArea;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMXTee.Engine, FMXTee.Series,
  FMXTee.Procs, FMXTee.Chart, FMX.ListBox, Base, FMX.Colors, FMX.StdCtrls;

type
  TDemoAreaSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TAreaSeries;
    Series2: TAreaSeries;
    Series3: TAreaSeries;
    ComboBox1: TComboBox;
    ListBoxItem1: TListBoxItem;
    ListBoxItem2: TListBoxItem;
    ListBoxItem3: TListBoxItem;
    CheckBox1: TCheckBox;
    CheckBox2: TCheckBox;
    AlphaTrackBar1: TAlphaTrackBar;
    procedure FormCreate(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
    procedure CheckBox2Change(Sender: TObject);
    procedure AlphaTrackBar1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoAreaSeries.AlphaTrackBar1Change(Sender: TObject);
begin
  Series1.Transparency:=100-Round(AlphaTrackBar1.Value*100);
  Series2.Transparency:=Series1.Transparency;
  Series3.Transparency:=Series1.Transparency;
end;

procedure TDemoAreaSeries.CheckBox1Change(Sender: TObject);
begin
  Series1.Stairs:=CheckBox1.IsChecked;
  Series2.Stairs:=Series1.Stairs;
  Series3.Stairs:=Series1.Stairs;
end;

procedure TDemoAreaSeries.CheckBox2Change(Sender: TObject);
begin
  Chart1.View3D:=CheckBox2.IsChecked;
end;

procedure TDemoAreaSeries.ComboBox1Change(Sender: TObject);
begin
  Series1.MultiArea:=TMultiArea(ComboBox1.ItemIndex);
end;

procedure TDemoAreaSeries.FormCreate(Sender: TObject);
begin
  Chart1.SeriesList.FillSampleValues;
end;

initialization
  RegisterClass(TDemoAreaSeries);
end.
