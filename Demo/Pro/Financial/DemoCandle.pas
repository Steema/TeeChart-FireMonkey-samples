unit DemoCandle;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Series.OHLC, FMXTee.Series.Candle, FMXTee.Procs,
  FMXTee.Chart, FMX.ListBox;

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
    procedure CheckBox1Change(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
    procedure FormCreate(Sender: TObject);
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

procedure TDemoCandleSeries.ComboBox1Change(Sender: TObject);
begin
  if ComboBox1.ItemIndex<>-1 then
     Series1.CandleStyle:=TCandleStyle(ComboBox1.ItemIndex);
end;

procedure TDemoCandleSeries.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues;
end;

initialization
  RegisterClass(TDemoCandleSeries);
end.
