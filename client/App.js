import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Container, Box } from "@material-ui/core";

import { Home } from "./pages";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <Container className="container">
          <Box py={5} height="100%">
            <Router>
              <Route exact path="/" component={Home} />
            </Router>
          </Box>
        </Container>
      </CssBaseline>
    </MuiThemeProvider>
  );
};
