import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import {
  Card,
  List,
  ListItem,
  ListItemIcon,
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
    width: '100%',
    maxWidth: 360,
  },
  image: {
    height: 48,
    width: 48
  },
  icon: {
    marginRight: 10,
  },
}));

const MailCategory = ({ className, ...rest }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <List
        component="nav"
        {...rest}
      >
        {data.map(({ id, name, icon: Icon }, i) => (
          <ListItem
            button
            selected={selectedIndex === i}
            onClick={(event) => handleListItemClick(event, i)}
            divider={i < data.length - 1}
            key={id}
          >
            <ListItemIcon>
              <Icon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              primary={name}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

MailCategory.propTypes = {
  className: PropTypes.string
};

export default MailCategory;
