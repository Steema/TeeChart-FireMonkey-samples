unit Demo_Chart3D;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMXTee.Series, FMXTee.Engine,
  FMX.Types3D, FMXTee.Procs, FMXTee.Chart, FMXTee.Chart3D, FMX.Edit,
  FMXTee.Editor.Chart3D;

type
  TDemoChart3D = class(TForm)
    Panel1: TPanel;
    Viewport3D1: TViewport3D;
    Chart3DChart1: TChart;
    Chart3D1: TChart3D;
    Light1: TLight;
    Series1: TBarSeries;
    Series2: TLineSeries;
    Button1: TButton;
    Button2: TButton;
    Label1: TLabel;
    ComboTrackBar1: TComboTrackBar;
    procedure Button1Click(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
    procedure ComboTrackBar1Change(Sender: TObject);
  private
    { Private declarations }
    Navigator : TMouse3D;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Editor.Chart;

procedure TDemoChart3D.Button1Click(Sender: TObject);
begin
  TChartEditForm.Edit(Self, Chart3D1.Chart);
end;

procedure TDemoChart3D.Button2Click(Sender: TObject);
begin
  Navigator.Free;

  TChart3DEditor.Edit(Self, Chart3D1);

  Navigator:=TMouse3D.Create(Chart3D1);
end;

type
  TChart3DAccess=class(TChart3D);

procedure TDemoChart3D.ComboTrackBar1Change(Sender: TObject);
begin
  TChart3DAccess(Chart3D1).FontDepth:=ComboTrackBar1.Value;
end;

procedure TDemoChart3D.FormCreate(Sender: TObject);
begin
  Chart3D1[0].FillSampleValues;
  Chart3D1[1].FillSampleValues;

  Navigator:=TMouse3D.Create(Chart3D1);
end;

procedure TDemoChart3D.FormDestroy(Sender: TObject);
begin
  Navigator.Free;
end;

initialization
  RegisterClass(TDemoChart3D);
end.
