unit DemoPrint;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMXTee.Series, FMXTee.Print.PreviewPanel;

type
  TPrintDemo = class(TBaseForm)
    Chart1: TChart;
    Splitter1: TSplitter;
    Series1: TPieSeries;
    Button1: TButton;
    TeePreviewPanel1: TTeePreviewPanel;
    procedure FormCreate(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure BEditClick(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Print.Preview;

procedure TPrintDemo.BEditClick(Sender: TObject);
begin
  inherited;
  TeePreviewPanel1.Invalidate;
end;

procedure TPrintDemo.Button1Click(Sender: TObject);
begin
  TChartPreview.Preview(Self, Chart1);
end;

procedure TPrintDemo.FormCreate(Sender: TObject);
begin
  inherited;

  Series1.FillSampleValues;
  TeePreviewPanel1.DragImage:=True;
end;

initialization
  RegisterClass(TPrintDemo);
end.
