import { Box, Container, Grid, makeStyles, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import productApi from "../../../api/productApi";
import FilterViewer from "../components/Filters/FilterViewer";
import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import ProductSkeletonList from "../components/ProductSkeletonList";
import ProductSort from "../components/ProductSort";
import queryString from "query-string";

ListPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: "250px",
  },
  pagination: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    marginTop: "20px",
    paddingBottom: "10px",
  },
  right: {
    // flex: "1 1 auto",
    // chiếm hết độ rộng của thằng cha
    // neeus thằng con có độ rộng cao hơn cha có.thì nó sẽ autu xuống hangf
    // nếu flex: "1 1 0", thì còn lại nhuieue cho hết bên phải
    flex: "1 1 0",
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 9,
      _sort: params._sort || "salePrice:ASC",
      isPromotion: params.isPromotion === "true",
      isFreeShip: params.isFreeShip === "true",
    };
    // true => 'true'
    // {isPromotion: 'true'}
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    total: 10,
    page: 1,
  });

  const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: Number.parseInt(queryParams._page) || 1,
  //   _limit: Number.parseInt(queryParams._limit) || 9,
  //   _sort: queryParams._sort || "salePrice:ASC",
  // }));

  // const [loading, setLoading] = useState(true);
  // const [filters, setFilters] = useState({
  //   _page: 1,
  //   _limit: 9,
  //   _sort: "salePrice:ASC",
  // });

  // useEffect(() => {
  //   // todo sync filters to URL
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  // }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        // console.log({ response });
        setProductList(data);
        setPagination(pagination);
        console.log({ data, pagination });
      } catch (error) {
        console.log("Fail to fetch to product List", error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _page: page,
    // }));
    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleSortChange = (newSortValue) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   _sort: newSortValue,
    // }));

    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFiltersChange = (newFilters) => {
    // setFilters((prevFilters) => ({
    //   ...prevFilters,
    //   ...newFilters,
    // }));

    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const setNewFilters = (newFilters) => {
    // setFilters(newFilters);
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters
                filters={queryParams}
                onChange={handleFiltersChange}
              ></ProductFilters>
            </Paper>
          </Grid>

          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort
                currentSort={queryParams._sort}
                onChange={handleSortChange}
              ></ProductSort>

              <FilterViewer
                filters={queryParams}
                onChange={setNewFilters}
              ></FilterViewer>
              {loading ? (
                <ProductSkeletonList length={9}></ProductSkeletonList>
              ) : (
                <ProductList data={productList}></ProductList>
              )}

              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  variant={"outlined"}
                  onChange={handlePageChange}
                ></Pagination>
              </Box>
            </Paper>

            {/* coi chỗ phần api nó có propj j */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
