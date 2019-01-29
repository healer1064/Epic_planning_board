import React, { Component } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import Board from './Board';

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
  handleClose = () => {
    this.setState({ isDrawerOpen: false });
  };

  render() {
    const { classes, items } = this.props;

    return (
      <div className={classNames(classes.app, 'App')}>
        <Board items={items} />
      </div>
    );
  }
}
App.defaultProps = {
  items: [
    {
      _oid: 'Epic:123456',
      title: 'E-1',
      summary: 'This is an epic name',
      importance: 75,
      difficulty: 13,
    },
    {
      _oid: 'Epic:123456',
      title: 'E-2',
      summary: 'This is an epic name',
      importance: 40,
      difficulty: 2,
    },
    {
      _oid: 'Epic:123456',
      title: 'E-3',
      summary: 'This is an epic name',
      importance: 25,
      difficulty: 13,
    },
    {
      _oid: 'Epic:123456',
      title: 'E-4',
      summary: 'This is an epic name',
      importance: 60,
      difficulty: 7,
    },
  ],
};
export default withStyles(styles)(App);
