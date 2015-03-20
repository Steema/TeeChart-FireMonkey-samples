unit MultiPies;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Engine,
  FMXTee.Series, FMXTee.Procs, FMXTee.Chart, FMX.Layouts, FMX.StdCtrls,
  FMXTee.URL;

type
  TMultiPiesForm = class(TForm)
    GridPanelLayout1: TGridPanelLayout;
    Chart1: TChart;
    Chart2: TChart;
    Chart3: TChart;
    Chart4: TChart;
    Chart5: TChart;
    Chart6: TChart;
    Chart7: TChart;
    ImportChart1: TImportChart;
    Label1: TLabel;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  MultiPiesForm: TMultiPiesForm;

implementation

{$R *.fmx}

procedure TMultiPiesForm.FormCreate(Sender: TObject);
begin
//
end;

end.
