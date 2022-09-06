import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import categoryApi from "../../../../api/categoryApi";

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ onChange }) {
  const [categorylist, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const list = await categoryApi.getAll();
        setCategoryList(
          list.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log("Fail to fetch to category List", error);
      }
    })();
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box>
      <Typography>Danh Mục Sản Phẩm</Typography>
      <ul>
        {categorylist.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default FilterByCategory;
