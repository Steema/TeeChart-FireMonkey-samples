unit DemoOrganizational;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series.Organizational, FMXTee.Procs, FMXTee.Chart, FMX.StdCtrls;

type
  TDemoOrgSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TOrgSeries;
    procedure FormCreate(Sender: TObject);
    procedure Series1Click(Sender: TChartSeries; ValueIndex: Integer;
      Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoOrgSeries.FormCreate(Sender: TObject);
begin
  inherited;

  Series1.FillSampleValues;

  Series1.Cursor:=crHandPoint;
end;

procedure TDemoOrgSeries.Series1Click(Sender: TChartSeries; ValueIndex: Integer;
  Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
begin
  inherited;

  with Series1.Item[ValueIndex].Format.Gradient do
       Visible:=not Visible;
end;

initialization
  RegisterClass(TDemoOrgSeries);
end.
