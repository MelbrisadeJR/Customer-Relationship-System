import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Rating from '@material-ui/lab/Rating';
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
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  rows,
  deleteFeedbacks,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedFeedbackIds, setselectedFeedbackIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleSelectAll = (event) => {
    let newselectedFeedbackIds;

    if (event.target.checked) {
      newselectedFeedbackIds = rows.map((feedback) => feedback.id);
    } else {
      newselectedFeedbackIds = [];
    }

    setselectedFeedbackIds(newselectedFeedbackIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFeedbackIds.indexOf(id);
    let newselectedFeedbackIds = [];

    if (selectedIndex === -1) {
      newselectedFeedbackIds = newselectedFeedbackIds.concat(selectedFeedbackIds, id);
    } else if (selectedIndex === 0) {
      newselectedFeedbackIds = newselectedFeedbackIds.concat(selectedFeedbackIds.slice(1));
    } else if (selectedIndex === selectedFeedbackIds.length - 1) {
      newselectedFeedbackIds = newselectedFeedbackIds
        .concat(selectedFeedbackIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedFeedbackIds = newselectedFeedbackIds.concat(
        selectedFeedbackIds.slice(0, selectedIndex),
        selectedFeedbackIds.slice(selectedIndex + 1)
      );
    }

    setselectedFeedbackIds(newselectedFeedbackIds);
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
                    checked={selectedFeedbackIds.length === rows.length}
                    color="primary"
                    indeterminate={
                      selectedFeedbackIds.length > 0
                      && selectedFeedbackIds.length < rows.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  FeedbackID
                </TableCell>
                <TableCell>
                  ProductName
                </TableCell>
                <TableCell>
                  Rating
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  CreateAt
                </TableCell>
                <TableCell>
                  UpdateAt
                </TableCell>
                <TableCell>
                  View
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, limit).map((feedback) => (
                <TableRow
                  hover
                  key={feedback.id}
                  selected={selectedFeedbackIds.indexOf(feedback.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedFeedbackIds.indexOf(feedback.id) !== -1}
                      onChange={(event) => handleSelectOne(event, feedback.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {feedback.id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {feedback.productName}
                  </TableCell>
                  <TableCell>
                    <Rating
                      name="half-rating-read"
                      defaultValue={0}
                      precision={0.5}
                      value={feedback.rating}
                      readOnly
                    />
                  </TableCell>
                  <TableCell>
                    {feedback.description}
                  </TableCell>
                  <TableCell>
                    {moment(feedback.create_At, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {feedback.update_At === null ? 'N/A' : moment(feedback.update_At, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <button type="button" className="btn btn-success" onClick={deleteFeedbacks}>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={rows.length}
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
  rows: PropTypes.array.isRequired,
  deleteFeedbacks: PropTypes.func
};

export default Results;
