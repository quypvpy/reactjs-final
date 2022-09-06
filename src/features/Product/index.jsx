import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ListPage from "./pages/ListPage";
import { Box } from "@material-ui/core";
import DetailPage from "./pages/DetailPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  const match = useRouteMatch(); //để lấy cái route cha truyền xuống ,,để cha thay đổi.. con tự đổi
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
        {/* <Route path='/products' component={ListPage} exact /> */}
      </Switch>
    </Box>
  );
}

export default ProductFeature;
