import cn from 'classnames';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  list: {
    height: '100vh',
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
};

export default withStyles(styles)(({ classes, items, onSelect, selected }) => (
  <ol className={classes.list}>
    {items.map(item => (
      <li
        key={item.title}
        className={cn(
          classes.listItem,
          selected === item._oid && classes.selected,
        )}
        onClick={evt => onSelect(evt, item._oid)}
      >
        {item.title} {item.summary}
      </li>
    ))}
  </ol>
));
