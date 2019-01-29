import React from 'react';
import cn from 'classnames';
import Tooltip from '@material-ui/core/Tooltip';
import { max } from 'lodash';
import { withStyles } from '@material-ui/core/styles';

const margin = 75;

const styles = {
  root: {
    margin,
    position: 'relative',
    borderLeft: '1px solid black',
    borderBottom: '1px solid black',
    height: `calc(100vh - ${margin * 2}px)`,
    width: `calc(100vw - ${margin * 2}px)`,
  },
  quadrant: {
    borderRight: '1px solid lightgray',
    borderTop: '1px solid lightgray',
    position: 'absolute',
    height: `50%`,
    width: `50%`,
  },
  list: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  listItem: {
    position: 'absolute',
    listStyle: 'none',
    display: 'inline-block',
    background: 'rgba(0, 0, 0, 0.125)',
    border: '1px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '0 4px 4px',
    padding: 4,
    fontWeight: '600',
  },
  itemText: {},
};

export default withStyles(styles)(({ classes, items }) => {
  const difficultyValues = items.map(i => i.difficulty);
  const maxDifficulty = max(difficultyValues);
  const maxImportance = 100;

  return (
    <div className={cn(classes.root)}>
      <div style={{ top: 0, left: 0 }} className={cn(classes.quadrant)} />
      <div style={{ top: '50%', left: 0 }} className={cn(classes.quadrant)} />
      <div style={{ top: 0, left: '50%' }} className={cn(classes.quadrant)} />
      <div
        style={{
          top: '50%',
          left: '50%',
        }}
        className={cn(classes.quadrant)}
      />
      <ul className={cn(classes.list)}>
        {items.map(item => {
          const style = {};
          if (item.difficulty > maxDifficulty / 2) {
            style.right = `calc((100% / ${maxDifficulty} * ${maxDifficulty -
              item.difficulty}))`;
          } else {
            style.left = `calc((100% / ${maxDifficulty} * ${item.difficulty}))`;
          }
          if (item.importance > 50) {
            style.bottom = `calc((100% / ${maxImportance} * ${100 -
              item.importance}))`;
          } else {
            style.top = `calc((100% / ${maxImportance} * ${item.importance}))`;
          }
          return (
            <li className={classes.listItem} key={item._oid} style={style}>
              <Tooltip title={item.summary}>
                <span className={classes.itemText}>{item.title}</span>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
