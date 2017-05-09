program UsingGauges;

uses
  System.StartUpCopy,
  FMX.Forms,
  Unit1 in 'Unit1.pas' {GaugesForm};

{$R *.res}

begin
  Application.Initialize;
  Application.CreateForm(TGaugesForm, GaugesForm);
  Application.Run;
end.
