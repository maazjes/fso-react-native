import { gql } from '@apollo/client';

const NODE_DETAILS = gql`
  fragment NodeDetails on Repository {
    id
    fullName
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
    url
  }
`;

export const GET_REPOSITORIES = gql`
  ${NODE_DETAILS}
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...NodeDetails
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation authenticate($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($ownerName: String!, $rating: Int!, $repositoryName: String!, $text: String) {
    createReview(review: { ownerName: $ownerName, rating: $rating, repositoryName: $repositoryName, text: $text }) {
      repositoryId
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    me {
      username
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;

export const GET_REPOSITORY = gql`
  ${NODE_DETAILS}
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...NodeDetails
      reviews(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      username
      id
    }
  }
`;
