import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import ProductThumbnail from "../components/ProductThumbnail";
import useProductDetail from "../hooks/useProductDetail";

DetailPage.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: "400px",
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    // flex: "1 1 auto",
    // chiếm hết độ rộng của thằng cha
    // neeus thằng con có độ rộng cao hơn cha có.thì nó sẽ autu xuống hangf
    // nếu flex: "1 1 0", thì còn lại nhuieue cho hết bên phải
    flex: "1 1 0",
    padding: theme.spacing(1.5),
  },
}));

function DetailPage() {
  const classes = useStyles();
  const {
    params: { productId },
  } = useRouteMatch();
  const { product, loading } = useProductDetail(productId);

  if (loading) {
    return <Box>Loading</Box>;
  }
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              Thumbnail
              <ProductThumbnail product={product}></ProductThumbnail>
            </Grid>
            <Grid item className={classes.right}>
              Product info
              <ProductInfo product={product}></ProductInfo>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
