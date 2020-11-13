unit StandardGallery;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, Base,
  FMXTee.Chart.GalleryPanel, FMXTee.Editor.Chart, FMX.StdCtrls;

type
  TStandardDemo = class(TBaseForm)
    View3D: TCheckBox;
    procedure FormCreate(Sender: TObject);
    procedure BEditClick(Sender: TObject);
    procedure View3DChange(Sender: TObject);
  private
    { Private declarations }
    Gallery : TChartGalleryPanel;
  public
    { Public declarations }
  end;

implementation

{$R *.fmx}

uses
  FMXTee.Constants;

procedure TStandardDemo.BEditClick(Sender: TObject);
begin
  TChartEditForm.Edit(Self,Gallery.SelectedChart);
end;

procedure TStandardDemo.FormCreate(Sender: TObject);
begin
  inherited;
  Gallery:=TChartGalleryPanel.Create(Self);
  Gallery.Parent:=Self;
  Gallery.Align:=TAlignLayout.{$IFDEF D20}Client{$ELSE}alClient{$ENDIF};

  Gallery.CreateGalleryPage(TeeMsg_GalleryStandard);
end;

procedure TStandardDemo.View3DChange(Sender: TObject);
begin
  Gallery.View3D:=View3D.IsChecked;
end;

initialization
  RegisterClass(TStandardDemo);
end.
