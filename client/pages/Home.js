import React from "react";
import { Box, Typography } from "@material-ui/core";

import Categories from "./../containers/Categories";

const Home = () => {
  return (
    <Box
      id="home"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Typography align="center" variant="h2" gutterBottom>
        GraphQL ToDo App
      </Typography>
      <Categories />
    </Box>
  );
};

export default Home;
