unit Unit13;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs,
  FMX.Controls.Presentation, FMX.StdCtrls, FMXTee.Engine, FMXTee.Procs,
  FMXTee.Chart, FMXTee.Series;

type
  TForm13 = class(TForm)
    Chart1: TChart;
    Button1: TButton;
    Series1: TBarSeries;
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form13: TForm13;

implementation

{$R *.fmx}

uses
  FMX.Platform, FMX.Clipboard, FMX.Surfaces;

procedure TForm13.Button1Click(Sender: TObject);
var Clipboard : IFMXExtendedClipboardService;
    b : TBitmap;
    s : TBitmapSurface;
begin
  if TPlatformServices.Current.SupportsPlatformService(IFMXExtendedClipboardService, IInterface(Clipboard)) then
  begin
    b:=Chart1.TeeCreateBitmap;
    s:=TBitmapSurface.Create;
    try
      s.Assign(b);
      Clipboard.SetImage(s);
    finally
      s.Free;
      b.Free;
    end;
  end;
end;

end.
