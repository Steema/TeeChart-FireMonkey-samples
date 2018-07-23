unit DemoFunctionsGallery;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMXTee.Editor.Functions.Gallery;

type
  TFunctionsGalleryDemos = class(TForm)
    procedure FormCreate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
  private
    { Private declarations }
    Demo : TFunctionsGallery;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Editor.Stroke;

procedure TFunctionsGalleryDemos.FormCreate(Sender: TObject);
begin
  Demo:=TFunctionsGallery.Create(Self);
  Demo.PanelButtons.Visible:=False;
  EmbeddForm(Demo,Self);
end;

procedure TFunctionsGalleryDemos.FormDestroy(Sender: TObject);
begin
  Demo.Panel1.Free;
  Demo.Free;
end;

initialization
  RegisterClass(TFunctionsGalleryDemos);
end.
