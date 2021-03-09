import {  QVueGlobals } from 'quasar'

export const data_pv = {
  paragraph1: [
    'ville',
    'nom_de_la_propriete',
    'numero_de_requisition',
    'numero_du_titre'
  ],
  paragraph2: ['region', 'fokontany', 'commune', 'district'],
  paragraph3: ['partie_1', 'partie_2'],
  paragraph4: [
    'pieces_justificative',
    'annee_de_travail',
    'jour_et heure de travail',
    'nom_du_geometre',
    'debut_de_convocation',
    'fin_de_convocation',
    'date_de_convocation'
  ],
  paragraph5: ['nom_de_la_propriete_mere'],
  paragraph6: ['nom_des_personne_convoque', 'role_detaile']
};

export const toolbar_pv = ($q: QVueGlobals) => {
  return [
    ['undo', 'redo'],
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: 'only-icons',
        options: ['left', 'center', 'right', 'justify']
      },
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    [
      'bold',
      'italic',
      'strike',
      'underline',
      'subscript',
      'superscript',
      'unordered',
      'ordered',
      'outdent',
      'indent'
    ],
    ['paragraph1', 'paragraph2'],
    ['paragraph3', 'paragraph4'],
    ['paragraph5', 'paragraph6'],
    [
      {
        label: $q.lang.editor.defaultFont,
        icon: $q.iconSet.editor.font,
        fixedIcon: true,
        list: 'no-icons',
        options: [
          'default_font',
          'arial',
          'arial_black',
          'comic_sans',
          'courier_new',
          'impact',
          'lucida_grande',
          'times_new_roman',
          'verdana'
        ]
      }
    ],
    ['viewMode', 'save']
  ];
};
