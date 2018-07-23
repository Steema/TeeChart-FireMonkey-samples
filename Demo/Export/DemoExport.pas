unit DemoExport;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMXTee.Engine, FMXTee.Procs,
  FMXTee.Chart, FMXTee.Editor.Stroke, FMXTee.Editor.Export, FMXTee.Series;

type
  TExportDemo = class(TForm)
    Panel1: TPanel;
    Chart1: TChart;
    Series1: THorizBarSeries;
    Splitter1: TSplitter;
    procedure FormCreate(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
   FMXTee.Canvas.SVG,
   FMXTee.Canvas.XAML,
   FMXTee.Canvas.HTML5,
   FMXTee.Canvas.PDF,
   FMXTee.Canvas.VML,
   FMXTee.Canvas.PostScript,
   FMXTee.Canvas.JavaScript,
   FMXTee.Editor.Export.JavaScript;

procedure TExportDemo.FormCreate(Sender: TObject);
var tmp : TExportEditor;
begin
  Series1.FillSampleValues;

  tmp:=TExportEditor.CreateEditor(Self,Chart1);
  EmbeddForm(tmp, Panel1);
end;

initialization
  RegisterClass(TExportDemo);
end.
