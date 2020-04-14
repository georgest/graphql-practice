import React, { useState } from "react";
import { graphql } from "react-apollo";
import {
  Box,
  Divider,
  Button,
  IconButton,
  CircularProgress,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Tooltip,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";

import TodosList from "./TodosList";
import AddEditCategory from "./AddEditCategory";

import { fetchCategories } from "./../graphql/queries";

const Categories = (props) => {
  const [addEditCategory, setAddEditCategory] = useState(false);
  const [editing, setEditing] = useState("");
  const [expanded, setExpanded] = useState(false);

  const {
    data: { categories },
  } = props;

  const handleChange = (categoryId) => {
    setExpanded(expanded !== categoryId ? categoryId : false);
  };

  const handleEdit = (event, categoryId) => {
    event.stopPropagation();
    setEditing(categoryId);
    setAddEditCategory(true);
  };

  if (!categories)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Box display="flex" justifyContent="center">
      {!categories ? (
        <CircularProgress />
      ) : (
        <Box width="640px">
          {categories.map((category, index) => (
            <ExpansionPanel
              key={category.id}
              expanded={expanded === category.id}
              onChange={() => handleChange(category.id)}
            >
              <ExpansionPanelSummary
                aria-controls={`${category.id}-content`}
                id={`${category.id}-header`}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  width="100%"
                >
                  <Box display="flex" alignItems="center">
                    <Typography>{category.title}</Typography>
                    {category.description && (
                      <Box ml={1}>
                        <Tooltip title={category.description} placement="right">
                          <InfoIcon fontSize="small" />
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                  <IconButton
                    onClick={(event) => handleEdit(event, category.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Box width="100%">
                  <TodosList categoryId={category.id} items={category.todos} />
                </Box>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
          <Box mt={4}>
            {addEditCategory ? (
              <AddEditCategory
                category={categories.find(
                  (category) => category.id === editing
                )}
                onClose={() => {
                  setEditing("");
                  setAddEditCategory(false);
                }}
              />
            ) : (
              <Box display="flex" width="100%" justifyContent="center">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                  onClick={() => setAddEditCategory(true)}
                >
                  Add category
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default graphql(fetchCategories)(Categories);
