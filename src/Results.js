import cn from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Board from './Board';
import ItemList from './ItemList';

const styles = () => ({
  app: {
    overflow: 'hidden',
    display: 'flex',
  },
});

class Results extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  render() {
    const {
      classes,
      items,
      maxDifficulty,
      maxImportance,
      onSelect,
      selected,
    } = this.props;

    return (
      <div className={cn(classes.app, 'App')}>
        <ItemList items={items} onSelect={onSelect} selected={selected} />
        <Board
          items={items}
          onSelect={onSelect}
          selected={selected}
          maxImportance={maxImportance}
          maxDifficulty={maxDifficulty}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Results);
