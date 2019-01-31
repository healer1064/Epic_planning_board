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
    flex: 1,
    height: `calc(100vh - ${margin * 2 + 48}px)`,
  },
  heading: {
    margin: '1em',
  },
  quadrant: {
    borderRight: '1px solid lightgray',
    borderTop: '1px solid lightgray',
    position: 'absolute',
    height: `50%`,
    width: `50%`,
  },
  importance: {
    margin: 0,
    position: 'absolute',
    bottom: -38 - 8,
    right: 0,
  },
  difficulty: {
    margin: 0,
    position: 'absolute',
    top: 54,
    left: -100,
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
  selected: {
    zIndex: '1000 !important',
    background: 'rgba(190, 144, 212, 1) !important',
  },
  notSelected: {
    background: 'lightgray !important',
    color: 'gray',
  },
  listItem: {
    cursor: 'pointer',
    position: 'absolute',
    listStyle: 'none',
    display: 'inline-block',
    zIndex: 1,
    borderRadius: 6,
    background: 'rgba(190, 144, 212, .5)',
    border: '1px solid rgba(115, 101, 152, 1)',
  },
  itemText: {
    display: 'block',
    padding: 2,
  },
};

export default withStyles(styles)(({ classes, items, onSelect, selected }) => {
  const difficultyValues = items.map(i => i.difficulty);
  const maxDifficulty = max(difficultyValues) + 3 || 13;
  const maxImportance = 110;
  return (
    <div className={cn(classes.root)} onClick={evt => onSelect(evt, null)}>
      <h1 className={classes.importance}>Importance</h1>
      <h1 className={classes.difficulty}>Difficulty</h1>
      <div style={{ top: 0, left: 0 }} className={cn(classes.quadrant)}>
        <h3 className={classes.heading}>Ignore for Now?</h3>
      </div>
      <div style={{ top: '50%', left: 0 }} className={cn(classes.quadrant)}>
        <h3 className={classes.heading}>Improve when Able</h3>
      </div>
      <div style={{ top: 0, left: '50%' }} className={cn(classes.quadrant)}>
        <h3 className={classes.heading}>Breakdown and Plan</h3>
      </div>
      <div
        style={{
          top: '50%',
          left: '50%',
        }}
        className={cn(classes.quadrant)}
      >
        <h3 className={classes.heading}>Quick Wins</h3>
      </div>
      <ul className={cn(classes.list)}>
        {items.map(item => (
          <li
            className={cn(
              classes.listItem,
              item._oid === selected && classes.selected,
              selected !== null &&
                item._oid !== selected &&
                classes.notSelected,
            )}
            key={item._oid}
            style={{
              bottom: `calc((100% / ${maxDifficulty}) * ${item.difficulty})`,
              left: `calc((100% / ${maxImportance}) * ${item.importance})`,
            }}
            onClick={evt => {
              evt.stopPropagation();
              onSelect(evt, item._oid);
            }}
          >
            <div>
              <Tooltip title={item.summary}>
                <span className={classes.itemText}>{item.title}</span>
              </Tooltip>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});
