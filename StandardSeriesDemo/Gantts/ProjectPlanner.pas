unit ProjectPlanner;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Chart,
  FMXTee.URL, FMXTee.Engine, FMXTee.Procs, FMXTee.Tools.DragPoint,
  FMXTee.Series, FMXTee.Series.Gantt, FMXTee.Tools.Gantt;

type
  TProjectPlannerForm = class(TForm)
    Chart1: TChart;
    ImportChart1: TImportChart;
    ChartTool1: TGanttTool;
    procedure FormCreate(Sender: TObject);
    procedure Series0GetMarkText(Sender: TChartSeries; ValueIndex: Integer;
      var MarkText: string);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  ProjectPlannerForm: TProjectPlannerForm;

implementation

uses
  FMXTee.Themes;

{$R *.fmx}

procedure TProjectPlannerForm.FormCreate(Sender: TObject);
begin
    Chart1.Gradient.Visible := false;

    Chart1[0].Clear;
    (Chart1[0] as  TGanttSeries).AddGantt( StrToDate('21/05/2012'), StrToDate('29/05/2012') ,0, 'Production' );
    (Chart1[0] as  TGanttSeries).AddGantt( StrToDate('03/09/2012'), StrToDate('10/11/2012'), 1, 'Marketing');
    (Chart1[0] as  TGanttSeries).AddGantt( StrToDate('13/03/2012'), StrToDate('31/03/2012'), 2, 'Approve');
    (Chart1[0] as  TGanttSeries).AddGantt( StrToDate('07/06/2012'), StrToDate('05/07/2012'), 3, 'Prototype' );
    (Chart1[0] as  TGanttSeries).AddGantt( StrToDate('11/10/2012'), StrToDate('05/11/2012'), 4, 'Evaluation');
    (Chart1[0] as  TGanttSeries).AddGantt( StrToDate('02/04/2012'), StrToDate('29/04/2012'), 5, 'Design');
    (Chart1[0] as  TGanttSeries).AddGantt( StrToDate('01/09/2012'), StrToDate('07/11/2012'), 2, 'Testing');

    (Chart1[0] as  TGanttSeries).Pointer.Style := psRectangle;
    (Chart1[0] as  TGanttSeries).Pointer.Shadow.Visible := false;

    (Chart1[0] as  TGanttSeries).Pointer.VertSize := 25;
    (Chart1[0] as  TGanttSeries).Pointer.Shadow.Visible := true;

    Chart1.AllowZoom := False;
end;

procedure TProjectPlannerForm.Series0GetMarkText(Sender: TChartSeries;
  ValueIndex: Integer; var MarkText: string);
begin
    // Add custom data to display at each gantt bar, for example: "Completion %"
    case ValueIndex of
        0: markText := '20 %';
        1: markText := '40 %';
        2: markText := '10 %';
        3: markText := '75 %';
        4: markText := '55 %';
        5: markText := '60 %';
        6: markText := '25 %';
    end;
end;

end.
