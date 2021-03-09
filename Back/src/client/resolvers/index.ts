import { AddClient } from './addClients';
import { Clients } from './clients';
import { ClientsSearch } from './clientsSearch';
import { UpdateClient } from './updateClient';

const ClientsResolver = [AddClient, UpdateClient, Clients, ClientsSearch];

export { ClientsResolver };
