unit DemoFunctionsGallery;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs;

type
  TFunctionsGalleryDemos = class(TForm)
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Editor.Stroke, FMXTee.Editor.Functions.Gallery;

procedure TFunctionsGalleryDemos.FormCreate(Sender: TObject);
var Demo : TFunctionsGallery;
begin
  Demo:=TFunctionsGallery.Create(Self);
  Demo.PanelButtons.Visible:=False;
  EmbeddForm(Demo,Self);
end;

initialization
  RegisterClass(TFunctionsGalleryDemos);
end.
