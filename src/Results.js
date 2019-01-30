import cn from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Board from './Board';
import Legend from './Legend';

const styles = () => ({
  app: {
    overflow: 'hidden',
    display: 'flex',
  },
});

class Results extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: null,
    };
  }

  render() {
    const { classes, items } = this.props;
    const { selected } = this.state;

    return (
      <div className={cn(classes.app, 'App')}>
        <Legend
          items={items}
          onSelect={(evt, _oid) =>
            this.setState(state => ({
              selected: state.selected !== _oid ? _oid : null,
            }))
          }
          selected={selected}
        />
        <Board
          items={items}
          onSelect={(evt, _oid) =>
            this.setState(state => ({
              selected: state.selected !== _oid ? _oid : null,
            }))
          }
          selected={selected}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Results);
