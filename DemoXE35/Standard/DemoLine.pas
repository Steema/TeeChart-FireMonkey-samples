unit DemoLine;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Procs, FMXTee.Chart, FMX.StdCtrls;

type
  TDemoLine = class(TBaseForm)
    Chart1: TChart;
    Series1: TLineSeries;
    Series2: TLineSeries;
    CheckBox1: TCheckBox;
    CBSmooth: TCheckBox;
    CheckBox3: TCheckBox;
    CheckBox4: TCheckBox;
    CheckBox5: TCheckBox;
    CheckBox6: TCheckBox;
    CheckBox7: TCheckBox;
    procedure CheckBox1Change(Sender: TObject);
    procedure CBSmoothChange(Sender: TObject);
    procedure CheckBox3Change(Sender: TObject);
    procedure CheckBox4Change(Sender: TObject);
    procedure CheckBox5Change(Sender: TObject);
    procedure CheckBox6Change(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure CheckBox7Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TDemoLine.CheckBox1Change(Sender: TObject);
begin
  Series1.Stairs:=CheckBox1.IsChecked;
  Series2.Stairs:=Series1.Stairs;
end;

procedure TDemoLine.CBSmoothChange(Sender: TObject);
begin
  {$IFNDEF TEELITEEMB}
  Series1.Smoothed:=CBSmooth.IsChecked;
  Series2.Smoothed:=Series1.Smoothed;
  {$ENDIF}
end;

procedure TDemoLine.CheckBox3Change(Sender: TObject);
begin
  Series1.Marks.Visible:=CheckBox3.IsChecked;
  Series2.Marks.Visible:=Series1.Marks.Visible;
end;

procedure TDemoLine.CheckBox4Change(Sender: TObject);
begin
  Series1.OutLine.Visible:=CheckBox4.IsChecked;
  Series2.OutLine.Visible:=Series1.OutLine.Visible;
end;

procedure TDemoLine.CheckBox5Change(Sender: TObject);
begin
  Chart1.View3D:=CheckBox5.IsChecked;
end;

procedure TDemoLine.CheckBox6Change(Sender: TObject);
begin
  if CheckBox6.IsChecked then
     Series1.Stacked:=cssStack
  else
     Series1.Stacked:=cssNone;

  Series2.Stacked:=Series1.Stacked;
end;

procedure TDemoLine.CheckBox7Change(Sender: TObject);
begin
  Series1.Pointer.Visible:=CheckBox7.IsChecked;
  Series2.Pointer.Visible:=Series1.Pointer.Visible;
end;

procedure TDemoLine.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues();
  Series2.FillSampleValues();

  // Some null values:

  Series1.SetNull(12);
  Series1.SetNull(16);
  Series2.SetNull(3);
  Series2.SetNull(9);

  {$IFDEF TEELITEEMB}
  CBSmooth.Visible:=False;
  {$ENDIF}
end;

initialization
  RegisterClass(TDemoLine);
end.
