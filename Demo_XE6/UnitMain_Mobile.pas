unit UnitMain_Mobile;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs;

type
  TForm1 = class(TForm)
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.fmx}

uses
  UnitMainPro, FMXTee.Editor.Stroke;

procedure TForm1.FormCreate(Sender: TObject);
var tmp : TMainFormPro;
begin
  tmp:=TMainFormPro.Create(Self);
  tmp.showmodal;
//  EmbeddForm(tmp,Self);
end;

end.
