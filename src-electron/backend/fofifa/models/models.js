/* eslint-disable @typescript-eslint/camelcase */
const affecter = require('./affecter');
const association = require('./association');
const avantage_nat = require('./avantage_nat');
const avoir_famille = require('./avoir_famille');
const charger = require('./charger');
const chercheur = require('./chercheur');
const descente = require('./descente');
const EA = require('./ea');
const enqueteur = require('./enqueteur');
const etre_membre = require('./etre_membre');
const fofifapers = require('./fofifapers');
const lieu = require('./lieu');
const menage = require('./menage');
const mission = require('./mission');
const moe = require('./moe');
const param_divers = require('./param_divers');
const personne = require('./personne');
const saisir = require('./saisir');
const saisisseur = require('./saisisseur');
const batiment_agricole = require('./batiment_agri');
const charge_locataire = require('./charge_locataire');
const foncier = require('./foncier');
const location_avoir_charge_loc = require('./location_avoir_charge_locataire');
const location = require('./location');
const metayage_avoir_charge_loc = require('./metayage_avoir_charge_loc');
const metayage = require('./metayage');
const vente_terre = require('./vente_terre');

const { DataTypes } = require('sequelize');
const db = require('../helpers/db');

// sequelize-auto -h localhost -d fofifa -u root  --dialect mysql -o models

module.exports = {
  affecter: affecter(db, DataTypes),
  association: association(db, DataTypes),
  avantage_nat: avantage_nat(db, DataTypes),
  avoir_famille: avoir_famille(db, DataTypes),
  fofifapers: fofifapers(db, DataTypes),
  chercheur: chercheur(db, DataTypes),
  EA: EA(db, DataTypes),
  enqueteur: enqueteur(db, DataTypes),
  etre_membre: etre_membre(db, DataTypes),
  menage: menage(db, DataTypes),
  saisisseur: saisisseur(db, DataTypes),
  lieu: lieu(db, DataTypes),
  descente: descente(db, DataTypes),
  mission: mission(db, DataTypes),
  moe: moe(db, DataTypes),
  param_divers: param_divers(db, DataTypes),
  saisir: saisir(db, DataTypes),
  personne: personne(db, DataTypes),
  charger: charger(db, DataTypes),
  batiment_agricole: batiment_agricole(db, DataTypes),
  charge_locataire: charge_locataire(db, DataTypes),
  foncier: foncier(db, DataTypes),
  location_avoir_charge_loc: location_avoir_charge_loc(db, DataTypes),
  location: location(db, DataTypes),
  metayage_avoir_charge_loc: metayage_avoir_charge_loc(db, DataTypes),
  metayage: metayage(db, DataTypes),
  vente_terre: vente_terre(db, DataTypes)
};
