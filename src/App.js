import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import api from './api';
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
  constructor() {
    super();
    this.state = {
      items: [],
      isDrawerOpen: true,
      showPassword: false,
      token: 'tes',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.token &&
      prevState.isDrawerOpen &&
      !this.state.isDrawerOpen
    ) {
      this.api = api(this.state.token);
      const epics = [
        {
          _oid: 'Epic:123456',
          Number: 'E-1',
          Name: 'This is an epic name',
          BusinessValue: 75,
          Swag: 13,
        },
        {
          _oid: 'Epic:123456',
          Number: 'E-2',
          Name: 'This is an epic name',
          BusinessValue: 60,
          Swag: 3,
        },
        {
          _oid: 'Epic:123456',
          Number: 'E-3',
          Name: 'This is an epic name',
          BusinessValue: 25,
          Swag: 1,
        },
      ];
      this.api
        .query({
          from: 'Workitem',
          select: ['Name', 'Number', 'BusinessValue', 'Swag'],
          filter: ["TaggedWith='groom'"],
        })
        .then(workitems => {
          const items = workitems.map(wi => ({
            title: wi.Number,
            importance: wi.BusinessValue,
            difficulty: wi.Swag,
            summary: wi.Name,
          }));
          this.setState({
            items,
          });
        });
    }
  }

  handleClose = () => {
    this.setState({ isDrawerOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { isDrawerOpen, items, showPassword } = this.state;

    return (
      <div className={classNames(classes.app, 'App')}>
        <Drawer open={isDrawerOpen} onClose={this.handleClose}>
          <div className={classNames(classes.drawerRoot)}>
            <FormControl
              className={classNames(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="auth-token">
                V1 Authorization Token
              </InputLabel>
              <Input
                id="auth-token"
                onBlur={evt => this.setState({ token: evt.target.value })}
                type={this.state.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={() =>
                        this.setState(state => ({
                          showPassword: !state.showPassword,
                        }))
                      }
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              color="primary"
              onClick={() => {
                const { token } = this.state;
                if (!token) return;
                this.handleClose();
              }}
              variant="contained"
            >
              Save
            </Button>
          </div>
        </Drawer>
        <Board items={items} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
