const axios = require("axios");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean
} = graphql;

const TodoType = require("./todo_type");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    todos: {
      type: new GraphQLList(TodoType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/categories/${parentValue.id}/todos/`)
          .then(response => response.data);
      }
    }
  })
});

module.exports = CategoryType;
