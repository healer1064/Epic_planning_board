import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import Board from './Board';
import axios from 'axios';

const styles = theme => ({
  app: {
    overflow: 'hidden',
  },
  drawerRoot: {
    display: 'flex',
    flexDirection: 'column',
    margin: 8,
    width: 400,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flex: 1,
    flexBasis: 200,
  },
});

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
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
    const { items } = this.state;

    return (
      <div className={classNames(classes.app, 'App')}>
        <Board items={items} />
      </div>
    );
  }
}
export default withStyles(styles)(App);
