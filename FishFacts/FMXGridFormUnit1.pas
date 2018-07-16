unit FMXGridFormUnit1;

interface

uses
  System.SysUtils, System.Classes, System.Variants, FMX.Types, FMX.Controls, FMX.Forms,
  FMX.Dialogs, Data.Bind.Components, Data.Bind.DBScope, FMX.Edit, FMX.Layouts, FMX.ListBox, Data.DB, Datasnap.DBClient,
  FMX.Memo, Fmx.Bind.Navigator, Fmx.Bind.DBEngExt, Data.Bind.EngExt, FMX.Menus,
  FMX.Grid, Fmx.Bind.Editors, System.Rtti,
  System.Bindings.Outputs, FMXTee.Engine, FMXTee.Procs, FMXTee.Chart,
  FMXTee.Series,FMXTee.Bind.DBLinks, System.UITypes, FMX.Ani,
  Data.Bind.Controls, FMX.Grid.Style, FMX.ScrollBox, FMX.StdCtrls,
  FMX.Controls.Presentation;

type
  TForm1 = class(TForm)
    EditWithHandler: TEdit;
    BindingsList: TBindingsList;
    BindScopeDB1: TBindScopeDB;
    BindLinkEditHandler: TBindLink;
    CategoryField: TStringField;
    SpeciesNameField: TStringField;
    LengthCmField: TFloatField;
    LengthInField: TFloatField;
    CommonNameField: TStringField;
    NotesField: TMemoField;
    GraphicField: TBlobField;
    ClientDataSet1: TClientDataSet;
    ClientDataSetDataSource1: TDataSource;
    ImageWithHandler: TImageControl;
    BindLinkImageHandler: TBindLink;
    BindNavigator1: TBindNavigator;
    CheckBoxActiveDataSet: TCheckBox;
    LabelPosition: TLabel;
    BindLinkPosition: TBindLink;
    LabelFields: TLabel;
    BindLinkLabel: TBindLink;
    BindGridLink1: TBindGridLink;
    StringGrid1: TStringGrid;
    StringColumn1: TStringColumn;
    StringColumn2: TStringColumn;
    StringColumn3: TStringColumn;
    EditWithHandler2: TEdit;
    BindLinkEditHandler2: TBindLink;
    Chart1: TChart;
    StringColumn4: TStringColumn;
    TeeClientDataSet: TClientDataSet;
    TeeDataSource1: TDataSource;
    TeeBindScopeDB: TBindScopeDB;
    Series1: TLineSeries;
    procedure CheckBoxActiveDataSetChange(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure ClientDataSet1AfterScroll(DataSet: TDataSet);
    procedure Chart1BeforeDrawSeries(Sender: TObject);
    procedure Series1Click(Sender: TChartSeries; ValueIndex: Integer;
      Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
    procedure Series1GetMarkText(Sender: TChartSeries; ValueIndex: Integer;
      var MarkText: string);
    procedure Chart1ClickSeries(Sender: TCustomChart; Series: TChartSeries;
      ValueIndex: Integer; Button: TMouseButton; Shift: TShiftState; X,
      Y: Integer);
  private
    FChecking: Boolean;
    { Private declarations }
    procedure OnIdle(Sender: TObject; var Done: Boolean);
    procedure SetMarks(ValueIndex : Integer);
  public
  end;

var
  Form1: TForm1;
  livePoint : Integer;
  chartBind : TBindDBChartLink;

implementation

uses
 System.UIConsts;

{$R *.fmx}

procedure TForm1.Chart1BeforeDrawSeries(Sender: TObject);
Var i : Integer;
begin
   for i := 0 to Chart1[1].Count-1 do
     if (Chart1[1]<>nil) and (i = livePoint) then
       Chart1[1].ValueColor[livePoint]:= $FFFF8000 //claRed
     else
       Chart1[1].ValueColor[i]:=Chart1[1].Color;
end;

procedure TForm1.Chart1ClickSeries(Sender: TCustomChart; Series: TChartSeries;
  ValueIndex: Integer; Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
begin
 ClientDataSet1.RecNo:=ValueIndex+1;
end;

procedure TForm1.CheckBoxActiveDataSetChange(Sender: TObject);
Var i : Integer;
begin
  if not FChecking then
    ClientDataSetDataSource1.Enabled := CheckBoxActiveDataSet.IsChecked;

  chartBind.Active := True;
  for i := 0 to Chart1[0].Count-1 do
    Chart1[0].Labels[i]:=StringGrid1.Cells[1,i];

  Chart1.Repaint;
end;

procedure TForm1.ClientDataSet1AfterScroll(DataSet: TDataSet);
begin
  livePoint := ClientDataSet1.RecNo-1;
  Chart1.Repaint;
end;

procedure TForm1.FormCreate(Sender: TObject);
begin
  Application.OnIdle := OnIdle;
  livePoint:=0;
  TeeClientDataSet.Data := ClientDataSet1.Data;
  With Chart1 do
  Begin
    AllowPanning:=pmNone;
    AllowZoom:=False;
    Axes.Bottom.LabelsAngle := 90;
    Axes.Bottom.LabelsSize := 50;
    Title.Font.Color :=claDarkGray;
    Title.Left:=Chart1.Axes.Left.PosAxis+50;
    Title.Top:= Chart1.Axes.Left.CalcYPosValue(Chart1.Axes.Left.Maximum)+10;
  end;

  // Series1
  chartBind:=TBindDBChartLink.Create(Self);
  chartBind.DataSource:=TeeBindScopeDB;

  chartBind.AddSeries(Series1, 'Length (cm)');

  With Chart1[1] do
  Begin
    Marks.Visible := True;
    Marks.Style:=smsValue;
    Marks.Transparent:=True;
    Marks.ArrowLength:=3;
    Pen.Visible:=False;
    Color:= $FF5779B9;
    Marks.Font.Color:= claDarkRed;
    Marks.Font.Style:= [TFontStyle(0)];
    Marks.Font.Size:=11;
    Marks.Arrow.Visible:=False;
    OnGetMarkText:=Series1GetMarkText;
  End;

  CheckBoxActiveDataSetChange(self);
end;

procedure TForm1.OnIdle(Sender: TObject; var Done: Boolean);
begin
  FChecking := True;
  try
    CheckBoxActiveDataSet.IsChecked := ClientDataSetDataSource1.Enabled;
  finally
    FChecking := False;
  end;
end;

procedure TForm1.Series1Click(Sender: TChartSeries; ValueIndex: Integer;
  Button: TMouseButton; Shift: TShiftState; X, Y: Integer);
begin
  ClientDataSet1.RecNo:=ValueIndex;
end;

procedure TForm1.Series1GetMarkText(Sender: TChartSeries; ValueIndex: Integer;
  var MarkText: string);
begin
 if ValueIndex=livePoint then
 Begin
   With Chart1[1].Marks.Item[ValueIndex] do
   Begin
     Transparent:=True;
     Font.Size:=20;
     Font.Color:= claDarkRed;
     Font.Style:= [TFontStyle(0)];
   End;
 End
 else
   SetMarks(ValueIndex);
end;

procedure TForm1.SetMarks(ValueIndex : Integer);
begin
  With Chart1[1].Marks.Item[ValueIndex] do
  Begin
    Transparent:=True;
    Font.Color:= claBlack;
    Font.Style:= [];
    Font.Size:=11;
  End;
end;

end.
