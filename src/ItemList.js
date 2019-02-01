import cn from 'classnames';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  list: {
    height: 'calc(100vh - 80px)',
    overflowY: 'scroll',
  },
  listItem: {
    cursor: 'pointer',
    listStyle: 'disc',
    textAlign: 'left',
  },
  selected: {
    background: 'rgba(190, 144, 212, .5)',
  },
  rated: {
    color: 'gray',
  },
};

export default withStyles(styles)(({ classes, items, onSelect, selected }) => (
  <ol className={classes.list}>
    {items.map(item => (
      <li
        key={item.title}
        className={cn(
          classes.listItem,
          selected.includes(item._oid) && classes.selected,
          item.rated && classes.rated,
        )}
        onClick={evt => onSelect(evt, item._oid)}
      >
        {item.title} {item.summary}
      </li>
    ))}
  </ol>
));
