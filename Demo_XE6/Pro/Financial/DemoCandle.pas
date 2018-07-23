unit DemoCandle;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  {$IFNDEF UPTOXE3}
  FMX.StdCtrls,
  {$ENDIF}
  Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Series.OHLC, FMXTee.Series.Candle, FMXTee.Procs,
  FMXTee.Chart, FMX.ListBox, FMXTee.Tools;

type
  TDemoCandleSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TCandleSeries;
    CheckBox1: TCheckBox;
    ComboBox1: TComboBox;
    ListBoxItem1: TListBoxItem;
    ListBoxItem2: TListBoxItem;
    ListBoxItem3: TListBoxItem;
    ListBoxItem4: TListBoxItem;
    Series2: TVolumeSeries;
    CheckBox2: TCheckBox;
    ChartTool1: TMarksTipTool;
    procedure CheckBox1Change(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure CheckBox2Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoCandleSeries.CheckBox1Change(Sender: TObject);
begin
  Series1.Draw3D:=CheckBox1.IsChecked;
end;

procedure TDemoCandleSeries.CheckBox2Change(Sender: TObject);
begin
  Chart1.View3D:=CheckBox2.IsChecked;

  CheckBox1.Enabled:=Chart1.View3D;
end;

procedure TDemoCandleSeries.ComboBox1Change(Sender: TObject);
begin
  if ComboBox1.ItemIndex<>-1 then
     Series1.CandleStyle:=TCandleStyle(ComboBox1.ItemIndex);
end;

procedure TDemoCandleSeries.FormCreate(Sender: TObject);
begin
  inherited;

  Series1.FillSampleValues;

  Series2.FillSampleValues;

  Chart1.Axes.Right.Maximum:=Series2.YValues.MaxValue*4;
end;

initialization
  RegisterClass(TDemoCandleSeries);
end.
