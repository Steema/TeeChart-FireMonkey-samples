unit DataModule;

interface

uses
  System.SysUtils, System.Classes, FireDAC.Stan.Intf, FireDAC.Stan.Option,
  FireDAC.Stan.Error, FireDAC.UI.Intf, FireDAC.Phys.Intf, FireDAC.Stan.Def,
  FireDAC.Stan.Pool, FireDAC.Stan.Async, FireDAC.Phys, FireDAC.Phys.SQLite,
  FireDAC.Phys.SQLiteDef, FireDAC.Stan.ExprFuncs, FireDAC.FMXUI.Wait,
  FireDAC.Stan.Param, FireDAC.DatS, FireDAC.DApt.Intf, FireDAC.DApt, Data.DB,
  FireDAC.Comp.DataSet, FireDAC.Comp.Client;

type
  TDataModule1 = class(TDataModule)
    TechproducssqliteConnection: TFDConnection;
    _SalesByYearCountry: TFDQuery;
    _SalesByYear: TFDQuery;
    _SalesByYear_Query: TFDQuery;
    _SalesByContinent: TFDQuery;
    _SalesByCountry: TFDQuery;
    _SalesByCountryYear: TFDQuery;
    _SalesByProductClass: TFDQuery;
    _SalesByProductClassYearMonth: TFDQuery;
    _SalesByProductYearMonth: TFDQuery;
    _SalesByYearContinent: TFDQuery;
    Fact_Invoices_Query: TFDQuery;
    Fact_Orders_Query: TFDQuery;
    Item_Qty_By_Month_Year: TFDQuery;
    QueryTotalSales: TFDQuery;
    QueryTotalItemsSold: TFDQuery;
    procedure TechproducssqliteConnectionBeforeConnect(Sender: TObject);
  private
  public
  end;

var
  DataModule1: TDataModule1;

implementation

{%CLASSGROUP 'FMX.Controls.TControl'}

{$R *.dfm}

procedure TDataModule1.TechproducssqliteConnectionBeforeConnect(
  Sender: TObject);
var
  str : string;
begin
{$IFDEF MACOS}
  TechproducssqliteConnection.Params.Values['Database']:= '$(DOC)/TechProductsLtd.sqlite';
{$ELSE}
  {$IF DEFINED(iOS) or DEFINED(ANDROID)}
  DataModule1.TechproducssqliteConnection.Params.Values['Database'] :=
  TPath.Combine(TPath.GetDocumentsPath, 'TechProductsLtd.sqlite');
  {$ELSE}
  str :=  GetCurrentDir+ '\..\..\db\TechProductsLtd.sqlite';
  DataModule1.TechproducssqliteConnection.Params.Values['Database'] := str;
  {$ENDIF}
{$ENDIF}
end;

end.
