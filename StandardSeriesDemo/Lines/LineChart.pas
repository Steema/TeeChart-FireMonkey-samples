unit LineChart;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Editor.Pro,
  FMXTee.Chart, FMXTee.URL, FMXTee.Engine, FMXTee.Procs,
  FMXTee.Animations.Tools, FMXTee.Tools, FMXTee.Series;

type
  TLineChartForm = class(TForm)
    Chart1: TChart;
    ImportChart1: TImportChart;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  LineChartForm: TLineChartForm;

implementation

{$R *.fmx}

procedure TLineChartForm.FormCreate(Sender: TObject);
begin
//
end;

end.
