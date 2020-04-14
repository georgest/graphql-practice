const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList } = graphql;
const axios = require("axios");

const TodoType = require("./todo_type");
const CategoryType = require("./category_type");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return axios
          .get(`http://localhost:3000/todos/`)
          .then(response => response.data);
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return axios
          .get(`http://localhost:3000/categories/`)
          .then(response => response.data);
      }
    }
  })
});

module.exports = RootQuery;
