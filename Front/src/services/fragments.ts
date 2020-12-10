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
    clientName
    contact
    domicile
  }
`;

export const FOLDER_FRAG = gql`
  fragment FolderFrag on Folder {
    client {
      ...ClientFrag
    }
    folderId
    groundName
    dateTrav
    typeTrav
  }
  ${CLIENT_FRAG}
`;
