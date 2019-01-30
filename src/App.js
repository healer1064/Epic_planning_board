import axios from 'axios';
import classNames from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Board from './Board';
import Legend from './Legend';
import './App.css';

const styles = theme => ({
  app: {
    overflow: 'hidden',
    display: 'flex',
  },
});

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
      selected: null,
    };
  }
  componentDidMount() {
    axios.get('/api').then(resp =>
      this.setState({
        items: resp.data[0].map(wi => ({
          _oid: wi._oid,
          title: wi.Number,
          summary: wi.Name,
          importance: wi.Value || 0,
          difficulty: wi.Swag || 0,
        })),
      }),
    );
  }
  render() {
    const { classes } = this.props;
    const { items, selected } = this.state;

    return (
      <div className={classNames(classes.app, 'App')}>
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
export default withStyles(styles)(App);
