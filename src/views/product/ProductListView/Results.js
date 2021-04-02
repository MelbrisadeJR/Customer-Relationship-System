import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, products, ...rest }) => {
  const classes = useStyles();
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedProductIds;

    if (event.target.checked) {
      newSelectedProductIds = products.map((product) => product.id);
    } else {
      newSelectedProductIds = [];
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductIds.indexOf(id);
    let newSelectedProductIds = [];

    if (selectedIndex === -1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(1));
    } else if (selectedIndex === selectedProductIds.length - 1) {
      newSelectedProductIds = newSelectedProductIds.concat(selectedProductIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductIds = newSelectedProductIds.concat(
        selectedProductIds.slice(0, selectedIndex),
        selectedProductIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductIds(newSelectedProductIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProductIds.length === products.length}
                    color="primary"
                    indeterminate={
                      selectedProductIds.length > 0
                      && selectedProductIds.length < products.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  SKU
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Brand
                </TableCell>
                <TableCell>
                  Manufacture
                </TableCell>
                <TableCell>
                  Selling Price
                </TableCell>
                <TableCell>
                  Cost Price
                </TableCell>
                <TableCell>
                  Discount
                </TableCell>
                <TableCell>
                  Stock
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(0, limit).map((product) => (
                <TableRow
                  hover
                  key={product.id}
                  selected={selectedProductIds.indexOf(product.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProductIds.indexOf(product.id) !== -1}
                      onChange={(event) => handleSelectOne(event, product.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {product.sku}
                  </TableCell>
                  <TableCell>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    {product.category}
                  </TableCell>
                  <TableCell>
                    {product.brand}
                  </TableCell>
                  <TableCell>
                    {product.manufacture}
                  </TableCell>
                  <TableCell>
                    {product.selling_price}
                  </TableCell>
                  <TableCell>
                    {product.cost_price}
                  </TableCell>
                  <TableCell>
                    {product.discount}
                  </TableCell>
                  <TableCell>
                    {product.stock}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={products.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  products: PropTypes.array.isRequired
};

export default Results;
