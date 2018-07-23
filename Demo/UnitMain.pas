unit UnitMain;
{$I TeeDefs.inc}

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs, FMX.Objects, FMX.TreeView,
  FMX.Layouts, FMX.TabControl, FMX.Menus, FMX.Ani, FMX.ListBox;

type
  TMainForm = class(TForm)
    Panel1: TPanel;
    Button1: TButton;
    StatusBar1: TStatusBar;
    Image1: TImage;
    TabControl1: TTabControl;
    TabItem1: TTabItem;
    TreeView1: TTreeView;
    TreeViewItem1: TTreeViewItem;
    TreeViewItem2: TTreeViewItem;
    LineItem1: TTreeViewItem;
    PanelDemo: TPanel;
    Image2: TImage;
    Splitter1: TSplitter;
    TreeViewItem3: TTreeViewItem;
    TreeViewItem4: TTreeViewItem;
    TreeViewItem5: TTreeViewItem;
    TreeViewItem6: TTreeViewItem;
    TreeViewItem7: TTreeViewItem;
    TreeViewItem8: TTreeViewItem;
    TreeViewItem9: TTreeViewItem;
    TreeViewItem10: TTreeViewItem;
    TreeViewItem11: TTreeViewItem;
    TreeViewItem12: TTreeViewItem;
    TreeViewItem13: TTreeViewItem;
    TreeViewItem14: TTreeViewItem;
    TreeViewItem15: TTreeViewItem;
    TreeViewItem16: TTreeViewItem;
    TreeViewItem17: TTreeViewItem;
    PopupMenu1: TPopupMenu;
    MenuItem1: TMenuItem;
    LabelSelected: TLabel;
    TreeViewItem18: TTreeViewItem;
    TreeViewItem19: TTreeViewItem;
    TreeViewItem20: TTreeViewItem;
    TreeViewItem21: TTreeViewItem;
    TreeViewItem22: TTreeViewItem;
    TreeViewItem23: TTreeViewItem;
    ComboStyles: TComboBox;
    procedure Button1Click(Sender: TObject);
    procedure TreeView1Change(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure MenuItem1Click(Sender: TObject);
    procedure ComboStylesChange(Sender: TObject);
  private
    { Private declarations }
    LastForm : TCommonCustomForm;

    procedure SelectNode(const S:String);
  public
    { Public declarations }
  end;

var
  MainForm: TMainForm;

implementation

{$R *.fmx}

uses
  {$IFDEF D17}
  FMX.Styles,
  {$ENDIF}
  FMX.Types3D, Base, FMXTee.About, FMXTee.Editor.Stroke, System.IOUtils;

procedure TMainForm.Button1Click(Sender: TObject);
begin
  with TFormAbout.Create(Self) do
  try
    ShowModal;
  finally
    Free;
  end;
end;

function StylesPath:String;
begin
  if FileExists('FMX.Platform.Win.Style') then
     result:=GetCurrentDir
  else
     result:='C:\Users\Public\Documents\RAD Studio\'+{$IFDEF D17}'10.0'{$ELSE}'9.0'{$ENDIF}+'\Styles';
end;

type
  TFormClass=class of TCommonCustomForm;

procedure TMainForm.ComboStylesChange(Sender: TObject);
var tmp : String;
begin
  tmp:=StylesPath+'\'+ComboStyles.Selected.Text+'.style';

  {$IFDEF D17}
  TStyleManager.SetStyleFromFile(tmp);
  {$ELSE}
  Application.StyleFileName := tmp;
  {$ENDIF}
end;

procedure TMainForm.FormCreate(Sender: TObject);

  procedure FillStyles;
  var S : TStringDynArray;
      tmp  : String;
  begin
    tmp:=StylesPath;

    if TDirectory.Exists(tmp) then
    begin
      S:=TDirectory.GetFiles(tmp,'*.style');
      try
        for tmp in S do
          ComboStyles.Items.Add(TPath.GetFileNameWithoutExtension(tmp));
      finally
        S:=nil;
      end;
    end;
  end;

  procedure HideTreeNodes;

    procedure ProcessItem(AItem:TTreeViewItem);
    var t : Integer;
    begin
      if (AItem.StyleName<>'') and (GetClass('T'+AItem.StyleName)=nil) then
         AItem.Enabled:=False;

      for t := 0 to AItem.Count-1 do
          ProcessItem(AItem.Items[t]);
    end;

  var t : Integer;
  begin
    for t := 0 to TreeView1.Count-1 do
        ProcessItem(TreeView1.Items[t]);
  end;

begin
  FillStyles;

  TreeView1.Selected:=TreeViewItem1;
  TreeView1.Selected.IsExpanded:=True;

  HideTreeNodes;

  if ParamCount>0 then
     SelectNode(ParamStr(1));  // ie:  'DemoChart3D'
end;

procedure TMainForm.MenuItem1Click(Sender: TObject);

   procedure ShowForm(ANode:TTreeViewItem);
   var t : Integer;
   begin
     TreeView1.Selected:=ANode;
     Application.ProcessMessages;

     for t:=0 to ANode.Count-1 do
         ShowForm(ANode.Items[t]);
   end;

var t : Integer;
begin
  for t:=0 to TreeView1.Count-1 do
      ShowForm(TreeView1.Items[t]);
end;

procedure TMainForm.SelectNode(const S:String);

  function FindNode(AItem:TTreeViewItem):TTreeViewItem;
  var t : Integer;
  begin
    if SameText(AItem.StyleName,S) or SameText(AItem.StyleName,Copy(S,2,Length(S))) then
       result:=AItem
    else
    begin
      result:=nil;

       for t := 0 to AItem.Count-1 do
       begin
         result:=FindNode(AItem[t]);
         if Assigned(result) then break;
       end;
    end;
  end;

var t : Integer;
    tmp : TTreeViewItem;
begin
  for t := 0 to TreeView1.Count-1 do
  begin
    tmp:=FindNode(TreeView1.Items[t]);

    if Assigned(tmp) then
    begin
      TreeView1.Selected:=tmp;
      exit;
    end;
  end;
end;

procedure TMainForm.TreeView1Change(Sender: TObject);
var tmpF : TFormClass;
    tmpV : TViewport3D;
begin
  if TreeView1.Selected.Enabled and (TreeView1.Selected.StyleName<>'') then
  begin
    tmpF:=TFormClass(FindClass('T'+TreeView1.Selected.StyleName));

    if Assigned(tmpF) then
    if (not Assigned(LastForm)) or (tmpF<>LastForm.ClassType) then
    begin
      FreeAndNil(LastForm);

      PanelDemo.DeleteChildren;

      LastForm:=tmpF.Create(Self);

      if LastForm is TCustomForm3D then
      begin
        tmpV:=TViewport3D.Create(LastForm);
        EmbeddForm(LastForm,tmpV);
        tmpV.Color:=TCustomForm3D(LastForm).Color;
        tmpV.Align:=TAlignLayout.alClient;
        tmpV.Parent:=PanelDemo;
      end
      else
        EmbeddForm(LastForm,PanelDemo);

      LastForm.Activate;

      LabelSelected.Text:=LastForm.ClassName;
    end;
  end
  else
    LabelSelected.Text:='';
end;

end.
