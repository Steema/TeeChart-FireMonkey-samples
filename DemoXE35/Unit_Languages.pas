unit Unit_Languages;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants, 
  FMX.Types,
  {$IFDEF D19}
  FMX.Graphics,
  {$ENDIF}
  FMX.Controls, FMX.Forms, FMX.Dialogs, FMX.StdCtrls,
  FMX.Layouts, FMX.ListBox, FMXTee.Engine, FMXTee.Series, FMXTee.Procs,
  FMXTee.Chart, FMXTee.Editor.EditorPanel, FMXTee.Editor.Languages,
  FMXTee.Languages.Translate;

type
  TLanguagesForm = class(TForm)
    Layout1: TLayout;
    ChartEditorPanel1: TChartEditorPanel;
    Chart1: TChart;
    Series1: THorizLineSeries;
    Splitter1: TSplitter;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
    tmp : TAskLanguage;

    procedure LangChanged(Sender: TObject);
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Editor.Stroke,
  FMXTee.ProConstants,
  FMXTee.Languages;

procedure TLanguagesForm.LangChanged(Sender: TObject);
begin
  TAskLanguage.SetDefaultLanguage(Integer(tmp.LBLangs.Selected.Data));
  TeeSetLanguage(True);

  ChartEditorPanel1.Free;
  ChartEditorPanel1:=TChartEditorPanel.Create(Self);
  ChartEditorPanel1.Align:=TAlignLayout.{$IFDEF D20}Client{$ELSE}alClient{$ENDIF};
  ChartEditorPanel1.Chart:=Chart1;
  ChartEditorPanel1.Parent:=Layout1.Parent;

  TeeTranslateControl(ChartEditorPanel1);
end;

procedure TLanguagesForm.FormCreate(Sender: TObject);
begin
  tmp:=TAskLanguage.Create(Self);
  tmp.OkBtn.Visible:=False;
  tmp.Button2.Visible:=False;

  tmp.LBLangs.OnClick:=LangChanged;
  tmp.LBLangs.OnDblClick:=LangChanged;

  tmp.LBLangs.Align:=TAlignLayout.{$IFDEF D20}Client{$ELSE}alClient{$ENDIF};

  EmbeddForm(tmp,Layout1);

  TeeSetLanguage(True);
  TeeTranslateControl(ChartEditorPanel1);
end;

initialization
  RegisterClass(TLanguagesForm);
end.
