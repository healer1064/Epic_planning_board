import React from 'react';
import { first } from 'lodash';
import Item from './Item';

const RatingBoard = ({ children, items, onSelect, selected, tiers }) => {
  const orderedTiers = tiers.sort((a, b) => b - a);
  const max = first(orderedTiers);

  return (
    <ol
      style={{
        margin: 0,
        flex: 1,
        height: `calc(100vh - ${48 + 18}px)`,
        borderTop: '1px solid gray',
        borderBottom: '1px solid gray',
      }}
      onClick={evt => onSelect(evt, null)}
    >
      {orderedTiers.map((tier, index, list) => {
        return (
          <li
            key={tier}
            style={{
              alignItems: 'flex-end',
              borderBottom: index === 0 ? 'none' : '1px solid lightgray',
              display: 'flex',
              height:
                index === 0
                  ? 0
                  : `calc((((100% - 1px) / ${max}) * ${list[index - 1] -
                      tier}))`,

              position: index === 0 ? 'absolute' : 'unset',
            }}
          >
            <span style={{ alignSelf: 'flex-end' }}>{tier}</span>
            <ul
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {items
                .filter(
                  item =>
                    item.value < (index === 0 ? max : list[index - 1]) &&
                    item.value >= tier,
                )
                .map(item => (
                  <li
                    style={{
                      listStyle: 'none',
                      display: 'inline-block',
                    }}
                    key={item._oid}
                  >
                    <Item
                      {...item}
                      selected={selected === item._oid}
                      onSelect={onSelect}
                    >
                      {close => children(item, close)}
                    </Item>
                  </li>
                ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
};

export default RatingBoard;
