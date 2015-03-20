unit ServerStatus;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMX.Layouts, FMXTee.URL, FMXTee.Animations.Tools,
  FMXTee.Series, FMXTee.Series.Calendar, FMX.StdCtrls;

type
  TServerStatusForm = class(TForm)
    GridPanelLayout1: TGridPanelLayout;
    Chart1: TChart;
    Chart2: TChart;
    Chart3: TChart;
    ImportChart1: TImportChart;
    Series3: TCalendarSeries;
    procedure FormCreate(Sender: TObject);
    procedure Series3Change(Sender: TCalendarSeries; var Value: TDateTime);
  private
    { Private declarations }
  public
    { Public declarations }
   Anim1 : TSeriesAnimationTool;
   Anim2 : TSeriesAnimationTool;
  end;

var
  ServerStatusForm: TServerStatusForm;

implementation

{$R *.fmx}

procedure TServerStatusForm.FormCreate(Sender: TObject);
begin
  Series3.Pen.Visible := false;
  Series3.WeekDays.Pen.Visible := false;
  Series3.Today.Pen.Visible := false;
  Series3.Sunday.Pen.Visible := false;
  Series3.WeekDays.Color := TAlphaColorRec.Coral;
  Series3.Today.Color := TAlphaColorRec.Darkred;
  Series3.WeekDays.Shadow.Visible:=false;

  Anim1:=TSeriesAnimationTool.Create(Self);
  Anim2:=TSeriesAnimationTool.Create(Self);

  Chart1.Animations.Add(Anim1);
  Chart3.Animations.Add(Anim2);
  Anim1.StartAtMin:=False;
  Anim2.StartAtMin:=False;
  Anim1.Series:= Chart1[1];
end;

procedure TServerStatusForm.Series3Change(Sender: TCalendarSeries;
  var Value: TDateTime);
begin
  // Random values for axTChart1
  Randomize;
  Chart1[1].XValue[0]:=Random(100);
  Chart1[1].XValue[1]:=Random(100);
  Chart1[1].XValue[2]:=Random(100);
  Chart1[1].XValue[3]:=Random(100);
  Chart1[1].XValue[4]:=Random(100);

  // Random values for axTChart3
  Chart3[0].XValue[0] := Random(1000);
  Chart3[1].XValue[0] := Random(1000);
  Chart3[2].XValue[0] := Random(1000);
  Chart3[0].XValue[0] := Random(1000);
  Chart3[1].XValue[0] := Random(1000);
  Chart3[2].XValue[0] := Random(1000);
  Chart3[0].XValue[0] := Random(1000);
  Chart3[1].XValue[0] := Random(1000);
  Chart3[2].XValue[0] := Random(1000);

  Anim1.Play;
  Anim2.Play;
end;

end.
