const axios = require("axios");
const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const TodoType = require("./todo_type.js");
const CategoryType = require("./category_type.js");

const mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        categoryId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return axios
          .post(`http://localhost:3000/todos/`, args)
          .then((response) => response.data);
      },
    },
    editTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        done: { type: GraphQLBoolean },
        categoryId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        return axios
          .patch(`http://localhost:3000/todos/${args.id}`, args)
          .then((response) => response.data);
      },
    },
    toggleTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        done: { type: new GraphQLNonNull(GraphQLBoolean) },
      },
      resolve(_, { id, done }) {
        return axios
          .patch(`http://localhost:3000/todos/${id}`, { done })
          .then((response) => response.data);
      },
    },
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { id }) {
        return axios
          .delete(`http://localhost:3000/todos/${id}`)
          .then((resolve) => resolve.data);
      },
    },
    addCategory: {
      type: CategoryType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
      },
      resolve(_, { title, description }) {
        return axios
          .post(`http://localhost:3000/categories/`, { title, description })
          .then((response) => response.data);
      },
    },
    editCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(_, args) {
        return axios
          .patch(`http://localhost:3000/categories/${args.id}`, args)
          .then((response) => response.data);
      },
    },
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, { id }) {
        return axios
          .delete(`http://localhost:3000/categories/${id}`)
          .then((resolve) => resolve.data);
      },
    },
  },
});

module.exports = mutations;
