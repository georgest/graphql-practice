import React, { useState } from "react";
import { graphql } from "react-apollo";
import { Button } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import { fetchCategories } from "./../graphql/queries/";
import { editCategory } from "./../graphql/mutations";

const EditCategoryButton = ({ id, title, description, onSuccess, mutate }) => {
  const [loading, setLoading] = useState(false);

  const editCategory = () => {
    setLoading(true);

    mutate({
      variables: {
        id,
        title,
        description,
      },
      refetchQueries: [{ query: fetchCategories }],
    }).then(() => {
      setLoading(false);
      onSuccess && onSuccess();
    });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<EditIcon />}
      disabled={loading}
      onClick={() => editCategory()}
    >
      Edit category
    </Button>
  );
};

export default graphql(editCategory)(EditCategoryButton);
