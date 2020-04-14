import React from "react";
import { graphql } from "react-apollo";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Divider,
} from "@material-ui/core";

import AddTodo from "./AddTodo";
import DeleteTodoButton from "./DeleteTodoButton";

import { fetchCategories } from "./../graphql/queries";
import { toggleTodo } from "./../graphql/mutations";

const TodosList = ({ categoryId, items, mutate }) => {
  const handleToggle = (id, done) => {
    mutate({
      variables: {
        id,
        done,
      },
      optimisticResponse: {
        __typename: "Mutation",
        toggleTodo: {
          id,
          __typename: "TodoType",
          done,
        },
      },
      refetchQueries: [{ query: fetchCategories }],
    });
  };

  return (
    <Box>
      {items.length > 0 && (
        <List aria-label="todos">
          {items.map((item) => (
            <ListItem
              key={item.id}
              button
              onClick={() => handleToggle(item.id, !item.done)}
              style={{ textDecoration: item.done ? "line-through" : "" }}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.done}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": item.id }}
                />
              </ListItemIcon>
              <ListItemText
                id={item.id}
                primary={item.title}
                secondary={item.description}
              />
              <ListItemSecondaryAction>
                <DeleteTodoButton id={item.id} />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
      <Divider />
      <AddTodo categoryId={categoryId} />
    </Box>
  );
};

export default graphql(toggleTodo)(TodosList);
