unit DemoToolsGallery;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Tools, FMXTee.Series, FMXTee.Procs, FMXTee.Chart, FMX.Objects,
  FMXTee.Tools.GalleryDemos, FMXTee.Tools.Gallery;

type
  TDemoTools = class(TBaseForm)
    procedure FormCreate(Sender: TObject);
    procedure BEditClick(Sender: TObject);
  private
    { Private declarations }
    Demo : TToolsGallery;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Editor.Stroke, FMXTee.Editor.Chart;

procedure TDemoTools.BEditClick(Sender: TObject);
begin
  TChartEditForm.Edit(Self,Demo.FindDemoChart);
end;

procedure TDemoTools.FormCreate(Sender: TObject);
begin
  inherited;

  Demo:=TToolsGallery.CreateEditor(Self);
  Demo.PanelButtons.Visible:=False;
  EmbeddForm(Demo,Self);
end;

initialization
  RegisterClass(TDemoTools);
end.
