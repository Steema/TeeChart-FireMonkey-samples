unit Unit1;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMX.StdCtrls,
  FMX.Colors, FMX.Controls.Presentation, FMXTee.Commander, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMXTee.Series.ActivityGauge;

type
  TForm1 = class(TForm)
    Chart1: TChart;
    TeeCommander1: TTeeCommander;
    CheckBox1: TCheckBox;
    Label1: TLabel;
    BBackColor: TComboColorBox;
    procedure FormCreate(Sender: TObject);
    procedure CheckBox1Change(Sender: TObject);
    procedure BBackColorChange(Sender: TObject);
  private
    series : TActivityGauge;
  public
  end;

var
  Form1: TForm1;

implementation

{$R *.fmx}

procedure TForm1.BBackColorChange(Sender: TObject);
begin
  series.BackColor := BBackColor.Color;
end;

procedure TForm1.CheckBox1Change(Sender: TObject);
begin
  series.CenterText.Visible := CheckBox1.isChecked;
end;

procedure TForm1.FormCreate(Sender: TObject);
begin
  series := TActivityGauge.Create(self);
  Chart1.AddSeries(series);
  series.FillSampleValues(3);
  series.CenterText.Shape.Font.Color := TAlphaColors.Navy;
  series.CenterText.Shape.Font.Size := 60;
  series.CenterText.Text := inttostr(Length(series.ActivityValues));

  Chart1.Hover.Visible := false;
  Chart1.Enabled := false;

  // Setting Value and Color for each Activity
  series.ActivityValues[0].Value := 50;

  // In the case you want to set an specific color for each activity
  series.ActivityValues[0].Color := TAlphaColorRec.Blueviolet;

  // In the case you want to set specific backcolor for each activity
  series.ActivityValues[0].BackColor := TAlphaColorRec.Black;

  series.ActivityValues[1].Value := 70;
  series.ActivityValues[1].Color := TAlphaColorRec.Aquamarine;

  series.ActivityValues[2].Value := 90;
  series.ActivityValues[2].Color := TAlphaColorRec.Cadetblue;

  series.BackColor := BBackColor.Color;
end;

end.
