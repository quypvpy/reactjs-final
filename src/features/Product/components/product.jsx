import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { useHistory } from "react-router-dom";
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from "../../../constants";

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const history = useHistory();
  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    // Navigate to detailPage:/product/productId
    history.push(`/products/${product.id}`);
  };
  return (
    <Box padding={1} onClick={handleClick}>
      {/* <Skeleton variant="rect" width="100%" height={118}></Skeleton> */}
      {/* minheight để fix ảnh bị giật */}
      <Box padding={1} minHeight="215px">
        <img
          src={thumbnailUrl}
          // neeus thumbnail null thif thoi ..laf null ..k thif laays kia
          alt={product.name}
          width="100%"
          // cha cos nhieeu xaif nhieeu
        ></img>
      </Box>
      <Typography variant="">{product.name}</Typography>
      <Typography variant="body1">
        <Box component="span" fontSize="16px" fontWeight="bold" marginRight={1}>
          {new Intl.NumberFormat("vn-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.salePrice)}
          ;
        </Box>
        {product.promotionPercent > 0 ? ` - ${product.promotionPercent}%` : ""}
      </Typography>
      {/* <Skeleton></Skeleton>
  <Skeleton width="60%"></Skeleton> */}
    </Box>
  );
}

export default Product;
