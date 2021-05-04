import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
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
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, Admins, ...rest }) => {
  const classes = useStyles();
  const [selectedAdminIds, setSelectedAdminIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedAdminIds;

    if (event.target.checked) {
      newSelectedAdminIds = Admins.map((Admin) => Admin.id);
    } else {
      newSelectedAdminIds = [];
    }

    setSelectedAdminIds(newSelectedAdminIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAdminIds.indexOf(id);
    let newSelectedAdminIds = [];

    if (selectedIndex === -1) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds, id);
    } else if (selectedIndex === 0) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds.slice(1));
    } else if (selectedIndex === selectedAdminIds.length - 1) {
      newSelectedAdminIds = newSelectedAdminIds.concat(selectedAdminIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedAdminIds = newSelectedAdminIds.concat(
        selectedAdminIds.slice(0, selectedIndex),
        selectedAdminIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAdminIds(newSelectedAdminIds);
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
                    checked={selectedAdminIds.length === Admins.length}
                    color="primary"
                    indeterminate={
                      selectedAdminIds.length > 0
                      && selectedAdminIds.length < Admins.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
                <TableCell>
                  Registration date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Admins.slice(0, limit).map((Admin) => (
                <TableRow
                  hover
                  key={Admin.id}
                  selected={selectedAdminIds.indexOf(Admin.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAdminIds.indexOf(Admin.id) !== -1}
                      onChange={(event) => handleSelectOne(event, Admin.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={Admin.avatarUrl}
                      >
                        {getInitials(Admin.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {Admin.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {Admin.email}
                  </TableCell>
                  <TableCell>
                    {`${Admin.address.city}, ${Admin.address.state}, ${Admin.address.country}`}
                  </TableCell>
                  <TableCell>
                    {Admin.phone}
                  </TableCell>
                  <TableCell>
                    {moment(Admin.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={Admins.length}
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
  Admins: PropTypes.array.isRequired
};

export default Results;
