unit Base;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMXTee.Chart, FMX.StdCtrls;

type
  TBaseForm = class(TForm)
    Panel1: TPanel;
    BEdit: TButton;
    procedure BEditClick(Sender: TObject);
  private
    { Private declarations }
    function Chart:TCustomChart;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Editor.Chart;

procedure TBaseForm.BEditClick(Sender: TObject);
begin
  TChartEditForm.Edit(Self, Chart);
end;

function TBaseForm.Chart: TCustomChart;
var
  t: Integer;
begin
  result:=nil;

  for t := 0 to ComponentCount-1 do
      if Components[t] is TCustomChart then
      begin
        result:=TCustomChart(Components[t]);
        break;
      end;
end;

end.
