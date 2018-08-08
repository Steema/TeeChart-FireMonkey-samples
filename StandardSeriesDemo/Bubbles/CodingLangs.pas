unit CodingLangs;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMXTee.Series.Surface, FMXTee.Animations.Tools;

type
  TCodingLangsForm = class(TForm)
    Chart1: TChart;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  CodingLangsForm: TCodingLangsForm;

implementation

{$R *.fmx}

procedure TCodingLangsForm.FormCreate(Sender: TObject);
begin
  (Chart1[0] as TBubbleCloudSeries).Pen.Color := TAlphaColorRec.Lightgray;
  Chart1.Legend.Alignment := laBottom;
  Chart1.Legend.Shadow.Visible:=False;
end;

end.
