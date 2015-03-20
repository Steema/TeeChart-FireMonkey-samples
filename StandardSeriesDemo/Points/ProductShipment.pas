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
  Xarr[1]:= StrToDate('01/09/2012');
  Xarr[2]:= StrToDate('15/09/2012');
  Xarr[3]:= StrToDate('01/10/2012');
  Xarr[4]:= StrToDate('15/10/2012');
  Xarr[5]:= StrToDate('01/11/2012');
  Xarr[6]:= StrToDate('15/11/2012');
  Xarr[7]:= StrToDate('01/12/2012');
  Xarr[8]:= StrToDate('15/12/2012');
  Xarr[9]:= StrToDate('01/01/2013');
  Xarr[10]:= StrToDate('15/01/2013');
  Xarr[11]:= StrToDate('01/02/2013');
  Xarr[12]:= StrToDate('15/02/2013');
  Xarr[13]:= StrToDate('01/03/2013');
  Xarr[14]:= StrToDate('15/03/2013');
  Xarr[15]:= StrToDate('01/04/2013');
  Xarr[16]:= StrToDate('15/04/2013');
  Xarr[17]:= StrToDate('01/05/2013');
  Xarr[18]:= StrToDate('15/05/2013');
  Xarr[19]:= StrToDate('01/06/2013');
  Xarr[20]:= StrToDate('15/06/2013');
  Xarr[21]:= StrToDate('01/07/2013');
  Xarr[22]:= StrToDate('15/07/2013');
  Xarr[23]:= StrToDate('01/08/2013');
  Xarr[24]:= StrToDate('15/09/2013');
  Xarr[25]:= StrToDate('01/09/2013');
  Xarr[26]:= StrToDate('15/09/2013');
  Xarr[27]:= StrToDate('01/10/2013');
  Xarr[28]:= StrToDate('15/10/2013');

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
