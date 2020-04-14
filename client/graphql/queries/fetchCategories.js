import gql from "graphql-tag";

export default gql`
  {
    categories {
      id
      title
      description
      todos {
        id
        title
        description
        done
      }
    }
  }
`;
