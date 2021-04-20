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
    (Chart1[0] as  TGanttSeries).AddGantt( EncodeDate(2021,05,21), EncodeDate(2021,05,29) ,0, 'Production' );
    (Chart1[0] as  TGanttSeries).AddGantt( EncodeDate(2021,09,03), EncodeDate(2021,11,10), 1, 'Marketing');
    (Chart1[0] as  TGanttSeries).AddGantt( EncodeDate(2021,03,13), EncodeDate(2021,03,31), 2, 'Approve');
    (Chart1[0] as  TGanttSeries).AddGantt( EncodeDate(2021,06,07), EncodeDate(2021,07,05), 3, 'Prototype' );
    (Chart1[0] as  TGanttSeries).AddGantt( EncodeDate(2021,10,11), EncodeDate(2021,11,05), 4, 'Evaluation');
    (Chart1[0] as  TGanttSeries).AddGantt( EncodeDate(2021,04,02), EncodeDate(2021,04,29), 5, 'Design');
    (Chart1[0] as  TGanttSeries).AddGantt( EncodeDate(2021,09,01), EncodeDate(2021,11,07), 2, 'Testing');

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
