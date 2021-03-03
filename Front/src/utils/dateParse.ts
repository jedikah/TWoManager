/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { date } from 'quasar';

const curValue = require('multilingual-number-to-words')

// const timeStamp: number = Date.now();

const french = {
  single_digits: [
    'zéro',
    'un',
    'deux',
    'trois',
    'quatre',
    'cinq',
    'six',
    'sept',
    'huit',
    'neuf'
  ],
  teens: [
    'dix',
    'onze',
    'douze',
    'treize',
    'quatorze',
    'quinze',
    'seize',
    'dix-sept',
    'dix-huit',
    'dix-neuf'
  ],
  double_digits: [
    'zéro',
    'dix',
    'vingt',
    'trente',
    'quarante',
    'cinquante',
    'soixante',
    'soixante-dix',
    'quatre-vingts',
    'quatre-vingt-dix'
  ],
  crore_lakhs: ['cent', 'mille', 'lakh', 'crore'],
  million_billions: [
    'cent',
    'mille',
    'million',
    'billion',
    'billion',
    'quadrillion'
  ],
  and_currency: ['et', 'roupies', 'paise', 'point']
};

const locale = {
  days: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi'
  ],
  daysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  months: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthsShort: [
    'Jan',
    'Fev',
    'Mar',
    'Avr',
    'Mai',
    'Jui',
    'Juil',
    'Aoû',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
};

curValue.addLanguage('french', french);

// const capitalize: string = s => {
//   if (typeof s !== 'string') return '';
//   return s.charAt(0).toUpperCase() + s.slice(1);
// };

interface DateParam {
  year: number,
  month: number,
  days: number,
  hours?: number,
  minutes?: number
}

export const dateParse = ({
  year,
  month,
  days,
  hours = 8,
  minutes = 0
}: DateParam) => {
  let newDate = new Date();
  newDate = date.buildDate({ year, month, date: days, hours, minutes });

  const minute =
    curValue.lakhWord(
      parseInt(date.formatDate(newDate, 'm', locale)),
      'french'
    )[0] + ' minute ';

  return {
    yearNb: newDate.getFullYear(),
    year: curValue.lakhWord(newDate.getFullYear(), 'french')[0] as string,
    dayWeek: date.formatDate(newDate, 'dddd ', locale),
    dayMonthNb: newDate.getDate(),
    dayMonth: curValue.lakhWord(newDate.getDate(), 'french')[0] as string,
    month: date.formatDate(newDate, 'MMMM', locale),
    monthnb: month,
    houres:
      curValue.lakhWord(
        parseInt(date.formatDate(newDate, 'HH', locale)),
        'french'
      )[0] + ' heure ',
    minutes:
      parseInt(date.formatDate(newDate, 'm', locale)) === 0 ? null : minute
  };
};
