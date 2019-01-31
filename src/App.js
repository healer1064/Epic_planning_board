import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Location, navigate, Router } from '@reach/router';
import Importance from './Importance';
import Results from './Results';
import './App.css';

const Home = ({ items, selected, onNavigate, onSelect, tabs }) => (
  <Fragment>
    <Location>
      {({ location }) => {
        console.log(location);
        return (
          <Tabs
            value={tabs.findIndex(tab => tab.href === location.pathname)}
            onChange={onNavigate}
          >
            {tabs.map(({ href, label }) => (
              <Tab key={href} label={label} />
            ))}
          </Tabs>
        );
      }}
    </Location>
    <div>
      <Router>
        <Importance
          default
          path="/importance"
          items={items.slice(0)}
          onSelect={onSelect}
          selected={selected}
        />
        <Results
          path="/results"
          items={items}
          onSelect={onSelect}
          selected={selected}
        />
      </Router>
    </div>
  </Fragment>
);

class App extends Component {
  constructor() {
    super();
    this.tabs = [
      { label: 'Rate Importance', href: '/importance' },
      { label: 'Rate Difficulty', href: '/difficulty' },
      { label: 'Results', href: '/results' },
    ];
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

  handleNavigateTab = (evt, tabIndex) => {
    navigate(this.tabs[tabIndex].href);
  };

  handleSelection = (evt, selected) => {
    this.setState(state => ({
      selected: state.selected !== selected ? selected : null,
    }));
  };

  render() {
    const { items, selected } = this.state;

    return (
      <Router>
        <Home
          default
          items={items}
          selected={selected}
          onNavigate={this.handleNavigateTab}
          onSelect={this.handleSelection}
          tabs={this.tabs}
        />
      </Router>
    );
  }
}
export default App;
