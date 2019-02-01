import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { keyBy } from 'lodash';
import { Location, navigate, Router } from '@reach/router';
import EditDimension from './EditDimension';
import Results from './Results';
import './App.css';

const Home = ({ items, selected, onNavigate, onSelect, onUpdate, tabs }) => (
  <Fragment>
    <Location>
      {({ location }) => (
        <Tabs
          value={tabs.findIndex(tab => tab.href === location.pathname)}
          onChange={onNavigate}
        >
          {tabs.map(({ href, label }) => (
            <Tab key={href} label={label} />
          ))}
        </Tabs>
      )}
    </Location>
    <div>
      <Router>
        <EditDimension
          path="/importance"
          attribute="importance"
          items={items.slice(0).map(i => ({ ...i, rated: i.importance > 0 }))}
          onSelect={onSelect}
          onUpdate={onUpdate('Value')}
          selected={selected}
          tiers={[100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0]}
        />
        <EditDimension
          path="/difficulty"
          attribute="difficulty"
          items={items.slice(0).map(i => ({ ...i, rated: i.difficulty > 0 }))}
          onSelect={onSelect}
          onUpdate={onUpdate('Swag')}
          selected={selected}
          tiers={[1, 2, 3, 5, 8, 13, 21]}
        />
        <Results
          path="/results"
          items={items}
          onSelect={onSelect}
          selected={selected}
          maxDifficulty={21}
          maxImportance={100}
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
      items: {},
      selected: [],
    };
  }
  componentDidMount() {
    axios.get('/api').then(resp =>
      this.setState({
        items: keyBy(
          resp.data[0].map(wi => ({
            _oid: wi._oid,
            title: wi.Number,
            summary: wi.Name,
            importance: parseInt(wi.Value) || 0,
            difficulty: parseInt(wi.Swag) || 0,
          })),
          '_oid',
        ),
      }),
    );
  }

  handleNavigateTab = (evt, tabIndex) => {
    navigate(this.tabs[tabIndex].href);
  };

  handleSelection = (evt, selected) => {
    this.setState(state => ({
      selected:
        selected === null
          ? []
          : state.selected.includes(selected)
          ? state.selected.filter(item => item !== selected)
          : state.selected.concat([selected]),
    }));
  };

  handleUpdate = updateKey => ({ _oid, ...rest }) => {
    axios
      .put('/api/update', {
        updateKey,
        _oid,
        updateValue: Object.values(rest)[0],
      })
      .then(() =>
        this.setState(state => ({
          ...state,
          items: {
            ...state.items,
            [_oid]: {
              ...state.items[_oid],
              ...rest,
            },
          },
        })),
      )
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { items, selected } = this.state;
    const itemArray = Object.values(items);

    return (
      <Router>
        <Home
          default
          items={itemArray}
          selected={selected}
          onNavigate={this.handleNavigateTab}
          onSelect={this.handleSelection}
          onUpdate={this.handleUpdate}
          tabs={this.tabs}
        />
      </Router>
    );
  }
}
export default App;
