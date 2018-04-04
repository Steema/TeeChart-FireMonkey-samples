unit DemoBar;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMXTee.Engine, FMXTee.Series,
  FMXTee.Procs, FMXTee.Chart, Base, FMX.ListBox;

type
  TDemoBarSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TBarSeries;
    Series2: TBarSeries;
    ComboBox1: TComboBox;
    ListBoxItem1: TListBoxItem;
    ListBoxItem2: TListBoxItem;
    ListBoxItem3: TListBoxItem;
    ListBoxItem4: TListBoxItem;
    ListBoxItem5: TListBoxItem;
    ListBoxItem6: TListBoxItem;
    ComboBox2: TComboBox;
    ListBoxItem7: TListBoxItem;
    ListBoxItem8: TListBoxItem;
    ListBoxItem9: TListBoxItem;
    ListBoxItem10: TListBoxItem;
    procedure FormCreate(Sender: TObject);
    procedure ComboBox1Change(Sender: TObject);
    procedure ComboBox2Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoBarSeries.ComboBox1Change(Sender: TObject);
begin
  Series1.MultiBar:=TMultiBar(ComboBox1.ItemIndex);
end;

procedure TDemoBarSeries.ComboBox2Change(Sender: TObject);
begin
  inherited;

  case ComboBox2.ItemIndex of
    0: begin
         Series1.BarStyle:=bsRectangle;
         Series2.BarStyle:=bsRectangle;
       end;
    1: begin
         Series1.BarStyle:=bsCylinder;
         Series2.BarStyle:=bsCylinder;
       end;
    2: begin
         Series1.BarStyle:=bsPyramid;
         Series2.BarStyle:=bsPyramid;
       end;
    3: begin
         Series1.BarStyle:=bsCone;
         Series2.BarStyle:=bsCone;
       end;
  end;
end;

procedure TDemoBarSeries.FormCreate(Sender: TObject);
begin
  Series1.FillSampleValues();
  Series2.FillSampleValues();
end;

initialization
  RegisterClass(TDemoBarSeries);
end.
