import { gql } from '@apollo/client';

export const SEARCH_REPO = gql`
  query getData($queryString: String!) {
    search(query: $queryString, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          databaseId
          nameWithOwner
          url
          createdAt
          description
          stargazers(orderBy: { field: STARRED_AT, direction: DESC }) {
            totalCount
          }
          openGraphImageUrl
          primaryLanguage {
            name
          }
        }
      }
    }
  }
`;
