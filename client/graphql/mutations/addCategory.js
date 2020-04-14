import gql from "graphql-tag";

export default gql`
  mutation AddCategory($title: String!, $description: String) {
    addCategory(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
