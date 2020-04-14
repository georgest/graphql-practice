const axios = require("axios");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;

const TodoType = new GraphQLObjectType({
  name: "TodoType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    done: { type: GraphQLBoolean, defaultValue: false },
    category: {
      type: require("./category_type"),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/categories/${parentValue.categoryId}/`)
          .then((response) => response.data);
      },
    },
  }),
});

module.exports = TodoType;
