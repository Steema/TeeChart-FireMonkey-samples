unit DemoImport;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMX.StdCtrls, FMX.ListBox, FMXTee.Engine, FMXTee.Procs, FMXTee.Chart,
  FMX.Layouts, FMXTee.Import, FMX.Memo, FMX.TabControl,
  DemoImportData, FMX.Grid, FMXTee.Chart.Grid;

type
  TImportDemo = class(TForm)
    ListBox1: TListBox;
    ListBoxItem1: TListBoxItem;
    ListBoxItem2: TListBoxItem;
    ListBoxItem3: TListBoxItem;
    ListBoxItem4: TListBoxItem;
    ListBoxItem5: TListBoxItem;
    ListBoxItem6: TListBoxItem;
    ListBoxItem7: TListBoxItem;
    ListBoxItem8: TListBoxItem;
    ListBoxItem9: TListBoxItem;
    DataImport1: TDataImport;
    TabControl1: TTabControl;
    TabItem1: TTabItem;
    TabItem2: TTabItem;
    Chart1: TChart;
    Memo1: TMemo;
    ChartGrid1: TChartGrid;
    Column1: TColumn;
    Column2: TColumn;
    procedure ListBox1Change(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
  private
    { Private declarations }

    DemoData: TDemoData;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses SampleData;

procedure TImportDemo.FormCreate(Sender: TObject);
begin
  DemoData:=TDemoData.Create(Self);

  ListBox1.ItemIndex:=0;
  ListBox1Change(Self);
end;

procedure TImportDemo.FormDestroy(Sender: TObject);
begin
  DemoData.Free;
end;

procedure TImportDemo.ListBox1Change(Sender: TObject);
begin
  case ListBox1.ItemIndex of
    0: DataImport1.Import(DemoData.MemoCSV.Lines);
    1: DataImport1.Import(DemoData.MemoXML.Lines);
    2: DataImport1.Import(DemoData.MemoJSON.Lines);
    3: DataImport1.Import(DataModule1.ClientDataset1);
    4: DataImport1.Import(DemoData.MemoHTML.Lines);
    5: DataImport1.Import(DemoData.MyArray);
    6: DataImport1.Import(TValue.From(DemoData.PersonsArray));
    7: DataImport1.Import(TValue.From(DemoData.Persons));
    8: DataImport1.Import(TValue.From(DemoData.PersonsCollection));
  end;
end;

initialization
  RegisterClass(TImportDemo);
end.
