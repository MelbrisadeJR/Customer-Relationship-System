import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  Typography,
  makeStyles
} from '@material-ui/core';
import FeedbackService from '../../../services/feedback';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, ...rest }) => {
  const classes = useStyles();
  const [selectedFeedbackIds, setselectedFeedbackIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);

  const retrieveRows = () => {
    FeedbackService.getAll()
      .then((response) => {
        setRows(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveRows();
  }, []);

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

  const deleteFeeback = (id) => {
    FeedbackService.deleteFeedback(id);
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
                  FeedbackSequence
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Rate
                </TableCell>
                <TableCell>
                  ProductName
                </TableCell>
                <TableCell>
                  CreateAt
                </TableCell>
                <TableCell>
                  UpdateAt
                </TableCell>
                <TableCell>
                  Action
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
                        {feedback.feedbackSequenceNum}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {feedback.description}
                  </TableCell>
                  <TableCell>
                    {feedback.priority}
                  </TableCell>
                  <TableCell>
                    {feedback.priority}
                  </TableCell>
                  <TableCell>
                    {moment(feedback.create_At, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {feedback.update_At === null ? 'N/A' : moment(feedback.update_At, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <button type="button" className="btn btn-success" onClick={() => deleteFeeback(feedback.feedbackSequenceNum)}>Delete</button>
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
  rows: PropTypes.array.isRequired
};

export default Results;
