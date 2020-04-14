import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import {
  Box,
  Typography,
  Divider,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import EditCategoryButton from "./EditCategoryButton";
import DeleteCategoryButton from "./DeleteCategoryButton";

import { fetchCategories } from "./../graphql/queries";
import { addCategory } from "./../graphql/mutations";

const AddEditCategory = ({ category, onClose, mutate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;

    setTitle(category.title);
    setDescription(category.description);
  }, [category]);

  const onAdd = () => {
    if (!title) {
      setErrors(errors.concat(["Title: The field should not be empty!"]));
      return;
    }

    setLoading(true);

    mutate({
      variables: {
        title,
        description,
      },
      refetchQueries: [{ query: fetchCategories }],
    }).then(() => {
      setLoading(false);
      clearFields();
      onClose();
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
    <Box>
      <Typography variant="h5" gutterBottom>
        Add category
      </Typography>
      <Divider />
      <TextField
        id="category-title"
        label="Title"
        color="secondary"
        margin="normal"
        error={
          errors.filter((error) => error.toLowerCase().indexOf("title") === 0)
            .length > 0
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
        id="category-description"
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            {!category ? (
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon />}
                onClick={() => onAdd()}
                disabled={loading || errors.length > 0}
              >
                Add category
              </Button>
            ) : (
              <EditCategoryButton
                id={category.id}
                title={title}
                description={description}
                onSuccess={onClose}
              />
            )}
            {!!category && (
              <Box display="inline" ml={1}>
                <DeleteCategoryButton id={category.id} onSuccess={onClose} />
              </Box>
            )}
          </Box>

          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default graphql(addCategory)(AddEditCategory);
