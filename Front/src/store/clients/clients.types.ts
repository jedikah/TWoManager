export interface ClientForm {
  clientName: string;
  domicile?: string;
  contact?: string;
}

export interface ClientsState {
  form: ClientForm;
}
