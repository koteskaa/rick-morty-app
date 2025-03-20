import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        image
      }
    }
  }
`;

export const GET_SPECIES = gql`
  query GetSpecies {
    characters(page: 1, filter: {}) {
      info {
        count
        pages
      }
      results {
        species
      }
    }
  }
`; 