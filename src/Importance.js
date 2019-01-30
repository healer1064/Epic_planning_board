import React from 'react';

const Importance = ({ items }) => (
  <ol>
    {items.map(item => (
      <li key={item._oid}>
        {item.title} {item.summary}
      </li>
    ))}
  </ol>
);
export default Importance;
