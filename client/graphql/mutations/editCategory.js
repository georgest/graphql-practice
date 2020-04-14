import gql from "graphql-tag";

export default gql`
  mutation EditCategory($id: ID!, $title: String!, $description: String) {
    editCategory(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
