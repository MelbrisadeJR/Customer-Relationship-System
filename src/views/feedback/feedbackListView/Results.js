import React, { useState } from 'react';
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
// import { deleteFeedback } from 'src/views/feedback/feedbackListView';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, feedbacks, ...rest }) => {
  const classes = useStyles();
  const [setselectedFeedbackIds, setsetselectedFeedbackIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newsetselectedFeedbackIds;

    if (event.target.checked) {
      newsetselectedFeedbackIds = feedbacks.map((feedback) => feedback.id);
    } else {
      newsetselectedFeedbackIds = [];
    }

    setsetselectedFeedbackIds(newsetselectedFeedbackIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = setselectedFeedbackIds.indexOf(id);
    let newsetselectedFeedbackIds = [];

    if (selectedIndex === -1) {
      newsetselectedFeedbackIds = newsetselectedFeedbackIds.concat(setselectedFeedbackIds, id);
    } else if (selectedIndex === 0) {
      newsetselectedFeedbackIds = newsetselectedFeedbackIds.concat(setselectedFeedbackIds.slice(1));
    } else if (selectedIndex === setselectedFeedbackIds.length - 1) {
      newsetselectedFeedbackIds = newsetselectedFeedbackIds
        .concat(setselectedFeedbackIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newsetselectedFeedbackIds = newsetselectedFeedbackIds.concat(
        setselectedFeedbackIds.slice(0, selectedIndex),
        setselectedFeedbackIds.slice(selectedIndex + 1)
      );
    }

    setsetselectedFeedbackIds(newsetselectedFeedbackIds);
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
                    checked={setselectedFeedbackIds.length === feedbacks.length}
                    color="primary"
                    indeterminate={
                      setselectedFeedbackIds.length > 0
                      && setselectedFeedbackIds.length < feedbacks.length
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
                  Feedback Status
                </TableCell>
                <TableCell>
                  Priority
                </TableCell>
                <TableCell>
                  CreateAt
                </TableCell>
                <TableCell>
                  UpdateAt
                </TableCell>
                <TableCell>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbacks.slice(0, limit).map((feedback) => (
                <TableRow
                  hover
                  key={feedback.id}
                  selected={setselectedFeedbackIds.indexOf(feedback.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={setselectedFeedbackIds.indexOf(feedback.id) !== -1}
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
                    {feedback.feedback_status}
                  </TableCell>
                  <TableCell>
                    {feedback.priority}
                  </TableCell>
                  <TableCell>
                    {moment(feedback.create_At, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {moment(feedback.update_At, 'DD/MM/YYYY').format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={feedbacks.length}
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
  feedbacks: PropTypes.array.isRequired
};

export default Results;
