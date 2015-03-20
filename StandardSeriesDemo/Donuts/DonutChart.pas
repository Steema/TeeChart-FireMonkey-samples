unit DonutChart;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMXTee.URL, FMXTee.Series, FMXTee.Series.Donut;

type
  TDonutChartForm = class(TForm)
    ImportChart1: TImportChart;
    Chart1: TChart;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  DonutChartForm: TDonutChartForm;

implementation

{$R *.fmx}

procedure TDonutChartForm.FormCreate(Sender: TObject);
begin
//
end;

end.
