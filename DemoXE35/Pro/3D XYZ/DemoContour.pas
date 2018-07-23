unit DemoContour;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  {$IFDEF D18}
  FMX.StdCtrls,
  {$ENDIF}
  Base, FMXTee.Engine,
  FMXTee.Series.Surface, FMXTee.Procs, FMXTee.Chart;

type
  TDemoContourSeries = class(TBaseForm)
    Chart1: TChart;
    Series1: TContourSeries;
    CheckBox1: TCheckBox;
    CheckBox2: TCheckBox;
    procedure FormCreate(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
    procedure CheckBox2Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoContourSeries.CheckBox1Change(Sender: TObject);
begin
  Series1.Marks.Visible:=CheckBox1.IsChecked;
end;

procedure TDemoContourSeries.CheckBox2Change(Sender: TObject);
begin
  Series1.Smoothing.Active:=CheckBox2.IsChecked;
end;

procedure TDemoContourSeries.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues;
end;

initialization
  RegisterClass(TDemoContourSeries);
end.
