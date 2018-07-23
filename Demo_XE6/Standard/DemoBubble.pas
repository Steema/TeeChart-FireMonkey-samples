unit DemoBubble;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base, FMXTee.Engine,
  FMXTee.Series, FMXTee.Series.Bubble, FMXTee.Procs, FMXTee.Chart, FMX.StdCtrls;

type
  TBubbleSeriesDemo = class(TBaseForm)
    Chart1: TChart;
    Series1: TBubbleSeries;
    CheckBox1: TCheckBox;
    procedure FormCreate(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

procedure TBubbleSeriesDemo.CheckBox1Change(Sender: TObject);
begin
  inherited;
  Series1.Marks.Visible:=CheckBox1.IsChecked;
end;

procedure TBubbleSeriesDemo.FormCreate(Sender: TObject);
begin
  inherited;
  Series1.FillSampleValues();

  Chart1.Axes.Bottom.MinimumOffset:=35;
  Chart1.Axes.Bottom.MaximumOffset:=35;
end;

initialization
  RegisterClass(TBubbleSeriesDemo);
end.
