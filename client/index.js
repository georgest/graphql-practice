import React from "react";
import ReactDOM from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import App from "./App";

const client = new ApolloClient();

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
