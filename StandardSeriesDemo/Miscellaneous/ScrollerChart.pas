unit ScrollerChart;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Engine,
  FMXTee.Procs, FMXTee.Chart, FMXTee.Series, FMXTee.Tools,
  FMXTee.Tools.ScrollPager, FMXTee.Tools.SubChart;

type
  TScrollerChartForm = class(TForm)
    Chart1: TChart;
    Series1: TLineSeries;
    ChartTool1: TAnnotationTool;
    ChartTool2: TAnnotationTool;
    ChartTool3: TMarksTipTool;
    ChartTool4: TScrollPagerTool;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  ScrollerChartForm: TScrollerChartForm;

implementation

{$R *.fmx}

procedure TScrollerChartForm.FormCreate(Sender: TObject);
var vals     : TArray<Double>;
    dates    : TArray<Double>;
    avgDates : array of double;
    t,i  : integer;
    dtDateTime : TDateTime;
    tmpVal    : Double;
begin
  with Chart1 do
  begin
        Series1.Clear;
        Gradient.Visible := false;
        MarginTop := 12;

        vals := TArray<Double>.Create( 1.234,1.233,1.235,1.241,1.241,1.244,1.239,1.220,1.222,1.224,1.228,1.242,1.241,1.239,1.244,1.238,1.233,1.250,1.253,
                      1.250,1.249,1.240,1.241,1.248,1.240,1.247,1.246,1.247,1.257,1.268,1.265,1.263,1.262,1.268,1.267,1.264,1.271,1.274,
                      1.265,1.275,1.279,1.285,1.292,1.301,1.304,1.317,1.325,1.323,1.321,1.309,1.312,1.308,1.303,1.300,1.301,1.306,1.298,
                      1.302,1.301,1.306,1.314,1.312,1.308,1.300,1.300,1.305,1.312,1.330,1.321,1.319,1.317,1.316,1.312,1.313,1.307,1.306,
                      1.309,1.302,1.297,1.290,1.300,1.290,1.289,1.284,1.282,1.286,1.288,1.289,1.290,1.292,1.290,1.297,1.304,1.310,1.311,
                      1.306,1.308,1.315,1.316,1.321,1.325,1.306,1.302,1.308,1.314,1.323,1.324,1.330,1.330,1.338,1.335,1.334,1.335,1.341,
                      1.338,1.333,1.342,1.328,1.316,1.316,1.324,1.321,1.320,1.340,1.351,1.348,1.342,1.342,1.352,1.345,1.350,1.345,1.347,
                      1.355,1.358,1.357,1.365,1.369,1.376,1.377,1.362,1.367,1.366,1.354,1.350,1.351,1.360,1.353,1.351,1.348,1.348,1.356,
                      1.341,1.337,1.335,1.318,1.322,1.328,1.322,1.314,1.317,1.319,1.313,1.322,1.314,1.315,1.319,1.310,1.317,1.304,1.308,
                      1.303,1.307,1.304,1.320,1.303,1.295,1.293,1.298,1.293,1.296,1.305,1.311,1.316,1.321,1.320,1.323,1.321,1.318,1.331,
                      1.319,1.321,1.319,1.318,1.314,1.317,1.316,1.320,1.320,1.329,1.323,1.324,1.321,1.325,1.329,1.317,1.312,1.314,1.303,
                      1.300,1.300,1.298,1.302,1.304,1.297,1.307,1.307,1.305,1.299,1.309,1.318,1.316,1.319,1.323,1.323,1.338,1.334,1.341,
                      1.344,1.351,1.347,1.347,1.347,1.353,1.337,1.338,1.327,1.321,1.315,1.319,1.319,1.319,1.310,1.313,1.303,1.296,1.302,
                      1.293,1.320,1.321,1.321,1.321,1.327,1.323,1.327,1.328,1.332,1.330,1.341,1.340,1.340,1.338,1.341,1.335,1.341,1.355,
                      1.360,1.363,1.350,1.345,1.344,1.339,1.346,1.346,1.346,1.353,1.347,1.347,1.350,1.350,1.350,1.339,1.336,1.351,1.346,
                      1.346,1.330,1.325,1.382,1.338,1.343,1.340,1.352,1.350,1.351,1.367,1.367,1.368,1.364,1.361 );

        dates := TArray<Double>.Create(13420512,13421376,13423968,13424832,13425696,13426560,13427424,13428288,13430016,13430880,
                       13432608,13433472,13436064,13436928,13437792,13438656,13439520,13442112,13442976,13443840,
                       13444704,13445568,13448160,13449024,13450752,13451616,13454208,13455072,13455936,13456800,
                       13457664,13460256,13461120,13461984,13462848,13463712,13466304,13467168,13468032,13468896,
                       13469760,13470624,13472352,13474080,13474944,13475808,13478400,13479264,13480128,13480992,
                       13481856,13484448,13485312,13486176,13487040,13487904,13490496,13491360,13492224,13493088,
                       13493952,13496544,13497408,13498272,13499136,13502592,13503456,13504320,13505184,13506048,
                       13508640,13509504,13510368,13511232,13512096,13515552,13516416,13518144,13520736,13521600,
                       13522464,13523328,13524192,13526784,13527648,13528512,13529376,13530240,13532832,13533696,
                       13534560,13535424,13536288,13538880,13539744,13540608,13541472,13542336,13544928,13545792,
                       13546656,13548384,13550976,13551840,13552704,13553568,13554432,13557024,13557888,13558752,
                       13559616,13560480,13563072,13565664,13566528,13569120,13570848,13571712,13572576,13575168,
                       13576032,13576896,13577760,13578624,13581216,13582080,13582944,13583808,13584672,13587264,
                       13588128,13588992,13589856,13590720,13593312,13594176,13595040,13595904,13596768,13599360,
                       13600224,13601088,13601952,13602816,13605408,13606272,13607136,13608000,13608864,13611456,
                       13612320,13613184,13614048,13614912,13617504,13618368,13619232,13620096,13620960,13623552,
                       13624416,13625280,13626144,13627008,13629600,13630464,13631328,13632192,13633056,13635648,
                       13636512,13637376,13638240,13639104,13641696,13642560,13643424,13644288,13648608,13649472,
                       13650336,13651200,13653792,13654656,13655520,13656384,13657248,13659840,13660704,13661568,
                       13662432,13663296,13665888,13666752,13667616,13668480,13669344,13671936,13672800,13674528,
                       13675392,13677984,13678848,13679712,13680576,13681440,13684032,13684896,13685760,13686624,
                       13687488,13690080,13690944,13691808,13692672,13693536,13696128,13696992,13697856,13698720,
                       13699584,13702176,13703040,13703904,13704768,13705632,13708224,13709088,13709952,13710816,
                       13711680,13714272,13715136,13716000,13716864,13717728,13721184,13722048,13722912,13723776,
                       13726368,13727232,13728096,13728960,13729824,13732416,13733280,13734144,13735008,13735872,
                       13738464,13739328,13740192,13741056,13741920,13744512,13745376,13746240,13747968,13750560,
                       13751424,13752288,13753152,13754016,13756608,13757472,13758336,13759200,13760064,13762656,
                       13763520,13764384,13766112,13768704,13769568,13770432,13771296,13772160,13774752,13775616,
                       13776480,13777344,13778208,13780800,13781664,13782528,13783392,13784256,13786848,13787712,
                       13789440,13790304,13792896,13793760,13794624,13795488,13796352,13798944,13799808,13800672);

        Series1.Title := 'USD to Euro';
        Series1.AddArray(vals);

        SetLength(avgDates,Series1.Count);

        for t:= 0 to Series1.Count-1 do
        begin
            dtDateTime := EncodeDate(1970,01,01);
            dtDateTime := dtDateTime +  dates[t] / 1000 / SecsPerDay * 100000;

//            tmpVal := dtDateTime;
            avgDates[t] :=  dtDateTime;
            Series1.XValues[t]:=avgDates[t];
        end;

        //config some series appearance characteristics
       (Series[0] as TLineSeries).LinePen.Width := 2;

        //Axes
        Axes.Left.Title.Caption :='$ 000s';
        Axes.Left.RoundFirstLabel := true;
        Axes.Left.Title.Visible := false;
        Axes.Bottom.RoundFirstLabel := true;
        Axes.Bottom.Title.Caption := 'Bottom Axis';
        Axes.Bottom.Title.Font.Size := 20;
        Axes.Bottom.Title.Visible := false;
        Axes.Bottom.DateTimeFormat := 'mm/yy';
        Axes.Left.SetMinMax(1.2, 1.41);
        Axes.Left.Grid.Width := 1;
        Axes.Bottom.Axis.Width := 1;
        Axes.Bottom.SetMinMax(Series[0].XValues[50], Series[0].XValues[250]);
        Axes.Bottom.Grid.Visible := false;
        Series[0].XValues.DateTime := true;
        Axes.Left.LabelsSeparation := 100;

        Title.Visible := false;

        //Legend
        Legend.Visible := false;

        // annotation (alternative title)
        (Tools[0] as TAnnotationTool).Shape.Font.Size := 20;
        (Tools[0] as TAnnotationTool).Text := '  US Dollar against the Euro';
        (Tools[0] as TAnnotationTool).Shape.Transparent := true;

        // annotation (alternative title)
        (Tools[1] as TAnnotationTool).Text := '    2012 - 2013 Source: Steema Software SL';
        (Tools[1] as TAnnotationTool).Shape.Transparent := true;

        Repaint;  //get positions

        (Tools[0] as TAnnotationTool).Left := Axes.Bottom.CalcXPosValue(Axes.Bottom.Minimum);
        (Tools[0] as TAnnotationTool).Top := 8;
        (Tools[1] as TAnnotationTool).Left := Axes.Bottom.CalcXPosValue(Axes.Bottom.Minimum);
        (Tools[1] as TAnnotationTool).Top := 38;

        //tooltip added at design time

        AllowZoom := false;
        AllowPanning := pmHorizontal;

        //scroller  - tool added at designtime
        with (Tools[3] as TScrollPagerTool) do
        begin
          Series := Series1;
          SubChartTChart.Gradient.Visible := false;
          SubChartTChart.Walls.Back.Visible := false;
          SubChartTChart.Axes.Visible := false;
          SubChartTChart.Foot.Caption := 'Showing data from Sat Mar 02 2013 to Tue Mar 19 2013';
          SubChartTChart.Color := TAlphaColorRec.White;
          SubChartTChart.Foot.Alignment := taLeftJustify;
          DivisionRatio := 8;
          StartLinePointer.Visible := false;
          EndLinePointer.Visible := false;
        end;
  end;
end;
end.
