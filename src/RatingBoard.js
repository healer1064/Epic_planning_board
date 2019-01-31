import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { last } from 'lodash';

const RatingBoard = ({ items, tiers }) => {
  const orderedTiers = tiers.sort((a, b) => a - b);
  const max = last(orderedTiers);

  return (
    <ol
      style={{
        margin: 0,
        flex: 1,
        height: `calc(100vh - ${48 + 18}px)`,
        borderTop: '1px solid gray',
      }}
    >
      {orderedTiers.map((tier, index, list) => {
        return (
          <li
            key={tier}
            style={{
              borderBottom: '1px solid lightgray',
              display: 'flex',
              height: `calc((((100% - 1px) / ${max}) * ${tier}) - (${
                index === 0
                  ? '0px'
                  : `((100% - 1px) / ${max}) * ${list[index - 1]}`
              })`,
            }}
          >
            <span style={{ alignSelf: 'flex-end' }}>{tier}</span>
            <ul style={{ display: 'flex', flexDirection: 'column' }}>
              {items
                .filter(
                  i =>
                    i.value > (index === 0 ? 0 : list[index - 1]) &&
                    i.value < tier,
                )
                .map(i => (
                  <li
                    style={{
                      padding: 2,
                      listStyle: 'none',
                      cursor: 'pointer',
                      display: 'inline-block',
                      borderRadius: 6,
                      background: 'rgba(190, 144, 212, .5)',
                      border: '1px solid rgba(115, 101, 152, 1)',
                    }}
                  >
                    <Tooltip title={i.value}>
                      <span>{i.title}</span>
                    </Tooltip>
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
