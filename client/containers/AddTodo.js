import React, { useState } from "react";
import { graphql } from "react-apollo";
import { Box, Button, Typography, TextField } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import { fetchCategories } from "./../graphql/queries";
import { addTodo } from "./../graphql/mutations";

const AddTodo = ({ categoryId, mutate }) => {
  const [addTodo, setAddTodo] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const onAdd = () => {
    if (!title) {
      setErrors(errors.concat(["Title: The field should not be empty!"]));
      return;
    }

    setLoading(true);

    mutate({
      variables: {
        categoryId,
        title,
        description,
      },
      refetchQueries: [{ query: fetchCategories }],
    }).then(() => {
      setLoading(false);
      clearFields();
      setAddTodo(false);
    });
  };

  const clearFields = () => {
    setTitle("");
    setDescription("");
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <Box mt={3}>
      {!addTodo ? (
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setAddTodo(true);
          }}
        >
          Add ToDo
        </Button>
      ) : (
        <Box>
          <TextField
            id="todo-title"
            label="Title"
            color="secondary"
            error={
              errors.filter(
                (error) => error.toLowerCase().indexOf("title") === 0
              ).length > 0
            }
            value={title}
            onChange={(event) => {
              clearErrors();
              setTitle(event.target.value);
            }}
            required
            fullWidth
          />
          <TextField
            id="todo-description"
            label="Description"
            color="secondary"
            margin="normal"
            error={
              errors.filter(
                (error) => error.toLowerCase().indexOf("description") === 0
              ).length > 0
            }
            value={description}
            onChange={(event) => {
              clearErrors();
              setDescription(event.target.value);
            }}
            fullWidth
            multiline
          />
          <Box mt={2}>
            {errors.length > 0 && (
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => onAdd()}
                disabled={loading || errors.length > 0}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setAddTodo(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default graphql(addTodo)(AddTodo);
