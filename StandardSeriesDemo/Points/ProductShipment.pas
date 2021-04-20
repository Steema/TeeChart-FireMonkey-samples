unit ProductShipment;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMXTee.Series, FMXTee.Chart.Functions,
  FMXTee.Animations.Tools;

type
  TProductShipmentForm = class(TForm)
    Chart1: TChart;
    ChartAnimation1: TTeeAnimationTool;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  ProductShipmentForm: TProductShipmentForm;

const
 Yarr1 : array[1..28] of double = (5,3,2,7,1,6,4,5,1,0,10,7,11,15,12,21,17,15,19,24,21,11,15,21,19,17,20,23);
 Yarr2 : array[1..28] of double = (7,1,5,1,0,10,6,3,2,7,11,4,5,3,4,5,1,5,11,15,16,14,14,13,12,15,17,19);

implementation

{$R *.fmx}

procedure TProductShipmentForm.FormCreate(Sender: TObject);
var Xarr : Array[1..28] of Double;
begin
  Xarr[1]:= EncodeDate(2019,09,01);
  Xarr[2]:= EncodeDate(2019,09,15);
  Xarr[3]:= EncodeDate(2019,10,01);
  Xarr[4]:= EncodeDate(2019,10,15);
  Xarr[5]:= EncodeDate(2019,11,01);
  Xarr[6]:= EncodeDate(2019,11,15);
  Xarr[7]:= EncodeDate(2019,12,01);
  Xarr[8]:= EncodeDate(2019,12,15);
  Xarr[9]:= EncodeDate(2021,01,01);
  Xarr[10]:= EncodeDate(2021,01,15);
  Xarr[11]:= EncodeDate(2021,02,01);
  Xarr[12]:= EncodeDate(2021,02,15);
  Xarr[13]:= EncodeDate(2021,03,01);
  Xarr[14]:= EncodeDate(2021,03,15);
  Xarr[15]:= EncodeDate(2021,04,01);
  Xarr[16]:= EncodeDate(2021,04,15);
  Xarr[17]:= EncodeDate(2021,05,01);
  Xarr[18]:= EncodeDate(2021,05,15);
  Xarr[19]:= EncodeDate(2021,06,01);
  Xarr[20]:= EncodeDate(2021,06,15);
  Xarr[21]:= EncodeDate(2021,07,01);
  Xarr[22]:= EncodeDate(2021,07,15);
  Xarr[23]:= EncodeDate(2021,08,01);
  Xarr[24]:= EncodeDate(2021,08,15);
  Xarr[25]:= EncodeDate(2021,09,01);
  Xarr[26]:= EncodeDate(2021,09,15);
  Xarr[27]:= EncodeDate(2021,10,01);
  Xarr[28]:= EncodeDate(2021,10,15);

  with Chart1 do
  begin
    Series[0].Clear;
    Series[1].Clear;
    Series[2].Clear;
    Series[3].Clear;

    Gradient.Visible := false;
    Walls.Back.Visible := false;

    Series[0].Color := TAlphaColorRec.Greenyellow;
    Series[1].Color := TAlphaColorRec.Green;

    Series[0].Title := 'Apples';
    Series[1].Title := 'Pears';
    Series[2].Title := 'Average';
    Series[0].AddArray(Xarr, Yarr1);
    Series[1].AddArray(Xarr, Yarr2);

    Series[0].XValues.DateTime := true;
    Series[1].XValues.DateTime := true;

    (Series[0] as TPointSeries).Pointer.Style := psCircle;
    (Series[1] as TPointSeries).Pointer.Style := psCircle;
    (Series[0] as TPointSeries).Pointer.Pen.Visible := false;
    (Series[1] as TPointSeries).Pointer.Pen.Visible := false;

    Series[2].CheckDataSource();

    Series[3].DataSource := Chart1.Series[2];
    (Series[3] as TLineSeries).Smoothed := true;
    Series[2].Pen.Visible := false;
    Series[2].ShowInLegend := false;

    Title.Font.Size := 16;
    SubTitle.Font.Size := 10;
    SubTitle.Alignment := taLeftJustify;
    ChartAnimation1.Speed := 300;
    ChartAnimation1.Play;
  end;
end;

end.
