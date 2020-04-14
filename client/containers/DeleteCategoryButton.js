import React, { useState } from "react";
import { graphql } from "react-apollo";
import { IconButton } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { fetchCategories } from "./../graphql/queries/";
import { deleteCategory } from "./../graphql/mutations";

const DeleteCategoryButton = ({ id, onSuccess, mutate }) => {
  const [loading, setLoading] = useState(false);

  const deleteCategory = () => {
    setLoading(true);

    mutate({
      variables: {
        id,
      },
      refetchQueries: [{ query: fetchCategories }],
    }).then(() => {
      setLoading(false);
      onSuccess && onSuccess();
    });
  };

  return (
    <IconButton disabled={loading} onClick={() => deleteCategory()}>
      <DeleteIcon />
    </IconButton>
  );
};

export default graphql(deleteCategory)(DeleteCategoryButton);
