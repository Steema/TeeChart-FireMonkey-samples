unit MultiDonut;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMXTee.Chart,
  FMXTee.URL, FMXTee.Engine, FMXTee.Procs, FMX.Layouts, FMX.StdCtrls,
  FMXTee.Series, FMXTee.Series.Donut, FMX.Colors, FMXTee.Animations.Tools,
  FMXTee.Animate, FMX.Objects, FMX.Controls.Presentation;

type
  TMultiDonutForm = class(TForm)
    Label1: TLabel;
    Label2: TLabel;
    GridPanelLayout1: TGridPanelLayout;
    Chart1: TChart;
    ImportChart1: TImportChart;
    Chart2: TChart;
    Chart3: TChart;
    Chart4: TChart;
    Chart5: TChart;
    Image1: TImage;
    Image2: TImage;
    Image3: TImage;
    Image4: TImage;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
    Anim1 : TTeeAnimationTool;
    Anim2 : TTeeAnimationTool;
    Anim3 : TTeeAnimationTool;
    Anim4 : TTeeAnimationTool;
    Anim5 : TTeeAnimationTool;
  public
    { Public declarations }
  end;

var
  MultiDonutForm: TMultiDonutForm;

implementation

{$R *.fmx}

procedure TMultiDonutForm.FormCreate(Sender: TObject);
var
  PieAnim1 : TNumberAnimation;
  PieAnim2 : TNumberAnimation;
  PieAnim3 : TNumberAnimation;
  PieAnim4 : TNumberAnimation;
  BarAnim5 : TNumberAnimation;
begin
  // Setting Series point color and font settings manually
  Chart1[0].ValueColor[0] := TAlphaColorRec.Gainsboro;
  Chart1[0].ValueColor[1] := TAlphaColorRec.Gold;
  Chart1.Legend.Font.Color := TAlphaColorRec.Gold;
  Chart1.Legend.Font.Size := 28;

  // Add an animation
  Anim1:=TTeeAnimationTool.Create(Self);
  Chart1.Animations.Add(Anim1);
  PieAnim1:=TNumberAnimation.Create(Self);
  PieAnim1.Instance:=Chart1[0];
  PieAnim1.PropertyName:='AngleSize';
  PieAnim1.EndValue:=360;
  Anim1.Animations.Add(PieAnim1);
  Anim1.Animations.Items[0].StartTime := 800;
  Anim1.Play;

  Chart2[0].ValueColor[0] := TAlphaColorRec.Gainsboro;
  Chart2[0].ValueColor[1] := TAlphaColorRec.Orange;
  Chart2.Legend.Font.Color := TAlphaColorRec.Orange;
  Chart2.Legend.Font.Size := 28;

  // Add an animation
  Anim2:=TTeeAnimationTool.Create(Self);
  Chart2.Animations.Add(Anim2);
  PieAnim2:=TNumberAnimation.Create(Self);
  PieAnim2.Instance:=Chart2[0];
  PieAnim2.PropertyName:='AngleSize';
  PieAnim2.EndValue:=360;
  Anim2.Animations.Add(PieAnim2);
  Anim2.Animations.Items[0].StartTime := 1200;
  Anim2.Play;

  Chart3[0].ValueColor[0] := TAlphaColorRec.Gainsboro;
  Chart3[0].ValueColor[1] := TAlphaColorRec.Gold;
  Chart3.Legend.Font.Color := TAlphaColorRec.Gold;
  Chart3.Legend.Font.Size := 28;

  // Add an animation
  Anim3:=TTeeAnimationTool.Create(Self);
  Chart3.Animations.Add(Anim3);
  PieAnim3:=TNumberAnimation.Create(Self);
  PieAnim3.Instance:=Chart3[0];
  PieAnim3.PropertyName:='AngleSize';
  PieAnim3.EndValue:=360;
  Anim3.Animations.Add(PieAnim3);
  Anim3.Animations.Items[0].StartTime := 1400;
  Anim3.Play;

  Chart4[0].ValueColor[0] := TAlphaColorRec.Gainsboro;
  Chart4[0].ValueColor[1] := TAlphaColorRec.Orange;
  Chart4.Legend.Font.Color := TAlphaColorRec.Orange;
  Chart4.Legend.Font.Size := 28;

  // Add an animation
  Anim4:=TTeeAnimationTool.Create(Self);
  Chart4.Animations.Add(Anim4);
  PieAnim4:=TNumberAnimation.Create(Self);
  PieAnim4.Instance:=Chart4[0];
  PieAnim4.PropertyName:='AngleSize';
  PieAnim4.EndValue:=360;
  Anim4.Animations.Add(PieAnim4);
  Anim4.Animations.Items[0].StartTime := 1600;
  Anim4.Play;

  Chart5[0].ValueColor[0] := TAlphaColorRec.Gold;
  Chart5[0].ValueColor[1] := TAlphaColorRec.Orange;
  Chart5[0].ValueColor[2] := TAlphaColorRec.Gold;
  Chart5[0].ValueColor[3] := TAlphaColorRec.Orange;

  Chart1.Hover.Visible := false;
  Chart2.Hover.Visible := false;
  Chart3.Hover.Visible := false;
  Chart4.Hover.Visible := false;
  Chart5.Hover.Visible := false;

  // Add an animation
  Anim5:=TTeeAnimationTool.Create(Self);
  Chart5.Animations.Add(Anim5);
  BarAnim5:=TNumberAnimation.Create(Self);
  BarAnim5.Instance:=Chart5[0];

//  (Chart5[0] as THorizBarSeries).BarHeight
//  BarAnim5.PropertyName:='BarHeight';
//  Anim5.Animations.Items[0].StartTime := 3000;
//  Anim5.Animations.Add(BarAnim5);
//  Anim5.Play;
end;

end.
