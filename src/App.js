import axios from 'axios';
import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { navigate, Router } from '@reach/router';
import Importance from './Importance';
import Results from './Results';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      selected: null,
      tabIndex: 0,
    };
    this.tabs = [
      { label: 'Rate Importance', href: '/importance' },
      { label: 'Rate Difficulty', href: '/difficulty' },
      { label: 'Results', href: '/results' },
    ];
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

  handleNavigateTab = (evt, tabIndex) => {
    this.setState({ tabIndex }, () => {
      navigate(this.tabs[tabIndex].href);
    });
  };

  render() {
    const { items, tabIndex } = this.state;

    return (
      <div>
        <Tabs value={tabIndex} onChange={this.handleNavigateTab}>
          {this.tabs.map(({ href, label }) => (
            <Tab key={href} label={label} />
          ))}
        </Tabs>
        <div>
          <Router>
            <Importance path="/importance" items={items} />
            <Results path="/results" items={items} />
          </Router>
        </div>
      </div>
    );
  }
}
export default App;
