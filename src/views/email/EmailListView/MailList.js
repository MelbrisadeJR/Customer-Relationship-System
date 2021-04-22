import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  Card,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';

const data = [
  {
    id: uuid(),
    name: 'Draft',
    icon: InsertDriveFileOutlinedIcon,
  },
  {
    id: uuid(),
    name: 'Sent',
    icon: MailOutlineIcon,
  },
  {
    id: uuid(),
    name: 'Template',
    icon: DescriptionOutlinedIcon,
  },
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const MailList = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <List>
        {data.map(({ id, name, icon: Icon }, i) => (
          <ListItem
            divider={i < data.length - 1}
            key={id}
          >
            <Icon />
            <ListItemText
              primary={name}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

MailList.propTypes = {
  className: PropTypes.string
};

export default MailList;
