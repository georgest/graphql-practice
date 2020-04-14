import gql from "graphql-tag";

export default gql`
  mutation ToggleTodo($id: ID!, $done: Boolean!) {
    toggleTodo(id: $id, done: $done) {
      id
      done
    }
  }
`;
