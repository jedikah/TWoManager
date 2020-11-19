export const columns = [
  {
    name: 'clientName',
    required: true,
    label: 'Nom et Prenom',
    align: 'left',
    field: 'clientName',
    format: val => `${val}`,
    sortable: true
  },
  {
    name: 'domicile',
    align: 'center',
    label: 'Domicile',
    field: 'domicile',
    sortable: true
  },
  {
    name: 'contact',
    label: 'Contact',
    field: 'contact',
    sortable: true,
    align: 'center'
  },
  {
    name: 'action',
    label: 'Action',
    field: 'action',
    sortable: false,
    align: 'center'
  }
];
