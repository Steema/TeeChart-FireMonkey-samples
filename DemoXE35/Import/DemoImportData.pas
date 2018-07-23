unit DemoImportData;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Rtti, System.Classes,
  System.Variants, FMX.Types, FMX.Controls, FMX.Forms, FMX.Dialogs,
  FMX.StdCtrls, FMX.Layouts, FMX.Memo, System.Generics.Collections;

type
  // Simple class used for RTTI example data
  TPerson=class
  public
    Name : String;
    Birth : TDateTime;
    Height : Single;

    Children : Array of TPerson;
  end;

  // Generic TList (can also be a TQueue, TStack, etc)
  TPersonsList=class(TList<TPerson>)
  end;

  // Old style Collection item
  TPersonItem=class(TCollectionItem)
  private
    FName : String;
    FHeight : Integer;
  published
    property Name:String read FName write FName;
    property Height:Integer read FHeight write FHeight;
  end;

  TDemoData = class(TForm)
    MemoCSV: TMemo;
    MemoXML: TMemo;
    MemoJSON: TMemo;
    MemoHTML: TMemo;
    procedure FormCreate(Sender: TObject);
    procedure FormDestroy(Sender: TObject);
  private
    { Private declarations }

  public
    { Public declarations }

    // Sample data for RTTI examples:
    PersonsArray : Array of TPerson;
    Persons : TPersonsList;
    PersonsCollection : TCollection;

    // Simple array:
    function MyArray:TDoubleDynArray;
  end;

implementation

{$R *.fmx}

{ TDemoData }

// Just create a sample array of double.
// Importing also works with array of integer or int64

procedure TDemoData.FormCreate(Sender: TObject);
var p : TPersonItem;
begin
  SetLength(PersonsArray,2);

  PersonsArray[0]:=TPerson.Create;
  PersonsArray[0].Name:='Mike';
  PersonsArray[0].Birth:=EncodeDate(1980,5,21);
  PersonsArray[0].Height:=184;

  PersonsArray[1]:=TPerson.Create;
  PersonsArray[1].Name:='Laura';
  PersonsArray[1].Birth:=EncodeDate(2002,11,3);
  PersonsArray[1].Height:=149;


  // Same data used on a generic TList< TPerson >
  Persons:=TPersonsList.Create;
  Persons.Add(PersonsArray[0]);
  Persons.Add(PersonsArray[1]);

  // Sample data of a TCollection:
  PersonsCollection:=TCollection.Create(TPersonItem);

  p:=(PersonsCollection.Add as TPersonItem);
  p.Name:='Mike';
  p.Height:=184;

  p:=(PersonsCollection.Add as TPersonItem);
  p.Name:='Laura';
  p.Height:=149;
end;

procedure TDemoData.FormDestroy(Sender: TObject);
begin
  // Just destroy sample data created at OnCreate event:

  PersonsCollection.Free;
  Persons.Free;
end;

function TDemoData.MyArray: TDoubleDynArray;
var t : Integer;
begin
  SetLength(result, 1000);

  result[0]:=Random(1000);

  for t:=1 to 999 do
      result[t]:=result[t-1]+Random(50)-25;
end;

end.
