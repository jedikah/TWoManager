import UserService from './user.service';
import ClientService from './client.service';
import CollaborationService from './collaboration.service';
import ConvocationService from './convocation.service';
import FactureService from './facture.service';
import FolderService from './folder.service';
import LetterService from './lettre.service';
import PvService from './pv.service';

const Services = [
  UserService,
  ClientService,
  CollaborationService,
  ConvocationService,
  FactureService,
  FolderService,
  LetterService,
  PvService,
];

export {
  UserService,
  ClientService,
  CollaborationService,
  ConvocationService,
  FactureService,
  FolderService,
  LetterService,
  PvService,
};

export default Services;
