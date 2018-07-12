object DataModule1: TDataModule1
  OldCreateOrder = False
  Height = 667
  Width = 798
  object TechproducssqliteConnection: TFDConnection
    Params.Strings = (
      'DriverID=SQLite')
    LoginPrompt = False
    BeforeConnect = TechproducssqliteConnectionBeforeConnect
    Left = 84
    Top = 21
  end
  object _SalesByYearCountry: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum(Fact_Invoices.Invoice_Value) AS SumOfInvoice_Value, F' +
        'act_Invoices.Invoice_year, Lookup_Country.Country_name'
      
        'FROM (Lookup_Country INNER JOIN Lookup_Customers ON Lookup_Count' +
        'ry.Country_code_A2 = Lookup_Customers.Country_code_A2) INNER JOI' +
        'N Fact_Invoices ON Lookup_Customers.Cod_Customer = Fact_Invoices' +
        '.Cod_Customer'
      
        'GROUP BY Fact_Invoices.Invoice_year, Lookup_Country.Country_name' +
        ';'
      ''
      ''
      ''
      ''
      ''
      '')
    Left = 664
    Top = 88
  end
  object _SalesByYear: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum(Fact_Invoices.Invoice_Value) AS DollarTotal, Sum(Invo' +
        'ice_Value) AS EuroTotal, Fact_Invoices.Invoice_year'
      
        'FROM Fact_Invoices INNER JOIN Lookup_DollarEuroRate ON Fact_Invo' +
        'ices.OrderDate = Lookup_DollarEuroRate.ADate'
      'GROUP BY Fact_Invoices.Invoice_year'
      'ORDER BY Fact_Invoices.Invoice_year;')
    Left = 424
    Top = 24
  end
  object _SalesByYear_Query: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      'SELECT DollarTotal'
      
        'FROM (SELECT Sum(Fact_Invoices.Invoice_Value) AS DollarTotal, Su' +
        'm(Invoice_Value) AS EuroTotal, Fact_Invoices.Invoice_year'
      
        'FROM Fact_Invoices INNER JOIN Lookup_DollarEuroRate ON Fact_Invo' +
        'ices.OrderDate = Lookup_DollarEuroRate.ADate'
      'GROUP BY Fact_Invoices.Invoice_year'
      'ORDER BY Fact_Invoices.Invoice_year);')
    Left = 424
    Top = 96
  end
  object _SalesByContinent: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum(Fact_Invoices.Invoice_Value) AS SumOfInvoice_Value, L' +
        'ookup_Continent.continent_name'
      
        'FROM ((Lookup_Continent INNER JOIN Lookup_Country ON Lookup_Cont' +
        'inent.continent = Lookup_Country.Continent) INNER JOIN Lookup_Cu' +
        'stomers ON Lookup_Country.Country_code_A2 = Lookup_Customers.Cou' +
        'ntry_code_A2) INNER JOIN Fact_Invoices ON Lookup_Customers.Cod_C' +
        'ustomer = Fact_Invoices.Cod_Customer'
      'GROUP BY Lookup_Continent.continent_name;')
    Left = 424
    Top = 160
  end
  object _SalesByCountry: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum(Fact_Invoices.Invoice_Value) AS SumOfInvoice_Value, L' +
        'ookup_Country.Country_name, Lookup_Continent.continent_name'
      
        'FROM ((Fact_Invoices INNER JOIN Lookup_Customers ON Fact_Invoice' +
        's.Cod_Customer = Lookup_Customers.Cod_Customer) INNER JOIN Looku' +
        'p_Country ON Lookup_Customers.Country_code_A2 = Lookup_Country.C' +
        'ountry_code_A2) INNER JOIN Lookup_Continent ON Lookup_Country.Co' +
        'ntinent = Lookup_Continent.continent'
      
        'GROUP BY Lookup_Country.Country_name, Lookup_Continent.continent' +
        '_name;')
    Left = 432
    Top = 232
  end
  object _SalesByCountryYear: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum(Fact_Invoices.Invoice_Value) AS SumOfInvoice_Value, L' +
        'ookup_Country.Country_name, Lookup_Continent.continent_name'
      
        'FROM ((Fact_Invoices INNER JOIN Lookup_Customers ON Fact_Invoice' +
        's.Cod_Customer = Lookup_Customers.Cod_Customer) INNER JOIN Looku' +
        'p_Country ON Lookup_Customers.Country_code_A2 = Lookup_Country.C' +
        'ountry_code_A2) INNER JOIN Lookup_Continent ON Lookup_Country.Co' +
        'ntinent = Lookup_Continent.continent'
      
        'GROUP BY Lookup_Country.Country_name, Lookup_Continent.continent' +
        '_name;')
    Left = 432
    Top = 312
  end
  object _SalesByProductClass: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum([Prod_List_Price]*[Lookup_ProductPacks].[Pack_Qty]*(1' +
        '00-[Pack_Discount])/100) AS SalesValue, Lookup_ProductClass.Clas' +
        's_Description'
      
        'FROM ((Lookup_ProductClass INNER JOIN Lookup_ProductGroups ON Lo' +
        'okup_ProductClass.Class_id = Lookup_ProductGroups.Class_id) INNE' +
        'R JOIN Lookup_Products ON Lookup_ProductGroups.prod_type_code = ' +
        'Lookup_Products.Prod_type_code) INNER JOIN (Lookup_ProductPacks ' +
        'INNER JOIN (Lookup_Dates INNER JOIN Fact_Orders ON Lookup_Dates.' +
        'adate = Fact_Orders.Orderdate) ON Lookup_ProductPacks.Pack_code ' +
        '= Fact_Orders.Pack_code) ON Lookup_Products.Product_code = Fact_' +
        'Orders.Product_code'
      'GROUP BY Lookup_ProductClass.Class_Description'
      
        'ORDER BY Sum([Prod_List_Price]*[Lookup_ProductPacks].[Pack_Qty]*' +
        '(100-[Pack_Discount])/100);')
    Left = 432
    Top = 376
  end
  object _SalesByProductClassYearMonth: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum([Prod_List_Price]*[Lookup_ProductPacks].[Pack_Qty]*(1' +
        '00-[Pack_Discount])/100) AS SalesValue, Lookup_Dates.AYear, Look' +
        'up_Dates.AMonth, Lookup_ProductClass.Class_Description'
      
        'FROM Lookup_ProductClass INNER JOIN ((Lookup_ProductPacks INNER ' +
        'JOIN (Lookup_Products INNER JOIN (Fact_Orders INNER JOIN Lookup_' +
        'Dates ON Fact_Orders.Orderdate = Lookup_Dates.adate) ON Lookup_P' +
        'roducts.Product_code = Fact_Orders.Product_code) ON Lookup_Produ' +
        'ctPacks.Pack_code = Fact_Orders.Pack_code) INNER JOIN Lookup_Pro' +
        'ductGroups ON Lookup_Products.Prod_type_code = Lookup_ProductGro' +
        'ups.prod_type_code) ON Lookup_ProductClass.Class_id = Lookup_Pro' +
        'ductGroups.Class_id'
      
        'GROUP BY Lookup_Dates.AYear, Lookup_Dates.AMonth, Lookup_Product' +
        'Class.Class_Description;')
    Left = 432
    Top = 440
  end
  object _SalesByProductYearMonth: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum([Prod_List_Price]*[Lookup_ProductPacks].[Pack_Qty]*(1' +
        '00-[Pack_Discount])/100) AS SalesValue, Lookup_Dates.AYear, Look' +
        'up_Dates.AMonth, Lookup_Month.MonthShortname'
      
        'FROM Lookup_Month INNER JOIN (Lookup_ProductPacks INNER JOIN (Lo' +
        'okup_Products INNER JOIN (Fact_Orders INNER JOIN Lookup_Dates ON' +
        ' Fact_Orders.Orderdate = Lookup_Dates.adate) ON Lookup_Products.' +
        'Product_code = Fact_Orders.Product_code) ON Lookup_ProductPacks.' +
        'Pack_code = Fact_Orders.Pack_code) ON Lookup_Month.AMonth = Look' +
        'up_Dates.amonth'
      
        'GROUP BY Lookup_Dates.AYear, Lookup_Dates.AMonth, Lookup_Month.M' +
        'onthShortname;')
    Left = 416
    Top = 512
  end
  object _SalesByYearContinent: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum(Fact_Invoices.Invoice_Value) AS SumOfInvoice_Value, F' +
        'act_Invoices.Invoice_year, Lookup_Continent.Continent_ID, Lookup' +
        '_Continent.continent_name'
      
        'FROM ((Lookup_Continent INNER JOIN Lookup_Country ON Lookup_Cont' +
        'inent.continent = Lookup_Country.Continent) INNER JOIN Lookup_Cu' +
        'stomers ON Lookup_Country.Country_code_A2 = Lookup_Customers.Cou' +
        'ntry_code_A2) INNER JOIN Fact_Invoices ON Lookup_Customers.Cod_C' +
        'ustomer = Fact_Invoices.Cod_Customer'
      
        'GROUP BY Fact_Invoices.Invoice_year, Lookup_Continent.Continent_' +
        'ID, Lookup_Continent.continent_name;')
    Left = 656
    Top = 32
  end
  object Fact_Invoices_Query: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Fact_Invoices.Invoice_year, Fact_Invoices.Invoice_num, Fa' +
        'ct_Invoices.OrderDate'
      'FROM Fact_Invoices;')
    Left = 656
    Top = 176
  end
  object Fact_Orders_Query: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Fact_Orders.ID, Fact_Orders.Cod_Customer, Fact_Orders.Ord' +
        'erdate, Fact_Orders.Invoice_year, Fact_Orders.Invoice_num, Fact_' +
        'Orders.Product_code, Fact_Orders.Pack_code'
      'FROM Fact_Orders;')
    Left = 656
    Top = 240
  end
  object Item_Qty_By_Month_Year: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT Sum(Lookup_ProductPacks.Pack_Qty) AS SumOfPack_Qty, Looku' +
        'p_Dates.amonth, Lookup_Dates.ayear'
      
        'FROM Lookup_ProductPacks INNER JOIN (Lookup_Dates INNER JOIN Fac' +
        't_Orders ON Lookup_Dates.adate = Fact_Orders.Orderdate) ON Looku' +
        'p_ProductPacks.Pack_code = Fact_Orders.Pack_code'
      'GROUP BY Lookup_Dates.amonth, Lookup_Dates.ayear;')
    Left = 656
    Top = 336
  end
  object QueryTotalSales: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT sum(DollarTotal) FROM (SELECT Sum(Fact_Invoices.Invoice_V' +
        'alue) AS DollarTotal, Sum(Invoice_Value) AS EuroTotal, Fact_Invo' +
        'ices.Invoice_year'
      
        'FROM Fact_Invoices INNER JOIN Lookup_DollarEuroRate ON Fact_Invo' +
        'ices.OrderDate = Lookup_DollarEuroRate.ADate'
      'GROUP BY Fact_Invoices.Invoice_year'
      'ORDER BY Fact_Invoices.Invoice_year);')
    Left = 112
    Top = 144
  end
  object QueryTotalItemsSold: TFDQuery
    Connection = TechproducssqliteConnection
    SQL.Strings = (
      
        'SELECT sum(Sumofpack_qty) FROM (SELECT Sum(Lookup_ProductPacks.P' +
        'ack_Qty) AS SumOfPack_Qty, Lookup_Dates.amonth, Lookup_Dates.aye' +
        'ar'
      
        'FROM Lookup_ProductPacks INNER JOIN (Lookup_Dates INNER JOIN Fac' +
        't_Orders ON Lookup_Dates.adate = Fact_Orders.Orderdate) ON Looku' +
        'p_ProductPacks.Pack_code = Fact_Orders.Pack_code'
      'GROUP BY Lookup_Dates.amonth, Lookup_Dates.ayear)')
    Left = 104
    Top = 224
  end
end
