import gql from "graphql-tag";

export default gql`
  mutation AddTodo($categoryId: ID!, $title: String!, $description: String) {
    addTodo(categoryId: $categoryId, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;
