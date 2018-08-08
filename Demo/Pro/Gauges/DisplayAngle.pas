unit DisplayAngle;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  {$IFDEF D21}
  FMX.SpinBox,
  {$ENDIF}
  FMX.StdCtrls, Base, FMXTee.Engine, FMXTee.Gauges.Numeric,
  FMXTee.Gauges.Linear, FMXTee.Gauges.Circular, FMXTee.Procs, FMXTee.Chart,
  FMX.Edit;

type
  TDisplayAngleForm = class(TBaseForm)
    Chart1: TChart;
    Series1: TCircularGauge;
    UDDisplayTotalAngle: TSpinBox;
    Label1: TLabel;
    UDDisplayRotationAngle: TSpinBox;
    Label3: TLabel;
    Label4: TLabel;
    UDTotalAngle: TSpinBox;
    Label5: TLabel;
    UDRotationAngle: TSpinBox;
    Timer1: TTimer;
    procedure FormShow(Sender: TObject);
    procedure UDDisplayTotalAngleChange(Sender: TObject);
    procedure UDDisplayRotationAngleChange(Sender: TObject);
    procedure UDTotalAngleChange(Sender: TObject);
    procedure UDRotationAngleChange(Sender: TObject);
    procedure Timer1Timer(Sender: TObject);
  private
    { Private declarations }
    up : Boolean;
  public
    { Public declarations }
  end;

var
  DisplayAngleForm: TDisplayAngleForm;

implementation

uses System.UIConsts, FMXTee.Canvas;

{$R *.fmx}

procedure TDisplayAngleForm.FormShow(Sender: TObject);
begin
  inherited;

  up := True;

  UDDisplayTotalAngle.Value := Series1.DisplayTotalAngle;
  UDDisplayRotationAngle.Value := Series1.DisplayRotationAngle;
  UDTotalAngle.Value := round(Series1.TotalAngle);
  UDRotationAngle.Value := round(Series1.RotationAngle);

  with Series1 do
  begin
    DisplayTotalAngle := 200;
    DisplayRotationAngle := -100;
    TotalAngle := 178;
    RotationAngle := 90;
    Value := 1;
    Axis.LabelsFont.Size := 12;
    Axis.Axis.Visible := false;
    Axis.LabelsFont.Color := claGray;
    Axis.LabelsAngle := 90;
    Face.Color := RGB(255,255,192);
    Face.Gradient.Visible := false;
    Frame.Width := 5;
    Hand.Distance := 20;
  end;

  Timer1.Enabled := true;
end;

procedure TDisplayAngleForm.Timer1Timer(Sender: TObject);
begin
  if ((Round(Series1.Value) = 100) or (Round(Series1.Value) = 0.0)) then
     up := not up;

  if up then
     Series1.Value := Series1.Value + 1
  else
     Series1.Value := Series1.Value - 1;
end;

procedure TDisplayAngleForm.UDDisplayRotationAngleChange(Sender: TObject);
begin
  Series1.DisplayRotationAngle := Round(UDDisplayRotationAngle.Value);
end;

procedure TDisplayAngleForm.UDDisplayTotalAngleChange(Sender: TObject);
begin
  Series1.DisplayTotalAngle := Round(UDDisplayTotalAngle.Value);
end;

procedure TDisplayAngleForm.UDRotationAngleChange(Sender: TObject);
begin
  Series1.RotationAngle := UDRotationAngle.Value;
end;

procedure TDisplayAngleForm.UDTotalAngleChange(Sender: TObject);
begin
  Series1.TotalAngle := UDTotalAngle.Value;
end;

initialization
  RegisterClass(TDisplayAngleForm);
end.
