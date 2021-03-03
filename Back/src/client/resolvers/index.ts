import { AddClients } from './addClients';
import { ClientSearch } from '../../collaborate/resolver/clientsSearch';
// import { ClientsList } from './clientsList';
import { UpdateClient } from './updateClient';

const ClientsResolver = [AddClients, UpdateClient];

export { ClientsResolver };
