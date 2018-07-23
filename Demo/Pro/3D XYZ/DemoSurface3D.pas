unit DemoSurface3D;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series.Surface, FMX.Types3D, FMXTee.Procs, FMXTee.Chart, FMXTee.Chart3D;

type
  TDemoSurface3DSeries = class(TBaseForm)
    Viewport3D1: TViewport3D;
    Chart3DChart1: TChart;
    Chart3D1: TChart3D;
    Light1: TLight;
    Series1: TSurfaceSeries;
    Light2: TLight;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Editor.Chart3D;

procedure TDemoSurface3DSeries.FormCreate(Sender: TObject);
begin
  inherited;

  Series1.FillSampleValues;

  TMouse3D.Create(Chart3D1);
end;

initialization
  RegisterClass(TDemoSurface3DSeries);
end.
