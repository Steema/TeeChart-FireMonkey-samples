unit DemoHorizBar;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Procs, FMXTee.Chart, FMX.ListBox, FMX.StdCtrls;

type
  THorizBarDemo = class(TBaseForm)
    Chart1: TChart;
    Series1: THorizBarSeries;
    Series3: THorizBarSeries;
    Series2: THorizBarSeries;
    ComboBox1: TComboBox;
    ListBoxItem1: TListBoxItem;
    ListBoxItem2: TListBoxItem;
    ListBoxItem3: TListBoxItem;
    ListBoxItem4: TListBoxItem;
    ListBoxItem5: TListBoxItem;
    ListBoxItem6: TListBoxItem;
    procedure FormCreate(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure THorizBarDemo.ComboBox1Change(Sender: TObject);
begin
  inherited;
  Series1.MultiBar:=TMultiBar(ComboBox1.ItemIndex);
end;

procedure THorizBarDemo.FormCreate(Sender: TObject);
begin
  inherited;
  Chart1.SeriesList.FillSampleValues(4);
end;

initialization
  RegisterClass(THorizBarDemo);
end.
