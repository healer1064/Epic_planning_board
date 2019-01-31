import cn from 'classnames';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ItemList from './ItemList';
import RatingBoard from './RatingBoard';

const styles = () => ({
  app: {
    overflow: 'hidden',
    display: 'flex',
  },
});

const Importance = ({ classes, items, onSelect, selected }) => (
  <div className={cn(classes.app, 'App')}>
    <ItemList
      items={items.filter(i => i.importance === 0)}
      onSelect={onSelect}
      selected={selected}
    />
    <RatingBoard
      items={items
        .filter(i => i.importance > 0)
        .map(i => ({ ...i, value: i.importance }))
        .sort((a, b) => b.value - a.value)}
      tiers={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
    />
  </div>
);

export default withStyles(styles)(Importance);
