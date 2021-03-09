import gql from 'graphql-tag';

export const PAGINATION_META_FRAG = gql`
  fragment PaginationMetaFrag on PaginationMeta {
    currentPage
    itemCount
    itemsPerPage
    totalItems
    totalPages
  }
`;

export const CLIENT_FRAG = gql`
  fragment ClientFrag on Client {
    clientId
    name
    contact
    domicile
  }
`;

export const TYPETRAV_FRAG = gql`
  fragment TypetravtFrag on TypeTrav {
    typeTravId
    label
  }
`;

export const FACTURE_FRAG = gql`
  fragment FactureFrag on Facture {
    factureId
  }
`;

export const USER_FRAG = gql`
  fragment UserFrag on User {
    userId
  }
`;

export const FOLDER_FRAG = gql`
  fragment FolderFrag on Folder {
    folderId

  }
  ${CLIENT_FRAG}
  ${FACTURE_FRAG}
  ${TYPETRAV_FRAG}
  ${USER_FRAG}
`;
