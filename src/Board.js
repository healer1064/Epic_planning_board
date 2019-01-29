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
  importance: {
    position: 'absolute',
    bottom: 0 - margin,
    right: 0,
  },
  difficulty: {
    position: 'absolute',
    top: 0,
    left: 0 - margin - 16,
    transform: 'rotate(270deg)',
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
  },
  itemText: {
    display: 'block',
    width: 12,
    height: 12,
    borderRadius: 6,
    background: 'rgba(190, 144, 212, .5)',
    border: '1px solid rgba(115, 101, 152, 1)',
  },
};

export default withStyles(styles)(({ classes, items }) => {
  const difficultyValues = items.map(i => i.difficulty);
  const maxDifficulty = max(difficultyValues) + 3 || 13;
  const maxImportance = 110;
  return (
    <div className={cn(classes.root)}>
      <div style={{ top: 0, left: 0 }} className={cn(classes.quadrant)} />
      <div style={{ top: '50%', left: 0 }} className={cn(classes.quadrant)} />
      <div style={{ top: 0, left: '50%' }} className={cn(classes.quadrant)} />
      <h1 className={classes.importance}>Importance</h1>
      <h1 className={classes.difficulty}>Difficulty</h1>
      <div
        style={{
          top: '50%',
          left: '50%',
        }}
        className={cn(classes.quadrant)}
      />
      <ul className={cn(classes.list)}>
        {items.map(item => {
          console.log(
            item.title,
            `calc((100% / ${maxDifficulty}) * ${item.difficulty})`,
          );

          const style = {};
          style.bottom = `calc((100% / ${maxDifficulty}) * ${item.difficulty})`;
          style.left = `calc((100% / ${maxImportance}) * ${item.importance})`;
          return (
            <li className={classes.listItem} key={item._oid} style={style}>
              <Tooltip title={`${item.title} - ${item.summary}`}>
                <span className={classes.itemText} />
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
